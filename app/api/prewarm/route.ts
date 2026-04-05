import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { subjectsByClass, streamsByClass } from "@/lib/data"
import type { Subject, Stream } from "@/lib/data"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
const PREWARM_SECRET = process.env.PREWARM_SECRET

// ── Supabase admin client ──────────────────────────────────────────────────
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// ── Build all chapter+tab jobs from app data ───────────────────────────────
interface PrewarmJob {
  cacheKey: string
  chapterId: string
  chapterName: string
  chapterNameHi: string
  subject: string
  classNum: string
  tab: string
}

function getAllJobs(): PrewarmJob[] {
  const jobs: PrewarmJob[] = []

  // Classes 6–10
  for (const [classNum, subjects] of Object.entries(subjectsByClass)) {
    for (const subject of subjects as Subject[]) {
      const availableTabs = subject.tabs.filter(t => ["notes", "iq", "quiz"].includes(t))
      for (const book of subject.books) {
        for (const chapter of book.chapters) {
          for (const tab of availableTabs) {
            jobs.push({
              cacheKey: `${classNum}__${chapter.id}__${tab}`,
              chapterId: chapter.id,
              chapterName: chapter.name,
              chapterNameHi: chapter.nameHi,
              subject: subject.name,
              classNum,
              tab,
            })
          }
        }
      }
    }
  }

  // Classes 11–12 (streams)
  for (const [classNum, streams] of Object.entries(streamsByClass)) {
    for (const stream of streams as Stream[]) {
      for (const subject of stream.subjects) {
        const availableTabs = subject.tabs.filter(t => ["notes", "iq", "quiz"].includes(t))
        for (const book of subject.books) {
          for (const chapter of book.chapters) {
            for (const tab of availableTabs) {
              jobs.push({
                cacheKey: `${classNum}__${chapter.id}__${tab}`,
                chapterId: chapter.id,
                chapterName: chapter.name,
                chapterNameHi: chapter.nameHi,
                subject: subject.name,
                classNum,
                tab,
              })
            }
          }
        }
      }
    }
  }

  return jobs
}

// ── Groq call ──────────────────────────────────────────────────────────────
async function callGroq(prompt: string, systemPrompt: string, maxTokens: number): Promise<string> {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: maxTokens,
    }),
  })
  if (!res.ok) throw new Error(`Groq ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ""
}

const SYSTEM_PROMPT = `Tu ek expert NCERT teacher hai jo SIRF DEVANAGARI HINDI mein likhta hai.
MANDATORY RULES:
1. POORA content HINDI (Devanagari) mein likhna hai
2. Scientific/technical terms: Hindi + bracket mein English dono likho
3. Format EXACTLY waise rakho jaisa prompt mein bataya gaya hai
4. NCERT content se bahar bilkul mat jao
5. Content POORA complete karo — beech mein mat rokna
6. Headings SAAF aur KHULE KHULE rakho — har topic clearly alag dikhe`

function getClassGroup(cls: number): "6-8" | "9-10" | "11-12" {
  if (cls <= 8) return "6-8"
  if (cls <= 10) return "9-10"
  return "11-12"
}

function getNotesPrompt(job: PrewarmJob): string {
  const cls = parseInt(job.classNum)
  const group = getClassGroup(cls)
  const depthTip = group === "6-8"
    ? "Bahut saral bhasha. Chhote chhote sentences. Har concept ko ek example se samjhao."
    : group === "9-10"
    ? "Board exam level. Definitions, processes, data clearly explain karo."
    : "UPSC analytical depth. Concepts ka broader impact, causes, effects clearly batao."

  return `NCERT Class ${job.classNum} ${job.subject}
Chapter: ${job.chapterName} (${job.chapterNameHi})
${depthTip}

NIYAM:
- Chapter ke HARE EK sub-topic ko cover karo
- Har heading clearly alag aur bold dikhe (## use karo)
- Sub-headings ke liye ** use karo
- Points ke liye (i)(ii)(iii) use karo
- Jahan process/cycle/flow samjhana ho → emoji diagram banao
- Jahan comparison ho → table banao
- UPSC connection zaroor batao

FORMAT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📖 अध्याय परिचय
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2-3 line overview]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔹 [Main Topics]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Content]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📊 महत्वपूर्ण तथ्य एवं आंकड़े
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔑 मुख्य शब्दावली (Key Terms)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⭐ याद रखने योग्य बातें
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ UPSC दृष्टि से महत्व
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
}

