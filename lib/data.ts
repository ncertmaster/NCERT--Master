export type ClassNumber = 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface Chapter {
id: string
name: string
nameHi: string
}

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

export interface QuizQuestion {
id: string
question: string
options: string[]
correctIndex: number
}

/* =========================
CLASS 6–10 (COMPLETE)
========================= */

export const subjectsByClass: Record<ClassNumber, Subject[]> = {
6: [
{
id: "hindi",
name: "Hindi",
nameHi: "हिंदी",
icon: "languages",
books: [
{ id: "vasant-1", name: "Vasant Bhag 1", nameHi: "वसंत भाग 1", chapters: [] },
{ id: "bal-ramkatha", name: "Bal Ramkatha", nameHi: "बाल रामकथा", chapters: [] },
],
},
{
id: "english",
name: "English",
nameHi: "English",
icon: "book-open",
books: [
{ id: "honeysuckle", name: "Honeysuckle", nameHi: "Honeysuckle", chapters: [] },
{ id: "a-pact-with-the-sun", name: "A Pact With The Sun", nameHi: "A Pact With The Sun", chapters: [] },
],
},
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [{ id: "math-6", name: "Mathematics", nameHi: "गणित", chapters: [] }],
},
{
id: "science",
name: "Science",
nameHi: "विज्ञान",
icon: "flask",
books: [{ id: "science-6", name: "Science", nameHi: "विज्ञान", chapters: [] }],
},
{
id: "social-studies",
name: "Social Studies",
nameHi: "सामाजिक विज्ञान",
icon: "globe",
books: [
{ id: "hamare-ateet-1", name: "Hamare Ateet 1", nameHi: "हमारे अतीत – 1", chapters: [] },
{ id: "prithvi-hamara-avas", name: "Prithvi Hamara Avas", nameHi: "पृथ्वी हमारा आवास", chapters: [] },
{ id: "samajik-rajnitik-1", name: "Samajik Evam Rajnitik Jeevan 1", nameHi: "सामाजिक एवं राजनीतिक जीवन – 1", chapters: [] },
],
},
],

7: [
{
id: "hindi",
name: "Hindi",
nameHi: "हिंदी",
icon: "languages",
books: [
{ id: "vasant-2", name: "Vasant Bhag 2", nameHi: "वसंत भाग 2", chapters: [] },
{ id: "bal-mahabharat", name: "Bal Mahabharat Katha", nameHi: "बाल महाभारत कथा", chapters: [] },
],
},
{
id: "english",
name: "English",
nameHi: "English",
icon: "book-open",
books: [
{ id: "honeycomb", name: "Honeycomb", nameHi: "Honeycomb", chapters: [] },
{ id: "an-alien-hand", name: "An Alien Hand", nameHi: "An Alien Hand", chapters: [] },
],
},
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [{ id: "math-7", name: "Mathematics", nameHi: "गणित", chapters: [] }],
},
{
id: "science",
name: "Science",
nameHi: "विज्ञान",
icon: "flask",
books: [{ id: "science-7", name: "Science", nameHi: "विज्ञान", chapters: [] }],
},
{
id: "social-studies",
name: "Social Studies",
nameHi: "सामाजिक विज्ञान",
icon: "globe",
books: [
{ id: "hamare-ateet-2", name: "Hamare Ateet 2", nameHi: "हमारे अतीत – 2", chapters: [] },
{ id: "hamara-paryavaran", name: "Hamara Paryavaran", nameHi: "हमारा पर्यावरण", chapters: [] },
{ id: "samajik-rajnitik-2", name: "Samajik Evam Rajnitik Jeevan 2", nameHi: "सामाजिक एवं राजनीतिक जीवन – 2", chapters: [] },
],
},
],

8: [
{
id: "hindi",
name: "Hindi",
nameHi: "हिंदी",
icon: "languages",
books: [
{ id: "vasant-3", name: "Vasant Bhag 3", nameHi: "वसंत भाग 3", chapters: [] },
{ id: "bharat-ki-khoj", name: "Bharat Ki Khoj", nameHi: "भारत की खोज", chapters: [] },
],
},
{
id: "english",
name: "English",
nameHi: "English",
icon: "book-open",
books: [
{ id: "honeydew", name: "Honeydew", nameHi: "Honeydew", chapters: [] },
{ id: "it-so-happened", name: "It So Happened", nameHi: "It So Happened", chapters: [] },
],
},
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [{ id: "math-8", name: "Mathematics", nameHi: "गणित", chapters: [] }],
},
{
id: "science",
name: "Science",
nameHi: "विज्ञान",
icon: "flask",
books: [{ id: "science-8", name: "Science", nameHi: "विज्ञान", chapters: [] }],
},
{
id: "social-studies",
name: "Social Studies",
nameHi: "सामाजिक विज्ञान",
icon: "globe",
books: [
{ id: "hamare-ateet-3", name: "Hamare Ateet 3", nameHi: "हमारे अतीत – 3", chapters: [] },
{ id: "sansadhan-vikas", name: "Sansadhan Evam Vikas", nameHi: "संसाधन एवं विकास", chapters: [] },
{ id: "samajik-rajnitik-3", name: "Samajik Evam Rajnitik Jeevan 3", nameHi: "सामाजिक एवं राजनीतिक जीवन – 3", chapters: [] },
],
},
],

