export type ClassNumber = 6 | 7 | 8 | 9 | 10 | 11 | 12

export type Chapter = {
  id: string
  name: string
  nameHi: string
}

export type Book = {
  id: string
  name: string
  nameHi: string
  chapters: Chapter[]
  ncertUrl?: string       // Official NCERT epathshala PDF URL
  ncertPdfCode?: string   // e.g. "jesc1" → jesc101.pdf, jesc102.pdf ...
}

export type Subject = {
  id: string
  name: string
  nameHi: string
  icon: string
  books: Book[]
  tabs: ("books" | "notes" | "iq" | "quiz")[]
}

export type Stream = {
  id: string
  name: string
  nameHi: string
  subjects: Subject[]
}
