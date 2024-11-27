"use client";

import React, { useContext } from "react";
import { Navbar, Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HelpPopup } from "../data/helpPopup";
import HomeButton from "./homeButton";
import ProgressDropdown from "./progressDropdown";
import PageTimeTracker from "../data/pageTimeTracker";

// navbar in the task interface
const TaskBar = () => {
  // fetch questions
  // const {
  //   questions,
  //   isLoading,
  //   error,
  //   completedQuestions,
  //   progressPercentage,
  //   totalQuestions,
  // } = useContext(QuestionContext);

  // // track idx of question
  // const [currentQuestion, setCurrentQuestion] = React.useState(questionIdx);

  // const groupedQuestions = questions.reduce(
  //   (acc, sectionQuestions, outerIndex) => {
  //     const section = `Section ${outerIndex + 1}`; // use the outer index as the section name
  //     acc[section] = sectionQuestions; // add all questions in the current section
  //     return acc;
  //   },
  //   {}
  // );
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message || "Failed to load questions."}</div>;

  return (
    <Navbar className="px-4" isBordered>
      <div className="flex w-full justify-between items-center">
        {/* home, to previous question, to next question  */}
        <div className="flex items-center gap-1">
          <HomeButton />
          {/* <Button
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
          </Button> */}
        </div>
        {/* where in all the questions user is at  */}
        {/* <span className="text-small">
          Question {currentQuestion} of {totalQuestions}
        </span> */}
        {/* user's progress  */}
        <div className="flex items-center">
          <PageTimeTracker />
          {/* <ProgressDropdown
            progressPercentage={progressPercentage}
            groupedQuestions={groupedQuestions}
          /> */}
          {/* user click on this button to show our contact email and a doc of the task's guidelines  */}
          <HelpPopup />
        </div>
      </div>
    </Navbar>
  );
};

export default TaskBar;
