import { createContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

// Define the structure of a task
interface Task {
  video_id: any;
  id: string;
  annotations?: any[]; // Replace `any[]` with the specific type if known
}

// Define the context value type
interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: unknown;
  completedTasks: number;
  progressPercentage: number;
  totalTasks: number;
}

// Define props for the TaskProvider
interface TaskProviderProps {
  children: ReactNode;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const annotator_id = "27dc91a5-1899-4da7-8548-1a8263477cbc";

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks", annotator_id],
    queryFn: () => api.fetchTasks(annotator_id),
  });

  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  const totalTasks = tasks.length;

  useEffect(() => {
    const completed = tasks.filter(
      (task) => task.annotations && task.annotations.length === 3
    ).length;

    setCompletedTasks(completed);

    const progress = totalTasks > 0 ? (completed / totalTasks) * 100 : 0;
    setProgressPercentage(progress);
  }, [tasks, totalTasks]);

  const value: TaskContextType = {
    tasks,
    isLoading,
    error,
    completedTasks,
    progressPercentage,
    totalTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
