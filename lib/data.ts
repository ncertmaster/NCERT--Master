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
id: "geography-7",
name: "Hamara Paryavaran",
nameHi: "हमारा पर्यावरण",
chapters: [
{ id: "g7-ch1", name: "Environment", nameHi: "पर्यावरण" },
{ id: "g7-ch2", name: "Inside Our Earth", nameHi: "हमारी पृथ्वी के अंदर" },
{ id: "g7-ch3", name: "Our Changing Earth", nameHi: "हमारी बदलती पृथ्वी" },
{ id: "g7-ch4", name: "Air", nameHi: "वायु" },
{ id: "g7-ch5", name: "Water", nameHi: "जल" },
{ id: "g7-ch6", name: "Natural Vegetation and Wildlife", nameHi: "प्राकृतिक वनस्पति और वन्य जीवन" },
{ id: "g7-ch7", name: "Human Environment – Settlement, Transport and Communication", nameHi: "मानव पर्यावरण – बस्तियाँ, परिवहन और संचार" },
{ id: "g7-ch8", name: "Human Environment Interactions – Tropical and Subtropical Region", nameHi: "उष्णकटिबंधीय एवं उपोष्ण प्रदेश" },
{ id: "g7-ch9", name: "Life in the Temperate Grasslands", nameHi: "शीतोष्ण घास के मैदानों में जीवन" },
{ id: "g7-ch10", name: "Life in the Deserts", nameHi: "रेगिस्तान में जीवन" }
]
},
{
id: "civics-7",
name: "Samajik Evam Rajnitik Jeevan – 2",
nameHi: "सामाजिक एवं राजनीतिक जीवन – 2",
chapters: [
{ id: "c7-ch1", name: "On Equality", nameHi: "समानता" },
{ id: "c7-ch2", name: "Role of the Government in Health", nameHi: "स्वास्थ्य में सरकार की भूमिका" },
{ id: "c7-ch3", name: "How the State Government Works", nameHi: "राज्य शासन कैसे काम करता है" },
{ id: "c7-ch4", name: "Growing Up as Boys and Girls", nameHi: "लड़के और लड़कियों के रूप में बड़ा होना" },
{ id: "c7-ch5", name: "Women Change the World", nameHi: "औरतों ने बदली दुनिया" },
{ id: "c7-ch6", name: "Understanding Media", nameHi: "संचार माध्यमों को समझना" },
{ id: "c7-ch7", name: "Understanding Advertising", nameHi: "विज्ञापन को समझना" },
{ id: "c7-ch8", name: "Markets Around Us", nameHi: "हमारे आस-पास के बाज़ार" },
{ id: "c7-ch9", name: "A Shirt in the Market", nameHi: "बाज़ार में एक कमीज़" }
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
id: "honeycomb-7",
name: "Honeycomb",
nameHi: "Honeycomb",
chapters: [
{ id: "hc7-ch1", name: "Three Questions", nameHi: "Three Questions" },
{ id: "hc7-ch2", name: "A Gift of Chappals", nameHi: "A Gift of Chappals" },
{ id: "hc7-ch3", name: "Gopal and the Hilsa Fish", nameHi: "Gopal and the Hilsa Fish" },
{ id: "hc7-ch4", name: "The Ashes That Made Trees Bloom", nameHi: "The Ashes That Made Trees Bloom" },
{ id: "hc7-ch5", name: "Quality", nameHi: "Quality" },
{ id: "hc7-ch6", name: "Expert Detectives", nameHi: "Expert Detectives" },
{ id: "hc7-ch7", name: "The Invention of Vita-Wonk", nameHi: "The Invention of Vita-Wonk" },
{ id: "hc7-ch8", name: "A Homage to our Brave Soldiers", nameHi: "A Homage to our Brave Soldiers" }
]
},
{
id: "alien-hand-7",
name: "An Alien Hand",
nameHi: "An Alien Hand",
chapters: [
{ id: "ah7-ch1", name: "The Tiny Teacher", nameHi: "The Tiny Teacher" },
{ id: "ah7-ch2", name: "Bringing up Kari", nameHi: "Bringing up Kari" },
{ id: "ah7-ch3", name: "Golu Grows a Nose", nameHi: "Golu Grows a Nose" },
{ id: "ah7-ch4", name: "Chandni", nameHi: "Chandni" },
{ id: "ah7-ch5", name: "The Bear Story", nameHi: "The Bear Story" },
{ id: "ah7-ch6", name: "A Tiger in the House", nameHi: "A Tiger in the House" },
{ id: "ah7-ch7", name: "An Alien Hand", nameHi: "An Alien Hand" }
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
id: "vasant-7",
name: "Vasant Bhag 2",
nameHi: "वसंत भाग 2",
chapters: [
{ id: "va7-ch1", name: "Hum Panchhi Unmukt Gagan Ke", nameHi: "हम पंछी उन्मुक्त गगन के" },
{ id: "va7-ch2", name: "Daadi Maa", nameHi: "दादी माँ" },
{ id: "va7-ch3", name: "Himalaya Ki Betiyan", nameHi: "हिमालय की बेटियाँ" },
{ id: "va7-ch4", name: "Kathputli", nameHi: "कठपुतली" },
{ id: "va7-ch5", name: "Mithaiwala", nameHi: "मिठाईवाला" },
{ id: "va7-ch6", name: "Rakt Aur Hamara Sharir", nameHi: "रक्त और हमारा शरीर" },
{ id: "va7-ch7", name: "Papa Kho Gaye", nameHi: "पापा खो गए" },
{ id: "va7-ch8", name: "Shaam Ek Kisan", nameHi: "शाम – एक किसान" },
{ id: "va7-ch9", name: "Ek Tinka", nameHi: "एक तिनका" },
{ id: "va7-ch10", name: "Khanabadosh", nameHi: "खानाबदोश" },
{ id: "va7-ch11", name: "Neelkanth", nameHi: "नीलकंठ" },
{ id: "va7-ch12", name: "Bhor Aur Barkha", nameHi: "भोर और बरखा" },
{ id: "va7-ch13", name: "Veer Kunwar Singh", nameHi: "वीर कुँवर सिंह" },
{ id: "va7-ch14", name: "Sangharsh Ke Kaaran Main Tunukmizaj Ho Gaya", nameHi: "संघर्ष के कारण मैं तुनुकमिज़ाज हो गया" },
{ id: "va7-ch15", name: "Aashram Ka Anumanit Vyay", nameHi: "आश्रम का अनुमानित व्यय" }
]
},
  {
    id: "bal-mahabharat-7",
name: "Bal Mahabharat Katha",
nameHi: "बाल महाभारत कथा",
chapters: [
{ id: "bm7-ch1", name: "Adi Parv", nameHi: "आदि पर्व" },
{ id: "bm7-ch2", name: "Sabha Parv", nameHi: "सभा पर्व" },
{ id: "bm7-ch3", name: "Vana Parv", nameHi: "वन पर्व" },
{ id: "bm7-ch4", name: "Virat Parv", nameHi: "विराट पर्व" },
{ id: "bm7-ch5", name: "Udyog Parv", nameHi: "उद्योग पर्व" },
{ id: "bm7-ch6", name: "Bhishma Parv", nameHi: "भीष्म पर्व" },
{ id: "bm7-ch7", name: "Drona Parv", nameHi: "द्रोण पर्व" },
{ id: "bm7-ch8", name: "Karna Parv", nameHi: "कर्ण पर्व" },
{ id: "bm7-ch9", name: "Shalya Parv", nameHi: "शल्य पर्व" },
{ id: "bm7-ch10", name: "Shanti Parv", nameHi: "शांति पर्व" }
]
}
]
}
],
8: [
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [{
id: "math-8",
name: "Mathematics",
nameHi: "गणित",
chapters: [
{ id: "m8-ch1", name: "Rational Numbers", nameHi: "परिमेय संख्याएँ" },
{ id: "m8-ch2", name: "Linear Equations in One Variable", nameHi: "एक चर वाले रैखिक समीकरण" },
{ id: "m8-ch3", name: "Understanding Quadrilaterals", nameHi: "चतुर्भुजों को समझना" },
{ id: "m8-ch4", name: "Practical Geometry", nameHi: "प्रायोगिक ज्यामिति" },
{ id: "m8-ch5", name: "Data Handling", nameHi: "आँकड़ों का प्रबंधन" },
{ id: "m8-ch6", name: "Squares and Square Roots", nameHi: "वर्ग और वर्गमूल" },
{ id: "m8-ch7", name: "Cubes and Cube Roots", nameHi: "घन और घनमूल" },
{ id: "m8-ch8", name: "Comparing Quantities", nameHi: "राशियों की तुलना" },
{ id: "m8-ch9", name: "Algebraic Expressions and Identities", nameHi: "बीजीय व्यंजक और सर्वसमिकाएँ" },
{ id: "m8-ch10", name: "Visualising Solid Shapes", nameHi: "ठोस आकारों का चित्रण" },
{ id: "m8-ch11", name: "Mensuration", nameHi: "क्षेत्रमिति" },
{ id: "m8-ch12", name: "Exponents and Powers", nameHi: "घातांक और घात" },
{ id: "m8-ch13", name: "Direct and Inverse Proportions", nameHi: "प्रत्यक्ष और व्युत्क्रमानुपात" },
{ id: "m8-ch14", name: "Factorisation", nameHi: "गुणनखंडन" },
{ id: "m8-ch15", name: "Introduction to Graphs", nameHi: "ग्राफ का परिचय" },
{ id: "m8-ch16", name: "Playing with Numbers", nameHi: "संख्याओं के साथ खेलना" }
]
}]
},

