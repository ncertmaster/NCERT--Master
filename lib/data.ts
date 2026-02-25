export type Chapter = {
  id: number
  name: string
}

export type Book = {
  name: string
  chapters: Chapter[]
}

export type Subject = {
  name: string
  books: Book[]
}

export type ClassData = {
  subjects: Subject[]
}

export const curriculum: Record<number, ClassData> = {
  6: {
    subjects: [
      {
        name: "Mathematics",
        books: [
          {
            name: "Mathematics (Ganit)",
            chapters: [
              { id: 1, name: "Knowing Our Numbers" },
              { id: 2, name: "Whole Numbers" },
              { id: 3, name: "Playing with Numbers" },
              { id: 4, name: "Basic Geometrical Ideas" },
              { id: 5, name: "Understanding Elementary Shapes" }
            ]
          }
        ]
      },
      {
        name: "Science",
        books: [
          {
            name: "Science (Vigyan)",
            chapters: [
              { id: 1, name: "Food: Where Does It Come From?" },
              { id: 2, name: "Components of Food" },
              { id: 3, name: "Fibre to Fabric" },
              { id: 4, name: "Sorting Materials into Groups" },
              { id: 5, name: "Separation of Substances" }
            ]
          }
        ]
      },
      {
        name: "English",
        books: [
          {
            name: "Honeysuckle",
            chapters: [
              { id: 1, name: "Who Did Patrick's Homework?" },
              { id: 2, name: "How the Dog Found Himself" },
              { id: 3, name: "Taro’s Reward" }
            ]
          }
        ]
      },
      {
        name: "Hindi",
        books: [
          {
            name: "Vasant",
            chapters: [
              { id: 1, name: "वह चिड़िया जो" },
              { id: 2, name: "बचपन" },
              { id: 3, name: "नादान दोस्त" }
            ]
          }
        ]
      }
    ]
  }
    }
// Temporary compatibility exports

export const subjectsByClass = {
  6: ["Math", "Science", "English", "Social Science", "Hindi"],
  7: ["Math", "Science", "English", "Social Science", "Hindi"],
  8: ["Math", "Science", "English", "Social Science", "Hindi"],
  9: ["Math", "Science", "English", "Social Science", "Hindi"],
  10: ["Math", "Science", "English", "Social Science", "Hindi"],
  11: ["Math", "Physics", "Chemistry", "Biology", "English"],
  12: ["Math", "Physics", "Chemistry", "Biology", "English"]
};

export const streamsByClass = {
  11: ["Science", "Commerce", "Humanities"],
  12: ["Science", "Commerce", "Humanities"]
};

export function getQuizQuestions() {
  return [];
}
