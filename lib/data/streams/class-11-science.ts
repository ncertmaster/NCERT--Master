import type { Stream, Subject } from "../types"

const physics11: Subject = {
  id: "physics-11",
  name: "Physics",
  nameHi: "भौतिक विज्ञान",
  icon: "atom",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "physics-11-part1",
        ncertPdfCode: "keph1",
      name: "Physics Part I",
      nameHi: "भौतिक विज्ञान भाग 1",
      chapters: [
        { id: "phy11-ch1", name: "Units and Measurements", nameHi: "मात्रक और मापन" },
        { id: "phy11-ch2", name: "Motion in a Straight Line", nameHi: "सरल रेखा में गति" },
        { id: "phy11-ch3", name: "Motion in a Plane", nameHi: "समतल में गति" },
        { id: "phy11-ch4", name: "Laws of Motion", nameHi: "गति के नियम" },
        { id: "phy11-ch5", name: "Work, Energy and Power", nameHi: "कार्य, ऊर्जा और शक्ति" },
        { id: "phy11-ch6", name: "Systems of Particles and Rotational Motion", nameHi: "कणों के निकाय तथा घूर्णी गति" },
        { id: "phy11-ch7", name: "Gravitation", nameHi: "गुरुत्वाकर्षण" },
      ]
    },
    {
      id: "physics-11-part2",
        ncertPdfCode: "keph2",
      name: "Physics Part II",
      nameHi: "भौतिक विज्ञान भाग 2",
      chapters: [
        { id: "phy11-ch8", name: "Mechanical Properties of Solids", nameHi: "ठोसों के यांत्रिक गुण" },
        { id: "phy11-ch9", name: "Mechanical Properties of Fluids", nameHi: "तरलों के यांत्रिक गुण" },
        { id: "phy11-ch10", name: "Thermal Properties of Matter", nameHi: "द्रव्य के तापीय गुण" },
        { id: "phy11-ch11", name: "Thermodynamics", nameHi: "ऊष्मागतिकी" },
        { id: "phy11-ch12", name: "Kinetic Theory", nameHi: "अणुगति सिद्धांत" },
        { id: "phy11-ch13", name: "Oscillations", nameHi: "दोलन" },
        { id: "phy11-ch14", name: "Waves", nameHi: "तरंगें" },
      ]
    },
  ]
}

const chemistry11: Subject = {
  id: "chemistry-11",
  name: "Chemistry",
  nameHi: "रसायन विज्ञान",
  icon: "flask",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "chemistry-11-part1",
        ncertPdfCode: "kech1",
      name: "Chemistry Part I",
      nameHi: "रसायन विज्ञान भाग 1",
      chapters: [
        { id: "chem11-ch1", name: "Some Basic Concepts of Chemistry", nameHi: "रसायन विज्ञान की कुछ मूल अवधारणाएँ" },
        { id: "chem11-ch2", name: "Structure of Atom", nameHi: "परमाणु की संरचना" },
        { id: "chem11-ch3", name: "Classification of Elements and Periodicity in Properties", nameHi: "तत्वों का वर्गीकरण एवं गुणधर्मों में आवर्तिता" },
        { id: "chem11-ch4", name: "Chemical Bonding and Molecular Structure", nameHi: "रासायनिक आबंधन तथा आण्विक संरचना" },
        { id: "chem11-ch5", name: "Thermodynamics", nameHi: "ऊष्मागतिकी" },
        { id: "chem11-ch6", name: "Equilibrium", nameHi: "साम्यावस्था" },
        { id: "chem11-ch7", name: "Redox Reactions", nameHi: "अपचयोपचय अभिक्रियाएँ" },
      ]
    },
    {
      id: "chemistry-11-part2",
        ncertPdfCode: "kech2",
      name: "Chemistry Part II",
      nameHi: "रसायन विज्ञान भाग 2",
      chapters: [
        { id: "chem11-ch8", name: "Organic Chemistry: Basic Principles and Techniques", nameHi: "कार्बनिक रसायन: कुछ आधारभूत सिद्धांत तथा तकनीकें" },
        { id: "chem11-ch9", name: "Hydrocarbons", nameHi: "हाइड्रोकार्बन" },
      ]
    },
  ]
        }
