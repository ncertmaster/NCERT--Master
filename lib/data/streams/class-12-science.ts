import type { Stream, Subject } from "../types"

const physics12: Subject = {
  id: "physics-12",
  name: "Physics",
  nameHi: "भौतिक विज्ञान",
  icon: "atom",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "physics-12-part1",
      name: "Physics Part I",
      nameHi: "भौतिक विज्ञान भाग 1",
      chapters: [
        { id: "phy12-ch1", name: "Electric Charges and Fields", nameHi: "वैद्युत आवेश तथा क्षेत्र" },
        { id: "phy12-ch2", name: "Electrostatic Potential and Capacitance", nameHi: "स्थिरवैद्युत विभव तथा धारिता" },
        { id: "phy12-ch3", name: "Current Electricity", nameHi: "विद्युत धारा" },
        { id: "phy12-ch4", name: "Moving Charges and Magnetism", nameHi: "गतिमान आवेश और चुंबकत्व" },
        { id: "phy12-ch5", name: "Magnetism and Matter", nameHi: "चुंबकत्व एवं द्रव्य" },
        { id: "phy12-ch6", name: "Electromagnetic Induction", nameHi: "वैद्युतचुंबकीय प्रेरण" },
        { id: "phy12-ch7", name: "Alternating Current", nameHi: "प्रत्यावर्ती धारा" },
        { id: "phy12-ch8", name: "Electromagnetic Waves", nameHi: "वैद्युतचुंबकीय तरंगें" },
      ]
    },
    {
      id: "physics-12-part2",
      name: "Physics Part II",
      nameHi: "भौतिक विज्ञान भाग 2",
      chapters: [
        { id: "phy12-ch9", name: "Ray Optics and Optical Instruments", nameHi: "किरण प्रकाशिकी एवं प्रकाशिक यंत्र" },
        { id: "phy12-ch10", name: "Wave Optics", nameHi: "तरंग-प्रकाशिकी" },
        { id: "phy12-ch11", name: "Dual Nature of Radiation and Matter", nameHi: "विकिरण तथा द्रव्य की द्वैत प्रकृति" },
        { id: "phy12-ch12", name: "Atoms", nameHi: "परमाणु" },
        { id: "phy12-ch13", name: "Nuclei", nameHi: "नाभिक" },
        { id: "phy12-ch14", name: "Semiconductor Electronics", nameHi: "अर्धचालक इलेक्ट्रॉनिकी: पदार्थ, युक्तियाँ तथा सरल परिपथ" },
      ]
    },
  ]
}

const chemistry12: Subject = {
  id: "chemistry-12",
  name: "Chemistry",
  nameHi: "रसायन विज्ञान",
  icon: "flask",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "chemistry-12-part1",
      name: "Chemistry Part I",
      nameHi: "रसायन विज्ञान भाग 1",
      chapters: [
        { id: "chem12-ch1", name: "Solutions", nameHi: "विलयन" },
        { id: "chem12-ch2", name: "Electrochemistry", nameHi: "वैद्युतरसायन" },
        { id: "chem12-ch3", name: "Chemical Kinetics", nameHi: "रासायनिक बलगतिकी" },
        { id: "chem12-ch4", name: "The d- and f- Block Elements", nameHi: "d- एवं f- ब्लॉक के तत्व" },
        { id: "chem12-ch5", name: "Coordination Compounds", nameHi: "उपसहसंयोजन यौगिक" },
      ]
    },
    {
      id: "chemistry-12-part2",
      name: "Chemistry Part II",
      nameHi: "रसायन विज्ञान भाग 2",
      chapters: [
        { id: "chem12-ch6", name: "Haloalkanes and Haloarenes", nameHi: "हैलोऐल्केन तथा हैलोऐरीन" },
        { id: "chem12-ch7", name: "Alcohols, Phenols and Ethers", nameHi: "ऐल्कोहॉल, फ़ीनॉल एवं ईथर" },
        { id: "chem12-ch8", name: "Aldehydes, Ketones and Carboxylic Acids", nameHi: "ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल" },
        { id: "chem12-ch9", name: "Amines", nameHi: "ऐमीन" },
        { id: "chem12-ch10", name: "Biomolecules", nameHi: "जैव-अणु" },
      ]
    },
  ]
         }
