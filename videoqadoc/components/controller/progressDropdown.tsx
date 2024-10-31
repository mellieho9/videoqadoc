import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Progress,
} from "@nextui-org/react";
import { CheckCircle2 } from "lucide-react";

interface Question {
  id: string;
  completed: boolean;
}

interface GroupedQuestions {
  [section: string]: Question[];
}

interface ProgressDropdownProps {
  progressPercentage: number;
  groupedQuestions: GroupedQuestions;
}

const ProgressDropdown: React.FC<ProgressDropdownProps> = ({
  progressPercentage,
  groupedQuestions,
}) => {
  console.log(groupedQuestions);
  return (
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
        {Object.entries(groupedQuestions).map(([section, sectionQuestions]) => (
          <DropdownSection key={section} showDivider title={section}>
            {sectionQuestions.map((question) => (
              <DropdownItem
                key={question.id}
                endContent={
                  question.completed && (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  )
                }
              >
                {question.id}
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProgressDropdown;
