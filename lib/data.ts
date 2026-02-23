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

export interface Stream {
  id: string
  name: string
  nameHi: string
  subjects: Subject[]
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
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [
        { id: "science-book1", name: "Science", nameHi: "विज्ञान", chapters: [] }
      ]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक अध्ययन", icon: "globe",
      books: [
        { id: "hamare-ateet", name: "Hamare Ateet", nameHi: "हमारे अतीत", chapters: [] },
        { id: "samajik-rajnitik-jeevan", name: "Samajik Evam Rajnitik Jeevan", nameHi: "सामाजिक एवं राजनीतिक जीवन", chapters: [] },
        { id: "prithvi-hamara-avas", name: "Prithvi Hamara Avas", nameHi: "पृथ्वी हमारा आवास", chapters: [] }
      ]
    },
    {
      id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
      books: [
        { id: "honeysuckle", name: "Honeysuckle", nameHi: "Honeysuckle", chapters: [] },
        { id: "a-pact-with-the-sun", name: "A Pact With The Sun", nameHi: "A Pact With The Sun", chapters: [] }
      ]
    },
  ],
  7: [
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [
        { id: "science-book1", name: "Science", nameHi: "विज्ञान", chapters: [] }
      ]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक अध्ययन", icon: "globe",
      books: [
        { id: "samajik-rajnitik-jeevan", name: "Samajik Evam Rajnitik Jeevan", nameHi: "सामाजिक एवं राजनीतिक जीवन", chapters: [] },
        { id: "hamara-paryavaran", name: "Hamara Paryavaran", nameHi: "हमारा पर्यावरण", chapters: [] },
        { id: "hamare-ateet", name: "Hamare Ateet", nameHi: "हमारे अतीत", chapters: [] }
      ]
    },
    {
      id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
      books: [
        { id: "honeycomb", name: "Honeycomb", nameHi: "Honeycomb", chapters: [] },
        { id: "an-alien-hand", name: "An Alien Hand", nameHi: "An Alien Hand", chapters: [] }
      ]
    },
  ],
  8: [
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [
        { id: "science-book1", name: "Science", nameHi: "विज्ञान", chapters: [] }
      ]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक अध्ययन", icon: "globe",
      books: [
        { id: "hamare-ateet", name: "Hamare Ateet", nameHi: "हमारे अतीत", chapters: [] }
      ]
    },
    {
      id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
      books: [
        { id: "basant", name: "Basant", nameHi: "बसंत", chapters: [] },
        { id: "bharat-ki-khoj", name: "Bharat Ki Khoj", nameHi: "भारत की खोज", chapters: [] },
        { id: "buddhcharit", name: "Sanshipt Buddhcharit", nameHi: "संक्षिप्त बुद्धचरित", chapters: [] }
      ]
    },
    {
      id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
      books: [
        { id: "honeydew", name: "Honeydew", nameHi: "Honeydew", chapters: [] },
        { id: "it-so-happened", name: "It So Happened", nameHi: "It So Happened", chapters: [] }
      ]
    },
  ],
  9: [
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [
        { id: "math-book1", name: "Mathematics", nameHi: "गणित", chapters: [] }
      ]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [
        { id: "science-book1", name: "Science", nameHi: "विज्ञान", chapters: [] }
      ]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक अध्ययन", icon: "globe",
      books: [
        { id: "loktantrik-rajniti", name: "Loktantrik Rajniti", nameHi: "लोकतांत्रिक राजनीति-1", chapters: [] },
        { id: "samkalin-bharat", name: "Samkalin Bharat", nameHi: "समकालीन भारत-1", chapters: [] },
        { id: "bharat-aur-vishwa", name: "Bharat Aur Vishwa", nameHi: "भारत और समकालीन विश्व-1", chapters: [] },
        { id: "arthshastra", name: "Arthshastra", nameHi: "अर्थशास्त्र", chapters: [] }
      ]
    },
    {
      id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
      books: [
        { id: "kshitij", name: "Kshitij", nameHi: "क्षितिज", chapters: [] },
        { id: "kritika", name: "Kritika", nameHi: "कृतिका", chapters: [] },
        { id: "sparsh", name: "Sparsh", nameHi: "स्पर्श", chapters: [] },
        { id: "sanchayan", name: "Sanchayan", nameHi: "संचयन", chapters: [] }
      ]
    },
    {
      id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
      books: [
        { id: "beehive", name: "Beehive", nameHi: "Beehive", chapters: [] },
        { id: "moments", name: "Moments", nameHi: "Moments", chapters: [] }
      ]
    },
  ],
  10: [
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [
        { id: "math-book1", name: "Mathematics", nameHi: "गणित", chapters: [] }
      ]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [
        { id: "science-book1", name: "Science", nameHi: "विज्ञान", chapters: [] }
      ]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक अध्ययन", icon: "globe",
      books: [
        { id: "bharat-vishwa", name: "Bharat Aur Vishwa", nameHi: "भारत और समकालीन विश्व-2", chapters: [] },
        { id: "samkalin-bharat", name: "Samkalin Bharat", nameHi: "समकालीन भारत-2", chapters: [] },
        { id: "loktantrik-rajniti", name: "Loktantrik Rajniti", nameHi: "लोकतांत्रिक राजनीति-2", chapters: [] },
        { id: "arthik-vikas", name: "Arthik Vikas", nameHi: "आर्थिक विकास की समझ", chapters: [] }
      ]
    },
    {
      id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
      books: [
        { id: "kshitij2", name: "Kshitij 2", nameHi: "क्षितिज-2", chapters: [] },
        { id: "kritika2", name: "Kritika 2", nameHi: "कृतिका-2", chapters: [] },
        { id: "sparsh2", name: "Sparsh 2", nameHi: "स्पर्श-2", chapters: [] },
        { id: "sanchayan2", name: "Sanchayan 2", nameHi: "संचयन-2", chapters: [] }
      ]
    },
    {
      id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
      books: [
        { id: "first-flight", name: "First Flight", nameHi: "First Flight", chapters: [] },
        { id: "footprints", name: "Footprints Without Feet", nameHi: "Footprints Without Feet", chapters: [] }
      ]
    },
  ],
  11: [],
  12: [],
}

