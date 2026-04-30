import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const GROQ_API_KEY    = process.env.GROQ_API_KEY
const GEMINI_API_KEY  = process.env.GEMINI_API_KEY
const GROQ_URL        = "https://api.groq.com/openai/v1/chat/completions"
const GEMINI_URL      = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

// ── Supabase admin client ──────────────────────────────────────────────────
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

// ── Content cache helpers ──────────────────────────────────────────────────
function buildCacheKey(classNum: string, chapterId: string, tab: string): string {
  return `${classNum}__${chapterId}__${tab}`
}

async function getCachedContent(cacheKey: string): Promise<string | null> {
  const db = getSupabaseAdmin()
  if (!db) return null
  try {
    const { data } = await db
      .from("content_cache")
      .select("content, hit_count")
      .eq("cache_key", cacheKey)
      .single()
    if (!data) return null
    db.from("content_cache")
      .update({ hit_count: (data.hit_count || 0) + 1 })
      .eq("cache_key", cacheKey)
      .then(() => {})
    return data.content as string
  } catch {
    return null
  }
}

async function saveCachedContent(
  cacheKey: string,
  content: string,
  classNum: string,
  chapterId: string,
  tab: string
): Promise<void> {
  const db = getSupabaseAdmin()
  if (!db) return
  try {
    await db.from("content_cache").upsert({
      cache_key: cacheKey,
      content,
      class_num: parseInt(classNum),
      chapter_id: chapterId,
      tab,
    }, { onConflict: "cache_key" })
  } catch {
    // Cache save failure is non-fatal
  }
}

// ── Supabase-based rate limiter ────────────────────────────────────────────
// Required Supabase table (run once in SQL Editor):
// CREATE TABLE IF NOT EXISTS rate_limits (
//   ip       TEXT PRIMARY KEY,
//   count    INTEGER NOT NULL DEFAULT 0,
//   reset_at TIMESTAMPTZ NOT NULL
// );
const RATE_LIMIT    = 50
const RATE_WINDOW_MS = 60 * 1000

async function checkRateLimit(ip: string): Promise<boolean> {
  const db = getSupabaseAdmin()
  // If Supabase unavailable, allow through (fail-open to not break the app)
  if (!db) return true

  const now     = new Date()
  const resetAt = new Date(now.getTime() + RATE_WINDOW_MS).toISOString()

  try {
    const { data, error } = await db
      .from("rate_limits")
      .select("count, reset_at")
      .eq("ip", ip)
      .single()

    // New IP — insert fresh record
    if (error || !data) {
      await db.from("rate_limits").insert({ ip, count: 1, reset_at: resetAt })
      return true
    }

    const windowExpired = new Date(data.reset_at) < now

    // Window expired — reset counter
    if (windowExpired) {
      await db.from("rate_limits").update({ count: 1, reset_at: resetAt }).eq("ip", ip)
      return true
    }

    // Within window — check limit
    if (data.count >= RATE_LIMIT) return false

    await db.from("rate_limits").update({ count: data.count + 1 }).eq("ip", ip)
    return true
  } catch {
    // On unexpected error, allow through
    return true
  }
}

// ── System prompt (language-aware) ────────────────────────────────────────
function getSystemPrompt(language: string): string {
  if (language === "en") {
    return `You are an expert NCERT teacher. Write ALL content in clear, simple English.
MANDATORY RULES:
1. Write COMPLETE content — do not stop in the middle
2. Stay strictly within NCERT syllabus content
3. Use the EXACT format specified in the prompt
4. Headings must be clear and well-separated so each topic is distinct`
  }
  return `Tu ek expert NCERT teacher hai jo SIRF DEVANAGARI HINDI mein likhta hai.
MANDATORY RULES:
1. POORA content HINDI (Devanagari) mein likhna hai
2. Scientific/technical terms: Hindi + bracket mein English dono likho
3. Format EXACTLY waise rakho jaisa prompt mein bataya gaya hai
4. NCERT content se bahar bilkul mat jao
5. Content POORA complete karo — beech mein mat rokna
6. Headings SAAF aur KHULE KHULE rakho — har topic clearly alag dikhe`
}

