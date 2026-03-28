import type { Stream, Subject } from "../types"

const accountancy11: Subject = {
  id: "accountancy-11",
  name: "Accountancy",
  nameHi: "लेखाशास्त्र",
  icon: "book",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "accountancy-11-part1",
        ncertPdfCode: "keac1",
      name: "Accountancy Part I",
      nameHi: "लेखाशास्त्र भाग 1",
      chapters: [
        { id: "acc11-ch1", name: "Introduction to Accounting", nameHi: "लेखांकन: एक परिचय" },
        { id: "acc11-ch2", name: "Theoretical Base of Accounting", nameHi: "लेखांकन के सैद्धांतिक आधार" },
        { id: "acc11-ch3", name: "Recording of Transactions - I", nameHi: "लेन-देनों का अभिलेखन - I" },
        { id: "acc11-ch4", name: "Recording of Transactions - II", nameHi: "लेन-देनों का अभिलेखन - II" },
        { id: "acc11-ch5", name: "Bank Reconciliation Statement", nameHi: "बैंक समाधान विवरण" },
      ]
    },
    {
      id: "accountancy-11-part2",
        ncertPdfCode: "keac2",
      name: "Accountancy Part II",
      nameHi: "लेखाशास्त्र भाग 2",
      chapters: [
        { id: "acc11-ch6", name: "Trial Balance and Rectification of Errors", nameHi: "तलपट एवं अशुद्धियों का शोधन" },
        { id: "acc11-ch7", name: "Depreciation, Provisions and Reserves", nameHi: "ह्रास, प्रावधान और संचय" },
        { id: "acc11-ch8", name: "Financial Statements - I", nameHi: "वित्तीय विवरण - I" },
        { id: "acc11-ch9", name: "Financial Statements - II", nameHi: "वित्तीय विवरण - II" },
      ]
    },
  ]
}

const businessStudies11: Subject = {
  id: "business-studies-11",
  name: "Business Studies",
  nameHi: "व्यवसाय अध्ययन",
  icon: "briefcase",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "business-11-part1",
      name: "Business Studies Part I",
      nameHi: "व्यवसाय अध्ययन भाग 1",
      chapters: [
        { id: "bst11-ch1", name: "Business, Trade and Commerce", nameHi: "व्यवसाय, व्यापार और वाणिज्य" },
        { id: "bst11-ch2", name: "Forms of Business Organisation", nameHi: "व्यावसायिक संगठन के स्वरूप" },
        { id: "bst11-ch3", name: "Private, Public and Global Enterprises", nameHi: "निजी, सार्वजनिक एवं भूमंडलीय उपक्रम" },
        { id: "bst11-ch4", name: "Business Services", nameHi: "व्यावसायिक सेवाएँ" },
        { id: "bst11-ch5", name: "Emerging Modes of Business", nameHi: "व्यवसाय की उभरती पद्धतियाँ" },
        { id: "bst11-ch6", name: "Social Responsibility and Business Ethics", nameHi: "व्यवसाय का सामाजिक उत्तरदायित्व एवं व्यावसायिक नैतिकता" },
      ]
    },
    {
      id: "business-11-part2",
      name: "Business Studies Part II",
      nameHi: "व्यवसाय अध्ययन भाग 2",
      chapters: [
        { id: "bst11-ch7", name: "Formation of a Company", nameHi: "कंपनी का निर्माण" },
        { id: "bst11-ch8", name: "Sources of Business Finance", nameHi: "व्यावसायिक वित्त के स्रोत" },
        { id: "bst11-ch9", name: "Small Business and Entrepreneurship", nameHi: "लघु व्यवसाय एवं उद्यमिता" },
        { id: "bst11-ch10", name: "Internal Trade", nameHi: "आंतरिक व्यापार" },
        { id: "bst11-ch11", name: "International Business", nameHi: "अंतर्राष्ट्रीय व्यापार" },
      ]
    },
  ]
}
const economics11com: Subject = {
  id: "economics-11-com",
  name: "Economics",
  nameHi: "अर्थशास्त्र",
  icon: "trending-up",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "economics-11-statistics",
        ncertPdfCode: "kees1",
      name: "Statistics for Economics",
      nameHi: "सांख्यिकी (अर्थशास्त्र के लिए)",
      chapters: [
        { id: "eco11-ch1", name: "Introduction", nameHi: "परिचय" },
        { id: "eco11-ch2", name: "Collection of Data", nameHi: "आँकड़ों का संग्रह" },
        { id: "eco11-ch3", name: "Organisation of Data", nameHi: "आँकड़ों का संगठन" },
        { id: "eco11-ch4", name: "Presentation of Data", nameHi: "आँकड़ों का प्रस्तुतीकरण" },
        { id: "eco11-ch5", name: "Measures of Central Tendency", nameHi: "केंद्रीय प्रवृत्ति के माप" },
        { id: "eco11-ch6", name: "Measures of Dispersion", nameHi: "परिक्षेपण के माप" },
        { id: "eco11-ch7", name: "Correlation", nameHi: "सहसंबंध" },
        { id: "eco11-ch8", name: "Index Numbers", nameHi: "सूचकांक" },
      ]
    },
    {
      id: "economics-11-indian",
        ncertPdfCode: "keec1",
      name: "Indian Economic Development",
      nameHi: "भारतीय अर्थव्यवस्था का विकास",
      chapters: [
        { id: "ied11-ch1", name: "Indian Economy on the Eve of Independence", nameHi: "स्वतंत्रता की पूर्व संध्या पर भारतीय अर्थव्यवस्था" },
        { id: "ied11-ch2", name: "Indian Economy (1950-1990)", nameHi: "भारतीय अर्थव्यवस्था (1950-1990)" },
        { id: "ied11-ch3", name: "Liberalisation, Privatisation and Globalisation", nameHi: "उदारीकरण, निजीकरण और वैश्वीकरण" },
        { id: "ied11-ch4", name: "Current Challenges of Indian Economy", nameHi: "भारतीय अर्थव्यवस्था की वर्तमान चुनौतियाँ" },
        { id: "ied11-ch5", name: "Comparative Development Experience of India", nameHi: "भारत और उसके पड़ोसी देशों का तुलनात्मक विकास अनुभव" },
      ]
    },
  ]
}

