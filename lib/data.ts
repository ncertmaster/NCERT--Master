export const subjectsByClass = {
  6: ['Math', 'Science', 'English', 'Social Science', 'Hindi'],
  7: ['Math', 'Science', 'English', 'Social Science', 'Hindi'],
  8: ['Math', 'Science', 'English', 'Social Science', 'Hindi'],
  9: ['Math', 'Science', 'English', 'Social Science', 'Hindi'],
  10: ['Math', 'Science', 'English', 'Social Science', 'Hindi'],
  11: ['Math', 'Physics', 'Chemistry', 'Biology', 'English'],
  12: ['Math', 'Physics', 'Chemistry', 'Biology', 'English']
};

export const streamsByClass = {
  11: ['Science', 'Commerce', 'Humanities'],
  12: ['Science', 'Commerce', 'Humanities']
};

export function getQuizQuestions(classNumber, subject) {
  // Fetch quiz questions based on class and subject from the NCERT database
  // This is a placeholder function. You would implement the actual fetching logic here.
  return [];
}

export type ClassNumber = 6 | 7 | 8 | 9 | 10 | 11 | 12;