const biology11: Subject = {
  id: "biology-11",
        ncertPdfCode: "kebo1",
  name: "Biology",
  nameHi: "जीव विज्ञान",
  icon: "leaf",
  tabs: ["books", "notes", "iq", "quiz"],
  books: [
    {
      id: "biology-11-part1",
      name: "Biology Part I",
      nameHi: "जीव विज्ञान भाग 1",
      chapters: [
        { id: "bio11-ch1", name: "The Living World", nameHi: "जीव जगत" },
        { id: "bio11-ch2", name: "Biological Classification", nameHi: "जीव जगत का वर्गीकरण" },
        { id: "bio11-ch3", name: "Plant Kingdom", nameHi: "वनस्पति जगत" },
        { id: "bio11-ch4", name: "Animal Kingdom", nameHi: "प्राणि जगत" },
        { id: "bio11-ch5", name: "Morphology of Flowering Plants", nameHi: "पुष्पी पादपों की आकारिकी" },
        { id: "bio11-ch6", name: "Anatomy of Flowering Plants", nameHi: "पुष्पी पादपों का शरीर" },
        { id: "bio11-ch7", name: "Structural Organisation in Animals", nameHi: "प्राणियों में संरचनात्मक संगठन" },
        { id: "bio11-ch8", name: "Cell: The Unit of Life", nameHi: "कोशिका: जीवन की इकाई" },
        { id: "bio11-ch9", name: "Biomolecules", nameHi: "जैव अणु" },
        { id: "bio11-ch10", name: "Cell Cycle and Cell Division", nameHi: "कोशिका चक्र और कोशिका विभाजन" },
      ]
    },
    {
      id: "biology-11-part2",
      name: "Biology Part II",
      nameHi: "जीव विज्ञान भाग 2",
      chapters: [
        { id: "bio11-ch11", name: "Photosynthesis in Higher Plants", nameHi: "उच्च पादपों में प्रकाश-संश्लेषण" },
        { id: "bio11-ch12", name: "Respiration in Plants", nameHi: "पादप में श्वसन" },
        { id: "bio11-ch13", name: "Plant Growth and Development", nameHi: "पादप वृद्धि एवं परिवर्धन" },
        { id: "bio11-ch14", name: "Breathing and Exchange of Gases", nameHi: "श्वसन और गैसों का विनिमय" },
        { id: "bio11-ch15", name: "Body Fluids and Circulation", nameHi: "शरीर द्रव तथा परिसंचरण" },
        { id: "bio11-ch16", name: "Excretory Products and Their Elimination", nameHi: "उत्सर्जी उत्पाद एवं उनका निष्कासन" },
        { id: "bio11-ch17", name: "Locomotion and Movement", nameHi: "गमन एवं संचलन" },
        { id: "bio11-ch18", name: "Neural Control and Coordination", nameHi: "तंत्रिकीय नियंत्रण एवं समन्वय" },
        { id: "bio11-ch19", name: "Chemical Coordination and Integration", nameHi: "रासायनिक समन्वय तथा एकीकरण" },
      ]
    },
  ]
}

const math11: Subject = {
  id: "math-11",
  name: "Mathematics",
  nameHi: "गणित",
  icon: "calculator",
  tabs: ["books", "iq", "quiz"],
  books: [
    {
      id: "math-11-part1",
      name: "Mathematics Part I",
      nameHi: "गणित भाग 1",
      chapters: [
        { id: "math11-ch1", name: "Sets", nameHi: "समुच्चय" },
        { id: "math11-ch2", name: "Relations and Functions", nameHi: "संबंध एवं फलन" },
        { id: "math11-ch3", name: "Trigonometric Functions", nameHi: "त्रिकोणमितीय फलन" },
        { id: "math11-ch4", name: "Complex Numbers and Quadratic Equations", nameHi: "सम्मिश्र संख्याएँ और द्विघातीय समीकरण" },
        { id: "math11-ch5", name: "Linear Inequalities", nameHi: "रैखिक असमिकाएँ" },
        { id: "math11-ch6", name: "Permutations and Combinations", nameHi: "क्रमचय और संचय" },
        { id: "math11-ch7", name: "Binomial Theorem", nameHi: "द्विपद प्रमेय" },
      ]
    },
    {
      id: "math-11-part2",
      name: "Mathematics Part II",
      nameHi: "गणित भाग 2",
      chapters: [
        { id: "math11-ch8", name: "Sequences and Series", nameHi: "अनुक्रम तथा श्रेणी" },
        { id: "math11-ch9", name: "Straight Lines", nameHi: "सरल रेखाएँ" },
        { id: "math11-ch10", name: "Conic Sections", nameHi: "शंकु परिच्छेद" },
        { id: "math11-ch11", name: "Introduction to Three Dimensional Geometry", nameHi: "त्रिविमीय ज्यामिति का परिचय" },
        { id: "math11-ch12", name: "Limits and Derivatives", nameHi: "सीमा और अवकलज" },
        { id: "math11-ch13", name: "Statistics", nameHi: "सांख्यिकी" },
        { id: "math11-ch14", name: "Probability", nameHi: "प्रायिकता" },
      ]
    },
  ]
          }
