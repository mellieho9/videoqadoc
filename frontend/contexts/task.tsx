import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const annotator_id = "27dc91a5-1899-4da7-8548-1a8263477cbc";
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", annotator_id],
    queryFn: () => api.fetchTasks(annotator_id),
  });

  const [completedTasks, setCompletedTasks] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const totalTasks = tasks.length;

  useEffect(() => {
    const completed = tasks.filter(
      (task) => task.annotations && task.annotations.length == 3
    ).length;
    setCompletedTasks(completed);
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    setProgressPercentage(progress);
  }, [tasks]);

  const value = {
    tasks,
    isLoading,
    error,
    completedTasks,
    progressPercentage,
    totalTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};