function getIQPrompt(job: PrewarmJob): string {
  const cls = parseInt(job.classNum)
  const group = getClassGroup(cls)
  const counts = group === "6-8" ? { short: 8, long: 5, analyze: 3 }
    : group === "9-10" ? { short: 12, long: 8, analyze: 5 }
    : { short: 15, long: 10, analyze: 7 }
  const total = counts.short + counts.long + counts.analyze

  return `NCERT Class ${job.classNum} ${job.subject}
Chapter: ${job.chapterName} (${job.chapterNameHi})

${total} important questions banao (${counts.short} Short + ${counts.long} Long + ${counts.analyze} Analytical).
Chapter ke HARE EK sub-topic se questions aane chahiye.
UPSC Prelims/Mains style. MCQ mat banana.

FORMAT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✍️ लघु उत्तरीय प्रश्न (2-3 अंक)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**प्रश्न 1.** [Question]
💡 **उत्तर:** [Answer]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📝 दीर्घ उत्तरीय प्रश्न (5 अंक)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**प्रश्न ${counts.short + 1}.** [Question]
💡 **उत्तर:** [Answer]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 विश्लेषणात्मक प्रश्न — UPSC स्तर
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**प्रश्न ${counts.short + counts.long + 1}.** [Question]
🏛️ **UPSC संबंध:** [relevance]
💡 **उत्तर:** [Answer]

RULES: MCQ bilkul mat banana. Questions continuously number karo. Response POORA complete karo.`
}

function getQuizPrompt(job: PrewarmJob): string {
  return `Quiz: NCERT Class ${job.classNum} ${job.subject} - ${job.chapterName}
10 UNIQUE UPSC-style MCQ questions banao.
- Har question DIFFERENT topic se ho
- Mix: factual + conceptual + application-based
- 1 Assertion-Reason type zaroor ho
- NCERT content se bahar mat jao

SIRF valid JSON array return karo:
[
  {
    "question": "Saral Hindi mein UPSC style question",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Ek line saral explanation kyun sahi hai"
  }
]`
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

// ── Small delay helper ─────────────────────────────────────────────────────
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ── Main handler ───────────────────────────────────────────────────────────
export async function GET(request: Request) {
  // Auth check
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  if (!PREWARM_SECRET || secret !== PREWARM_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: "GROQ_API_KEY not set" }, { status: 500 })
  }

  const db = getSupabase()

  // Get all jobs
  const allJobs = getAllJobs()
  const totalJobs = allJobs.length

  // Get already cached keys from Supabase (including error placeholders)
  const { data: cachedRows } = await db
    .from("content_cache")
    .select("cache_key")

  const cachedKeys = new Set((cachedRows || []).map((r: any) => r.cache_key))

  // Find next uncached job
  const pending = allJobs.filter(j => !cachedKeys.has(j.cacheKey))

  if (pending.length === 0) {
    return NextResponse.json({
      done: true,
      processed: totalJobs,
      remaining: 0,
      message: "All chapters pre-warmed successfully!",
    })
  }

  const job = pending[0]
  const remaining = pending.length
  const cls = parseInt(job.classNum)
  const group = getClassGroup(cls)

  try {
    let content: string

    if (job.tab === "notes") {
      const maxTok = group === "6-8" ? 3000 : group === "9-10" ? 4000 : 5000
      content = await callGroq(getNotesPrompt(job), SYSTEM_PROMPT, maxTok)

    } else if (job.tab === "iq") {
      const maxTok = group === "6-8" ? 3500 : group === "9-10" ? 5000 : 6000
      content = await callGroq(getIQPrompt(job), SYSTEM_PROMPT, maxTok)

    } else {
      // quiz — sequential calls to avoid Groq rate limit
      const topicHints = ["definitions, basic concepts, key facts", "processes, causes, effects, examples"]
      const results: string[] = []

      for (let i = 0; i < topicHints.length; i++) {
        if (i > 0) await sleep(1500) // wait between sequential calls
        const r = await callGroq(
          getQuizPrompt(job) + `\nBatch ${i + 1} — Focus: ${topicHints[i]}`,
          SYSTEM_PROMPT,
          2048
        )
        results.push(r)
      }

      const allQ = results.flatMap(parseQuizJSON)
      const seen = new Set<string>()
      const unique = allQ.filter((q: any) => {
        if (!q?.question || seen.has(q.question)) return false
        seen.add(q.question)
        return true
      })
      content = JSON.stringify(unique)
    }

    // Save to Supabase
    await db.from("content_cache").upsert({
      cache_key: job.cacheKey,
      content,
      class_num: cls,
      chapter_id: job.chapterId,
      tab: job.tab,
    }, { onConflict: "cache_key" })

    return NextResponse.json({
      done: false,
      processed: totalJobs - remaining + 1,
      remaining: remaining - 1,
      total: totalJobs,
      last: `Class ${job.classNum} | ${job.subject} | ${job.chapterName} | ${job.tab}`,
    })

  } catch (error: any) {
    // CRITICAL FIX: Save error placeholder to Supabase so this job is skipped
    // on the next call — prevents infinite retry loop on the same key
    try {
      await db.from("content_cache").upsert({
        cache_key: job.cacheKey,
        content: "__ERROR__",
        class_num: cls,
        chapter_id: job.chapterId,
        tab: job.tab,
      }, { onConflict: "cache_key" })
    } catch (_) {
      // If even the error save fails, we continue — HTML will retry
    }

    return NextResponse.json({
      done: false,
      error: error?.message,
      remaining,
      skipped: job.cacheKey,
    }, { status: 200 })
  }
}

export const maxDuration = 60
          
