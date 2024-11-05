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
import { ProgressDropdownProps } from "@/interfaces";

const ProgressDropdown: React.FC<ProgressDropdownProps> = ({
  progressPercentage,
  groupedQuestions,
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        {/* on the navbar, user will see % of completedness, if they click on it, it will drop down
        a list of questions they had and whether they're complete */}
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
      {/* dropdown menu for question -> whether they're complete  */}
      <DropdownMenu
        disallowEmptySelection
        selectionMode="single"
        aria-label="Questions"
        className="max-h-[300px] overflow-y-auto" 
      >
        {Object.entries(groupedQuestions).map(([section, sectionQuestions]) => (
          <DropdownSection key={section} title={section}>
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
