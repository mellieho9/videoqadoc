// app/tasks/[videoId]/[questionId]/page.tsx
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TaskBar from "@/components/controller/taskBar";
import { FieldSet } from "@/components/input/fieldSet";
import TimeRangeContainer from "@/components/input/timeRangeContainer";
import { Button, Divider } from "@nextui-org/react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { api } from "@/utils/api";

export default function TaskPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const { videoId, questionId } = params;

  const [selectedOption, setSelectedOption] = useState();
  const [timeRanges, setTimeRanges] = useState([]);

  // Fetch question data
  const { data: questionData, isLoading } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => api.fetchQuestionData(questionId),
  });

  // Submit mutation
  const mutation = useMutation({
    // Define mutationFn to accept only questionId
    mutationFn: (questionId) => api.submitAnswer(questionId),
    onSuccess: () => {
      // Invalidate and refetch questions list
      queryClient.invalidateQueries(["questions"]);
      // Optionally redirect back to questions list
      // router.push('/questions');
    },
    onError: (error) => {
      console.error("Error submitting answer:", error);
    },
  });

  const handleSubmit = () => {
    console.log("Handle submit called with questionId:", questionId);
    // Call mutation.mutate with only questionId
    mutation.mutate(questionId);
  };

  if (isLoading) return <div>Loading...</div>;

  const isSubmitDisabled =
    !selectedOption ||
    timeRanges.length === 0 ||
    timeRanges.some((range) => !range.from || !range.to || range.error);
  const questionIdx = questionId
    .split("-") // Split the string by '-'
    .map(Number) // Convert each part to a number
    .reduce((acc, num) => acc + num, -1); // Sum the numbers
  return (
    <>
      <TaskBar questionIdx={questionIdx} />
      <section className="w-full h-full flex flex-col md:flex-row items-center justify-center p-10 gap-4">
        <div className="w-full md:w-3/4 rounded-md">
          <YouTubeEmbed videoid={questionData?.videoId || ""} />
        </div>

        <div className="flex flex-col p-5 gap-4">
          <FieldSet
            question={questionData?.question || ""}
            options={questionData?.options || []}
            value={selectedOption}
            onChange={setSelectedOption}
          />

          <Divider />

          <TimeRangeContainer value={timeRanges} onChange={setTimeRanges} />
          {/* <Button color="primary" isDisabled={isSubmitDisabled}>
            Submit
          </Button> */}
          <Button
            color="primary"
            isDisabled={isSubmitDisabled}
            onClick={handleSubmit}
            isLoading={mutation.isPending}
          >
            Submit
          </Button>
        </div>
      </section>
    </>
  );
}
