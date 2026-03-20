import type { Stream, Subject } from "../types"

const accountancy12: Subject = {
  id: "accountancy-12",
  name: "Accountancy",
  nameHi: "लेखाशास्त्र",
  icon: "book",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "accountancy-12-part1",
      name: "Accountancy Part I",
      nameHi: "लेखाशास्त्र भाग 1",
      chapters: [
        { id: "acc12-ch1", name: "Accounting for Partnership: Basic Concepts", nameHi: "साझेदारी लेखांकन – आधारभूत अवधारणाएँ" },
        { id: "acc12-ch2", name: "Reconstitution of Partnership: Admission of Partner", nameHi: "साझेदारी फर्म का पुनर्गठन: साझेदार का प्रवेश" },
        { id: "acc12-ch3", name: "Reconstitution of Partnership: Retirement and Death", nameHi: "साझेदार का अवकाश ग्रहण और मृत्यु" },
        { id: "acc12-ch4", name: "Dissolution of Partnership Firm", nameHi: "साझेदारी फर्म का विघटन" },
      ]
    },
    {
      id: "accountancy-12-part2",
      name: "Accountancy Part II",
      nameHi: "लेखाशास्त्र भाग 2",
      chapters: [
        { id: "acc12-ch5", name: "Accounting for Share Capital", nameHi: "अंश पूँजी के लिए लेखांकन" },
        { id: "acc12-ch6", name: "Issue and Redemption of Debentures", nameHi: "ऋणपत्रों का निर्गमन एवं मोचन" },
        { id: "acc12-ch7", name: "Financial Statements of a Company", nameHi: "कंपनी के वित्तीय विवरण" },
        { id: "acc12-ch8", name: "Analysis of Financial Statements", nameHi: "वित्तीय विवरणों का विश्लेषण" },
        { id: "acc12-ch9", name: "Accounting Ratios", nameHi: "लेखांकन अनुपात" },
        { id: "acc12-ch10", name: "Cash Flow Statement", nameHi: "रोकड़ प्रवाह विवरण" },
      ]
    },
  ]
}

const businessStudies12: Subject = {
  id: "business-studies-12",
  name: "Business Studies",
  nameHi: "व्यवसाय अध्ययन",
  icon: "briefcase",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "business-12-part1",
      name: "Business Studies Part I",
      nameHi: "व्यवसाय अध्ययन भाग 1",
      chapters: [
        { id: "bst12-ch1", name: "Nature and Significance of Management", nameHi: "प्रबंध की प्रकृति एवं महत्व" },
        { id: "bst12-ch2", name: "Principles of Management", nameHi: "प्रबंध के सिद्धांत" },
        { id: "bst12-ch3", name: "Business Environment", nameHi: "व्यावसायिक पर्यावरण" },
        { id: "bst12-ch4", name: "Planning", nameHi: "नियोजन" },
        { id: "bst12-ch5", name: "Organising", nameHi: "संगठन" },
        { id: "bst12-ch6", name: "Staffing", nameHi: "नियुक्तिकरण" },
        { id: "bst12-ch7", name: "Directing", nameHi: "निर्देशन" },
        { id: "bst12-ch8", name: "Controlling", nameHi: "नियंत्रण" },
      ]
    },
    {
      id: "business-12-part2",
      name: "Business Studies Part II",
      nameHi: "व्यवसाय अध्ययन भाग 2",
      chapters: [
        { id: "bst12-ch9", name: "Financial Management", nameHi: "व्यावसायिक वित्त" },
        { id: "bst12-ch10", name: "Financial Markets", nameHi: "वित्तीय बाज़ार" },
        { id: "bst12-ch11", name: "Marketing Management", nameHi: "विपणन प्रबंध" },
        { id: "bst12-ch12", name: "Consumer Protection", nameHi: "उपभोक्ता संरक्षण" },
      ]
    },
  ]
}