const english11: Subject = {
  id: "english-11",
  name: "English",
  nameHi: "अंग्रेजी",
  icon: "book-open",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "english-11-hornbill",
        ncertPdfCode: "keeh1",
      name: "Hornbill",
      nameHi: "Hornbill",
      chapters: [
        { id: "eng11-ch1", name: "The Portrait of a Lady", nameHi: "The Portrait of a Lady" },
        { id: "eng11-ch2", name: "We're Not Afraid to Die", nameHi: "We're Not Afraid to Die" },
        { id: "eng11-ch3", name: "Discovering Tut: the Saga Continues", nameHi: "Discovering Tut: the Saga Continues" },
        { id: "eng11-ch4", name: "The Adventure", nameHi: "The Adventure" },
        { id: "eng11-ch5", name: "Silk Road", nameHi: "Silk Road" },
        { id: "eng11-ch6", name: "A Photograph", nameHi: "A Photograph" },
        { id: "eng11-ch7", name: "The Laburnum Top", nameHi: "The Laburnum Top" },
        { id: "eng11-ch8", name: "The Voice of the Rain", nameHi: "The Voice of the Rain" },
        { id: "eng11-ch9", name: "Childhood", nameHi: "Childhood" },
        { id: "eng11-ch10", name: "Father to Son", nameHi: "Father to Son" },
      ]
    },
    {
      id: "english-11-snapshots",
        ncertPdfCode: "keer1",
      name: "Snapshots",
      nameHi: "Snapshots",
      chapters: [
        { id: "snap11-ch1", name: "The Summer of the Beautiful White Horse", nameHi: "The Summer of the Beautiful White Horse" },
        { id: "snap11-ch2", name: "The Address", nameHi: "The Address" },
        { id: "snap11-ch3", name: "Mother's Day", nameHi: "Mother's Day" },
        { id: "snap11-ch4", name: "Birth", nameHi: "Birth" },
        { id: "snap11-ch5", name: "The Tale of Melon City", nameHi: "The Tale of Melon City" },
      ]
    },
  ]
}

const hindi11: Subject = {
  id: "hindi-11",
  name: "Hindi",
  nameHi: "हिंदी",
  icon: "book",
  tabs: ["books", "notes", "iq"],
  books: [
    {
      id: "hindi-11-aroh",
      name: "Aroh Bhag 1",
      nameHi: "आरोह भाग 1",
      chapters: [
        { id: "hin11-ch1", name: "Pad (Kabir)", nameHi: "पद (कबीर)" },
        { id: "hin11-ch2", name: "Pad (Meera)", nameHi: "पद (मीरा)" },
        { id: "hin11-ch3", name: "Ghar Ki Yaad", nameHi: "घर की याद" },
        { id: "hin11-ch4", name: "Champa Kaale-Kaale Achhar Nahi Cheenhti", nameHi: "चंपा काले-काले अच्छर नहीं चीन्हती" },
        { id: "hin11-ch5", name: "Dushyant Kumar Ki Gazalen", nameHi: "दुष्यंत कुमार की गज़लें" },
        { id: "hin11-ch6", name: "He Bhookh! Mat Machal", nameHi: "हे भूख! मत मचल" },
        { id: "hin11-ch7", name: "Sabse Khatarnak", nameHi: "सबसे खतरनाक" },
        { id: "hin11-ch8", name: "Aao Milkar Bachaayen", nameHi: "आओ, मिलकर बचाएँ" },
        { id: "hin11-ch9", name: "Namak Ka Daroga", nameHi: "नमक का दारोगा" },
        { id: "hin11-ch10", name: "Miyan Naseeruddin", nameHi: "मियाँ नसीरुद्दीन" },
        { id: "hin11-ch11", name: "Apu Ke Saath Dhai Saal", nameHi: "अपू के साथ ढाई साल" },
        { id: "hin11-ch12", name: "Vidaai Sambhashan", nameHi: "विदाई-संभाषण" },
        { id: "hin11-ch13", name: "Galta Loha", nameHi: "गलता लोहा" },
        { id: "hin11-ch14", name: "Rajni", nameHi: "रजनी" },
        { id: "hin11-ch15", name: "Jamun Ka Ped", nameHi: "जामुन का पेड़" },
        { id: "hin11-ch16", name: "Bharat Mata", nameHi: "भारत माता" },
      ]
    },
    {
      id: "hindi-11-vitan",
      name: "Vitan Bhag 1",
      nameHi: "वितान भाग 1",
      chapters: [
        { id: "vit11-ch1", name: "Bharatiya Gayikaon Mein Bezod: Lata Mangeshkar", nameHi: "भारतीय गायिकाओं में बेजोड़: लता मंगेशकर" },
        { id: "vit11-ch2", name: "Rajasthan Ki Rajat Boonden", nameHi: "राजस्थान की रजत बूँदें" },
        { id: "vit11-ch3", name: "Aalo-Andhari", nameHi: "आलो-आँधारि" },
        { id: "vit11-ch4", name: "Bharatiya Kalaen", nameHi: "भारतीय कलाएँ" },
      ]
    },
  ]
}

export const class11ScienceStream: Stream = {
  id: "science-11",
  name: "Science",
  nameHi: "विज्ञान",
  subjects: [
    physics11,
    chemistry11,
    biology11,
    math11,
    english11,
    hindi11,
  ]
      }
        
