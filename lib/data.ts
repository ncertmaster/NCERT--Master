export type ClassNumber = 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface Book {
  id: string
  name: string
  nameHi: string
  chapters: Chapter[]
}

export interface Subject {
  id: string
  name: string
  nameHi: string
  icon: string
  books: Book[]
}

export interface Chapter {
  id: string
  name: string
  nameHi: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
}

export const subjectsByClass: Record<number, Subject[]> = {
  6: [
    {
      id: "science",
      name: "Science",
      nameHi: "विज्ञान",
      icon: "flask",
      books: [
        {
          id: "science-book1",
          name: "Science",
          nameHi: "विज्ञान",
          chapters: []
        }
      ]
    },
    {
      id: "social-studies",
      name: "Social Studies",
      nameHi: "सामाजिक अध्ययन",
      icon: "globe",
      books: [
        {
          id: "hamare-ateet",
          name: "Hamare Ateet",
          nameHi: "हमारे अतीत",
          chapters: []
        },
        {
          id: "samajik-rajnitik-jeevan",
          name: "Samajik Evam Rajnitik Jeevan",
          nameHi: "सामाजिक एवं राजनीतिक जीवन",
          chapters: []
        },
        {
          id: "prithvi-hamara-avas",
          name: "Prithvi Hamara Avas",
          nameHi: "पृथ्वी हमारा आवास",
          chapters: []
        }
      ]
    },
    {
      id: "english",
      name: "English",
      nameHi: "अंग्रेज़ी",
      icon: "book-open",
      books: [
        {
          id: "honeysuckle",
          name: "Honeysuckle",
          nameHi: "Honeysuckle",
          chapters: []
        },
        {
          id: "a-pact-with-the-sun",
          name: "A Pact With The Sun",
          nameHi: "A Pact With The Sun",
          chapters: []
        }
      ]
    },
  ],
  7: [],
  8: [],
  9: [],
  10: [],
  11: [],
  12: [],
}

export function getQuizQuestions(subjectId: string, chapterId?: string): QuizQuestion[] {
  return []
}

export function getNotesContent(chapterName: string): string {
  return `"${chapterName}" ke notes coming soon...`
}

export function getImportantQuestions(chapterName: string): string[] {
  return []
}
