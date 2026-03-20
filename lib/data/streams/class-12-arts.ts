import type { Stream, Subject } from "../types"

const history12: Subject = {
  id: "history-12",
  name: "History",
  nameHi: "इतिहास",
  icon: "book",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "history-12-part1",
      name: "Themes in Indian History Part I",
      nameHi: "भारतीय इतिहास के कुछ विषय भाग 1",
      chapters: [
        { id: "his12-ch1", name: "Bricks, Beads and Bones (Harappan Civilisation)", nameHi: "ईंटें, मनके तथा अस्थियाँ (हड़प्पा सभ्यता)" },
        { id: "his12-ch2", name: "Kings, Farmers and Towns (Early States)", nameHi: "राजा, किसान और नगर (आरंभिक राज्य और अर्थव्यवस्थाएँ)" },
        { id: "his12-ch3", name: "Kinship, Caste and Class (Early Society)", nameHi: "बंधुत्व, जाति तथा वर्ग (आरंभिक समाज)" },
        { id: "his12-ch4", name: "Thinkers, Beliefs and Buildings (Cultural Development)", nameHi: "विचारक, विश्वास और इमारतें (सांस्कृतिक विकास)" },
      ]
    },
    {
      id: "history-12-part2",
      name: "Themes in Indian History Part II",
      nameHi: "भारतीय इतिहास के कुछ विषय भाग 2",
      chapters: [
        { id: "his12-ch5", name: "Through the Eyes of Travellers", nameHi: "यात्रियों के नजरिए" },
        { id: "his12-ch6", name: "Bhakti-Sufi Traditions", nameHi: "भक्ति-सूफी परंपराएँ" },
        { id: "his12-ch7", name: "An Imperial Capital: Vijayanagara", nameHi: "एक साम्राज्य की राजधानी: विजयनगर" },
        { id: "his12-ch8", name: "Peasants, Zamindars and the State", nameHi: "किसान, जमींदार और राज्य" },
      ]
    },
    {
      id: "history-12-part3",
      name: "Themes in Indian History Part III",
      nameHi: "भारतीय इतिहास के कुछ विषय भाग 3",
      chapters: [
        { id: "his12-ch9", name: "Colonialism and the Countryside", nameHi: "उपनिवेशवाद और देहात" },
        { id: "his12-ch10", name: "Rebels and the Raj (1857)", nameHi: "विद्रोही और राज (1857 का आंदोलन)" },
        { id: "his12-ch11", name: "Mahatma Gandhi and the Nationalist Movement", nameHi: "महात्मा गांधी और राष्ट्रीय आंदोलन" },
        { id: "his12-ch12", name: "Framing the Constitution", nameHi: "संविधान का निर्माण" },
      ]
    },
  ]
}

const geography12: Subject = {
  id: "geography-12",
  name: "Geography",
  nameHi: "भूगोल",
  icon: "map",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "geography-12-human",
      name: "Fundamentals of Human Geography",
      nameHi: "मानव भूगोल के मूल सिद्धांत",
      chapters: [
        { id: "geo12-ch1", name: "Human Geography: Nature and Scope", nameHi: "मानव भूगोल - प्रकृति एवं विषय क्षेत्र" },
        { id: "geo12-ch2", name: "World Population: Distribution, Density and Growth", nameHi: "विश्व जनसंख्या - वितरण, घनत्व और वृद्धि" },
        { id: "geo12-ch3", name: "Human Development", nameHi: "मानव विकास" },
        { id: "geo12-ch4", name: "Primary Activities", nameHi: "प्राथमिक क्रियाएँ" },
        { id: "geo12-ch5", name: "Secondary Activities", nameHi: "द्वितीयक क्रियाएँ" },
        { id: "geo12-ch6", name: "Tertiary and Quaternary Activities", nameHi: "तृतीयक और चतुर्थक क्रियाएँ" },
        { id: "geo12-ch7", name: "Transport and Communication", nameHi: "परिवहन एवं संचार" },
        { id: "geo12-ch8", name: "International Trade", nameHi: "अंतर्राष्ट्रीय व्यापार" },
      ]
    },
    {
      id: "geography-12-india",
      name: "India: People and Economy",
      nameHi: "भारत: लोग और अर्थव्यवस्था",
      chapters: [
        { id: "geo12i-ch1", name: "Population: Distribution, Density, Growth and Composition", nameHi: "जनसंख्या: वितरण, घनत्व, वृद्धि और संघटन" },
        { id: "geo12i-ch2", name: "Human Settlements", nameHi: "मानव बस्तियाँ" },
        { id: "geo12i-ch3", name: "Land Resources and Agriculture", nameHi: "भू-संसाधन तथा कृषि" },
        { id: "geo12i-ch4", name: "Water Resources", nameHi: "जल-संसाधन" },
        { id: "geo12i-ch5", name: "Mineral and Energy Resources", nameHi: "खनिज तथा ऊर्जा संसाधन" },
        { id: "geo12i-ch6", name: "Planning and Sustainable Development", nameHi: "भारत के संदर्भ में नियोजन और सततपोषणीय विकास" },
        { id: "geo12i-ch7", name: "Transport and Communication", nameHi: "परिवहन तथा संचार" },
        { id: "geo12i-ch8", name: "International Trade", nameHi: "अंतर्राष्ट्रीय व्यापार" },
        { id: "geo12i-ch9", name: "Geographical Perspective on Selected Issues", nameHi: "भौगोलिक परिप्रेक्ष्य में चयनित कुछ मुद्दे एवं समस्याएँ" },
      ]
    },
  ]
}

