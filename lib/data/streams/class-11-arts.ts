import type { Stream, Subject } from "../types"

const history11: Subject = {
  id: "history-11",
  name: "History",
  nameHi: "इतिहास",
  icon: "book",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "history-11-book",
      name: "Vishwa Itihas Ke Kuch Vishay",
      nameHi: "विश्व इतिहास के कुछ विषय",
      chapters: [
        { id: "his11-ch1", name: "From the Beginning of Time", nameHi: "समय की शुरुआत से" },
        { id: "his11-ch2", name: "Writing and City Life", nameHi: "लेखन कला और शहरी जीवन" },
        { id: "his11-ch3", name: "An Empire Across Three Continents", nameHi: "तीन महाद्वीपों में फैला हुआ साम्राज्य" },
        { id: "his11-ch4", name: "Nomadic Empires", nameHi: "खानाबदोश साम्राज्य" },
        { id: "his11-ch5", name: "The Three Orders", nameHi: "तीन वर्ग" },
        { id: "his11-ch6", name: "Paths to Modernisation", nameHi: "आधुनिकीकरण के रास्ते" },
        { id: "his11-ch7", name: "The Industrial Revolution", nameHi: "औद्योगिक क्रांति" },
      ]
    },
  ]
}

const geography11: Subject = {
  id: "geography-11",
  name: "Geography",
  nameHi: "भूगोल",
  icon: "map",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "geography-11-physical",
      name: "Fundamentals of Physical Geography",
      nameHi: "भौतिक भूगोल के मूल सिद्धांत",
      chapters: [
        { id: "geo11-ch1", name: "Geography as a Discipline", nameHi: "भूगोल एक विषय के रूप में" },
        { id: "geo11-ch2", name: "Origin and Evolution of the Earth", nameHi: "पृथ्वी की उत्पत्ति एवं विकास" },
        { id: "geo11-ch3", name: "Interior of the Earth", nameHi: "पृथ्वी की आंतरिक संरचना" },
        { id: "geo11-ch4", name: "Distribution of Oceans and Continents", nameHi: "महासागरों और महाद्वीपों का वितरण" },
        { id: "geo11-ch5", name: "Landforms and their Evolution", nameHi: "भू-आकृतियाँ तथा उनका विकास" },
        { id: "geo11-ch6", name: "Composition and Structure of Atmosphere", nameHi: "वायुमंडल का संघटन तथा संरचना" },
        { id: "geo11-ch7", name: "Solar Radiation, Heat Balance and Temperature", nameHi: "सौर विकिरण, ऊष्मा संतुलन एवं तापमान" },
        { id: "geo11-ch8", name: "Atmospheric Circulation and Weather Systems", nameHi: "वायुमंडलीय परिसंचरण तथा मौसम प्रणालियाँ" },
        { id: "geo11-ch9", name: "Water (Oceans)", nameHi: "जल (महासागर)" },
        { id: "geo11-ch10", name: "Life on the Earth", nameHi: "पृथ्वी पर जीवन" },
      ]
    },
    {
      id: "geography-11-india",
      name: "India: Physical Environment",
      nameHi: "भारत: भौतिक पर्यावरण",
      chapters: [
        { id: "geo11i-ch1", name: "India: Location", nameHi: "भारत - स्थिति" },
        { id: "geo11i-ch2", name: "Structure and Physiography", nameHi: "संरचना तथा भू-आकृति विज्ञान" },
        { id: "geo11i-ch3", name: "Drainage System", nameHi: "अपवाह तंत्र" },
        { id: "geo11i-ch4", name: "Climate", nameHi: "जलवायु" },
        { id: "geo11i-ch5", name: "Natural Vegetation", nameHi: "प्राकृतिक वनस्पति" },
        { id: "geo11i-ch6", name: "Soils", nameHi: "मृदा (मिट्टी)" },
      ]
    },
  ]
}