const economics12com: Subject = {
  id: "economics-12-com",
  name: "Economics",
  nameHi: "अर्थशास्त्र",
  icon: "trending-up",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "economics-12-micro",
      name: "Introductory Microeconomics",
      nameHi: "व्यष्टि अर्थशास्त्र एक परिचय",
      chapters: [
        { id: "mic12-ch1", name: "Introduction", nameHi: "परिचय" },
        { id: "mic12-ch2", name: "Theory of Consumer Behaviour", nameHi: "उपभोक्ता के व्यवहार का सिद्धांत" },
        { id: "mic12-ch3", name: "Production and Costs", nameHi: "उत्पादन तथा लागत" },
        { id: "mic12-ch4", name: "Theory of the Firm under Perfect Competition", nameHi: "पूर्ण प्रतिस्पर्धा की स्थिति में फर्म का सिद्धांत" },
        { id: "mic12-ch5", name: "Market Equilibrium", nameHi: "बाज़ार संतुलन" },
        { id: "mic12-ch6", name: "Non-Competitive Markets", nameHi: "प्रतिस्पर्धारहित बाज़ार" },
      ]
    },
    {
      id: "economics-12-macro",
      name: "Introductory Macroeconomics",
      nameHi: "समष्टि अर्थशास्त्र एक परिचय",
      chapters: [
        { id: "mac12-ch1", name: "Introduction", nameHi: "परिचय" },
        { id: "mac12-ch2", name: "National Income Accounting", nameHi: "राष्ट्रीय आय का लेखांकन" },
        { id: "mac12-ch3", name: "Money and Banking", nameHi: "मुद्रा और बैंकिंग" },
        { id: "mac12-ch4", name: "Determination of Income and Employment", nameHi: "आय और रोजगार का निर्धारण" },
        { id: "mac12-ch5", name: "Government Budget and the Economy", nameHi: "सरकारी बजट एवं अर्थव्यवस्था" },
        { id: "mac12-ch6", name: "Open Economy Macroeconomics", nameHi: "खुली अर्थव्यवस्था - समष्टि अर्थशास्त्र" },
      ]
    },
  ]
}
const appliedMath12: Subject = {
  id: "applied-math-12",
  name: "Applied Mathematics",
  nameHi: "अनुप्रयुक्त गणित",
  icon: "calculator",
  tabs: ["books", "iq", "quiz"],
  books: [
    {
      id: "applied-math-12-book",
      name: "Applied Mathematics",
      nameHi: "अनुप्रयुक्त गणित",
      chapters: [
        { id: "amath12-ch1", name: "Numbers, Quantification and Numerical Applications", nameHi: "संख्याएँ, परिमाणन और संख्यात्मक अनुप्रयोग" },
        { id: "amath12-ch2", name: "Algebra (Matrices & Determinants)", nameHi: "बीजगणित (आव्यूह एवं सारणिक)" },
        { id: "amath12-ch3", name: "Calculus (Differentiation & Integration)", nameHi: "कैलकुलस (अवकलन एवं समाकलन)" },
        { id: "amath12-ch4", name: "Probability Distribution", nameHi: "प्रायिकता वितरण" },
        { id: "amath12-ch5", name: "Inferential Statistics", nameHi: "अनुक्रमिक सांख्यिकी" },
        { id: "amath12-ch6", name: "Index Numbers and Time Series", nameHi: "समयबद्ध श्रेणी (सूचकांक एवं समय श्रेणी)" },
        { id: "amath12-ch7", name: "Financial Mathematics", nameHi: "वित्तीय गणित" },
        { id: "amath12-ch8", name: "Linear Programming", nameHi: "रैखिक प्रोग्रामन" },
      ]
    },
  ]
}

const informaticsPractices12: Subject = {
  id: "informatics-12",
  name: "Informatics Practices",
  nameHi: "इन्फॉर्मेटिक्स प्रैक्टिसेस",
  icon: "globe",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "informatics-12-book",
      name: "Informatics Practices",
      nameHi: "इन्फॉर्मेटिक्स प्रैक्टिसेस",
      chapters: [
        { id: "ip12-ch1", name: "Data Handling using Pandas and Matplotlib", nameHi: "डेटा हैंडलिंग (Pandas और Matplotlib)" },
        { id: "ip12-ch2", name: "Database Query using SQL", nameHi: "डेटाबेस क्वेरी (SQL)" },
        { id: "ip12-ch3", name: "Introduction to Computer Networks", nameHi: "कंप्यूटर नेटवर्क का परिचय" },
        { id: "ip12-ch4", name: "Societal Impacts", nameHi: "सामाजिक प्रभाव" },
      ]
    },
  ]
}

