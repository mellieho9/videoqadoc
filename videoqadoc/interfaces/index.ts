export interface TimeRange {
  id: string;
  from: string;
  to: string;
  error?: string;
}

export interface TimeRangeContainerProps {
  onChange?: (timeRanges: TimeRange[]) => void;
  value?: TimeRange[];
}

export interface FieldSetProps {
  question: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

export interface Question {
  id: string;
  completed: boolean;
}

export interface GroupedQuestions {
  [section: string]: Question[];
}

export interface ProgressDropdownProps {
  progressPercentage: number;
  groupedQuestions: GroupedQuestions;
}