const polSci11: Subject = {
  id: "polsci-11",
  name: "Political Science",
  nameHi: "राजनीति विज्ञान",
  icon: "landmark",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "polsci-11-constitution",
      name: "Bharat Ka Samvidhan: Siddhant aur Vyavhar",
      nameHi: "भारत का संविधान: सिद्धांत और व्यवहार",
      chapters: [
        { id: "pol11-ch1", name: "Constitution: Why and How?", nameHi: "संविधान: क्यों और कैसे?" },
        { id: "pol11-ch2", name: "Rights in the Indian Constitution", nameHi: "भारतीय संविधान में अधिकार" },
        { id: "pol11-ch3", name: "Election and Representation", nameHi: "चुनाव और प्रतिनिधित्व" },
        { id: "pol11-ch4", name: "Executive", nameHi: "कार्यपालिका" },
        { id: "pol11-ch5", name: "Legislature", nameHi: "विधायिका" },
        { id: "pol11-ch6", name: "Judiciary", nameHi: "न्यायपालिका" },
        { id: "pol11-ch7", name: "Federalism", nameHi: "संघवाद" },
        { id: "pol11-ch8", name: "Local Governments", nameHi: "स्थानीय शासन" },
      ]
    },
    {
      id: "polsci-11-theory",
      name: "Political Theory",
      nameHi: "राजनीतिक सिद्धांत",
      chapters: [
        { id: "pol11t-ch1", name: "Political Theory: An Introduction", nameHi: "राजनीतिक सिद्धांत: एक परिचय" },
        { id: "pol11t-ch2", name: "Freedom", nameHi: "स्वतंत्रता" },
        { id: "pol11t-ch3", name: "Equality", nameHi: "समानता" },
        { id: "pol11t-ch4", name: "Social Justice", nameHi: "सामाजिक न्याय" },
        { id: "pol11t-ch5", name: "Rights", nameHi: "अधिकार" },
        { id: "pol11t-ch6", name: "Citizenship", nameHi: "नागरिकता" },
        { id: "pol11t-ch7", name: "Nationalism", nameHi: "राष्ट्रवाद" },
        { id: "pol11t-ch8", name: "Secularism", nameHi: "धर्मनिरपेक्षता" },
      ]
    },
  ]
      }
const sociology11: Subject = {
  id: "sociology-11",
  name: "Sociology",
  nameHi: "समाजशास्त्र",
  icon: "users",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "sociology-11-part1",
      name: "Introducing Sociology",
      nameHi: "समाजशास्त्र एवं समाज",
      chapters: [
        { id: "soc11-ch1", name: "Sociology and Society", nameHi: "समाजशास्त्र एवं समाज" },
        { id: "soc11-ch2", name: "Terms, Concepts and their Use in Sociology", nameHi: "समाजशास्त्र में प्रयुक्त शब्दावली, संकल्पनाएँ एवं उनका उपयोग" },
        { id: "soc11-ch3", name: "Understanding Social Institutions", nameHi: "सामाजिक संस्थाओं को समझना" },
        { id: "soc11-ch4", name: "Culture and Socialisation", nameHi: "संस्कृति तथा समाजीकरण" },
        { id: "soc11-ch5", name: "Sociology: Research Methods", nameHi: "समाजशास्त्र - अनुसंधान पद्धतियाँ" },
      ]
    },
    {
      id: "sociology-11-part2",
      name: "Understanding Society",
      nameHi: "समाज का बोध",
      chapters: [
        { id: "soc11b-ch1", name: "Social Structure, Stratification and Social Processes", nameHi: "समाज में सामाजिक संरचना, स्तरीकरण और सामाजिक प्रक्रियाएँ" },
        { id: "soc11b-ch2", name: "Environment and Society", nameHi: "पर्यावरण और समाज" },
      ]
    },
  ]
}

const psychology11: Subject = {
  id: "psychology-11",
  name: "Psychology",
  nameHi: "मनोविज्ञान",
  icon: "book-open",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "psychology-11-book",
      name: "Psychology",
      nameHi: "मनोविज्ञान",
      chapters: [
        { id: "psy11-ch1", name: "What is Psychology?", nameHi: "मनोविज्ञान क्या है?" },
        { id: "psy11-ch2", name: "Methods of Enquiry in Psychology", nameHi: "मनोविज्ञान में जाँच की विधियाँ" },
        { id: "psy11-ch3", name: "The Bases of Human Behaviour", nameHi: "मानव व्यवहार के आधार" },
        { id: "psy11-ch4", name: "Human Development", nameHi: "मानव विकास" },
        { id: "psy11-ch5", name: "Sensory, Attentional and Perceptual Processes", nameHi: "संवेदी, अवधानिक एवं प्रात्यक्षिक प्रक्रियाएँ" },
        { id: "psy11-ch6", name: "Learning", nameHi: "अधिगम" },
        { id: "psy11-ch7", name: "Human Memory", nameHi: "मानव स्मृति" },
        { id: "psy11-ch8", name: "Thinking", nameHi: "चिंतन" },
        { id: "psy11-ch9", name: "Motivation and Emotion", nameHi: "अभिप्रेरणा एवं संवेग" },
      ]
    },
  ]
}

