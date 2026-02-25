ClassNumber = 6 | 7 | 8 | 9 | 10 | 11 | 12

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
      id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
      books: [
        {
          id: "vasant-1", name: "Vasant Bhag 1", nameHi: "वसंत भाग 1",
          chapters: [
            { id: "v1-ch1", name: "Vah Chidiya Jo", nameHi: "वह चिड़िया जो" },
            { id: "v1-ch2", name: "Bachpan", nameHi: "बचपन" },
            { id: "v1-ch3", name: "Nadan Dost", nameHi: "नादान दोस्त" },
            { id: "v1-ch4", name: "Chand Se Thodi Si Gappe", nameHi: "चाँद से थोड़ी-सी गप्पें" },
            { id: "v1-ch5", name: "Aksharon Ka Mahatva", nameHi: "अक्षरों का महत्व" },
            { id: "v1-ch6", name: "Par Nazar Ke", nameHi: "पार नजर के" },
            { id: "v1-ch7", name: "Sathi Hath Badhana", nameHi: "साथी हाथ बढ़ाना" },
            { id: "v1-ch8", name: "Aise-Aise", nameHi: "ऐसे-ऐसे" },
            { id: "v1-ch9", name: "Ticket Album", nameHi: "टिकट अलबम" },
            { id: "v1-ch10", name: "Jhansi Ki Rani", nameHi: "झाँसी की रानी" },
            { id: "v1-ch11", name: "Jo Dekhkar Bhi Nahi Dekhte", nameHi: "जो देखकर भी नहीं देखते" },
            { id: "v1-ch12", name: "Sansar Pustak Hai", nameHi: "संसार पुस्तक है" },
            { id: "v1-ch13", name: "Main Sabse Choti Houn", nameHi: "मैं सबसे छोटी होऊँ" },
            { id: "v1-ch14", name: "Lokgeet", nameHi: "लोकगीत" },
            { id: "v1-ch15", name: "Naukar", nameHi: "नौकर" },
            { id: "v1-ch16", name: "Van Ke Marg Mein", nameHi: "वन के मार्ग में" },
          ]
        },
        {
          id: "bal-ramkatha", name: "Bal Ramkatha", nameHi: "बाल रामकथा",
          chapters: [
            { id: "br-ch1", name: "Awadhpuri Mein Ram", nameHi: "अवधपुरी में राम" },
            { id: "br-ch2", name: "Jungle Aur Janakpur", nameHi: "जंगल और जनकपुर" },
            { id: "br-ch3", name: "Do Vardan", nameHi: "दो वरदान" },
            { id: "br-ch4", name: "Ram Ka Vanvas", nameHi: "राम का वनवास" },
            { id: "br-ch5", name: "Chitrakoot Mein Bharat", nameHi: "चित्रकूट में भरत" },
            { id: "br-ch6", name: "Dandak Van Mein Das Varsh", nameHi: "दंडक वन में दस वर्ष" },
            { id: "br-ch7", name: "Sone Ka Hiran", nameHi: "सोने का हिरन" },
            { id: "br-ch8", name: "Sita Ki Khoj", nameHi: "सीता की खोज" },
            { id: "br-ch9", name: "Ram Aur Sugriv", nameHi: "राम और सुग्रीव" },
            { id: "br-ch10", name: "Lanka Mein Hanuman", nameHi: "लंका में हनुमान" },
            { id: "br-ch11", name: "Lanka Vijay", nameHi: "लंका विजय" },
            { id: "br-ch12", name: "Ram Ka Rajyabhishek", nameHi: "राम का राज्याभिषेक" },
          ]
        },
      ]
    },
    {
      id: "english", name: "English", nameHi: "English", icon: "book-open",
      books: [
        {
          id: "honeysuckle", name: "Honeysuckle", nameHi: "Honeysuckle",
          chapters: [
            { id: "hs-ch1", name: "Who Did Patrick's Homework", nameHi: "Who Did Patrick's Homework" },
            { id: "hs-ch2", name: "How the Dog Found Himself a New Master", nameHi: "How the Dog Found Himself a New Master" },
            { id: "hs-ch3", name: "Taro's Reward", nameHi: "Taro's Reward" },
            { id: "hs-ch4", name: "An Indian-American Woman in Space", nameHi: "An Indian-American Woman in Space" },
            { id: "hs-ch5", name: "A Different Kind of School", nameHi: "A Different Kind of School" },
            { id: "hs-ch6", name: "Who I Am", nameHi: "Who I Am" },
            { id: "hs-ch7", name: "Fair Play", nameHi: "Fair Play" },
            { id: "hs-ch8", name: "A Game of Chance", nameHi: "A Game of Chance" },
            { id: "hs-ch9", name: "Desert Animals", nameHi: "Desert Animals" },
            { id: "hs-ch10", name: "The Banyan Tree", nameHi: "The Banyan Tree" },
          ]
        },
        {
          id: "a-pact-with-the-sun", name: "A Pact With The Sun", nameHi: "A Pact With The Sun",
          chapters: [
            { id: "ap-ch1", name: "A Tale of Two Birds", nameHi: "A Tale of Two Birds" },
            { id: "ap-ch2", name: "The Friendly Mongoose", nameHi: "The Friendly Mongoose" },
            { id: "ap-ch3", name: "The Shepherd's Treasure", nameHi: "The Shepherd's Treasure" },
            { id: "ap-ch4", name: "The Old-Clock Shop", nameHi: "The Old-Clock Shop" },
            { id: "ap-ch5", name: "Tansen", nameHi: "Tansen" },
            { id: "ap-ch6", name: "The Monkey and the Crocodile", nameHi: "The Monkey and the Crocodile" },
            { id: "ap-ch7", name: "The Wonder Called Sleep", nameHi: "The Wonder Called Sleep" },
            { id: "ap-ch8", name: "A Pact with the Sun", nameHi: "A Pact with the Sun" },
            { id: "ap-ch9", name: "What Happened to the Reptiles", nameHi: "What Happened to the Reptiles" },
            { id: "ap-ch10", name: "A Strange Wrestling Match", nameHi: "A Strange Wrestling Match" },
          ]
        },
      ]
    },
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [
        {
          id: "math-6", name: "Mathematics", nameHi: "गणित",
          chapters: [
            { id: "m6-ch1", name: "Apni Sankhyaon Ki Jankari", nameHi: "अपनी संख्याओं की जानकारी" },
            { id: "m6-ch2", name: "Poorn Sankhyaen", nameHi: "पूर्ण संख्याएँ" },
            { id: "m6-ch3", name: "Poorn Sankhyaon Ke Saath Khel", nameHi: "पूर्ण संख्याओं के साथ खेल" },
            { id: "m6-ch4", name: "Aadharabhoot Jyamitiy Vichar", nameHi: "आधारभूत ज्यामितीय विचार" },
            { id: "m6-ch5", name: "Prarambhik Aakritiyon Ki Samajh", nameHi: "प्रारंभिक आकृतियों की समझ" },
            { id: "m6-ch6", name: "Poornankono Ka Parichay", nameHi: "पूर्णांकों का परिचय" },
            { id: "m6-ch7", name: "Bhinn", nameHi: "भिन्न" },
            { id: "m6-ch8", name: "Dashamlav", nameHi: "दशमलव" },
            { id: "m6-ch9", name: "Aankdon Ka Prabandhan", nameHi: "आँकड़ों का प्रबंधन" },
            { id: "m6-ch10", name: "Beejganit Ka Parichay", nameHi: "बीजगणित का परिचय" },
            { id: "m6-ch11", name: "Anupat Aur Samanupat", nameHi: "अनुपात और समानुपात" },
            { id: "m6-ch12", name: "Samiti", nameHi: "सममिति" },
            { id: "m6-ch13", name: "Trivimiya Aakritiyon Ki Samajh", nameHi: "त्रिविमीय आकृतियों की समझ" },
          ]
        },
      ]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [
        {
          id: "science-6", name: "Science", nameHi: "विज्ञान",
          chapters: [
            { id: "s6-ch1", name: "Bhojan Yah Kahan Se Aata Hai", nameHi: "भोजन – यह कहाँ से आता है" },
            { id: "s6-ch2", name: "Bhojan Ke Ghatak", nameHi: "भोजन के घटक" },
            { id: "s6-ch3", name: "Resha Se Vastra Tak", nameHi: "रेशा से वस्त्र तक" },
            { id: "s6-ch4", name: "Padarthon Ke Samuh", nameHi: "पदार्थों के समूह" },
            { id: "s6-ch5", name: "Padarthon Ka Prithakaran", nameHi: "पदार्थों का पृथक्करण" },
            { id: "s6-ch6", name: "Hamare Aaspaas Ke Parivartan", nameHi: "हमारे आसपास के परिवर्तन" },
            { id: "s6-ch7", name: "Paudhon Ko Janiye", nameHi: "पौधों को जानिए" },
            { id: "s6-ch8", name: "Sharir Mein Gati", nameHi: "शरीर में गति" },
            { id: "s6-ch9", name: "Jeevon Aur Unka Parivesh", nameHi: "जीवों और उनके परिवेश" },
            { id: "s6-ch10", name: "Gati Aur Dooriyaan", nameHi: "गति और दूरियाँ" },
            { id: "s6-ch11", name: "Prakash Chhaya Aur Paravartan", nameHi: "प्रकाश, छाया और परावर्तन" },
            { id: "s6-ch12", name: "Vidyut Aur Pariprath", nameHi: "विद्युत और परिपथ" },
            { id: "s6-ch13", name: "Chumbak Se Maza", nameHi: "चुंबक से मज़ा" },
            { id: "s6-ch14", name: "Jal", nameHi: "जल" },
            { id: "s6-ch15", name: "Vayu", nameHi: "वायु" },
            { id: "s6-ch16", name: "Hamare Aaspaas Ka Paryavaran", nameHi: "हमारे आसपास का पर्यावरण" },
          ]
        },
      ]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक विज्ञान", icon: "globe",
      books: [
        {
          id: "hamare-ateet-1", name: "Hamare Ateet 1", nameHi: "हमारे अतीत – 1",
          chapters: [
            { id: "ha1-ch1", name: "Itihas Kya Hai", nameHi: "इतिहास क्या है" },
            { id: "ha1-ch2", name: "Prarambhik Manav", nameHi: "प्रारंभिक मानव" },
            { id: "ha1-ch3", name: "Prarambhik Krishi", nameHi: "प्रारंभिक कृषि" },
            { id: "ha1-ch4", name: "Vaidik Kal", nameHi: "वैदिक काल" },
            { id: "ha1-ch5", name: "Rajya Raja Aur Ek Prachin Ganarajya", nameHi: "राज्य, राजा और एक प्राचीन गणराज्य" },
            { id: "ha1-ch6", name: "Naye Prashn Aur Vichar", nameHi: "नए प्रश्न और विचार" },
            { id: "ha1-ch7", name: "Samrajya", nameHi: "साम्राज्य" },
            { id: "ha1-ch8", name: "Vyapar Aur Sampark", nameHi: "व्यापार और संपर्क" },
            { id: "ha1-ch9", name: "Naye Rajya Aur Sanskriti", nameHi: "नए राज्य और संस्कृति" },
            { id: "ha1-ch10", name: "Imaraten Chitra Aur Pustaken", nameHi: "इमारतें, चित्र और पुस्तकें" },
          ]
        },
        {
          id: "prithvi-hamara-avas", name: "Prithvi Hamara Avas", nameHi: "पृथ्वी हमारा आवास",
          chapters: [
            { id: "pha-ch1", name: "Prithvi Saurmandal Mein", nameHi: "पृथ्वी सौरमंडल में" },
            { id: "pha-ch2", name: "Globe Akshansh Aur Deshantar", nameHi: "ग्लोब – अक्षांश और देशांतर" },
            { id: "pha-ch3", name: "Prithvi Ki Gatiyan", nameHi: "पृथ्वी की गतियाँ" },
            { id: "pha-ch4", name: "Manchitra", nameHi: "मानचित्र" },
            { id: "pha-ch5", name: "Prithvi Ke Pramukh Parimandal", nameHi: "पृथ्वी के प्रमुख परिमंडल" },
            { id: "pha-ch6", name: "Hamara Desh Bharat", nameHi: "हमारा देश – भारत" },
          ]
        },
        {
          id: "samajik-rajnitik-1", name: "Samajik Evam Rajnitik Jeevan 1", nameHi: "सामाजिक एवं राजनीतिक जीवन – 1",
          chapters: [
            { id: "srj1-ch1", name: "Vividhata Ki Samajh", nameHi: "विविधता की समझ" },
            { id: "srj1-ch2", name: "Vividhata Aur Bhedbhav", nameHi: "विविधता और भेदभाव" },
            { id: "srj1-ch3", name: "Sarkar Kya Hai", nameHi: "सरकार क्या है" },
            { id: "srj1-ch4", name: "Sthaniy Sarkar", nameHi: "स्थानीय सरकार" },
            { id: "srj1-ch5", name: "Gramin Prashasan", nameHi: "ग्रामीण प्रशासन" },
            { id: "srj1-ch6", name: "Shahari Prashasan", nameHi: "शहरी प्रशासन" },
            { id: "srj1-ch7", name: "Gramin Aajivika", nameHi: "ग्रामीण आजीविका" },
            { id: "srj1-ch8", name: "Shahari Aajivika", nameHi: "शहरी आजीविका" },
          ]
        },
      ]
    },
  ],
  7: [
    {
      id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
      books: [
        {
          id: "vasant-2", name: "Vasant Bhag 2", nameHi: "वसंत भाग 2",
          chapters: [
            { id: "v2-ch1", name: "Hum Panchhi Unmukta Gagan Ke", nameHi: "हम पंछी उन्मुक्त गगन के" },
            { id: "v2-ch2", name: "Dadi Maa", nameHi: "दादी माँ" },
            { id: "v2-ch3", name: "Himalaya Ki Betiyan", nameHi: "हिमालय की बेटियाँ" },
            { id: "v2-ch4", name: "Kathputli", nameHi: "कठपुतली" },
            { id: "v2-ch5", name: "Mithaiwala", nameHi: "मिठाईवाला" },
            { id: "v2-ch6", name: "Rakt Aur Hamara Sharir", nameHi: "रक्त और हमारा शरीर" },
            { id: "v2-ch7", name: "Papa Kho Gaye", nameHi: "पापा खो गए" },
            { id: "v2-ch8", name: "Sham Ek Kisan", nameHi: "शाम एक किसान" },
            { id: "v2-ch9", name: "Chidiya Ki Bachi", nameHi: "चिड़िया की बच्ची" },
            { id: "v2-ch10", name: "Apurva Anubhav", nameHi: "अपूर्व अनुभव" },
            { id: "v2-ch11", name: "Rahim Ke Dohe", nameHi: "रहीम के दोहे" },
            { id: "v2-ch12", name: "Kancha", nameHi: "कंचा" },
            { id: "v2-ch13", name: "Ek Tinka", nameHi: "एक तिनका" },
            { id: "v2-ch14", name: "Khanpan Ki Badalti Tasveer", nameHi: "खानपान की बदलती तस्वीर" },
            { id: "v2-ch15", name: "Nilkanth", nameHi: "नीलकंठ" },
            { id: "v2-ch16", name: "Bhor Aur Barkha", nameHi: "भोर और बरखा" },
            { id: "v2-ch17", name: "Veer Kunwar Singh", nameHi: "वीर कुंवर सिंह" },
            { id: "v2-ch18", name: "Sangharsh Ke Karan", nameHi: "संघर्ष के कारण मैं तुनुकमिजाज हो गया" },
          ]
        },
        {
          id: "bal-mahabharat", name: "Bal Mahabharat Katha", nameHi: "बाल महाभारत कथा",
          chapters: [
            { id: "bm-ch1", name: "Devvrat", nameHi: "देवव्रत" },
            { id: "bm-ch2", name: "Bhishma Pratigya", nameHi: "भीष्म प्रतिज्ञा" },
            { id: "bm-ch3", name: "Amba Aur Bhishma", nameHi: "अंबा और भीष्म" },
            { id: "bm-ch4", name: "Pandavon Ka Janm", nameHi: "पांडवों का जन्म" },
            { id: "bm-ch5", name: "Dronacharya", nameHi: "द्रोणाचार्य" },
            { id: "bm-ch6", name: "Lakshagrih", nameHi: "लक्षागृह" },
            { id: "bm-ch7", name: "Draupadi Swayamvar", nameHi: "द्रौपदी स्वयंवर" },
            { id: "bm-ch8", name: "Indraprastha", nameHi: "इंद्रप्रस्थ" },
            { id: "bm-ch9", name: "Jarasandha", nameHi: "जरासंध" },
            { id: "bm-ch10", name: "Dyut Krida", nameHi: "द्यूत क्रीड़ा" },
            { id: "bm-ch11", name: "Vanvas", nameHi: "वनवास" },
            { id: "bm-ch12", name: "Virat Nagar", nameHi: "विराट नगर" },
            { id: "bm-ch13", name: "Shrikrishna", nameHi: "श्रीकृष्ण" },
            { id: "bm-ch14", name: "Yuddha Ki Taiyari", nameHi: "युद्ध की तैयारी" },
            { id: "bm-ch15", name: "Bhishma Pitamah", nameHi: "भीष्म पितामह" },
            { id: "bm-ch16", name: "Dronacharya 2", nameHi: "द्रोणाचार्य" },
            { id: "bm-ch17", name: "Karna", nameHi: "कर्ण" },
            { id: "bm-ch18", name: "Shalya", nameHi: "शल्य" },
            { id: "bm-ch19", name: "Ashwatthama", nameHi: "अश्वत्थामा" },
            { id: "bm-ch20", name: "Gandhari Ka Shaap", nameHi: "गांधारी का शाप" },
          ]
        },
      ]
    },
    {
      id: "english", name: "English", nameHi: "English", icon: "book-open",
      books: [
        {
          id: "honeycomb", name: "Honeycomb", nameHi: "Honeycomb",
          chapters: [
            { id: "hc-ch1", name: "Three Questions", nameHi: "Three Questions" },
            { id: "hc-ch2", name: "A Gift of Chappals", nameHi: "A Gift of Chappals" },
            { id: "hc-ch3", name: "Gopal and the Hilsa Fish", nameHi: "Gopal and the Hilsa Fish" },
            { id: "hc-ch4", name: "The Ashes That Made Trees Bloom", nameHi: "The Ashes That Made Trees Bloom" },
            { id: "hc-ch5", name: "Quality", nameHi: "Quality" },
            { id: "hc-ch6", name: "Expert Detectives", nameHi: "Expert Detectives" },
            { id: "hc-ch7", name: "The Invention of Vita-Wonk", nameHi: "The Invention of Vita-Wonk" },
            { id: "hc-ch8", name: "Fire: Friend and Foe", nameHi: "Fire: Friend and Foe" },
            { id: "hc-ch9", name: "A Bicycle in Good Repair", nameHi: "A Bicycle in Good Repair" },
            { id: "hc-ch10", name: "The Story of Cricket", nameHi: "The Story of Cricket" },
          ]
        },
        {
          id: "an-alien-hand", name: "An Alien Hand", nameHi: "An Alien Hand",
          chapters: [
            { id: "ah-ch1", name: "The Tiny Teacher", nameHi: "The Tiny Teacher" },
            { id: "ah-ch2", name: "Bringing Up Kari", nameHi: "Bringing Up Kari" },
            { id: "ah-ch3", name: "The Desert", nameHi: "The Desert" },
            { id: "ah-ch4", name: "The Cop and the Anthem", nameHi: "The Cop and the Anthem" },
            { id: "ah-ch5", name: "Golu Grows a Nose", nameHi: "Golu Grows a Nose" },
            { id: "ah-ch6", name: "I Want Something in a Cage", nameHi: "I Want Something in a Cage" },
            { id: "ah-ch7", name: "Chandni", nameHi: "Chandni" },
            { id: "ah-ch8", name: "The Bear Story", nameHi: "The Bear Story" },
            { id: "ah-ch9", name: "A Tiger in the House", nameHi: "A Tiger in the House" },
            { id: "ah-ch10", name: "An Alien Hand", nameHi: "An Alien Hand" },
          ]
        },
      ]
    },
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [
        {
          id: "math-7", name: "Mathematics", nameHi: "गणित",
          chapters: [
            { id: "m7-ch1", name: "Poornankoon Par Sankriyaen", nameHi: "पूर्णांकों पर संक्रियाएँ" },
            { id: "m7-ch2", name: "Bhinn Aur Dashamlav", nameHi: "भिन्न और दशमलव" },
            { id: "m7-ch3", name: "Aankdon Ka Prabandhan", nameHi: "आँकड़ों का प्रबंधन" },
            { id: "m7-ch4", name: "Saral Samikaran", nameHi: "सरल समीकरण" },
            { id: "m7-ch5", name: "Rekhaen Aur Kon", nameHi: "रेखाएँ और कोण" },
            { id: "m7-ch6", name: "Tribhuj Aur Uske Gun", nameHi: "त्रिभुज और उसके गुण" },
            { id: "m7-ch7", name: "Tribhujon Ki Sarvangsamata", nameHi: "त्रिभुजों की सर्वांगसमता" },
            { id: "m7-ch8", name: "Rashiyon Ki Tulna", nameHi: "राशियों की तुलना" },
            { id: "m7-ch9", name: "Parimy Sankhyaen", nameHi: "परिमेय संख्याएँ" },
            { id: "m7-ch10", name: "Prayogik Jyamiti", nameHi: "प्रायोगिक ज्यामिति" },
            { id: "m7-ch11", name: "Parimap Aur Kshetrafal", nameHi: "परिमाप और क्षेत्रफल" },
            { id: "m7-ch12", name: "Beejganitiy Vyanjak", nameHi: "बीजगणितीय व्यंजक" },
            { id: "m7-ch13", name: "Ghatank Aur Ghat", nameHi: "घातांक और घात" },
            { id: "m7-ch14", name: "Samiti", nameHi: "सममिति" },
            { id: "m7-ch15", name: "Thos Aakritiyon Ka Chitran", nameHi: "ठोस आकृतियों का चित्रण" },
          ]
        },
      ]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [
        {
          id: "science-7", name: "Science", nameHi: "विज्ञान",
          chapters: [
            { id: "s7-ch1", name: "Paudhon Mein Poshan", nameHi: "पौधों में पोषण" },
            { id: "s7-ch2", name: "Jantuo Mein Poshan", nameHi: "जंतुओं में पोषण" },
            { id: "s7-ch3", name: "Resha Se Vastra Tak", nameHi: "रेशा से वस्त्र तक" },
            { id: "s7-ch4", name: "Ushma", nameHi: "ऊष्मा" },
            { id: "s7-ch5", name: "Aml Kshaarak Aur Lavan", nameHi: "अम्ल, क्षारक और लवण" },
            { id: "s7-ch6", name: "Bhautik Aur Rasayanik Parivartan", nameHi: "भौतिक और रासायनिक परिवर्तन" },
            { id: "s7-ch7", name: "Mausam Jalvayu Aur Anukulan", nameHi: "मौसम, जलवायु और अनुकूलन" },
            { id: "s7-ch8", name: "Pavan Toofan Aur Chakravat", nameHi: "पवन, तूफान और चक्रवात" },
            { id: "s7-ch9", name: "Mrida", nameHi: "मृदा" },
            { id: "s7-ch10", name: "Jeevon Mein Shwasan", nameHi: "जीवों में श्वसन" },
            { id: "s7-ch11", name: "Jantuo Aur Paudhon Mein Parivahan", nameHi: "जंतुओं और पौधों में परिवहन" },
            { id: "s7-ch12", name: "Jantuo Mein Prajanan", nameHi: "जंतुओं में प्रजनन" },
            { id: "s7-ch13", name: "Gati Aur Samay", nameHi: "गति और समय" },
            { id: "s7-ch14", name: "Vidyut Dhara Aur Uske Prabhav", nameHi: "विद्युत धारा और उसके प्रभाव" },
            { id: "s7-ch15", name: "Prakash", nameHi: "प्रकाश" },
            { id: "s7-ch16", name: "Jal Ek Bahumuulya Sansadhan", nameHi: "जल – एक बहुमूल्य संसाधन" },
            { id: "s7-ch17", name: "Van Hamare Jeevan Rekha", nameHi: "वन – हमारे जीवन रेखा" },
            { id: "s7-ch18", name: "Apashisht Jal Ki Kahani", nameHi: "अपशिष्ट जल की कहानी" },
          ]
        },
      ]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक विज्ञान", icon: "globe",
      books: [
        {
          id: "hamare-ateet-2", name: "Hamare Ateet 2", nameHi: "हमारे अतीत – 2",
          chapters: [
            { id: "ha2-ch1", name: "Hazar Varshon Ke Baad", nameHi: "हजार वर्षों के बाद" },
            { id: "ha2-ch2", name: "Naye Raja Aur Rajya", nameHi: "नए राजा और राज्य" },
            { id: "ha2-ch3", name: "Delhi Ke Sultan", nameHi: "दिल्ली के सुल्तान" },
            { id: "ha2-ch4", name: "Mughal Samrajya", nameHi: "मुगल साम्राज्य" },
            { id: "ha2-ch5", name: "Shasak Aur Imaraten", nameHi: "शासक और इमारतें" },
            { id: "ha2-ch6", name: "Nagar Vyapari Aur Shilpkar", nameHi: "नगर, व्यापारी और शिल्पकार" },
            { id: "ha2-ch7", name: "Janjatiyan Ghumantu Aur Basne Wale", nameHi: "जनजातियाँ, घुमंतू और बसने वाले समुदाय" },
            { id: "ha2-ch8", name: "Bhakti Aur Sufi Andolan", nameHi: "भक्ति और सूफी आंदोलन" },
            { id: "ha2-ch9", name: "Kshetriy Sanskritiyon Ka Nirman", nameHi: "क्षेत्रीय संस्कृतियों का निर्माण" },
            { id: "ha2-ch10", name: "Atharahvin Sadi Mein Rajnitik Gathan", nameHi: "अठारहवीं सदी में राजनीतिक गठन" },
          ]
        },
        {
          id: "hamara-paryavaran", name: "Hamara Paryavaran", nameHi: "हमारा पर्यावरण",
          chapters: [
            { id: "hp-ch1", name: "Paryavaran", nameHi: "पर्यावरण" },
            { id: "hp-ch2", name: "Prithvi Ki Aantarik Sanrachna", nameHi: "पृथ्वी की आंतरिक संरचना" },
            { id: "hp-ch3", name: "Hamari Badalti Prithvi", nameHi: "हमारी बदलती पृथ्वी" },
            { id: "hp-ch4", name: "Vayu", nameHi: "वायु" },
            { id: "hp-ch5", name: "Jal", nameHi: "जल" },
            { id: "hp-ch6", name: "Prakritik Vanaspati Aur Vanya Jeev", nameHi: "प्राकृतिक वनस्पति और वन्य जीव" },
            { id: "hp-ch7", name: "Manav Paryavaran Basti Parivahan Aur Sanchar", nameHi: "मानव पर्यावरण – बस्ती, परिवहन और संचार" },
            { id: "hp-ch8", name: "Manav Paryavaran Antakriya", nameHi: "मानव पर्यावरण अंतःक्रिया" },
            { id: "hp-ch9", name: "Jeevan Utshna Kshetron Mein", nameHi: "जीवन उष्णकटिबंधीय और उपोष्ण प्रदेशों में" },
          ]
        },
        {
          id: "samajik-rajnitik-2", name: "Samajik Evam Rajnitik Jeevan 2", nameHi: "सामाजिक एवं राजनीतिक जीवन – 2",
          chapters: [
            { id: "srj2-ch1", name: "Samanta", nameHi: "समानता" },
            { id: "srj2-ch2", name: "Swasthya Mein Sarkar Ki Bhumika", nameHi: "स्वास्थ्य में सरकार की भूमिका" },
            { id: "srj2-ch3", name: "Rajya Sarkar Kaise Kaam Karti Hai", nameHi: "राज्य सरकार कैसे काम करती है" },
            { id: "srj2-ch4", name: "Ling Asamanta", nameHi: "लिंग असमानता" },
            { id: "srj2-ch5", name: "Bazar Ke Charon Or", nameHi: "बाज़ार के चारों ओर" },
            { id: "srj2-ch6", name: "Ek Shirt Ki Yatra", nameHi: "एक शर्ट की यात्रा" },
            { id: "srj2-ch7", name: "Vigyapan", nameHi: "विज्ञापन" },
            { id: "srj2-ch8", name: "Media Aur Loktantra", nameHi: "मीडिया और लोकतंत्र" },
            { id: "srj2-ch9", name: "Ling Aur Kaam", nameHi: "लिंग और काम" },
          ]
        },
      ]
    },
  ],
  8: [
    {
      id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
      books: [
        {
          id: "vasant-3", name: "Vasant Bhag 3", nameHi: "वसंत भाग 3",
          chapters: [
            { id: "v3-ch1", name: "Dhwani", nameHi: "ध्वनि" },
            { id: "v3-ch2", name: "Lakh Ki Churiyan", nameHi: "लाख की चूड़ियाँ" },
            { id: "v3-ch3", name: "Bus Ki Yatra", nameHi: "बस की यात्रा" },
            { id: "v3-ch4", name: "Diwanon Ki Hasti", nameHi: "दीवानों की हस्ती" },
            { id: "v3-ch5", name: "Chitthiyon Ki Anuthi Duniya", nameHi: "चिट्ठियों की अनूठी दुनिया" },
            { id: "v3-ch6", name: "Bhagwan Ke Daakiye", nameHi: "भगवान के डाकिए" },
            { id: "v3-ch7", name: "Kya Nirash Hua Jaye", nameHi: "क्या निराश हुआ जाए" },
            { id: "v3-ch8", name: "Yah Sabse Kathin Samay Nahi", nameHi: "यह सबसे कठिन समय नहीं" },
            { id: "v3-ch9", name: "Kabir Ki Saakhiyan", nameHi: "कबीर की साखियाँ" },
            { id: "v3-ch10", name: "Kamchor", nameHi: "कामचोर" },
            { id: "v3-ch11", name: "Jab Cinema Ne Bolna Seekha", nameHi: "जब सिनेमा ने बोलना सीखा" },
            { id: "v3-ch12", name: "Sudama Charit", nameHi: "सुदामा चरित" },
            { id: "v3-ch13", name: "Jahan Pahiya Hai", nameHi: "जहाँ पहिया है" },
            { id: "v3-ch14", name: "Akbari Lota", nameHi: "अकबरी लोटा" },
            { id: "v3-ch15", name: "Sur Ke Pad", nameHi: "सूर के पद" },
            { id: "v3-ch16", name: "Pani Ki Kahani", nameHi: "पानी की कहानी" },
            { id: "v3-ch17", name: "Baz Aur Sanp", nameHi: "बाज और साँप" },
            { id: "v3-ch18", name: "Topi", nameHi: "टोपी" },
          ]
        },
        {
          id: "bharat-ki-khoj", name: "Bharat Ki Khoj", nameHi: "भारत की खोज",
          chapters: [
            { id: "bk-ch1", name: "Ahmednagar Ka Kila", nameHi: "अहमदनगर का किला" },
            { id: "bk-ch2", name: "Talash", nameHi: "तलाश" },
            { id: "bk-ch3", name: "Sindhu Ghati Sabhyata", nameHi: "सिंधु घाटी सभ्यता" },
            { id: "bk-ch4", name: "Yugon Ka Daur", nameHi: "युगों का दौर" },
            { id: "bk-ch5", name: "Naye Prashn", nameHi: "नए प्रश्न" },
            { id: "bk-ch6", name: "Aakhiri Mughal", nameHi: "आखिरी मुगल" },
            { id: "bk-ch7", name: "1857", nameHi: "1857" },
            { id: "bk-ch8", name: "Rashtriy Andolan", nameHi: "राष्ट्रीय आंदोलन" },
            { id: "bk-ch9", name: "Vibhajan Ke Baad", nameHi: "विभाजन के बाद" },
          ]
        },
      ]
    },
    {
      id: "english", name: "English", nameHi: "English", icon: "book-open",
      books: [
        {
          id: "honeydew", name: "Honeydew", nameHi: "Honeydew",
          chapters: [
            { id: "hd-ch1", name: "The Best Christmas Present in the World", nameHi: "The Best Christmas Present in the World" },
            { id: "hd-ch2", name: "The Tsunami", nameHi: "The Tsunami" },
            { id: "hd-ch3", name: "Glimpses of the Past", nameHi: "Glimpses of the Past" },
            { id: "hd-ch4", name: "Bepin Choudhury's Lapse of Memory", nameHi: "Bepin Choudhury's Lapse of Memory" },
            { id: "hd-ch5", name: "The Summit Within", nameHi: "The Summit Within" },
            { id: "hd-ch6", name: "This is Jody's Fawn", nameHi: "This is Jody's Fawn" },
            { id: "hd-ch7", name: "A Visit to Cambridge", nameHi: "A Visit to Cambridge" },
            { id: "hd-ch8", name: "A Short Monsoon Diary", nameHi: "A Short Monsoon Diary" },
          ]
        },
        {
          id: "it-so-happened", name: "It So Happened", nameHi: "It So Happened",
          chapters: [
            { id: "ish-ch1", name: "How the Camel Got His Hump", nameHi: "How the Camel Got His Hump" },
            { id: "ish-ch2", name: "Children at Work", nameHi: "Children at Work" },
            { id: "ish-ch3", name: "The Selfish Giant", nameHi: "The Selfish Giant" },
            { id: "ish-ch4", name: "The Treasure Within", nameHi: "The Treasure Within" },
            { id: "ish-ch5", name: "Princess September", nameHi: "Princess September" },
            { id: "ish-ch6", name: "The Fight", nameHi: "The Fight" },
            { id: "ish-ch7", name: "Jalebis", nameHi: "Jalebis" },
            { id: "ish-ch8", name: "Ancient Education System of India", nameHi: "Ancient Education System of India" },
          ]
        },
      ]
    },
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [
        {
          id: "math-8", name: "Mathematics", nameHi: "गणित",
          chapters: [
       { id: "m8-ch1", name: "Parimy Sankhyaen", nameHi: "परिमेय संख्याएँ" },
            { id: "m8-ch2", name: "Ek Char Wale Raikhik Samikaran", nameHi: "एक चर वाले रैखिक समीकरण" },
            { id: "m8-ch3", name: "Chaturbhujon Ki Samajh", nameHi: "चतुर्भुजों की समझ" },
            { id: "m8-ch4", name: "Aankdon Ka Prabandhan", nameHi: "आँकड़ों का प्रबंधन" },
            { id: "m8-ch5", name: "Varg Aur Vargmool", nameHi: "वर्ग और वर्गमूल" },
            { id: "m8-ch6", name: "Ghan Aur Ghanmool", nameHi: "घन और घनमूल" },
            { id: "m8-ch7", name: "Rashiyon Ki Tulna", nameHi: "राशियों की तुलना" },
            { id: "m8-ch8", name: "Beejganitiy Vyanjak Aur Sarvasamikaen", nameHi: "बीजगणितीय व्यंजक और सर्वसमिकाएँ" },
            { id: "m8-ch9", name: "Kshetramiti", nameHi: "क्षेत्रमिति" },
            { id: "m8-ch10", name: "Ghat Aur Ghatank", nameHi: "घात और घातांक" },
            { id: "m8-ch11", name: "Pratyaksh Aur Pratilom Anupat", nameHi: "प्रत्यक्ष और प्रतिलोम अनुपात" },
            { id: "m8-ch12", name: "Gunankhanadan", nameHi: "गुणनखंडन" },
            { id: "m8-ch13", name: "Aalegon Ka Parichay", nameHi: "आलेखों का परिचय" },
            { id: "m8-ch14", name: "Thos Aakritiyon Ka Drashyankan", nameHi: "ठोस आकृतियों का दृश्यांकन" },
            { id: "m8-ch15", name: "Sankhyiki", nameHi: "सांख्यिकी" },
          ]
        },
      ]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [
        {
          id: "science-8", name: "Science", nameHi: "विज्ञान",
          chapters: [
            { id: "s8-ch1", name: "Fasal Utpadan Aur Prabandhan", nameHi: "फसल उत्पादन और प्रबंधन" },
            { id: "s8-ch2", name: "Sukshmajeev Mitra Aur Shatru", nameHi: "सूक्ष्मजीव : मित्र और शत्रु" },
            { id: "s8-ch3", name: "Sanshleshit Reshe Aur Plastic", nameHi: "संश्लेषित रेशे और प्लास्टिक" },
            { id: "s8-ch4", name: "Padarth Dhatu Aur Adhatu", nameHi: "पदार्थ : धातु और अधातु" },
            { id: "s8-ch5", name: "Koyala Aur Petroleum", nameHi: "कोयला और पेट्रोलियम" },
            { id: "s8-ch6", name: "Dahan Aur Jwala", nameHi: "दहन और ज्वाला" },
            { id: "s8-ch7", name: "Paudhon Aur Jantuo Ka Sanrakshan", nameHi: "पौधों और जन्तुओं का संरक्षण" },
            { id: "s8-ch8", name: "Koshika Sanrachna Aur Karya", nameHi: "कोशिका – संरचना और कार्य" },
            { id: "s8-ch9", name: "Jantuo Mein Prajanan", nameHi: "जन्तुओं में प्रजनन" },
            { id: "s8-ch10", name: "Kishoravastha Ki Or", nameHi: "किशोरावस्था की ओर" },
            { id: "s8-ch11", name: "Bal Aur Daab", nameHi: "बल और दाब" },
            { id: "s8-ch12", name: "Gharshan", nameHi: "घर्षण" },
            { id: "s8-ch13", name: "Dhwani", nameHi: "ध्वनि" },
            { id: "s8-ch14", name: "Rasayanik Prabhavon Dwara Vidyut Dhara", nameHi: "रासायनिक प्रभावों द्वारा विद्युत धारा" },
            { id: "s8-ch15", name: "Kuch Prakritik Parighatnaen", nameHi: "कुछ प्राकृतिक परिघटनाएँ" },
            { id: "s8-ch16", name: "Prakash", nameHi: "प्रकाश" },
          ]
        },
      ]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक विज्ञान", icon: "globe",
      books: [
        {
          id: "hamare-ateet-3", name: "Hamare Ateet 3", nameHi: "हमारे अतीत – 3",
          chapters: [
            { id: "ha3-ch1", name: "Vyapar Se Samrajya Tak", nameHi: "व्यापार से साम्राज्य तक – ईस्ट इंडिया कंपनी" },
            { id: "ha3-ch2", name: "Bharat Mein British Shasan", nameHi: "भारत में ब्रिटिश शासन की स्थापना" },
            { id: "ha3-ch3", name: "Gramin Kshetra Par Shasan", nameHi: "ग्रामीण क्षेत्र पर शासन" },
            { id: "ha3-ch4", name: "Adivasi Diku Aur Swarn Yug", nameHi: "आदिवासी, दीकू और एक स्वर्ण युग की कल्पना" },
            { id: "ha3-ch5", name: "Jab Log Vidroh Karte Hain", nameHi: "जब लोग विद्रोह करते हैं – 1857 और उसके बाद" },
            { id: "ha3-ch6", name: "Upniveshvad Aur Shahar", nameHi: "उपनिवेशवाद और शहर" },
            { id: "ha3-ch7", name: "Bunakar Lohari Aur Karkhaane", nameHi: "बुनकर, लोहारी और कारखाने" },
            { id: "ha3-ch8", name: "Mahilaen Jati Aur Sudhar", nameHi: "महिलाएँ, जाति और सुधार" },
            { id: "ha3-ch9", name: "Rashtriy Andolan", nameHi: "राष्ट्रीय आंदोलन" },
            { id: "ha3-ch10", name: "Swatantrata Ke Baad Bharat", nameHi: "स्वतंत्रता के बाद भारत" },
          ]
        },
        {
          id: "sansadhan-vikas", name: "Sansadhan Evam Vikas", nameHi: "संसाधन एवं विकास",
          chapters: [
            { id: "sv-ch1", name: "Sansadhan", nameHi: "संसाधन" },
            { id: "sv-ch2", name: "Bhoomi Mrida Jal Vanaspati", nameHi: "भूमि, मृदा, जल, प्राकृतिक वनस्पति और वन्य जीवन संसाधन" },
            { id: "sv-ch3", name: "Khanij Aur Shakti Sansadhan", nameHi: "खनिज और शक्ति संसाधन" },
            { id: "sv-ch4", name: "Krishi", nameHi: "कृषि" },
            { id: "sv-ch5", name: "Udyog", nameHi: "उद्योग" },
            { id: "sv-ch6", name: "Manav Sansadhan", nameHi: "मानव संसाधन" },
          ]
        },
        {
          id: "samajik-rajnitik-3", name: "Samajik Evam Rajnitik Jeevan 3", nameHi: "सामाजिक एवं राजनीतिक जीवन – 3",
          chapters: [
            { id: "srj3-ch1", name: "Bhartiya Samvidhan", nameHi: "भारतीय संविधान" },
            { id: "srj3-ch2", name: "Dharmnirpekshata", nameHi: "धर्मनिरपेक्षता" },
            { id: "srj3-ch3", name: "Sansad Aur Kanoon Nirman", nameHi: "संसद और कानून निर्माण" },
            { id: "srj3-ch4", name: "Nyaypalika", nameHi: "न्यायपालिका" },
            { id: "srj3-ch5", name: "Hashiye Par Log", nameHi: "हाशिए पर लोग" },
            { id: "srj3-ch6", name: "Samajik Nyay", nameHi: "सामाजिक न्याय" },
            { id: "srj3-ch7", name: "Jansuvidhaaen", nameHi: "जनसुविधाएँ" },
            { id: "srj3-ch8", name: "Kanoon Aur Samajik Nyay", nameHi: "कानून और सामाजिक न्याय" },
          ]
        },
      ]
    },
  ],
  9: [
    {
      id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
      books: [
        {
          id: "kshitij-1", name: "Kshitij Bhag 1", nameHi: "क्षितिज भाग 1",
          chapters: [
            { id: "k1-ch1", name: "Do Bailon Ki Katha", nameHi: "दो बैलों की कथा" },
            { id: "k1-ch2", name: "Lhasa Ki Or", nameHi: "ल्हासा की ओर" },
            { id: "k1-ch3", name: "Upbhoktavad Ki Sanskriti", nameHi: "उपभोक्तावाद की संस्कृति" },
            { id: "k1-ch4", name: "Sanwale Sapnon Ki Yaad", nameHi: "साँवले सपनों की याद" },
            { id: "k1-ch5", name: "Nana Sahab Ki Putri", nameHi: "नाना साहब की पुत्री देवी मैना को भस्म कर दिया गया" },
            { id: "k1-ch6", name: "Premchand Ke Phate Joote", nameHi: "प्रेमचंद के फटे जूते" },
            { id: "k1-ch7", name: "Mere Bachpan Ke Din", nameHi: "मेरे बचपन के दिन" },
            { id: "k1-ch8", name: "Ek Kutta Aur Ek Maina", nameHi: "एक कुत्ता और एक मैना" },
            { id: "k1-ch9", name: "Kabir Saakhiyan", nameHi: "कबीर – साखियाँ" },
            { id: "k1-ch10", name: "Rahim Ke Dohe", nameHi: "रहीम – दोहे" },
            { id: "k1-ch11", name: "Aadmi Nama", nameHi: "आदमी नामा" },
            { id: "k1-ch12", name: "Ek Phool Ki Chah", nameHi: "एक फूल की चाह" },
            { id: "k1-ch13", name: "Geet Ageet", nameHi: "गीत – अगीत" },
            { id: "k1-ch14", name: "Agnipath", nameHi: "अग्निपथ" },
          ]
        },
        {
          id: "kritika-1", name: "Kritika Bhag 1", nameHi: "कृतिका भाग 1",
          chapters: [
            { id: "kr1-ch1", name: "Is Jal Pralay Mein", nameHi: "इस जल प्रलय में" },
            { id: "kr1-ch2", name: "Mere Sang Ki Auraten", nameHi: "मेरे संग की औरतें" },
            { id: "kr1-ch3", name: "Ridh Ki Haddi", nameHi: "रीढ़ की हड्डी" },
            { id: "kr1-ch4", name: "Mati Wali", nameHi: "माटी वाली" },
            { id: "kr1-ch5", name: "Kis Tarah Aakhirkar Main Hindi Mein Aaya", nameHi: "किस तरह आखिरकार मैं हिंदी में आया" },
          ]
        },
      ]
    },
    {
      id: "english", name: "English", nameHi: "English", icon: "book-open",
      books: [
        {
          id: "beehive", name: "Beehive", nameHi: "Beehive",
          chapters: [
            { id: "bh-ch1", name: "The Fun They Had", nameHi: "The Fun They Had" },
            { id: "bh-ch2", name: "The Sound of Music", nameHi: "The Sound of Music" },
            { id: "bh-ch3", name: "The Little Girl", nameHi: "The Little Girl" },
            { id: "bh-ch4", name: "A Truly Beautiful Mind", nameHi: "A Truly Beautiful Mind" },
            { id: "bh-ch5", name: "The Snake and the Mirror", nameHi: "The Snake and the Mirror" },
            { id: "bh-ch6", name: "My Childhood", nameHi: "My Childhood" },
            { id: "bh-ch7", name: "Packing", nameHi: "Packing" },
            { id: "bh-ch8", name: "Reach for the Top", nameHi: "Reach for the Top" },
            { id: "bh-ch9", name: "The Bond of Love", nameHi: "The Bond of Love" },
            { id: "bh-ch10", name: "Kathmandu", nameHi: "Kathmandu" },
            { id: "bh-ch11", name: "If I Were You", nameHi: "If I Were You" },
          ]
        },
        {
          id: "moments", name: "Moments", nameHi: "Moments",
          chapters: [
            { id: "mo-ch1", name: "The Lost Child", nameHi: "The Lost Child" },
            { id: "mo-ch2", name: "The Adventures of Toto", nameHi: "The Adventures of Toto" },
            { id: "mo-ch3", name: "Iswaran the Storyteller", nameHi: "Iswaran the Storyteller" },
            { id: "mo-ch4", name: "In the Kingdom of Fools", nameHi: "In the Kingdom of Fools" },
            { id: "mo-ch5", name: "The Happy Prince", nameHi: "The Happy Prince" },
            { id: "mo-ch6", name: "Weathering the Storm in Ersama", nameHi: "Weathering the Storm in Ersama" },
            { id: "mo-ch7", name: "The Last Leaf", nameHi: "The Last Leaf" },
            { id: "mo-ch8", name: "A House Is Not a Home", nameHi: "A House Is Not a Home" },
            { id: "mo-ch9", name: "The Accidental Tourist", nameHi: "The Accidental Tourist" },
            { id: "mo-ch10", name: "The Beggar", nameHi: "The Beggar" },
          ]
        },
      ]
    },
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [
        {
          id: "math-9", name: "Mathematics", nameHi: "गणित",
          chapters: [
            { id: "m9-ch1", name: "Sankhya Paddhati", nameHi: "संख्या पद्धति" },
            { id: "m9-ch2", name: "Bahupd", nameHi: "बहुपद" },
            { id: "m9-ch3", name: "Nirdeshanank Jyamiti", nameHi: "निर्देशांक ज्यामिति" },
            { id: "m9-ch4", name: "Do Charon Wale Raikhik Samikaran", nameHi: "दो चरों वाले रैखिक समीकरण" },
            { id: "m9-ch5", name: "Euclid Ki Jyamiti Ka Parichay", nameHi: "यूक्लिड की ज्यामिति का परिचय" },
            { id: "m9-ch6", name: "Rekhaen Aur Kon", nameHi: "रेखाएँ और कोण" },
            { id: "m9-ch7", name: "Tribhuj", nameHi: "त्रिभुज" },
            { id: "m9-ch8", name: "Chaturbhuj", nameHi: "चतुर्भुज" },
            { id: "m9-ch9", name: "Samantar Chaturbhuj Aur Tribhujon Ke Kshetrafal", nameHi: "समांतर चतुर्भुज और त्रिभुजों के क्षेत्रफल" },
            { id: "m9-ch10", name: "Vratt", nameHi: "वृत्त" },
            { id: "m9-ch11", name: "Rachnaen", nameHi: "रचनाएँ" },
            { id: "m9-ch12", name: "Heron Ka Sutra", nameHi: "हीरोन का सूत्र" },
            { id: "m9-ch13", name: "Prishtiy Kshetrafal Aur Aaytan", nameHi: "पृष्ठीय क्षेत्रफल और आयतन" },
            { id: "m9-ch14", name: "Sankhyiki", nameHi: "सांख्यिकी" },
            { id: "m9-ch15", name: "Prayikta", nameHi: "प्रायिकता" },
          ]
        },
      ]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [
        {
          id: "science-9", name: "Science", nameHi: "विज्ञान",
          chapters: [
            { id: "s9-ch1", name: "Hamare Aaspaas Ke Padarth", nameHi: "हमारे आसपास के पदार्थ" },
            { id: "s9-ch2", name: "Kya Hamare Aaspaas Ka Padarth Shuddh Hai", nameHi: "क्या हमारे आसपास का पदार्थ शुद्ध है" },
            { id: "s9-ch3", name: "Parmaanu Aur Anu", nameHi: "परमाणु और अणु" },
            { id: "s9-ch4", name: "Parmaanu Ki Sanrachna", nameHi: "परमाणु की संरचना" },
            { id: "s9-ch5", name: "Jeevan Ki Maulik Ikaai", nameHi: "जीवन की मौलिक इकाई" },
            { id: "s9-ch6", name: "Utak", nameHi: "ऊतक" },
            { id: "s9-ch7", name: "Jeevon Mein Vividhata", nameHi: "जीवों में विविधता" },
            { id: "s9-ch8", name: "Gati", nameHi: "गति" },
            { id: "s9-ch9", name: "Bal Tatha Gati Ke Niyam", nameHi: "बल तथा गति के नियम" },
            { id: "s9-ch10", name: "Gurutvakarshn", nameHi: "गुरुत्वाकर्षण" },
            { id: "s9-ch11", name: "Karya Tatha Urja", nameHi: "कार्य तथा ऊर्जा" },
            { id: "s9-ch12", name: "Dhwani", nameHi: "ध्वनि" },
            { id: "s9-ch13", name: "Hum Bimar Kyon Padte Hain", nameHi: "हम बीमार क्यों पड़ते हैं" },
            { id: "s9-ch14", name: "Prakritik Sansadhan", nameHi: "प्राकृतिक संसाधन" },
            { id: "s9-ch15", name: "Khadya Sansadhanon Mein Sudhar", nameHi: "खाद्य संसाधनों में सुधार" },
          ]
        },
      ]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक विज्ञान", icon: "globe",
      books: [
        {
          id: "bharat-vishwa-1", name: "India and the Contemporary World 1", nameHi: "भारत और समकालीन विश्व – 1",
          chapters: [
            { id: "bv1-ch1", name: "Fransisi Kranti", nameHi: "फ्रांसीसी क्रांति" },
            { id: "bv1-ch2", name: "Europe Mein Samajvad Tatha Rusi Kranti", nameHi: "यूरोप में समाजवाद तथा रूसी क्रांति" },
            { id: "bv1-ch3", name: "Nazivad Aur Hitler Ka Uday", nameHi: "नाज़ीवाद और हिटलर का उदय" },
            { id: "bv1-ch4", name: "Van Samaj Aur Upniveshvad", nameHi: "वन समाज और उपनिवेशवाद" },
            { id: "bv1-ch5", name: "Aadhunik Vishwa Mein Charvahe", nameHi: "आधुनिक विश्व में चरवाहे" },
            { id: "bv1-ch6", name: "Kisan Zamindar Aur Rajya", nameHi: "किसान, जमींदार और राज्य" },
            { id: "bv1-ch7", name: "Vastron Ka Itihas", nameHi: "वस्त्रों का इतिहास" },
          ]
        },
        {
          id: "samkalin-bharat-1", name: "Contemporary India 1", nameHi: "समकालीन भारत – 1",
          chapters: [
            { id: "sb1-ch1", name: "Bharat Aakar Aur Sthiti", nameHi: "भारत – आकार और स्थिति" },
            { id: "sb1-ch2", name: "Bharat Ke Bhautik Swaroop", nameHi: "भारत के भौतिक स्वरूप" },
            { id: "sb1-ch3", name: "Apavah", nameHi: "अपवाह" },
            { id: "sb1-ch4", name: "Jalvayu", nameHi: "जलवायु" },
            { id: "sb1-ch5", name: "Prakritik Vanaspati Aur Vanya Jeev", nameHi: "प्राकृतिक वनस्पति और वन्य जीव" },
            { id: "sb1-ch6", name: "Janasankhya", nameHi: "जनसंख्या" },
          ]
        },
        {
          id: "loktantrik-1", name: "Democratic Politics 1", nameHi: "लोकतांत्रिक राजनीति – 1",
          chapters: [
            { id: "lp1-ch1", name: "Loktantra Kya Hai Kyon Loktantra", nameHi: "लोकतंत्र क्या है? क्यों लोकतंत्र?" },
            { id: "lp1-ch2", name: "Samvidhan Nirman", nameHi: "संविधान निर्माण" },
            { id: "lp1-ch3", name: "Chunavi Rajniti", nameHi: "चुनावी राजनीति" },
            { id: "lp1-ch4", name: "Sansthaon Ka Kamkaaj", nameHi: "संस्थाओं का कामकाज" },
            { id: "lp1-ch5", name: "Loktantrik Adhikar", nameHi: "लोकतांत्रिक अधिकार" },
          ]
        },
        {
          id: "arthshastra-9", name: "Economics", nameHi: "अर्थशास्त्र",
          chapters: [
            { id: "ar9-ch1", name: "Palampur Gaon Ki Kahani", nameHi: "पालमपुर गाँव की कहानी" },
            { id: "ar9-ch2", name: "Sansadhan Ke Roop Mein Log", nameHi: "संसाधन के रूप में लोग" },
            { id: "ar9-ch3", name: "Garibi Ek Chunauti", nameHi: "गरीबी एक चुनौती" },
            { id: "ar9-ch4", name: "Bharat Mein Khadya Suraksha", nameHi: "भारत में खाद्य सुरक्षा" },
          ]
        },
      ]
    },
  ],
  10: [
    {
      id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "languages",
      books: [
        {
          id: "kshitij-2", name: "Kshitij Bhag 2", nameHi: "क्षितिज भाग 2",
          chapters: [
            { id: "k2-ch1", name: "Netaji Ka Chashma", nameHi: "नेताजी का चश्मा" },
            { id: "k2-ch2", name: "Balgobin Bhagat", nameHi: "बालगोबिन भगत" },
            { id: "k2-ch3", name: "Lakhnavi Andaz", nameHi: "लखनवी अंदाज़" },
            { id: "k2-ch4", name: "Manaviy Karuna Ki Divya Chamak", nameHi: "मानवीय करुणा की दिव्य चमक" },
            { id: "k2-ch5", name: "Ek Kahani Yah Bhi", nameHi: "एक कहानी यह भी" },
            { id: "k2-ch6", name: "Stri Shiksha Ke Virodhi Kutarkon Ka Khandan", nameHi: "स्त्री शिक्षा के विरोधी कुतर्कों का खंडन" },
            { id: "k2-ch7", name: "Sanskriti", nameHi: "संस्कृति" },
            { id: "k2-ch8", name: "Kabir Sakhi", nameHi: "कबीर – साखी" },
            { id: "k2-ch9", name: "Meera Pad", nameHi: "मीरा – पद" },
            { id: "k2-ch10", name: "Bihari Dohe", nameHi: "बिहारी – दोहे" },
            { id: "k2-ch11", name: "Manushyata", nameHi: "मनुष्यता" },
            { id: "k2-ch12", name: "Parvat Pradesh Mein Pavas", nameHi: "पर्वत प्रदेश में पावस" },
            { id: "k2-ch13", name: "Top", nameHi: "तोप" },
            { id: "k2-ch14", name: "Kar Chale Hum Fida", nameHi: "कर चले हम फ़िदा" },
            { id: "k2-ch15", name: "Aatmtran", nameHi: "आत्मत्राण" },
          ]
        },
        {
          id: "kritika-2", name: "Kritika Bhag 2", nameHi: "कृतिका भाग 2",
          chapters: [
            { id: "kr2-ch1", name: "Mata Ka Anchal", nameHi: "माता का अंचल" },
            { id: "kr2-ch2", name: "George Pancham Ki Naak", nameHi: "जॉर्ज पंचम की नाक" },
            { id: "kr2-ch3", name: "Sana-Sana Hath Jodi", nameHi: "साना-साना हाथ जोड़ि" },
            { id: "kr2-ch4", name: "Ehi Thaiyan Jhulni Herani Ho Rama", nameHi: "एही ठैयाँ झुलनी हेरानी हो रामा" },
          ]
        },
      ]
    },
    {
      id: "english", name: "English", nameHi: "English", icon: "book-open",
      books: [
        {
          id: "first-flight", name: "First Flight", nameHi: "First Flight",
          chapters: [
    { id: "ff-ch1", name: "A Letter to God", nameHi: "A Letter to God" },
            { id: "ff-ch2", name: "Nelson Mandela: Long Walk to Freedom", nameHi: "Nelson Mandela: Long Walk to Freedom" },
            { id: "ff-ch3", name: "Two Stories about Flying", nameHi: "Two Stories about Flying" },
            { id: "ff-ch4", name: "From the Diary of Anne Frank", nameHi: "From the Diary of Anne Frank" },
            { id: "ff-ch5", name: "The Hundred Dresses – I", nameHi: "The Hundred Dresses – I" },
            { id: "ff-ch6", name: "The Hundred Dresses – II", nameHi: "The Hundred Dresses – II" },
            { id: "ff-ch7", name: "Glimpses of India", nameHi: "Glimpses of India" },
            { id: "ff-ch8", name: "Mijbil the Otter", nameHi: "Mijbil the Otter" },
            { id: "ff-ch9", name: "Madam Rides the Bus", nameHi: "Madam Rides the Bus" },
            { id: "ff-ch10", name: "The Sermon at Benares", nameHi: "The Sermon at Benares" },
            { id: "ff-ch11", name: "The Proposal", nameHi: "The Proposal" },
          ]
        },
        {
          id: "footprints", name: "Footprints Without Feet", nameHi: "Footprints Without Feet",
          chapters: [
            { id: "fw-ch1", name: "A Triumph of Surgery", nameHi: "A Triumph of Surgery" },
            { id: "fw-ch2", name: "The Thief's Story", nameHi: "The Thief's Story" },
            { id: "fw-ch3", name: "The Midnight Visitor", nameHi: "The Midnight Visitor" },
            { id: "fw-ch4", name: "A Question of Trust", nameHi: "A Question of Trust" },
            { id: "fw-ch5", name: "Footprints Without Feet", nameHi: "Footprints Without Feet" },
            { id: "fw-ch6", name: "The Making of a Scientist", nameHi: "The Making of a Scientist" },
            { id: "fw-ch7", name: "The Necklace", nameHi: "The Necklace" },
            { id: "fw-ch8", name: "The Hack Driver", nameHi: "The Hack Driver" },
            { id: "fw-ch9", name: "Bholi", nameHi: "Bholi" },
            { id: "fw-ch10", name: "The Book That Saved the Earth", nameHi: "The Book That Saved the Earth" },
          ]
        },
      ]
    },
    {
      id: "math", name: "Mathematics", nameHi: "गणित", icon: "calculator",
      books: [
        {
          id: "math-10", name: "Mathematics", nameHi: "गणित",
          chapters: [
            { id: "m10-ch1", name: "Vastvik Sankhyaen", nameHi: "वास्तविक संख्याएँ" },
            { id: "m10-ch2", name: "Bahupd", nameHi: "बहुपद" },
            { id: "m10-ch3", name: "Do Charon Wale Raikhik Samikaran Yugm", nameHi: "दो चरों वाले रैखिक समीकरण युग्म" },
            { id: "m10-ch4", name: "Dwisghat Samikaran", nameHi: "द्विघात समीकरण" },
            { id: "m10-ch5", name: "Samantar Shreniyan", nameHi: "समांतर श्रेणियाँ" },
            { id: "m10-ch6", name: "Tribhuj", nameHi: "त्रिभुज" },
            { id: "m10-ch7", name: "Nirdeshanank Jyamiti", nameHi: "निर्देशांक ज्यामिति" },
            { id: "m10-ch8", name: "Trikonmiti Ka Parichay", nameHi: "त्रिकोणमिति का परिचय" },
            { id: "m10-ch9", name: "Trikonmitiy Sarvasamikaen", nameHi: "त्रिकोणमितीय सर्वसमिकाएँ" },
            { id: "m10-ch10", name: "Vratt", nameHi: "वृत्त" },
            { id: "m10-ch11", name: "Rachnaen", nameHi: "रचनाएँ" },
            { id: "m10-ch12", name: "Vratt Se Sambandhit Kshetrafal", nameHi: "वृत्त से संबंधित क्षेत्रफल" },
            { id: "m10-ch13", name: "Prishtiy Kshetrafal Aur Aaytan", nameHi: "पृष्ठीय क्षेत्रफल और आयतन" },
            { id: "m10-ch14", name: "Sankhyiki", nameHi: "सांख्यिकी" },
            { id: "m10-ch15", name: "Prayikta", nameHi: "प्रायिकता" },
          ]
        },
      ]
    },
    {
      id: "science", name: "Science", nameHi: "विज्ञान", icon: "flask",
      books: [
        {
          id: "science-10", name: "Science", nameHi: "विज्ञान",
          chapters: [
            { id: "s10-ch1", name: "Rasayanik Abhikriyaen Aur Samikaran", nameHi: "रासायनिक अभिक्रियाएँ और समीकरण" },
            { id: "s10-ch2", name: "Aml Kshaarak Aur Lavan", nameHi: "अम्ल, क्षारक और लवण" },
            { id: "s10-ch3", name: "Dhatu Aur Adhatu", nameHi: "धातु और अधातु" },
            { id: "s10-ch4", name: "Carbon Aur Uske Yaugik", nameHi: "कार्बन और उसके यौगिक" },
            { id: "s10-ch5", name: "Tatvon Ka Aavart Vargikaran", nameHi: "तत्वों का आवर्त वर्गीकरण" },
            { id: "s10-ch6", name: "Jaiv Prakram", nameHi: "जैव प्रक्रम" },
            { id: "s10-ch7", name: "Niyantran Aur Samvay", nameHi: "नियंत्रण और समन्वय" },
            { id: "s10-ch8", name: "Jeev Janan Kaise Karte Hain", nameHi: "जीव जनन कैसे करते हैं" },
            { id: "s10-ch9", name: "Aanuvansikta Aur Vikas", nameHi: "आनुवंशिकता और विकास" },
            { id: "s10-ch10", name: "Prakash Paravartan Aur Apvartan", nameHi: "प्रकाश – परावर्तन और अपवर्तन" },
            { id: "s10-ch11", name: "Manav Netra Tatha Rangin Sansar", nameHi: "मानव नेत्र तथा रंगीन संसार" },
            { id: "s10-ch12", name: "Vidyut", nameHi: "विद्युत" },
            { id: "s10-ch13", name: "Vidyut Dhara Ke Chumbakiy Prabhav", nameHi: "विद्युत धारा के चुंबकीय प्रभाव" },
            { id: "s10-ch14", name: "Urja Ke Srot", nameHi: "ऊर्जा के स्रोत" },
            { id: "s10-ch15", name: "Hamara Paryavaran", nameHi: "हमारा पर्यावरण" },
            { id: "s10-ch16", name: "Prakritik Sansadhanon Ka Prabandhan", nameHi: "प्राकृतिक संसाधनों का प्रबंधन" },
          ]
        },
      ]
    },
    {
      id: "social-studies", name: "Social Studies", nameHi: "सामाजिक विज्ञान", icon: "globe",
      books: [
        {
          id: "bharat-vishwa-2", name: "India and the Contemporary World 2", nameHi: "भारत और समकालीन विश्व – 2",
          chapters: [
            { id: "bv2-ch1", name: "Europe Mein Rashtravad Ka Uday", nameHi: "यूरोप में राष्ट्रवाद का उदय" },
            { id: "bv2-ch2", name: "Bharat Mein Rashtravad", nameHi: "भारत में राष्ट्रवाद" },
            { id: "bv2-ch3", name: "Bhumandlikrit Vishwa Ka Nirman", nameHi: "भूमंडलीकृत विश्व का निर्माण" },
            { id: "bv2-ch4", name: "Audyogikaran Ka Yug", nameHi: "औद्योगीकरण का युग" },
            { id: "bv2-ch5", name: "Mudran Sanskriti Aur Aadhunik Duniya", nameHi: "मुद्रण संस्कृति और आधुनिक दुनिया" },
          ]
        },
        {
          id: "samkalin-bharat-2", name: "Contemporary India 2", nameHi: "समकालीन भारत – 2",
          chapters: [
            { id: "sb2-ch1", name: "Sansadhan Aur Vikas", nameHi: "संसाधन और विकास" },
            { id: "sb2-ch2", name: "Van Evam Vanya Jeev Sansadhan", nameHi: "वन एवं वन्य जीव संसाधन" },
            { id: "sb2-ch3", name: "Jal Sansadhan", nameHi: "जल संसाधन" },
            { id: "sb2-ch4", name: "Krishi", nameHi: "कृषि" },
            { id: "sb2-ch5", name: "Khanij Tatha Urja Sansadhan", nameHi: "खनिज तथा ऊर्जा संसाधन" },
            { id: "sb2-ch6", name: "Vinirman Udyog", nameHi: "विनिर्माण उद्योग" },
            { id: "sb2-ch7", name: "Rashtriy Arthvyavastha Ki Jeevan Rekhaen", nameHi: "राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएँ" },
          ]
        },
        {
          id: "loktantrik-2", name: "Democratic Politics 2", nameHi: "लोकतांत्रिक राजनीति – 2",
          chapters: [
            { id: "lp2-ch1", name: "Satta Ki Sajhedari", nameHi: "सत्ता की साझेदारी" },
            { id: "lp2-ch2", name: "Sanghvad", nameHi: "संघवाद" },
            { id: "lp2-ch3", name: "Loktantra Aur Vividhata", nameHi: "लोकतंत्र और विविधता" },
            { id: "lp2-ch4", name: "Ling Dharm Aur Jati", nameHi: "लिंग, धर्म और जाति" },
            { id: "lp2-ch5", name: "Janasangharsh Aur Andolan", nameHi: "जनसंघर्ष और आंदोलन" },
            { id: "lp2-ch6", name: "Rajnitik Dal", nameHi: "राजनीतिक दल" },
            { id: "lp2-ch7", name: "Loktantra Ke Parinam", nameHi: "लोकतंत्र के परिणाम" },
            { id: "lp2-ch8", name: "Loktantra Ki Chunautiyan", nameHi: "लोकतंत्र की चुनौतियाँ" },
          ]
        },
        {
          id: "arthik-vikas", name: "Understanding Economic Development", nameHi: "समझदार आर्थिक विकास",
          chapters: [
            { id: "av-ch1", name: "Vikas", nameHi: "विकास" },
            { id: "av-ch2", name: "Bhartiya Arthvyavastha Ke Kshetrk", nameHi: "भारतीय अर्थव्यवस्था के क्षेत्रक" },
            { id: "av-ch3", name: "Mudra Aur Saakh", nameHi: "मुद्रा और साख" },
            { id: "av-ch4", name: "Bhumandlikaran Aur Bhartiya Arthvyavastha", nameHi: "भूमंडलीकरण और भारतीय अर्थव्यवस्था" },
            { id: "av-ch5", name: "Upbhokta Adhikar", nameHi: "उपभोक्ता अधिकार" },
          ]
        },
      ]
    },
  ],
  11: [],
  12: [],
}