const polSci12: Subject = {
  id: "polsci-12",
  name: "Political Science",
  nameHi: "राजनीति विज्ञान",
  icon: "landmark",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "polsci-12-world",
      name: "Contemporary World Politics",
      nameHi: "समकालीन विश्व राजनीति",
      chapters: [
        { id: "pol12-ch1", name: "The End of Bipolarity", nameHi: "दो ध्रुवीयता का अंत" },
        { id: "pol12-ch2", name: "Alternative Centres of Power", nameHi: "सत्ता के वैकल्पिक केंद्र" },
        { id: "pol12-ch3", name: "Contemporary South Asia", nameHi: "समकालीन दक्षिण एशिया" },
        { id: "pol12-ch4", name: "International Organisations", nameHi: "अंतर्राष्ट्रीय संगठन" },
        { id: "pol12-ch5", name: "Security in the Contemporary World", nameHi: "समकालीन विश्व में सुरक्षा" },
        { id: "pol12-ch6", name: "Environment and Natural Resources", nameHi: "पर्यावरण और प्राकृतिक संसाधन" },
        { id: "pol12-ch7", name: "Globalisation", nameHi: "वैश्वीकरण" },
      ]
    },
    {
      id: "polsci-12-india",
      name: "Politics in India Since Independence",
      nameHi: "स्वतंत्र भारत में राजनीति",
      chapters: [
        { id: "pol12i-ch1", name: "Challenges of Nation Building", nameHi: "राष्ट्र-निर्माण की चुनौतियाँ" },
        { id: "pol12i-ch2", name: "Era of One Party Dominance", nameHi: "एक दल के प्रभुत्व का दौर" },
        { id: "pol12i-ch3", name: "Politics of Planned Development", nameHi: "नियोजित विकास की राजनीति" },
        { id: "pol12i-ch4", name: "India's External Relations", nameHi: "भारत के विदेश संबंध" },
        { id: "pol12i-ch5", name: "Challenges to Congress System", nameHi: "कांग्रेस प्रणाली: चुनौतियाँ और पुनर्स्थापना" },
        { id: "pol12i-ch6", name: "Crisis of Democratic Order", nameHi: "लोकतांत्रिक व्यवस्था का संकट" },
        { id: "pol12i-ch7", name: "Regional Aspirations", nameHi: "क्षेत्रीय आकांक्षाएँ" },
        { id: "pol12i-ch8", name: "Recent Developments in Indian Politics", nameHi: "भारतीय राजनीति: नए बदलाव" },
      ]
    },
  ]
         }
const sociology12: Subject = {
  id: "sociology-12",
  name: "Sociology",
  nameHi: "समाजशास्त्र",
  icon: "users",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "sociology-12-part1",
      name: "Indian Society",
      nameHi: "भारतीय समाज",
      chapters: [
        { id: "soc12-ch1", name: "Indian Society: An Introduction", nameHi: "भारतीय समाज: एक परिचय" },
        { id: "soc12-ch2", name: "Demographic Structure of Indian Society", nameHi: "भारतीय समाज की जनसांख्यिकीय संरचना" },
        { id: "soc12-ch3", name: "Social Institutions: Continuity and Change", nameHi: "सामाजिक संस्थाएँ: निरंतरता एवं परिवर्तन" },
        { id: "soc12-ch4", name: "Market as a Social Institution", nameHi: "बाजार एक सामाजिक संस्था के रूप में" },
        { id: "soc12-ch5", name: "Patterns of Social Inequality and Exclusion", nameHi: "सामाजिक विषमता एवं बहिष्कार के स्वरूप" },
        { id: "soc12-ch6", name: "Challenges of Cultural Diversity", nameHi: "सांस्कृतिक विविधता की चुनौतियाँ" },
      ]
    },
    {
      id: "sociology-12-part2",
      name: "Social Change and Development in India",
      nameHi: "भारत में सामाजिक परिवर्तन एवं विकास",
      chapters: [
        { id: "soc12b-ch1", name: "Structural Change", nameHi: "संरचनात्मक परिवर्तन" },
        { id: "soc12b-ch2", name: "Cultural Change", nameHi: "सांस्कृतिक परिवर्तन" },
        { id: "soc12b-ch3", name: "The Story of Indian Democracy", nameHi: "भारतीय लोकतंत्र की कहानियाँ" },
        { id: "soc12b-ch4", name: "Change and Development in Rural Society", nameHi: "ग्रामीण समाज में विकास एवं परिवर्तन" },
        { id: "soc12b-ch5", name: "Change and Development in Industrial Society", nameHi: "औद्योगिक समाज में परिवर्तन और विकास" },
        { id: "soc12b-ch6", name: "Globalisation and Social Change", nameHi: "भूमंडलीकरण और सामाजिक परिवर्तन" },
        { id: "soc12b-ch7", name: "Mass Media and Communications", nameHi: "जनसंपर्क साधन और जनसंचार" },
        { id: "soc12b-ch8", name: "Social Movements", nameHi: "सामाजिक आंदोलन" },
      ]
    },
  ]
}

