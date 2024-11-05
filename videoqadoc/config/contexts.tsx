import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const {
    data: questions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: api.fetchQuestions,
  });

  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const totalQuestions = questions.length;

  useEffect(() => {
    const completed = questions
      .flatMap((section) => section)
      .filter((q) => q.completed).length;
    setCompletedQuestions(completed);
    const progress =
      totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
    setProgressPercentage(progress);
  }, [questions]);

  const value = {
    questions,
    isLoading,
    error,
    completedQuestions,
    progressPercentage,
    totalQuestions,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};
