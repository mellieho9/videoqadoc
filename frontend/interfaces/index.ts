import { ThemeProviderProps } from "next-themes/dist/types";

// frontend components
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

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

// api functions
export class Annotation {
  id: string;
  question_id: string;
  answer: string;
  time_spent: number;
  segments_watched: TimeRange[] | null;
  annotator: string;

  constructor({
    id,
    question_id,
    answer,
    time_spent,
    segments_watched,
    annotator,
  }: {
    id: string;
    question_id: string;
    answer: string;
    time_spent: number;
    segments_watched: TimeRange[] | null;
    annotator: string;
  }) {
    this.id = id;
    this.question_id = question_id;
    this.answer = answer;
    this.time_spent = time_spent;
    this.segments_watched = segments_watched;
    this.annotator = annotator;
  }
}