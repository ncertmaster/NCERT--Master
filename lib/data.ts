export type ClassNumber = 6 | 7 | 8 | 9 | 10 | 11 | 12

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
          { id: "s6-ch1", name: "Bhojan Ke Ghatak", nameHi: "भोजन के घटक" },
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
            { id: "h6-ch2", name: "Aakhet Se Bhojan Utpadan Tak", nameHi: "आखेट-खाद्य संग्रह से भोजन उत्पादन तक" },
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
          id: "civics-6", name: "Samajik Evam Rajnitik Jeevan 1 (Civics)", nameHi: "सामाजिक एवं राजनीतिक जीवन – 1",
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
            { id: "hs6-ch4", name: "An Indian-American Woman in Space", nameHi: "An Indian-American Woman in Space: Kalpana Chawla" },
            { id: "hs6-ch5", name: "A Different Kind of School", nameHi: "A Different Kind of School" },
            { id: "hs6-ch6", name: "Who I Am", nameHi: "Who I Am" },
            { id: "hs6-ch7", name: "Fair Play", nameHi: "Fair Play" },
            { id: "hs6-ch8", name: "The Banyan Tree", nameHi: "The Banyan Tree" },
          ]
        },
        {
          id: "pact-sun-6", name: "A Pact with the Sun (Supplementary)", nameHi: "A Pact with the Sun",
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
           
