"use client";
import { useState, useEffect } from "react";
import {
  Listbox,
  ListboxSection,
  ListboxItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CheckCircle2 } from "lucide-react";

export const QuestionList = ({ questions }) => {
  const [filter, setFilter] = useState("All");
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  useEffect(() => {
    const updatedQuestions = questions.map((section) =>
      section.filter((q) => {
        switch (filter.currentKey) {
          case "Complete":
            console.log(q);
            return q.completed == true;
          case "Incomplete":
            return q.completed == false;
          default:
            return true;
        }
      })
    );
    setFilteredQuestions(updatedQuestions);
  }, [filter, questions]); // Run when `filter` or `questions` change

  return (
    <div>
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
      <Listbox variant="flat">
        {filteredQuestions.map(
          (questionList, index) =>
            questionList.length > 0 && (
              <ListboxSection
                key={`section-${index}`}
                title={`Video ${index + 1}`}
              >
                {questionList.map((q, i) => (
                  <ListboxItem
                    endContent={
                      q.completed ? (
                        <CheckCircle2 className="text-green-500" size={20} />
                      ) : null
                    }
                    key={`question-${index}-${i}`}
                  >
                    Question {i + 1}
                  </ListboxItem>
                ))}
              </ListboxSection>
            )
        )}
      </Listbox>
    </div>
  );
};
