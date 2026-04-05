import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

// ── Supabase admin client for shared content cache ─────────────────────────
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

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
    // Increment hit count in background — do not await
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

// ── Simple in-memory rate limiter ──────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

function getClassGroup(cls: number): "6-8" | "9-10" | "11-12" {
  if (cls <= 8) return "6-8"
  if (cls <= 10) return "9-10"
  return "11-12"
}

async function callGroq(prompt: string, maxTokens = 4000): Promise<string> {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `Tu ek expert NCERT teacher hai jo SIRF DEVANAGARI HINDI mein likhta hai.\nMANDATORY RULES:\n1. POORA content HINDI (Devanagari) mein likhna hai\n2. Scientific/technical terms: Hindi + bracket mein English dono likho\n3. Format EXACTLY waise rakho jaisa prompt mein bataya gaya hai\n4. NCERT content se bahar bilkul mat jao\n5. Content POORA complete karo — beech mein mat rokna\n6. Headings SAAF aur KHULE KHULE rakho — har topic clearly alag dikhe`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: maxTokens,
    }),
  })
  if (!res.ok) throw new Error(`Groq error ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ""
}

function getNotesPrompt(chapterName: string, chapterNameHi: string, subject: string, classNum: string): string {
  const cls = parseInt(classNum)
  const group = getClassGroup(cls)

  const lengthGuide =
    group === "6-8"   ? "300–500 shabd" :
    group === "9-10"  ? "360–600 shabd" :
                        "430–720 shabd"

  const depthTip =
    group === "6-8"   ? "Bahut saral bhasha. Chhote chhote sentences. Har concept ko ek example se samjhao." :
    group === "9-10"  ? "Board exam level. Definitions, processes, data clearly explain karo." :
                        "UPSC analytical depth. Concepts ka broader impact, causes, effects clearly batao."

  return `NCERT Class ${classNum} ${subject}\nChapter: ${chapterName} (${chapterNameHi})\n${depthTip}\nTarget length: ${lengthGuide}\n\nNIYAM:\n- Chapter ke HARE EK sub-topic ko cover karo — koi bhi topic skip nahi\n- Har heading clearly alag aur bold dikhe (## use karo)\n- Sub-headings ke liye ** use karo\n- Points ke liye (i)(ii)(iii) use karo  \n- Jahan process/cycle/flow samjhana ho → emoji diagram banao\n- Jahan comparison ho → table banao\n- UPSC connection zaroor batao\n- Saral aur pyari Hindi mein likho\n\nFORMAT (exactly isi tarah — headings khuli khuli rakho):\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n## 📖 अध्याय परिचय\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[2-3 line mein chapter ka overview aur mahatva]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n## 🔹 [Pehla Main Topic ka naam]\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[3-4 lines detailed explanation]\n\n**[Sub Topic 1]**\n[2-3 lines]\n(i) [Point]\n(ii) [Point]\n\n**[Sub Topic 2]**\n[Explanation]\n\n[Agar diagram chahiye:]\n🔄 [Step 1] → [Step 2] → [Step 3] → [Step 4]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n## 🔹 [Doosra Main Topic ka naam]\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[Explanation]\n\n[Agar comparison chahiye:]\n| विषय | [Cheez 1] | [Cheez 2] |\n|------|-----------|-----------|\n| [Point] | [Value] | [Value] |\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n## 📊 महत्वपूर्ण तथ्य एवं आंकड़े\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n(i) [Fact/date/name/formula]\n(ii) [Fact]\n(iii) [Fact]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n## 🔑 मुख्य शब्दावली (Key Terms)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n**[Term 1]:** [One line definition]\n**[Term 2]:** [One line definition]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n## ⭐ याद रखने योग्य बातें\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n(i) [Most important point]\n(ii) [Important point]\n(iii) [Important point]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n## 🏛️ UPSC दृष्टि से महत्व\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n[2-3 lines: is chapter ka UPSC Prelims/Mains se seedha connection]\n\nIMPORTANT: Har ## heading ke upar-neeche ━━━ line zaroor daalo taaki topics clearly alag dikhen`
}

function getIQPrompt(chapterName: string, chapterNameHi: string, subject: string, classNum: string): string {
  const cls = parseInt(classNum)
  const group = getClassGroup(cls)

  const counts =
    group === "6-8"   ? { short: 8,  long: 5,  analyze: 3 } :
    group === "9-10"  ? { short: 12, long: 8,  analyze: 5 } :
                        { short: 15, long: 10, analyze: 7 }

  const total = counts.short + counts.long + counts.analyze

  return `NCERT Class ${classNum} ${subject}\nChapter: ${chapterName} (${chapterNameHi})\n\n${total} important questions banao (${counts.short} Short + ${counts.long} Long + ${counts.analyze} Analytical).\nChapter ke HARE EK sub-topic se questions aane chahiye.\nUPSC Prelims/Mains style mein questions banao.\nNOTE: MCQ mat banana — sirf Short, Long aur Analytical questions.\n\nFORMAT:\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n## ✍️ लघु उत्तरीय प्रश्न (2-3 अंक)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n**प्रश्न 1.** [Question - direct, factual]\n💡 **उत्तर:** [2-3 line clear answer]\n\n**प्रश्न 2.** [Question]\n💡 **उत्तर:** [Answer]\n\n[${counts.short} short questions total — continuously number karo]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n## 📝 दीर्घ उत्तरीय प्रश्न (5 अंक)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n**प्रश्न ${counts.short + 1}.** [Question - detailed, conceptual]\n💡 **उत्तर:** [5-6 line detailed answer with examples]\n\n[${counts.long} long questions total]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n## 🧠 विश्लेषणात्मक प्रश्न — UPSC स्तर\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n**प्रश्न ${counts.short + counts.long + 1}.** [Higher order analytical question]\n🏛️ **UPSC संबंध:** [One line UPSC relevance]\n💡 **उत्तर:** [4-5 line analytical answer]\n\n[${counts.analyze} analytical questions total]\n\nRULES:\n- MCQ bilkul mat banana\n- Saare questions NCERT content se hon\n- Questions continuously number karo\n- Response POORA complete karo`
}

function getQuizPrompt(scope: string, batchNum: number, topicHint: string, classNum: string): string {
  return `Quiz: ${scope}\nBatch ${batchNum} — Focus: ${topicHint}\nClass: ${classNum}\n\n10 UNIQUE UPSC-style MCQ questions banao.\n- Har question DIFFERENT topic se ho\n- Mix: factual + conceptual + application-based\n- 1 Assertion-Reason type zaroor ho\n- NCERT content se bahar mat jao\n\nSIRF valid JSON array return karo:\n[\n  {\n    "question": "Saral Hindi mein UPSC style question",\n    "options": ["Option A", "Option B", "Option C", "Option D"],\n    "correctIndex": 0,\n    "explanation": "Ek line saral explanation kyun sahi hai"\n  }\n]`
}

function parseQuizJSON(text: string): any[] {
  try {
    const clean = text.replace(/```json|```/g, "").trim()
    const start = clean.indexOf("[")
    const end = clean.lastIndexOf("]")
    if (start === -1 || end === -1) return []
    return JSON.parse(clean.slice(start, end + 1))
  } catch { return [] }
}

export async function GET(request: Request) {
  const ip =
    (request.headers as any).get?.("x-forwarded-for")?.split(",")?.[0]?.trim() ||
    (request.headers as any).get?.("x-real-ip") ||
    "unknown"

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "बहुत ज़्यादा अनुरोध। एक मिनट बाद पुनः प्रयास करें।" },
      { status: 429 }
    )
  }

  const { searchParams } = new URL(request.url)
  const chapterId     = searchParams.get("chapter_id") || ""
  const chapterName   = searchParams.get("chapter_name") || ""
  const chapterNameHi = searchParams.get("chapter_name_hi") || ""
  const subject       = searchParams.get("subject") || ""
  const classNum      = searchParams.get("class") || "6"
  const tab           = searchParams.get("tab") || "notes"
  const quizMode      = searchParams.get("quiz_mode") || "chapter"

  if (!chapterName)
    return NextResponse.json({ error: "Missing chapter_name" }, { status: 400 })

  if (!GROQ_API_KEY)
    return NextResponse.json({ error: "GROQ_API_KEY not set" }, { status: 500 })

  const cls = parseInt(classNum)
  const group = getClassGroup(cls)

  const CACHE_HEADERS = {
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  }

  try {
    if (tab === "notes") {
      // Check Supabase cache first
      const cacheKey = buildCacheKey(classNum, chapterId, "notes")
      const cached = await getCachedContent(cacheKey)
      if (cached) {
        return NextResponse.json({ content: cached, chapterId, tab, source: "cache" }, { headers: CACHE_HEADERS })
      }

      const maxTok = group === "6-8" ? 3000 : group === "9-10" ? 4000 : 5000
      const content = await callGroq(getNotesPrompt(chapterName, chapterNameHi, subject, classNum), maxTok)

      // Save to Supabase in background
      saveCachedContent(cacheKey, content, classNum, chapterId, "notes")

      return NextResponse.json({ content, chapterId, tab, source: "generated" }, { headers: CACHE_HEADERS })
    }

    if (tab === "iq") {
      // Check Supabase cache first
      const cacheKey = buildCacheKey(classNum, chapterId, "iq")
      const cached = await getCachedContent(cacheKey)
      if (cached) {
        return NextResponse.json({ content: cached, chapterId, tab, source: "cache" }, { headers: CACHE_HEADERS })
      }

      const maxTok = group === "6-8" ? 3500 : group === "9-10" ? 5000 : 6000
      const content = await callGroq(getIQPrompt(chapterName, chapterNameHi, subject, classNum), maxTok)

      // Save to Supabase in background
      saveCachedContent(cacheKey, content, classNum, chapterId, "iq")

      return NextResponse.json({ content, chapterId, tab, source: "generated" }, { headers: CACHE_HEADERS })
    }

    if (tab === "quiz") {
      // Quiz cache key includes quizMode since full vs chapter are different
      const cacheKey = buildCacheKey(classNum, chapterId, `quiz_${quizMode}`)
      const cached = await getCachedContent(cacheKey)
      if (cached) {
        const parsed = parseQuizJSON(cached)
        return NextResponse.json(
          { content: cached, chapterId, tab, total: parsed.length, source: "cache" },
          { headers: CACHE_HEADERS }
        )
      }

      const totalBatches = quizMode === "full"
        ? (group === "6-8" ? 5 : group === "9-10" ? 7 : 10)
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
 const results = await Promise.all(
        Array.from({ length: totalBatches }, (_, i) =>
          callGroq(getQuizPrompt(scope, i + 1, topicHints[i % topicHints.length], classNum), 2048)
        )
      )

      const allQ = results.flatMap(parseQuizJSON)
      const seen = new Set<string>()
      const unique = allQ.filter((q: any) => {
        if (!q?.question || seen.has(q.question)) return false
        seen.add(q.question)
        return true
      })

      const contentStr = JSON.stringify(unique)

      // Save to Supabase in background
      saveCachedContent(cacheKey, contentStr, classNum, chapterId, `quiz_${quizMode}`)

      return NextResponse.json(
        { content: contentStr, chapterId, tab, total: unique.length, source: "generated" },
        { headers: CACHE_HEADERS }
      )
    }

    return NextResponse.json({ error: "Invalid tab" }, { status: 400, headers: CACHE_HEADERS })

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 }
    )
  }
}

export const maxDuration = 60
