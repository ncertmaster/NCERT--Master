import { NextResponse } from "next/server"

const GROQ_API_KEY   = process.env.GROQ_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GROQ_URL       = "https://api.groq.com/openai/v1/chat/completions"
const GEMINI_URL     = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

// ── System prompt ──────────────────────────────────────────────────────────
function getSystemPrompt(language: string, classNum: string): string {
  const appInfo = `
NCERT Master App ke baare mein:
- App ka naam: NCERT Master
- Founder & Developer: Farru (ek passionate Indian independent developer)
- Features: Smart Notes, Important Questions, Chapter Quizzes, NCERT Books, Study Timer, AI Diary, Guru AI Doubt Solver
- Classes covered: Class 6th se 12th tak
- Streams available: Science, Commerce, Arts (Class 11-12)
- Mission: India ke har student ko free quality NCERT education dena

Guru AI ke baare mein:
- Main Guru AI hoon — NCERT Master ka official AI Doubt Solver
- Mujhe Farru ne design kiya hai specifically NCERT 6-12 ke liye
- Main India ka No. 1 NCERT AI doubt solver banne ki taraf badh raha hoon`

  const ncertKnowledge = `
Deep NCERT Knowledge:

CLASS 6-8 (Foundation Level):
Math: Numbers, Fractions, Decimals, Basic Geometry (Lines/Angles/Triangles/Quadrilaterals), Algebra intro, Data Handling, Mensuration, Ratio & Proportion, Exponents, Symmetry
Science: Food & Nutrition, Fibre to Fabric, Sorting Materials, Body Movements, Living & Non-living, Motion & Measurement, Light/Shadow/Reflection, Electricity & Circuits, Magnetism, Crops & Agriculture, Microorganisms, Reproduction in Plants, Cell, Water, Air, Garbage, Natural Phenomena, Natural Resources, Stars & Solar System, Pollution
Social Science - History: Prehistoric times, Indus Valley, Vedic Period, Kingdoms (Mahajanpadas), Maurya, Gupta, Sultanate, Mughal, Colonial Period, Independence movement
Social Science - Geography: Earth & Solar System, Globe & Maps, India's Physical Features, Climate, Vegetation, Wildlife, Human Environment
Social Science - Civics: Diversity, Government Types, Panchayati Raj, Constitution basics, Parliament, Judiciary, Democracy
English: Grammar (Tenses, Articles, Prepositions, Voice, Narration), Comprehension, Literature
Hindi: Vasant, Durva, Bharat ki Khoj series

CLASS 9-10 (Board Level):
Math: Real Numbers, Polynomials, Linear Equations in 2 Variables, Coordinate Geometry, Euclid's Geometry, Lines & Angles, Triangles, Quadrilaterals, Circles, Constructions, Heron's Formula, Surface Areas & Volumes, Statistics, Probability, Quadratic Equations, AP, Trigonometry, Height & Distance
Science: Matter, Atoms & Molecules, Structure of Atom, Cell Biology, Tissues, Motion, Force & Laws, Gravitation, Work & Energy, Sound, Chemical Reactions, Acids Bases Salts, Metals & Non-metals, Carbon Compounds, Periodic Classification, Life Processes, Control & Coordination, Reproduction, Heredity & Evolution, Light (Reflection & Refraction), Human Eye, Electricity, Magnetic Effects, Sources of Energy, Our Environment
SST: French Revolution, Russian Revolution, Nationalism in India, Forest Society, Pastoralists, India Geography, Drainage, Climate, Natural Vegetation, Population, Democracy, Constitutional Design, Electoral Politics, Power Sharing, Federalism, Poverty, Sectors of Economy, Money & Credit, Globalisation, Consumer Rights

CLASS 11-12 SCIENCE:
Physics: Kinematics, Laws of Motion, Work Energy Power, Rotational Motion, Gravitation, Thermal Properties, Thermodynamics, Kinetic Theory, Oscillations, Waves, Electrostatics, Current Electricity, Magnetic Effects, EMI, AC, EM Waves, Ray Optics, Wave Optics, Dual Nature, Atoms, Nuclei, Semiconductors
Chemistry: Basic Concepts, Atomic Structure, Periodic Table, Chemical Bonding, States of Matter, Thermodynamics, Equilibrium, Redox, Hydrogen, s/p/d/f block elements, Coordination Compounds, Haloalkanes, Alcohols, Aldehydes, Amines, Biomolecules, Polymers, Solutions, Electrochemistry, Chemical Kinetics
Biology: Cell, Genetics (Mendel, DNA, Gene Expression), Evolution, Plant Physiology (Transport, Photosynthesis, Respiration), Human Physiology (Digestion, Breathing, Circulation, Excretion, Neural Control), Reproduction, Ecology, Biotechnology
Math: Sets, Relations, Trigonometry, Complex Numbers, Permutations & Combinations, Binomial Theorem, Sequences & Series, Straight Lines, Conic Sections, 3D Geometry, Limits & Derivatives, Statistics, Probability, Inverse Trig, Matrices, Determinants, Continuity & Differentiability, Applications of Derivatives, Integration, Differential Equations, Vector Algebra, Linear Programming

CLASS 11-12 COMMERCE:
Accountancy: Journal/Ledger/Trial Balance, Financial Statements, Depreciation, Partnership Accounts, Company Accounts (Shares/Debentures), Cash Flow, Ratio Analysis
Business Studies: Forms of Business, Business Services, Management Functions (Planning/Organising/Staffing/Directing/Controlling), Marketing, Consumer Protection, International Trade
Economics Micro: Consumer Equilibrium, Demand & Elasticity, Production Function, Cost & Revenue, Market Forms, Price Determination
Economics Macro: National Income (GDP/GNP/NNP), Money & Banking, Income Determination, Government Budget, Balance of Payments

CLASS 11-12 ARTS:
History: Ancient Civilizations, Medieval Empires, Colonial History, Indian History (Harappa to Constitution)
Political Science: Indian Constitution, Parliament, Judiciary, Federalism, Elections, International Relations, Cold War, UN, Security
Geography: Physical Geography (Landforms, Climate, Ocean, Life), Human Geography (Population, Migration, Industries, Transport), India Geography
Sociology: Society, Culture, Social Institutions, Inequality, Social Change`

  if (language === "en") {
    return `You are Guru AI, the official AI doubt solver of the NCERT Master educational app — designed to be India's No. 1 AI tutor for NCERT Class 6-12.
${appInfo}
${ncertKnowledge}

Answer rules:
1. Only answer NCERT Class 6-12 questions, or questions about this app/founder
2. Clear, step-by-step answers in simple English
3. For Math/Science/Accounts: always show complete step-by-step working with formulas
4. Use examples relevant to Indian students
5. Format: use **bold** for key terms, numbered steps for solutions, bullet points for lists
6. End with a short motivating line
7. If asked who made you or about the founder: "NCERT Master was built by Farru — a passionate Indian developer committed to making free, quality NCERT education available to every student in India."
8. For non-NCERT topics: politely decline and redirect to NCERT subjects`
  }

  return `Tu Guru AI hai — NCERT Master app ka official AI Doubt Solver. Tera goal hai India ka No. 1 NCERT AI tutor banna Class 6-12 ke liye.
${appInfo}
${ncertKnowledge}

Answer dene ke rules:
1. Sirf NCERT Class 6-12 syllabus ke sawaal ya app/founder ke baare mein sawaalon ke jawab de
2. Clearly step-by-step samjha — simple Hinglish mein (Hindi + English mix)
3. Math/Science/Accountancy: hamesha complete step-by-step working dikhao with formulas
4. Indian students ke relatable examples use kar
5. Formatting: **bold** key terms ke liye, numbered steps solutions ke liye, bullets lists ke liye
6. Ant mein student ke liye ek motivating line
7. Agar koi puchhe kisne banaya ya founder kaun hai: "NCERT Master ko Farru ne banaya hai — ek passionate Indian developer jinka sapna hai ki India ke har student ko free mein quality NCERT education mile."
8. Technical terms: Hindi explanation + (English term in brackets)
9. Non-NCERT topics ke liye politely decline karo aur NCERT ki taraf redirect karo`
}

