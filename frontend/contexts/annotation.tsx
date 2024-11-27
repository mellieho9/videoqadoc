import {
  Annotation,
  SegmentAnswerProp,
  SegmentWatchedProp,
} from "@/interfaces";
import { api } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState, ReactNode } from "react";

// Define the context value type
interface AnnotationContextType {
  timeSpent: number;
  isActive: boolean;
  completedQuestions: any[]; // Replace `any[]` with the actual type if known
  setIsActive: (isActive: boolean) => void;
  submit: (params: SubmitParams) => void;
  mutation: typeof mutation;
  setSegmentWatched: React.Dispatch<React.SetStateAction<SegmentWatchedProp[]>>;
}

// Props type for the AnnotationProvider
interface AnnotationProviderProps {
  children: ReactNode;
}

// Parameters type for the `submit` function
interface SubmitParams {
  task_id: string;
  question_id: string;
  answer: string;
  segments_answered: SegmentAnswerProp[];
  annotator: string;
}

export const AnnotationContext = createContext<
  AnnotationContextType | undefined
>(undefined);

export const AnnotationProvider = ({ children }: AnnotationProviderProps) => {
  const annotator_id = "27dc91a5-1899-4da7-8548-1a8263477cbc";
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [segmentWatched, setSegmentWatched] = useState<SegmentWatchedProp[]>(
    []
  );
  const [isActive, setIsActive] = useState<boolean>(true);

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
    let interval: NodeJS.Timeout | undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTimeSpent((prevTime) => prevTime + 1);
      }, 1000);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsActive(false);
        if (interval) clearInterval(interval);
      } else {
        setIsActive(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (interval) clearInterval(interval);
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

    onError: (error: unknown) => {
      console.error("Error submitting answer:", error);
    },
  });

  // Submission function
  const submit = ({
    task_id,
    question_id,
    answer,
    segments_answered,
    annotator,
  }: SubmitParams) => {
    const segments_watched = segmentWatched;
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
        mutation,
        setSegmentWatched,
      }}
    >
      {children}
    </AnnotationContext.Provider>
  );
};