const biology12: Subject = {
  id: "biology-12",
  name: "Biology",
  nameHi: "जीव विज्ञान",
  icon: "leaf",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "biology-12-part1",
      name: "Biology Part I",
      nameHi: "जीव विज्ञान भाग 1",
      chapters: [
        { id: "bio12-ch1", name: "Sexual Reproduction in Flowering Plants", nameHi: "पुष्पी पादपों में लैंगिक जनन" },
        { id: "bio12-ch2", name: "Human Reproduction", nameHi: "मानव जनन" },
        { id: "bio12-ch3", name: "Reproductive Health", nameHi: "जनन स्वास्थ्य" },
        { id: "bio12-ch4", name: "Principles of Inheritance and Variation", nameHi: "वंशागति तथा विविधता के सिद्धांत" },
        { id: "bio12-ch5", name: "Molecular Basis of Inheritance", nameHi: "वंशागति के आणविक आधार" },
        { id: "bio12-ch6", name: "Evolution", nameHi: "विकास" },
        { id: "bio12-ch7", name: "Human Health and Disease", nameHi: "मानव स्वास्थ्य तथा रोग" },
      ]
    },
    {
      id: "biology-12-part2",
      name: "Biology Part II",
      nameHi: "जीव विज्ञान भाग 2",
      chapters: [
        { id: "bio12-ch8", name: "Microbes in Human Welfare", nameHi: "मानव कल्याण में सूक्ष्मजीव" },
        { id: "bio12-ch9", name: "Biotechnology: Principles and Processes", nameHi: "जैव प्रौद्योगिकी: सिद्धांत एवं प्रक्रम" },
        { id: "bio12-ch10", name: "Biotechnology and its Applications", nameHi: "जैव प्रौद्योगिकी एवं उसके उपयोग" },
        { id: "bio12-ch11", name: "Organisms and Populations", nameHi: "जीव और समष्टियाँ" },
        { id: "bio12-ch12", name: "Ecosystem", nameHi: "पारितंत्र" },
        { id: "bio12-ch13", name: "Biodiversity and Conservation", nameHi: "जैव-विविधता एवं संरक्षण" },
      ]
    },
  ]
}

const math12: Subject = {
  id: "math-12",
  name: "Mathematics",
  nameHi: "गणित",
  icon: "calculator",
  tabs: ["books", "iq", "quiz"],
  books: [
    {
      id: "math-12-part1",
      name: "Mathematics Part I",
      nameHi: "गणित भाग 1",
      chapters: [
        { id: "math12-ch1", name: "Relations and Functions", nameHi: "संबंध एवं फलन" },
        { id: "math12-ch2", name: "Inverse Trigonometric Functions", nameHi: "प्रतिलोम त्रिकोणमितीय फलन" },
        { id: "math12-ch3", name: "Matrices", nameHi: "आव्यूह" },
        { id: "math12-ch4", name: "Determinants", nameHi: "सारणिक" },
        { id: "math12-ch5", name: "Continuity and Differentiability", nameHi: "सांतत्य तथा अवकलनीयता" },
        { id: "math12-ch6", name: "Application of Derivatives", nameHi: "अवकलज के अनुप्रयोग" },
      ]
    },
    {
      id: "math-12-part2",
      name: "Mathematics Part II",
      nameHi: "गणित भाग 2",
      chapters: [
        { id: "math12-ch7", name: "Integrals", nameHi: "समाकलन" },
        { id: "math12-ch8", name: "Application of Integrals", nameHi: "समाकलनों के अनुप्रयोग" },
        { id: "math12-ch9", name: "Differential Equations", nameHi: "अवकल समीकरण" },
        { id: "math12-ch10", name: "Vector Algebra", nameHi: "सदिश बीजगणित" },
        { id: "math12-ch11", name: "Three Dimensional Geometry", nameHi: "त्रिविमीय ज्यामिति" },
        { id: "math12-ch12", name: "Linear Programming", nameHi: "रैखिक प्रोग्रामन" },
        { id: "math12-ch13", name: "Probability", nameHi: "प्रायिकता" },
      ]
    },
  ]
}
const english12: Subject = {
  id: "english-12",
  name: "English",
  nameHi: "अंग्रेजी",
  icon: "book-open",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "english-12-flamingo",
      name: "Flamingo",
      nameHi: "Flamingo",
      chapters: [
        { id: "eng12-ch1", name: "The Last Lesson", nameHi: "The Last Lesson" },
        { id: "eng12-ch2", name: "Lost Spring", nameHi: "Lost Spring" },
        { id: "eng12-ch3", name: "Deep Water", nameHi: "Deep Water" },
        { id: "eng12-ch4", name: "The Rattrap", nameHi: "The Rattrap" },
        { id: "eng12-ch5", name: "Indigo", nameHi: "Indigo" },
        { id: "eng12-ch6", name: "Poets and Pancakes", nameHi: "Poets and Pancakes" },
        { id: "eng12-ch7", name: "The Interview", nameHi: "The Interview" },
        { id: "eng12-ch8", name: "Going Places", nameHi: "Going Places" },
        { id: "eng12-ch9", name: "My Mother at Sixty-six", nameHi: "My Mother at Sixty-six" },
        { id: "eng12-ch10", name: "Keeping Quiet", nameHi: "Keeping Quiet" },
        { id: "eng12-ch11", name: "A Thing of Beauty", nameHi: "A Thing of Beauty" },
        { id: "eng12-ch12", name: "A Roadside Stand", nameHi: "A Roadside Stand" },
        { id: "eng12-ch13", name: "Aunt Jennifer's Tigers", nameHi: "Aunt Jennifer's Tigers" },
      ]
    },
    {
      id: "english-12-vistas",
      name: "Vistas",
      nameHi: "Vistas",
      chapters: [
        { id: "vis12-ch1", name: "The Third Level", nameHi: "The Third Level" },
        { id: "vis12-ch2", name: "The Tiger King", nameHi: "The Tiger King" },
        { id: "vis12-ch3", name: "Journey to the End of the Earth", nameHi: "Journey to the End of the Earth" },
        { id: "vis12-ch4", name: "The Enemy", nameHi: "The Enemy" },
        { id: "vis12-ch5", name: "On the Face of It", nameHi: "On the Face of It" },
        { id: "vis12-ch6", name: "Memories of Childhood", nameHi: "Memories of Childhood" },
      ]
    },
  ]
}