const entrepreneurship12: Subject = {
  id: "entrepreneurship-12",
  name: "Entrepreneurship",
  nameHi: "उद्यमिता",
  icon: "trending-up",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "entrepreneurship-12-book",
      name: "Entrepreneurship",
      nameHi: "उद्यमिता",
      chapters: [
        { id: "ent12-ch1", name: "Entrepreneurial Opportunity", nameHi: "उद्यमी अवसर" },
        { id: "ent12-ch2", name: "Entrepreneurial Planning", nameHi: "उद्यमी नियोजन" },
        { id: "ent12-ch3", name: "Enterprise Marketing", nameHi: "उद्यम विपणन" },
        { id: "ent12-ch4", name: "Enterprise Growth Strategies", nameHi: "उद्यम विकास रणनीतियाँ" },
        { id: "ent12-ch5", name: "Business Arithmetic", nameHi: "व्यावसायिक अंकगणित" },
        { id: "ent12-ch6", name: "Resource Mobilization", nameHi: "संसाधन जुटाना" },
      ]
    },
  ]
}

const english12com: Subject = {
  id: "english-12-com",
  name: "English",
  nameHi: "अंग्रेजी",
  icon: "book-open",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "english-12-com-flamingo",
      name: "Flamingo",
      nameHi: "Flamingo",
      chapters: [
        { id: "eng12com-ch1", name: "The Last Lesson", nameHi: "The Last Lesson" },
        { id: "eng12com-ch2", name: "Lost Spring", nameHi: "Lost Spring" },
        { id: "eng12com-ch3", name: "Deep Water", nameHi: "Deep Water" },
        { id: "eng12com-ch4", name: "The Rattrap", nameHi: "The Rattrap" },
        { id: "eng12com-ch5", name: "Indigo", nameHi: "Indigo" },
        { id: "eng12com-ch6", name: "Poets and Pancakes", nameHi: "Poets and Pancakes" },
        { id: "eng12com-ch7", name: "The Interview", nameHi: "The Interview" },
        { id: "eng12com-ch8", name: "Going Places", nameHi: "Going Places" },
        { id: "eng12com-ch9", name: "My Mother at Sixty-six", nameHi: "My Mother at Sixty-six" },
        { id: "eng12com-ch10", name: "Keeping Quiet", nameHi: "Keeping Quiet" },
        { id: "eng12com-ch11", name: "A Thing of Beauty", nameHi: "A Thing of Beauty" },
        { id: "eng12com-ch12", name: "A Roadside Stand", nameHi: "A Roadside Stand" },
        { id: "eng12com-ch13", name: "Aunt Jennifer's Tigers", nameHi: "Aunt Jennifer's Tigers" },
      ]
    },
    {
      id: "english-12-com-vistas",
      name: "Vistas",
      nameHi: "Vistas",
      chapters: [
        { id: "vis12com-ch1", name: "The Third Level", nameHi: "The Third Level" },
        { id: "vis12com-ch2", name: "The Tiger King", nameHi: "The Tiger King" },
        { id: "vis12com-ch3", name: "Journey to the End of the Earth", nameHi: "Journey to the End of the Earth" },
        { id: "vis12com-ch4", name: "The Enemy", nameHi: "The Enemy" },
        { id: "vis12com-ch5", name: "On the Face of It", nameHi: "On the Face of It" },
        { id: "vis12com-ch6", name: "Memories of Childhood", nameHi: "Memories of Childhood" },
      ]
    },
  ]
}