9: [
{
id: "hindi",
name: "Hindi",
nameHi: "हिंदी",
icon: "languages",
books: [
{ id: "kshitij-1", name: "Kshitij Bhag 1", nameHi: "क्षितिज भाग 1", chapters: [] },
{ id: "kritika-1", name: "Kritika Bhag 1", nameHi: "कृतिका भाग 1", chapters: [] },
],
},
{
id: "english",
name: "English",
nameHi: "English",
icon: "book-open",
books: [
{ id: "beehive", name: "Beehive", nameHi: "Beehive", chapters: [] },
{ id: "moments", name: "Moments", nameHi: "Moments", chapters: [] },
],
},
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [{ id: "math-9", name: "Mathematics", nameHi: "गणित", chapters: [] }],
},
{
id: "science",
name: "Science",
nameHi: "विज्ञान",
icon: "flask",
books: [{ id: "science-9", name: "Science", nameHi: "विज्ञान", chapters: [] }],
},
{
id: "social-studies",
name: "Social Studies",
nameHi: "सामाजिक विज्ञान",
icon: "globe",
books: [
{ id: "bharat-vishwa-1", name: "India and the Contemporary World 1", nameHi: "भारत और समकालीन विश्व – 1", chapters: [] },
{ id: "samkalin-bharat-1", name: "Contemporary India 1", nameHi: "समकालीन भारत – 1", chapters: [] },
{ id: "loktantrik-1", name: "Democratic Politics 1", nameHi: "लोकतांत्रिक राजनीति – 1", chapters: [] },
{ id: "arthshastra-9", name: "Economics", nameHi: "अर्थशास्त्र", chapters: [] },
],
},
],

10: [
{
id: "hindi",
name: "Hindi",
nameHi: "हिंदी",
icon: "languages",
books: [
{ id: "kshitij-2", name: "Kshitij Bhag 2", nameHi: "क्षितिज भाग 2", chapters: [] },
{ id: "kritika-2", name: "Kritika Bhag 2", nameHi: "कृतिका भाग 2", chapters: [] },
],
},
{
id: "english",
name: "English",
nameHi: "English",
icon: "book-open",
books: [
{ id: "first-flight", name: "First Flight", nameHi: "First Flight", chapters: [] },
{ id: "footprints", name: "Footprints Without Feet", nameHi: "Footprints Without Feet", chapters: [] },
],
},
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [{ id: "math-10", name: "Mathematics", nameHi: "गणित", chapters: [] }],
},
{
id: "science",
name: "Science",
nameHi: "विज्ञान",
icon: "flask",
books: [{ id: "science-10", name: "Science", nameHi: "विज्ञान", chapters: [] }],
},
{
id: "social-studies",
name: "Social Studies",
nameHi: "सामाजिक विज्ञान",
icon: "globe",
books: [
{ id: "bharat-vishwa-2", name: "India and the Contemporary World 2", nameHi: "भारत और समकालीन विश्व – 2", chapters: [] },
{ id: "samkalin-bharat-2", name: "Contemporary India 2", nameHi: "समकालीन भारत – 2", chapters: [] },
{ id: "loktantrik-2", name: "Democratic Politics 2", nameHi: "लोकतांत्रिक राजनीति – 2", chapters: [] },
{ id: "arthik-vikas", name: "Understanding Economic Development", nameHi: "समझदार आर्थिक विकास", chapters: [] },
],
},
],
11: [],
12: [],
}

/* =========================
STREAMS (EMPTY FOR NOW)
========================= */

export const streamsByClass: Record<ClassNumber, Stream[]> = {
6: [],
7: [],
8: [],
9: [],
10: [],
11: [],
12: [],
}

/* =========================
CLASS 11 STREAMS (COMPLETE)
========================= */