export const streamsByClass: Record<number, Stream[]> = {
  11: [
    {
      id: "science", name: "Science", nameHi: "विज्ञान",
      subjects: [
        {
          id: "physics", name: "Physics", nameHi: "भौतिकी", icon: "atom",
          books: [
            { id: "physics-1", name: "Physics Part I", nameHi: "भौतिकी भाग 1", chapters: [] },
            { id: "physics-2", name: "Physics Part II", nameHi: "भौतिकी भाग 2", chapters: [] }
          ]
        },
        {
          id: "chemistry", name: "Chemistry", nameHi: "रसायन विज्ञान", icon: "flask",
          books: [
            { id: "chemistry-1", name: "Chemistry Part I", nameHi: "रसायन विज्ञान भाग 1", chapters: [] },
            { id: "chemistry-2", name: "Chemistry Part II", nameHi: "रसायन विज्ञान भाग 2", chapters: [] }
          ]
        },
        {
          id: "biology", name: "Biology", nameHi: "जीव विज्ञान", icon: "leaf",
          books: [
            { id: "biology-1", name: "Biology", nameHi: "जीव विज्ञान", chapters: [] }
          ]
        },
        {
          id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
          books: [
            { id: "math-1", name: "Mathematics", nameHi: "गणित", chapters: [] }
          ]
        },
        {
          id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
          books: [
            { id: "hornbill", name: "Hornbill", nameHi: "Hornbill", chapters: [] },
            { id: "snapshots", name: "Snapshots", nameHi: "Snapshots", chapters: [] }
          ]
        },
      ]
    },
    {
      id: "commerce", name: "Commerce", nameHi: "वाणिज्य",
      subjects: [
        {
          id: "accountancy", name: "Accountancy", nameHi: "लेखाशास्त्र", icon: "book",
          books: [
            { id: "accountancy-1", name: "Accountancy Part I", nameHi: "लेखाशास्त्र भाग 1", chapters: [] },
            { id: "accountancy-2", name: "Accountancy Part II", nameHi: "लेखाशास्त्र भाग 2", chapters: [] }
          ]
        },
        {
          id: "business-studies", name: "Business Studies", nameHi: "व्यवसाय अध्ययन", icon: "briefcase",
          books: [
            { id: "business-1", name: "Business Studies", nameHi: "व्यवसाय अध्ययन", chapters: [] }
          ]
        },
        {
          id: "economics", name: "Economics", nameHi: "अर्थशास्त्र", icon: "trending-up",
          books: [
            { id: "eco-1", name: "Indian Economic Development", nameHi: "भारतीय आर्थिक विकास", chapters: [] },
            { id: "eco-2", name: "Statistics for Economics", nameHi: "अर्थशास्त्र के लिए सांख्यिकी", chapters: [] }
          ]
        },
        {
          id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
          books: [
            { id: "hornbill", name: "Hornbill", nameHi: "Hornbill", chapters: [] },
            { id: "snapshots", name: "Snapshots", nameHi: "Snapshots", chapters: [] }
          ]
        },
      ]
    },
    {
      id: "arts", name: "Arts", nameHi: "कला",
      subjects: [
        {
          id: "history", name: "History", nameHi: "इतिहास", icon: "book",
          books: [
            { id: "history-1", name: "Themes in World History", nameHi: "विश्व इतिहास के विषय", chapters: [] }
          ]
        },
        {
          id: "political-science", name: "Political Science", nameHi: "राजनीति विज्ञान", icon: "landmark",
          books: [
            { id: "polsci-1", name: "Indian Constitution at Work", nameHi: "भारतीय संविधान का कार्यान्वयन", chapters: [] },
            { id: "polsci-2", name: "Political Theory", nameHi: "राजनीतिक सिद्धांत", chapters: [] }
          ]
        },
        {
          id: "geography", name: "Geography", nameHi: "भूगोल", icon: "map",
          books: [
            { id: "geo-1", name: "Fundamentals of Physical Geography", nameHi: "भौतिक भूगोल के मूल सिद्धांत", chapters: [] },
            { id: "geo-2", name: "India Physical Environment", nameHi: "भारत का भौतिक पर्यावरण", chapters: [] },
            { id: "geo-3", name: "Practical Work in Geography", nameHi: "भूगोल में प्रायोगिक कार्य", chapters: [] }
          ]
        },
        {
          id: "sociology", name: "Sociology", nameHi: "समाजशास्त्र", icon: "users",
          books: [
            { id: "soc-1", name: "Understanding Society", nameHi: "समाज को समझना", chapters: [] }
          ]
        },
        {
          id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
          books: [
            { id: "hornbill", name: "Hornbill", nameHi: "Hornbill", chapters: [] },
            { id: "snapshots", name: "Snapshots", nameHi: "Snapshots", chapters: [] }
          ]
        },
      ]
    },
  ],
  12: [
    {
      id: "science", name: "Science", nameHi: "विज्ञान",
      subjects: [
        {
          id: "physics", name: "Physics", nameHi: "भौतिकी", icon: "atom",
          books: [
            { id: "physics-1", name: "Physics Part I", nameHi: "भौतिकी भाग 1", chapters: [] },
            { id: "physics-2", name: "Physics Part II", nameHi: "भौतिकी भाग 2", chapters: [] }
          ]
        },
        {
          id: "chemistry", name: "Chemistry", nameHi: "रसायन विज्ञान", icon: "flask",
          books: [
            { id: "chemistry-1", name: "Chemistry Part I", nameHi: "रसायन विज्ञान भाग 1", chapters: [] },
            { id: "chemistry-2", name: "Chemistry Part II", nameHi: "रसायन विज्ञान भाग 2", chapters: [] }
          ]
        },
        {
          id: "biology", name: "Biology", nameHi: "जीव विज्ञान", icon: "leaf",
          books: [
            { id: "biology-1", name: "Biology", nameHi: "जीव विज्ञान", chapters: [] }
          ]
        },
        {
          id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
          books: [
            { id: "math-1", name: "Mathematics Part I", nameHi: "गणित भाग 1", chapters: [] },
            { id: "math-2", name: "Mathematics Part II", nameHi: "गणित भाग 2", chapters: [] }
          ]
        },
        {
          id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
          books: [
            { id: "flamingo", name: "Flamingo", nameHi: "Flamingo", chapters: [] },
            { id: "vistas", name: "Vistas", nameHi: "Vistas", chapters: [] }
          ]
        },
      ]
    },
    {
      id: "commerce", name: "Commerce", nameHi: "वाणिज्य",
      subjects: [
        {
          id: "accountancy", name: "Accountancy", nameHi: "लेखाशास्त्र", icon: "book",
          books: [
            { id: "accountancy-1", name: "Accountancy Part I", nameHi: "लेखाशास्त्र भाग 1", chapters: [] },
            { id: "accountancy-2", name: "Accountancy Part II", nameHi: "लेखाशास्त्र भाग 2", chapters: [] }
          ]
        },
        {
          id: "business-studies", name: "Business Studies", nameHi: "व्यवसाय अध्ययन", icon: "briefcase",
          books: [
            { id: "business-1", name: "Business Studies Part I", nameHi: "व्यवसाय अध्ययन भाग 1", chapters: [] },
            { id: "business-2", name: "Business Studies Part II", nameHi: "व्यवसाय अध्ययन भाग 2", chapters: [] }
          ]
        },
        {
          id: "economics", name: "Economics", nameHi: "अर्थशास्त्र", icon: "trending-up",
          books: [
            { id: "eco-1", name: "Introductory Microeconomics", nameHi: "प्रारंभिक सूक्ष्म अर्थशास्त्र", chapters: [] },
            { id: "eco-2", name: "Introductory Macroeconomics", nameHi: "प्रारंभिक व्यापक अर्थशास्त्र", chapters: [] }
          ]
        },
        {
          id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
          books: [
            { id: "flamingo", name: "Flamingo", nameHi: "Flamingo", chapters: [] },
            { id: "vistas", name: "Vistas", nameHi: "Vistas", chapters: [] }
          ]
        },
      ]
    },
    {
      id: "arts", name: "Arts", nameHi: "कला",
      subjects: [
        {
          id: "history", name: "History", nameHi: "इतिहास", icon: "book",
          books: [
            { id: "history-1", name: "Themes in Indian History Part I", nameHi: "भारतीय इतिहास के विषय भाग 1", chapters: [] },
            { id: "history-2", name: "Themes in Indian History Part II", nameHi: "भारतीय इतिहास के विषय भाग 2", chapters: [] },
            { id: "history-3", name: "Themes in Indian History Part III", nameHi: "भारतीय इतिहास के विषय भाग 3", chapters: [] }
          ]
        },
        {
          id: "political-science", name: "Political Science", nameHi: "राजनीति विज्ञान", icon: "landmark",
          books: [
            { id: "polsci-1", name: "Contemporary World Politics", nameHi: "समकालीन विश्व राजनीति", chapters: [] },
            { id: "polsci-2", name: "Politics in India Since Independence", nameHi: "स्वतंत्रता के बाद भारत की राजनीति", chapters: [] }
          ]
        },
        {
          id: "geography", name: "Geography", nameHi: "भूगोल", icon: "map",
          books: [
            { id: "geo-1", name: "Fundamentals of Human Geography", nameHi: "मानव भूगोल के मूल सिद्धांत", chapters: [] },
            { id: "geo-2", name: "India People and Economy", nameHi: "भारत: लोग और अर्थव्यवस्था", chapters: [] },
            { id: "geo-3", name: "Practical Work in Geography Part II", nameHi: "भूगोल में प्रायोगिक कार्य भाग 2", chapters: [] }
          ]
        },
        {
          id: "sociology", name: "Sociology", nameHi: "समाजशास्त्र", icon: "users",
          books: [
            { id: "soc-1", name: "Indian Society", nameHi: "भारतीय समाज", chapters: [] },
            { id: "soc-2", name: "Social Change and Development in India", nameHi: "भारत में सामाजिक परिवर्तन और विकास", chapters: [] }
          ]
        },
        {
          id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open",
          books: [
            { id: "flamingo", name: "Flamingo", nameHi: "Flamingo", chapters: [] },
            { id: "vistas", name: "Vistas", nameHi: "Vistas", chapters: [] }
          ]
        },
      ]
    },
  ],
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
