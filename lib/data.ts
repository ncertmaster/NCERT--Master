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

export const subjectsByClass: Record<ClassNumber, Subject[]> = {
6: [
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [{
id: "math-6",
name: "Mathematics",
nameHi: "गणित",
chapters: [
{ id: "m6-ch1", name: "Knowing Our Numbers", nameHi: "अपनी संख्याओं की जानकारी" },
{ id: "m6-ch2", name: "Whole Numbers", nameHi: "पूर्ण संख्याएँ" },
{ id: "m6-ch3", name: "Playing with Numbers", nameHi: "संख्याओं के साथ खेलना" },
{ id: "m6-ch4", name: "Basic Geometrical Ideas", nameHi: "आधारभूत ज्यामितीय अवधारणाएँ" },
{ id: "m6-ch5", name: "Understanding Elementary Shapes", nameHi: "प्रारंभिक आकारों को समझना" },
{ id: "m6-ch6", name: "Integers", nameHi: "पूर्णांक" },
{ id: "m6-ch7", name: "Fractions", nameHi: "भिन्न" },
{ id: "m6-ch8", name: "Decimals", nameHi: "दशमलव" },
{ id: "m6-ch9", name: "Data Handling", nameHi: "आँकड़ों का प्रबंधन" },
{ id: "m6-ch10", name: "Mensuration", nameHi: "क्षेत्रमिति" },
{ id: "m6-ch11", name: "Algebra", nameHi: "बीजगणित" },
{ id: "m6-ch12", name: "Ratio and Proportion", nameHi: "अनुपात और समानुपात" },
{ id: "m6-ch13", name: "Symmetry", nameHi: "सममिति" },
{ id: "m6-ch14", name: "Practical Geometry", nameHi: "प्रायोगिक ज्यामिति" }
]
}]
},

{
id: "science",
name: "Science",
nameHi: "विज्ञान",
icon: "flask",
books: [{
id: "science-6",
name: "Science",
nameHi: "विज्ञान",
chapters: [
{ id: "s6-ch1", name: "Components of Food", nameHi: "भोजन के घटक" },
{ id: "s6-ch2", name: "Sorting Materials into Groups", nameHi: "वस्तुओं के समूह बनाना" },
{ id: "s6-ch3", name: "Separation of Substances", nameHi: "पदार्थों का पृथक्करण" },
{ id: "s6-ch4", name: "Getting to Know Plants", nameHi: "पौधों को जानिए" },
{ id: "s6-ch5", name: "Body Movements", nameHi: "शरीर में गति" },
{ id: "s6-ch6", name: "The Living Organisms – Characteristics and Habitats", nameHi: "सजीव – विशेषताएँ एवं आवास" },
{ id: "s6-ch7", name: "Motion and Measurement of Distances", nameHi: "गति एवं दूरियों का मापन" },
{ id: "s6-ch8", name: "Light, Shadows and Reflections", nameHi: "प्रकाश – छायाएँ एवं परावर्तन" },
{ id: "s6-ch9", name: "Electricity and Circuits", nameHi: "विद्युत तथा परिपथ" },
{ id: "s6-ch10", name: "Fun with Magnets", nameHi: "चुंबकों द्वारा मनोरंजन" },
{ id: "s6-ch11", name: "Air Around Us", nameHi: "हमारे चारों ओर वायु" },
{ id: "s6-ch12", name: "Water", nameHi: "जल" }
]
}]
},

{
id: "social-studies",
name: "Social Studies",
nameHi: "सामाजिक विज्ञान",
icon: "globe",
books: [
{
id: "history-6",
name: "Hamare Ateet – 1",
nameHi: "हमारे अतीत – 1",
chapters: [
{ id: "h6-ch1", name: "What, Where, How and When?", nameHi: "क्या, कहाँ, कैसे और कब?" },
{ id: "h6-ch2", name: "From Hunting–Gathering to Growing Food", nameHi: "आखेट-खाद्य संग्रह से भोजन उत्पादन तक" },
{ id: "h6-ch3", name: "In the Earliest Cities", nameHi: "आरंभिक नगर" },
{ id: "h6-ch4", name: "What Books and Burials Tell Us", nameHi: "क्या बताती हैं हमें किताबें और कब्रें" },
{ id: "h6-ch5", name: "Kingdoms, Kings and an Early Republic", nameHi: "राज्य, राजा और एक प्राचीन गणराज्य" },
{ id: "h6-ch6", name: "New Questions and Ideas", nameHi: "नए प्रश्न और विचार" },
{ id: "h6-ch7", name: "Ashoka, The Emperor Who Gave Up War", nameHi: "अशोक: एक ऐसा सम्राट जिसने युद्ध का त्याग किया" },
{ id: "h6-ch8", name: "Vital Villages, Thriving Towns", nameHi: "जीवंत गाँव, फलते-फूलते शहर" },
{ id: "h6-ch9", name: "Traders, Kings and Pilgrims", nameHi: "व्यापारी, राजा और यात्री" },
{ id: "h6-ch10", name: "New Empires and Kingdoms", nameHi: "नए साम्राज्य और राज्य" },
{ id: "h6-ch11", name: "Buildings, Paintings and Books", nameHi: "इमारतें, चित्र तथा किताबें" }
]
},
{
  id: "geography-6",
name: "Prithvi: Hamara Avas",
nameHi: "पृथ्वी: हमारा आवास",
chapters: [
{ id: "g6-ch1", name: "The Earth in the Solar System", nameHi: "सौरमंडल में पृथ्वी" },
{ id: "g6-ch2", name: "Globe: Latitudes and Longitudes", nameHi: "ग्लोब: अक्षांश एवं देशांतर" },
{ id: "g6-ch3", name: "Motions of the Earth", nameHi: "पृथ्वी की गतियाँ" },
{ id: "g6-ch4", name: "Maps", nameHi: "मानचित्र" },
{ id: "g6-ch5", name: "Major Domains of the Earth", nameHi: "पृथ्वी के प्रमुख परिमंडल" },
{ id: "g6-ch6", name: "Our Country – India", nameHi: "हमारा देश: भारत" }
]
},
{
id: "civics-6",
name: "Samajik Evam Rajnitik Jeevan – 1",
nameHi: "सामाजिक एवं राजनीतिक जीवन – 1",
chapters: [
{ id: "c6-ch1", name: "Understanding Diversity", nameHi: "विविधता की समझ" },
{ id: "c6-ch2", name: "Diversity and Discrimination", nameHi: "विविधता एवं भेदभाव" },
{ id: "c6-ch3", name: "What is Government?", nameHi: "सरकार क्या है?" },
{ id: "c6-ch4", name: "Key Elements of a Democratic Government", nameHi: "लोकतांत्रिक सरकार के मुख्य तत्त्व" },
{ id: "c6-ch5", name: "Panchayati Raj", nameHi: "पंचायती राज" },
{ id: "c6-ch6", name: "Rural Administration", nameHi: "गाँव का प्रशासन" },
{ id: "c6-ch7", name: "Urban Administration", nameHi: "नगर प्रशासन" },
{ id: "c6-ch8", name: "Rural Livelihoods", nameHi: "ग्रामीण क्षेत्र में आजीविका" },
{ id: "c6-ch9", name: "Urban Livelihoods", nameHi: "शहरी क्षेत्र में आजीविका" }
]
}
]
},

{
id: "english",
name: "English",
nameHi: "English",
icon: "book-open",
books: [
{
id: "honeysuckle-6",
name: "Honeysuckle",
nameHi: "Honeysuckle",
chapters: [
{ id: "hs6-ch1", name: "Who Did Patrick's Homework?", nameHi: "Who Did Patrick's Homework?" },
{ id: "hs6-ch2", name: "How the Dog Found Himself a New Master!", nameHi: "How the Dog Found Himself a New Master!" },
{ id: "hs6-ch3", name: "Taro's Reward", nameHi: "Taro's Reward" },
{ id: "hs6-ch4", name: "An Indian-American Woman in Space", nameHi: "An Indian-American Woman in Space" },
{ id: "hs6-ch5", name: "A Different Kind of School", nameHi: "A Different Kind of School" },
{ id: "hs6-ch6", name: "Who I Am", nameHi: "Who I Am" },
{ id: "hs6-ch7", name: "Fair Play", nameHi: "Fair Play" },
{ id: "hs6-ch8", name: "The Banyan Tree", nameHi: "The Banyan Tree" }
]
},
{
id: "pact-sun-6",
name: "A Pact with the Sun",
nameHi: "A Pact with the Sun",
chapters: [
{ id: "ps6-ch1", name: "A Tale of Two Birds", nameHi: "A Tale of Two Birds" },
{ id: "ps6-ch2", name: "The Friendly Mongoose", nameHi: "The Friendly Mongoose" },
{ id: "ps6-ch3", name: "The Shepherd's Treasure", nameHi: "The Shepherd's Treasure" },
{ id: "ps6-ch4", name: "Tansen", nameHi: "Tansen" },
{ id: "ps6-ch5", name: "The Monkey and the Crocodile", nameHi: "The Monkey and the Crocodile" },
{ id: "ps6-ch6", name: "The Wonder Called Sleep", nameHi: "The Wonder Called Sleep" },
{ id: "ps6-ch7", name: "A Pact with the Sun", nameHi: "A Pact with the Sun" }
]
}
]
},

{
id: "hindi",
name: "Hindi",
nameHi: "हिंदी",
icon: "languages",
books: [
{
id: "vasant-6",
name: "Vasant Bhag 1",
nameHi: "वसंत भाग 1",
chapters: [
{ id: "va6-ch1", name: "Vah Chidiya Jo", nameHi: "वह चिड़िया जो" },
{ id: "va6-ch2", name: "Bachpan", nameHi: "बचपन" },
{ id: "va6-ch3", name: "Naadan Dost", nameHi: "नादान दोस्त" },
{ id: "va6-ch4", name: "Chaand Se Thodi Si Gappe", nameHi: "चाँद से थोड़ी सी गप्पें" },
{ id: "va6-ch5", name: "Aksharon Ka Mahatva", nameHi: "अक्षरों का महत्व" },
{ id: "va6-ch6", name: "Paar Nazar Ke", nameHi: "पार नजर के" },
{ id: "va6-ch7", name: "Saathi Haath Badhana", nameHi: "साथी हाथ बढ़ाना" },
{ id: "va6-ch8", name: "Aise Aise", nameHi: "ऐसे–ऐसे" },
{ id: "va6-ch9", name: "Ticket Album", nameHi: "टिकट अलबम" },
{ id: "va6-ch10", name: "Jhansi Ki Rani", nameHi: "झाँसी की रानी" },
{ id: "va6-ch11", name: "Jo Dekhkar Bhi Nahi Dekhte", nameHi: "जो देखकर भी नहीं देखते" },
{ id: "va6-ch12", name: "Sansar Pustak Hai", nameHi: "संसार पुस्तक है" },
{ id: "va6-ch13", name: "Main Sabse Chhoti Hoon", nameHi: "मैं सबसे छोटी हूँ" },
{ id: "va6-ch14", name: "Lokgeet", nameHi: "लोकगीत" },
{ id: "va6-ch15", name: "Naukardoot", nameHi: "नौकरदूत" }
]
},
{
  id: "balramkatha-6",
name: "Bal Ramkatha",
nameHi: "बाल रामकथा",
chapters: [
{ id: "br6-ch1", name: "Avadhpuri Mein Ram", nameHi: "अवधपुरी में राम" },
{ id: "br6-ch2", name: "Ram Ka Van Gaman", nameHi: "राम का वन गमन" },
{ id: "br6-ch3", name: "Chitrakoot", nameHi: "चित्रकूट" },
{ id: "br6-ch4", name: "Dandak Van", nameHi: "दंडक वन" },
{ id: "br6-ch5", name: "Panchvati", nameHi: "पंचवटी" },
{ id: "br6-ch6", name: "Sone Ka Hiran", nameHi: "सोने का हिरन" },
{ id: "br6-ch7", name: "Sita Haran", nameHi: "सीता हरण" },
{ id: "br6-ch8", name: "Sugriv Mitrata", nameHi: "सुग्रीव से मित्रता" },
{ id: "br6-ch9", name: "Lanka Vijay", nameHi: "लंका विजय" },
{ id: "br6-ch10", name: "Ram Ka Rajyabhishek", nameHi: "राम का राज्याभिषेक" }
]
}
]
}
],
7: [
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [{
id: "math-7",
name: "Mathematics",
nameHi: "गणित",
chapters: [
{ id: "m7-ch1", name: "Integers", nameHi: "पूर्णांक" },
{ id: "m7-ch2", name: "Fractions and Decimals", nameHi: "भिन्न एवं दशमलव" },
{ id: "m7-ch3", name: "Data Handling", nameHi: "आँकड़ों का प्रबंधन" },
{ id: "m7-ch4", name: "Simple Equations", nameHi: "सरल समीकरण" },
{ id: "m7-ch5", name: "Lines and Angles", nameHi: "रेखा एवं कोण" },
{ id: "m7-ch6", name: "The Triangle and its Properties", nameHi: "त्रिभुज और उसके गुण" },
{ id: "m7-ch7", name: "Comparing Quantities", nameHi: "राशियों की तुलना" },
{ id: "m7-ch8", name: "Rational Numbers", nameHi: "परिमेय संख्याएँ" },
{ id: "m7-ch9", name: "Perimeter and Area", nameHi: "परिमाप और क्षेत्रफल" },
{ id: "m7-ch10", name: "Algebraic Expressions", nameHi: "बीजीय व्यंजक" },
{ id: "m7-ch11", name: "Exponents and Powers", nameHi: "घातांक और घात" },
{ id: "m7-ch12", name: "Symmetry", nameHi: "सममिति" },
{ id: "m7-ch13", name: "Visualising Solid Shapes", nameHi: "ठोस आकारों का चित्रण" }
]
}]
},