const appliedMath11: Subject = {
  id: "applied-math-11",
  name: "Applied Mathematics",
  nameHi: "अनुप्रयुक्त गणित",
  icon: "calculator",
  tabs: ["books", "iq", "quiz"],
  books: [
    {
      id: "applied-math-11-book",
      name: "Applied Mathematics",
      nameHi: "अनुप्रयुक्त गणित",
      chapters: [
        { id: "amath11-ch1", name: "Numbers, Quantification and Numerical Applications", nameHi: "संख्याएँ, परिमाणन और संख्यात्मक अनुप्रयोग" },
        { id: "amath11-ch2", name: "Algebra", nameHi: "बीजगणित" },
        { id: "amath11-ch3", name: "Mathematical Reasoning", nameHi: "गणितीय तर्क" },
        { id: "amath11-ch4", name: "Calculus", nameHi: "कैलकुलस" },
        { id: "amath11-ch5", name: "Probability", nameHi: "प्रायिकता" },
        { id: "amath11-ch6", name: "Descriptive Statistics", nameHi: "वर्णनात्मक सांख्यिकी" },
        { id: "amath11-ch7", name: "Financial Mathematics", nameHi: "वित्तीय गणित" },
        { id: "amath11-ch8", name: "Linear Programming", nameHi: "रैखिक प्रोग्रामन" },
      ]
    },
  ]
}

const english11com: Subject = {
  id: "english-11-com",
  name: "English",
  nameHi: "अंग्रेजी",
  icon: "book-open",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "english-11-com-hornbill",
      name: "Hornbill",
      nameHi: "Hornbill",
      chapters: [
        { id: "eng11com-ch1", name: "The Portrait of a Lady", nameHi: "The Portrait of a Lady" },
        { id: "eng11com-ch2", name: "We're Not Afraid to Die", nameHi: "We're Not Afraid to Die" },
        { id: "eng11com-ch3", name: "Discovering Tut: the Saga Continues", nameHi: "Discovering Tut: the Saga Continues" },
        { id: "eng11com-ch4", name: "The Adventure", nameHi: "The Adventure" },
        { id: "eng11com-ch5", name: "Silk Road", nameHi: "Silk Road" },
        { id: "eng11com-ch6", name: "A Photograph", nameHi: "A Photograph" },
        { id: "eng11com-ch7", name: "The Laburnum Top", nameHi: "The Laburnum Top" },
        { id: "eng11com-ch8", name: "The Voice of the Rain", nameHi: "The Voice of the Rain" },
        { id: "eng11com-ch9", name: "Childhood", nameHi: "Childhood" },
        { id: "eng11com-ch10", name: "Father to Son", nameHi: "Father to Son" },
      ]
    },
    {
      id: "english-11-com-snapshots",
      name: "Snapshots",
      nameHi: "Snapshots",
      chapters: [
        { id: "snap11com-ch1", name: "The Summer of the Beautiful White Horse", nameHi: "The Summer of the Beautiful White Horse" },
        { id: "snap11com-ch2", name: "The Address", nameHi: "The Address" },
        { id: "snap11com-ch3", name: "Mother's Day", nameHi: "Mother's Day" },
        { id: "snap11com-ch4", name: "Birth", nameHi: "Birth" },
        { id: "snap11com-ch5", name: "The Tale of Melon City", nameHi: "The Tale of Melon City" },
      ]
    },
  ]
}