export const streamsByClass: Record<ClassNumber, Stream[]> = {
  6: [], 7: [], 8: [], 9: [], 10: [],
  11: [
    {
      id: "science", name: "Science", nameHi: "विज्ञान",
      subjects: [
        {
          id: "physics", name: "Physics", nameHi: "भौतिकी", icon: "atom",
          books: [
            {
              id: "physics-11-1", name: "Physics Part 1", nameHi: "भौतिकी भाग 1",
              chapters: [
                { id: "ph11-ch1", name: "Bhautik Jagat", nameHi: "भौतिक जगत" },
                { id: "ph11-ch2", name: "Matra Aur Mapan", nameHi: "मात्रक और मापन" },
                { id: "ph11-ch3", name: "Saral Rekha Mein Gati", nameHi: "सरल रेखा में गति" },
                { id: "ph11-ch4", name: "Samtal Mein Gati", nameHi: "समतल में गति" },
                { id: "ph11-ch5", name: "Gati Ke Niyam", nameHi: "गति के नियम" },
                { id: "ph11-ch6", name: "Karya Urja Aur Shakti", nameHi: "कार्य, ऊर्जा और शक्ति" },
                { id: "ph11-ch7", name: "Kanon Ki Pranali Aur Ghurnan Gati", nameHi: "कणों की प्रणाली और घूर्णन गति" },
                { id: "ph11-ch8", name: "Gurutvakarshn", nameHi: "गुरुत्वाकर्षण" },
              ]
            },
            {
              id: "physics-11-2", name: "Physics Part 2", nameHi: "भौतिकी भाग 2",
              chapters: [
                { id: "ph11-ch9", name: "Thoson Ke Yantrik Gun", nameHi: "ठोसों के यांत्रिक गुण" },
                { id: "ph11-ch10", name: "Dravon Ke Yantrik Gun", nameHi: "द्रवों के यांत्रिक गुण" },
                { id: "ph11-ch11", name: "Ushmiy Gun", nameHi: "ऊष्मीय गुण" },
                { id: "ph11-ch12", name: "Ushmagatikim", nameHi: "ऊष्मागतिकी" },
                { id: "ph11-ch13", name: "Anuon Ka Gatij Siddhant", nameHi: "अणुओं का गतिज सिद्धांत" },
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
                { id: "ch11-ch3", name: "Tatvon Ka Vargikaran Aur Gunon Ki Aavartita", nameHi: "तत्वों का वर्गीकरण और गुणों की आवर्तिता" },
                { id: "ch11-ch4", name: "Rasayanik Bandhan Aur Aanvik Sanrachna", nameHi: "रासायनिक बंधन और आणविक संरचना" },
                { id: "ch11-ch5", name: "Padarth Ki Avasthaaen", nameHi: "पदार्थ की अवस्थाएँ" },
                { id: "ch11-ch6", name: "Ushmagatikim", nameHi: "ऊष्मागतिकी" },
                { id: "ch11-ch7", name: "Samyavastha", nameHi: "साम्यावस्था" },
              ]
            },
            {
              id: "chemistry-11-2", name: "Chemistry Part 2", nameHi: "रसायन विज्ञान भाग 2",
              chapters: [
                { id: "ch11-ch8", name: "Apchayn Oxidation Abhikriyaen", nameHi: "अपचयन-ऑक्सीकरण अभिक्रियाएँ" },
                { id: "ch11-ch9", name: "Hydrogen", nameHi: "हाइड्रोजन" },
                { id: "ch11-ch10", name: "S-Block Tatv", nameHi: "s-ब्लॉक तत्व" },
                { id: "ch11-ch11", name: "P-Block Tatv", nameHi: "p-ब्लॉक तत्व" },
                { id: "ch11-ch12", name: "Karbanik Rasayan Kuch Mool Siddhant", nameHi: "कार्बनिक रसायन – कुछ मूल सिद्धांत" },
                { id: "ch11-ch13", name: "Hydrocarbon", nameHi: "हाइड्रोकार्बन" },
                { id: "ch11-ch14", name: "Paryavaran Rasayan", nameHi: "पर्यावरण रसायन" },
              ]
            },
          ]
        },
        {
          id: "biology", name: "Biology", nameHi: "जीव विज्ञान", icon: "leaf",
          books: [
            {
              id: "biology-11", name: "Biology", nameHi: "जीव विज्ञान",
              chapters: [
                { id: "bi11-ch1", name: "Jeevon Ki Vividhata", nameHi: "जीवों की विविधता" },
                { id: "bi11-ch2", name: "Padap Jagat", nameHi: "पादप जगत" },
                { id: "bi11-ch3", name: "Jantu Jagat", nameHi: "जन्तु जगत" },
                { id: "bi11-ch4", name: "Pushpi Paudhon Ki Aakariki", nameHi: "पुष्पी पौधों की आकारिकी" },
                { id: "bi11-ch5", name: "Pushpi Paudhon Ki Sharirikta", nameHi: "पुष्पी पौधों की शारीरिकी" },
                { id: "bi11-ch6", name: "Koshika Sanrachna Aur Karya", nameHi: "कोशिका – संरचना और कार्य" },
                { id: "bi11-ch7", name: "Koshika Vibhajan", nameHi: "कोशिका विभाजन" },
                { id: "bi11-ch8", name: "Jeevon Mein Parivahan", nameHi: "जीवों में परिवहन" },
                { id: "bi11-ch9", name: "Paudhon Mein Khanij Poshan", nameHi: "पौधों में खनिज पोषण" },
                { id: "bi11-ch10