{
id: "science",
name: "Science",
nameHi: "विज्ञान",
icon: "flask",
books: [{
id: "science-8",
name: "Science",
nameHi: "विज्ञान",
chapters: [
{ id: "s8-ch1", name: "Crop Production and Management", nameHi: "फसल उत्पादन एवं प्रबंधन" },
{ id: "s8-ch2", name: "Microorganisms: Friend and Foe", nameHi: "सूक्ष्मजीव: मित्र एवं शत्रु" },
{ id: "s8-ch3", name: "Synthetic Fibres and Plastics", nameHi: "कृत्रिम रेशे और प्लास्टिक" },
{ id: "s8-ch4", name: "Materials: Metals and Non-Metals", nameHi: "पदार्थ: धातु और अधातु" },
{ id: "s8-ch5", name: "Coal and Petroleum", nameHi: "कोयला और पेट्रोलियम" },
{ id: "s8-ch6", name: "Combustion and Flame", nameHi: "दहन और ज्वाला" },
{ id: "s8-ch7", name: "Conservation of Plants and Animals", nameHi: "पौधों और जंतुओं का संरक्षण" },
{ id: "s8-ch8", name: "Cell – Structure and Functions", nameHi: "कोशिका – संरचना एवं कार्य" },
{ id: "s8-ch9", name: "Reproduction in Animals", nameHi: "जंतुओं में जनन" },
{ id: "s8-ch10", name: "Reaching the Age of Adolescence", nameHi: "किशोरावस्था की ओर" },
{ id: "s8-ch11", name: "Force and Pressure", nameHi: "बल तथा दाब" },
{ id: "s8-ch12", name: "Friction", nameHi: "घर्षण" },
{ id: "s8-ch13", name: "Sound", nameHi: "ध्वनि" },
{ id: "s8-ch14", name: "Chemical Effects of Electric Current", nameHi: "विद्युत धारा के रासायनिक प्रभाव" },
{ id: "s8-ch15", name: "Some Natural Phenomena", nameHi: "कुछ प्राकृतिक परिघटनाएँ" },
{ id: "s8-ch16", name: "Light", nameHi: "प्रकाश" },
{ id: "s8-ch17", name: "Stars and the Solar System", nameHi: "तारे और सौरमंडल" },
{ id: "s8-ch18", name: "Pollution of Air and Water", nameHi: "वायु और जल का प्रदूषण" }
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
    id: "history-8",  
    name: "Hamare Ateet – 3",  
    nameHi: "हमारे अतीत – 3",  
    chapters: [  
      { id: "h8-ch1", name: "How, When and Where", nameHi: "कैसे, कब और कहाँ" },  
      { id: "h8-ch2", name: "From Trade to Territory", nameHi: "व्यापार से सत्ता तक" },  
      { id: "h8-ch3", name: "Ruling the Countryside", nameHi: "देहात पर शासन" },  
      { id: "h8-ch4", name: "Tribals, Dikus and the Vision of a Golden Age", nameHi: "आदिवासी, दीकू और स्वर्ण युग की कल्पना" },  
      { id: "h8-ch5", name: "When People Rebel", nameHi: "जब जनता बगावत करती है" },  
      { id: "h8-ch6", name: "Colonialism and the City", nameHi: "औपनिवेशिक काल और शहर" },  
      { id: "h8-ch7", name: "Weavers, Iron Smelters and Factory Owners", nameHi: "बुनकर, लोहा गलाने वाले और कारखाना मालिक" },  
      { id: "h8-ch8", name: "Civilising the Native, Educating the Nation", nameHi: "सभ्य बनाने की नीति और राष्ट्र को शिक्षित करना" },  
      { id: "h8-ch9", name: "Women, Caste and Reform", nameHi: "महिलाएँ, जाति और सुधार" },  
      { id: "h8-ch10", name: "The Changing World of Visual Arts", nameHi: "दृश्य कलाओं की बदलती दुनिया" },  
      { id: "h8-ch11", name: "The Making of the National Movement", nameHi: "राष्ट्रीय आंदोलन का निर्माण" },  
      { id: "h8-ch12", name: "India After Independence", nameHi: "स्वतंत्रता के बाद भारत" }  
    ]  
  },  
  {  
    id: "geography-8",  
    name: "Resources and Development",  
    nameHi: "संसाधन और विकास",  
    chapters: [  
      { id: "g8-ch1", name: "Resources", nameHi: "संसाधन" },  
      { id: "g8-ch2", name: "Land, Soil, Water, Natural Vegetation and Wildlife Resources", nameHi: "भूमि, मृदा, जल, प्राकृतिक वनस्पति और वन्य संसाधन" },  
      { id: "g8-ch3", name: "Mineral and Power Resources", nameHi: "खनिज और शक्ति संसाधन" },  
      { id: "g8-ch4", name: "Agriculture", nameHi: "कृषि" },  
      { id: "g8-ch5", name: "Industries", nameHi: "उद्योग" },  
      { id: "g8-ch6", name: "Human Resources", nameHi: "मानव संसाधन" }  
    ]  
  },  
  {  
    id: "civics-8",  
    name: "Social and Political Life – 3",  
    nameHi: "सामाजिक एवं राजनीतिक जीवन – 3",  
    chapters: [  
      { id: "c8-ch1", name: "The Indian Constitution", nameHi: "भारतीय संविधान" },  
      { id: "c8-ch2", name: "Understanding Secularism", nameHi: "धर्मनिरपेक्षता की समझ" },  
      { id: "c8-ch3", name: "Why Do We Need a Parliament?", nameHi: "हमें संसद की आवश्यकता क्यों है?" },  
      { id: "c8-ch4", name: "Understanding Laws", nameHi: "कानून की समझ" },  
      { id: "c8-ch5", name: "Judiciary", nameHi: "न्यायपालिका" },  
      { id: "c8-ch6", name: "Understanding Our Criminal Justice System", nameHi: "आपराधिक न्याय प्रणाली की समझ" },  
      { id: "c8-ch7", name: "Understanding Marginalisation", nameHi: "हाशियाकरण की समझ" },  
      { id: "c8-ch8", name: "Confronting Marginalisation", nameHi: "हाशियाकरण का सामना करना" },  
      { id: "c8-ch9", name: "Public Facilities", nameHi: "सार्वजनिक सुविधाएँ" },  
      { id: "c8-ch10", name: "Law and Social Justice", nameHi: "कानून और सामाजिक न्याय" }  
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
id: "honeydew-8",
name: "Honeydew",
nameHi: "Honeydew",
chapters: [
{ id: "hd8-ch1", name: "The Best Christmas Present in the World", nameHi: "The Best Christmas Present in the World" },
{ id: "hd8-ch2", name: "The Tsunami", nameHi: "The Tsunami" },
{ id: "hd8-ch3", name: "Glimpses of the Past", nameHi: "Glimpses of the Past" },
{ id: "hd8-ch4", name: "Bepin Choudhury’s Lapse of Memory", nameHi: "Bepin Choudhury’s Lapse of Memory" },
{ id: "hd8-ch5", name: "The Summit Within", nameHi: "The Summit Within" },
{ id: "hd8-ch6", name: "This is Jody’s Fawn", nameHi: "This is Jody’s Fawn" },
{ id: "hd8-ch7", name: "A Visit to Cambridge", nameHi: "A Visit to Cambridge" },
{ id: "hd8-ch8", name: "A Short Monsoon Diary", nameHi: "A Short Monsoon Diary" }
]
},
{
id: "it-so-happened-8",
name: "It So Happened",
nameHi: "It So Happened",
chapters: [
{ id: "ish8-ch1", name: "How the Camel Got His Hump", nameHi: "How the Camel Got His Hump" },
{ id: "ish8-ch2", name: "Children at Work", nameHi: "Children at Work" },
{ id: "ish8-ch3", name: "The Selfish Giant", nameHi: "The Selfish Giant" },
{ id: "ish8-ch4", name: "The Treasure Within", nameHi: "The Treasure Within" },
{ id: "ish8-ch5", name: "Princess September", nameHi: "Princess September" },
{ id: "ish8-ch6", name: "The Fight", nameHi: "The Fight" },
{ id: "ish8-ch7", name: "The Open Window", nameHi: "The Open Window" },
{ id: "ish8-ch8", name: "Jalebis", nameHi: "Jalebis" }
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
id: "vasant-8",
name: "Vasant Bhag 3",
nameHi: "वसंत भाग 3",
chapters: [
{ id: "va8-ch1", name: "Dhool", nameHi: "धूल" },
{ id: "va8-ch2", name: "Lakh Ki Choodiyan", nameHi: "लाख की चूड़ियाँ" },
{ id: "va8-ch3", name: "Bus Ki Yatra", nameHi: "बस की यात्रा" },
{ id: "va8-ch4", name: "Deewanon Ki Hasti", nameHi: "दीवानों की हस्ती" },
{ id: "va8-ch5", name: "Chitthiyon Ki Anokhi Duniya", nameHi: "चिट्ठियों की अनोखी दुनिया" },
{ id: "va8-ch6", name: "Bhagwan Ke Dakiye", nameHi: "भगवान के डाकिए" },
{ id: "va8-ch7", name: "Kya Nirash Hua Jaye", nameHi: "क्या निराश हुआ जाए" },
{ id: "va8-ch8", name: "Yeh Sabse Kathin Samay Nahin", nameHi: "यह सबसे कठिन समय नहीं" },
{ id: "va8-ch9", name: "Kabir Ki Sakhiyan", nameHi: "कबीर की साखियाँ" },
{ id: "va8-ch10", name: "Kaamchor", nameHi: "कामचोर" },
{ id: "va8-ch11", name: "Jab Cinema Ne Bolna Seekha", nameHi: "जब सिनेमा ने बोलना सीखा" },
{ id: "va8-ch12", name: "Sudama Charit", nameHi: "सुदामा चरित" }
]
},
{
id: "bharat-ki-khoj-8",
name: "Bharat Ki Khoj",
nameHi: "भारत की खोज",
chapters: [
{ id: "bk8-ch1", name: "Ahmadnagar Ka Kila", nameHi: "अहमदनगर का किला" },
{ id: "bk8-ch2", name: "Talash", nameHi: "तलाश" },
{ id: "bk8-ch3", name: "Sindhu Ghati Sabhyata", nameHi: "सिंधु घाटी सभ्यता" },
{ id: "bk8-ch4", name: "Vedon Ka Yug", nameHi: "वेदों का युग" },
{ id: "bk8-ch5", name: "Buddh Aur Mahavir", nameHi: "बुद्ध और महावीर" },
{ id: "bk8-ch6", name: "Maurya Aur Gupta Samrajya", nameHi: "मौर्य और गुप्त साम्राज्य" },
{ id: "bk8-ch7", name: "Harshvardhan Se Delhi Sultanat Tak", nameHi: "हर्षवर्धन से दिल्ली सल्तनत तक" },
{ id: "bk8-ch8", name: "Mughal Samrajya", nameHi: "मुगल साम्राज्य" },
{ id: "bk8-ch9", name: "Angrezon Ka Aagman", nameHi: "अंग्रेजों का आगमन" },
{ id: "bk8-ch10", name: "Swatantrata Andolan", nameHi: "स्वतंत्रता आंदोलन" }
]
}
]
}
],
9: [
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [{
id: "math-9",
name: "Mathematics",
nameHi: "गणित",
chapters: [
{ id: "m9-ch1", name: "Number Systems", nameHi: "संख्या पद्धति" },
{ id: "m9-ch2", name: "Polynomials", nameHi: "बहुपद" },
{ id: "m9-ch3", name: "Coordinate Geometry", nameHi: "निर्देशांक ज्यामिति" },
{ id: "m9-ch4", name: "Linear Equations in Two Variables", nameHi: "दो चरों वाले रैखिक समीकरण" },
{ id: "m9-ch5", name: "Introduction to Euclid’s Geometry", nameHi: "यूक्लिड की ज्यामिति का परिचय" },
{ id: "m9-ch6", name: "Lines and Angles", nameHi: "रेखाएँ और कोण" },
{ id: "m9-ch7", name: "Triangles", nameHi: "त्रिभुज" },
{ id: "m9-ch8", name: "Quadrilaterals", nameHi: "चतुर्भुज" },
{ id: "m9-ch9", name: "Areas of Parallelograms and Triangles", nameHi: "समांतर चतुर्भुज और त्रिभुज के क्षेत्रफल" },
{ id: "m9-ch10", name: "Circles", nameHi: "वृत्त" },
{ id: "m9-ch11", name: "Constructions", nameHi: "रचनाएँ" },
{ id: "m9-ch12", name: "Heron’s Formula", nameHi: "हीरोन का सूत्र" },
{ id: "m9-ch13", name: "Surface Areas and Volumes", nameHi: "पृष्ठीय क्षेत्रफल और आयतन" },
{ id: "m9-ch14", name: "Statistics", nameHi: "सांख्यिकी" },
{ id: "m9-ch15", name: "Probability", nameHi: "प्रायिकता" }
]
}]
},

{
id: "science",
name: "Science",
nameHi: "विज्ञान",
icon: "flask",
books: [{
id: "science-9",
name: "Science",
nameHi: "विज्ञान",
chapters: [
  { id: "s9-ch1", name: "Matter in Our Surroundings", nameHi: "हमारे आसपास के पदार्थ" },
{ id: "s9-ch2", name: "Is Matter Around Us Pure", nameHi: "क्या हमारे आसपास का पदार्थ शुद्ध है" },
{ id: "s9-ch3", name: "Atoms and Molecules", nameHi: "परमाणु और अणु" },
{ id: "s9-ch4", name: "Structure of the Atom", nameHi: "परमाणु की संरचना" },
{ id: "s9-ch5", name: "The Fundamental Unit of Life", nameHi: "जीवन की मूल इकाई" },
{ id: "s9-ch6", name: "Tissues", nameHi: "ऊतक" },
{ id: "s9-ch7", name: "Motion", nameHi: "गति" },
{ id: "s9-ch8", name: "Force and Laws of Motion", nameHi: "बल तथा गति के नियम" },
{ id: "s9-ch9", name: "Gravitation", nameHi: "गुरुत्वाकर्षण" },
{ id: "s9-ch10", name: "Work and Energy", nameHi: "कार्य और ऊर्जा" },
{ id: "s9-ch11", name: "Sound", nameHi: "ध्वनि" },
{ id: "s9-ch12", name: "Improvement in Food Resources", nameHi: "खाद्य संसाधनों में सुधार" }
]
}]
},

{
id: "social-science",
name: "Social Science",
nameHi: "सामाजिक विज्ञान",
icon: "globe",
books: [
{
id: "history-9",
name: "India and the Contemporary World – I",
nameHi: "भारत और समकालीन विश्व – I",
chapters: [
{ id: "h9-ch1", name: "The French Revolution", nameHi: "फ्रांसीसी क्रांति" },
{ id: "h9-ch2", name: "Socialism in Europe and the Russian Revolution", nameHi: "यूरोप में समाजवाद और रूसी क्रांति" },
{ id: "h9-ch3", name: "Nazism and the Rise of Hitler", nameHi: "नाज़ीवाद और हिटलर का उदय" },
{ id: "h9-ch4", name: "Forest Society and Colonialism", nameHi: "वन समाज और उपनिवेशवाद" },
{ id: "h9-ch5", name: "Pastoralists in the Modern World", nameHi: "आधुनिक विश्व में पशुपालक" }
]
},
{
id: "geography-9",
name: "Contemporary India – I",
nameHi: "समकालीन भारत – I",
chapters: [
{ id: "g9-ch1", name: "India – Size and Location", nameHi: "भारत – आकार और स्थिति" },
{ id: "g9-ch2", name: "Physical Features of India", nameHi: "भारत के भौतिक स्वरूप" },
{ id: "g9-ch3", name: "Drainage", nameHi: "अपवाह" },
{ id: "g9-ch4", name: "Climate", nameHi: "जलवायु" },
{ id: "g9-ch5", name: "Natural Vegetation and Wildlife", nameHi: "प्राकृतिक वनस्पति और वन्य जीवन" },
{ id: "g9-ch6", name: "Population", nameHi: "जनसंख्या" }
]
},
{
id: "civics-9",
name: "Democratic Politics – I",
nameHi: "लोकतांत्रिक राजनीति – I",
chapters: [
{ id: "c9-ch1", name: "What is Democracy? Why Democracy?", nameHi: "लोकतंत्र क्या? क्यों लोकतंत्र?" },
{ id: "c9-ch2", name: "Constitutional Design", nameHi: "संवैधानिक संरचना" },
{ id: "c9-ch3", name: "Electoral Politics", nameHi: "चुनावी राजनीति" },
{ id: "c9-ch4", name: "Working of Institutions", nameHi: "संस्थाओं का कामकाज" },
{ id: "c9-ch5", name: "Democratic Rights", nameHi: "लोकतांत्रिक अधिकार" }
]
},
{
id: "economics-9",
name: "Economics",
nameHi: "अर्थशास्त्र",
chapters: [
{ id: "e9-ch1", name: "The Story of Village Palampur", nameHi: "ग्राम पलमपुर की कहानी" },
{ id: "e9-ch2", name: "People as Resource", nameHi: "संसाधन के रूप में लोग" },
{ id: "e9-ch3", name: "Poverty as a Challenge", nameHi: "गरीबी एक चुनौती" },
{ id: "e9-ch4", name: "Food Security in India", nameHi: "भारत में खाद्य सुरक्षा" }
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
id: "beehive-9",
name: "Beehive",
nameHi: "Beehive",
chapters: [
{ id: "b9-ch1", name: "The Fun They Had", nameHi: "The Fun They Had" },
{ id: "b9-ch2", name: "The Sound of Music", nameHi: "The Sound of Music" },
{ id: "b9-ch3", name: "The Little Girl", nameHi: "The Little Girl" },
{ id: "b9-ch4", name: "A Truly Beautiful Mind", nameHi: "A Truly Beautiful Mind" },
{ id: "b9-ch5", name: "The Snake and the Mirror", nameHi: "The Snake and the Mirror" },
{ id: "b9-ch6", name: "My Childhood", nameHi: "My Childhood" },
{ id: "b9-ch7", name: "Packing", nameHi: "Packing" },
{ id: "b9-ch8", name: "Reach for the Top", nameHi: "Reach for the Top" },
{ id: "b9-ch9", name: "The Bond of Love", nameHi: "The Bond of Love" },
{ id: "b9-ch10", name: "Kathmandu", nameHi: "Kathmandu" },
{ id: "b9-ch11", name: "If I Were You", nameHi: "If I Were You" }
]
},
 {
   id: "moments-9",
name: "Moments",
nameHi: "Moments",
chapters: [
{ id: "m9m-ch1", name: "The Lost Child", nameHi: "The Lost Child" },
{ id: "m9m-ch2", name: "The Adventures of Toto", nameHi: "The Adventures of Toto" },
{ id: "m9m-ch3", name: "Iswaran the Storyteller", nameHi: "Iswaran the Storyteller" },
{ id: "m9m-ch4", name: "In the Kingdom of Fools", nameHi: "In the Kingdom of Fools" },
{ id: "m9m-ch5", name: "The Happy Prince", nameHi: "The Happy Prince" },
{ id: "m9m-ch6", name: "Weathering the Storm in Ersama", nameHi: "Weathering the Storm in Ersama" },
{ id: "m9m-ch7", name: "The Last Leaf", nameHi: "The Last Leaf" },
{ id: "m9m-ch8", name: "A House Is Not a Home", nameHi: "A House Is Not a Home" },
{ id: "m9m-ch9", name: "The Accidental Tourist", nameHi: "The Accidental Tourist" },
{ id: "m9m-ch10", name: "The Beggar", nameHi: "The Beggar" }
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
id: "kshitij-1-9",
name: "Kshitij – 1",
nameHi: "क्षितिज – 1",
chapters: [
{ id: "k9-ch1", name: "Do Bailon Ki Katha", nameHi: "दो बैलों की कथा" },
{ id: "k9-ch2", name: "Lhasa Ki Or", nameHi: "ल्हासा की ओर" },
{ id: "k9-ch3", name: "Upbhokta Ki Sanskriti", nameHi: "उपभोक्ता की संस्कृति" },
{ id: "k9-ch4", name: "Saanwale Sapnon Ki Yaad", nameHi: "सांवले सपनों की याद" },
{ id: "k9-ch5", name: "Nana Sahab Ki Putri Devi Maina Ko Bhasm Kar Diya Gaya", nameHi: "नाना साहब की पुत्री देवी मैना को भस्म कर दिया गया" },
{ id: "k9-ch6", name: "Premchand Ke Phate Jute", nameHi: "प्रेमचंद के फटे जूते" },
{ id: "k9-ch7", name: "Mere Bachpan Ke Din", nameHi: "मेरे बचपन के दिन" },
{ id: "k9-ch8", name: "Ek Kutte Ki Aatmkatha", nameHi: "एक कुत्ते की आत्मकथा" },
{ id: "k9-ch9", name: "Sakhi", nameHi: "साखी" },
{ id: "k9-ch10", name: "Dohe", nameHi: "दोहे" },
{ id: "k9-ch11", name: "Geet A-Geet", nameHi: "गीत-अगीत" },
{ id: "k9-ch12", name: "Agni Path", nameHi: "अग्निपथ" },
{ id: "k9-ch13", name: "Naye Ilaake Mein", nameHi: "नए इलाके में" },
{ id: "k9-ch14", name: "Khushboo Rachte Hain Haath", nameHi: "खुशबू रचते हैं हाथ" }
]
},
{
id: "kritika-1-9",
name: "Kritika – 1",
nameHi: "कृतिका – 1",
chapters: [
{ id: "kr9-ch1", name: "Is Jal Pralay Mein", nameHi: "इस जल प्रलय में" },
{ id: "kr9-ch2", name: "Mere Sang Ki Auratein", nameHi: "मेरे संग की औरतें" },
{ id: "kr9-ch3", name: "Reedh Ki Haddi", nameHi: "रीढ़ की हड्डी" },
{ id: "kr9-ch4", name: "Mati Wali", nameHi: "माटी वाली" },
{ id: "kr9-ch5", name: "Kis Tarah Aakhirkar Main Hindi Mein Aaya", nameHi: "किस तरह आखिरकार मैं हिंदी में आया" }
]
}
]
}
],
10: [
{
id: "math",
name: "Mathematics",
nameHi: "गणित",
icon: "calculator",
books: [{
id: "math-10",
name: "Mathematics",
nameHi: "गणित",
chapters: [
{ id: "m10-ch1", name: "Real Numbers", nameHi: "वास्तविक संख्याएँ" },
{ id: "m10-ch2", name: "Polynomials", nameHi: "बहुपद" },
{ id: "m10-ch3", name: "Pair of Linear Equations in Two Variables", nameHi: "दो चरों वाले रैखिक समीकरण युग्म" },
{ id: "m10-ch4", name: "Quadratic Equations", nameHi: "द्विघात समीकरण" },
{ id: "m10-ch5", name: "Arithmetic Progressions", nameHi: "समांतर श्रेणी" },
{ id: "m10-ch6", name: "Triangles", nameHi: "त्रिभुज" },
{ id: "m10-ch7", name: "Coordinate Geometry", nameHi: "निर्देशांक ज्यामिति" },
{ id: "m10-ch8", name: "Introduction to Trigonometry", nameHi: "त्रिकोणमिति का परिचय" },
{ id: "m10-ch9", name: "Some Applications of Trigonometry", nameHi: "त्रिकोणमिति के कुछ अनुप्रयोग" },
{ id: "m10-ch10", name: "Circles", nameHi: "वृत्त" },
{ id: "m10-ch11", name: "Constructions", nameHi: "रचनाएँ" },
{ id: "m10-ch12", name: "Areas Related to Circles", nameHi: "वृत्त से संबंधित क्षेत्रफल" },
{ id: "m10-ch13", name: "Surface Areas and Volumes", nameHi: "पृष्ठीय क्षेत्रफल और आयतन" },
{ id: "m10-ch14", name: "Statistics", nameHi: "सांख्यिकी" },
{ id: "m10-ch15", name: "Probability", nameHi: "प्रायिकता" }
]
}]
},

{
id: "science",
name: "Science",
nameHi: "विज्ञान",
icon: "flask",
books: [{
id: "science-10",
name: "Science",
nameHi: "विज्ञान",
chapters: [
  { id: "s10-ch1", name: "Chemical Reactions and Equations", nameHi: "रासायनिक अभिक्रियाएँ एवं समीकरण" },
{ id: "s10-ch2", name: "Acids, Bases and Salts", nameHi: "अम्ल, क्षारक एवं लवण" },
{ id: "s10-ch3", name: "Metals and Non-metals", nameHi: "धातु और अधातु" },
{ id: "s10-ch4", name: "Carbon and its Compounds", nameHi: "कार्बन और उसके यौगिक" },
{ id: "s10-ch5", name: "Life Processes", nameHi: "जीवन प्रक्रियाएँ" },
{ id: "s10-ch6", name: "Control and Coordination", nameHi: "नियंत्रण एवं समन्वय" },
{ id: "s10-ch7", name: "How do Organisms Reproduce", nameHi: "जीव जनन कैसे करते हैं" },
{ id: "s10-ch8", name: "Heredity and Evolution", nameHi: "आनुवंशिकता एवं विकास" },
{ id: "s10-ch9", name: "Light – Reflection and Refraction", nameHi: "प्रकाश – परावर्तन एवं अपवर्तन" },
{ id: "s10-ch10", name: "The Human Eye and the Colourful World", nameHi: "मानव नेत्र तथा रंगबिरंगा संसार" },
{ id: "s10-ch11", name: "Electricity", nameHi: "विद्युत" },
{ id: "s10-ch12", name: "Magnetic Effects of Electric Current", nameHi: "विद्युत धारा के चुम्बकीय प्रभाव" },
{ id: "s10-ch13", name: "Our Environment", nameHi: "हमारा पर्यावरण" },
{ id: "s10-ch14", name: "Management of Natural Resources", nameHi: "प्राकृतिक संसाधनों का प्रबंधन" }
        ]
      }
    ]
  },

  {
    id: "social-science",
    name: "Social Science",
    nameHi: "सामाजिक विज्ञान",
    icon: "globe",
    books: [
      {
        id: "history-10",
        name: "India and the Contemporary World – II",
        nameHi: "भारत और समकालीन विश्व – II",
        chapters: [
          { id: "h10-ch1", name: "The Rise of Nationalism in Europe", nameHi: "यूरोप में राष्ट्रवाद का उदय" },
          { id: "h10-ch2", name: "Nationalism in India", nameHi: "भारत में राष्ट्रवाद" },
          { id: "h10-ch3", name: "The Making of a Global World", nameHi: "वैश्वीकरण का निर्माण" },
          { id: "h10-ch4", name: "The Age of Industrialisation", nameHi: "औद्योगीकरण का युग" },
          { id: "h10-ch5", name: "Print Culture and the Modern World", nameHi: "मुद्रण संस्कृति और आधुनिक विश्व" }
        ]
      },
      {
        id: "geography-10",
        name: "Contemporary India – II",
        nameHi: "समकालीन भारत – II",
        chapters: [
          { id: "g10-ch1", name: "Resources and Development", nameHi: "संसाधन और विकास" },
          { id: "g10-ch2", name: "Forest and Wildlife Resources", nameHi: "वन एवं वन्य जीव संसाधन" },
          { id: "g10-ch3", name: "Water Resources", nameHi: "जल संसाधन" },
          { id: "g10-ch4", name: "Agriculture", nameHi: "कृषि" },
          { id: "g10-ch5", name: "Minerals and Energy Resources", nameHi: "खनिज एवं ऊर्जा संसाधन" },
          { id: "g10-ch6", name: "Manufacturing Industries", nameHi: "निर्माण उद्योग" },
          { id: "g10-ch7", name: "Lifelines of National Economy", nameHi: "राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएँ" }
        ]
      },
      {
        id: "civics-10",
        name: "Democratic Politics – II",
        nameHi: "लोकतांत्रिक राजनीति – II",
        chapters: [
          { id: "c10-ch1", name: "Power Sharing", nameHi: "सत्ता की साझेदारी" },
          { id: "c10-ch2", name: "Federalism", nameHi: "संघवाद" },
          { id: "c10-ch3", name: "Gender, Religion and Caste", nameHi: "लैंगिकता, धर्म और जाति" },
          { id: "c10-ch4", name: "Political Parties", nameHi: "राजनीतिक दल" },
          { id: "c10-ch5", name: "Outcomes of Democracy", nameHi: "लोकतंत्र के परिणाम" }
        ]
      },
      {
        id: "economics-10",
        name: "Understanding Economic Development",
        nameHi: "आर्थिक विकास की समझ",
        chapters: [
          { id: "e10-ch1", name: "Development", nameHi: "विकास" },
          { id: "e10-ch2", name: "Sectors of Indian Economy", nameHi: "भारतीय अर्थव्यवस्था के क्षेत्र" },
          { id: "e10-ch3", name: "Money and Credit", nameHi: "मुद्रा और ऋण" },
          { id: "e10-ch4", name: "Globalisation and the Indian Economy", nameHi: "वैश्वीकरण और भारतीय अर्थव्यवस्था" },
          { id: "e10-ch5", name: "Consumer Rights", nameHi: "उपभोक्ता अधिकार" }
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
id: "first-flight-10",
name: "First Flight",
nameHi: "First Flight",
chapters: [
{ id: "ff10-ch1", name: "A Letter to God", nameHi: "A Letter to God" },
{ id: "ff10-ch2", name: "Nelson Mandela: Long Walk to Freedom", nameHi: "Nelson Mandela: Long Walk to Freedom" },
{ id: "ff10-ch3", name: "Two Stories about Flying", nameHi: "Two Stories about Flying" },
{ id: "ff10-ch4", name: "From the Diary of Anne Frank", nameHi: "From the Diary of Anne Frank" },
{ id: "ff10-ch5", name: "The Hundred Dresses I", nameHi: "The Hundred Dresses I" },
{ id: "ff10-ch6", name: "The Hundred Dresses II", nameHi: "The Hundred Dresses II" },
{ id: "ff10-ch7", name: "Glimpses of India", nameHi: "Glimpses of India" },
{ id: "ff10-ch8", name: "Mijbil the Otter", nameHi: "Mijbil the Otter" },
{ id: "ff10-ch9", name: "Madam Rides the Bus", nameHi: "Madam Rides the Bus" },
{ id: "ff10-ch10", name: "The Sermon at Benares", nameHi: "The Sermon at Benares" },
{ id: "ff10-ch11", name: "The Proposal", nameHi: "The Proposal" }
]
},
{
id: "footprints-10",
name: "Footprints Without Feet",
nameHi: "Footprints Without Feet",
chapters: [
{ id: "fp10-ch1", name: "A Triumph of Surgery", nameHi: "A Triumph of Surgery" },
{ id: "fp10-ch2", name: "The Thief’s Story", nameHi: "The Thief’s Story" },
{ id: "fp10-ch3", name: "The Midnight Visitor", nameHi: "The Midnight Visitor" },
{ id: "fp10-ch4", name: "A Question of Trust", nameHi: "A Question of Trust" },
{ id: "fp10-ch5", name: "Footprints Without Feet", nameHi: "Footprints Without Feet" },
{ id: "fp10-ch6", name: "The Making of a Scientist", nameHi: "The Making of a Scientist" },
{ id: "fp10-ch7", name: "The Necklace", nameHi: "The Necklace" },
{ id: "fp10-ch8", name: "The Hack Driver", nameHi: "The Hack Driver" },
{ id: "fp10-ch9", name: "Bholi", nameHi: "Bholi" },
{ id: "fp10-ch10", name: "The Book That Saved the Earth", nameHi: "The Book That Saved the Earth" }
]
}
]
},

{
id: "hindi-course-a",
name: "Hindi Course A",
nameHi: "हिंदी कोर्स A",
icon: "languages",
books: [
{
id: "kshitij-2-10",
name: "Kshitij – 2",
nameHi: "क्षितिज – 2",
chapters: [
{ id: "k10a-ch1", name: "Surdas", nameHi: "सूरदास" },
{ id: "k10a-ch2", name: "Tulsidas", nameHi: "तुलसीदास" },
{ id: "k10a-ch3", name: "Dev", nameHi: "देव" },
{ id: "k10a-ch4", name: "Jaishankar Prasad", nameHi: "जयशंकर प्रसाद" },
{ id: "k10a-ch5", name: "Suryakant Tripathi Nirala", nameHi: "सूर्यकांत त्रिपाठी निराला" },
{ id: "k10a-ch6", name: "Nagarjun", nameHi: "नागार्जुन" },
{ id: "k10a-ch7", name: "Girija Kumar Mathur", nameHi: "गिरिजा कुमार माथुर" },
{ id: "k10a-ch8", name: "Rituraj", nameHi: "ऋतुराज" },
{ id: "k10a-ch9", name: "Netaji Ka Chashma", nameHi: "नेताजी का चश्मा" },
{ id: "k10a-ch10", name: "Bal Govind Bhagat", nameHi: "बाल गोविंद भगत" },
{ id: "k10a-ch11", name: "Lakhnavi Andaz", nameHi: "लखनवी अंदाज़" },
{ id: "k10a-ch12", name: "Manushyata", nameHi: "मनुष्यता" },
{ id: "k10a-ch13", name: "Ek Kahani Yeh Bhi", nameHi: "एक कहानी यह भी" },
{ id: "k10a-ch14", name: "Stri Shiksha Ke Virodhi Kutarkon Ka Khandan", nameHi: "स्त्री शिक्षा के विरोधी कुतर्कों का खंडन" },
{ id: "k10a-ch15", name: "Naubatkhane Mein Ibadat", nameHi: "नौबतखाने में इबादत" },
{ id: "k10a-ch16", name: "Sanskriti", nameHi: "संस्कृति" },
{ id: "k10a-ch17", name: "Atmkathya", nameHi: "आत्मकथ्य" }
]
},
{
id: "kritika-2-10",
name: "Kritika – 2",
nameHi: "कृतिका – 2",
chapters: [
{ id: "kr10a-ch1", name: "Mata Ka Anchal", nameHi: "माता का आँचल" },
{ id: "kr10a-ch2", name: "George Pancham Ki Naak", nameHi: "जॉर्ज पंचम की नाक" },
{ id: "kr10a-ch3", name: "Sana Sana Hath Jodi", nameHi: "साना-साना हाथ जोड़ि" },
{ id: "kr10a-ch4", name: "Ehi Thain Jhulan Heryani Ho Rama", nameHi: "एही ठैयाँ झुलनी हेरानी हो रामा" }
]
}
]
},
  {
  id: "hindi-course-b",
  name: "Hindi Course B",
  nameHi: "हिंदी कोर्स B",
  icon: "languages",
  books: [
    {
      id: "sparsh-2-10",
      name: "Sparsh – 2",
      nameHi: "स्पर्श – 2",
      chapters: [
        { id: "sp10b-ch1", name: "Kabir", nameHi: "कबीर" },
        { id: "sp10b-ch2", name: "Meera", nameHi: "मीरा" },
        { id: "sp10b-ch3", name: "Bihari", nameHi: "बिहारी" },
        { id: "sp10b-ch4", name: "Manushyata", nameHi: "मनुष्यता" },
        { id: "sp10b-ch5", name: "Parvat Pradesh Mein Pavas", nameHi: "पर्वत प्रदेश में पावस" },
        { id: "sp10b-ch6", name: "Topi Shukla", nameHi: "टोपी शुक्ला" },
        { id: "sp10b-ch7", name: "Netaji Ka Chashma", nameHi: "नेताजी का चश्मा" },
        { id: "sp10b-ch8", name: "Bal Govind Bhagat", nameHi: "बाल गोविंद भगत" },
        { id: "sp10b-ch9", name: "Lakhnavi Andaz", nameHi: "लखनवी अंदाज़" },
        { id: "sp10b-ch10", name: "Stri Shiksha Ke Virodhi Kutarkon Ka Khandan", nameHi: "स्त्री शिक्षा के विरोधी कुतर्कों का खंडन" },
        { id: "sp10b-ch11", name: "Naubatkhane Mein Ibadat", nameHi: "नौबतखाने में इबादत" },
        { id: "sp10b-ch12", name: "Sanskriti", nameHi: "संस्कृति" },
        { id: "sp10b-ch13", name: "Atmkathya", nameHi: "आत्मकथ्य" },
        { id: "sp10b-ch14", name: "Sana Sana Hath Jodi", nameHi: "साना-साना हाथ जोड़ि" },
        { id: "sp10b-ch15", name: "Ehi Thain Jhulan Heryani Ho Rama", nameHi: "एही ठैयाँ झुलनी हेरानी हो रामा" },
        { id: "sp10b-ch16", name: "Bholi", nameHi: "भोली" },
        { id: "sp10b-ch17", name: "The Proposal (Hindi Adaptation)", nameHi: "प्रस्ताव" }
      ]
    },
    {
      id: "sanchayan-2-10",
      name: "Sanchayan – 2",
      nameHi: "संचयन – 2",
      chapters: [
        { id: "sa10b-ch1", name: "Harihar Kaka", nameHi: "हरिहर काका" },
        { id: "sa10b-ch2", name: "Sapnon Ke Se Din", nameHi: "सपनों के-से दिन" },
        { id: "sa10b-ch3", name: "Topi Shukla", nameHi: "टोपी शुक्ला" }
      ]
    }
  ]        // books close
}          // subject close
]          // class 10 close
};         // subjectsByClass object close
export const streamsByClass: Record<ClassNumber, Stream[]> = {

  11: [
    {
      id: "science",
      name: "Science",
      nameHi: "विज्ञान",
      subjects: [

  {
    id: "physics-11",
    name: "Physics",
    nameHi: "भौतिकी",
    icon: "atom",
    books: [

  {
    id: "physics-11-part-1",
    name: "Physics Part I",
    nameHi: "भौतिकी भाग 1",
    chapters: [

  { id: "phy11-1", name: "Physical World", nameHi: "भौतिक जगत" },
  { id: "phy11-2", name: "Units and Measurements", nameHi: "इकाइयाँ एवं मापन" },
  { id: "phy11-3", name: "Motion in a Straight Line", nameHi: "सरल रेखा में गति" },
  { id: "phy11-4", name: "Motion in a Plane", nameHi: "समतल में गति" },
  { id: "phy11-5", name: "Laws of Motion", nameHi: "गति के नियम" },
  { id: "phy11-6", name: "Work, Energy and Power", nameHi: "कार्य, ऊर्जा और शक्ति" },
  { id: "phy11-7", name: "System of Particles and Rotational Motion", nameHi: "कणों का तंत्र एवं घूर्णन गति" }

]
  },

  {
  id: "physics-11-part-2",
  name: "Physics Part II",
  nameHi: "भौतिकी भाग 2",
  chapters: [

    { id: "phy11-8",  name: "Gravitation", nameHi: "गुरुत्वाकर्षण" },
    { id: "phy11-9",  name: "Mechanical Properties of Solids", nameHi: "ठोसों के यांत्रिक गुण" },
    { id: "phy11-10", name: "Mechanical Properties of Fluids", nameHi: "द्रवों के यांत्रिक गुण" },
    { id: "phy11-11", name: "Thermal Properties of Matter", nameHi: "पदार्थ के तापीय गुण" },
    { id: "phy11-12", name: "Thermodynamics", nameHi: "ऊष्मागतिकी" },
    { id: "phy11-13", name: "Kinetic Theory", nameHi: "गति सिद्धांत" },
    { id: "phy11-14", name: "Oscillations", nameHi: "दोलन" },
    { id: "phy11-15", name: "Waves", nameHi: "तरंगें" }

  ]
  }

]
  },

  {
    id: "chemistry-11",
    name: "Chemistry",
    nameHi: "रसायन विज्ञान",
    icon: "flask",
    books: []
  },

  {
    id: "biology-11",
    name: "Biology",
    nameHi: "जीव विज्ञान",
    icon: "leaf",
    books: []
  },

  {
    id: "mathematics-11",
    name: "Mathematics",
    nameHi: "गणित",
    icon: "calculator",
    books: []
  },

  {
    id: "english-core-11",
    name: "English (Core)",
    nameHi: "अंग्रेज़ी (कोर)",
    icon: "book-open",
    books: []
  },

  {
    id: "hindi-core-11",
    name: "Hindi (Core)",
    nameHi: "हिंदी (कोर)",
    icon: "book",
    books: []
  }

]
    },
    {
      id: "commerce",
      name: "Commerce",
      nameHi: "वाणिज्य",
      subjects: []
    },
    {
      id: "arts",
      name: "Arts",
      nameHi: "कला",
      subjects: []
    }
  ],

  12: [
    {
      id: "science",
      name: "Science",
      nameHi: "विज्ञान",
      subjects: []
    },
    {
      id: "commerce",
      name: "Commerce",
      nameHi: "वाणिज्य",
      subjects: []
    },
    {
      id: "arts",
      name: "Arts",
      nameHi: "कला",
      subjects: []
    }
  ]

};
export function getQuizQuestions() {
  return []
}