const psychology12: Subject = {
  id: "psychology-12",
  name: "Psychology",
  nameHi: "मनोविज्ञान",
  icon: "book-open",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "psychology-12-book",
      name: "Psychology",
      nameHi: "मनोविज्ञान",
      chapters: [
        { id: "psy12-ch1", name: "Variations in Psychological Attributes", nameHi: "मनोवैज्ञानिक गुणों में विभिन्नताएँ" },
        { id: "psy12-ch2", name: "Self and Personality", nameHi: "आत्म एवं व्यक्तित्व" },
        { id: "psy12-ch3", name: "Meeting Life Challenges", nameHi: "जीवन की चुनौतियों का सामना" },
        { id: "psy12-ch4", name: "Psychological Disorders", nameHi: "मनोवैज्ञानिक विकार" },
        { id: "psy12-ch5", name: "Therapeutic Approaches", nameHi: "चिकित्सा उपागम" },
        { id: "psy12-ch6", name: "Attitude and Social Cognition", nameHi: "अभिवृत्ति एवं सामाजिक संज्ञान" },
        { id: "psy12-ch7", name: "Social Influence and Group Processes", nameHi: "सामाजिक प्रभाव एवं समूह प्रक्रम" },
        { id: "psy12-ch8", name: "Psychology and Life", nameHi: "मनोविज्ञान एवं जीवन" },
        { id: "psy12-ch9", name: "Developing Psychological Skills", nameHi: "मनोवैज्ञानिक कौशलों का विकास" },
      ]
    },
  ]
}

const english12arts: Subject = {
  id: "english-12-arts",
  name: "English",
  nameHi: "अंग्रेजी",
  icon: "book-open",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "english-12-arts-flamingo",
      name: "Flamingo",
      nameHi: "Flamingo",
      chapters: [
        { id: "eng12arts-ch1", name: "The Last Lesson", nameHi: "The Last Lesson" },
        { id: "eng12arts-ch2", name: "Lost Spring", nameHi: "Lost Spring" },
        { id: "eng12arts-ch3", name: "Deep Water", nameHi: "Deep Water" },
        { id: "eng12arts-ch4", name: "The Rattrap", nameHi: "The Rattrap" },
        { id: "eng12arts-ch5", name: "Indigo", nameHi: "Indigo" },
        { id: "eng12arts-ch6", name: "Poets and Pancakes", nameHi: "Poets and Pancakes" },
        { id: "eng12arts-ch7", name: "The Interview", nameHi: "The Interview" },
        { id: "eng12arts-ch8", name: "Going Places", nameHi: "Going Places" },
        { id: "eng12arts-ch9", name: "My Mother at Sixty-six", nameHi: "My Mother at Sixty-six" },
        { id: "eng12arts-ch10", name: "Keeping Quiet", nameHi: "Keeping Quiet" },
        { id: "eng12arts-ch11", name: "A Thing of Beauty", nameHi: "A Thing of Beauty" },
        { id: "eng12arts-ch12", name: "A Roadside Stand", nameHi: "A Roadside Stand" },
        { id: "eng12arts-ch13", name: "Aunt Jennifer's Tigers", nameHi: "Aunt Jennifer's Tigers" },
      ]
    },
    {
      id: "english-12-arts-vistas",
      name: "Vistas",
      nameHi: "Vistas",
      chapters: [
        { id: "vis12arts-ch1", name: "The Third Level", nameHi: "The Third Level" },
        { id: "vis12arts-ch2", name: "The Tiger King", nameHi: "The Tiger King" },
        { id: "vis12arts-ch3", name: "Journey to the End of the Earth", nameHi: "Journey to the End of the Earth" },
        { id: "vis12arts-ch4", name: "The Enemy", nameHi: "The Enemy" },
        { id: "vis12arts-ch5", name: "On the Face of It", nameHi: "On the Face of It" },
        { id: "vis12arts-ch6", name: "Memories of Childhood", nameHi: "Memories of Childhood" },
      ]
    },
  ]
}

