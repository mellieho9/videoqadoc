"use client";
import { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import TaskBar from "@/components/controller/taskBar";
import { FieldSet } from "@/components/input/fieldSet";
import TimeRangeContainer from "@/components/input/timeRangeContainer";
import { Button, Divider } from "@nextui-org/react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { api } from "@/utils/api";
import { AnnotationContext } from "@/config/contexts";

export default function TaskPage() {
  const params = useParams();
  const { taskId: taskParamId, i } = params;
  const { submit } = useContext(AnnotationContext);

  const [selectedOption, setSelectedOption] = useState();
  const [timeRanges, setTimeRanges] = useState([]);

  // Fetch task data based on taskId
  const { data: taskData } = useQuery({
    queryKey: ["task", taskParamId],
    queryFn: () => api.fetchTask(taskParamId),
    enabled: !!taskParamId,
    onError: (error) => console.error("Error fetching task data:", error),
  });

  // Fetch video data based on videoId
  const videoId = taskData?.[0]?.video_id;
  const { data: videoResponse } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => api.fetchVideoData(videoId),
    enabled: !!videoId,
    onError: (error) => console.error("Error fetching video data:", error),
  });

  // Compute questionId only if videoData and i exist
  const questionId =
    videoResponse?.[0]?.video_id && i ? `${videoResponse[0]["id"]}-${i}` : null;

  // Fetch question data based on questionId
  const { data: questionData, isLoading: isQuestionLoading } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => api.fetchQuestionData(questionId),
    enabled: !!questionId,
    onError: (error) => console.error("Error fetching question data:", error),
  });

  // Disable submit button if required fields are not filled
  const isSubmitDisabled =
    !selectedOption ||
    timeRanges.length === 0 ||
    timeRanges.some((range) => !range.from || !range.to || range.error);

  // Handle form submission
  const handleSubmit = () => {
    if (taskParamId && questionId && selectedOption && timeRanges.length > 0) {
      submit({
        task_id: taskParamId,
        question_id: questionId,
        answer: selectedOption,
        annotator: taskData[0]["annotator"],
      });
    }
  };

  // Loading state for question data
  if (isQuestionLoading) return <div>Loading...</div>;

  return (
    <>
      <TaskBar />
      <section className="w-full h-full flex flex-col md:flex-row items-center justify-center p-10 gap-4">
        <div className="w-full md:w-3/4 rounded-md">
          {videoResponse && (
            <YouTubeEmbed videoid={videoResponse[0].url.split("=")[1] || ""} />
          )}
        </div>
        <div className="flex flex-col p-5 gap-4">
          {/* Display question and options */}
          {questionData && (
            <FieldSet
              question={questionData[0].question || ""}
              options={questionData[0].choices || []}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          )}

          <Divider />

          {/* Record time ranges */}
          <TimeRangeContainer value={timeRanges} onChange={setTimeRanges} />

          {/* Submit button */}
          <Button
            color="primary"
            isDisabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </section>
    </>
  );
}