// ── AI callers: Groq → Gemini fallback chain ──────────────────────────────
async function callGroq(prompt: string, systemPrompt: string, maxTokens = 4000): Promise<string> {
  if (!GROQ_API_KEY) throw new Error("GROQ_API_KEY not set")
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: prompt },
      ],
      temperature: 0.3,
      max_tokens: maxTokens,
    }),
  })
  if (!res.ok) throw new Error(`Groq error ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ""
}

async function callGemini(prompt: string, systemPrompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not set")
  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 6000 },
    }),
  })
  if (!res.ok) throw new Error(`Gemini error ${res.status}`)
  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
}

// Primary: Groq. Fallback: Gemini. Both fail → throws.
async function callAI(prompt: string, systemPrompt: string, maxTokens = 4000): Promise<string> {
  try {
    return await callGroq(prompt, systemPrompt, maxTokens)
  } catch (groqErr) {
    console.error("[AI] Groq failed, trying Gemini:", groqErr)
    try {
      return await callGemini(prompt, systemPrompt)
    } catch (geminiErr) {
      throw new Error(`Both Groq and Gemini failed. Groq: ${groqErr}. Gemini: ${geminiErr}`)
    }
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getClassGroup(cls: number): "6-8" | "9-10" | "11-12" {
  if (cls <= 8)  return "6-8"
  if (cls <= 10) return "9-10"
  return "11-12"
}

// ── Prompt builders ────────────────────────────────────────────────────────
function getNotesPrompt(
  chapterName: string,
  chapterNameHi: string,
  subject: string,
  classNum: string,
  language: string
): string {
  const cls   = parseInt(classNum)
  const group = getClassGroup(cls)

  const lengthGuide =
    group === "6-8"  ? "300–500 words" :
    group === "9-10" ? "360–600 words" :
                       "430–720 words"

  const depthTip =
    group === "6-8"  ? "Very simple language. Short sentences. Explain each concept with one example." :
    group === "9-10" ? "Board exam level. Clearly explain definitions, processes, and data." :
                       "UPSC analytical depth. Cover causes, effects, and broader impact of concepts."

  const chapterLabel = language === "en"
    ? `Chapter: ${chapterName}`
    : `Chapter: ${chapterName} (${chapterNameHi})`

  return `NCERT Class ${classNum} ${subject}
${chapterLabel}
${depthTip}
Target length: ${lengthGuide}

RULES:
- Cover EVERY sub-topic of the chapter — do not skip any
- Each heading must be clearly separated and bold (use ##)
- Use ** for sub-headings
- Use (i)(ii)(iii) for points
- Where there is a process/cycle/flow → create an emoji diagram
- Where there is a comparison → create a table
- Include UPSC connection
- Write in clear, simple language

FORMAT (follow exactly — keep headings well-spaced):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📖 Chapter Introduction
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2-3 line overview and importance of the chapter]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔹 [First Main Topic Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[3-4 lines detailed explanation]

**[Sub Topic 1]**
[2-3 lines]
(i) [Point]
(ii) [Point]

**[Sub Topic 2]**
[Explanation]

[If diagram needed:]
🔄 [Step 1] → [Step 2] → [Step 3] → [Step 4]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔹 [Second Main Topic Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Explanation]

[If comparison needed:]
| Topic | [Item 1] | [Item 2] |
|-------|----------|----------|
| [Point] | [Value] | [Value] |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📊 Important Facts & Data
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(i) [Fact/date/name/formula]
(ii) [Fact]
(iii) [Fact]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔑 Key Terms (Glossary)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**[Term 1]:** [One line definition]
**[Term 2]:** [One line definition]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⭐ Points to Remember
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(i) [Most important point]
(ii) [Important point]
(iii) [Important point]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ UPSC Relevance
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2-3 lines: direct connection of this chapter to UPSC Prelims/Mains]

IMPORTANT: Put ━━━ lines above and below every ## heading so topics are clearly separated`
}

