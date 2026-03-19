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
