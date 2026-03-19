export * from "./types"
export * from "./classes/index"
export * from "./streams/index"

import { class6Subjects } from "./classes/class-6"
import { class7Subjects } from "./classes/class-7"
import { class8Subjects } from "./classes/class-8"
import { class9Subjects } from "./classes/class-9"
import { class10Subjects } from "./classes/class-10"
import { class11ScienceStream } from "./streams/class-11-science"
import { class11CommerceStream } from "./streams/class-11-commerce"
import { class11ArtsStream } from "./streams/class-11-arts"
import { class12ScienceStream } from "./streams/class-12-science"
import { class12CommerceStream } from "./streams/class-12-commerce"
import { class12ArtsStream } from "./streams/class-12-arts"

export const subjectsByClass: Record<number, any[]> = {
  6: class6Subjects,
  7: class7Subjects,
  8: class8Subjects,
  9: class9Subjects,
  10: class10Subjects,
}

export const streamsByClass: Record<number, any[]> = {
  11: [class11ScienceStream, class11CommerceStream, class11ArtsStream],
  12: [class12ScienceStream, class12CommerceStream, class12ArtsStream],
}

export type QuizQuestion = {
  question: string
  options: string[]
  correctIndex: number
}

export function getQuizQuestions(subjectId: string, chapterId?: string): QuizQuestion[] {
  return []
}

export function getNotesContent(chapterId: string) {
  return ""
}

export function getImportantQuestions(chapterId: string) {
  return []
}
