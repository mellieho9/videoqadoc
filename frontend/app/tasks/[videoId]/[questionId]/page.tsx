// app/tasks/[videoId]/[questionId]/page.tsx
"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();

  // keep track of answers
  const [selectedOption, setSelectedOption] = useState();
  const [timeRanges, setTimeRanges] = useState([]);

  // fetch question data
  const { data: questionData, isLoading } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => api.fetchQuestionData(questionId),
  });

  // submit mutation
  const mutation = useMutation({
    mutationFn: (questionId) => api.submitAnswer(questionId),
    onSuccess: () => {
      // invalid and refetch questions list
      queryClient.invalidateQueries(["questions"]);
    },
    onError: (error) => {
      console.error("Error submitting answer:", error);
    },
  });

  // behavior when user clicks submit
  const handleSubmit = () => {
    console.log("Handle submit called with questionId:", questionId);
    mutation.mutate(questionId);
    // move to the next question
    let videoIdx = questionId.split("-")[0];
    let questionIdx = parseInt(questionId.split("-")[1]);
    if (questionIdx === 3) {
      router.push(`/tasks/${videoId + 1}/${videoIdx}-1`);
    } else {
      router.push(`/tasks/${videoId}/${videoIdx}-${questionIdx + 1}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  // disable submit button if user hasn't answered provided all the necessary annotations
  const isSubmitDisabled =
    !selectedOption ||
    timeRanges.length === 0 ||
    timeRanges.some((range) => !range.from || !range.to || range.error);

  const questionIdx = questionId
    .split("-") // split the string by '-'
    .map(Number) // convert each part to a number
    .reduce((acc, num) => acc + num, -1); // sum the numbers
  return (
    <>
      <TaskBar questionIdx={questionIdx} />
      {/* video player  */}
      <section className="w-full h-full flex flex-col md:flex-row items-center justify-center p-10 gap-4">
        <div className="w-full md:w-3/4 rounded-md">
          <YouTubeEmbed videoid={questionData?.videoId || ""} />
        </div>
        {/* record answer to video question  */}
        <div className="flex flex-col p-5 gap-4">
          <FieldSet
            question={questionData?.question || ""}
            options={questionData?.options || []}
            value={selectedOption}
            onChange={setSelectedOption}
          />

          <Divider />
          {/* record answer to timepoints */}
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
