import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getUserId(): string {
  if (typeof window === "undefined") return "server"
  let uid = localStorage.getItem("ncert_uid_v1")
  if (!uid) {
    uid = crypto.randomUUID()
    localStorage.setItem("ncert_uid_v1", uid)
  }
  return uid
}