function getIQPrompt(
  chapterName: string,
  chapterNameHi: string,
  subject: string,
  classNum: string,
  language: string
): string {
  const cls   = parseInt(classNum)
  const group = getClassGroup(cls)

  const counts =
    group === "6-8"  ? { short: 8,  long: 5,  analyze: 3 } :
    group === "9-10" ? { short: 12, long: 8,  analyze: 5 } :
                       { short: 15, long: 10, analyze: 7 }

  const total = counts.short + counts.long + counts.analyze

  const chapterLabel = language === "en"
    ? `Chapter: ${chapterName}`
    : `Chapter: ${chapterName} (${chapterNameHi})`

  return `NCERT Class ${classNum} ${subject}
${chapterLabel}

Create ${total} important questions (${counts.short} Short + ${counts.long} Long + ${counts.analyze} Analytical).
Questions must come from EVERY sub-topic of the chapter.
Create questions in UPSC Prelims/Mains style.
NOTE: Do NOT create MCQs — only Short, Long and Analytical questions.

FORMAT:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✍️ Short Answer Questions (2-3 marks)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Q1.** [Direct, factual question]
💡 **Answer:** [2-3 line clear answer]

**Q2.** [Question]
💡 **Answer:** [Answer]

[${counts.short} short questions total — number continuously]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📝 Long Answer Questions (5 marks)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Q${counts.short + 1}.** [Detailed, conceptual question]
💡 **Answer:** [5-6 line detailed answer with examples]

[${counts.long} long questions total]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 Analytical Questions — UPSC Level
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Q${counts.short + counts.long + 1}.** [Higher order analytical question]
🏛️ **UPSC Relevance:** [One line UPSC connection]
💡 **Answer:** [4-5 line analytical answer]

[${counts.analyze} analytical questions total]

RULES:
- No MCQs at all
- All questions from NCERT content only
- Number questions continuously
- Complete the full response`
}

function getQuizPrompt(
  scope: string,
  batchNum: number,
  topicHint: string,
  classNum: string,
  language: string
): string {
  const langNote = language === "en"
    ? "Write ALL questions and options in English."
    : "Saare questions aur options HINDI mein likho."

  return `Quiz: ${scope}
Batch ${batchNum} — Focus: ${topicHint}
Class: ${classNum}
${langNote}

Create 10 UNIQUE UPSC-style MCQ questions.
- Each question from a DIFFERENT topic
- Mix: factual + conceptual + application-based
- At least 1 Assertion-Reason type
- Stay within NCERT content only

Return ONLY a valid JSON array — no explanation, no markdown fences:
[
  {
    "question": "UPSC style question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "One line explanation of why this is correct"
  }
]`
}

function parseQuizJSON(text: string): any[] {
  try {
    const clean = text.replace(/```json|```/g, "").trim()
    const start = clean.indexOf("[")
    const end   = clean.lastIndexOf("]")
    if (start === -1 || end === -1) return []
    return JSON.parse(clean.slice(start, end + 1))
  } catch { return [] }
}

