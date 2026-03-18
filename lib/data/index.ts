export * from "./types"
export * from "./classes/index"
export * from "./streams/index"

import { class6Subjects } from "./classes/class-6"
import { class7Subjects } from "./classes/class-7"
import { class8Subjects } from "./classes/class-8"
import { class9Subjects } from "./classes/class-9"
import { class10Subjects } from "./classes/class-10"
import { class11Streams } from "./streams/class-11"
import { class12Streams } from "./streams/class-12"

export const subjectsByClass: Record<number, any[]> = {
  6: class6Subjects,
  7: class7Subjects,
  8: class8Subjects,
  9: class9Subjects,
  10: class10Subjects,
}

export const streamsByClass: Record<number, any[]> = {
  11: class11Streams,
  12: class12Streams,
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