const hindi12arts: Subject = {
  id: "hindi-12-arts",
  name: "Hindi",
  nameHi: "हिंदी",
  icon: "book",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "hindi-12-arts-aroh",
      name: "Aroh Bhag 2",
      nameHi: "आरोह भाग 2",
      chapters: [
        { id: "hin12arts-ch1", name: "Aatmaparichay, Ek Geet", nameHi: "आत्मपरिचय, एक गीत" },
        { id: "hin12arts-ch2", name: "Patang", nameHi: "पतंग" },
        { id: "hin12arts-ch3", name: "Kavita Ke Bahane, Baat Seedhi Thi Par", nameHi: "कविता के बहाने, बात सीधी थी पर" },
        { id: "hin12arts-ch4", name: "Kaimere Mein Band Apahij", nameHi: "कैमरे में बंद अपाहिज" },
        { id: "hin12arts-ch5", name: "Saharse Sweekaara Hai", nameHi: "सहर्ष स्वीकारा है" },
        { id: "hin12arts-ch6", name: "Usha", nameHi: "उषा" },
        { id: "hin12arts-ch7", name: "Kavitavali, Lakshman-Murchha aur Ram Ka Vilaap", nameHi: "कवितावली, लक्ष्मण-मूर्छा और राम का विलाप" },
        { id: "hin12arts-ch8", name: "Rubaiyan", nameHi: "रुबाइयाँ" },
        { id: "hin12arts-ch9", name: "Chhota Mera Khet, Bagulon Ke Pankh", nameHi: "छोटा मेरा खेत, बगुलों के पंख" },
        { id: "hin12arts-ch10", name: "Bhaktin", nameHi: "भक्तिन" },
        { id: "hin12arts-ch11", name: "Bazaar Darshan", nameHi: "बाजार दर्शन" },
        { id: "hin12arts-ch12", name: "Kaale Megha Paani De", nameHi: "काले मेघा पानी दे" },
        { id: "hin12arts-ch13", name: "Pahalwaan Ki Dholak", nameHi: "पहलवान की ढोलक" },
        { id: "hin12arts-ch14", name: "Shirish Ke Phool", nameHi: "शिरीष के फूल" },
        { id: "hin12arts-ch15", name: "Shram Vibhajan aur Jati Pratha", nameHi: "श्रम विभाजन और जाति प्रथा" },
      ]
    },
    {
      id: "hindi-12-arts-vitan",
      name: "Vitan Bhag 2",
      nameHi: "वितान भाग 2",
      chapters: [
        { id: "vit12arts-ch1", name: "Silver Wedding", nameHi: "सिल्वर वैडिंग" },
        { id: "vit12arts-ch2", name: "Jujh", nameHi: "जूझ" },
        { id: "vit12arts-ch3", name: "Ateet Mein Dabe Paon", nameHi: "अतीत में दबे पाँव" },
      ]
    },
    {
      id: "hindi-12-arts-abhivyakti",
      name: "Abhivyakti aur Madhyam",
      nameHi: "अभिव्यक्ति और माध्यम",
      chapters: [
        { id: "abh12arts-ch1", name: "Writing for Various Media", nameHi: "विभिन्न माध्यमों के लिए लेखन" },
        { id: "abh12arts-ch2", name: "Forms of Journalistic Writing", nameHi: "पत्रकारीय लेखन के विभिन्न रूप" },
        { id: "abh12arts-ch3", name: "Special Writing", nameHi: "विशेष लेखन" },
        { id: "abh12arts-ch4", name: "How Poetry is Written", nameHi: "कैसे बनती है कविता" },
        { id: "abh12arts-ch5", name: "Grammar of Playwriting", nameHi: "नाटक लिखने की व्याकरण" },
        { id: "abh12arts-ch6", name: "How to Write a Story", nameHi: "कैसे लिखें कहानी" },
        { id: "abh12arts-ch7", name: "Writing on New Topics", nameHi: "नए विषयों पर लेखन" },
      ]
    },
  ]
}

export const class12ArtsStream: Stream = {
  id: "arts",
  name: "Arts",
  nameHi: "कला",
  subjects: [
    history12,
    geography12,
    polSci12,
    sociology12,
    psychology12,
    english12arts,
    hindi12arts,
  ]
          }
