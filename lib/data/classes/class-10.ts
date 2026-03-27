import type { Subject } from "../types"

export const class10Subjects: Subject[] = [
  // ══════════════════════════════
  // गणित
  // ══════════════════════════════
  {
    id: "math-10",
    name: "Mathematics",
    nameHi: "गणित",
    icon: "calculator",
    tabs: ["books", "iq", "quiz"],
    books: [
      {
        id: "math-10-ganit",
        name: "Ganit",
        nameHi: "गणित",
        ncertPdfCode: "jemh1",
        chapters: [
          { id: "m10-ch1", name: "Real Numbers", nameHi: "वास्तविक संख्याएँ" },
          { id: "m10-ch2", name: "Polynomials", nameHi: "बहुपद" },
          { id: "m10-ch3", name: "Pair of Linear Equations in Two Variables", nameHi: "दो चर वाले रैखिक समीकरण युग्म" },
          { id: "m10-ch4", name: "Quadratic Equations", nameHi: "द्विघात समीकरण" },
          { id: "m10-ch5", name: "Arithmetic Progressions", nameHi: "समांतर श्रेढ़ियाँ" },
          { id: "m10-ch6", name: "Triangles", nameHi: "त्रिभुज" },
          { id: "m10-ch7", name: "Coordinate Geometry", nameHi: "निर्देशांक ज्यामिति" },
          { id: "m10-ch8", name: "Introduction to Trigonometry", nameHi: "त्रिकोणमिति का परिचय" },
          { id: "m10-ch9", name: "Some Applications of Trigonometry", nameHi: "त्रिकोणमिति के कुछ अनुप्रयोग" },
          { id: "m10-ch10", name: "Circles", nameHi: "वृत्त" },
          { id: "m10-ch11", name: "Areas Related to Circles", nameHi: "वृत्तों से संबंधित क्षेत्रफल" },
          { id: "m10-ch12", name: "Surface Areas and Volumes", nameHi: "पृष्ठीय क्षेत्रफल और आयतन" },
          { id: "m10-ch13", name: "Statistics", nameHi: "सांख्यिकी" },
          { id: "m10-ch14", name: "Probability", nameHi: "प्रायिकता" },
        ]
      },
      {
        id: "math-10-exemplar",
        name: "Ganit Pradarshika",
        nameHi: "गणित प्रदर्शिका",
        chapters: [
          { id: "me10-ch1", name: "Real Numbers", nameHi: "वास्तविक संख्याएँ" },
          { id: "me10-ch2", name: "Polynomials", nameHi: "बहुपद" },
          { id: "me10-ch3", name: "Pair of Linear Equations in Two Variables", nameHi: "दो चर वाले रैखिक समीकरण युग्म" },
          { id: "me10-ch4", name: "Quadratic Equations", nameHi: "द्विघात समीकरण" },
          { id: "me10-ch5", name: "Arithmetic Progressions", nameHi: "समांतर श्रेढ़ियाँ" },
          { id: "me10-ch6", name: "Triangles", nameHi: "त्रिभुज" },
          { id: "me10-ch7", name: "Coordinate Geometry", nameHi: "निर्देशांक ज्यामिति" },
          { id: "me10-ch8", name: "Introduction to Trigonometry and Its Applications", nameHi: "त्रिकोणमिति का परिचय और उसके अनुप्रयोग" },
          { id: "me10-ch9", name: "Circles", nameHi: "वृत्त" },
          { id: "me10-ch10", name: "Areas Related to Circles", nameHi: "वृत्तों से संबंधित क्षेत्रफल" },
          { id: "me10-ch11", name: "Surface Areas and Volumes", nameHi: "पृष्ठीय क्षेत्रफल और आयतन" },
          { id: "me10-ch12", name: "Statistics and Probability", nameHi: "सांख्यिकी और प्रायिकता" },
        ]
      },
    ]
  },

  // ══════════════════════════════
  // विज्ञान
  // ══════════════════════════════
  {
    id: "science-10",
    name: "Science",
    nameHi: "विज्ञान",
    icon: "flask",
    tabs: ["books", "notes", "iq", "quiz"],
    books: [
      {
        id: "science-10-vigyan",
        name: "Vigyan",
        nameHi: "विज्ञान",
        ncertPdfCode: "jesc1",
        chapters: [
          { id: "v10-ch1", name: "Chemical Reactions and Equations", nameHi: "रासायनिक अभिक्रियाएँ एवं समीकरण" },
          { id: "v10-ch2", name: "Acids, Bases and Salts", nameHi: "अम्ल, क्षारक एवं लवण" },
          { id: "v10-ch3", name: "Metals and Non-Metals", nameHi: "धातु एवं अधातु" },
          { id: "v10-ch4", name: "Carbon and its Compounds", nameHi: "कार्बन एवं उसके यौगिक" },
          { id: "v10-ch5", name: "Life Processes", nameHi: "जैव प्रक्रम" },
          { id: "v10-ch6", name: "Control and Coordination", nameHi: "नियंत्रण एवं समन्वय" },
          { id: "v10-ch7", name: "How do Organisms Reproduce?", nameHi: "जीव जनन कैसे करते हैं?" },
          { id: "v10-ch8", name: "Heredity", nameHi: "आनुवंशिकता" },
          { id: "v10-ch9", name: "Light: Reflection and Refraction", nameHi: "प्रकाश – परावर्तन तथा अपवर्तन" },
          { id: "v10-ch10", name: "The Human Eye and the Colourful World", nameHi: "मानव नेत्र तथा रंगबिरंगा संसार" },
          { id: "v10-ch11", name: "Electricity", nameHi: "विद्युत" },
          { id: "v10-ch12", name: "Magnetic Effects of Electric Current", nameHi: "विद्युत धारा के चुंबकीय प्रभाव" },
          { id: "v10-ch13", name: "Our Environment", nameHi: "हमारा पर्यावरण" },
        ]
      },
      {
        id: "science-10-exemplar",
        name: "Vigyan Pradarshika",
        nameHi: "विज्ञान प्रश्न प्रदर्शिका",
        chapters: [
          { id: "ve10-ch1", name: "Chemical Reactions and Equations", nameHi: "रासायनिक अभिक्रियाएँ और समीकरण" },
          { id: "ve10-ch2", name: "Acids, Bases and Salts", nameHi: "अम्ल, क्षारक और लवण" },
          { id: "ve10-ch3", name: "Metals and Non-Metals", nameHi: "धातु और अधातु" },
          { id: "ve10-ch4", name: "Carbon and its Compounds", nameHi: "कार्बन और उसके यौगिक" },
          { id: "ve10-ch5", name: "Life Processes", nameHi: "जैव प्रक्रम" },
          { id: "ve10-ch6", name: "Control and Coordination", nameHi: "नियंत्रण और समन्वय" },
          { id: "ve10-ch7", name: "How do Organisms Reproduce?", nameHi: "जीव जनन कैसे करते हैं" },
          { id: "ve10-ch8", name: "Heredity and Evolution", nameHi: "आनुवंशिकता एवं जैव विकास" },
          { id: "ve10-ch9", name: "Light: Reflection and Refraction", nameHi: "प्रकाश-परावर्तन और अपवर्तन" },
          { id: "ve10-ch10", name: "The Human Eye and the Colourful World", nameHi: "मानव नेत्र और रंगबिरंगा संसार" },
          { id: "ve10-ch11", name: "Electricity", nameHi: "विद्युत" },
          { id: "ve10-ch12", name: "Magnetic Effects of Electric Current", nameHi: "विद्युत धारा के चुंबकीय प्रभाव" },
          { id: "ve10-ch13", name: "Our Environment", nameHi: "हमारा पर्यावरण" },
        ]
      },
      {
        id: "science-10-lab",
        name: "Vigyan Prayogshala Pustika",
        nameHi: "प्रयोगशाला पुस्तिका: विज्ञान",
        chapters: [
          { id: "vl10-u1", name: "Chemical Reactions", nameHi: "इकाई 1: रासायनिक अभिक्रियाएँ" },
          { id: "vl10-u2", name: "Living World", nameHi: "इकाई 2: सजीव जगत" },
          { id: "vl10-u3", name: "Light and Electricity", nameHi: "इकाई 3: प्रकाश और विद्युत" },
        ]
      },
    ]
  },
  // ══════════════════════════════
  // सामाजिक विज्ञान
  // ══════════════════════════════
  {
    id: "social-10",
    name: "Social Science",
    nameHi: "सामाजिक विज्ञान",
    icon: "globe",
    tabs: ["books", "notes", "iq", "quiz"],
    books: [
      {
        id: "social-10-itihas",
        name: "Bharat aur Samkaleen Vishwa - 2",
        nameHi: "भारत और समकालीन विश्व - 2",
        ncertPdfCode: "jess1",
        chapters: [
          { id: "bs10-ch1", name: "The Rise of Nationalism in Europe", nameHi: "यूरोप में राष्ट्रवाद का उदय" },
          { id: "bs10-ch2", name: "Nationalism in India", nameHi: "भारत में राष्ट्रवाद" },
          { id: "bs10-ch3", name: "The Making of a Global World", nameHi: "भूमंडलीकृत विश्व का बनना" },
          { id: "bs10-ch4", name: "The Age of Industrialisation", nameHi: "औद्योगिकीकरण का युग" },
          { id: "bs10-ch5", name: "Print Culture and the Modern World", nameHi: "मुद्रण संस्कृति और आधुनिक दुनिया" },
        ]
      },
      {
        id: "social-10-bhugol",
        name: "Samkaleen Bharat - 2",
        nameHi: "समकालीन भारत - 2",
        ncertPdfCode: "jess2",
        chapters: [
          { id: "sb10-ch1", name: "Resources and Development", nameHi: "संसाधन एवं विकास" },
          { id: "sb10-ch2", name: "Forest and Wildlife Resources", nameHi: "वन एवं वन्य जीव संसाधन" },
          { id: "sb10-ch3", name: "Water Resources", nameHi: "जल संसाधन" },
          { id: "sb10-ch4", name: "Agriculture", nameHi: "कृषि" },
          { id: "sb10-ch5", name: "Minerals and Energy Resources", nameHi: "खनिज तथा ऊर्जा संसाधन" },
          { id: "sb10-ch6", name: "Manufacturing Industries", nameHi: "विनिर्माण उद्योग" },
          { id: "sb10-ch7", name: "Lifelines of National Economy", nameHi: "राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएँ" },
        ]
      },
      {
        id: "social-10-rajniti",
        name: "Loktantrik Rajneeti - 2",
        nameHi: "लोकतांत्रिक राजनीति - 2",
        ncertPdfCode: "jess3",
        chapters: [
          { id: "lr10-ch1", name: "Power Sharing", nameHi: "सत्ता की साझेदारी" },
          { id: "lr10-ch2", name: "Federalism", nameHi: "संघवाद" },
          { id: "lr10-ch3", name: "Gender, Religion and Caste", nameHi: "जाति, धर्म और लैंगिक मसले" },
          { id: "lr10-ch4", name: "Political Parties", nameHi: "राजनीतिक दल" },
          { id: "lr10-ch5", name: "Outcomes of Democracy", nameHi: "लोकतंत्र के परिणाम" },
        ]
      },
      {
        id: "social-10-arthashastra",
        name: "Arthik Vikas Ki Samajh",
        nameHi: "आर्थिक विकास की समझ",
        ncertPdfCode: "jess4",
        chapters: [
          { id: "ar10-ch1", name: "Development", nameHi: "विकास" },
          { id: "ar10-ch2", name: "Sectors of the Indian Economy", nameHi: "भारतीय अर्थव्यवस्था के क्षेत्रक" },
          { id: "ar10-ch3", name: "Money and Credit", nameHi: "मुद्रा और साख" },
          { id: "ar10-ch4", name: "Globalisation and the Indian Economy", nameHi: "वैश्वीकरण और भारतीय अर्थव्यवस्था" },
          { id: "ar10-ch5", name: "Consumer Rights", nameHi: "उपभोक्ता अधिकार" },
        ]
      },
    ]
  },

  // ══════════════════════════════
  // हिंदी
  // ══════════════════════════════
  {
    id: "hindi-10",
    name: "Hindi",
    nameHi: "हिंदी",
    icon: "book",
    tabs: ["books", "notes", "iq"],
    books: [
      {
        id: "hindi-10-kshitiz",
        name: "Kshitiz Bhag 2",
        nameHi: "क्षितिज भाग 2",
        ncertPdfCode: "jhhc1",
        chapters: [
          { id: "ksh10-ch1", name: "Pad", nameHi: "पद (सूरदास)" },
          { id: "ksh10-ch2", name: "Ram-Lakshman-Parashuram Samvad", nameHi: "राम-लक्ष्मण-परशुराम संवाद" },
          { id: "ksh10-ch3", name: "Aatmakathya", nameHi: "आत्मकथ्य" },
          { id: "ksh10-ch4", name: "Utsaah, At Nahi Rahi Hai", nameHi: "उत्साह, अट नहीं रही है" },
          { id: "ksh10-ch5", name: "Yeh Danturit Muskan, Fasal", nameHi: "यह दंतुरित मुसकान, फसल" },
          { id: "ksh10-ch6", name: "Sangatkar", nameHi: "संगतकार" },
          { id: "ksh10-ch7", name: "Netaji Ka Chashma", nameHi: "नेताजी का चश्मा" },
          { id: "ksh10-ch8", name: "Balgobin Bhagat", nameHi: "बालगोबिन भगत" },
          { id: "ksh10-ch9", name: "Lucknawi Andaz", nameHi: "लखनवी अंदाज़" },
          { id: "ksh10-ch10", name: "Maanveeya Karuna Ki Divya Chamak", nameHi: "मानवीय करुणा की दिव्य चमक" },
          { id: "ksh10-ch11", name: "Ek Kahani Yeh Bhi", nameHi: "एक कहानी यह भी" },
          { id: "ksh10-ch12", name: "Naubatkhane Mein Ibadat", nameHi: "नौबतखाने में इबादत" },
          { id: "ksh10-ch13", name: "Sanskriti", nameHi: "संस्कृति" },
        ]
      },
      {
        id: "hindi-10-sparsh",
        name: "Sparsh Bhag 2",
        nameHi: "स्पर्श भाग 2",
        ncertPdfCode: "jhic1",
        chapters: [
          { id: "sp10-ch1", name: "Saakhi", nameHi: "साखी (कबीर)" },
          { id: "sp10-ch2", name: "Pad", nameHi: "पद (मीरा)" },
          { id: "sp10-ch3", name: "Dohe", nameHi: "दोहे (बिहारी)" },
          { id: "sp10-ch4", name: "Manushyata", nameHi: "मनुष्यता" },
          { id: "sp10-ch5", name: "Parvat Pradesh Mein Paavs", nameHi: "पर्वत प्रदेश में पावस" },
          { id: "sp10-ch6", name: "Top", nameHi: "तोप" },
          { id: "sp10-ch7", name: "Kar Chale Hum Fida", nameHi: "कर चले हम फ़िदा" },
          { id: "sp10-ch8", name: "Aatmtraan", nameHi: "आत्मत्राण" },
          { id: "sp10-ch9", name: "Bade Bhai Sahab", nameHi: "बड़े भाई साहब" },
          { id: "sp10-ch10", name: "Diary Ka Ek Panna", nameHi: "डायरी का एक पन्ना" },
          { id: "sp10-ch11", name: "Tatara-Vamiro Katha", nameHi: "तताँरा-वामीरो कथा" },
          { id: "sp10-ch12", name: "Teesri Kasam Ke Shilpkar Shailendra", nameHi: "तीसरी कसम के शिल्पकार शैलेंद्र" },
          { id: "sp10-ch13", name: "Ab Kahan Doosre Ke Dukh Se Dukhi Hone Wale", nameHi: "अब कहाँ दूसरे के दुख से दुखी होने वाले" },
          { id: "sp10-ch14", name: "Patjhad Mein Tooti Pattiyan", nameHi: "पतझड़ में टूटी पत्तियाँ" },
          { id: "sp10-ch15", name: "Kartoos", nameHi: "कारतूस" },
        ]
      },
      {
        id: "hindi-10-kritika",
        name: "Kritika Bhag 2",
        nameHi: "कृतिका भाग 2",
        chapters: [
          { id: "kr10-ch1", name: "Mata Ka Aanchal", nameHi: "माता का अँचल" },
          { id: "kr10-ch2", name: "Saana-Saana Haath Jodi", nameHi: "साना-साना हाथ जोड़ि" },
          { id: "kr10-ch3", name: "Main Kyun Likhta Hoon?", nameHi: "मैं क्यों लिखता हूँ?" },
        ]
      },
      {
        id: "hindi-10-sanchayan",
        name: "Sanchayan Bhag 2",
        nameHi: "संचयन भाग 2",
        chapters: [
          { id: "sc10-ch1", name: "Harihar Kaka", nameHi: "हरिहर काका" },
          { id: "sc10-ch2", name: "Sapnon Ke Se Din", nameHi: "सपनों के-से दिन" },
          { id: "sc10-ch3", name: "Topi Shukla", nameHi: "टोपी शुक्ला" },
        ]
      },
    ]
  },
  // ══════════════════════════════
  // संस्कृत
  // ══════════════════════════════
  {
    id: "sanskrit-10",
    name: "Sanskrit",
    nameHi: "संस्कृत",
    icon: "book",
    tabs: ["books", "notes", "iq"],
    books: [
      {
        id: "sanskrit-10-shemushi",
        name: "Shemushi Dviteeyo Bhagah",
        nameHi: "शेमुषी द्वितीयो भागः",
        chapters: [
          { id: "sh10-ch1", name: "Shuchiparyavaranam", nameHi: "शुचिपर्यावरणम्" },
          { id: "sh10-ch2", name: "Buddhirbalavati Sada", nameHi: "बुद्धिर्बलवती सदा" },
          { id: "sh10-ch3", name: "Janani Tulyavatsala", nameHi: "जननी तुल्यवत्सला" },
          { id: "sh10-ch4", name: "Subhashitaani", nameHi: "सुभाषितानि" },
          { id: "sh10-ch5", name: "Sauhardam Prakritek Shobha", nameHi: "सौहार्दं प्रकृतेः शोभा" },
          { id: "sh10-ch6", name: "Vichitrah Sakshi", nameHi: "विचित्रः साक्षी" },
          { id: "sh10-ch7", name: "Suktayah", nameHi: "सूक्तयः" },
          { id: "sh10-ch8", name: "Bhookampavibheeshika", nameHi: "भूकंपविभीषिका" },
          { id: "sh10-ch9", name: "Pranebhyopi Priyah Suhrid", nameHi: "प्राणेभ्योऽपि प्रियः सुहृद्" },
          { id: "sh10-ch10", name: "Anyoktayah", nameHi: "अन्योक्तयः" },
        ]
      },
      {
        id: "sanskrit-10-manika",
        name: "Manika Dviteeyo Bhagah",
        nameHi: "मणिका द्वितीयो भागः",
        chapters: [
          { id: "mn10-ch1", name: "Vaangmayam Tapah", nameHi: "वाङ्मयं तपः" },
          { id: "mn10-ch2", name: "Naasti Tyaagsamam Sukham", nameHi: "नास्ति त्यागसमं सुखम्" },
          { id: "mn10-ch3", name: "Ramaneeyaa Hi Srishtiresha", nameHi: "रमणीया हि सृष्टिरेषा" },
          { id: "mn10-ch4", name: "Aagya Gurunam Hyavichaaraneeyaa", nameHi: "आज्ञा गुरूणां ह्यविचारणीया" },
          { id: "mn10-ch5", name: "Abhyaasvasham Manah", nameHi: "अभ्यासवशगं मनः" },
          { id: "mn10-ch6", name: "Tirukkural Sukti Saurabham", nameHi: "तिरुक्कुरल्-सूक्ति-सौरभम्" },
          { id: "mn10-ch7", name: "Sadhuvritim Samacharet", nameHi: "साधुवृत्तिं समाचरेत्" },
          { id: "mn10-ch8", name: "Tirobhootam Tadantakam", nameHi: "तिरोभूतं तदन्तकम्" },
          { id: "mn10-ch9", name: "Suswaagatam Bho Arunachalesmin", nameHi: "सुस्वागतं भो! अरुणाचलेऽस्मिन्" },
          { id: "mn10-ch10", name: "Kaloham", nameHi: "कालोऽहम्" },
        ]
      },
      {
        id: "sanskrit-10-manika-abhyas",
        name: "Manika Abhyas",
        nameHi: "मणिका अभ्यास",
        chapters: [
          { id: "ma10-ch1", name: "Sandhih", nameHi: "सन्धिः" },
          { id: "ma10-ch2", name: "Samaasaah", nameHi: "समासाः" },
          { id: "ma10-ch3", name: "Pratyayaah", nameHi: "प्रत्ययाः" },
          { id: "ma10-ch4", name: "Vaachyaparivaratanam", nameHi: "वाच्यपरिवर्तनम्" },
          { id: "ma10-ch5", name: "Samayah", nameHi: "समयः" },
          { id: "ma10-ch6", name: "Avyayaani", nameHi: "अव्ययानि" },
          { id: "ma10-ch7", name: "Ashuddhi Samshodhanam", nameHi: "अशुद्धिसंशोधनम्" },
          { id: "ma10-ch8", name: "Apathitavabodhanam", nameHi: "अपठितावबोधनम्" },
          { id: "ma10-ch9", name: "Patralekhanam", nameHi: "पत्रलेखनम्" },
          { id: "ma10-ch10", name: "Anuchchhedlekhanam Chitravarnanam", nameHi: "अनुच्छेदलेखनम् / चित्रवर्णनम्" },
        ]
      },
      {
        id: "sanskrit-10-abhyaswan",
        name: "Abhyaswaan Bhav Dviteeyo Bhagah",
        nameHi: "अभ्यासवान् भव द्वितीयो भागः",
        chapters: [
          { id: "ab10-ch1", name: "Apathitavabodhanam", nameHi: "अपठितावबोधनम्" },
          { id: "ab10-ch2", name: "Patralekhanam", nameHi: "पत्रलेखनम्" },
          { id: "ab10-ch3", name: "Anuchchhedlekhanam", nameHi: "अनुच्छेदलेखनम्" },
          { id: "ab10-ch4", name: "Chitravarnanam", nameHi: "चित्रवर्णनम्" },
          { id: "ab10-ch5", name: "Rachnaakaaryam", nameHi: "रचनाकार्यम्" },
          { id: "ab10-ch6", name: "Sandhih", nameHi: "सन्धिः" },
          { id: "ab10-ch7", name: "Shabdaroopaani", nameHi: "शब्दरूपाणि" },
          { id: "ab10-ch8", name: "Dhaaturoopaani", nameHi: "धातुरूपाणि" },
          { id: "ab10-ch9", name: "Pratyayaah", nameHi: "प्रत्ययाः" },
          { id: "ab10-ch10", name: "Avyayaani", nameHi: "अव्ययानि" },
          { id: "ab10-ch11", name: "Vaachyaparivaratanam", nameHi: "वाच्यपरिवर्तनम्" },
          { id: "ab10-ch12", name: "Ashuddhi Samshodhanam", nameHi: "अशुद्धिसंशोधनम्" },
        ]
      },
      {
        id: "sanskrit-10-vyakaran",
        name: "Vyakaranavithi",
        nameHi: "व्याकरणवीथिः",
        chapters: [
          { id: "vy10-ch1", name: "Varna Vichaarah", nameHi: "वर्ण विचारः" },
          { id: "vy10-ch2", name: "Sangya evam Paribhasha Prakaran", nameHi: "संज्ञा एवं परिभाषा प्रकरण" },
          { id: "vy10-ch3", name: "Sandhi Prakaran", nameHi: "सन्धि प्रकरण" },
          { id: "vy10-ch4", name: "Shabdaroop Samanya Parichay", nameHi: "शब्दरूप सामान्य परिचय" },
          { id: "vy10-ch5", name: "Dhaaturoop Samanya Parichay", nameHi: "धातुरूप सामान्य परिचय" },
          { id: "vy10-ch6", name: "Upasarg", nameHi: "उपसर्ग" },
          { id: "vy10-ch7", name: "Avyay", nameHi: "अव्यय" },
          { id: "vy10-ch8", name: "Pratyay Prakaran", nameHi: "प्रत्यय प्रकरण" },
          { id: "vy10-ch9", name: "Samaas Parichay", nameHi: "समास परिचय" },
          { id: "vy10-ch10", name: "Kaarak evam Vibhakti", nameHi: "कारक एवं विभक्ति" },
          { id: "vy10-ch11", name: "Vaachya Parivartan", nameHi: "वाच्य परिवर्तन" },
          { id: "vy10-ch12", name: "Rachna Kaary", nameHi: "रचना कार्य" },
        ]
      },
    ]
  },

  // ══════════════════════════════
  // अंग्रेजी
  // ══════════════════════════════
  {
    id: "english-10",
    name: "English",
    nameHi: "अंग्रेजी",
    icon: "book-open",
    tabs: ["books", "notes", "iq"],
    books: [
      {
        id: "english-10-firstflight",
        name: "First Flight",
        nameHi: "First Flight",
        ncertPdfCode: "jenc1",
        chapters: [
          { id: "ff10-ch1", name: "A Letter to God", nameHi: "A Letter to God" },
          { id: "ff10-ch2", name: "Nelson Mandela: Long Walk to Freedom", nameHi: "Nelson Mandela: Long Walk to Freedom" },
          { id: "ff10-ch3", name: "Two Stories about Flying", nameHi: "Two Stories about Flying" },
          { id: "ff10-ch4", name: "From the Diary of Anne Frank", nameHi: "From the Diary of Anne Frank" },
          { id: "ff10-ch5", name: "Glimpses of India", nameHi: "Glimpses of India" },
          { id: "ff10-ch6", name: "Mijbil the Otter", nameHi: "Mijbil the Otter" },
          { id: "ff10-ch7", name: "Madam Rides the Bus", nameHi: "Madam Rides the Bus" },
          { id: "ff10-ch8", name: "The Sermon at Benares", nameHi: "The Sermon at Benares" },
          { id: "ff10-ch9", name: "The Proposal", nameHi: "The Proposal" },
          { id: "ff10-ch10", name: "Dust of Snow", nameHi: "Dust of Snow" },
          { id: "ff10-ch11", name: "Fire and Ice", nameHi: "Fire and Ice" },
          { id: "ff10-ch12", name: "A Tiger in the Zoo", nameHi: "A Tiger in the Zoo" },
          { id: "ff10-ch13", name: "How to Tell Wild Animals", nameHi: "How to Tell Wild Animals" },
          { id: "ff10-ch14", name: "The Ball Poem", nameHi: "The Ball Poem" },
          { id: "ff10-ch15", name: "Amanda!", nameHi: "Amanda!" },
          { id: "ff10-ch16", name: "The Trees", nameHi: "The Trees" },
          { id: "ff10-ch17", name: "Fog", nameHi: "Fog" },
          { id: "ff10-ch18", name: "The Tale of Custard the Dragon", nameHi: "The Tale of Custard the Dragon" },
          { id: "ff10-ch19", name: "For Anne Gregory", nameHi: "For Anne Gregory" },
        ]
      },
      {
        id: "english-10-footprints",
        name: "Footprints Without Feet",
        nameHi: "Footprints Without Feet",
        chapters: [
          { id: "fw10-ch1", name: "A Triumph of Surgery", nameHi: "A Triumph of Surgery" },
          { id: "fw10-ch2", name: "The Thief's Story", nameHi: "The Thief's Story" },
          { id: "fw10-ch3", name: "The Midnight Visitor", nameHi: "The Midnight Visitor" },
          { id: "fw10-ch4", name: "A Question of Trust", nameHi: "A Question of Trust" },
          { id: "fw10-ch5", name: "Footprints without Feet", nameHi: "Footprints without Feet" },
          { id: "fw10-ch6", name: "The Making of a Scientist", nameHi: "The Making of a Scientist" },
          { id: "fw10-ch7", name: "The Necklace", nameHi: "The Necklace" },
          { id: "fw10-ch8", name: "Bholi", nameHi: "Bholi" },
          { id: "fw10-ch9", name: "The Book That Saved the Earth", nameHi: "The Book That Saved the Earth" },
        ]
      },
    ]
  },
]
