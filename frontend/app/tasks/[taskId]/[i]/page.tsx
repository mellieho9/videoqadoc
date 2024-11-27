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
import YouTubeEmbed from "@/components/data/youtubeEmbed";
import { Check } from "lucide-react";
import { TimeRange } from "@/interfaces";

interface Question {
  question: string;
  choices: string[];
}

export default function TaskPage() {
  const params = useParams();
  const { taskId: taskParamId, i } = params;
  const taskId = Array.isArray(taskParamId) ? taskParamId[0] : taskParamId;
  const annotationContext = useContext(AnnotationContext);
  if (!annotationContext) {
    throw new Error(
      "AnnotationContext must be used within a AnnotationProvider"
    );
  }
  const { submit } = annotationContext;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [youtubeVideoId, setYoutubeVideoId] = useState("");

  const { data: taskData } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => {
      if (!taskId) {
        throw new Error("Task ID is required");
      }
      return api.fetchTask(taskId);
    },
    enabled: !!taskId,
  });

  const videoId = taskData?.[0]?.video_id;
  const { data: videoResponse } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => api.fetchVideoData(videoId),
    enabled: !!videoId,
  });

  useEffect(() => {
    if (videoResponse && videoResponse[0]?.url) {
      setYoutubeVideoId(videoResponse[0].url.split("=")[1] || "");
    }
  }, [videoResponse]);

  const questionId =
    videoResponse?.[0]?.video_id && i ? `${videoResponse[0]["id"]}-${i}` : null;

  const { data: questionData, isLoading: isQuestionLoading } = useQuery<
    Question[]
  >({
    queryKey: ["question", questionId],
    queryFn: () => {
      if (!questionId) {
        throw new Error("Question ID cannot be null");
      }
      return api.fetchQuestionData(questionId);
    },
    enabled: !!questionId,
  });

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>([]); 

  // disable submit button
  const isSubmitDisabled =
    !selectedOption ||
    timeRanges.length === 0 ||
    timeRanges.some(
      (range: TimeRange) => !range.from || !range.to || range.error
    );

  const handleSubmit = () => {
    if (taskParamId && questionId && selectedOption && timeRanges.length > 0) {
      setIsSubmitted(false); // Reset submission status on new submission
      submit({
        task_id: taskId,
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
          {youtubeVideoId && <YouTubeEmbed videoId={youtubeVideoId} />}
        </div>
        <div className="flex flex-col p-5 gap-4">
          {questionData?.length ? (
            <FieldSet
              question={questionData[0].question || ""}
              options={questionData[0].choices || []}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          ) : (
            <p>No question available</p>
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
