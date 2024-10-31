"use client";

import React from "react";
import { Navbar, Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HelpPopup } from "../data/helpPopup";
import HomeButton from "./homeButton";
import ProgressDropdown from "./progressDropdown";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

const TaskBar = ({ questionIdx }) => {
  // Fetch questions using TanStack Query
  const {
    data: questions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: api.fetchQuestions,
  });

  // Current question state
  const [currentQuestion, setCurrentQuestion] = React.useState(questionIdx);

  // Progress calculation
  const totalQuestions = questions.length;
  const completedQuestions = questions.filter((q) => q.isDone).length;
  const progressPercentage =
    totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
  const groupedQuestions = questions.reduce(
    (acc, sectionQuestions, outerIndex) => {
      const section = `Section ${outerIndex + 1}`; // Use the outer index as the section name
      acc[section] = sectionQuestions; // Add all questions in the current section
      return acc;
    },
    {}
  );

  console.log(groupedQuestions);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message || "Failed to load questions."}</div>;

  return (
    <Navbar className="px-4" isBordered>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-1">
          <HomeButton />
          <Button
            isIconOnly
            variant="light"
            onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            isIconOnly
            variant="light"
            onClick={() =>
              setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions))
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-small">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <div className="flex items-center">
          <ProgressDropdown
            progressPercentage={progressPercentage}
            groupedQuestions={groupedQuestions}
          />
          <HelpPopup />
        </div>
      </div>
    </Navbar>
  );
};

export default TaskBar;