const hindi11com: Subject = {
  id: "hindi-11-com",
  name: "Hindi",
  nameHi: "हिंदी",
  icon: "book",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "hindi-11-com-aroh",
      name: "Aroh Bhag 1",
      nameHi: "आरोह भाग 1",
      chapters: [
        { id: "hin11com-ch1", name: "Pad (Kabir)", nameHi: "पद (कबीर)" },
        { id: "hin11com-ch2", name: "Pad (Meera)", nameHi: "पद (मीरा)" },
        { id: "hin11com-ch3", name: "Ghar Ki Yaad", nameHi: "घर की याद" },
        { id: "hin11com-ch4", name: "Champa Kaale-Kaale Achhar Nahi Cheenhti", nameHi: "चंपा काले-काले अच्छर नहीं चीन्हती" },
        { id: "hin11com-ch5", name: "Dushyant Kumar Ki Gazalen", nameHi: "दुष्यंत कुमार की गज़लें" },
        { id: "hin11com-ch6", name: "He Bhookh! Mat Machal", nameHi: "हे भूख! मत मचल" },
        { id: "hin11com-ch7", name: "Sabse Khatarnak", nameHi: "सबसे खतरनाक" },
        { id: "hin11com-ch8", name: "Aao Milkar Bachaayen", nameHi: "आओ, मिलकर बचाएँ" },
        { id: "hin11com-ch9", name: "Namak Ka Daroga", nameHi: "नमक का दारोगा" },
        { id: "hin11com-ch10", name: "Miyan Naseeruddin", nameHi: "मियाँ नसीरुद्दीन" },
        { id: "hin11com-ch11", name: "Apu Ke Saath Dhai Saal", nameHi: "अपू के साथ ढाई साल" },
        { id: "hin11com-ch12", name: "Vidaai Sambhashan", nameHi: "विदाई-संभाषण" },
        { id: "hin11com-ch13", name: "Galta Loha", nameHi: "गलता लोहा" },
        { id: "hin11com-ch14", name: "Rajni", nameHi: "रजनी" },
        { id: "hin11com-ch15", name: "Jamun Ka Ped", nameHi: "जामुन का पेड़" },
        { id: "hin11com-ch16", name: "Bharat Mata", nameHi: "भारत माता" },
      ]
    },
    {
      id: "hindi-11-com-vitan",
      name: "Vitan Bhag 1",
      nameHi: "वितान भाग 1",
      chapters: [
        { id: "vit11com-ch1", name: "Bharatiya Gayikaon Mein Bezod: Lata Mangeshkar", nameHi: "भारतीय गायिकाओं में बेजोड़: लता मंगेशकर" },
        { id: "vit11com-ch2", name: "Rajasthan Ki Rajat Boonden", nameHi: "राजस्थान की रजत बूँदें" },
        { id: "vit11com-ch3", name: "Aalo-Andhari", nameHi: "आलो-आँधारि" },
        { id: "vit11com-ch4", name: "Bharatiya Kalaen", nameHi: "भारतीय कलाएँ" },
      ]
    },
  ]
}

export const class11CommerceStream: Stream = {
  id: "commerce-11",
  name: "Commerce",
  nameHi: "वाणिज्य",
  subjects: [
    accountancy11,
    businessStudies11,
    economics11com,
    appliedMath11,
    english11com,
    hindi11com,
  ]
         }
         
