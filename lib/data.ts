export type ClassNumber = 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface Subject {
  id: string
  name: string
  nameHi: string
  icon: string
  chapters: Chapter[]
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

const scienceChapters: Chapter[] = [
  { id: "ch1", name: "Food: Where Does It Come From?", nameHi: "भोजन: यह कहाँ से आता है?" },
  { id: "ch2", name: "Components of Food", nameHi: "भोजन के घटक" },
  { id: "ch3", name: "Fibre to Fabric", nameHi: "तंतु से वस्त्र तक" },
  { id: "ch4", name: "Sorting Materials into Groups", nameHi: "वस्तुओं के समूह बनाना" },
  { id: "ch5", name: "Separation of Substances", nameHi: "पदार्थों का पृथक्करण" },
  { id: "ch6", name: "Changes Around Us", nameHi: "हमारे चारों ओर के परिवर्तन" },
  { id: "ch7", name: "Getting to Know Plants", nameHi: "पौधों से परिचय" },
  { id: "ch8", name: "Body Movements", nameHi: "शरीर में गति" },
]

const mathChapters: Chapter[] = [
  { id: "ch1", name: "Knowing Our Numbers", nameHi: "अपनी संख्याओं की जानकारी" },
  { id: "ch2", name: "Whole Numbers", nameHi: "पूर्ण संख्याएँ" },
  { id: "ch3", name: "Playing with Numbers", nameHi: "संख्याओं के साथ खेलना" },
  { id: "ch4", name: "Basic Geometrical Ideas", nameHi: "आधारभूत ज्यामितीय अवधारणाएँ" },
  { id: "ch5", name: "Understanding Elementary Shapes", nameHi: "प्रारंभिक आकारों को समझना" },
  { id: "ch6", name: "Integers", nameHi: "पूर्णांक" },
  { id: "ch7", name: "Fractions", nameHi: "भिन्न" },
  { id: "ch8", name: "Decimals", nameHi: "दशमलव" },
]

const englishChapters: Chapter[] = [
  { id: "ch1", name: "Who Did Patrick's Homework?", nameHi: "पैट्रिक का होमवर्क किसने किया?" },
  { id: "ch2", name: "How the Dog Found Himself a New Master!", nameHi: "कुत्ते ने अपना नया मालिक कैसे खोजा!" },
  { id: "ch3", name: "Taro's Reward", nameHi: "तारो का पुरस्कार" },
  { id: "ch4", name: "An Indian - American Woman in Space", nameHi: "अंतरिक्ष में एक भारतीय-अमेरिकी महिला" },
  { id: "ch5", name: "A Different Kind of School", nameHi: "एक अलग तरह का स्कूल" },
]

const hindiChapters: Chapter[] = [
  { id: "ch1", name: "वह चिड़िया जो", nameHi: "वह चिड़िया जो" },
  { id: "ch2", name: "बचपन", nameHi: "बचपन" },
  { id: "ch3", name: "नादान दोस्त", nameHi: "नादान दोस्त" },
  { id: "ch4", name: "चाँद से थोड़ी-सी गप्पें", nameHi: "चाँद से थोड़ी-सी गप्पें" },
  { id: "ch5", name: "अक्षरों का महत्व", nameHi: "अक्षरों का महत्व" },
]

const socialScienceChapters: Chapter[] = [
  { id: "ch1", name: "What, Where, How and When?", nameHi: "क्या, कहाँ, कब और कैसे?" },
  { id: "ch2", name: "On the Trail of the Earliest People", nameHi: "आरंभिक मानव की खोज में" },
  { id: "ch3", name: "From Gathering to Growing Food", nameHi: "भोजन: संग्रह से उत्पादन तक" },
  { id: "ch4", name: "In the Earliest Cities", nameHi: "आरंभिक नगर" },
  { id: "ch5", name: "What Books and Burials Tell Us", nameHi: "क्या बताती हैं हमें किताबें और कब्रें" },
]

export const subjectsByClass: Record<number, Subject[]> = {
  6: [
    { id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask", chapters: scienceChapters },
    { id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator", chapters: mathChapters },
    { id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open", chapters: englishChapters },
    { id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages", chapters: hindiChapters },
    { id: "social-science", name: "Social Science", nameHi: "सामाजिक विज्ञान", icon: "globe", chapters: socialScienceChapters },
  ],
  7: [
    { id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask", chapters: [
      { id: "ch1", name: "Nutrition in Plants", nameHi: "पौधों में पोषण" },
      { id: "ch2", name: "Nutrition in Animals", nameHi: "प्राणियों में पोषण" },
      { id: "ch3", name: "Heat", nameHi: "ऊष्मा" },
      { id: "ch4", name: "Acids, Bases and Salts", nameHi: "अम्ल, क्षारक और लवण" },
      { id: "ch5", name: "Physical and Chemical Changes", nameHi: "भौतिक एवं रासायनिक परिवर्तन" },
    ]},
    { id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator", chapters: [
      { id: "ch1", name: "Integers", nameHi: "पूर्णांक" },
      { id: "ch2", name: "Fractions and Decimals", nameHi: "भिन्न एवं दशमलव" },
      { id: "ch3", name: "Data Handling", nameHi: "आँकड़ों का प्रबंधन" },
      { id: "ch4", name: "Simple Equations", nameHi: "सरल समीकरण" },
      { id: "ch5", name: "Lines and Angles", nameHi: "रेखा एवं कोण" },
    ]},
    { id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open", chapters: [
      { id: "ch1", name: "Three Questions", nameHi: "तीन प्रश्न" },
      { id: "ch2", name: "A Gift of Chappals", nameHi: "चप्पलों का उपहार" },
      { id: "ch3", name: "Gopal and the Hilsa Fish", nameHi: "गोपाल और हिल्सा मछली" },
    ]},
    { id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages", chapters: hindiChapters },
    { id: "social-science", name: "Social Science", nameHi: "सामाजिक विज्ञान", icon: "globe", chapters: socialScienceChapters },
  ],
  8: [
    { id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask", chapters: [
      { id: "ch1", name: "Crop Production and Management", nameHi: "फसल उत्पादन एवं प्रबंध" },
      { id: "ch2", name: "Microorganisms: Friend and Foe", nameHi: "सूक्ष्मजीव: मित्र एवं शत्रु" },
      { id: "ch3", name: "Coal and Petroleum", nameHi: "कोयला और पेट्रोलियम" },
      { id: "ch4", name: "Combustion and Flame", nameHi: "दहन और ज्वाला" },
      { id: "ch5", name: "Conservation of Plants and Animals", nameHi: "पौधे एवं जंतुओं का संरक्षण" },
    ]},
    { id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator", chapters: [
      { id: "ch1", name: "Rational Numbers", nameHi: "परिमेय संख्याएँ" },
      { id: "ch2", name: "Linear Equations in One Variable", nameHi: "एक चर वाले रैखिक समीकरण" },
      { id: "ch3", name: "Understanding Quadrilaterals", nameHi: "चतुर्भुजों को समझना" },
      { id: "ch4", name: "Data Handling", nameHi: "आँकड़ों का प्रबंधन" },
      { id: "ch5", name: "Squares and Square Roots", nameHi: "वर्ग और वर्गमूल" },
    ]},
    { id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open", chapters: englishChapters },
    { id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages", chapters: hindiChapters },
    { id: "social-science", name: "Social Science", nameHi: "सामाजिक विज्ञान", icon: "globe", chapters: socialScienceChapters },
  ],
  9: [
    { id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask", chapters: [
      { id: "ch1", name: "Matter in Our Surroundings", nameHi: "हमारे आस-पास के पदार्थ" },
      { id: "ch2", name: "Is Matter Around Us Pure?", nameHi: "क्या हमारे आस-पास के पदार्थ शुद्ध हैं?" },
      { id: "ch3", name: "Atoms and Molecules", nameHi: "परमाणु एवं अणु" },
      { id: "ch4", name: "Structure of the Atom", nameHi: "परमाणु की संरचना" },
      { id: "ch5", name: "The Fundamental Unit of Life", nameHi: "जीवन की मौलिक इकाई" },
      { id: "ch6", name: "Tissues", nameHi: "ऊतक" },
    ]},
    { id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator", chapters: [
      { id: "ch1", name: "Number Systems", nameHi: "संख्या पद्धति" },
      { id: "ch2", name: "Polynomials", nameHi: "बहुपद" },
      { id: "ch3", name: "Coordinate Geometry", nameHi: "निर्देशांक ज्यामिति" },
      { id: "ch4", name: "Linear Equations in Two Variables", nameHi: "दो चरों वाले रैखिक समीकरण" },
      { id: "ch5", name: "Introduction to Euclid's Geometry", nameHi: "यूक्लिड की ज्यामिति का परिचय" },
    ]},
    { id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open", chapters: englishChapters },
    { id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages", chapters: hindiChapters },
    { id: "social-science", name: "Social Science", nameHi: "सामाजिक विज्ञान", icon: "globe", chapters: socialScienceChapters },
  ],
  10: [
    { id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask", chapters: [
      { id: "ch1", name: "Chemical Reactions and Equations", nameHi: "रासायनिक अभिक्रियाएँ एवं समीकरण" },
      { id: "ch2", name: "Acids, Bases and Salts", nameHi: "अम्ल, क्षारक एवं लवण" },
      { id: "ch3", name: "Metals and Non-metals", nameHi: "धातु और अधातु" },
      { id: "ch4", name: "Carbon and its Compounds", nameHi: "कार्बन एवं उसके यौगिक" },
      { id: "ch5", name: "Life Processes", nameHi: "जैव प्रक्रम" },
      { id: "ch6", name: "Control and Coordination", nameHi: "नियंत्रण एवं समन्वय" },
    ]},
    { id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator", chapters: [
      { id: "ch1", name: "Real Numbers", nameHi: "वास्तविक संख्याएँ" },
      { id: "ch2", name: "Polynomials", nameHi: "बहुपद" },
      { id: "ch3", name: "Pair of Linear Equations in Two Variables", nameHi: "दो चर वाले रैखिक समीकरण युग्म" },
      { id: "ch4", name: "Quadratic Equations", nameHi: "द्विघात समीकरण" },
      { id: "ch5", name: "Arithmetic Progressions", nameHi: "समांतर श्रेढ़ी" },
    ]},
    { id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open", chapters: englishChapters },
    { id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages", chapters: hindiChapters },
    { id: "social-science", name: "Social Science", nameHi: "सामाजिक विज्ञान", icon: "globe", chapters: socialScienceChapters },
  ],
  11: [
    { id: "physics", name: "Physics", nameHi: "भौतिक विज्ञान", icon: "atom", chapters: [
      { id: "ch1", name: "Physical World", nameHi: "भौतिक जगत" },
      { id: "ch2", name: "Units and Measurements", nameHi: "मात्रक और मापन" },
      { id: "ch3", name: "Motion in a Straight Line", nameHi: "सरल रेखा में गति" },
      { id: "ch4", name: "Motion in a Plane", nameHi: "समतल में गति" },
      { id: "ch5", name: "Laws of Motion", nameHi: "गति के नियम" },
    ]},
    { id: "chemistry", name: "Chemistry", nameHi: "रसायन विज्ञान", icon: "flask", chapters: [
      { id: "ch1", name: "Some Basic Concepts of Chemistry", nameHi: "रसायन विज्ञान की कुछ मूल अवधारणाएँ" },
      { id: "ch2", name: "Structure of Atom", nameHi: "परमाणु की संरचना" },
      { id: "ch3", name: "Classification of Elements", nameHi: "तत्वों का वर्गीकरण" },
      { id: "ch4", name: "Chemical Bonding", nameHi: "रासायनिक आबंधन" },
    ]},
    { id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator", chapters: [
      { id: "ch1", name: "Sets", nameHi: "समुच्चय" },
      { id: "ch2", name: "Relations and Functions", nameHi: "संबंध एवं फलन" },
      { id: "ch3", name: "Trigonometric Functions", nameHi: "त्रिकोणमितीय फलन" },
      { id: "ch4", name: "Complex Numbers", nameHi: "सम्मिश्र संख्याएँ" },
    ]},
    { id: "biology", name: "Biology", nameHi: "जीव विज्ञान", icon: "leaf", chapters: [
      { id: "ch1", name: "The Living World", nameHi: "जीव जगत" },
      { id: "ch2", name: "Biological Classification", nameHi: "जीव जगत का वर्गीकरण" },
      { id: "ch3", name: "Plant Kingdom", nameHi: "वनस्पति जगत" },
      { id: "ch4", name: "Animal Kingdom", nameHi: "प्राणी जगत" },
    ]},
    { id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open", chapters: englishChapters },
  ],
  12: [
    { id: "physics", name: "Physics", nameHi: "भौतिक विज्ञान", icon: "atom", chapters: [
      { id: "ch1", name: "Electric Charges and Fields", nameHi: "वैद्युत आवेश तथा क्षेत्र" },
      { id: "ch2", name: "Electrostatic Potential and Capacitance", nameHi: "स्थिरवैद्युत विभव तथा धारिता" },
      { id: "ch3", name: "Current Electricity", nameHi: "विद्युत धारा" },
      { id: "ch4", name: "Moving Charges and Magnetism", nameHi: "गतिमान आवेश और चुंबकत्व" },
      { id: "ch5", name: "Magnetism and Matter", nameHi: "चुंबकत्व एवं द्रव्य" },
    ]},
    { id: "chemistry", name: "Chemistry", nameHi: "रसायन विज्ञान", icon: "flask", chapters: [
      { id: "ch1", name: "The Solid State", nameHi: "ठोस अवस्था" },
      { id: "ch2", name: "Solutions", nameHi: "विलयन" },
      { id: "ch3", name: "Electrochemistry", nameHi: "वैद्युतरसायन" },
      { id: "ch4", name: "Chemical Kinetics", nameHi: "रासायनिक बलगतिकी" },
    ]},
    { id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator", chapters: [
      { id: "ch1", name: "Relations and Functions", nameHi: "संबंध एवं फलन" },
      { id: "ch2", name: "Inverse Trigonometric Functions", nameHi: "प्रतिलोम त्रिकोणमितीय फलन" },
      { id: "ch3", name: "Matrices", nameHi: "आव्यूह" },
      { id: "ch4", name: "Determinants", nameHi: "सारणिक" },
      { id: "ch5", name: "Continuity and Differentiability", nameHi: "सांतत्य तथा अवकलनीयता" },
    ]},
    { id: "biology", name: "Biology", nameHi: "जीव विज्ञान", icon: "leaf", chapters: [
      { id: "ch1", name: "Reproduction in Organisms", nameHi: "जीवों में जनन" },
      { id: "ch2", name: "Sexual Reproduction in Flowering Plants", nameHi: "पुष्पी पादपों में लैंगिक जनन" },
      { id: "ch3", name: "Human Reproduction", nameHi: "मानव जनन" },
      { id: "ch4", name: "Reproductive Health", nameHi: "जनन स्वास्थ्य" },
    ]},
    { id: "english", name: "English", nameHi: "अंग्रेज़ी", icon: "book-open", chapters: englishChapters },
  ],
}

export function getQuizQuestions(subjectId: string, chapterId?: string): QuizQuestion[] {
  const questions: QuizQuestion[] = [
    {
      id: "q1",
      question: "पौधे अपना भोजन किस प्रक्रिया द्वारा बनाते हैं?",
      options: ["श्वसन", "प्रकाश संश्लेषण", "वाष्पोत्सर्जन", "अवशोषण"],
      correctIndex: 1,
    },
    {
      id: "q2",
      question: "निम्नलिखित में से कौन सा विटामिन C का अच्छा स्रोत है?",
      options: ["चावल", "आँवला", "गेहूँ", "दूध"],
      correctIndex: 1,
    },
    {
      id: "q3",
      question: "पानी का रासायनिक सूत्र क्या है?",
      options: ["CO2", "H2O", "NaCl", "O2"],
      correctIndex: 1,
    },
    {
      id: "q4",
      question: "पृथ्वी सूर्य का चक्कर कितने दिनों में लगाती है?",
      options: ["365 दिन", "30 दिन", "7 दिन", "180 दिन"],
      correctIndex: 0,
    },
    {
      id: "q5",
      question: "मानव शरीर की सबसे बड़ी हड्डी कौन सी है?",
      options: ["ह्यूमरस", "फीमर", "टिबिया", "रेडियस"],
      correctIndex: 1,
    },
    {
      id: "q6",
      question: "भारत की राजधानी क्या है?",
      options: ["मुंबई", "कोलकाता", "नई दिल्ली", "चेन्नई"],
      correctIndex: 2,
    },
    {
      id: "q7",
      question: "1 किलोमीटर में कितने मीटर होते हैं?",
      options: ["100", "500", "1000", "10000"],
      correctIndex: 2,
    },
    {
      id: "q8",
      question: "प्रकाश की चाल कितनी होती है?",
      options: ["3 x 10⁸ m/s", "3 x 10⁶ m/s", "3 x 10⁴ m/s", "3 x 10² m/s"],
      correctIndex: 0,
    },
    {
      id: "q9",
      question: "DNA का पूरा नाम क्या है?",
      options: [
        "डिऑक्सीराइबो न्यूक्लिक एसिड",
        "डाई न्यूट्रो एसिड",
        "डाइनामिक न्यूक्लियर एसिड",
        "डबल नाइट्रो एसिड"
      ],
      correctIndex: 0,
    },
    {
      id: "q10",
      question: "सबसे हल्की गैस कौन सी है?",
      options: ["ऑक्सीजन", "नाइट्रोजन", "हाइड्रोजन", "हीलियम"],
      correctIndex: 2,
    },
  ]

  if (chapterId) {
    const chapterNum = parseInt(chapterId.replace("ch", ""))
    const start = ((chapterNum - 1) * 2) % questions.length
    return [questions[start], questions[(start + 1) % questions.length], questions[(start + 2) % questions.length], questions[(start + 3) % questions.length], questions[(start + 4) % questions.length]]
  }

  return questions
}

export function getBookContent(chapterName: string): string {
  return `यह "${chapterName}" अध्याय की विस्तृत सामग्री है।\n\nइस अध्याय में हम विभिन्न महत्वपूर्ण अवधारणाओं को समझेंगे। प्रत्येक विषय को सरल भाषा में समझाया गया है ताकि छात्र आसानी से सीख सकें।\n\nमुख्य बिंदु:\n• इस अध्याय की मूल अवधारणाएँ\n• महत्वपूर्ण परिभाषाएँ और सूत्र\n• उदाहरण सहित विस्तृत व्याख्या\n• अभ्यास प्रश्न\n\nयह सामग्री NCERT पाठ्यपुस्तक पर आधारित है और परीक्षा की तैयारी के लिए उपयोगी है।`
}

export function getNotesContent(chapterName: string): string {
  return `"${chapterName}" के संक्षिप्त नोट्स\n\n📝 मुख्य बिंदु:\n\n1. इस अध्याय की प्रमुख अवधारणाएँ संक्षेप में प्रस्तुत हैं।\n\n2. सभी महत्वपूर्ण सूत्र और परिभाषाएँ यहाँ दी गई हैं।\n\n3. परीक्षा में बार-बार पूछे जाने वाले प्रश्नों का सारांश।\n\n4. चित्र और आरेख सहित सरल व्याख्या।\n\n⭐ याद रखने योग्य बातें:\n• प्रमुख तथ्य और आँकड़े\n• महत्वपूर्ण तिथियाँ और घटनाएँ\n• सूत्र और समीकरण\n\nये नोट्स त्वरित रिवीज़न के लिए तैयार किए गए हैं।`
}

export function getImportantQuestions(chapterName: string): string[] {
  return [
    `${chapterName} की मुख्य अवधारणा को परिभाषित करें।`,
    `${chapterName} में वर्णित प्रमुख सिद्धांतों की व्याख्या करें।`,
    `${chapterName} से संबंधित प्रयोग का वर्णन करें।`,
    `${chapterName} में दिए गए उदाहरणों की सूची बनाएँ।`,
    `${chapterName} का दैनिक जीवन में क्या महत्व है? समझाएँ।`,
    `${chapterName} के प्रमुख बिंदुओं का सारांश लिखें।`,
    `${chapterName} में किन-किन विषयों पर चर्चा की गई है?`,
    `${chapterName} से संबंधित कोई दो अंतर बताएँ।`,
  ]
}
