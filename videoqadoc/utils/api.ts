const API_BASE_URL = "http://localhost:8000/api";

export const api = {
  fetchQuestions: async () => {
    const response = await fetch(`${API_BASE_URL}/questions`);
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }
    return response.json();
  },

  fetchQuestionData: async (questionId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/questions/${questionId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch question data");
    }
    return response.json();
  },

  submitAnswer: async (questionId: string, data: any) => {
    const response = await fetch(
      `${API_BASE_URL}/questions/${questionId}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    if (!response.ok) {
      throw new Error("Failed to submit answer");
    }
    return response.json();
  },
};