{
id: "science",
name: "Science",
nameHi: "विज्ञान",
icon: "flask",
books: [{
id: "science-7",
name: "Science",
nameHi: "विज्ञान",
chapters: [
{ id: "s7-ch1", name: "Nutrition in Plants", nameHi: "पादपों में पोषण" },
{ id: "s7-ch2", name: "Nutrition in Animals", nameHi: "प्राणियों में पोषण" },
{ id: "s7-ch3", name: "Heat", nameHi: "ऊष्मा" },
{ id: "s7-ch4", name: "Acids, Bases and Salts", nameHi: "अम्ल, क्षारक और लवण" },
{ id: "s7-ch5", name: "Physical and Chemical Changes", nameHi: "भौतिक एवं रासायनिक परिवर्तन" },
{ id: "s7-ch6", name: "Respiration in Organisms", nameHi: "जीवों में श्वसन" },
{ id: "s7-ch7", name: "Transportation in Animals and Plants", nameHi: "जंतुओं और पादप में परिवहन" },
{ id: "s7-ch8", name: "Reproduction in Plants", nameHi: "पादप में जनन" },
{ id: "s7-ch9", name: "Motion and Time", nameHi: "गति एवं समय" },
{ id: "s7-ch10", name: "Electric Current and its Effects", nameHi: "विद्युत धारा और इसके प्रभाव" },
{ id: "s7-ch11", name: "Light", nameHi: "प्रकाश" },
{ id: "s7-ch12", name: "Forests: Our Lifeline", nameHi: "वन: हमारी जीवन रेखा" },
{ id: "s7-ch13", name: "Wastewater Story", nameHi: "अपशिष्ट जल की कहानी" }
]
}]
},

