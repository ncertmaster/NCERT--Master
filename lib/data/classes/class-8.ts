import type { Subject } from "../types"

export const class8Subjects: Subject[] = [
  // ══════════════════════════════
  // गणित
  // ══════════════════════════════
  {
    id: "math-8",
    name: "Mathematics",
    nameHi: "गणित",
    icon: "calculator",
    tabs: ["books"],
    books: [
      {
        id: "math-8-ganit",
        ncertPdfCode: "hemh1",
        name: "Ganit",
        nameHi: "गणित",
        chapters: [
          { id: "m8-ch1", name: "Rational Numbers", nameHi: "परिमेय संख्याएँ" },
          { id: "m8-ch2", name: "Linear Equations in One Variable", nameHi: "एक चर वाले रैखिक समीकरण" },
          { id: "m8-ch3", name: "Understanding Quadrilaterals", nameHi: "चतुर्भुजों को समझना" },
          { id: "m8-ch4", name: "Data Handling", nameHi: "आँकड़ों का प्रबंधन" },
          { id: "m8-ch5", name: "Squares and Square Roots", nameHi: "वर्ग और वर्गमूल" },
          { id: "m8-ch6", name: "Cubes and Cube Roots", nameHi: "घन और घनमूल" },
          { id: "m8-ch7", name: "Comparing Quantities", nameHi: "राशियों की तुलना" },
          { id: "m8-ch8", name: "Algebraic Expressions and Identities", nameHi: "बीजीय व्यंजक एवं सर्वसमिकाएँ" },
          { id: "m8-ch9", name: "Mensuration", nameHi: "क्षेत्रमिति" },
          { id: "m8-ch10", name: "Exponents and Powers", nameHi: "घातांक और घात" },
          { id: "m8-ch11", name: "Direct and Inverse Proportions", nameHi: "सीधा और प्रतिलोम समानुपात" },
          { id: "m8-ch12", name: "Factorisation", nameHi: "गुणनखंडन" },
          { id: "m8-ch13", name: "Introduction to Graphs", nameHi: "आलेखों से परिचय" },
        ]
      },
      {
        id: "math-8-exemplar",
        name: "Ganit Pradarshika",
        nameHi: "गणित प्रदर्शिका",
        chapters: [
          { id: "me8-ch1", name: "Rational Numbers", nameHi: "परिमेय संख्याएँ" },
          { id: "me8-ch2", name: "Data Handling", nameHi: "आँकड़ों का प्रबंधन" },
          { id: "me8-ch3", name: "Squares, Square Roots, Cubes and Cube Roots", nameHi: "वर्ग-वर्गमूल और घन-घनमूल" },
          { id: "me8-ch4", name: "Linear Equations in One Variable", nameHi: "एक चर वाले रैखिक समीकरण" },
          { id: "me8-ch5", name: "Understanding Quadrilaterals and Practical Geometry", nameHi: "चतुर्भुजों को समझना और प्रायोगिक ज्यामिति" },
          { id: "me8-ch6", name: "Comparing Quantities", nameHi: "राशियों की तुलना" },
          { id: "me8-ch7", name: "Algebraic Expressions, Identities and Factorisation", nameHi: "बीजीय व्यंजक, सर्वसमिकाएँ और गुणनखंडन" },
          { id: "me8-ch8", name: "Exponents and Powers", nameHi: "घातांक और घात" },
          { id: "me8-ch9", name: "Mensuration", nameHi: "क्षेत्रमिति" },
          { id: "me8-ch10", name: "Introduction to Graphs", nameHi: "आलेखों से परिचय" },
          { id: "me8-ch11", name: "Direct and Inverse Proportions", nameHi: "सीधा और प्रतिलोम समानुपात" },
        ]
      },
    ]
  },

  // ══════════════════════════════
  // विज्ञान
  // ══════════════════════════════
  {
    id: "science-8",
    name: "Science",
    nameHi: "विज्ञान",
    icon: "flask",
    tabs: ["books", "notes", "iq", "quiz"],
    books: [
      {
        id: "science-8-vigyan",
        ncertPdfCode: "hesc1",
        name: "Vigyan",
        nameHi: "विज्ञान",
        chapters: [
          { id: "v8-ch1", name: "Crop Production and Management", nameHi: "फसल उत्पादन एवं प्रबंध" },
          { id: "v8-ch2", name: "Microorganisms: Friend and Foe", nameHi: "सूक्ष्मजीव: मित्र एवं शत्रु" },
          { id: "v8-ch3", name: "Coal and Petroleum", nameHi: "कोयला और पेट्रोलियम" },
          { id: "v8-ch4", name: "Combustion and Flame", nameHi: "दहन और ज्वाला" },
          { id: "v8-ch5", name: "Conservation of Plants and Animals", nameHi: "पौधे एवं जंतुओं का संरक्षण" },
          { id: "v8-ch6", name: "Reproduction in Animals", nameHi: "जंतुओं में जनन" },
          { id: "v8-ch7", name: "Reaching the Age of Adolescence", nameHi: "किशोरावस्था की ओर" },
          { id: "v8-ch8", name: "Force and Pressure", nameHi: "बल तथा दाब" },
          { id: "v8-ch9", name: "Friction", nameHi: "घर्षण" },
          { id: "v8-ch10", name: "Sound", nameHi: "ध्वनि" },
          { id: "v8-ch11", name: "Chemical Effects of Electric Current", nameHi: "विद्युत धारा के रासायनिक प्रभाव" },
          { id: "v8-ch12", name: "Some Natural Phenomena", nameHi: "कुछ प्राकृतिक परिघटनाएँ" },
          { id: "v8-ch13", name: "Light", nameHi: "प्रकाश" },
        ]
      },
      {
        id: "science-8-exemplar",
        name: "Vigyan Pradarshika",
        nameHi: "विज्ञान प्रदर्शिका",
        chapters: [
          { id: "ve8-ch1", name: "Crop Production and Management", nameHi: "फसल उत्पादन एवं प्रबंध" },
          { id: "ve8-ch2", name: "Microorganisms: Friend and Foe", nameHi: "सूक्ष्मजीव: मित्र एवं शत्रु" },
          { id: "ve8-ch3", name: "Synthetic Fibres and Plastics", nameHi: "संश्लेषित रेशे और प्लास्टिक" },
          { id: "ve8-ch4", name: "Materials: Metals and Non-Metals", nameHi: "पदार्थ: धातु और अधातु" },
          { id: "ve8-ch5", name: "Coal and Petroleum", nameHi: "कोयला और पेट्रोलियम" },
          { id: "ve8-ch6", name: "Combustion and Flame", nameHi: "दहन और ज्वाला" },
          { id: "ve8-ch7", name: "Conservation of Plants and Animals", nameHi: "पौधे एवं जंतुओं का संरक्षण" },
          { id: "ve8-ch8", name: "Cell: Structure and Functions", nameHi: "कोशिका - संरचना एवं प्रकार्य" },
          { id: "ve8-ch9", name: "Reproduction in Animals", nameHi: "जंतुओं में जनन" },
          { id: "ve8-ch10", name: "Reaching the Age of Adolescence", nameHi: "किशोरावस्था की ओर" },
          { id: "ve8-ch11", name: "Force and Pressure", nameHi: "बल तथा दाब" },
          { id: "ve8-ch12", name: "Friction", nameHi: "घर्षण" },
          { id: "ve8-ch13", name: "Sound", nameHi: "ध्वनि" },
          { id: "ve8-ch14", name: "Chemical Effects of Electric Current", nameHi: "विद्युत धारा के रासायनिक प्रभाव" },
          { id: "ve8-ch15", name: "Some Natural Phenomena", nameHi: "कुछ प्राकृतिक परिघटनाएँ" },
          { id: "ve8-ch16", name: "Light", nameHi: "प्रकाश" },
          { id: "ve8-ch17", name: "Stars and the Solar System", nameHi: "तारे एवं सौर परिवार" },
          { id: "ve8-ch18", name: "Pollution of Air and Water", nameHi: "वायु तथा जल का प्रदूषण" },
        ]
      },
    ]
  },
  // ══════════════════════════════
  // सामाजिक विज्ञान
  // ══════════════════════════════
  {
    id: "social-8",
    name: "Social Science",
    nameHi: "सामाजिक विज्ञान",
    icon: "globe",
    tabs: ["books", "notes", "iq", "quiz"],
    books: [
      {
        id: "social-8-sansadhan",
        ncertPdfCode: "hess2",
        name: "Sansadhan evam Vikas",
        nameHi: "संसाधन एवं विकास",
        chapters: [
          { id: "sv8-ch1", name: "Resources", nameHi: "संसाधन" },
          { id: "sv8-ch2", name: "Land, Soil, Water, Natural Vegetation and Wildlife Resources", nameHi: "भूमि, मृदा, जल, प्राकृतिक वनस्पति और वन्य जीवन संसाधन" },
          { id: "sv8-ch3", name: "Agriculture", nameHi: "कृषि" },
          { id: "sv8-ch4", name: "Industries", nameHi: "उद्योग" },
          { id: "sv8-ch5", name: "Human Resources", nameHi: "मानव संसाधन" },
        ]
      },
      {
        id: "social-8-rajniti",
        ncertPdfCode: "hess3",
        name: "Samajik evam Rajnitik Jeevan - III",
        nameHi: "सामाजिक एवं राजनीतिक जीवन - III",
        chapters: [
          { id: "sr8-ch1", name: "The Indian Constitution", nameHi: "भारतीय संविधान" },
          { id: "sr8-ch2", name: "Understanding Secularism", nameHi: "धर्मनिरपेक्षता की समझ" },
          { id: "sr8-ch3", name: "Why Do We Need a Parliament?", nameHi: "हमें संसद क्यों चाहिए?" },
          { id: "sr8-ch4", name: "Understanding Laws", nameHi: "कानूनों की समझ" },
          { id: "sr8-ch5", name: "Judiciary", nameHi: "न्यायपालिका" },
          { id: "sr8-ch6", name: "Understanding Our Criminal Justice System", nameHi: "हमारी आपराधिक न्याय प्रणाली" },
          { id: "sr8-ch7", name: "Understanding Marginalisation", nameHi: "हाशियाकरण की समझ" },
          { id: "sr8-ch8", name: "Confronting Marginalisation", nameHi: "हाशियाकरण से निपटना" },
          { id: "sr8-ch9", name: "Public Facilities", nameHi: "जनसुविधाएँ" },
          { id: "sr8-ch10", name: "Law and Social Justice", nameHi: "कानून और सामाजिक न्याय" },
        ]
      },
      {
        id: "social-8-ateet",
        ncertPdfCode: "hess1",
        name: "Hamare Ateet - III",
        nameHi: "हमारे अतीत - III",
        chapters: [
          { id: "ha8-ch1", name: "How, When and Where", nameHi: "कैसे, कब और कहाँ" },
          { id: "ha8-ch2", name: "From Trade to Territory", nameHi: "व्यापार से साम्राज्य तक" },
          { id: "ha8-ch3", name: "Ruling the Countryside", nameHi: "ग्रामीण क्षेत्र पर शासन चलाना" },
          { id: "ha8-ch4", name: "Tribals, Dikus and the Vision of a Golden Age", nameHi: "आदिवासी, दीकु और एक स्वर्ण युग की कल्पना" },
          { id: "ha8-ch5", name: "When People Rebel: 1857 and After", nameHi: "जब जनता बगावत करती है (1857 और उसके बाद)" },
          { id: "ha8-ch6", name: "Civilising the Native, Educating the Nation", nameHi: "देशी जनता को सभ्य बनाना, राष्ट्र को शिक्षित करना" },
          { id: "ha8-ch7", name: "Women, Caste and Reform", nameHi: "महिलाएँ, जाति एवं सुधार" },
          { id: "ha8-ch8", name: "The Making of the National Movement: 1870s-1947", nameHi: "राष्ट्रीय आंदोलन का संघटन: 1870 के दशक से 1947 तक" },
        ]
      },
    ]
  },

  // ══════════════════════════════
  // हिंदी
  // ══════════════════════════════
  {
    id: "hindi-8",
    name: "Hindi",
    nameHi: "हिंदी",
    icon: "book",
    tabs: ["books"],
    books: [
      {
        id: "hindi-8-malhar",
        name: "Malhar",
        nameHi: "मल्हार",
        chapters: [
          { id: "mh8-ch1", name: "Hind Desh Ke Nivaasi", nameHi: "हिन्द देश के निवासी" },
          { id: "mh8-ch2", name: "Buddhi Aur Bhagya", nameHi: "बुद्धि और भाग्य" },
          { id: "mh8-ch3", name: "Ek Gadha Aur Ek Siyaar", nameHi: "एक गधा और एक सियार" },
          { id: "mh8-ch4", name: "Haar Ki Jeet", nameHi: "हार की जीत" },
          { id: "mh8-ch5", name: "Meera Ke Pad", nameHi: "मीरा के पद" },
          { id: "mh8-ch6", name: "Mera Pyara Desh", nameHi: "मेरा प्यारा देश" },
          { id: "mh8-ch7", name: "Himmat Aur Zindagi", nameHi: "हिम्मत और जिंदगी" },
          { id: "mh8-ch8", name: "Dohe", nameHi: "दोहे (कबीर और रहीम)" },
          { id: "mh8-ch9", name: "Pariksha", nameHi: "परीक्षा" },
          { id: "mh8-ch10", name: "Kalam Aur Talwar", nameHi: "कलम और तलवार" },
          { id: "mh8-ch11", name: "Neelu", nameHi: "नीलू" },
          { id: "mh8-ch12", name: "Sudama Charit", nameHi: "सुदामा चरित" },
          { id: "mh8-ch13", name: "Gillu", nameHi: "गिल्लू" },
        ]
      },
      {
        id: "hindi-8-vasant",
        ncertPdfCode: "hhhv1",
        name: "Vasant Bhag 3",
        nameHi: "वसंत भाग 3",
        chapters: [
          { id: "vs8-ch1", name: "Laakh Ki Churiyan", nameHi: "लाख की चूड़ियाँ" },
          { id: "vs8-ch2", name: "Bus Ki Yatra", nameHi: "बस की यात्रा" },
          { id: "vs8-ch3", name: "Deevanon Ki Hasti", nameHi: "दीवानों की हस्ती" },
          { id: "vs8-ch4", name: "Bhagwan Ke Daakiye", nameHi: "भगवान के डाकिए" },
          { id: "vs8-ch5", name: "Kya Nirash Hua Jaaye", nameHi: "क्या निराश हुआ जाए" },
          { id: "vs8-ch6", name: "Yeh Sabse Kathin Samay Nahi", nameHi: "यह सबसे कठिन समय नहीं" },
          { id: "vs8-ch7", name: "Kabir Ki Saakhiyan", nameHi: "कबीर की साखियाँ" },
          { id: "vs8-ch8", name: "Sudama Charit", nameHi: "सुदामा चरित" },
          { id: "vs8-ch9", name: "Jahan Pahiya Hai", nameHi: "जहाँ पहिया है" },
          { id: "vs8-ch10", name: "Akbari Lota", nameHi: "अकबरी लोटा" },
          { id: "vs8-ch11", name: "Surdas Ke Pad", nameHi: "सूरदास के पद" },
          { id: "vs8-ch12", name: "Paani Ki Kahani", nameHi: "पानी की कहानी" },
          { id: "vs8-ch13", name: "Baaz Aur Saanp", nameHi: "बाज़ और साँप" },
        ]
      },
      {
        id: "hindi-8-durva",
        ncertPdfCode: "hhhd1",
        name: "Durva Bhag 3",
        nameHi: "दूर्वा भाग 3",
        chapters: [
          { id: "dv8-ch1", name: "Gudiya", nameHi: "गुड़िया" },
          { id: "dv8-ch2", name: "Do Gauraiya", nameHi: "दो गौरैया" },
          { id: "dv8-ch3", name: "Chitthiyon Mein Europe", nameHi: "चिट्ठियों में यूरोप" },
          { id: "dv8-ch4", name: "Os", nameHi: "ओस" },
          { id: "dv8-ch5", name: "Natak Mein Natak", nameHi: "नाटक में नाटक" },
          { id: "dv8-ch6", name: "Sagar Yatra", nameHi: "सागर यात्रा" },
          { id: "dv8-ch7", name: "Uth Kisaan O", nameHi: "उठ किसान ओ" },
          { id: "dv8-ch8", name: "Saste Ka Chakkar", nameHi: "सस्ते का चक्कर" },
          { id: "dv8-ch9", name: "Ek Khiladi Ki Yaad", nameHi: "एक खिलाड़ी की याद" },
          { id: "dv8-ch10", name: "Bus Ki Sair", nameHi: "बस की सैर" },
          { id: "dv8-ch11", name: "Hindi Ne Jinki Zindagi Badal Di", nameHi: "हिंदी ने जिनकी जिंदगी बदल दी" },
          { id: "dv8-ch12", name: "Aashadh Ka Pehla Din", nameHi: "आषाढ़ का पहला दिन" },
          { id: "dv8-ch13", name: "Anyay Ke Khilaf", nameHi: "अन्याय के खिलाफ" },
          { id: "dv8-ch14", name: "Bachcho Ke Priya Shri Keshav Shankar Pillai", nameHi: "बच्चों के प्रिय श्री केशव शंकर पिल्लै" },
          { id: "dv8-ch15", name: "Farsh Par", nameHi: "फर्श पर" },
          { id: "dv8-ch16", name: "Boodhi Amma Ki Baat", nameHi: "बूढ़ी अम्मा की बात" },
          { id: "dv8-ch17", name: "Woh Subah Kabhi To Aayegi", nameHi: "वह सुबह कभी तो आएगी" },
        ]
      },
      {
        id: "hindi-8-bharatkhoj",
        name: "Bharat Ki Khoj",
        nameHi: "भारत की खोज",
        chapters: [
          { id: "bk8-ch1", name: "Ahmadnagar Ka Qila", nameHi: "अहमदनगर का किला" },
          { id: "bk8-ch2", name: "Talaash", nameHi: "तलाश" },
          { id: "bk8-ch3", name: "Sindhu Ghati Sabhyata", nameHi: "सिंधु घाटी सभ्यता" },
          { id: "bk8-ch4", name: "Yugon Ka Daur", nameHi: "युगों का दौर" },
          { id: "bk8-ch5", name: "Nayi Samasyaen", nameHi: "नयी समस्याएँ" },
          { id: "bk8-ch6", name: "Antim Daur Ek", nameHi: "अंतिम दौर - एक" },
          { id: "bk8-ch7", name: "Antim Daur Do", nameHi: "अंतिम दौर - दो" },
          { id: "bk8-ch8", name: "Tanaav", nameHi: "तनाव" },
          { id: "bk8-ch9", name: "Do Pristhbhumiyaan", nameHi: "दो पृष्ठभूमियाँ - भारतीय और अंग्रेजी" },
        ]
      },
      {
        id: "hindi-8-buddhacharit",
        name: "Sankshipt Buddhacharit",
        nameHi: "संक्षिप्त बुद्धचरित",
        chapters: [
          { id: "bc8-ch1", name: "Buddh Ka Janam", nameHi: "बुद्ध का जन्म" },
          { id: "bc8-ch2", name: "Abhiniṣkraman", nameHi: "अभिनिष्क्रमण" },
          { id: "bc8-ch3", name: "Gyan Prapti", nameHi: "ज्ञान प्राप्ति" },
          { id: "bc8-ch4", name: "Dharmachakra Pravartan", nameHi: "धर्मचक्र प्रवर्तन" },
          { id: "bc8-ch5", name: "Mahaparinirvaan", nameHi: "महापरिनिर्वाण" },
        ]
      },
    ]
  },
  // ══════════════════════════════
  // संस्कृत
  // ══════════════════════════════
  {
    id: "sanskrit-8",
    name: "Sanskrit",
    nameHi: "संस्कृत",
    icon: "book",
    tabs: ["books"],
    books: [
      {
        id: "sanskrit-8-ruchira",
        ncertPdfCode: "hssu1",
        name: "Ruchira Triteeyo Bhagah",
        nameHi: "रुचिरा तृतीयो भागः",
        chapters: [
          { id: "ru8-ch1", name: "Subhashitaani", nameHi: "सुभाषितानि" },
          { id: "ru8-ch2", name: "Bilasya Vaani Na Kadaapi Me Shruta", nameHi: "बिलस्य वाणी न कदापि मे श्रुता" },
          { id: "ru8-ch3", name: "Digibharatam", nameHi: "डिजीभारतम्" },
          { id: "ru8-ch4", name: "Sadaiv Purato Nidhehi Charanam", nameHi: "सदैव पुरतो निधेहि चरणम्" },
          { id: "ru8-ch5", name: "Kantakenaiva Kantakam", nameHi: "कण्टकेनैव कण्टकम्" },
          { id: "ru8-ch6", name: "Griham Shunyam Sutaam Vina", nameHi: "गृहं शून्यं सुतां विना" },
          { id: "ru8-ch7", name: "Bharatjanataham", nameHi: "भारतजनताऽहम्" },
          { id: "ru8-ch8", name: "Sansaarsaagarasya Naayakaah", nameHi: "संसारसागरस्य नायकाः" },
          { id: "ru8-ch9", name: "Saptabhaginyah", nameHi: "सप्तभगिन्यः" },
          { id: "ru8-ch10", name: "Neetinavaneetam", nameHi: "नीतिनवनीतम्" },
          { id: "ru8-ch11", name: "Savitri Bai Phule", nameHi: "सावित्री बाई फुले" },
          { id: "ru8-ch12", name: "Kah Rakshati Kah Rakshitah", nameHi: "कः रक्षति कः रक्षितः" },
          { id: "ru8-ch13", name: "Kshitau Raajate Bharatswarnabhumih", nameHi: "क्षितौ राजते भारतस्वर्णभूमिः" },
          { id: "ru8-ch14", name: "Aryabhatah", nameHi: "आर्यभटः" },
        ]
      },
      {
        id: "sanskrit-8-deepakam",
        name: "Deepakam",
        nameHi: "दीपकम",
        chapters: [
          { id: "dp8-ch1", name: "Ish Stutih", nameHi: "ईश-स्तुतिः" },
          { id: "dp8-ch2", name: "Swasthyamev Param Dhanam", nameHi: "स्वास्थ्यमेव परं धनम्" },
          { id: "dp8-ch3", name: "Paropakaarah", nameHi: "परोपकारः" },
          { id: "dp8-ch4", name: "Vidyayaah Mahattvam", nameHi: "विद्यायाः महत्त्वम्" },
          { id: "dp8-ch5", name: "Asmaakam Deshah", nameHi: "अस्माकं देशः" },
          { id: "dp8-ch6", name: "Anushaasanam", nameHi: "अनुशासनम्" },
          { id: "dp8-ch7", name: "Satsangatih", nameHi: "सत्संगतिः" },
          { id: "dp8-ch8", name: "Paryaavaranaasya Mahattvam", nameHi: "पर्यावरणस्य महत्त्वम्" },
          { id: "dp8-ch9", name: "Parishramasya Phalam", nameHi: "परिश्रमस्य फलम्" },
          { id: "dp8-ch10", name: "Subhashitaani", nameHi: "सुभाषितानि (सूक्तयः)" },
        ]
      },
    ]
  },

  // ══════════════════════════════
  // अंग्रेजी
  // ══════════════════════════════
  {
    id: "english-8",
    name: "English",
    nameHi: "अंग्रेजी",
    icon: "book-open",
    tabs: ["books"],
    books: [
      {
        id: "english-8-poorvi",
        name: "Poorvi",
        nameHi: "Poorvi",
        chapters: [
          { id: "pv8-ch1", name: "The Bottle Imp", nameHi: "The Bottle Imp" },
          { id: "pv8-ch2", name: "Goodbye Party for Miss Pushpa T.S.", nameHi: "Goodbye Party for Miss Pushpa T.S." },
          { id: "pv8-ch3", name: "The Last Leaf", nameHi: "The Last Leaf" },
          { id: "pv8-ch4", name: "The Village Blacksmith", nameHi: "The Village Blacksmith" },
          { id: "pv8-ch5", name: "The Tsunami", nameHi: "The Tsunami" },
          { id: "pv8-ch6", name: "On the Grasshopper and Cricket", nameHi: "On the Grasshopper and Cricket" },
          { id: "pv8-ch7", name: "The School Boy", nameHi: "The School Boy" },
          { id: "pv8-ch8", name: "A Visit to Cambridge", nameHi: "A Visit to Cambridge" },
          { id: "pv8-ch9", name: "The Summit Within", nameHi: "The Summit Within" },
          { id: "pv8-ch10", name: "The Ant and the Cricket", nameHi: "The Ant and the Cricket" },
        ]
      },
      {
        id: "english-8-honeydew",
        ncertPdfCode: "heeh1",
        name: "Honeydew",
        nameHi: "Honeydew",
        chapters: [
          { id: "hd8-ch1", name: "The Best Christmas Present in the World", nameHi: "The Best Christmas Present in the World" },
          { id: "hd8-ch2", name: "The Tsunami", nameHi: "The Tsunami" },
          { id: "hd8-ch3", name: "Glimpses of the Past", nameHi: "Glimpses of the Past" },
          { id: "hd8-ch4", name: "Bepin Choudhury's Lapse of Memory", nameHi: "Bepin Choudhury's Lapse of Memory" },
          { id: "hd8-ch5", name: "The Summit Within", nameHi: "The Summit Within" },
          { id: "hd8-ch6", name: "This is Jody's Fawn", nameHi: "This is Jody's Fawn" },
          { id: "hd8-ch7", name: "A Visit to Cambridge", nameHi: "A Visit to Cambridge" },
          { id: "hd8-ch8", name: "A Short Monsoon Diary", nameHi: "A Short Monsoon Diary" },
        ]
      },
      {
        id: "english-8-itsohappened",
        name: "It So Happened",
        nameHi: "It So Happened",
        chapters: [
          { id: "is8-ch1", name: "How the Camel got his Hump", nameHi: "How the Camel got his Hump" },
          { id: "is8-ch2", name: "Children at Work", nameHi: "Children at Work" },
          { id: "is8-ch3", name: "The Selfish Giant", nameHi: "The Selfish Giant" },
          { id: "is8-ch4", name: "The Treasure Within", nameHi: "The Treasure Within" },
          { id: "is8-ch5", name: "Princess September", nameHi: "Princess September" },
          { id: "is8-ch6", name: "The Fight", nameHi: "The Fight" },
          { id: "is8-ch7", name: "The Jalebis", nameHi: "The Jalebis" },
          { id: "is8-ch8", name: "Ancient Education System of India", nameHi: "Ancient Education System of India" },
        ]
      },
    ]
  },
]
