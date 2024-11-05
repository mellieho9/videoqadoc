export function calculateProgress({ questions }) {
  const totalQuestions = questions.length;
  const completedQuestions = questions
    .flatMap((section) => section)
    .filter((q) => q.completed).length;
  const progressPercentage =
    totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
  const groupedQuestions = questions.reduce(
    (acc, sectionQuestions, outerIndex) => {
      const section = `Section ${outerIndex + 1}`; // use the outer index as the section name
      acc[section] = sectionQuestions; // add all questions in the current section
      return acc;
    },
    {}
  );
}