const hindi12: Subject = {
  id: "hindi-12",
  name: "Hindi",
  nameHi: "हिंदी",
  icon: "book",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "hindi-12-aroh",
      name: "Aroh Bhag 2",
      nameHi: "आरोह भाग 2",
      chapters: [
        { id: "hin12-ch1", name: "Aatmaparichay, Ek Geet", nameHi: "आत्मपरिचय, एक गीत" },
        { id: "hin12-ch2", name: "Patang", nameHi: "पतंग" },
        { id: "hin12-ch3", name: "Kavita Ke Bahane, Baat Seedhi Thi Par", nameHi: "कविता के बहाने, बात सीधी थी पर" },
        { id: "hin12-ch4", name: "Kaimere Mein Band Apahij", nameHi: "कैमरे में बंद अपाहिज" },
        { id: "hin12-ch5", name: "Saharse Sweekaara Hai", nameHi: "सहर्ष स्वीकारा है" },
        { id: "hin12-ch6", name: "Usha", nameHi: "उषा" },
        { id: "hin12-ch7", name: "Kavitavali, Lakshman-Murchha aur Ram Ka Vilaap", nameHi: "कवितावली, लक्ष्मण-मूर्छा और राम का विलाप" },
        { id: "hin12-ch8", name: "Rubaiyan", nameHi: "रुबाइयाँ" },
        { id: "hin12-ch9", name: "Chhota Mera Khet, Bagulon Ke Pankh", nameHi: "छोटा मेरा खेत, बगुलों के पंख" },
        { id: "hin12-ch10", name: "Bhaktin", nameHi: "भक्तिन" },
        { id: "hin12-ch11", name: "Bazaar Darshan", nameHi: "बाजार दर्शन" },
        { id: "hin12-ch12", name: "Kaale Megha Paani De", nameHi: "काले मेघा पानी दे" },
        { id: "hin12-ch13", name: "Pahalwaan Ki Dholak", nameHi: "पहलवान की ढोलक" },
        { id: "hin12-ch14", name: "Shirish Ke Phool", nameHi: "शिरीष के फूल" },
        { id: "hin12-ch15", name: "Shram Vibhajan aur Jati Pratha", nameHi: "श्रम विभाजन और जाति प्रथा" },
      ]
    },
    {
      id: "hindi-12-vitan",
      name: "Vitan Bhag 2",
      nameHi: "वितान भाग 2",
      chapters: [
        { id: "vit12-ch1", name: "Silver Wedding", nameHi: "सिल्वर वैडिंग" },
        { id: "vit12-ch2", name: "Jujh", nameHi: "जूझ" },
        { id: "vit12-ch3", name: "Ateet Mein Dabe Paon", nameHi: "अतीत में दबे पाँव" },
      ]
    },
    {
      id: "hindi-12-abhivyakti",
      name: "Abhivyakti aur Madhyam",
      nameHi: "अभिव्यक्ति और माध्यम",
      chapters: [
        { id: "abh12-ch1", name: "Writing for Various Media", nameHi: "विभिन्न माध्यमों के लिए लेखन" },
        { id: "abh12-ch2", name: "Forms of Journalistic Writing", nameHi: "पत्रकारीय लेखन के विभिन्न रूप और लेखन प्रक्रिया" },
        { id: "abh12-ch3", name: "Special Writing: Form and Types", nameHi: "विशेष लेखन - स्वरूप और प्रकार" },
        { id: "abh12-ch4", name: "How Poetry is Written", nameHi: "कैसे बनती है कविता" },
        { id: "abh12-ch5", name: "Grammar of Playwriting", nameHi: "नाटक लिखने की व्याकरण" },
        { id: "abh12-ch6", name: "How to Write a Story", nameHi: "कैसे लिखें कहानी" },
        { id: "abh12-ch7", name: "Writing on New and Unexpected Topics", nameHi: "नए और अप्रत्याशित विषयों पर लेखन" },
      ]
    },
  ]
}

export const class12ScienceStream: Stream = {
  id: "science-12",
  name: "Science",
  nameHi: "विज्ञान",
  subjects: [
    physics12,
    chemistry12,
    biology12,
    math12,
    english12,
    hindi12,
  ]
}