streamsByClass[11] = [
/* ---------- SCIENCE ---------- */
{
id: "science",
name: "Science",
nameHi: "विज्ञान",
subjects: [
{
id: "physics",
name: "Physics",
nameHi: "भौतिकी",
icon: "atom",
books: [
{ id: "physics-11-1", name: "Physics Part 1", nameHi: "भौतिकी भाग 1", chapters: [] },
{ id: "physics-11-2", name: "Physics Part 2", nameHi: "भौतिकी भाग 2", chapters: [] },
],
},
{
id: "chemistry",
name: "Chemistry",
nameHi: "रसायन विज्ञान",
icon: "flask",
books: [
{ id: "chemistry-11-1", name: "Chemistry Part 1", nameHi: "रसायन विज्ञान भाग 1", chapters: [] },
{ id: "chemistry-11-2", name: "Chemistry Part 2", nameHi: "रसायन विज्ञान भाग 2", chapters: [] },
],
},
{
id: "biology",
name: "Biology",
nameHi: "जीव विज्ञान",
icon: "leaf",
books: [
{ id: "biology-11", name: "Biology", nameHi: "जीव विज्ञान", chapters: [] },
],
},
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [
{ id: "math-11", name: "Mathematics", nameHi: "गणित", chapters: [] },
],
},
{
id: "english",
name: "English",
nameHi: "English",
icon: "book-open",
books: [
{ id: "hornbill-11", name: "Hornbill", nameHi: "Hornbill", chapters: [] },
{ id: "snapshots-11", name: "Snapshots", nameHi: "Snapshots", chapters: [] },
],
},
{
id: "hindi",
name: "Hindi",
nameHi: "हिंदी",
icon: "languages",
books: [
{ id: "aroh-11", name: "Aroh Bhag 1", nameHi: "आरोह भाग 1", chapters: [] },
{ id: "vitan-11", name: "Vitan Bhag 1", nameHi: "वितान भाग 1", chapters: [] },
],
},
],
},

/* ---------- COMMERCE ---------- */
{
id: "commerce",
name: "Commerce",
nameHi: "वाणिज्य",
subjects: [
{
id: "accountancy",
name: "Accountancy",
nameHi: "लेखाशास्त्र",
icon: "book",
books: [
{ id: "accountancy-11-1", name: "Financial Accounting Part 1", nameHi: "वित्तीय लेखाशास्त्र भाग 1", chapters: [] },
{ id: "accountancy-11-2", name: "Financial Accounting Part 2", nameHi: "वित्तीय लेखाशास्त्र भाग 2", chapters: [] },
],
},
{
id: "business-studies",
name: "Business Studies",
nameHi: "व्यवसाय अध्ययन",
icon: "briefcase",
books: [
{ id: "business-11", name: "Business Studies", nameHi: "व्यवसाय अध्ययन", chapters: [] },
],
},
{
id: "economics",
name: "Economics",
nameHi: "अर्थशास्त्र",
icon: "trending-up",
books: [
{ id: "eco-11-1", name: "Statistics for Economics", nameHi: "अर्थशास्त्र के लिए सांख्यिकी", chapters: [] },
{ id: "eco-11-2", name: "Indian Economic Development", nameHi: "भारतीय आर्थिक विकास", chapters: [] },
],
},
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [
{ id: "math-11-com", name: "Mathematics", nameHi: "गणित", chapters: [] },
],
},
{
id: "english",
name: "English",
nameHi: "English",
icon: "book-open",
books: [
{ id: "hornbill-11-com", name: "Hornbill", nameHi: "Hornbill", chapters: [] },
{ id: "snapshots-11-com", name: "Snapshots", nameHi: "Snapshots", chapters: [] },
],
},
{
id: "hindi",
name: "Hindi",
nameHi: "हिंदी",
icon: "languages",
books: [
{ id: "aroh-11-com", name: "Aroh Bhag 1", nameHi: "आरोह भाग 1", chapters: [] },
{ id: "vitan-11-com", name: "Vitan Bhag 1", nameHi: "वितान भाग 1", chapters: [] },
],
},
],
},

