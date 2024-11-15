import { Annotation } from "@/interfaces";

const API_BASE_URL = "http://localhost:8000";

export const api = {
  fetchTasks: async (annotatorId: string) => {
    const response = await fetch(`${API_BASE_URL}/tasks/tasks/${annotatorId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch task data");
    }
    const data = await response.json();
    return data;
  },
  fetchTask: async (taskId: string) => {
    const response = await fetch(`${API_BASE_URL}/tasks/task/${taskId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch task data");
    }
    const data = await response.json();
    return data;
  },
  fetchVideoData: async (videoId: string) => {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch video data");
    }
    const data = await response.json();
    return data;
  },
  fetchQuestionData: async (questionId: string) => {
    const response = await fetch(`${API_BASE_URL}/questions/${questionId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch question data");
    }
    const data = await response.json();
    return data;
  },
  getCompletedQuestions: async (annotatorId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/annotations/completed_questions/${annotatorId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch question data");
    }
    const data = await response.json();
    return data;
  },
  submitAnswer: async (taskId: string, annotation: Annotation) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(annotation),
    });
    if (!response.ok) {
      throw new Error("Failed to submit answer");
    }
    const data = await response.json();
    return data;
  },
};
