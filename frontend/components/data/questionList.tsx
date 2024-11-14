"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Listbox,
  ListboxSection,
  ListboxItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CheckCircle2 } from "lucide-react";
import { TaskContext } from "@/config/contexts";

export const QuestionList = () => {
  const { tasks } = useContext(TaskContext);
  console.log(tasks);

  const videos = [];
  const completedQuestions = new Set();

  tasks.forEach((task) => {
    videos.push(task["video_id"]);
    if (task["annotations"]) {
      task["annotations"].forEach((annotation) =>
        completedQuestions.add(annotation["question_id"])
      );
    }
  });

  const router = useRouter();

  const handleQuestionClick = (videoIndex, questionId) => {
    router.push(`/tasks/${videoIndex}/${videoIndex}-${questionId}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-4">
        <div className="flex flex-row w-full items-center justify-between">
          <h3 className="font-bold">Videos you need to annotate</h3>
        </div>
      </div>

      {/* List of questions with completion status */}
      <div className="flex-grow overflow-y-auto max-h-[500px]">
        <Listbox variant="flat">
          {videos.map((video, videoIndex) => (
            <ListboxSection
              key={`video-${videoIndex}`}
              title={`Video ${videoIndex + 1}`}
            >
              {[1, 2, 3].map((i) => (
                <ListboxItem
                  key={`${videoIndex}-${i}`}
                  onClick={() => handleQuestionClick(video, i)}
                  className="cursor-pointer hover:bg-gray-100"
                  endContent={
                    completedQuestions.has(i) ? (
                      <CheckCircle2 className="text-green-500" size={20} />
                    ) : null
                  }
                >
                  Question {i}
                </ListboxItem>
              ))}
            </ListboxSection>
          ))}
        </Listbox>
      </div>
    </div>
  );
};
