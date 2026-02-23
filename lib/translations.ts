export type Language = "en" | "hi"

interface Translations {
  [key: string]: {
    en: string
    hi: string
  }
}

export const t: Translations = {
  appName: { en: "NCERT Master", hi: "NCERT मास्टर" },
  tagline: { en: "Learn Smarter, Score Better", hi: "स्मार्ट पढ़ाई, बेहतर परिणाम" },
  login: { en: "Login", hi: "लॉगिन" },
  signup: { en: "Sign Up", hi: "साइन अप" },
  name: { en: "Name", hi: "नाम" },
  email: { en: "Email or Mobile", hi: "ईमेल या मोबाइल" },
  password: { en: "Password", hi: "पासवर्ड" },
  dontHaveAccount: { en: "Don't have an account?", hi: "खाता नहीं है?" },
  alreadyHaveAccount: { en: "Already have an account?", hi: "पहले से खाता है?" },
  setupProfile: { en: "Setup Profile", hi: "प्रोफ़ाइल सेटअप" },
  selectClass: { en: "Select Class", hi: "कक्षा चुनें" },
  yourAim: { en: "Your Aim", hi: "आपका लक्ष्य" },
  profilePhoto: { en: "Profile Photo", hi: "प्रोफ़ाइल फोटो" },
  optional: { en: "(Optional)", hi: "(वैकल्पिक)" },
  submit: { en: "Submit", hi: "सबमिट" },
  getStarted: { en: "Get Started", hi: "शुरू करें" },
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  books: { en: "Books", hi: "पुस्तकें" },
  notes: { en: "Notes", hi: "नोट्स" },
  importantQuestions: { en: "Important Questions", hi: "महत्वपूर्ण प्रश्न" },
  quiz: { en: "Quiz", hi: "क्विज़" },
  class: { en: "Class", hi: "कक्षा" },
  aim: { en: "Aim", hi: "लक्ष्य" },
  selectSubject: { en: "Select Subject", hi: "विषय चुनें" },
  selectChapter: { en: "Select Chapter", hi: "अध्याय चुनें" },
  chapterWise: { en: "Chapter Wise", hi: "अध्याय के अनुसार" },
  fullSubject: { en: "Full Subject", hi: "पूरा विषय" },
  selectMode: { en: "Select Mode", hi: "मोड चुनें" },
  startQuiz: { en: "Start Quiz", hi: "क्विज़ शुरू करें" },
  next: { en: "Next", hi: "अगला" },
  correct: { en: "Correct!", hi: "सही!" },
  wrong: { en: "Wrong!", hi: "गलत!" },
  correctAnswer: { en: "Correct Answer", hi: "सही उत्तर" },
  quizComplete: { en: "Quiz Complete!", hi: "क्विज़ पूरा!" },
  score: { en: "Score", hi: "स्कोर" },
  backToDashboard: { en: "Back to Dashboard", hi: "डैशबोर्ड पर वापस जाएँ" },
  settings: { en: "Settings", hi: "सेटिंग्स" },
  darkMode: { en: "Dark Mode", hi: "डार्क मोड" },
  language: { en: "Language", hi: "भाषा" },
  english: { en: "English", hi: "अंग्रेज़ी" },
  hindi: { en: "Hindi", hi: "हिंदी" },
  logout: { en: "Logout", hi: "लॉगआउट" },
  welcome: { en: "Welcome", hi: "स्वागत है" },
  question: { en: "Question", hi: "प्रश्न" },
  of: { en: "of", hi: "का" },
  uploadPhoto: { en: "Upload Photo", hi: "फोटो अपलोड करें" },
  back: { en: "Back", hi: "वापस" },
  selectClassFirst: { en: "Select Class", hi: "कक्षा चुनें" },
  tryAgain: { en: "Try Again", hi: "पुनः प्रयास करें" },
  contentLanguageNote: { en: "Content is available in Hindi only", hi: "सामग्री केवल हिंदी में उपलब्ध है" },
  target: { en: "Target", hi: "लक्ष्य" },
  mode: { en: "Mode", hi: "मोड" },
  home: { en: "Home", hi: "होम" },
}

export function getText(key: string, lang: Language): string {
  return t[key]?.[lang] || t[key]?.["en"] || key
}
