"use client";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import TaskBar from "@/components/controller/taskBar";
import { FieldSet } from "@/components/input/fieldSet";
import TimeRangeContainer from "@/components/input/timeRangeContainer";
import { Button, Divider } from "@nextui-org/react";
import { api } from "@/utils/api";
import { prepareTimeJson } from "@/utils/time";
import { AnnotationContext } from "@/contexts/annotation";
import { CustomYouTubeEmbed } from "@/components/data/youtubeEmbed";
import { Check } from "lucide-react";

export default function TaskPage() {
  const params = useParams();
  const { taskId: taskParamId, i } = params;
  const { submit, mutation } = useContext(AnnotationContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [selectedOption, setSelectedOption] = useState();
  const [timeRanges, setTimeRanges] = useState([]);
  const [youtubeVideoId, setYoutubeVideoId] = useState("");

  const { data: taskData } = useQuery({
    queryKey: ["task", taskParamId],
    queryFn: () => api.fetchTask(taskParamId),
    enabled: !!taskParamId,
    onError: (error) => console.error("Error fetching task data:", error),
  });

  const videoId = taskData?.[0]?.video_id;
  const { data: videoResponse } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => api.fetchVideoData(videoId),
    enabled: !!videoId,
    onError: (error) => console.error("Error fetching video data:", error),
  });

  useEffect(() => {
    if (videoResponse && videoResponse[0]?.url) {
      setYoutubeVideoId(videoResponse[0].url.split("=")[1] || "");
    }
  }, [videoResponse]);

  const questionId =
    videoResponse?.[0]?.video_id && i ? `${videoResponse[0]["id"]}-${i}` : null;

  const { data: questionData, isLoading: isQuestionLoading } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => api.fetchQuestionData(questionId),
    enabled: !!questionId,
    onError: (error) => console.error("Error fetching question data:", error),
  });

  // disable submit button
  const isSubmitDisabled =
    !selectedOption ||
    timeRanges.length === 0 ||
    timeRanges.some((range) => !range.from || !range.to || range.error);

  const handleSubmit = () => {
    if (taskParamId && questionId && selectedOption && timeRanges.length > 0) {
      setIsSubmitted(false); // Reset submission status on new submission
      submit({
        task_id: taskParamId,
        question_id: questionId,
        answer: selectedOption,
        segments_answered: prepareTimeJson(timeRanges),
        annotator: taskData[0]["annotator"],
      });

      // Listen for mutation success and update the button
      setIsSubmitted(true);
    }
  };

  if (isQuestionLoading) return <div>Loading...</div>;

  return (
    <>
      <TaskBar />
      <section className="w-full h-full flex flex-col md:flex-row items-center justify-center p-10 gap-4">
        <div className="w-full md:w-3/4 rounded-md">
          {youtubeVideoId && <CustomYouTubeEmbed videoId={youtubeVideoId} />}
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
            onPress={handleSubmit}
            isDisabled={isSubmitDisabled || isSubmitted}
            color={isSubmitted ? "success" : "primary"}
          >
            {isSubmitted && <Check />}
            {isSubmitted ? "Submitted Successfully!" : "Submit"}
          </Button>
        </div>
      </section>
    </>
  );
}