const hindi12com: Subject = {
  id: "hindi-12-com",
  name: "Hindi",
  nameHi: "हिंदी",
  icon: "book",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "hindi-12-com-aroh",
      name: "Aroh Bhag 2",
      nameHi: "आरोह भाग 2",
      chapters: [
        { id: "hin12com-ch1", name: "Aatmaparichay, Ek Geet", nameHi: "आत्मपरिचय, एक गीत" },
        { id: "hin12com-ch2", name: "Patang", nameHi: "पतंग" },
        { id: "hin12com-ch3", name: "Kavita Ke Bahane, Baat Seedhi Thi Par", nameHi: "कविता के बहाने, बात सीधी थी पर" },
        { id: "hin12com-ch4", name: "Kaimere Mein Band Apahij", nameHi: "कैमरे में बंद अपाहिज" },
        { id: "hin12com-ch5", name: "Saharse Sweekaara Hai", nameHi: "सहर्ष स्वीकारा है" },
        { id: "hin12com-ch6", name: "Usha", nameHi: "उषा" },
        { id: "hin12com-ch7", name: "Kavitavali, Lakshman-Murchha aur Ram Ka Vilaap", nameHi: "कवितावली, लक्ष्मण-मूर्छा और राम का विलाप" },
        { id: "hin12com-ch8", name: "Rubaiyan", nameHi: "रुबाइयाँ" },
        { id: "hin12com-ch9", name: "Chhota Mera Khet, Bagulon Ke Pankh", nameHi: "छोटा मेरा खेत, बगुलों के पंख" },
        { id: "hin12com-ch10", name: "Bhaktin", nameHi: "भक्तिन" },
        { id: "hin12com-ch11", name: "Bazaar Darshan", nameHi: "बाजार दर्शन" },
        { id: "hin12com-ch12", name: "Kaale Megha Paani De", nameHi: "काले मेघा पानी दे" },
        { id: "hin12com-ch13", name: "Pahalwaan Ki Dholak", nameHi: "पहलवान की ढोलक" },
        { id: "hin12com-ch14", name: "Shirish Ke Phool", nameHi: "शिरीष के फूल" },
        { id: "hin12com-ch15", name: "Shram Vibhajan aur Jati Pratha", nameHi: "श्रम विभाजन और जाति प्रथा" },
      ]
    },
    {
      id: "hindi-12-com-vitan",
      name: "Vitan Bhag 2",
      nameHi: "वितान भाग 2",
      chapters: [
        { id: "vit12com-ch1", name: "Silver Wedding", nameHi: "सिल्वर वैडिंग" },
        { id: "vit12com-ch2", name: "Jujh", nameHi: "जूझ" },
        { id: "vit12com-ch3", name: "Ateet Mein Dabe Paon", nameHi: "अतीत में दबे पाँव" },
      ]
    },
    {
      id: "hindi-12-com-abhivyakti",
      name: "Abhivyakti aur Madhyam",
      nameHi: "अभिव्यक्ति और माध्यम",
      chapters: [
        { id: "abh12com-ch1", name: "Writing for Various Media", nameHi: "विभिन्न माध्यमों के लिए लेखन" },
        { id: "abh12com-ch2", name: "Forms of Journalistic Writing", nameHi: "पत्रकारीय लेखन के विभिन्न रूप" },
        { id: "abh12com-ch3", name: "Special Writing", nameHi: "विशेष लेखन" },
        { id: "abh12com-ch4", name: "How Poetry is Written", nameHi: "कैसे बनती है कविता" },
        { id: "abh12com-ch5", name: "Grammar of Playwriting", nameHi: "नाटक लिखने की व्याकरण" },
        { id: "abh12com-ch6", name: "How to Write a Story", nameHi: "कैसे लिखें कहानी" },
        { id: "abh12com-ch7", name: "Writing on New Topics", nameHi: "नए विषयों पर लेखन" },
      ]
    },
  ]
}

export const class12CommerceStream: Stream = {
  id: "commerce",
  name: "Commerce",
  nameHi: "वाणिज्य",
  subjects: [
    accountancy12,
    businessStudies12,
    economics12com,
    appliedMath12,
    informaticsPractices12,
    entrepreneurship12,
    english12com,
    hindi12com,
  ]
      }