/* ---------- ARTS ---------- */
{
id: "arts",
name: "Arts",
nameHi: "कला",
subjects: [
{
id: "history",
name: "History",
nameHi: "इतिहास",
icon: "book",
books: [
{ id: "history-11", name: "Themes in World History", nameHi: "विश्व इतिहास के कुछ विषय", chapters: [] },
],
},
{
id: "geography",
name: "Geography",
nameHi: "भूगोल",
icon: "map",
books: [
{ id: "geo-11-1", name: "Fundamentals of Physical Geography", nameHi: "भौतिक भूगोल के मूल सिद्धांत", chapters: [] },
{ id: "geo-11-2", name: "India – Physical Environment", nameHi: "भारत – भौतिक पर्यावरण", chapters: [] },
],
},
{
id: "political-science",
name: "Political Science",
nameHi: "राजनीति विज्ञान",
icon: "landmark",
books: [
{ id: "polsci-11-1", name: "Indian Constitution at Work", nameHi: "भारतीय संविधान का कार्यान्वयन", chapters: [] },
{ id: "polsci-11-2", name: "Political Theory", nameHi: "राजनीतिक सिद्धांत", chapters: [] },
],
},
{
id: "sociology",
name: "Sociology",
nameHi: "समाजशास्त्र",
icon: "users",
books: [
{ id: "soc-11-1", name: "Introducing Sociology", nameHi: "समाजशास्त्र का परिचय", chapters: [] },
{ id: "soc-11-2", name: "Understanding Society", nameHi: "समाज की समझ", chapters: [] },
],
},
{
id: "economics",
name: "Economics",
nameHi: "अर्थशास्त्र",
icon: "trending-up",
books: [
{ id: "eco-11-arts-1", name: "Statistics for Economics", nameHi: "अर्थशास्त्र के लिए सांख्यिकी", chapters: [] },
{ id: "eco-11-arts-2", name: "Indian Economic Development", nameHi: "भारतीय आर्थिक विकास", chapters: [] },
],
},
{
id: "psychology",
name: "Psychology",
nameHi: "मनोविज्ञान",
icon: "brain",
books: [
{ id: "psych-11", name: "Psychology", nameHi: "मनोविज्ञान", chapters: [] },
],
},
{
id: "english",
name: "English",
nameHi: "English",
icon: "book-open",
books: [
{ id: "hornbill-11-arts", name: "Hornbill", nameHi: "Hornbill", chapters: [] },
{ id: "snapshots-11-arts", name: "Snapshots", nameHi: "Snapshots", chapters: [] },
],
},
{
id: "hindi",
name: "Hindi",
nameHi: "हिंदी",
icon: "languages",
books: [
{ id: "aroh-11-arts", name: "Aroh Bhag 1", nameHi: "आरोह भाग 1", chapters: [] },
{ id: "vitan-11-arts", name: "Vitan Bhag 1", nameHi: "वितान भाग 1", chapters: [] },
],
},
],
},
]

/* =========================
CLASS 12 STREAMS (COMPLETE)
========================= */

streamsByClass[12] = [
/* ---------- SCIENCE ---------- */
{
id: "science",
name: "Science",
nameHi: "विज्ञान",
subjects: [
{
id: "physics",
name: "Physics",
nameHi: "भौतिकी",
icon: "atom",
books: [
{ id: "physics-12-1", name: "Physics Part 1", nameHi: "भौतिकी भाग 1", chapters: [] },
{ id: "physics-12-2", name: "Physics Part 2", nameHi: "भौतिकी भाग 2", chapters: [] },
],
},
{
id: "chemistry",
name: "Chemistry",
nameHi: "रसायन विज्ञान",
icon: "flask",
books: [
{ id: "chemistry-12-1", name: "Chemistry Part 1", nameHi: "रसायन विज्ञान भाग 1", chapters: [] },
{ id: "chemistry-12-2", name: "Chemistry Part 2", nameHi: "रसायन विज्ञान भाग 2", chapters: [] },
],
},
{
id: "biology",
name: "Biology",
nameHi: "जीव विज्ञान",
icon: "leaf",
books: [
{ id: "biology-12", name: "Biology", nameHi: "जीव विज्ञान", chapters: [] },
],
},
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [
{ id: "math-12-1", name: "Mathematics Part 1", nameHi: "गणित भाग 1", chapters: [] },
{ id: "math-12-2", name: "Mathematics Part 2", nameHi: "गणित भाग 2", chapters: [] },
],
},
{
id: "english",
name: "English",
nameHi: "English",
icon: "book-open",
books: [
{ id: "flamingo-12", name: "Flamingo", nameHi: "Flamingo", chapters: [] },
{ id: "vistas-12", name: "Vistas", nameHi: "Vistas", chapters: [] },
],
},
{
id: "hindi",
name: "Hindi",
nameHi: "हिंदी",
icon: "languages",
books: [
{ id: "aroh-12", name: "Aroh Bhag 2", nameHi: "आरोह भाग 2", chapters: [] },
{ id: "vitan-12", name: "Vitan Bhag 2", nameHi: "वितान भाग 2", chapters: [] },
],
},
],
},

/* ---------- COMMERCE ---------- */
{
id: "commerce",
name: "Commerce",
nameHi: "वाणिज्य",
subjects: [
{
id: "accountancy",
name: "Accountancy",
nameHi: "लेखाशास्त्र",
icon: "book",
books: [
{ id: "accountancy-12-1", name: "Accountancy Part 1", nameHi: "लेखाशास्त्र भाग 1", chapters: [] },
{ id: "accountancy-12-2", name: "Accountancy Part 2", nameHi: "लेखाशास्त्र भाग 2", chapters: [] },
],
},
{
id: "business-studies",
name: "Business Studies",
nameHi: "व्यवसाय अध्ययन",
icon: "briefcase",
books: [
{ id: "business-12-1", name: "Business Studies Part 1", name
 