// ── Main handler ───────────────────────────────────────────────────────────
export async function GET(request: Request) {
  const ip =
    (request.headers as any).get?.("x-forwarded-for")?.split(",")?.[0]?.trim() ||
    (request.headers as any).get?.("x-real-ip") ||
    "unknown"

  const allowed = await checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    )
  }

  const { searchParams } = new URL(request.url)
  const chapterId     = searchParams.get("chapter_id")     || ""
  const chapterName   = searchParams.get("chapter_name")   || ""
  const chapterNameHi = searchParams.get("chapter_name_hi") || ""
  const subject       = searchParams.get("subject")        || ""
  const classNum      = searchParams.get("class")          || "6"
  const tab           = searchParams.get("tab")            || "notes"
  const quizMode      = searchParams.get("quiz_mode")      || "chapter"
  const language      = searchParams.get("language")       || "hi"   // "hi" | "en"

  if (!chapterName)
    return NextResponse.json({ error: "Missing chapter_name" }, { status: 400 })

  if (!GROQ_API_KEY)
    return NextResponse.json({ error: "GROQ_API_KEY not set" }, { status: 500 })

  const cls      = parseInt(classNum)
  const group    = getClassGroup(cls)
  const sysPrompt = getSystemPrompt(language)

  const CACHE_HEADERS = {
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  }

  try {
    // ── Notes ────────────────────────────────────────────────────────────
    if (tab === "notes") {
      const cacheKey = buildCacheKey(classNum, chapterId, `notes_${language}`)
      const cached   = await getCachedContent(cacheKey)
      if (cached) {
        return NextResponse.json(
          { content: cached, chapterId, tab, source: "cache" },
          { headers: CACHE_HEADERS }
        )
      }

      const maxTok  = group === "6-8" ? 3000 : group === "9-10" ? 4000 : 5000
      const content = await callAI(
        getNotesPrompt(chapterName, chapterNameHi, subject, classNum, language),
        sysPrompt,
        maxTok
      )

      saveCachedContent(cacheKey, content, classNum, chapterId, `notes_${language}`)
      return NextResponse.json(
        { content, chapterId, tab, source: "generated" },
        { headers: CACHE_HEADERS }
      )
    }

    // ── Important Questions ───────────────────────────────────────────────
    if (tab === "iq") {
      const cacheKey = buildCacheKey(classNum, chapterId, `iq_${language}`)
      const cached   = await getCachedContent(cacheKey)
      if (cached) {
        return NextResponse.json(
          { content: cached, chapterId, tab, source: "cache" },
          { headers: CACHE_HEADERS }
        )
      }

      const maxTok  = group === "6-8" ? 3500 : group === "9-10" ? 5000 : 6000
      const content = await callAI(
        getIQPrompt(chapterName, chapterNameHi, subject, classNum, language),
        sysPrompt,
        maxTok
      )

      saveCachedContent(cacheKey, content, classNum, chapterId, `iq_${language}`)
      return NextResponse.json(
        { content, chapterId, tab, source: "generated" },
        { headers: CACHE_HEADERS }
      )
    }

    // ── Quiz ─────────────────────────────────────────────────────────────
    if (tab === "quiz") {
      const cacheKey = buildCacheKey(classNum, chapterId, `quiz_${quizMode}_${language}`)
      const cached   = await getCachedContent(cacheKey)
      if (cached) {
        const parsed = parseQuizJSON(cached)
        return NextResponse.json(
          { content: cached, chapterId, tab, total: parsed.length, source: "cache" },
          { headers: CACHE_HEADERS }
        )
      }

      const totalBatches = quizMode === "full"
        ? (group === "6-8" ? 3 : group === "9-10" ? 4 : 5)
        : 2

      const scope = quizMode === "full"
        ? `NCERT Class ${classNum} ${subject}`
        : `NCERT Class ${classNum} ${subject} - ${chapterName}`

      const topicHints = [
        "definitions, basic concepts, key facts",
        "processes, causes, effects, examples",
        "comparisons, applications, UPSC analytical",
        "dates, names, places, statistics",
        "critical thinking, inference based",
        "government schemes, policies, acts",
        "maps, data, case studies",
        "current affairs connection",
        "assertion-reason, match the following style",
        "miscellaneous important topics",
      ]

      // Sequential batches — avoids Vercel timeout & Groq rate limits
      const results: string[] = []
      for (let i = 0; i < totalBatches; i++) {
        try {
          const result = await callAI(
            getQuizPrompt(scope, i + 1, topicHints[i % topicHints.length], classNum, language),
            sysPrompt,
            2048
          )
          results.push(result)
        } catch (batchErr) {
          console.error(`[Quiz] Batch ${i + 1} failed, skipping:`, batchErr)
        }
      }

      const allQ  = results.flatMap(parseQuizJSON)
      const seen  = new Set<string>()
      const unique = allQ.filter((q: any) => {
        if (!q?.question || seen.has(q.question)) return false
        seen.add(q.question)
        return true
      })

      const contentStr = JSON.stringify(unique)
      saveCachedContent(cacheKey, contentStr, classNum, chapterId, `quiz_${quizMode}_${language}`)

      return NextResponse.json(
        { content: contentStr, chapterId, tab, total: unique.length, source: "generated" },
        { headers: CACHE_HEADERS }
      )
    }

    return NextResponse.json(
      { error: "Invalid tab" },
      { status: 400, headers: CACHE_HEADERS }
    )

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 }
    )
  }
}

export const maxDuration = 60
