import { Annotation } from "@/interfaces";
import { api } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

export const AnnotationContext = createContext();

export const AnnotationProvider = ({ children }) => {
  const annotator_id = "27dc91a5-1899-4da7-8548-1a8263477cbc";
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const {
    data: completedQuestions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["completedQuestions", annotator_id],
    queryFn: () => api.getCompletedQuestions(annotator_id),
  });

  // Timer logic
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimeSpent((prevTime) => prevTime + 1);
      }, 1000);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsActive(false);
        clearInterval(interval);
      } else {
        setIsActive(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive]);

  const mutation = useMutation({
    mutationFn: ({
      taskId,
      annotation,
    }: {
      taskId: string;
      annotation: Annotation;
    }) => api.submitAnswer(taskId, annotation),

    onSuccess: () => {
      console.log("Submitted successfully");
    },

    onError: (error) => {
      console.error("Error submitting answer:", error);
    },
  });

  // Submission function
  const submit = ({
    task_id,
    question_id,
    answer,
    segments_answered,
    segments_watched = [],
    annotator,
  }) => {
    const annotation = new Annotation({
      id: crypto.randomUUID(),
      question_id,
      answer,
      segments_answered,
      segments_watched,
      time_spent: timeSpent,
      annotator,
    });

    mutation.mutate({ taskId: task_id, annotation });
  };

  return (
    <AnnotationContext.Provider
      value={{
        timeSpent,
        isActive,
        completedQuestions,
        setIsActive,
        submit,
      }}
    >
      {children}
    </AnnotationContext.Provider>
  );
};
