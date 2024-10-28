"use client";

import React from "react";
import {
  Navbar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Progress,
} from "@nextui-org/react";
import { Home, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { HelpPopup } from "../data/helpPopup";

const NavigationBar = () => {
  // Sample questions data - replace with your actual questions
  const questions = [
    { id: 1, title: "Question 1", section: "video 1", isDone: true },
    { id: 2, title: "Question 2", section: "video 1", isDone: false },
    { id: 3, title: "Question 3", section: "video 2", isDone: true },
    { id: 4, title: "Question 4", section: "video 2", isDone: false },
  ];

  // Calculate progress
  const currentQuestion = 2; // Replace with your actual current question number
  const totalQuestions = questions.length;
  const completedQuestions = questions.filter((q) => q.isDone).length;
  const progressPercentage = (completedQuestions / totalQuestions) * 100;

  // Group questions by section
  const groupedQuestions = questions.reduce((acc, question) => {
    const section = question.section || "Other";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(question);
    return acc;
  }, {});

  return (
    <Navbar className="px-4" isBordered>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-1">
          <Button isIconOnly variant="light">
            <Home className="h-4 w-4" />
          </Button>
          <Button isIconOnly variant="light">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button isIconOnly variant="light">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-small">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <div className="flex items-center">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="min-w-[140px]">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-small">Progress</span>
                    <span className="text-small">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <Progress
                    size="sm"
                    value={progressPercentage}
                    color="primary"
                    className="max-w-md"
                  />
                </div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectionMode="single"
              aria-label="Questions"
            >
              {Object.entries(groupedQuestions).map(
                ([section, sectionQuestions]) => (
                  <DropdownSection key={section} showDivider title={section}>
                    {sectionQuestions.map((question) => (
                      <DropdownItem
                        key={question.id}
                        endContent={
                          question.isDone && (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          )
                        }
                      >
                        {question.title}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                )
              )}
            </DropdownMenu>
          </Dropdown>
          <HelpPopup />
        </div>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