{
id: "social-studies",
name: "Social Studies",
nameHi: "सामाजिक विज्ञान",
icon: "globe",
books: [
{
id: "history-7",
name: "Hamare Ateet – 2",
nameHi: "हमारे अतीत – 2",
chapters: [
{ id: "h7-ch1", name: "Tracing Changes Through a Thousand Years", nameHi: "हज़ार वर्षों के दौरान हुए परिवर्तनों की पड़ताल" },
{ id: "h7-ch2", name: "New Kings and Kingdoms", nameHi: "नये राजा और उनके राज्य" },
{ id: "h7-ch3", name: "The Delhi Sultans", nameHi: "दिल्ली सल्तनत" },
{ id: "h7-ch4", name: "The Mughal Empire", nameHi: "मुग़ल साम्राज्य" },
{ id: "h7-ch5", name: "Rulers and Buildings", nameHi: "शासक और इमारतें" },
{ id: "h7-ch6", name: "Towns, Traders and Craftspersons", nameHi: "नगर, व्यापारी और शिल्पकार" },
{ id: "h7-ch7", name: "Tribes, Nomads and Settled Communities", nameHi: "जनजातियाँ, खानाबदोश और बसे हुए समुदाय" },
{ id: "h7-ch8", name: "Devotional Paths to the Divine", nameHi: "ईश्वर से अनुराग" },
{ id: "h7-ch9", name: "The Making of Regional Cultures", nameHi: "क्षेत्रीय संस्कृतियों का निर्माण" },
{ id: "h7-ch10", name: "Eighteenth-Century Political Formations", nameHi: "अठारहवीं शताब्दी में राजनीतिक गठन" }
]
},
  {
