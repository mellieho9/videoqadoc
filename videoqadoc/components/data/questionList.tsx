"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Listbox,
  ListboxSection,
  ListboxItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CheckCircle2 } from "lucide-react";

export const QuestionList = ({ questions }) => {
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  useEffect(() => {
    if (!questions.length) return;

    const updatedQuestions = questions.map((section) =>
      section.filter((q) => {
        switch (filter.currentKey) {
          case "Complete":
            return q.completed === true;
          case "Incomplete":
            return q.completed === false;
          default:
            return true;
        }
      })
    );
    setFilteredQuestions(updatedQuestions);
  }, [filter, questions]);

  const handleQuestionClick = (videoIndex, questionIndex, questionId) => {
    router.push(`/tasks/${videoIndex}/${questionId}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-4">
        <div className="flex flex-row w-full items-center justify-between">
          <h3 className="font-bold">Videos you need to annotate</h3>
          <Select
            placeholder="Select filter"
            selectedKeys={filter}
            onSelectionChange={(key) => setFilter(key)}
            className="w-1/3 md:w-1/5"
          >
            <SelectItem key="All">All</SelectItem>
            <SelectItem key="Complete">Complete</SelectItem>
            <SelectItem key="Incomplete">Incomplete</SelectItem>
          </Select>
        </div>
      </div>

      {/* Scrollable Listbox container */}
      <div className="flex-grow overflow-y-auto max-h-[500px]">
        <Listbox variant="flat">
          {filteredQuestions.map(
            (questionList, videoIndex) =>
              questionList.length > 0 && (
                <ListboxSection
                  key={`section-${videoIndex}`}
                  title={`Video ${videoIndex + 1}`}
                >
                  {questionList.map((q, questionIndex) => (
                    <ListboxItem
                      key={`question-${videoIndex}-${questionIndex}`}
                      onClick={() =>
                        handleQuestionClick(videoIndex, questionIndex, q.id)
                      }
                      className="cursor-pointer hover:bg-gray-100"
                      endContent={
                        q.completed ? (
                          <CheckCircle2 className="text-green-500" size={20} />
                        ) : null
                      }
                    >
                      Question {questionIndex + 1}
                    </ListboxItem>
                  ))}
                </ListboxSection>
              )
          )}
        </Listbox>
      </div>
    </div>
  );
};