const english11arts: Subject = {
  id: "english-11-arts",
  name: "English",
  nameHi: "अंग्रेजी",
  icon: "book-open",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "english-11-arts-hornbill",
      name: "Hornbill",
      nameHi: "Hornbill",
      chapters: [
        { id: "eng11arts-ch1", name: "The Portrait of a Lady", nameHi: "The Portrait of a Lady" },
        { id: "eng11arts-ch2", name: "We're Not Afraid to Die", nameHi: "We're Not Afraid to Die" },
        { id: "eng11arts-ch3", name: "Discovering Tut: the Saga Continues", nameHi: "Discovering Tut: the Saga Continues" },
        { id: "eng11arts-ch4", name: "The Adventure", nameHi: "The Adventure" },
        { id: "eng11arts-ch5", name: "Silk Road", nameHi: "Silk Road" },
        { id: "eng11arts-ch6", name: "A Photograph", nameHi: "A Photograph" },
        { id: "eng11arts-ch7", name: "The Laburnum Top", nameHi: "The Laburnum Top" },
        { id: "eng11arts-ch8", name: "The Voice of the Rain", nameHi: "The Voice of the Rain" },
        { id: "eng11arts-ch9", name: "Childhood", nameHi: "Childhood" },
        { id: "eng11arts-ch10", name: "Father to Son", nameHi: "Father to Son" },
      ]
    },
    {
      id: "english-11-arts-snapshots",
      name: "Snapshots",
      nameHi: "Snapshots",
      chapters: [
        { id: "snap11arts-ch1", name: "The Summer of the Beautiful White Horse", nameHi: "The Summer of the Beautiful White Horse" },
        { id: "snap11arts-ch2", name: "The Address", nameHi: "The Address" },
        { id: "snap11arts-ch3", name: "Mother's Day", nameHi: "Mother's Day" },
        { id: "snap11arts-ch4", name: "Birth", nameHi: "Birth" },
        { id: "snap11arts-ch5", name: "The Tale of Melon City", nameHi: "The Tale of Melon City" },
      ]
    },
  ]
}

const hindi11arts: Subject = {
  id: "hindi-11-arts",
  name: "Hindi",
  nameHi: "हिंदी",
  icon: "book",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "hindi-11-arts-aroh",
      name: "Aroh Bhag 1",
      nameHi: "आरोह भाग 1",
      chapters: [
        { id: "hin11arts-ch1", name: "Pad (Kabir)", nameHi: "पद (कबीर)" },
        { id: "hin11arts-ch2", name: "Pad (Meera)", nameHi: "पद (मीरा)" },
        { id: "hin11arts-ch3", name: "Ghar Ki Yaad", nameHi: "घर की याद" },
        { id: "hin11arts-ch4", name: "Champa Kaale-Kaale Achhar Nahi Cheenhti", nameHi: "चंपा काले-काले अच्छर नहीं चीन्हती" },
        { id: "hin11arts-ch5", name: "Dushyant Kumar Ki Gazalen", nameHi: "दुष्यंत कुमार की गज़लें" },
        { id: "hin11arts-ch6", name: "He Bhookh! Mat Machal", nameHi: "हे भूख! मत मचल" },
        { id: "hin11arts-ch7", name: "Sabse Khatarnak", nameHi: "सबसे खतरनाक" },
        { id: "hin11arts-ch8", name: "Aao Milkar Bachaayen", nameHi: "आओ, मिलकर बचाएँ" },
        { id: "hin11arts-ch9", name: "Namak Ka Daroga", nameHi: "नमक का दारोगा" },
        { id: "hin11arts-ch10", name: "Miyan Naseeruddin", nameHi: "मियाँ नसीरुद्दीन" },
        { id: "hin11arts-ch11", name: "Apu Ke Saath Dhai Saal", nameHi: "अपू के साथ ढाई साल" },
        { id: "hin11arts-ch12", name: "Vidaai Sambhashan", nameHi: "विदाई-संभाषण" },
        { id: "hin11arts-ch13", name: "Galta Loha", nameHi: "गलता लोहा" },
        { id: "hin11arts-ch14", name: "Rajni", nameHi: "रजनी" },
        { id: "hin11arts-ch15", name: "Jamun Ka Ped", nameHi: "जामुन का पेड़" },
        { id: "hin11arts-ch16", name: "Bharat Mata", nameHi: "भारत माता" },
      ]
    },
    {
      id: "hindi-11-arts-vitan",
      name: "Vitan Bhag 1",
      nameHi: "वितान भाग 1",
      chapters: [
        { id: "vit11arts-ch1", name: "Bharatiya Gayikaon Mein Bezod: Lata Mangeshkar", nameHi: "भारतीय गायिकाओं में बेजोड़: लता मंगेशकर" },
        { id: "vit11arts-ch2", name: "Rajasthan Ki Rajat Boonden", nameHi: "राजस्थान की रजत बूँदें" },
        { id: "vit11arts-ch3", name: "Aalo-Andhari", nameHi: "आलो-आँधारि" },
        { id: "vit11arts-ch4", name: "Bharatiya Kalaen", nameHi: "भारतीय कलाएँ" },
      ]
    },
  ]
}

export const class11ArtsStream: Stream = {
  id: "arts-11",
  name: "Arts",
  nameHi: "कला",
  subjects: [
    history11,
    geography11,
    polSci11,
    sociology11,
    psychology11,
    english11arts,
    hindi11arts,
  ]
         }