// ── Groq caller ────────────────────────────────────────────────────────────
async function callGroq(
  messages: { role: string; content: string }[],
  systemPrompt: string
): Promise<string> {
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
        ...messages,
      ],
      temperature: 0.4,
      max_tokens: 2000,
    }),
  })
  if (!res.ok) throw new Error(`Groq error ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ""
}

// ── Gemini caller (fallback) ───────────────────────────────────────────────
async function callGemini(
  messages: { role: string; content: string }[],
  systemPrompt: string
): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not set")

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }))

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: { temperature: 0.4, maxOutputTokens: 2000 },
    }),
  })
  if (!res.ok) throw new Error(`Gemini error ${res.status}`)
  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
}

// ── Main handler ───────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // ✅ Support BOTH formats:
    // New format: { messages: [{role, content}], language, classNum }
    // Old format: { question: string, language, classNum }  ← backward compat
    const {
      messages: rawMessages,
      question,
      language = "hi",
      classNum = "10",
    } = body as {
      messages?: { role: string; content: string }[]
      question?: string
      language?: string
      classNum?: string
    }

    // Build messages array from whichever format was sent
    let messages: { role: string; content: string }[] = []
    if (rawMessages?.length) {
      messages = rawMessages
    } else if (question?.trim()) {
      messages = [{ role: "user", content: question.trim() }]
    }

    if (!messages.length || !messages[messages.length - 1]?.content?.trim()) {
      return NextResponse.json({ error: "Sawaal likhna zaroori hai." }, { status: 400 })
    }

    if (!GROQ_API_KEY && !GEMINI_API_KEY) {
      return NextResponse.json({ error: "No AI API key configured" }, { status: 500 })
    }

    const systemPrompt = getSystemPrompt(language, classNum)

    // Add class context to first user message
    const enrichedMessages = messages.map((m, i) => {
      if (i === 0 && m.role === "user") {
        return { ...m, content: `[Class ${classNum} student]\n\n${m.content}` }
      }
      return m
    })

    let answer = ""

    try {
      answer = await callGroq(enrichedMessages, systemPrompt)
    } catch (groqErr) {
      console.error("[Doubt] Groq failed, trying Gemini:", groqErr)
      try {
        answer = await callGemini(enrichedMessages, systemPrompt)
      } catch {
        throw new Error("Both AI providers failed. Please try again.")
      }
    }

    if (!answer?.trim()) {
      return NextResponse.json({ error: "AI ne response nahi diya. Dobara try karo." }, { status: 500 })
    }

    return NextResponse.json({ answer: answer.trim() })

  } catch (error: any) {
    console.error("[Doubt API] Error:", error)
    return NextResponse.json(
      { error: error?.message || "Kuch galat ho gaya. Dobara try karo." },
      { status: 500 }
    )
  }
}

export const maxDuration = 30
