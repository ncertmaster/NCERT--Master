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
    }]
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
    ]
  }

]
}
export const streamsByClass: Record<ClassNumber, Stream[]> = {
  11: [
    {
      id: "science",
      name: "Science",
      nameHi: "विज्ञान",
      subjects: [

        // ================= PHYSICS =================
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
                { id: "phy11-8", name: "Gravitation", nameHi: "गुरुत्वाकर्षण" },
                { id: "phy11-9", name: "Mechanical Properties of Solids", nameHi: "ठोसों के यांत्रिक गुण" },
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

        // ================= CHEMISTRY =================
        {
          id: "chemistry-11",
          name: "Chemistry",
          nameHi: "रसायन विज्ञान",
          icon: "flask",
          books: [
            {
              id: "chem-11-part-1",
              name: "Chemistry Part I",
              nameHi: "रसायन विज्ञान भाग 1",
              chapters: [
                { id: "chem11-1", name: "Some Basic Concepts of Chemistry", nameHi: "रसायन विज्ञान की कुछ मूल अवधारणाएँ" },
                { id: "chem11-2", name: "Structure of Atom", nameHi: "परमाणु की संरचना" },
                { id: "chem11-3", name: "Classification of Elements and Periodicity", nameHi: "तत्वों का वर्गीकरण एवं आवर्तिता" },
                { id: "chem11-4", name: "Chemical Bonding and Molecular Structure", nameHi: "रासायनिक बंधन एवं अणु संरचना" },
                { id: "chem11-5", name: "States of Matter", nameHi: "पदार्थ की अवस्थाएँ" },
                { id: "chem11-6", name: "Thermodynamics", nameHi: "ऊष्मागतिकी" },
                { id: "chem11-7", name: "Equilibrium", nameHi: "साम्यावस्था" }
              ]
            },
            {
              id: "chem-11-part-2",
              name: "Chemistry Part II",
              nameHi: "रसायन विज्ञान भाग 2",
              chapters: [
                { id: "chem11-8", name: "Redox Reactions", nameHi: "अपचयन-ऑक्सीकरण अभिक्रियाएँ" },
                { id: "chem11-9", name: "Hydrogen", nameHi: "हाइड्रोजन" },
                { id: "chem11-10", name: "The s-Block Elements", nameHi: "s-ब्लॉक तत्व" },
                { id: "chem11-11", name: "The p-Block Elements", nameHi: "p-ब्लॉक तत्व" },
                { id: "chem11-12", name: "Organic Chemistry – Basic Principles", nameHi: "कार्बनिक रसायन – मूल सिद्धांत" },
                { id: "chem11-13", name: "Hydrocarbons", nameHi: "हाइड्रोकार्बन" },
                { id: "chem11-14", name: "Environmental Chemistry", nameHi: "पर्यावरण रसायन" }
              ]
            }
          ]
        }

      ]
    },
// ================= BIOLOGY =================
        {
          id: "biology-11",
          name: "Biology",
          nameHi: "जीव विज्ञान",
          icon: "dna",
          books: [
            {
              id: "biology-11",
              name: "Biology",
              nameHi: "जीव विज्ञान",
              chapters: [
                { id: "bio11-1", name: "The Living World", nameHi: "जीव जगत" },
                { id: "bio11-2", name: "Biological Classification", nameHi: "जैव वर्गीकरण" },
                { id: "bio11-3", name: "Plant Kingdom", nameHi: "पादप जगत" },
                { id: "bio11-4", name: "Animal Kingdom", nameHi: "प्राणी जगत" },
                { id: "bio11-5", name: "Morphology of Flowering Plants", nameHi: "आवृतबीजी पौधों की आकृति विज्ञान" },
                { id: "bio11-6", name: "Anatomy of Flowering Plants", nameHi: "आवृतबीजी पौधों की आंतरिक संरचना" },
                { id: "bio11-7", name: "Structural Organisation in Animals", nameHi: "प्राणियों में संरचनात्मक संगठन" },
                { id: "bio11-8", name: "Cell: The Unit of Life", nameHi: "कोशिका : जीवन की इकाई" },
                { id: "bio11-9", name: "Biomolecules", nameHi: "जैव अणु" },
                { id: "bio11-10", name: "Cell Cycle and Cell Division", nameHi: "कोशिका चक्र एवं विभाजन" },
                { id: "bio11-11", name: "Transport in Plants", nameHi: "पादपों में परिवहन" },
                { id: "bio11-12", name: "Mineral Nutrition", nameHi: "खनिज पोषण" },
                { id: "bio11-13", name: "Photosynthesis in Higher Plants", nameHi: "उच्च पादपों में प्रकाश संश्लेषण" },
                { id: "bio11-14", name: "Respiration in Plants", nameHi: "पादपों में श्वसन" },
                { id: "bio11-15", name: "Plant Growth and Development", nameHi: "पादप वृद्धि एवं विकास" },
                { id: "bio11-16", name: "Digestion and Absorption", nameHi: "पाचन एवं अवशोषण" },
                { id: "bio11-17", name: "Breathing and Exchange of Gases", nameHi: "श्वसन एवं गैसों का विनिमय" },
                { id: "bio11-18", name: "Body Fluids and Circulation", nameHi: "शरीर द्रव एवं परिसंचरण" },
                { id: "bio11-19", name: "Excretory Products and their Elimination", nameHi: "उत्सर्जी पदार्थ एवं उनका निष्कासन" },
                { id: "bio11-20", name: "Locomotion and Movement", nameHi: "गति एवं संचलन" },
                { id: "bio11-21", name: "Neural Control and Coordination", nameHi: "तंत्रिका नियंत्रण एवं समन्वय" },
                { id: "bio11-22", name: "Chemical Coordination and Integration", nameHi: "रासायनिक समन्वय एवं एकीकरण" }
              ]
            }
          ]
        },

        // ================= MATHEMATICS =================
        {
          id: "math-11",
          name: "Mathematics",
          nameHi: "गणित",
          icon: "calculator",
          books: [
            {
              id: "math-11",
              name: "Mathematics",
              nameHi: "गणित",
              chapters: [
                { id: "math11-1", name: "Sets", nameHi: "समुच्चय" },
                { id: "math11-2", name: "Relations and Functions", nameHi: "संबंध एवं फलन" },
                { id: "math11-3", name: "Trigonometric Functions", nameHi: "त्रिकोणमितीय फलन" },
                { id: "math11-4", name: "Complex Numbers and Quadratic Equations", nameHi: "समिश्र संख्याएँ एवं द्विघात समीकरण" },
                { id: "math11-5", name: "Linear Inequalities", nameHi: "रेखीय असमिकाएँ" },
                { id: "math11-6", name: "Permutations and Combinations", nameHi: "क्रमचय एवं संचय" },
                { id: "math11-7", name: "Binomial Theorem", nameHi: "द्विपद प्रमेय" },
                { id: "math11-8", name: "Sequences and Series", nameHi: "अनुक्रम एवं श्रेणियाँ" },
                { id: "math11-9", name: "Straight Lines", nameHi: "सरल रेखाएँ" },
                { id: "math11-10", name: "Conic Sections", nameHi: "शंकु परिच्छेद" },
                { id: "math11-11", name: "Introduction to 3D Geometry", nameHi: "त्रिविमीय ज्यामिति का परिचय" },
                { id: "math11-12", name: "Limits and Derivatives", nameHi: "सीमाएँ एवं अवकलज" },
                { id: "math11-13", name: "Statistics", nameHi: "सांख्यिकी" },
                { id: "math11-14", name: "Probability", nameHi: "प्रायिकता" }
              ]
            }
          ]
        },

        // ================= COMPUTER SCIENCE =================
        {
          id: "cs-11",
          name: "Computer Science",
          nameHi: "कंप्यूटर विज्ञान",
          icon: "cpu",
          books: [
            {
              id: "cs-11",
              name: "Computer Science",
              nameHi: "कंप्यूटर विज्ञान",
              chapters: [
                { id: "cs11-1", name: "Computer System Overview", nameHi: "कंप्यूटर प्रणाली का परिचय" },
                { id: "cs11-2", name: "Data Representation", nameHi: "डेटा निरूपण" },
                { id: "cs11-3", name: "Boolean Logic", nameHi: "बूलियन लॉजिक" },
                { id: "cs11-4", name: "Introduction to Python", nameHi: "पायथन का परिचय" },
                { id: "cs11-5", name: "Control Statements", nameHi: "नियंत्रण कथन" },
                { id: "cs11-6", name: "Functions", nameHi: "फंक्शन" },
                { id: "cs11-7", name: "Lists", nameHi: "सूचियाँ" }
              ]
            }
          ]
        },

        // ================= PHYSICAL EDUCATION =================
        {
          id: "pe-11",
          name: "Physical Education",
          nameHi: "शारीरिक शिक्षा",
          icon: "dumbbell",
          books: [
            {
              id: "pe-11",
              name: "Physical Education",
              nameHi: "शारीरिक शिक्षा",
              chapters: [
                { id: "pe11-1", name: "Changing Trends & Career", nameHi: "परिवर्तनशील प्रवृत्तियाँ एवं करियर" },
                { id: "pe11-2", name: "Olympism", nameHi: "ओलंपिज़्म" },
                { id: "pe11-3", name: "Yoga", nameHi: "योग" },
                { id: "pe11-4", name: "Physical Education & Sports for CWSN", nameHi: "विशेष आवश्यकता वाले बच्चों के लिए खेल" },
                { id: "pe11-5", name: "Physical Fitness", nameHi: "शारीरिक फिटनेस" }
              ]
            }
          ]
        },

        // ================= STATISTICS =================
        {
          id: "statistics-11",
          name: "Statistics",
          nameHi: "सांख्यिकी",
          icon: "bar-chart",
          books: [
            {
              id: "statistics-11",
              name: "Statistics",
              nameHi: "सांख्यिकी",
              chapters: [
                { id: "stat11-1", name: "Collection of Data", nameHi: "आँकड़ों का संग्रह" },
                { id: "stat11-2", name: "Organisation of Data", nameHi: "आँकड़ों का संगठन" },
                { id: "stat11-3", name: "Presentation of Data", nameHi: "आँकड़ों का प्रस्तुतीकरण" },
                { id: "stat11-4", name: "Measures of Central Tendency", nameHi: "केंद्रीय प्रवृत्ति के माप" },
                { id: "stat11-5", name: "Correlation", nameHi: "सहसंबंध" },
                { id: "stat11-6", name: "Index Numbers", nameHi: "सूचकांक" }
              ]
            }
          ]
            },
{
      id: "commerce",
      name: "Commerce",
      nameHi: "वाणिज्य",
      subjects: [

        // ================= ACCOUNTANCY =================
        {
          id: "accountancy-11",
          name: "Accountancy",
          nameHi: "लेखाशास्त्र",
          icon: "book",
          books: [
            {
              id: "accounts-11-part-1",
              name: "Financial Accounting Part I",
              nameHi: "वित्तीय लेखांकन भाग 1",
              chapters: [
                { id: "acc11-1", name: "Introduction to Accounting", nameHi: "लेखांकन का परिचय" },
                { id: "acc11-2", name: "Theory Base of Accounting", nameHi: "लेखांकन का सैद्धांतिक आधार" },
                { id: "acc11-3", name: "Recording of Transactions – I", nameHi: "लेन-देन का लेखा – I" },
                { id: "acc11-4", name: "Recording of Transactions – II", nameHi: "लेन-देन का लेखा – II" },
                { id: "acc11-5", name: "Bank Reconciliation Statement", nameHi: "बैंक मिलान विवरण" }
              ]
            },
            {
              id: "accounts-11-part-2",
              name: "Financial Accounting Part II",
              nameHi: "वित्तीय लेखांकन भाग 2",
              chapters: [
                { id: "acc11-6", name: "Trial Balance and Rectification", nameHi: "परीक्षण संतुलन एवं त्रुटि सुधार" },
                { id: "acc11-7", name: "Depreciation", nameHi: "मूल्यह्रास" },
                { id: "acc11-8", name: "Bills of Exchange", nameHi: "विनिमय पत्र" },
                { id: "acc11-9", name: "Financial Statements – I", nameHi: "वित्तीय विवरण – I" },
                { id: "acc11-10", name: "Financial Statements – II", nameHi: "वित्तीय विवरण – II" }
              ]
            }
          ]
        },

        // ================= BUSINESS STUDIES =================
        {
          id: "business-11",
          name: "Business Studies",
          nameHi: "व्यवसाय अध्ययन",
          icon: "briefcase",
          books: [
            {
              id: "business-11",
              name: "Business Studies",
              nameHi: "व्यवसाय अध्ययन",
              chapters: [
                { id: "bst11-1", name: "Business, Trade and Commerce", nameHi: "व्यवसाय, व्यापार एवं वाणिज्य" },
                { id: "bst11-2", name: "Forms of Business Organisation", nameHi: "व्यवसाय संगठन के स्वरूप" },
                { id: "bst11-3", name: "Private, Public and Global Enterprises", nameHi: "निजी, सार्वजनिक एवं वैश्विक उद्यम" },
                { id: "bst11-4", name: "Business Services", nameHi: "व्यवसाय सेवाएँ" },
                { id: "bst11-5", name: "Emerging Modes of Business", nameHi: "उभरते व्यवसाय स्वरूप" },
                { id: "bst11-6", name: "Social Responsibilities of Business", nameHi: "व्यवसाय की सामाजिक जिम्मेदारियाँ" },
                { id: "bst11-7", name: "Sources of Business Finance", nameHi: "व्यवसाय वित्त के स्रोत" },
                { id: "bst11-8", name: "Small Business", nameHi: "लघु व्यवसाय" },
                { id: "bst11-9", name: "Internal Trade", nameHi: "आंतरिक व्यापार" },
                { id: "bst11-10", name: "International Business", nameHi: "अंतरराष्ट्रीय व्यापार" }
              ]
            }
          ]
        },

        // ================= ECONOMICS =================
        {
          id: "economics-11",
          name: "Economics",
          nameHi: "अर्थशास्त्र",
          icon: "bar-chart",
          books: [
            {
              id: "eco-11-statistics",
              name: "Statistics for Economics",
              nameHi: "अर्थशास्त्र के लिए सांख्यिकी",
              chapters: [
                { id: "eco11-1", name: "Introduction", nameHi: "परिचय" },
                { id: "eco11-2", name: "Collection of Data", nameHi: "आँकड़ों का संग्रह" },
                { id: "eco11-3", name: "Organisation of Data", nameHi: "आँकड़ों का संगठन" },
                { id: "eco11-4", name: "Presentation of Data", nameHi: "आँकड़ों का प्रस्तुतीकरण" },
                { id: "eco11-5", name: "Measures of Central Tendency", nameHi: "केंद्रीय प्रवृत्ति के माप" },
                { id: "eco11-6", name: "Correlation", nameHi: "सहसंबंध" }
              ]
            },
            {
              id: "eco-11-indian-dev",
              name: "Indian Economic Development",
              nameHi: "भारतीय आर्थिक विकास",
              chapters: [
                { id: "eco11-7", name: "Indian Economy on the Eve of Independence", nameHi: "स्वतंत्रता पूर्व भारतीय अर्थव्यवस्था" },
                { id: "eco11-8", name: "Indian Economy (1950–1990)", nameHi: "भारतीय अर्थव्यवस्था (1950–1990)" },
                { id: "eco11-9", name: "Liberalisation, Privatisation and Globalisation", nameHi: "उदारीकरण, निजीकरण एवं वैश्वीकरण" },
                { id: "eco11-10", name: "Human Capital Formation", nameHi: "मानव पूँजी निर्माण" },
                { id: "eco11-11", name: "Rural Development", nameHi: "ग्रामीण विकास" },
                { id: "eco11-12", name: "Employment", nameHi: "रोजगार" },
                { id: "eco11-13", name: "Environment and Sustainable Development", nameHi: "पर्यावरण एवं सतत विकास" }
              ]
            }
          ]
        }

      ]
                  }
,

        // ================= MATHEMATICS (COMMERCE) =================
        {
          id: "math-11-commerce",
          name: "Mathematics",
          nameHi: "गणित",
          icon: "calculator",
          books: [
            {
              id: "math-11-commerce-book",
              name: "Mathematics",
              nameHi: "गणित",
              chapters: [
                { id: "m11c-1", name: "Sets", nameHi: "समुच्चय" },
                { id: "m11c-2", name: "Relations and Functions", nameHi: "संबंध एवं फलन" },
                { id: "m11c-3", name: "Trigonometric Functions", nameHi: "त्रिकोणमितीय फलन" },
                { id: "m11c-4", name: "Complex Numbers and Quadratic Equations", nameHi: "समिश्र संख्याएँ एवं द्विघात समीकरण" },
                { id: "m11c-5", name: "Linear Inequalities", nameHi: "रेखीय असमिकाएँ" },
                { id: "m11c-6", name: "Permutations and Combinations", nameHi: "क्रमचय एवं संचय" },
                { id: "m11c-7", name: "Binomial Theorem", nameHi: "द्विपद प्रमेय" },
                { id: "m11c-8", name: "Sequences and Series", nameHi: "अनुक्रम एवं श्रेणियाँ" },
                { id: "m11c-9", name: "Straight Lines", nameHi: "सरल रेखाएँ" },
                { id: "m11c-10", name: "Conic Sections", nameHi: "शंकु परिच्छेद" },
                { id: "m11c-11", name: "Limits and Derivatives", nameHi: "सीमाएँ एवं अवकलज" },
                { id: "m11c-12", name: "Statistics", nameHi: "सांख्यिकी" },
                { id: "m11c-13", name: "Probability", nameHi: "प्रायिकता" }
              ]
            }
          ]
        },

        // ================= ENTREPRENEURSHIP =================
        {
          id: "entrepreneurship-11",
          name: "Entrepreneurship",
          nameHi: "उद्यमिता",
          icon: "lightbulb",
          books: [
            {
              id: "entrepreneurship-11-book",
              name: "Entrepreneurship",
              nameHi: "उद्यमिता",
              chapters: [
                { id: "ent11-1", name: "Entrepreneurship Concept and Functions", nameHi: "उद्यमिता की अवधारणा एवं कार्य" },
                { id: "ent11-2", name: "Entrepreneurial Journey", nameHi: "उद्यमी यात्रा" },
                { id: "ent11-3", name: "Entrepreneurial Competencies", nameHi: "उद्यमी दक्षताएँ" },
                { id: "ent11-4", name: "Business Plan", nameHi: "व्यवसाय योजना" },
                { id: "ent11-5", name: "Entrepreneurship as Innovation", nameHi: "नवाचार के रूप में उद्यमिता" }
              ]
            }
          ]
        },

        // ================= INFORMATICS PRACTICES =================
        {
          id: "ip-11",
          name: "Informatics Practices",
          nameHi: "सूचना विज्ञान व्यवहार",
          icon: "cpu",
          books: [
            {
              id: "ip-11-book",
              name: "Informatics Practices",
              nameHi: "सूचना विज्ञान व्यवहार",
              chapters: [
                { id: "ip11-1", name: "Introduction to Computer System", nameHi: "कंप्यूटर प्रणाली का परिचय" },
                { id: "ip11-2", name: "Introduction to Python", nameHi: "पायथन का परिचय" },
                { id: "ip11-3", name: "Data Handling using Python", nameHi: "पायथन द्वारा डेटा प्रबंधन" },
                { id: "ip11-4", name: "Society, Law and Ethics", nameHi: "समाज, विधि एवं नैतिकता" }
              ]
            }
          ]
        }
,
    {
      id: "arts",
      name: "Arts",
      nameHi: "कला",
      subjects: [

        // ================= HISTORY =================
        {
          id: "history-11",
          name: "History",
          nameHi: "इतिहास",
          icon: "book",
          books: [
            {
              id: "history-11-themes-1",
              name: "Themes in World History",
              nameHi: "विश्व इतिहास के कुछ विषय",
              chapters: [
                { id: "his11-1", name: "From the Beginning of Time", nameHi: "समय की शुरुआत से" },
                { id: "his11-2", name: "Writing and City Life", nameHi: "लेखन और शहरी जीवन" },
                { id: "his11-3", name: "An Empire Across Three Continents", nameHi: "तीन महाद्वीपों में फैला साम्राज्य" },
                { id: "his11-4", name: "The Central Islamic Lands", nameHi: "केंद्रीय इस्लामी भूभाग" },
                { id: "his11-5", name: "Nomadic Empires", nameHi: "खानाबदोश साम्राज्य" },
                { id: "his11-6", name: "The Three Orders", nameHi: "तीन वर्ग" },
                { id: "his11-7", name: "Changing Cultural Traditions", nameHi: "सांस्कृतिक परंपराओं में परिवर्तन" },
                { id: "his11-8", name: "Confrontation of Cultures", nameHi: "संस्कृतियों का टकराव" },
                { id: "his11-9", name: "The Industrial Revolution", nameHi: "औद्योगिक क्रांति" },
                { id: "his11-10", name: "Displacing Indigenous Peoples", nameHi: "मूल निवासियों का विस्थापन" },
                { id: "his11-11", name: "Paths to Modernisation", nameHi: "आधुनिकीकरण के मार्ग" }
              ]
            }
          ]
        },

        // ================= POLITICAL SCIENCE =================
        {
          id: "polity-11",
          name: "Political Science",
          nameHi: "राजनीति विज्ञान",
          icon: "globe",
          books: [
            {
              id: "polity-11-indian-constitution",
              name: "Indian Constitution at Work",
              nameHi: "भारतीय संविधान का कार्यान्वयन",
              chapters: [
                { id: "pol11-1", name: "Constitution: Why and How?", nameHi: "संविधान: क्यों और कैसे?" },
                { id: "pol11-2", name: "Rights in the Indian Constitution", nameHi: "भारतीय संविधान में अधिकार" },
                { id: "pol11-3", name: "Election and Representation", nameHi: "निर्वाचन और प्रतिनिधित्व" },
                { id: "pol11-4", name: "Executive", nameHi: "कार्यपालिका" },
                { id: "pol11-5", name: "Legislature", nameHi: "विधायिका" },
                { id: "pol11-6", name: "Judiciary", nameHi: "न्यायपालिका" },
                { id: "pol11-7", name: "Federalism", nameHi: "संघवाद" },
                { id: "pol11-8", name: "Local Governments", nameHi: "स्थानीय शासन" },
                { id: "pol11-9", name: "Constitution as a Living Document", nameHi: "संविधान एक जीवंत दस्तावेज" }
              ]
            },
            {
              id: "polity-11-political-theory",
              name: "Political Theory",
              nameHi: "राजनीतिक सिद्धांत",
              chapters: [
                { id: "pol11-10", name: "Political Theory: An Introduction", nameHi: "राजनीतिक सिद्धांत: एक परिचय" },
                { id: "pol11-11", name: "Freedom", nameHi: "स्वतंत्रता" },
                { id: "pol11-12", name: "Equality", nameHi: "समानता" },
                { id: "pol11-13", name: "Social Justice", nameHi: "सामाजिक न्याय" },
                { id: "pol11-14", name: "Rights", nameHi: "अधिकार" },
                { id: "pol11-15", name: "Citizenship", nameHi: "नागरिकता" },
                { id: "pol11-16", name: "Nationalism", nameHi: "राष्ट्रवाद" },
                { id: "pol11-17", name: "Secularism", nameHi: "धर्मनिरपेक्षता" }
              ]
            }
          ]
        }
      ]
        }
,

        // ================= GEOGRAPHY =================
        {
          id: "geography-11",
          name: "Geography",
          nameHi: "भूगोल",
          icon: "globe",
          books: [
            {
              id: "geo11-fundamentals",
              name: "Fundamentals of Physical Geography",
              nameHi: "भौतिक भूगोल के मूल सिद्धांत",
              chapters: [
                { id: "geo11-1", name: "Geography as a Discipline", nameHi: "विषय के रूप में भूगोल" },
                { id: "geo11-2", name: "The Origin and Evolution of the Earth", nameHi: "पृथ्वी की उत्पत्ति और विकास" },
                { id: "geo11-3", name: "Interior of the Earth", nameHi: "पृथ्वी का आंतरिक भाग" },
                { id: "geo11-4", name: "Distribution of Oceans and Continents", nameHi: "महासागरों और महाद्वीपों का वितरण" },
                { id: "geo11-5", name: "Minerals and Rocks", nameHi: "खनिज और चट्टानें" },
                { id: "geo11-6", name: "Geomorphic Processes", nameHi: "भू-आकृतिक प्रक्रियाएँ" },
                { id: "geo11-7", name: "Landforms and their Evolution", nameHi: "स्थलरूप और उनका विकास" },
                { id: "geo11-8", name: "Composition and Structure of Atmosphere", nameHi: "वायुमंडल की संरचना" },
                { id: "geo11-9", name: "Solar Radiation and Heat Budget", nameHi: "सौर विकिरण और ऊष्मा संतुलन" },
                { id: "geo11-10", name: "Atmospheric Circulation", nameHi: "वायुमंडलीय परिसंचरण" },
                { id: "geo11-11", name: "Water in the Atmosphere", nameHi: "वायुमंडल में जल" },
                { id: "geo11-12", name: "World Climate and Climate Change", nameHi: "विश्व जलवायु और जलवायु परिवर्तन" },
                { id: "geo11-13", name: "Water (Oceans)", nameHi: "महासागरीय जल" },
                { id: "geo11-14", name: "Movements of Ocean Water", nameHi: "महासागरीय जल की गतियाँ" },
                { id: "geo11-15", name: "Life on the Earth", nameHi: "पृथ्वी पर जीवन" }
              ]
            },
            {
              id: "geo11-india",
              name: "India Physical Environment",
              nameHi: "भारत का भौतिक पर्यावरण",
              chapters: [
                { id: "geo11-16", name: "India: Location", nameHi: "भारत: स्थिति" },
                { id: "geo11-17", name: "Structure and Physiography", nameHi: "संरचना एवं भू-आकृति" },
                { id: "geo11-18", name: "Drainage System", nameHi: "अपवाह तंत्र" },
                { id: "geo11-19", name: "Climate", nameHi: "जलवायु" },
                { id: "geo11-20", name: "Natural Vegetation", nameHi: "प्राकृतिक वनस्पति" },
                { id: "geo11-21", name: "Natural Hazards", nameHi: "प्राकृतिक आपदाएँ" }
              ]
            }
          ]
        },

        // ================= ECONOMICS (ARTS) =================
        {
          id: "economics-11-arts",
          name: "Economics",
          nameHi: "अर्थशास्त्र",
          icon: "bar-chart",
          books: [
            {
              id: "eco11-arts-stat",
              name: "Statistics for Economics",
              nameHi: "अर्थशास्त्र के लिए सांख्यिकी",
              chapters: [
                { id: "eco11a-1", name: "Introduction", nameHi: "परिचय" },
                { id: "eco11a-2", name: "Collection of Data", nameHi: "आँकड़ों का संग्रह" },
                { id: "eco11a-3", name: "Organisation of Data", nameHi: "आँकड़ों का संगठन" },
                { id: "eco11a-4", name: "Presentation of Data", nameHi: "आँकड़ों का प्रस्तुतीकरण" },
                { id: "eco11a-5", name: "Measures of Central Tendency", nameHi: "केंद्रीय प्रवृत्ति के माप" },
                { id: "eco11a-6", name: "Correlation", nameHi: "सहसंबंध" }
              ]
            }
          ]
        },

        // ================= SOCIOLOGY =================
        {
          id: "sociology-11",
          name: "Sociology",
          nameHi: "समाजशास्त्र",
          icon: "users",
          books: [
            {
              id: "soc11-1",
              name: "Introducing Sociology",
              nameHi: "समाजशास्त्र का परिचय",
              chapters: [
                { id: "soc11-1a", name: "Sociology and Society", nameHi: "समाजशास्त्र और समाज" },
                { id: "soc11-2a", name: "Terms, Concepts and their Use", nameHi: "शब्दावली एवं अवधारणाएँ" },
                { id: "soc11-3a", name: "Understanding Social Institutions", nameHi: "सामाजिक संस्थाओं को समझना" }
              ]
            },
            {
              id: "soc11-2",
              name: "Understanding Society",
              nameHi: "समाज को समझना",
              chapters: [
                { id: "soc11-4a", name: "Social Structure", nameHi: "सामाजिक संरचना" },
                { id: "soc11-5a", name: "Social Change", nameHi: "सामाजिक परिवर्तन" }
              ]
            }
          ]
        },

        // ================= PSYCHOLOGY =================
        {
          id: "psychology-11",
          name: "Psychology",
          nameHi: "मनोविज्ञान",
          icon: "brain",
          books: [
            {
              id: "psych11-book",
              name: "Psychology",
              nameHi: "मनोविज्ञान",
              chapters: [
                { id: "psy11-1", name: "What is Psychology?", nameHi: "मनोविज्ञान क्या है?" },
                { id: "psy11-2", name: "Methods of Enquiry", nameHi: "अनुसंधान की विधियाँ" },
                { id: "psy11-3", name: "Human Development", nameHi: "मानव विकास" },
                { id: "psy11-4", name: "Sensory, Attentional and Perceptual Processes", nameHi: "संवेदनात्मक प्रक्रियाएँ" },
                { id: "psy11-5", name: "Learning", nameHi: "अधिगम" },
                { id: "psy11-6", name: "Memory", nameHi: "स्मृति" },
                { id: "psy11-7", name: "Thinking", nameHi: "चिंतन" },
                { id: "psy11-8", name: "Motivation and Emotion", nameHi: "प्रेरणा एवं भाव" }
              ]
            }
          ]
}
,

        // ================= HINDI CORE =================
        {
          id: "hindi-core-11",
          name: "Hindi Core",
          nameHi: "हिंदी कोर",
          icon: "languages",
          books: [
            {
              id: "hindi-core-11-aaroh",
              name: "Aaroh – 1",
              nameHi: "आरोह – 1",
              chapters: [
                { id: "hin11-1", name: "Kabeer", nameHi: "कबीर" },
                { id: "hin11-2", name: "Meera", nameHi: "मीरा" },
                { id: "hin11-3", name: "Bharatendu Harishchandra", nameHi: "भारतेंदु हरिश्चंद्र" },
                { id: "hin11-4", name: "Suryakant Tripathi Nirala", nameHi: "सूर्यकांत त्रिपाठी निराला" },
                { id: "hin11-5", name: "Ramdhari Singh Dinkar", nameHi: "रामधारी सिंह दिनकर" }
              ]
            },
            {
              id: "hindi-core-11-vitaan",
              name: "Vitaan – 1",
              nameHi: "वितान – 1",
              chapters: [
                { id: "hin11-6", name: "Bharat Mata", nameHi: "भारत माता" },
                { id: "hin11-7", name: "Samvedana", nameHi: "संवेदना" },
                { id: "hin11-8", name: "Aatmkatha", nameHi: "आत्मकथा" }
              ]
            }
          ]
        },

        // ================= ENGLISH CORE =================
        {
          id: "english-core-11",
          name: "English Core",
          nameHi: "अंग्रेज़ी कोर",
          icon: "book-open",
          books: [
            {
              id: "eng11-hornbill",
              name: "Hornbill",
              nameHi: "हॉर्नबिल",
              chapters: [
                { id: "eng11-1", name: "The Portrait of a Lady", nameHi: "द पोर्ट्रेट ऑफ ए लेडी" },
                { id: "eng11-2", name: "We're Not Afraid to Die", nameHi: "वी आर नॉट अफ्रेड टू डाई" },
                { id: "eng11-3", name: "Discovering Tut", nameHi: "डिस्कवरिंग टट" },
                { id: "eng11-4", name: "Landscape of the Soul", nameHi: "लैंडस्केप ऑफ द सोल" },
                { id: "eng11-5", name: "The Ailing Planet", nameHi: "द एलिंग प्लेनेट" },
                { id: "eng11-6", name: "The Browning Version", nameHi: "द ब्राउनिंग वर्जन" },
                { id: "eng11-7", name: "The Adventure", nameHi: "द एडवेंचर" }
              ]
            },
            {
              id: "eng11-snapshot",
              name: "Snapshots",
              nameHi: "स्नैपशॉट्स",
              chapters: [
                { id: "eng11-8", name: "The Summer of the Beautiful White Horse", nameHi: "द समर ऑफ द ब्यूटीफुल व्हाइट हॉर्स" },
                { id: "eng11-9", name: "The Address", nameHi: "द एड्रेस" },
                { id: "eng11-10", name: "Mother's Day", nameHi: "मदर्स डे" },
                { id: "eng11-11", name: "Birth", nameHi: "बर्थ" },
                { id: "eng11-12", name: "The Tale of Melon City", nameHi: "द टेल ऑफ मेलन सिटी" }
              ]
            }
          ]
        },

        // ================= SANSKRIT =================
        {
          id: "sanskrit-11",
          name: "Sanskrit",
          nameHi: "संस्कृत",
          icon: "book",
          books: [
            {
              id: "sanskrit-11-book",
              name: "Bhaswati",
              nameHi: "भास्वती",
              chapters: [
                { id: "san11-1", name: "Subhashitani", nameHi: "सुभाषितानि" },
                { id: "san11-2", name: "Ramayan Kathasaar", nameHi: "रामायण कथासार" },
                { id: "san11-3", name: "Mahabharat Kathasaar", nameHi: "महाभारत कथासार" },
                { id: "san11-4", name: "Naitik Kathayen", nameHi: "नैतिक कथाएँ" }
              ]
            }
          ],
12: [
    {
      id: "science-12",
      name: "Science",
      nameHi: "विज्ञान",
      subjects: [

        // ================= PHYSICS =================
        {
          id: "physics-12",
          name: "Physics",
          nameHi: "भौतिकी",
          icon: "atom",
          books: [
            {
              id: "physics-12-part-1",
              name: "Physics Part I",
              nameHi: "भौतिकी भाग 1",
              chapters: [
                { id: "phy12-1", name: "Electric Charges and Fields", nameHi: "वैद्युत आवेश एवं क्षेत्र" },
                { id: "phy12-2", name: "Electrostatic Potential and Capacitance", nameHi: "स्थिरवैद्युत विभव एवं धारिता" },
                { id: "phy12-3", name: "Current Electricity", nameHi: "धारा विद्युत" },
                { id: "phy12-4", name: "Moving Charges and Magnetism", nameHi: "गतिमान आवेश एवं चुम्बकत्व" },
                { id: "phy12-5", name: "Magnetism and Matter", nameHi: "चुम्बकत्व एवं पदार्थ" },
                { id: "phy12-6", name: "Electromagnetic Induction", nameHi: "विद्युतचुम्बकीय प्रेरण" },
                { id: "phy12-7", name: "Alternating Current", nameHi: "प्रत्यावर्ती धारा" }
              ]
            },
            {
              id: "physics-12-part-2",
              name: "Physics Part II",
              nameHi: "भौतिकी भाग 2",
              chapters: [
                { id: "phy12-8", name: "Electromagnetic Waves", nameHi: "विद्युतचुम्बकीय तरंगें" },
                { id: "phy12-9", name: "Ray Optics and Optical Instruments", nameHi: "किरण प्रकाशिकी" },
                { id: "phy12-10", name: "Wave Optics", nameHi: "तरंग प्रकाशिकी" },
                { id: "phy12-11", name: "Dual Nature of Radiation and Matter", nameHi: "विकिरण एवं पदार्थ की द्वैत प्रकृति" },
                { id: "phy12-12", name: "Atoms", nameHi: "परमाणु" },
                { id: "phy12-13", name: "Nuclei", nameHi: "नाभिक" },
                { id: "phy12-14", name: "Semiconductor Electronics", nameHi: "अर्धचालक इलेक्ट्रॉनिकी" }
              ]
            }
          ]
        },

        // ================= CHEMISTRY =================
        {
          id: "chemistry-12",
          name: "Chemistry",
          nameHi: "रसायन विज्ञान",
          icon: "flask",
          books: [
            {
              id: "chem-12-part-1",
              name: "Chemistry Part I",
              nameHi: "रसायन विज्ञान भाग 1",
              chapters: [
                { id: "chem12-1", name: "Solutions", nameHi: "विलयन" },
                { id: "chem12-2", name: "Electrochemistry", nameHi: "विद्युत रसायन" },
                { id: "chem12-3", name: "Chemical Kinetics", nameHi: "रासायनिक गतिकी" },
                { id: "chem12-4", name: "d and f Block Elements", nameHi: "d एवं f ब्लॉक तत्व" },
                { id: "chem12-5", name: "Coordination Compounds", nameHi: "समन्वय यौगिक" }
              ]
            },
            {
              id: "chem-12-part-2",
              name: "Chemistry Part II",
              nameHi: "रसायन विज्ञान भाग 2",
              chapters: [
                { id: "chem12-6", name: "Haloalkanes and Haloarenes", nameHi: "हैलोऐल्केन एवं हैलोएरीन" },
                { id: "chem12-7", name: "Alcohols, Phenols and Ethers", nameHi: "एल्कोहल, फिनॉल एवं ईथर" },
                { id: "chem12-8", name: "Aldehydes, Ketones and Carboxylic Acids", nameHi: "एल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल" },
                { id: "chem12-9", name: "Amines", nameHi: "एमाइन" },
                { id: "chem12-10", name: "Biomolecules", nameHi: "जैव अणु" },
                { id: "chem12-11", name: "Polymers", nameHi: "बहुलक" },
                { id: "chem12-12", name: "Chemistry in Everyday Life", nameHi: "दैनिक जीवन में रसायन" }
              ]
            },
        // ================= BIOLOGY =================
        {
          id: "biology-12",
          name: "Biology",
          nameHi: "जीव विज्ञान",
          icon: "dna",
          books: [
            {
              id: "biology-12-book",
              name: "Biology",
              nameHi: "जीव विज्ञान",
              chapters: [
                { id: "bio12-1", name: "Reproduction in Organisms", nameHi: "जीवों में प्रजनन" },
                { id: "bio12-2", name: "Sexual Reproduction in Flowering Plants", nameHi: "आवृतबीजी पौधों में लैंगिक प्रजनन" },
                { id: "bio12-3", name: "Human Reproduction", nameHi: "मानव प्रजनन" },
                { id: "bio12-4", name: "Reproductive Health", nameHi: "प्रजनन स्वास्थ्य" },
                { id: "bio12-5", name: "Principles of Inheritance and Variation", nameHi: "वंशागति एवं विविधता के सिद्धांत" },
                { id: "bio12-6", name: "Molecular Basis of Inheritance", nameHi: "वंशागति का आणविक आधार" },
                { id: "bio12-7", name: "Evolution", nameHi: "विकासवाद" },
                { id: "bio12-8", name: "Human Health and Disease", nameHi: "मानव स्वास्थ्य एवं रोग" },
                { id: "bio12-9", name: "Strategies for Enhancement in Food Production", nameHi: "खाद्य उत्पादन में वृद्धि की रणनीतियाँ" },
                { id: "bio12-10", name: "Microbes in Human Welfare", nameHi: "मानव कल्याण में सूक्ष्मजीव" },
                { id: "bio12-11", name: "Biotechnology: Principles and Processes", nameHi: "जैव प्रौद्योगिकी: सिद्धांत एवं प्रक्रियाएँ" },
                { id: "bio12-12", name: "Biotechnology and its Applications", nameHi: "जैव प्रौद्योगिकी एवं उसके अनुप्रयोग" },
                { id: "bio12-13", name: "Organisms and Populations", nameHi: "जीव एवं जनसंख्या" },
                { id: "bio12-14", name: "Ecosystem", nameHi: "पारिस्थितिकी तंत्र" },
                { id: "bio12-15", name: "Biodiversity and Conservation", nameHi: "जैव विविधता एवं संरक्षण" },
                { id: "bio12-16", name: "Environmental Issues", nameHi: "पर्यावरणीय मुद्दे" }
              ]
            }
          ]
        },

        // ================= MATHEMATICS =================
        {
          id: "math-12",
          name: "Mathematics",
          nameHi: "गणित",
          icon: "calculator",
          books: [
            {
              id: "math-12-book",
              name: "Mathematics",
              nameHi: "गणित",
              chapters: [
                { id: "math12-1", name: "Relations and Functions", nameHi: "संबंध एवं फलन" },
                { id: "math12-2", name: "Inverse Trigonometric Functions", nameHi: "व्युत्क्रम त्रिकोणमितीय फलन" },
                { id: "math12-3", name: "Matrices", nameHi: "आव्यूह" },
                { id: "math12-4", name: "Determinants", nameHi: "सारण्यक" },
                { id: "math12-5", name: "Continuity and Differentiability", nameHi: "सातत्य एवं अवकलनीयता" },
                { id: "math12-6", name: "Applications of Derivatives", nameHi: "अवकलज के अनुप्रयोग" },
                { id: "math12-7", name: "Integrals", nameHi: "समाकलन" },
                { id: "math12-8", name: "Applications of Integrals", nameHi: "समाकलनों के अनुप्रयोग" },
                { id: "math12-9", name: "Differential Equations", nameHi: "अवकल समीकरण" },
                { id: "math12-10", name: "Vector Algebra", nameHi: "सदिश बीजगणित" },
                { id: "math12-11", name: "Three Dimensional Geometry", nameHi: "त्रिविमीय ज्यामिति" },
                { id: "math12-12", name: "Linear Programming", nameHi: "रेखीय प्रोग्रामन" },
                { id: "math12-13", name: "Probability", nameHi: "प्रायिकता" }
              ]
            }
          ]
        },

        // ================= COMPUTER SCIENCE =================
        {
          id: "cs-12",
          name: "Computer Science",
          nameHi: "कंप्यूटर विज्ञान",
          icon: "cpu",
          books: [
            {
              id: "cs-12-book",
              name: "Computer Science",
              nameHi: "कंप्यूटर विज्ञान",
              chapters: [
                { id: "cs12-1", name: "Python Revision Tour", nameHi: "पायथन पुनरावलोकन" },
                { id: "cs12-2", name: "Functions", nameHi: "फंक्शन" },
                { id: "cs12-3", name: "File Handling", nameHi: "फ़ाइल प्रबंधन" },
                { id: "cs12-4", name: "Data Structures", nameHi: "डेटा संरचनाएँ" },
                { id: "cs12-5", name: "Database Concepts", nameHi: "डेटाबेस अवधारणाएँ" },
                { id: "cs12-6", name: "SQL", nameHi: "एसक्यूएल" },
                { id: "cs12-7", name: "Computer Networks", nameHi: "कंप्यूटर नेटवर्क" }
              ]
            }
          ]
        },

        // ================= PHYSICAL EDUCATION =================
        {
          id: "pe-12",
          name: "Physical Education",
          nameHi: "शारीरिक शिक्षा",
          icon: "dumbbell",
          books: [
            {
              id: "pe-12-book",
              name: "Physical Education",
              nameHi: "शारीरिक शिक्षा",
              chapters: [
                { id: "pe12-1", name: "Planning in Sports", nameHi: "खेलों में योजना" },
                { id: "pe12-2", name: "Sports and Nutrition", nameHi: "खेल एवं पोषण" },
                { id: "pe12-3", name: "Yoga and Lifestyle", nameHi: "योग एवं जीवनशैली" },
                { id: "pe12-4", name: "Physical Education & Sports for CWSN", nameHi: "विशेष आवश्यकता वाले बच्चों के लिए खेल" },
                { id: "pe12-5", name: "Children and Women in Sports", nameHi: "खेलों में बच्चे एवं महिलाएँ" },
                { id: "pe12-6", name: "Test and Measurement in Sports", nameHi: "खेलों में परीक्षण एवं मापन" },
                { id: "pe12-7", name: "Physiology and Injuries in Sports", nameHi: "खेलों में शरीर क्रिया विज्ञान एवं चोटें" },
                { id: "pe12-8", name: "Biomechanics and Sports", nameHi: "जैव-यांत्रिकी एवं खेल" }
              ]
            }
          ]
                }
,
    {
      id: "commerce-12",
      name: "Commerce",
      nameHi: "वाणिज्य",
      subjects: [

        // ================= ACCOUNTANCY =================
        {
          id: "accountancy-12",
          name: "Accountancy",
          nameHi: "लेखाशास्त्र",
          icon: "calculator",
          books: [
            {
              id: "acc-12-part-1",
              name: "Accountancy Part I",
              nameHi: "लेखाशास्त्र भाग 1",
              chapters: [
                { id: "acc12-1", name: "Accounting for Partnership Firms – Fundamentals", nameHi: "साझेदारी फर्म का लेखांकन – मूल सिद्धांत" },
                { id: "acc12-2", name: "Goodwill", nameHi: "गुडविल" },
                { id: "acc12-3", name: "Change in Profit Sharing Ratio", nameHi: "लाभांश अनुपात में परिवर्तन" },
                { id: "acc12-4", name: "Admission of a Partner", nameHi: "नए साझेदार का प्रवेश" },
                { id: "acc12-5", name: "Retirement and Death of a Partner", nameHi: "साझेदार की सेवानिवृत्ति एवं मृत्यु" },
                { id: "acc12-6", name: "Dissolution of Partnership Firm", nameHi: "साझेदारी फर्म का विघटन" }
              ]
            },
            {
              id: "acc-12-part-2",
              name: "Accountancy Part II",
              nameHi: "लेखाशास्त्र भाग 2",
              chapters: [
                { id: "acc12-7", name: "Accounting for Share Capital", nameHi: "अंश पूंजी का लेखांकन" },
                { id: "acc12-8", name: "Issue and Redemption of Debentures", nameHi: "ऋणपत्रों का निर्गम एवं विमोचन" },
                { id: "acc12-9", name: "Financial Statements of a Company", nameHi: "कंपनी के वित्तीय विवरण" },
                { id: "acc12-10", name: "Financial Statement Analysis", nameHi: "वित्तीय विवरणों का विश्लेषण" },
                { id: "acc12-11", name: "Cash Flow Statement", nameHi: "नकदी प्रवाह विवरण" }
              ]
            }
          ]
        },

        // ================= BUSINESS STUDIES =================
        {
          id: "bst-12",
          name: "Business Studies",
          nameHi: "व्यवसाय अध्ययन",
          icon: "briefcase",
          books: [
            {
              id: "bst-12-book",
              name: "Business Studies",
              nameHi: "व्यवसाय अध्ययन",
              chapters: [
                { id: "bst12-1", name: "Nature and Significance of Management", nameHi: "प्रबंधन का स्वरूप एवं महत्व" },
                { id: "bst12-2", name: "Principles of Management", nameHi: "प्रबंधन के सिद्धांत" },
                { id: "bst12-3", name: "Business Environment", nameHi: "व्यावसायिक वातावरण" },
                { id: "bst12-4", name: "Planning", nameHi: "नियोजन" },
                { id: "bst12-5", name: "Organising", nameHi: "संगठन" },
                { id: "bst12-6", name: "Staffing", nameHi: "कर्मचारी व्यवस्था" },
                { id: "bst12-7", name: "Directing", nameHi: "निर्देशन" },
                { id: "bst12-8", name: "Controlling", nameHi: "नियंत्रण" },
                { id: "bst12-9", name: "Financial Management", nameHi: "वित्तीय प्रबंधन" },
                { id: "bst12-10", name: "Financial Markets", nameHi: "वित्तीय बाजार" },
                { id: "bst12-11", name: "Marketing Management", nameHi: "विपणन प्रबंधन" },
                { id: "bst12-12", name: "Consumer Protection", nameHi: "उपभोक्ता संरक्षण" }
              ]
            }
          ]
        },

        // ================= ECONOMICS =================
        {
          id: "economics-12",
          name: "Economics",
          nameHi: "अर्थशास्त्र",
          icon: "trending-up",
          books: [
            {
              id: "eco-12-macro",
              name: "Macroeconomics",
              nameHi: "समष्टि अर्थशास्त्र",
              chapters: [
                { id: "eco12-1", name: "National Income", nameHi: "राष्ट्रीय आय" },
                { id: "eco12-2", name: "Money and Banking", nameHi: "मुद्रा एवं बैंकिंग" },
                { id: "eco12-3", name: "Income Determination", nameHi: "आय निर्धारण" },
                { id: "eco12-4", name: "Government Budget", nameHi: "सरकारी बजट" },
                { id: "eco12-5", name: "Balance of Payments", nameHi: "भुगतान संतुलन" }
              ]
            },
            {
              id: "eco-12-indian",
              name: "Indian Economic Development",
              nameHi: "भारतीय आर्थिक विकास",
              chapters: [
                { id: "eco12-6", name: "Development Experience of India", nameHi: "भारत का विकास अनुभव" },
                { id: "eco12-7", name: "Liberalisation and Globalisation", nameHi: "उदारीकरण एवं वैश्वीकरण" },
                { id: "eco12-8", name: "Rural Development", nameHi: "ग्रामीण विकास" },
                { id: "eco12-9", name: "Human Capital Formation", nameHi: "मानव पूंजी निर्माण" },
                { id: "eco12-10", name: "Employment", nameHi: "रोज़गार" },
                { id: "eco12-11", name: "Infrastructure", nameHi: "आधारभूत संरचना" },
                { id: "eco12-12", name: "Environment and Sustainable Development", nameHi: "पर्यावरण एवं सतत विकास" }
              ]
            }
          ]
        },

        // ================= MATHEMATICS =================
        {
          id: "maths-12-commerce",
          name: "Mathematics",
          nameHi: "गणित",
          icon: "calculator",
          books: [
            {
              id: "maths-12-book",
              name: "Mathematics",
              nameHi: "गणित",
              chapters: [
                { id: "mcom12-1", name: "Relations and Functions", nameHi: "संबंध एवं फलन" },
                { id: "mcom12-2", name: "Matrices", nameHi: "आव्यूह" },
                { id: "mcom12-3", name: "Determinants", nameHi: "सारण्यक" },
                { id: "mcom12-4", name: "Linear Programming", nameHi: "रेखीय प्रोग्रामन" },
                { id: "mcom12-5", name: "Probability", nameHi: "प्रायिकता" }
              ]
            }
          ]
        }

      ]
          }
,
    {
      id: "arts-12",
      name: "Arts",
      nameHi: "कला",
      subjects: [

        // ================= HISTORY =================
        {
          id: "history-12",
          name: "History",
          nameHi: "इतिहास",
          icon: "book",
          books: [
            {
              id: "history-12-book",
              name: "Themes in Indian History",
              nameHi: "भारतीय इतिहास के कुछ विषय",
              chapters: [
                { id: "his12-1", name: "Bricks, Beads and Bones", nameHi: "ईंटें, मनके और अस्थियाँ" },
                { id: "his12-2", name: "Kings, Farmers and Towns", nameHi: "राजा, किसान और नगर" },
                { id: "his12-3", name: "Kinship, Caste and Class", nameHi: "वंश, जाति और वर्ग" },
                { id: "his12-4", name: "Thinkers, Beliefs and Buildings", nameHi: "विचारक, विश्वास और इमारतें" },
                { id: "his12-5", name: "Through the Eyes of Travellers", nameHi: "यात्रियों की नजर से" },
                { id: "his12-6", name: "Bhakti-Sufi Traditions", nameHi: "भक्ति-सूफी परंपराएँ" },
                { id: "his12-7", name: "An Imperial Capital: Vijayanagara", nameHi: "विजयनगर: एक शाही राजधानी" },
                { id: "his12-8", name: "Peasants, Zamindars and the State", nameHi: "किसान, जमींदार और राज्य" },
                { id: "his12-9", name: "Colonialism and the Countryside", nameHi: "औपनिवेशिक काल और देहात" },
                { id: "his12-10", name: "Rebels and the Raj", nameHi: "विद्रोही और राज" },
                { id: "his12-11", name: "Mahatma Gandhi and the Nationalist Movement", nameHi: "महात्मा गांधी और राष्ट्रीय आंदोलन" },
                { id: "his12-12", name: "Framing the Constitution", nameHi: "संविधान निर्माण" }
              ]
            }
          ]
        },

        // ================= POLITICAL SCIENCE =================
        {
          id: "polity-12",
          name: "Political Science",
          nameHi: "राजनीति विज्ञान",
          icon: "globe",
          books: [
            {
              id: "polity-12-contemporary",
              name: "Contemporary World Politics",
              nameHi: "समकालीन विश्व राजनीति",
              chapters: [
                { id: "pol12-1", name: "The End of Bipolarity", nameHi: "द्विध्रुवीयता का अंत" },
                { id: "pol12-2", name: "Contemporary Centres of Power", nameHi: "समकालीन शक्ति केंद्र" },
                { id: "pol12-3", name: "Contemporary South Asia", nameHi: "समकालीन दक्षिण एशिया" },
                { id: "pol12-4", name: "International Organizations", nameHi: "अंतर्राष्ट्रीय संगठन" },
                { id: "pol12-5", name: "Security in the Contemporary World", nameHi: "समकालीन विश्व में सुरक्षा" },
                { id: "pol12-6", name: "Environment and Natural Resources", nameHi: "पर्यावरण और प्राकृतिक संसाधन" },
                { id: "pol12-7", name: "Globalisation", nameHi: "वैश्वीकरण" }
              ]
            },
            {
              id: "polity-12-politics-india",
              name: "Politics in India Since Independence",
              nameHi: "स्वतंत्रता के बाद भारत की राजनीति",
              chapters: [
                { id: "pol12-8", name: "Challenges of Nation Building", nameHi: "राष्ट्र निर्माण की चुनौतियाँ" },
                { id: "pol12-9", name: "Era of One Party Dominance", nameHi: "एकदलीय प्रभुत्व का युग" },
                { id: "pol12-10", name: "Politics of Planned Development", nameHi: "नियोजित विकास की राजनीति" },
                { id: "pol12-11", name: "India’s External Relations", nameHi: "भारत के बाहरी संबंध" },
                { id: "pol12-12", name: "Challenges to and Restoration of the Congress System", nameHi: "कांग्रेस प्रणाली की चुनौतियाँ और पुनर्स्थापन" },
                { id: "pol12-13", name: "The Crisis of Democratic Order", nameHi: "लोकतांत्रिक व्यवस्था का संकट" },
                { id: "pol12-14", name: "Rise of Popular Movements", nameHi: "लोक आंदोलनों का उदय" },
                { id: "pol12-15", name: "Recent Developments in Indian Politics", nameHi: "भारतीय राजनीति में हाल के विकास" }
              ]
            }
          ]
        },

        // ================= GEOGRAPHY =================
        {
          id: "geography-12",
          name: "Geography",
          nameHi: "भूगोल",
          icon: "map",
          books: [
            {
              id: "geo12-1",
              name: "Fundamentals of Human Geography",
              nameHi: "मानव भूगोल के मूल सिद्धांत",
              chapters: [
                { id: "geo12-1-1", name: "Human Geography", nameHi: "मानव भूगोल" },
                { id: "geo12-1-2", name: "World Population", nameHi: "विश्व जनसंख्या" },
                { id: "geo12-1-3", name: "Primary Activities", nameHi: "प्राथमिक क्रियाएँ" },
                { id: "geo12-1-4", name: "Secondary Activities", nameHi: "द्वितीयक क्रियाएँ" },
                { id: "geo12-1-5", name: "Tertiary and Quaternary Activities", nameHi: "तृतीयक एवं चतुर्थक क्रियाएँ" },
                { id: "geo12-1-6", name: "Transport and Communication", nameHi: "परिवहन और संचार" },
                { id: "geo12-1-7", name: "International Trade", nameHi: "अंतर्राष्ट्रीय व्यापार" }
              ]
            }
          ]
        },

        // ================= SOCIOLOGY =================
        {
          id: "sociology-12",
          name: "Sociology",
          nameHi: "समाजशास्त्र",
          icon: "users",
          books: [
            {
              id: "soc12-1",
              name: "Indian Society",
              nameHi: "भारतीय समाज",
              chapters: [
                { id: "soc12-1-1", name: "The Demographic Structure of Indian Society", nameHi: "भारतीय समाज की जनसंख्या संरचना" },
                { id: "soc12-1-2", name: "Social Institutions: Continuity and Change", nameHi: "सामाजिक संस्थाएँ: निरंतरता और परिवर्तन" },
                { id: "soc12-1-3", name: "The Market as a Social Institution", nameHi: "बाज़ार एक सामाजिक संस्था" },
                { id: "soc12-1-4", name: "Patterns of Social Inequality", nameHi: "सामाजिक असमानता के प्रतिरूप" },
                { id: "soc12-1-5", name: "Challenges of Cultural Diversity", nameHi: "सांस्कृतिक विविधता की चुनौतियाँ" }
              ]
            }
          ]
        }

      ]
                 }
