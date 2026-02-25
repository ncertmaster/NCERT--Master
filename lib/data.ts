port type ClassNumber = 6 | 7 | 8 | 9 | 10 | 11 | 12

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
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [{
        id: "math-6", name: "Mathematics", nameHi: "गणित",
        chapters: [
          { id: "m6-ch1", name: "Apni Sankhyaon Ki Jankari", nameHi: "अपनी संख्याओं की जानकारी" },
          { id: "m6-ch2", name: "Poorn Sankhyaen", nameHi: "पूर्ण संख्याएँ" },
          { id: "m6-ch3", name: "Sankhyaon Ke Saath Khelna", nameHi: "संख्याओं के साथ खेलना" },
          { id: "m6-ch4", name: "Aadharabhoot Jyamitiy Avdharnaen", nameHi: "आधारभूत ज्यामितीय अवधारणाएँ" },
          { id: "m6-ch5", name: "Prarambhik Aakar Samajhna", nameHi: "प्रारंभिक आकारों को समझना" },
          { id: "m6-ch6", name: "Poornanank", nameHi: "पूर्णांक" },
          { id: "m6-ch7", name: "Bhinn", nameHi: "भिन्न" },
          { id: "m6-ch8", name: "Dashamlav", nameHi: "दशमलव" },
          { id: "m6-ch9", name: "Aankdon Ka Prabandhan", nameHi: "आँकड़ों का प्रबंधन" },
          { id: "m6-ch10", name: "Kshetramiti", nameHi: "क्षेत्रमिति" },
          { id: "m6-ch11", name: "Beejganit", nameHi: "बीजगणित" },
          { id: "m6-ch12", name: "Anupat Aur Samanupat", nameHi: "अनुपात और समानुपात" },
        ]
      }]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [{
        id: "science-6", name: "Science", nameHi: "विज्ञान",
        chapters: [
          { id: "s6-ch1", name: "Bhojan Ke Ghatak", nameHi: "भोजन के घातक" },
          { id: "s6-ch2", name: "Vastuon Ke Samuh Banana", nameHi: "वस्तुओं के समूह बनाना" },
          { id: "s6-ch3", name: "Padarthon Ka Prithakaran", nameHi: "पदार्थों का पृथक्करण" },
          { id: "s6-ch4", name: "Paudhon Ko Janiye", nameHi: "पौधों को जानिए" },
          { id: "s6-ch5", name: "Sharir Mein Gati", nameHi: "शरीर में गति" },
          { id: "s6-ch6", name: "Sajiv Visheshataen Evam Aavas", nameHi: "सजीव – विशेषताएँ एवं आवास" },
          { id: "s6-ch7", name: "Gati Evam Doorion Ka Mapan", nameHi: "गति एवं दूरियों का मापन" },
          { id: "s6-ch8", name: "Prakash Chhayen Evam Paravartan", nameHi: "प्रकाश – छायाएँ एवं परावर्तन" },
          { id: "s6-ch9", name: "Vidyut Tatha Paripth", nameHi: "विद्युत् तथा परिपथ" },
          { id: "s6-ch10", name: "Chumbkon Dwara Manoranjan", nameHi: "चुंबकों द्वारा मनोरंजन" },
          { id: "s6-ch11", name: "Hamare Charon Aur Vayu", nameHi: "हमारे चारों ओर वायु" },
        ]
      }]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक विज्ञान", icon: "globe",
      books: [
        {
          id: "history-6", name: "Hamare Ateet 1 (History)", nameHi: "हमारे अतीत – 1 (इतिहास)",
          chapters: [
            { id: "h6-ch1", name: "Kya Kahan Kaise Aur Kab", nameHi: "क्या, कहाँ, कैसे और कब?" },
            { id: "h6-ch2", name: "Aakhet Khadya Sangrah Se Bhojan Utpadan Tak", nameHi: "आखेट-खाद्य संग्रह से भोजन उत्पादन तक" },
            { id: "h6-ch3", name: "Aarambhik Nagar", nameHi: "आरंभिक नगर" },
            { id: "h6-ch4", name: "Kya Batati Hain Kitaben Aur Kabren", nameHi: "क्या बताती हैं हमें किताबें और कब्रें" },
            { id: "h6-ch5", name: "Rajya Raja Aur Ek Prachin Ganarajya", nameHi: "राज्य, राजा और एक प्राचीन गणराज्य" },
            { id: "h6-ch6", name: "Naye Prashn Naye Vichar", nameHi: "नये प्रश्न नये विचार" },
            { id: "h6-ch7", name: "Rajya Se Samrajya Tak", nameHi: "राज्य से साम्राज्य तक" },
            { id: "h6-ch8", name: "Gaon Shahar Aur Vyapar", nameHi: "गाँव, शहर और व्यापार" },
            { id: "h6-ch9", name: "Naye Samrajya Aur Rajya", nameHi: "नए साम्राज्य और राज्य" },
            { id: "h6-ch10", name: "Imaraten Chitra Tatha Kitaben", nameHi: "इमारतें, चित्र तथा किताबें" },
          ]
        },
        {
          id: "geography-6", name: "Prithvi Hamara Avas (Geography)", nameHi: "पृथ्वी: हमारा आवास (भूगोल)",
          chapters: [
            { id: "g6-ch1", name: "Saurmandal Mein Prithvi", nameHi: "सौरमंडल में पृथ्वी" },
            { id: "g6-ch2", name: "Globe Akshansh Evam Deshantar", nameHi: "ग्लोब: अक्षांश एवं देशांतर" },
            { id: "g6-ch3", name: "Prithvi Ki Gatiyan", nameHi: "पृथ्वी की गतियाँ" },
            { id: "g6-ch4", name: "Manchitra", nameHi: "मानचित्र" },
            { id: "g6-ch5", name: "Prithvi Ke Pramukh Parimandal", nameHi: "पृथ्वी के प्रमुख परिमंडल" },
            { id: "g6-ch6", name: "Hamara Desh Bharat", nameHi: "हमारा देश: भारत" },
          ]
        },
        {
          id: "civics-6", name: "Samajik Evam Rajnitik Jeevan 1 (Civics)", nameHi: "सामाजिक एवं राजनीतिक जीवन – 1 (नागरिक शास्त्र)",
          chapters: [
            { id: "c6-ch1", name: "Vividhata Ki Samajh", nameHi: "विविधता की समझ" },
            { id: "c6-ch2", name: "Vividhata Evam Bhedbhav", nameHi: "विविधता एवं भेदभाव" },
            { id: "c6-ch3", name: "Sarkar Kya Hai", nameHi: "सरकार क्या है?" },
            { id: "c6-ch4", name: "Panchayati Raj", nameHi: "पंचायती राज" },
            { id: "c6-ch5", name: "Gaon Ka Prashasan", nameHi: "गाँव का प्रशासन" },
            { id: "c6-ch6", name: "Nagar Prashasan", nameHi: "नगर प्रशासन" },
            { id: "c6-ch7", name: "Gramin Kshetra Mein Aajivika", nameHi: "ग्रामीण क्षेत्र में आजीविका" },
            { id: "c6-ch8", name: "Shahari Kshetra Mein Aajivika", nameHi: "शहरी क्षेत्र में आजीविका" },
          ]
        },
      ]
    },
    {
      id: "english", name: "English", nameHi: "English", icon: "book-open",
      books: [
        {
          id: "honeysuckle-6", name: "Honeysuckle", nameHi: "Honeysuckle",
          chapters: [
            { id: "hs6-ch1", name: "Who Did Patrick's Homework?", nameHi: "Who Did Patrick's Homework?" },
            { id: "hs6-ch2", name: "How the Dog Found Himself a New Master!", nameHi: "How the Dog Found Himself a New Master!" },
            { id: "hs6-ch3", name: "Taro's Reward", nameHi: "Taro's Reward" },
            { id: "hs6-ch4", name: "An Indian-American Woman in Space: Kalpana Chawla", nameHi: "An Indian-American Woman in Space: Kalpana Chawla" },
            { id: "hs6-ch5", name: "A Different Kind of School", nameHi: "A Different Kind of School" },
            { id: "hs6-ch6", name: "Who I Am", nameHi: "Who I Am" },
            { id: "hs6-ch7", name: "Fair Play", nameHi: "Fair Play" },
            { id: "hs6-ch8", name: "The Banyan Tree", nameHi: "The Banyan Tree" },
          ]
        },
        {
          id: "pact-sun-6", name: "A Pact with the Sun (Supplementary)", nameHi: "A Pact with the Sun (पूरक पाठ्यपुस्तक)",
          chapters: [
            { id: "ps6-ch1", name: "A Tale of Two Birds", nameHi: "A Tale of Two Birds" },
            { id: "ps6-ch2", name: "The Friendly Mongoose", nameHi: "The Friendly Mongoose" },
            { id: "ps6-ch3", name: "The Shepherd's Treasure", nameHi: "The Shepherd's Treasure" },
            { id: "ps6-ch4", name: "Tansen", nameHi: "Tansen" },
            { id: "ps6-ch5", name: "The Old-Clock Shop", nameHi: "The Old-Clock Shop" },
            { id: "ps6-ch6", name: "The Wonder Called Sleep", nameHi: "The Wonder Called Sleep" },
            { id: "ps6-ch7", name: "A Pact with the Sun", nameHi: "A Pact with the Sun" },
          ]
        },
      ]
    },
  ],
  [
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [{
        id: "math-7", name: "Mathematics", nameHi: "गणित",
        chapters: [
          { id: "m7-ch1", name: "Poornanank", nameHi: "पूर्णांक" },
          { id: "m7-ch2", name: "Bhinn Evam Dashamlav", nameHi: "भिन्न एवं दशमलव" },
          { id: "m7-ch3", name: "Aankdon Ka Prabandhan", nameHi: "आँकड़ों का प्रबंधन" },
          { id: "m7-ch4", name: "Saral Samikaran", nameHi: "सरल समीकरण" },
          { id: "m7-ch5", name: "Rekha Evam Kon", nameHi: "रेखा एवं कोण" },
          { id: "m7-ch6", name: "Tribhuj Aur Uske Gun", nameHi: "त्रिभुज और उसके गुण" },
          { id: "m7-ch7", name: "Rashiyon Ki Tulna", nameHi: "राशियों की तुलना" },
          { id: "m7-ch8", name: "Parimey Sankhyaen", nameHi: "परिमेय संख्याएँ" },
          { id: "m7-ch9", name: "Parimap Aur Kshetrafal", nameHi: "परिमाप और क्षेत्रफल" },
          { id: "m7-ch10", name: "Beejiy Vyanjak", nameHi: "बीजीय व्यंजक" },
          { id: "m7-ch11", name: "Ghatank Aur Ghat", nameHi: "घातांक और घात" },
          { id: "m7-ch12", name: "Saamiti", nameHi: "सममिति" },
          { id: "m7-ch13", name: "Thos Aakaron Ka Chitran", nameHi: "ठोस आकारों का चित्रण" },
        ]
      }]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [{
        id: "science-7", name: "Science", nameHi: "विज्ञान",
        chapters: [
          { id: "s7-ch1", name: "Padhon Mein Poshan", nameHi: "पादपों में पोषण" },
          { id: "s7-ch2", name: "Praniyon Mein Poshan", nameHi: "प्राणियों में पोषण" },
          { id: "s7-ch3", name: "Ushma", nameHi: "ऊष्मा" },
          { id: "s7-ch4", name: "Aml Kshaarak Aur Lavan", nameHi: "अम्ल, क्षारक और लवण" },
          { id: "s7-ch5", name: "Bhautik Evam Rasayanik Parivartan", nameHi: "भौतिक एवं रासायनिक परिवर्तन" },
          { id: "s7-ch6", name: "Jeevon Mein Shwasan", nameHi: "जीवों में श्वसन" },
          { id: "s7-ch7", name: "Jantuon Aur Padhon Mein Parivahan", nameHi: "जंतुओं और पादप में परिवहन" },
          { id: "s7-ch8", name: "Padhon Mein Janan", nameHi: "पादप में जनन" },
          { id: "s7-ch9", name: "Gati Evam Samay", nameHi: "गति एवं समय" },
          { id: "s7-ch10", name: "Vidyut Dhara Aur Uske Prabhav", nameHi: "विधुत धारा और इसके प्रभाव" },
          { id: "s7-ch11", name: "Prakash", nameHi: "प्रकाश" },
          { id: "s7-ch12", name: "Van Hamari Jeevan Rekha", nameHi: "वन: हमारी जीवन रेखा" },
          { id: "s7-ch13", name: "Apashisht Jal Ki Kahani", nameHi: "अपशिष्ट जल की कहानी" },
        ]
      }]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक विज्ञान", icon: "globe",
      books: [
        {
          id: "history-7", name: "Hamare Ateet 2 (History)", nameHi: "हमारे अतीत – 2 (इतिहास)",
          chapters: [
            { id: "h7-ch1", name: "Hazar Varshon Ke Dauran Parivartan", nameHi: "प्रारंभिक कथन: हज़ार वर्षों के दौरान हुए परिवर्तनों की पड़ताल" },
            { id: "h7-ch2", name: "Naye Raja Aur Unke Rajya", nameHi: "नये राजा और उनके राज्य" },
            { id: "h7-ch3", name: "Delhi Barahvin Se Pandrahvin Shatabdi", nameHi: "दिल्ली: बारहवीं से पंद्रहवीं शताब्दी" },
            { id: "h7-ch4", name: "Mughal Solahvin Se Satrahvin Shatabdi", nameHi: "मुग़ल: सोलहवीं से सत्रहवीं शताब्दी" },
            { id: "h7-ch5", name: "Janjatiyan Khanabaadosh Aur Baste Samudaay", nameHi: "जनजातियाँ, खानाबदोश और एक जगह बसे हुए समुदाय" },
            { id: "h7-ch6", name: "Ishwar Se Anurag", nameHi: "ईश्वर से अनुराग" },
            { id: "h7-ch7", name: "Kshetriy Sanskritiyon Ka Nirman", nameHi: "क्षेत्रीय संस्कृतियों का निर्माण" },
            { id: "h7-ch8", name: "Atharahvin Shatabdi Mein Naye Rajnitik Gathan", nameHi: "अठारहवीं शताब्दी में नए राजनीतिक गठन" },
          ]
        },
        {
          id: "geography-7", name: "Hamara Paryavaran (Geography)", nameHi: "हमारा पर्यावरण (भूगोल)",
          chapters: [
            { id: "g7-ch1", name: "Paryavaran", nameHi: "पर्यावरण" },
            { id: "g7-ch2", name: "Hamari Prithvi Ke Andar", nameHi: "हमारी पृथ्वी के अंदर" },
            { id: "g7-ch3", name: "Hamari Badalti Prithvi", nameHi: "हमारी बदलती पृथ्वी" },
            { id: "g7-ch4", name: "Vayu", nameHi: "वायु" },
            { id: "g7-ch5", name: "Jal", nameHi: "जल" },
            { id: "g7-ch6", name: "Manav Paryavaran Anyonyakriya", nameHi: "मानव-पर्यावरण अन्योन्यक्रिया: उष्णकटिबंधीय एवं उपोष्ण प्रदेश" },
            { id: "g7-ch7", name: "Registan Mein Jeevan", nameHi: "रेगिस्तान में जीवन" },
          ]
        },
        {
          id: "civics-7", name: "Samajik Evam Rajnitik Jeevan 2 (Civics)", nameHi: "सामाजिक एवं राजनीतिक जीवन – 2 (नागरिक शास्त्र)",
          chapters: [
            { id: "c7-ch1", name: "Samanta", nameHi: "समानता" },
            { id: "c7-ch2", name: "Swasthya Mein Sarkar Ki Bhumika", nameHi: "स्वास्थ्य में सरकार की भूमिका" },
            { id: "c7-ch3", name: "Rajya Shasan Kaise Kaam Karta Hai", nameHi: "राज्य शासन कैसे काम करता है" },
            { id: "c7-ch4", name: "Ladke Aur Ladkiyon Ke Roop Mein Bada Hona", nameHi: "लड़के और लड़कियों के रूप में बड़ा होना" },
            { id: "c7-ch5", name: "Aurton Ne Badli Duniya", nameHi: "औरतों ने बदली दुनिया" },
            { id: "c7-ch6", name: "Sanchar Madhyamon Ko Samajhna", nameHi: "संचार माध्यमों को समझना" },
            { id: "c7-ch7", name: "Hamare Aaspaas Ke Bazar", nameHi: "हमारे आस-पास के बाज़ार" },
            { id: "c7-ch8", name: "Bazar Mein Ek Kameez", nameHi: "बाज़ार में एक कमीज़" },
          ]
        },
      ]
    },
    {
      id: "english", name: "English", nameHi: "English", icon: "book-open",
      books: [
        {
          id: "honeycomb-7", name: "Honeycomb", nameHi: "Honeycomb",
          chapters: [
            { id: "hc7-ch1", name: "Three Questions", nameHi: "Three Questions" },
            { id: "hc7-ch2", name: "A Gift of Chappals", nameHi: "A Gift of Chappals" },
            { id: "hc7-ch3", name: "Gopal and the Hilsa Fish", nameHi: "Gopal and the Hilsa Fish" },
            { id: "hc7-ch4", name: "The Ashes That Made Trees Bloom", nameHi: "The Ashes That Made Trees Bloom" },
            { id: "hc7-ch5", name: "Quality", nameHi: "Quality" },
            { id: "hc7-ch6", name: "Expert Detectives", nameHi: "Expert Detectives" },
            { id: "hc7-ch7", name: "The Invention of Vita-Wonk", nameHi: "The Invention of Vita-Wonk" },
            { id: "hc7-ch8", name: "A Homage to our Brave Soldiers", nameHi: "A Homage to our Brave Soldiers" },
          ]
        },
        {
          id: "alien-hand-7", name: "An Alien Hand (Supplementary)", nameHi: "An Alien Hand (पूरक पाठ्यपुस्तक)",
          chapters: [
            { id: "ah7-ch1", name: "The Tiny Teacher", nameHi: "The Tiny Teacher" },
            { id: "ah7-ch2", name: "Bringing up Kari", nameHi: "Bringing up Kari" },
            { id: "ah7-ch3", name: "Golu Grows a Nose", nameHi: "Golu Grows a Nose" },
            { id: "ah7-ch4", name: "Chandni", nameHi: "Chandni" },
            { id: "ah7-ch5", name: "The Bear Story", nameHi: "The Bear Story" },
            { id: "ah7-ch6", name: "A Tiger in the House", nameHi: "A Tiger in the House" },
            { id: "ah7-ch7", name: "An Alien Hand", nameHi: "An Alien Hand" },
          ]
        },
      ]
    },
  ],
  [
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [{
        id: "math-8", name: "Mathematics", nameHi: "गणित",
        chapters: [
          { id: "m8-ch1", name: "Parimey Sankhyaen", nameHi: "परिमेय संख्याएँ" },
          { id: "m8-ch2", name: "Ek Char Wale Raikhik Samikaran", nameHi: "एक चर वाले रैखिक समीकरण" },
          { id: "m8-ch3", name: "Chaturbhujon Ko Samajhna", nameHi: "चतुर्भुजों को समझना" },
          { id: "m8-ch4", name: "Aankdon Ka Prabandhan", nameHi: "आँकड़ों का प्रबंधन" },
          { id: "m8-ch5", name: "Varg Aur Vargmool", nameHi: "वर्ग और वर्गमूल" },
          { id: "m8-ch6", name: "Ghan Aur Ghanmool", nameHi: "घन और घनमूल" },
          { id: "m8-ch7", name: "Rashiyon Ki Tulna", nameHi: "राशियों की तुलना" },
          { id: "m8-ch8", name: "Beejiy Vyanjak Evam Sarvasamikaen", nameHi: "बीजीय व्यंजक एवं सर्वसमिकाएँ" },
          { id: "m8-ch9", name: "Kshetramiti", nameHi: "क्षेत्रमिति" },
          { id: "m8-ch10", name: "Ghatank Aur Ghat", nameHi: "घातांक और घात" },
          { id: "m8-ch11", name: "Seedha Aur Pratilom Samanupat", nameHi: "सीधा और प्रतिलोम समानुपात" },
          { id: "m8-ch12", name: "Gunankhanadan", nameHi: "गुणनखंडन" },
          { id: "m8-ch13", name: "Aalegon Se Parichay", nameHi: "आलेखों से परिचय" },
        ]
      }]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [{
        id: "science-8", name: "Science", nameHi: "विज्ञान",
        chapters: [
          { id: "s8-ch1", name: "Fasal Utpadan Evam Prabandhan", nameHi: "फसल उत्पादन एवं प्रबंध" },
          { id: "s8-ch2", name: "Sukshmajeev Mitra Evam Shatru", nameHi: "सूक्ष्मजीव: मित्र एवं शत्रु" },
          { id: "s8-ch3", name: "Koyala Aur Petroleum", nameHi: "कोयला और पेट्रोलियम" },
          { id: "s8-ch4", name: "Dahan Aur Jwala", nameHi: "दहन और ज्वाला" },
          { id: "s8-ch5", name: "Paudhon Evam Jantuon Ka Sanrakshan", nameHi: "पौधों एवं जंतुओं का संरक्षण" },
          { id: "s8-ch6", name: "Jantuon Mein Janan", nameHi: "जंतुओं में जनन" },
          { id: "s8-ch7", name: "Kishoravastha Ki Or", nameHi: "किशोरावस्था की ओर" },
          { id: "s8-ch8", name: "Bal Tatha Daab", nameHi: "बल तथा दाब" },
          { id: "s8-ch9", name: "Gharshan", nameHi: "घर्षण" },
          { id: "s8-ch10", name: "Dhwani", nameHi: "ध्वनि" },
          { id: "s8-ch11", name: "Vidyut Dhara Ke Rasayanik Prabhav", nameHi: "विधुत धारा के रासायनिक प्रभाव" },
          { id: "s8-ch12", name: "Kuch Prakritik Parighatnaen", nameHi: "कुछ प्राकृतिक परिघटनाएँ" },
          { id: "s8-ch13", name: "Prakash", nameHi: "प्रकाश" },
        ]
      }]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक विज्ञान", icon: "globe",
      books: [
        {
          id: "history-8", name: "Hamare Ateet 3 (History)", nameHi: "हमारे अतीत – 3 (इतिहास)",
          chapters: [
            { id: "h8-ch1", name: "Kaise Kab Aur Kahan", nameHi: "कैसे, कब और कहाँ" },
            { id: "h8-ch2", name: "Vyapar Se Samrajya Tak", nameHi: "व्यापार से साम्राज्य तक" },
            { id: "h8-ch3", name: "Gramin Kshetra Par Shasan Chalana", nameHi: "ग्रामीण क्षेत्र पर शासन चलाना" },
            { id: "h8-ch4", name: "Aadivasi Diku Aur Swarn Yug", nameHi: "आदिवासी, दिकु और एक स्वर्ण युग की कल्पना" },
            { id: "h8-ch5", name: "Jab Janta Bagawat Karti Hai", nameHi: "जब जनता बगावत करती है (1857 और उसके बाद)" },
            { id: "h8-ch6", name: "Deshi Janta Ko Sabhya Banana", nameHi: "देशी जनता को सभ्य बनाना राष्ट्र को शिक्षित करना" },
            { id: "h8-ch7", name: "Mahilaen Jati Evam Sudhar", nameHi: "महिलाएँ, जाति एवं सुधार" },
            { id: "h8-ch8", name: "Rashtriy Andolan Ka Sanghatan", nameHi: "राष्ट्रीय आंदोलन का संघटन: 1870 के दशक से 1947 तक" },
          ]
        },
        {
          id: "geography-8", name: "Sansadhan Evam Vikas (Geography)", nameHi: "संसाधन एवं विकास (भूगोल)",
          chapters: [
            { id: "g8-ch1", name: "Sansadhan", nameHi: "संसाधन" },
            { id: "g8-ch2", name: "Bhoomi Mrida Jal Vanaspati Aur Vanya Jeev", nameHi: "भूमि, मृदा, जल, प्राकृतिक वनस्पति और वन्य जीव संसाधन" },
            { id: "g8-ch3", name: "Krishi", nameHi: "कृषि" },
            { id: "g8-ch4", name: "Udyog", nameHi: "उद्योग" },
            { id: "g8-ch5", name: "Manav Sansadhan", nameHi: "मानव संसाधन" },
          ]
        },
        {
          id: "civics-8", name: "Samajik Evam Rajnitik Jeevan 3 (Civics)", nameHi: "सामाजिक एवं राजनीतिक जीवन – 3 (नागरिक शास्त्र)",
          chapters: [
            { id: "c8-ch1", name: "Bhartiya Samvidhan", nameHi: "भारतीय संविधान" },
            { id: "c8-ch2", name: "Dharmnirpekshata Ki Samajh", nameHi: "धर्मनिरपेक्षता की समझ" },
            { id: "c8-ch3", name: "Sansad Tatha Kanoon Ka Nirman", nameHi: "संसद तथा कानूनों का निर्माण" },
            { id: "c8-ch4", name: "Nyaypalika", nameHi: "न्यायपालिका" },
            { id: "c8-ch5", name: "Hashiyakaran Ki Samajh", nameHi: "हाशियाकरण की समझ" },
            { id: "c8-ch6", name: "Hashiyakaran Se Nipatna", nameHi: "हाशियाकरण से निपटना" },
            { id: "c8-ch7", name: "Sarvajanik Suvidhaen", nameHi: "सार्वजनिक सुविधाएँ" },
            { id: "c8-ch8", name: "Kanoon Aur Samajik Nyay", nameHi: "कानून और सामाजिक न्याय" },
          ]
        },
      ]
    },
    {
      id: "english", name: "English", nameHi: "English", icon: "book-open",
      books: [
        {
          id: "honeydew-8", name: "Honeydew", nameHi: "Honeydew",
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
          id: "it-so-happened-8", name: "It So Happened (Supplementary)", nameHi: "It So Happened (पूरक पाठ्यपुस्तक)",
          chapters: [
            { id: "ish8-ch1", name: "How the Camel got his Hump", nameHi: "How the Camel got his Hump" },
            { id: "ish8-ch2", name: "Children at Work", nameHi: "Children at Work" },
            { id: "ish8-ch3", name: "The Selfish Giant", nameHi: "The Selfish Giant" },
            { id: "ish8-ch4", name: "The Treasure Within", nameHi: "The Treasure Within" },
            { id: "ish8-ch5", name: "Princess September", nameHi: "Princess September" },
            { id: "ish8-ch6", name: "The Fight", nameHi: "The Fight" },
            { id: "ish8-ch7", name: "Jalebis", nameHi: "Jalebis" },
            { id: "ish8-ch8", name: "Ancient Education System of India", nameHi: "Ancient Education System of India" },
          ]
        },
      ]
    },
  ],
  [
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [{
        id: "math-9", name: "Mathematics", nameHi: "गणित",
        chapters: [
          { id: "m9-ch1", name: "Sankhya Paddhati", nameHi: "संख्या पद्धति" },
          { id: "m9-ch2", name: "Bahupd", nameHi: "बहुपद" },
          { id: "m9-ch3", name: "Nirdeshank Jyamiti", nameHi: "निर्देशांक ज्यामिति" },
          { id: "m9-ch4", name: "Do Charon Wale Raikhik Samikaran", nameHi: "दो चरों वाले रैखिक समीकरण" },
          { id: "m9-ch5", name: "Euclid Ki Jyamiti Ka Parichay", nameHi: "यूक्लिड की ज्यामिति का परिचय" },
          { id: "m9-ch6", name: "Rekhaen Aur Kon", nameHi: "रेखाएँ और कोण" },
          { id: "m9-ch7", name: "Tribhuj", nameHi: "त्रिभुज" },
          { id: "m9-ch8", name: "Chaturbhuj", nameHi: "चतुर्भुज" },
          { id: "m9-ch9", name: "Vratt", nameHi: "वृत्त" },
          { id: "m9-ch10", name: "Heron Ka Sutra", nameHi: "हीरोन का सूत्र" },
          { id: "m9-ch11", name: "Prishtiy Kshetrafal Aur Aaytan", nameHi: "पृष्ठीय क्षेत्रफल और आयतन" },
          { id: "m9-ch12", name: "Sankhyiki", nameHi: "सांख्यिकी" },
        ]
      }]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [{
        id: "science-9", name: "Science", nameHi: "विज्ञान",
        chapters: [
          { id: "s9-ch1", name: "Hamare Aaspaas Ke Padarth", nameHi: "हमारे आस-पास के पदार्थ" },
          { id: "s9-ch2", name: "Kya Hamare Aaspaas Ke Padarth Shuddh Hain", nameHi: "क्या हमारे आस-पास के पदार्थ शुद्ध हैं" },
          { id: "s9-ch3", name: "Parmaanu Evam Anu", nameHi: "परमाणु एवं अणु" },
          { id: "s9-ch4", name: "Parmaanu Ki Sanrachna", nameHi: "परमाणु की संरचना" },
          { id: "s9-ch5", name: "Jeevan Ki Maulik Ikaai", nameHi: "जीवन की मौलिक इकाई" },
          { id: "s9-ch6", name: "Utak", nameHi: "ऊतक" },
          { id: "s9-ch7", name: "Gati", nameHi: "गति" },
          { id: "s9-ch8", name: "Bal Tatha Gati Ke Niyam", nameHi: "बल तथा गति के नियम" },
          { id: "s9-ch9", name: "Gurutvakarshn", nameHi: "गुरुत्वाकर्षण" },
          { id: "s9-ch10", name: "Karya Tatha Urja", nameHi: "कार्य तथा ऊर्जा" },
          { id: "s9-ch11", name: "Dhwani", nameHi: "ध्वनि" },
          { id: "s9-ch12", name: "Khadya Sansadhanon Mein Sudhar", nameHi: "खाद्य संसाधनों में सुधार" },
        ]
      }]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक विज्ञान", icon: "globe",
      books: [
        {
          id: "history-9", name: "Bharat Aur Samkalin Vishwa 1 (History)", nameHi: "भारत और समकालीन विश्व – 1 (इतिहास)",
          chapters: [
            { id: "h9-ch1", name: "Fransisi Kranti", nameHi: "फ्रांसीसी क्रांति" },
            { id: "h9-ch2", name: "Europe Mein Samajvad Evam Rusi Kranti", nameHi: "यूरोप में समाजवाद एवं रूसी क्रांति" },
            { id: "h9-ch3", name: "Natsivad Aur Hitler Ka Uday", nameHi: "नात्सीवाद और हिटलर का उदय" },
            { id: "h9-ch4", name: "Van Samaj Aur Upniveshvad", nameHi: "वन्य समाज और उपनिवेशवाद" },
            { id: "h9-ch5", name: "Aadhunik Vishwa Mein Charvahe", nameHi: "आधुनिक विश्व में चरवाहे" },
          ]
        },
        {
          id: "geography-9", name: "Samkalin Bharat 1 (Geography)", nameHi: "समकालीन भारत – 1 (भूगोल)",
          chapters: [
            { id: "g9-ch1", name: "Bharat Aakar Aur Sthiti", nameHi: "भारत - आकार और स्थिति" },
            { id: "g9-ch2", name: "Bharat Ka Bhautik Swaroop", nameHi: "भारत का भौतिक स्वरूप" },
            { id: "g9-ch3", name: "Apvah", nameHi: "अपवाह" },
            { id: "g9-ch4", name: "Jalvayu", nameHi: "जलवायु" },
            { id: "g9-ch5", name: "Prakritik Vanaspati Tatha Vanya Prani", nameHi: "प्राकृतिक वनस्पति तथा वन्य प्राणी" },
            { id: "g9-ch6", name: "Janasankhya", nameHi: "जनसंख्या" },
          ]
        },
        {
          id: "civics-9", name: "Loktantrik Rajniti 1 (Civics)", nameHi: "लोकतांत्रिक राजनीति – 1 (नागरिक शास्त्र)",
          chapters: [
            { id: "c9-ch1", name: "Loktantra Kya Loktantra Kyon", nameHi: "लोकतंत्र क्या? लोकतंत्र क्यों?" },
            { id: "c9-ch2", name: "Samvidhan Nirman", nameHi: "संविधान निर्माण" },
            { id: "c9-ch3", name: "Chunavi Rajniti", nameHi: "चुनावी राजनीति" },
            { id: "c9-ch4", name: "Sansthaon Ka Kamkaaj", nameHi: "संस्थाओं का कामकाज" },
            { id: "c9-ch5", name: "Loktantrik Adhikar", nameHi: "लोकतांत्रिक अधिकार" },
          ]
        },
        {
          id: "economics-9", name: "Arthshastra (Economics)", nameHi: "अर्थशास्त्र",
          chapters: [
            { id: "e9-ch1", name: "Palampur Gaon Ki Kahani", nameHi: "पालमपुर गाँव की कहानी" },
            { id: "e9-ch2", name: "Sansadhan Ke Roop Mein Log", nameHi: "संसाधन के रूप में लोग" },
            { id: "e9-ch3", name: "Nirdhanta Ek Chunauti", nameHi: "निर्धनता: एक चुनौती" },
            { id: "e9-ch4", name: "Bharat Mein Khadya Suraksha", nameHi: "भारत में खाद्य सुरक्षा" },
          ]
        },
      ]
    },
    {
      id: "english", name: "English", nameHi: "English", icon: "book-open",
      books: [
        {
          id: "beehive-9", name: "Beehive", nameHi: "Beehive",
          chapters: [
            { id: "bh9-ch1", name: "The Fun They Had", nameHi: "The Fun They Had" },
            { id: "bh9-ch2", name: "The Sound of Music", nameHi: "The Sound of Music" },
            { id: "bh9-ch3", name: "The Little Girl", nameHi: "The Little Girl" },
            { id: "bh9-ch4", name: "A Truly Beautiful Mind", nameHi: "A Truly Beautiful Mind" },
            { id: "bh9-ch5", name: "The Snake and the Mirror", nameHi: "The Snake and the Mirror" },
            { id: "bh9-ch6", name: "My Childhood", nameHi: "My Childhood" },
            { id: "bh9-ch7", name: "Reach for the Top", nameHi: "Reach for the Top" },
            { id: "bh9-ch8", name: "Kathmandu", nameHi: "Kathmandu" },
            { id: "bh9-ch9", name: "If I Were You", nameHi: "If I Were You" },
          ]
        },
        {
          id: "moments-9", name: "Moments (Supplementary)", nameHi: "Moments (पूरक पाठ्यपुस्तक)",
          chapters: [
            { id: "mo9-ch1", name: "The Lost Child", nameHi: "The Lost Child" },
            { id: "mo9-ch2", name: "The Adventures of Toto", nameHi: "The Adventures of Toto" },
            { id: "mo9-ch3", name: "Iswaran the Storyteller", nameHi: "Iswaran the Storyteller" },
            { id: "mo9-ch4", name: "In the Kingdom of Fools", nameHi: "In the Kingdom of Fools" },
            { id: "mo9-ch5", name: "The Happy Prince", nameHi: "The Happy Prince" },
            { id: "mo9-ch6", name: "The Last Leaf", nameHi: "The Last Leaf" },
            { id: "mo9-ch7", name: "A House Is Not a Home", nameHi: "A House Is Not a Home" },
            { id: "mo9-ch8", name: "The Beggar", nameHi: "The Beggar" },
          ]
        },
      ]
    },
  ],
  [
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [{
        id: "math-10", name: "Mathematics", nameHi: "गणित",
        chapters: [
          { id: "m10-ch1", name: "Vastvik Sankhyaen", nameHi: "वास्तविक संख्याएँ" },
          { id: "m10-ch2", name: "Bahupd", nameHi: "बहुपद" },
          { id: "m10-ch3", name: "Do Char Wale Raikhik Samikaran Yugm", nameHi: "दो चर वाले रैखिक समीकरण युग्म" },
          { id: "m10-ch4", name: "Dwisghat Samikaran", nameHi: "द्विघात समीकरण" },
          { id: "m10-ch5", name: "Samantar Shredian", nameHi: "समांतर श्रेढ़ियाँ" },
          { id: "m10-ch6", name: "Tribhuj", nameHi: "त्रिभुज" },
          { id: "m10-ch7", name: "Nirdeshank Jyamiti", nameHi: "निर्देशांक ज्यामिति" },
          { id: "m10-ch8", name: "Trikonmiti Ka Parichay", nameHi: "त्रिकोणमिति का परिचय" },
          { id: "m10-ch9", name: "Trikonmiti Ke Kuch Anuprayog", nameHi: "त्रिकोणमिति के कुछ अनुप्रयोग" },
          { id: "m10-ch10", name: "Vratt", nameHi: "वृत्त" },
          { id: "m10-ch11", name: "Vritton Se Sambandhit Kshetrafal", nameHi: "वृत्तों से संबंधित क्षेत्रफल" },
          { id: "m10-ch12", name: "Prishtiy Kshetrafal Aur Aaytan", nameHi: "पृष्ठीय क्षेत्रफल और आयतन" },
          { id: "m10-ch13", name: "Sankhyiki", nameHi: "सांख्यिकी" },
          { id: "m10-ch14", name: "Prayikta", nameHi: "प्रायिकता" },
        ]
      }]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [{
        id: "science-10", name: "Science", nameHi: "विज्ञान",
        chapters: [
          { id: "s10-ch1", name: "Rasayanik Abhikriyaen Evam Samikaran", nameHi: "रासायनिक अभिक्रियाएँ एवं समीकरण" },
          { id: "s10-ch2", name: "Aml Kshaarak Evam Lavan", nameHi: "अम्ल, क्षारक एवं लवण" },
          { id: "s10-ch3", name: "Dhatu Evam Adhatu", nameHi: "धातु एवं अधातु" },
          { id: "s10-ch4", name: "Carbon Evam Uske Yaugik", nameHi: "कार्बन एवं उसके यौगिक" },
          { id: "s10-ch5", name: "Jaiv Prakram", nameHi: "जैव प्रक्रम" },
          { id: "s10-ch6", name: "Niyantran Evam Samvay", nameHi: "नियंत्रण एवं समन्वय" },
          { id: "s10-ch7", name: "Jeev Janan Kaise Karte Hain", nameHi: "जीव जनन कैसे करते हैं?" },
          { id: "s10-ch8", name: "Aanuvansikta", nameHi: "आनुवंशिकता" },
          { id: "s10-ch9", name: "Prakash Paravartan Tatha Apvartan", nameHi: "प्रकाश – परावर्तन तथा अपवर्तन" },
          { id: "s10-ch10", name: "Manav Netra Tatha Rangibirangi Sansar", nameHi: "मानव नेत्र तथा रंगबिरंगा संसार" },
          { id: "s10-ch11", name: "Vidyut", nameHi: "विद्युत" },
          { id: "s10-ch12", name: "Vidyut Dhara Ke Chumbakiy Prabhav", nameHi: "विद्युत धारा के चुंबकीय प्रभाव" },
          { id: "s10-ch13", name: "Hamara Paryavaran", nameHi: "हमारा पर्यावरण" },
        ]
      }]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक विज्ञान", icon: "globe",
      books: [
        {
          id: "history-10", name: "Bharat Aur Samkalin Vishwa 2 (History)", nameHi: "भारत और समकालीन विश्व – 2 (इतिहास)",
          chapters: [
            { id: "h10-ch1", name: "Europe Mein Rashtravad Ka Uday", nameHi: "यूरोप में राष्ट्रवाद का उदय" },
            { id: "h10-ch2", name: "Bharat Mein Rashtravad", nameHi: "भारत में राष्ट्रवाद" },
            { id: "h10-ch3", name: "Bhumandlikit Vishwa Ka Banana", nameHi: "भूमंडलीकृत विश्व का बनना" },
            { id: "h10-ch4", name: "Audyogikaran Ka Yug", nameHi: "औद्योगिकीकरण का युग" },
            { id: "h10-ch5", name: "Mudran Sanskriti Aur Aadhunik Duniya", nameHi: "मुद्रण संस्कृति और आधुनिक दुनिया" },
          ]
        },
        {
          id: "geography-10", name: "Samkalin Bharat 2 (Geography)", nameHi: "समकालीन भारत – 2 (भूगोल)",
          chapters: [
            { id: "g10-ch1", name: "Sansadhan Evam Vikas", nameHi: "संसाधन एवं विकास" },
            { id: "g10-ch2", name: "Van Evam Vanya Jeev Sansadhan", nameHi: "वन एवं वन्य जीव संसाधन" },
            { id: "g10-ch3", name: "Jal Sansadhan", nameHi: "जल संसाधन" },
            { id: "g10-ch4", name: "Krishi", nameHi: "कृषि" },
            { id: "g10-ch5", name: "Khanij Tatha Urja Sansadhan", nameHi: "खनिज तथा ऊर्जा संसाधन" },
            { id: "g10-ch6", name: "Vinirman Udyog", nameHi: "विनिर्माण उद्योग" },
            { id: "g10-ch7", name: "Rashtriy Arthvyavastha Ki Jeevan Rekhaen", nameHi: "राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएँ" },
          ]
        },
        {
          id: "civics-10", name: "Loktantrik Rajniti 2 (Civics)", nameHi: "लोकतांत्रिक राजनीति – 2 (नागरिक शास्त्र)",
          chapters: [
            { id: "c10-ch1", name: "Satta Ki Sajhedari", nameHi: "सत्ता की साझेदारी" },
            { id: "c10-ch2", name: "Sanghvad", nameHi: "संघवाद" },
            { id: "c10-ch3", name: "Jati Dharm Aur Laingik Masle", nameHi: "जाति, धर्म और लैंगिक मसले" },
            { id: "c10-ch4", name: "Rajnitik Dal", nameHi: "राजनीतिक दल" },
            { id: "c10-ch5", name: "Loktantra Ke Parinam", nameHi: "लोकतंत्र के परिणाम" },
          ]
        },
        {
          id: "economics-10", name: "Arthik Vikas Ki Samajh (Economics)", nameHi: "आर्थिक विकास की समझ",
          chapters: [
            { id: "e10-ch1", name: "Vikas", nameHi: "विकास" },
            { id: "e10-ch2", name: "Bhartiya Arthvyavastha Ke Kshetrak", nameHi: "भारतीय अर्थव्यवस्था के क्षेत्रक" },
            { id: "e10-ch3", name: "Mudra Aur Saakh", nameHi: "मुद्रा और साख" },
            { id: "e10-ch4", name: "Vaishvikaran Aur Bhartiya Arthvyavastha", nameHi: "वैश्वीकरण और भारतीय अर्थव्यवस्था" },
            { id: "e10-ch5", name: "Upbhokta Adhikar", nameHi: "उपभोक्ता अधिकार" },
          ]
        },
      ]
    },
    {
      id: "english", name: "English", nameHi: "English", icon: "book-open",
      books: [
        {
          id: "first-flight-10", name: "First Flight", nameHi: "First Flight",
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
          ]
        },
        {
          id: "footprints-10", name: "Footprints Without Feet (Supplementary)", nameHi: "Footprints Without Feet (पूरक पाठ्यपुस्तक)",
          chapters: [
            { id: "fw10-ch1", name: "A Triumph of Surgery", nameHi: "A Triumph of Surgery" },
            { id: "fw10-ch2", name: "The Thief's Story", nameHi: "The Thief's Story" },
            { id: "fw10-ch3", name: "The Midnight Visitor", nameHi: "The Midnight Visitor" },
            { id: "fw10-ch4", name: "A Question of Trust", nameHi: "A Question of Trust" },
            { id: "fw10-ch5", name: "Footprints Without Feet", nameHi: "Footprints Without Feet" },
            { id: "fw10-ch6", name: "The Making of a Scientist", nameHi: "The Making of a Scientist" },
            { id: "fw10-ch7", name: "The Necklace", nameHi: "The Necklace" },
            { id: "fw10-ch8", name: "Bholi", nameHi: "Bholi" },
            { id: "fw10-ch9", name: "The Book That Saved the Earth", nameHi: "The Book That Saved the Earth" },
          ]
        },
      ]
    },
  ],
  [
    {
      id: "science", name: "Science", nameHi: "विज्ञान",
      subjects: [
        {
          id: "physics", name: "Physics", nameHi: "भौतिक विज्ञान", icon: "atom",
          books: [
            {
              id: "physics-11-1", name: "Physics Part 1", nameHi: "भौतिक विज्ञान भाग 1",
              chapters: [
                { id: "ph11-ch1", name: "Bhautik Jagat", nameHi: "भौतिक जगत" },
                { id: "ph11-ch2", name: "Matra Aur Mapan", nameHi: "मात्रक और मापन" },
                { id: "ph11-ch3", name: "Saral Rekha Mein Gati", nameHi: "सरल रेखा में गति" },
                { id: "ph11-ch4", name: "Samtal Mein Gati", nameHi: "समतल में गति" },
                { id: "ph11-ch5", name: "Gati Ke Niyam", nameHi: "गति के नियम" },
                { id: "ph11-ch6", name: "Karya Urja Aur Shakti", nameHi: "कार्य, ऊर्जा और शक्ति" },
                { id: "ph11-ch7", name: "Kanon Ke Nikaay Tatha Ghurnan Gati", nameHi: "कणों के निकाय तथा घूर्णी गति" },
                { id: "ph11-ch8", name: "Gurutvakarshn", nameHi: "गुरुत्वाकर्षण" },
              ]
            },
            {
              id: "physics-11-2", name: "Physics Part 2", nameHi: "भौतिक विज्ञान भाग 2",
              chapters: [
                { id: "ph11-ch9", name: "Thoson Ke Yantrik Gun", nameHi: "ठोसों के यांत्रिक गुण" },
                { id: "ph11-ch10", name: "Taralon Ke Yantrik Gun", nameHi: "तरलों के यांत्रिकी गुण" },
                { id: "ph11-ch11", name: "Dravya Ke Tapiy Gun", nameHi: "द्रव्य के तापीय गुण" },
                { id: "ph11-ch12", name: "Ushmagatikim", nameHi: "ऊष्मागतिकी" },
                { id: "ph11-ch13", name: "Anugati Siddhant", nameHi: "अणुगति सिद्धांत" },
                { id: "ph11-ch14", name: "Doolan", nameHi: "दोलन" },
                { id: "ph11-ch15", name: "Tarangen", nameHi: "तरंगें" },
              ]
            },
          ]
        },
        {
          id: "chemistry", name: "Chemistry", nameHi: "रसायन विज्ञान", icon: "flask",
          books: [
            {
              id: "chemistry-11-1", name: "Chemistry Part 1", nameHi: "रसायन विज्ञान भाग 1",
              chapters: [
                { id: "ch11-ch1", name: "Rasayan Vigyan Ki Kuch Mool Avdharnaen", nameHi: "रसायन विज्ञान की कुछ मूल अवधारणाएँ" },
                { id: "ch11-ch2", name: "Parmaanu Ki Sanrachna", nameHi: "परमाणु की संरचना" },
                { id: "ch11-ch3", name: "Tatvon Ka Vargikaran Evam Gunon Mein Aavartita", nameHi: "तत्वों का वर्गीकरण एवं गुणधर्मों में आवर्तिता" },
                { id: "ch11-ch4", name: "Rasayanik Aabandhan Tatha Aanvik Sanrachna", nameHi: "रासायनिक आबंधन तथा आण्विक संरचना" },
                { id: "ch11-ch5", name: "Dravya Ki Avasthaaen", nameHi: "द्रव्य की अवस्थाएँ" },
                { id: "ch11-ch6", name: "Ushmagatikim", nameHi: "ऊष्मागतिकी" },
                { id: "ch11-ch7", name: "Samyavastha", nameHi: "साम्यावस्था" },
              ]
            },
            {
              id: "chemistry-11-2", name: "Chemistry Part 2", nameHi: "रसायन विज्ञान भाग 2",
              chapters: [
                { id: "ch11-ch8", name: "Apchayopchay Abhikriyaen", nameHi: "अपचयोपचय अभिक्रियाएँ" },
                { id: "ch11-ch9", name: "Hydrogen", nameHi: "हाइड्रोजन" },
                { id: "ch11-ch10", name: "S-Block Tatv", nameHi: "s-ब्लॉक तत्व" },
                { id: "ch11-ch11", name: "P-Block Tatv", nameHi: "p-ब्लॉक तत्व" },
                { id: "ch11-ch12", name: "Karbanik Rasayan Kuch Aadharabhoot Siddhant", nameHi: "कार्बनिक रसायन: कुछ आधारभूत सिद्धांत तथा तकनीकें" },
                { id: "ch11-ch13", name: "Hydrocarbon", nameHi: "हाइड्रोकार्बन" },
                { id: "ch11-ch14", name: "Paryavarniy Rasayan", nameHi: "पर्यावरणीय रसायन" },
              ]
            },
          ]
        },
        {
          id: "biology", name: "Biology", nameHi: "जीव विज्ञान", icon: "leaf",
          books: [{
            id: "biology-11", name: "Biology", nameHi: "जीव विज्ञान",
            chapters: [
              { id: "bi11-ch1", name: "Jeev Jagat", nameHi: "जीव जगत" },
              { id: "bi11-ch2", name: "Jeev Jagat Ka Vargikaran", nameHi: "जीव जगत का वर्गीकरण" },
              { id: "bi11-ch3", name: "Vanaspati Jagat", nameHi: "वनस्पति जगत" },
              { id: "bi11-ch4", name: "Prani Jagat", nameHi: "प्राणि जगत" },
              { id: "bi11-ch5", name: "Pushpi Padhon Ki Aakariki", nameHi: "पुष्पी पादपों की आकारिकी" },
              { id: "bi11-ch6", name: "Pushpi Padhon Ka Sharir", nameHi: "पुष्पी पादपों का शरीर" },
              { id: "bi11-ch7", name: "Praniyon Mein Sanrachnatmak Sangathan", nameHi: "प्राणियों में संरचनात्मक संगठन" },
              { id: "bi11-ch8", name: "Koshika Jeevan Ki Ikaai", nameHi: "कोशिका: जीवन की इकाई" },
              { id: "bi11-ch9", name: "Jaiv Anu", nameHi: "जैव अणु" },
              { id: "bi11-ch10", name: "Koshika Chakra Aur Koshika Vibhajan", nameHi: "कोशिका चक्र और कोशिका विभाजन" },
              { id: "bi11-ch11", name: "Paudhon Mein Parivahan", nameHi: "पौधों में परिवहन" },
              { id: "bi11-ch12", name: "Khanij Poshan", nameHi: "खनिज पोषण" },
              { id: "bi11-ch13", name: "Uchch Padhon Mein Prakash-Sanshleshan", nameHi: "उच्च पादपों में प्रकाश-संश्लेषण" },
              { id: "bi11-ch14", name: "Padap Mein Shwasan", nameHi: "पादप में श्वसन" },
              { id: "bi11-ch15", name: "Padap Vriddhi Evam Parwardhan", nameHi: "पादप वृद्धि एवं परिवर्धन" },
              { id: "bi11-ch16", name: "Pachan Evam Avshoshad", nameHi: "पाचन एवं अवशोषण" },
              { id: "bi11-ch17", name: "Shwasan Aur Gaison Ka Vinimay", nameHi: "श्वसन और गैसों का विनिमय" },
              { id: "bi11-ch18", name: "Sharir Drav Tatha Parisancharan", nameHi: "शरीर द्रव तथा परिसंचरण" },
              { id: "bi11-ch19", name: "Utsarji Utpad Evam Unka Nishkasan", nameHi: "उत्सर्जी उत्पाद एवं उनका निष्कासन" },
              { id: "bi11-ch20", name: "Gaman Evam Sanchalan", nameHi: "गमन एवं संचलन" },
              { id: "bi11-ch21", name: "Tantrikiy Niyantran Evam Samvay", nameHi: "तंत्रिकीय नियंत्रण एवं समन्वय" },
              { id: "bi11-ch22", name: "Rasayanik Samvay Tatha Ekikaran", nameHi: "रासायनिक समन्वय तथा एकीकरण" },
            ]
          }]
        },
        {
          id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
          books: [{
            id: "math-11", name: "Mathematics", nameHi: "गणित",
            chapters: [
              { id: "ma11-ch1", name: "Samucchay", nameHi: "समुच्चय (Sets)" },
              { id: "ma11-ch2", name: "Sambandh Evam Phaln", nameHi: "संबंध एवं फलन" },
              { id: "ma11-ch3", name: "Trikonmitiy Phaln", nameHi: "त्रिकोणमितीय फलन" },
              { id: "ma11-ch4", name: "Gannatiy Aagaman Ka Siddhant", nameHi: "गणितीय आगमन का सिद्धांत" },
              { id: "ma11-ch5", name: "Samishra Sankhyaen Aur Dwisghatiy Samikaran", nameHi: "सम्मिश्र संख्याएँ और द्विघातीय समीकरण" },
              { id: "ma11-ch6", name: "Raikhik Asamikaen", nameHi: "रैखिक असमिकाएँ" },
              { id: "ma11-ch7", name: "Kramachar Aur Sanchay", nameHi: "क्रमचय और संचय" },
              { id: "ma11-ch8", name: "Dwipad Prameya", nameHi: "द्विपद प्रमेय" },
              { id: "ma11-ch9", name: "Anukram Tatha Shreni", nameHi: "अनुक्रम तथा श्रेणी" },
              { id: "ma11-ch10", name: "Saral Rekhaen", nameHi: "सरल रेखाएँ" },
              { id: "ma11-ch11", name: "Shanku Parichhhed", nameHi: "शंकु परिच्छेद" },
              { id: "ma11-ch12", name: "Trivimiy Jyamiti Ka Parichay", nameHi: "त्रिविमीय ज्यामिति का परिचय" },
              { id: "ma11-ch13", name: "Seema Aur Avkalaj", nameHi: "सीमा और अवकलज" },
              { id: "ma11-ch14", name: "Gannatiy Vivechan", nameHi: "गणितीय विवेचन" },
              { id: "ma11-ch15", name: "Sankhyiki", nameHi: "सांख्यिकी" },
              { id: "ma11-ch16", name: "Prayikta", nameHi: "प्रायिकता" },
            ]
          }]
        },
        {
          id: "english", name: "English", nameHi: "English", icon: "book-open",
          books: [
            {
              id: "hornbill-11", name: "Hornbill", nameHi: "Hornbill",
              chapters: [
                { id: "ho11-ch1", name: "The Portrait of a Lady", nameHi: "The Portrait of a Lady" },
                { id: "ho11-ch2", name: "We're Not Afraid to Die", nameHi: "We're Not Afraid to Die" },
                { id: "ho11-ch3", name: "Discovering Tut", nameHi: "Discovering Tut" },
                { id: "ho11-ch4", name: "Landscape of the Soul", nameHi: "Landscape of the Soul" },
                { id: "ho11-ch5", name: "The Ailing Planet", nameHi: "The Ailing Planet" },
                { id: "ho11-ch6", name: "The Browning Version", nameHi: "The Browning Version" },
                { id: "ho11-ch7", name: "The Adventure", nameHi: "The Adventure" },
              ]
            },
            {
              id: "snapshots-11", name: "Snapshots (Supplementary)", nameHi: "Snapshots (पूरक पाठ्यपुस्तक)",
              chapters: [
                { id: "sn11-ch1", name: "The Summer of the Beautiful White Horse", nameHi: "The Summer of the Beautiful White Horse" },
                { id: "sn11-ch2", name: "The Address", nameHi: "The Address" },
                { id: "sn11-ch3", name: "Ranga's Marriage", nameHi: "Ranga's Marriage" },
                { id: "sn11-ch4", name: "Albert Einstein at School", nameHi: "Albert Einstein at School" },
                { id: "sn11-ch5", name: "Mother's Day", nameHi: "Mother's Day" },
                { id: "sn11-ch6", name: "The Ghat of the Only World", nameHi: "The Ghat of the Only World" },
                { id: "sn11-ch7", name: "Birth", nameHi: "Birth" },
                { id: "sn11-ch8", name: "The Tale of Melon City", nameHi: "The Tale of Melon City" },
              ]
            },
          ]
        },
        {
          id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
          books: [
            {
              id: "aroh-11", name: "Aroh Bhag 1", nameHi: "आरोह भाग 1",
              chapters: [
                { id: "ar11-ch1", name: "Kabir (Kabita)", nameHi: "कबीर" },
                { id: "ar11-ch2", name: "Meera (Kabita)", nameHi: "मीरा" },
                { id: "ar11-ch3", name: "Ramnresh Tripathi (Kabita)", nameHi: "रामनरेश त्रिपाठी" },
                { id: "ar11-ch4", name: "Sumitranandan Pant (Kabita)", nameHi: "सुमित्रानंदन पंत" },
                { id: "ar11-ch5", name: "Bhawani Prasad Mishra (Kabita)", nameHi: "भवानी प्रसाद मिश्र" },
                { id: "ar11-ch6", name: "Trilochan (Kabita)", nameHi: "त्रिलोचन" },
                { id: "ar11-ch7", name: "Dushyant Kumar (Kabita)", nameHi: "दुष्यंत कुमार" },
                { id: "ar11-ch8", name: "Akk Mahadevi (Kabita)", nameHi: "अक्क महादेवी" },
                { id: "ar11-ch9", name: "Pash (Kabita)", nameHi: "पाश" },
                { id: "ar11-ch10", name: "Nirmala Putul (Kabita)", nameHi: "निर्मला पुतुल" },
                { id: "ar11-ch11", name: "Namak Ka Daroga (Gadya)", nameHi: "नमक का दरोगा" },
                { id: "ar11-ch12", name: "Miyan Nasiruddin (Gadya)", nameHi: "मियाँ नसीरुद्दीन" },
                { id: "ar11-ch13", name: "Appu Ke Saath Dhai Saal (Gadya)", nameHi: "अप्पू के साथ ढाई साल" },
                { id: "ar11-ch14", name: "Vidaai Sambhashan (Gadya)", nameHi: "विदाई-संभाषण" },
                { id: "ar11-ch15", name: "Galta Loha (Gadya)", nameHi: "गलता लोहा" },
                { id: "ar11-ch16", name: "Speeti Mein Baarish (Gadya)", nameHi: "स्पीति में बारिश" },
                { id: "ar11-ch17", name: "Rajni (Gadya)", nameHi: "रजनी" },
                { id: "ar11-ch18", name: "Jamun Ka Ped (Gadya)", nameHi: "जामुन का पेड़" },
                { id: "ar11-ch19", name: "Bharat Mata (Gadya)", nameHi: "भारत माता" },
                { id: "ar11-ch20", name: "Aatma Ka Taap (Gadya)", nameHi: "आत्मा का ताप" },
              ]
            },
            {
              id: "vitan-11", name: "Vitan Bhag 1 (Supplementary)", nameHi: "वितान भाग 1 (पूरक पाठ्यपुस्तक)",
              chapters: [
                { id: "vi11-ch1", name: "Bhartiya Gayika Lata Mangeshkar", nameHi: "भारतीय गायिका लता मंगेशकर" },
                { id: "vi11-ch2", name: "Rajasthan Ki Rajat Boonden", nameHi: "राजस्थान की रजत बूँदें" },
                { id: "vi11-ch3", name: "Aalo Aandhare", nameHi: "आलो आंधारि" },
                { id: "vi11-ch4", name: "Ghar Ki Yaad", nameHi: "घर की याद" },
                { id: "vi11-ch5", name: "Ek Kahani Yeh Bhi", nameHi: "एक कहानी यह भी" },
                { id: "vi11-ch6", name: "Pahchana Kaun", nameHi: "पहचाना कौन" },
              ]
            },
          ]
        },
      ]
    },
id: "commerce", name: "Commerce", nameHi: "वाणिज्य",
      subjects: [
        {
          id: "accountancy", name: "Accountancy", nameHi: "लेखाशास्त्र", icon: "book",
          books: [
            {
              id: "accountancy-11-1", name: "Financial Accounting Part 1", nameHi: "वित्तीय लेखांकन भाग 1",
              chapters: [
                { id: "ac11-ch1", name: "Lekhankan Ek Parichay", nameHi: "लेखांकन-एक परिचय" },
                { id: "ac11-ch2", name: "Lekhankan Ka Saiddhantik Aadhar", nameHi: "लेखांकन का सैद्धांतिक आधार" },
                { id: "ac11-ch3", name: "Len-Den Ka Abhilekhan 1", nameHi: "लेन-देनों का अभिलेखन-1" },
                { id: "ac11-ch4", name: "Len-Den Ka Abhilekhan 2", nameHi: "लेन-देनों का अभिलेखन-2" },
                { id: "ac11-ch5", name: "Bank Samadhan Vivaran", nameHi: "बैंक समाधान विवरण" },
                { id: "ac11-ch6", name: "Talapat Evam Ashudhiyon Ka Shodhan", nameHi: "तलपट एवं अशुद्धियों का शोधन" },
                { id: "ac11-ch7", name: "Hrash Pravdhan Aur Sanchay", nameHi: "ह्रास, प्रावधान और संचय" },
                { id: "ac11-ch8", name: "Vinimay Vipatr", nameHi: "विनिमय विपत्र" },
              ]
            },
            {
              id: "accountancy-11-2", name: "Financial Accounting Part 2", nameHi: "वित्तीय लेखांकन भाग 2",
              chapters: [
                { id: "ac11-ch9", name: "Vittiy Vivaran 1", nameHi: "वित्तीय विवरण-1" },
                { id: "ac11-ch10", name: "Vittiy Vivaran 2", nameHi: "वित्तीय विवरण-2" },
                { id: "ac11-ch11", name: "Apurn Abhilekh", nameHi: "अपूर्ण अभिलेखों से खाते" },
                { id: "ac11-ch12", name: "Lekhankan Mein Computer Ka Anuprayog", nameHi: "लेखांकन में कंप्यूटर का अनुप्रयोग" },
                { id: "ac11-ch13", name: "Computerikrit Lekhankan Pranali", nameHi: "कंप्यूटरीकृत लेखांकन प्रणाली" },
              ]
            },
          ]
        },
        {
          id: "business-studies", name: "Business Studies", nameHi: "व्यवसाय अध्ययन", icon: "briefcase",
          books: [{
            id: "business-11", name: "Business Studies", nameHi: "व्यवसाय अध्ययन",
            chapters: [
              { id: "bs11-ch1", name: "Vyavsay Vyapar Aur Vanijya", nameHi: "व्यवसाय, व्यापार और वाणिज्य" },
              { id: "bs11-ch2", name: "Vyavsayik Sangathan Ke Swaroop", nameHi: "व्यावसायिक संगठन के स्वरूप" },
              { id: "bs11-ch3", name: "Niji Sarvajanik Evam Bhumandliy Upkram", nameHi: "निजी, सार्वजनिक एवं भूमंडलीय उपक्रम" },
              { id: "bs11-ch4", name: "Vyavsayik Sevaen", nameHi: "व्यावसायिक सेवाएँ" },
              { id: "bs11-ch5", name: "Vyavsay Ki Ubharti Paddhatiyan", nameHi: "व्यवसाय की उभरती पद्धतियाँ" },
              { id: "bs11-ch6", name: "Samajik Uttardayitv Evam Vyavsayik Naitikta", nameHi: "व्यवसाय का सामाजिक उत्तरदायित्व एवं व्यावसायिक नैतिकता" },
              { id: "bs11-ch7", name: "Company Nirman", nameHi: "कंपनी निर्माण" },
              { id: "bs11-ch8", name: "Vyavsayik Vitt Ke Srot", nameHi: "व्यावसायिक वित्त के स्रोत" },
              { id: "bs11-ch9", name: "Laghu Vyavsay Evam Udyamita", nameHi: "लघु व्यवसाय एवं उद्यमिता" },
              { id: "bs11-ch10", name: "Aantarik Vyapar", nameHi: "आंतरिक व्यापार" },
              { id: "bs11-ch11", name: "Antarrashtriy Vyapar", nameHi: "अंतर्राष्ट्रीय व्यापार" },
            ]
          }]
        },
        {
          id: "economics", name: "Economics", nameHi: "अर्थशास्त्र", icon: "trending-up",
          books: [
            {
              id: "eco-dev-11", name: "Bhartiya Arthvyavastha Ka Vikas", nameHi: "भारतीय अर्थव्यवस्था का विकास",
              chapters: [
                { id: "ec11-ch1", name: "Swatantrata Ki Purvsandh Par Bhartiya Arthvyavastha", nameHi: "स्वतंत्रता की पूर्व संध्या पर भारतीय अर्थव्यवस्था" },
                { id: "ec11-ch2", name: "Bhartiya Arthvyavastha 1950-1990", nameHi: "भारतीय अर्थव्यवस्था (1950-1990)" },
                { id: "ec11-ch3", name: "Udarikaran Nijikaran Aur Vaishvikaran", nameHi: "उदारीकरण, निजीकरण और वैश्वीकरण: एक समीक्षा" },
                { id: "ec11-ch4", name: "Nirdhanta", nameHi: "निर्धनता" },
                { id: "ec11-ch5", name: "Bharat Mein Manav Punji Ka Nirman", nameHi: "भारत में मानव पूँजी का निर्माण" },
                { id: "ec11-ch6", name: "Gramin Vikas", nameHi: "ग्रामीण विकास" },
                { id: "ec11-ch7", name: "Rojgar Samvridhi Anaupacharikaran", nameHi: "रोजगार-संवृद्धि, अनौपचारीकरण एवं अन्य मुद्दे" },
                { id: "ec11-ch8", name: "Aadharbhut Sanrachna", nameHi: "आधारिक संरचना" },
                { id: "ec11-ch9", name: "Paryavaran Aur Dharaniy Vikas", nameHi: "पर्यावरण और धारणीय विकास" },
                { id: "ec11-ch10", name: "Bharat Aur Padosi Deshon Ke Tulnatmak Vikas Anubhav", nameHi: "भारत और इसके पड़ोसी देशों के तुलनात्मक विकास अनुभव" },
              ]
            },
            {
              id: "stats-11", name: "Statistics for Economics", nameHi: "सांख्यिकी (अर्थशास्त्र के लिए)",
              chapters: [
                { id: "st11-ch1", name: "Parichay", nameHi: "परिचय" },
                { id: "st11-ch2", name: "Aankdon Ka Sangrah", nameHi: "आँकड़ों का संग्रह" },
                { id: "st11-ch3", name: "Aankdon Ka Sangathan", nameHi: "आँकड़ों का संगठन" },
                { id: "st11-ch4", name: "Aankdon Ka Prastutikaran", nameHi: "आँकड़ों का प्रस्तुतीकरण" },
                { id: "st11-ch5", name: "Kendriy Pravriti Ke Maap", nameHi: "केंद्रीय प्रवृत्ति के माप" },
                { id: "st11-ch6", name: "Vikiran Ke Maap", nameHi: "परिक्षेपण के माप" },
                { id: "st11-ch7", name: "Sahsambandh", nameHi: "सहसंबंध" },
                { id: "st11-ch8", name: "Suchkank", nameHi: "सूचकांक" },
              ]
            },
          ]
        },
        {
          id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
          books: [{
            id: "math-11-com", name: "Mathematics", nameHi: "गणित",
            chapters: [
              { id: "ma11c-ch1", name: "Samucchay", nameHi: "समुच्चय (Sets)" },
              { id: "ma11c-ch2", name: "Sambandh Evam Phaln", nameHi: "संबंध एवं फलन" },
              { id: "ma11c-ch3", name: "Trikonmitiy Phaln", nameHi: "त्रिकोणमितीय फलन" },
              { id: "ma11c-ch4", name: "Gannatiy Aagaman Ka Siddhant", nameHi: "गणितीय आगमन का सिद्धांत" },
              { id: "ma11c-ch5", name: "Samishra Sankhyaen Aur Dwisghatiy Samikaran", nameHi: "सम्मिश्र संख्याएँ और द्विघातीय समीकरण" },
              { id: "ma11c-ch6", name: "Raikhik Asamikaen", nameHi: "रैखिक असमिकाएँ" },
              { id: "ma11c-ch7", name: "Kramachar Aur Sanchay", nameHi: "क्रमचय और संचय" },
              { id: "ma11c-ch8", name: "Dwipad Prameya", nameHi: "द्विपद प्रमेय" },
              { id: "ma11c-ch9", name: "Anukram Tatha Shreni", nameHi: "अनुक्रम तथा श्रेणी" },
              { id: "ma11c-ch10", name: "Saral Rekhaen", nameHi: "सरल रेखाएँ" },
              { id: "ma11c-ch11", name: "Shanku Parichhhed", nameHi: "शंकु परिच्छेद" },
              { id: "ma11c-ch12", name: "Trivimiy Jyamiti Ka Parichay", nameHi: "त्रिविमीय ज्यामिति का परिचय" },
              { id: "ma11c-ch13", name: "Seema Aur Avkalaj", nameHi: "सीमा और अवकलज" },
              { id: "ma11c-ch14", name: "Gannatiy Vivechan", nameHi: "गणितीय विवेचन" },
              { id: "ma11c-ch15", name: "Sankhyiki", nameHi: "सांख्यिकी" },
              { id: "ma11c-ch16", name: "Prayikta", nameHi: "प्रायिकता" },
            ]
          }]
        },
        {
          id: "english", name: "English", nameHi: "English", icon: "book-open",
          books: [
            {
              id: "hornbill-11-com", name: "Hornbill", nameHi: "Hornbill",
              chapters: [
                { id: "ho11c-ch1", name: "The Portrait of a Lady", nameHi: "The Portrait of a Lady" },
                { id: "ho11c-ch2", name: "We're Not Afraid to Die", nameHi: "We're Not Afraid to Die" },
                { id: "ho11c-ch3", name: "Discovering Tut", nameHi: "Discovering Tut" },
                { id: "ho11c-ch4", name: "Landscape of the Soul", nameHi: "Landscape of the Soul" },
                { id: "ho11c-ch5", name: "The Ailing Planet", nameHi: "The Ailing Planet" },
                { id: "ho11c-ch6", name: "The Browning Version", nameHi: "The Browning Version" },
                { id: "ho11c-ch7", name: "The Adventure", nameHi: "The Adventure" },
              ]
            },
            {
              id: "snapshots-11-com", name: "Snapshots (Supplementary)", nameHi: "Snapshots (पूरक पाठ्यपुस्तक)",
              chapters: [
                { id: "sn11c-ch1", name: "The Summer of the Beautiful White Horse", nameHi: "The Summer of the Beautiful White Horse" },
                { id: "sn11c-ch2", name: "The Address", nameHi: "The Address" },
                { id: "sn11c-ch3", name: "Ranga's Marriage", nameHi: "Ranga's Marriage" },
                { id: "sn11c-ch4", name: "Albert Einstein at School", nameHi: "Albert Einstein at School" },
                { id: "sn11c-ch5", name: "Mother's Day", nameHi: "Mother's Day" },
                { id: "sn11c-ch6", name: "The Ghat of the Only World", nameHi: "The Ghat of the Only World" },
                { id: "sn11c-ch7", name: "Birth", nameHi: "Birth" },
                { id: "sn11c-ch8", name: "The Tale of Melon City", nameHi: "The Tale of Melon City" },
              ]
            },
          ]
        },
        {
          id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
          books: [
            {
              id: "aroh-11-com", name: "Aroh Bhag 1", nameHi: "आरोह भाग 1",
              chapters: [
                { id: "ar11c-ch1", name: "Kabir (Kabita)", nameHi: "कबीर" },
                { id: "ar11c-ch2", name: "Meera (Kabita)", nameHi: "मीरा" },
                { id: "ar11c-ch3", name: "Ramnresh Tripathi (Kabita)", nameHi: "रामनरेश त्रिपाठी" },
                { id: "ar11c-ch4", name: "Sumitranandan Pant (Kabita)", nameHi: "सुमित्रानंदन पंत" },
                { id: "ar11c-ch5", name: "Bhawani Prasad Mishra (Kabita)", nameHi: "भवानी प्रसाद मिश्र" },
                { id: "ar11c-ch6", name: "Trilochan (Kabita)", nameHi: "त्रिलोचन" },
                { id: "ar11c-ch7", name: "Dushyant Kumar (Kabita)", nameHi: "दुष्यंत कुमार" },
                { id: "ar11c-ch8", name: "Akk Mahadevi (Kabita)", nameHi: "अक्क महादेवी" },
                { id: "ar11c-ch9", name: "Pash (Kabita)", nameHi: "पाश" },
                { id: "ar11c-ch10", name: "Nirmala Putul (Kabita)", nameHi: "निर्मला पुतुल" },
                { id: "ar11c-ch11", name: "Namak Ka Daroga (Gadya)", nameHi: "नमक का दरोगा" },
                { id: "ar11c-ch12", name: "Miyan Nasiruddin (Gadya)", nameHi: "मियाँ नसीरुद्दीन" },
                { id: "ar11c-ch13", name: "Appu Ke Saath Dhai Saal (Gadya)", nameHi: "अप्पू के साथ ढाई साल" },
                { id: "ar11c-ch14", name: "Vidaai Sambhashan (Gadya)", nameHi: "विदाई-संभाषण" },
                { id: "ar11c-ch15", name: "Galta Loha (Gadya)", nameHi: "गलता लोहा" },
                { id: "ar11c-ch16", name: "Speeti Mein Baarish (Gadya)", nameHi: "स्पीति में बारिश" },
                { id: "ar11c-ch17", name: "Rajni (Gadya)", nameHi: "रजनी" },
                { id: "ar11c-ch18", name: "Jamun Ka Ped (Gadya)", nameHi: "जामुन का पेड़" },
                { id: "ar11c-ch19", name: "Bharat Mata (Gadya)", nameHi: "भारत माता" },
                { id: "ar11c-ch20", name: "Aatma Ka Taap (Gadya)", nameHi: "आत्मा का ताप" },
              ]
            },
            {
              id: "vitan-11-com", name: "Vitan Bhag 1 (Supplementary)", nameHi: "वितान भाग 1 (पूरक पाठ्यपुस्तक)",
              chapters: [
                { id: "vi11c-ch1", name: "Bhartiya Gayika Lata Mangeshkar", nameHi: "भारतीय गायिका लता मंगेशकर" },
                { id: "vi11c-ch2", name: "Rajasthan Ki Rajat Boonden", nameHi: "राजस्थान की रजत बूँदें" },
                { id: "vi11c-ch3", name: "Aalo Aandhare", nameHi: "आलो आंधारि" },
                { id: "vi11c-ch4", name: "Ghar Ki Yaad", nameHi: "घर की याद" },
                { id: "vi11c-ch5", name: "Ek Kahani Yeh Bhi", nameHi: "एक कहानी यह भी" },
                { id: "vi11c-ch6", name: "Pahchana Kaun", nameHi: "पहचाना कौन" },
              ]
            },
          ]
        },
      ]
    },
  {
      id: "arts", name: "Arts", nameHi: "कला",
      subjects: [
        {
          id: "history", name: "History", nameHi: "इतिहास", icon: "book",
          books: [{
            id: "history-11", name: "Vishwa Itihas Ke Kuch Vishay", nameHi: "विश्व इतिहास के कुछ विषय",
            chapters: [
              { id: "hi11-ch1", name: "Samay Ki Shuruaat Se", nameHi: "समय की शुरुआत से" },
              { id: "hi11-ch2", name: "Lekhan Kala Aur Shahari Jeevan", nameHi: "लेखन कला और शहरी जीवन" },
              { id: "hi11-ch3", name: "Teen Mahadvipion Mein Phela Samrajya", nameHi: "तीन महाद्वीपों में फैला हुआ साम्राज्य" },
              { id: "hi11-ch4", name: "Islam Ka Uday Aur Vistar", nameHi: "इस्लाम का उदय और विस्तार" },
              { id: "hi11-ch5", name: "Yayavar Samrajya", nameHi: "यायावर साम्राज्य" },
              { id: "hi11-ch6", name: "Teen Varg", nameHi: "तीन वर्ग" },
              { id: "hi11-ch7", name: "Badalti Hui Sanskriti Paramparaen", nameHi: "बदलती हुई सांस्कृतिक परंपराएँ" },
              { id: "hi11-ch8", name: "Sanskritiyon Ka Takrav", nameHi: "संस्कृतियों का टकराव" },
              { id: "hi11-ch9", name: "Audyogik Kranti", nameHi: "औद्योगिक क्रांति" },
              { id: "hi11-ch10", name: "Mool Nivasiyon Ka Visthapan", nameHi: "मूल निवासियों का विस्थापन" },
              { id: "hi11-ch11", name: "Aadhunikaran Ke Raste", nameHi: "आधुनिकीकरण के रास्ते" },
            ]
          }]
        },
        {
          id: "political-science", name: "Political Science", nameHi: "राजनीति विज्ञान", icon: "landmark",
          books: [
            {
              id: "polsci-11-1", name: "Bharat Ka Samvidhan Siddhant Aur Vyavhar", nameHi: "भारत का संविधान: सिद्धांत और व्यवहार",
              chapters: [
                { id: "ps11-ch1", name: "Samvidhan Kyon Aur Kaise", nameHi: "संविधान: क्यों और कैसे?" },
                { id: "ps11-ch2", name: "Bhartiya Samvidhan Mein Adhikar", nameHi: "भारतीय संविधान में अधिकार" },
                { id: "ps11-ch3", name: "Chunav Aur Pratinidhitv", nameHi: "चुनाव और प्रतिनिधित्व" },
                { id: "ps11-ch4", name: "Karyapalika", nameHi: "कार्यपालिका" },
                { id: "ps11-ch5", name: "Vidhayika", nameHi: "विधायिका" },
                { id: "ps11-ch6", name: "Nyaypalika", nameHi: "न्यायपालिका" },
                { id: "ps11-ch7", name: "Sanghvad", nameHi: "संघवाद" },
                { id: "ps11-ch8", name: "Sthaniy Shasan", nameHi: "स्थानीय शासन" },
                { id: "ps11-ch9", name: "Samvidhan Ek Jeevant Dastavez", nameHi: "संविधान: एक जीवंत दस्तावेज़" },
                { id: "ps11-ch10", name: "Samvidhan Ka Rajnitik Darshan", nameHi: "संविधान का राजनीतिक दर्शन" },
              ]
            },
            {
              id: "polsci-11-2", name: "Rajnitik Siddhant", nameHi: "राजनीतिक सिद्धांत",
              chapters: [
                { id: "ps11-ch11", name: "Rajnitik Siddhant Ek Parichay", nameHi: "राजनीतिक सिद्धांत: एक परिचय" },
                { id: "ps11-ch12", name: "Swatantrata", nameHi: "स्वतंत्रता" },
                { id: "ps11-ch13", name: "Samanta", nameHi: "समानता" },
                { id: "ps11-ch14", name: "Samajik Nyay", nameHi: "सामाजिक न्याय" },
                { id: "ps11-ch15", name: "Adhikar", nameHi: "अधिकार" },
                { id: "ps11-ch16", name: "Nagrikta", nameHi: "नागरिकता" },
                { id: "ps11-ch17", name: "Rashtravad", nameHi: "राष्ट्रवाद" },
                { id: "ps11-ch18", name: "Dharmnirpekshata", nameHi: "धर्मनिरपेक्षता" },
                { id: "ps11-ch19", name: "Shanti", nameHi: "शांति" },
                { id: "ps11-ch20", name: "Vikas", nameHi: "विकास" },
              ]
            },
          ]
        },
        {
          id: "geography", name: "Geography", nameHi: "भूगोल", icon: "map",
          books: [{
            id: "geo-11", name: "Bhautik Bhugol Ke Mool Siddhant", nameHi: "भौतिक भूगोल के मूल सिद्धांत",
            chapters: [
              { id: "ge11-ch1", name: "Bhugol Ek Vishay Ke Roop Mein", nameHi: "भूगोल एक विषय के रूप में" },
              { id: "ge11-ch2", name: "Prithvi Ki Utpatti Evam Vikas", nameHi: "पृथ्वी की उत्पत्ति एवं विकास" },
              { id: "ge11-ch3", name: "Prithvi Ki Aantarik Sanrachna", nameHi: "पृथ्वी की आंतरिक संरचना" },
              { id: "ge11-ch4", name: "Mahsaagaron Aur Mahadvipion Ka Vitaran", nameHi: "महासागरों और महाद्वीपों का वितरण" },
              { id: "ge11-ch5", name: "Khanij Evam Shail", nameHi: "खनिज एवं शैल" },
              { id: "ge11-ch6", name: "Bhu-Aakriti Prakriyaen", nameHi: "भू-आकृतिक प्रक्रियाएँ" },
              { id: "ge11-ch7", name: "Bhu-Aakritiyan Tatha Unka Vikas", nameHi: "भू-आकृतियाँ तथा उनका विकास" },
              { id: "ge11-ch8", name: "Vayumandal Ka Sangathan Tatha Sanrachna", nameHi: "वायुमंडल का संघटन तथा संरचना" },
              { id: "ge11-ch9", name: "Saur Vikiran Ushma Santulan Evam Tapman", nameHi: "सौर विकिरण, ऊष्मा संतुलन एवं तापमान" },
              { id: "ge11-ch10", name: "Vayumandliy Parisancharan Tatha Mausam Pranaliyan", nameHi: "वायुमंडलीय परिसंचरण तथा मौसम प्रणालियाँ" },
              { id: "ge11-ch11", name: "Vayumandal Mein Jal", nameHi: "वायुमंडल में जल" },
              { id: "ge11-ch12", name: "Vishwa Ki Jalvayu Evam Jalvayu Parivartan", nameHi: "विश्व की जलवायु एवं जलवायु परिवर्तन" },
              { id: "ge11-ch13", name: "Mahasagariy Jal", nameHi: "महासागरीय जल" },
              { id: "ge11-ch14", name: "Mahasagariy Jal Sanchalan", nameHi: "महासागरीय जल संचलन" },
              { id: "ge11-ch15", name: "Prithvi Par Jeevan", nameHi: "पृथ्वी पर जीवन" },
              { id: "ge11-ch16", name: "Jaiv Vividhata Evam Sanrakshan", nameHi: "जैव-विविधता एवं संरक्षण" },
            ]
          }]
        },
        {
          id: "economics", name: "Economics", nameHi: "अर्थशास्त्र", icon: "trending-up",
          books: [
            {
              id: "eco-dev-11-arts", name: "Bhartiya Arthvyavastha Ka Vikas", nameHi: "भारतीय अर्थव्यवस्था का विकास",
              chapters: [
                { id: "ea11-ch1", name: "Swatantrata Ki Purvsandh Par Bhartiya Arthvyavastha", nameHi: "स्वतंत्रता की पूर्व संध्या पर भारतीय अर्थव्यवस्था" },
                { id: "ea11-ch2", name: "Bhartiya Arthvyavastha 1950-1990", nameHi: "भारतीय अर्थव्यवस्था (1950-1990)" },
                { id: "ea11-ch3", name: "Udarikaran Nijikaran Aur Vaishvikaran", nameHi: "उदारीकरण, निजीकरण और वैश्वीकरण: एक समीक्षा" },
                { id: "ea11-ch4", name: "Nirdhanta", nameHi: "निर्धनता" },
                { id: "ea11-ch5", name: "Bharat Mein Manav Punji Ka Nirman", nameHi: "भारत में मानव पूँजी का निर्माण" },
                { id: "ea11-ch6", name: "Gramin Vikas", nameHi: "ग्रामीण विकास" },
                { id: "ea11-ch7", name: "Rojgar Samvridhi Anaupacharikaran", nameHi: "रोजगार-संवृद्धि, अनौपचारीकरण एवं अन्य मुद्दे" },
                { id: "ea11-ch8", name: "Aadharbhut Sanrachna", nameHi: "आधारिक संरचना" },
                { id: "ea11-ch9", name: "Paryavaran Aur Dharaniy Vikas", nameHi: "पर्यावरण और धारणीय विकास" },
                { id: "ea11-ch10", name: "Bharat Aur Padosi Deshon Ke Tulnatmak Vikas Anubhav", nameHi: "भारत और इसके पड़ोसी देशों के तुलनात्मक विकास अनुभव" },
              ]
            },
            {
              id: "stats-11-arts", name: "Statistics for Economics", nameHi: "सांख्यिकी (अर्थशास्त्र के लिए)",
              chapters: [
                { id: "sa11-ch1", name: "Parichay", nameHi: "परिचय" },
                { id: "sa11-ch2", name: "Aankdon Ka Sangrah", nameHi: "आँकड़ों का संग्रह" },
                { id: "sa11-ch3", name: "Aankdon Ka Sangathan", nameHi: "आँकड़ों का संगठन" },
                { id: "sa11-ch4", name: "Aankdon Ka Prastutikaran", nameHi: "आँकड़ों का प्रस्तुतीकरण" },
                { id: "sa11-ch5", name: "Kendriy Pravriti Ke Maap", nameHi: "केंद्रीय प्रवृत्ति के माप" },
                { id: "sa11-ch6", name: "Vikiran Ke Maap", nameHi: "परिक्षेपण के माप" },
                { id: "sa11-ch7", name: "Sahsambandh", nameHi: "सहसंबंध" },
                { id: "sa11-ch8", name: "Suchkank", nameHi: "सूचकांक" },
              ]
            },
          ]
        },
        {
          id: "english", name: "English", nameHi: "English", icon: "book-open",
          books: [
            {
              id: "hornbill-11-arts", name: "Hornbill", nameHi: "Hornbill",
              chapters: [
                { id: "ho11a-ch1", name: "The Portrait of a Lady", nameHi: "The Portrait of a Lady" },
                { id: "ho11a-ch2", name: "We're Not Afraid to Die", nameHi: "We're Not Afraid to Die" },
                { id: "ho11a-ch3", name: "Discovering Tut", nameHi: "Discovering Tut" },
                { id: "ho11a-ch4", name: "Landscape of the Soul", nameHi: "Landscape of the Soul" },
                { id: "ho11a-ch5", name: "The Ailing Planet", nameHi: "The Ailing Planet" },
                { id: "ho11a-ch6", name: "The Browning Version", nameHi: "The Browning Version" },
                { id: "ho11a-ch7", name: "The Adventure", nameHi: "The Adventure" },
              ]
            },
            {
              id: "snapshots-11-arts", name: "Snapshots (Supplementary)", nameHi: "Snapshots (पूरक पाठ्यपुस्तक)",
              chapters: [
                { id: "sn11a-ch1", name: "The Summer of the Beautiful White Horse", nameHi: "The Summer of the Beautiful White Horse" },
                { id: "sn11a-ch2", name: "The Address", nameHi: "The Address" },
                { id: "sn11a-ch3", name: "Ranga's Marriage", nameHi: "Ranga's Marriage" },
                { id: "sn11a-ch4", name: "Albert Einstein at School", nameHi: "Albert Einstein at School" },
                { id: "sn11a-ch5", name: "Mother's Day", nameHi: "Mother's Day" },
                { id: "sn11a-ch6", name: "The Ghat of the Only World", nameHi: "The Ghat of the Only World" },
                { id: "sn11a-ch7", name: "Birth", nameHi: "Birth" },
                { id: "sn11a-ch8", name: "The Tale of Melon City", nameHi: "The Tale of Melon City" },
              ]
            },
          ]
        },
        {
          id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
          books: [
            {
              id: "aroh-11-arts", name: "Aroh Bhag 1", nameHi: "आरोह भाग 1",
              chapters: [
                { id: "ar11a-ch1", name: "Kabir (Kabita)", nameHi: "कबीर" },
                { id: "ar11a-ch2", name: "Meera (Kabita)", nameHi: "मीरा" },
                { id: "ar11a-ch3", name: "Ramnresh Tripathi (Kabita)", nameHi: "रामनरेश त्रिपाठी" },
                { id: "ar11a-ch4", name: "Sumitranandan Pant (Kabita)", nameHi: "सुमित्रानंदन पंत" },
                { id: "ar11a-ch5", name: "Bhawani Prasad Mishra (Kabita)", nameHi: "भवानी प्रसाद मिश्र" },
                { id: "ar11a-ch6", name: "Trilochan (Kabita)", nameHi: "त्रिलोचन" },
                { id: "ar11a-ch7", name: "Dushyant Kumar (Kabita)", nameHi: "दुष्यंत कुमार" },
                { id: "ar11a-ch8", name: "Akk Mahadevi (Kabita)", nameHi: "अक्क महादेवी" },
                { id: "ar11a-ch9", name: "Pash (Kabita)", nameHi: "पाश" },
                { id: "ar11a-ch10", name: "Nirmala Putul (Kabita)", nameHi: "निर्मला पुतुल" },
                { id: "ar11a-ch11", name: "Namak Ka Daroga (Gadya)", nameHi: "नमक का दरोगा" },
                { id: "ar11a-ch12", name: "Miyan Nasiruddin (Gadya)", nameHi: "मियाँ नसीरुद्दीन" },
                { id: "ar11a-ch13", name: "Appu Ke Saath Dhai Saal (Gadya)", nameHi: "अप्पू के साथ ढाई साल" },
                { id: "ar11a-ch14", name: "Vidaai Sambhashan (Gadya)", nameHi: "विदाई-संभाषण" },
                { id: "ar11a-ch15", name: "Galta Loha (Gadya)", nameHi: "गलता लोहा" },
                { id: "ar11a-ch16", name: "Speeti Mein Baarish (Gadya)", nameHi: "स्पीति में बारिश" },
                { id: "ar11a-ch17", name: "Rajni (Gadya)", nameHi: "रजनी" },
                { id: "ar11a-ch18", name: "Jamun Ka Ped (Gadya)", nameHi: "जामुन का पेड़" },
                { id: "ar11a-ch19", name: "Bharat Mata (Gadya)", nameHi: "भारत माता" },
                { id: "ar11a-ch20", name: "Aatma Ka Taap (Gadya)", nameHi: "आत्मा का ताप" },
              ]
            },
            {
              id: "vitan-11-arts", name: "Vitan Bhag 1 (Supplementary)", nameHi: "वितान भाग 1 (पूरक पाठ्यपुस्तक)",
              chapters: [
                { id: "vi11a-ch1", name: "Bhartiya Gayika Lata Mangeshkar", nameHi: "भारतीय गायिका लता मंगेशकर" },
                { id: "vi11a-ch2", name: "Rajasthan Ki Rajat Boonden", nameHi: "राजस्थान की रजत बूँदें" },
                { id: "vi11a-ch3", name: "Aalo Aandhare", nameHi: "आलो आंधारि" },
                { id: "vi11a-ch4", name: "Ghar Ki Yaad", nameHi: "घर की याद" },
                { id: "vi11a-ch5", name: "Ek Kahani Yeh Bhi", nameHi: "एक कहानी यह भी" },
                { id: "vi11a-ch6", name: "Pahchana Kaun", nameHi: "पहचाना कौन" },
              ]
            },
          ]
        },
      ]
    },
  ],
