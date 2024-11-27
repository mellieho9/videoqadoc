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
  onChange?: (value: string | undefined) => void;
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

export interface SegmentAnswerProp {
  from: number;
  to: number;
}

export interface SegmentWatchedProp {
  currentTime: number;
  duration: number;
  state: number;
  playbackQuality: string;
  playbackRate: number;
  volume: number;
  timestamp: number;
}

// api functions
export class Annotation {
  id: string;
  question_id: string;
  answer: string;
  time_spent: number;
  segments_answered: SegmentAnswerProp[];
  segments_watched: SegmentWatchedProp[];
  annotator: string;

  constructor({
    id,
    question_id,
    answer,
    time_spent,
    segments_answered,
    segments_watched,
    annotator,
  }: {
    id: string;
    question_id: string;
    answer: string;
    time_spent: number;
    segments_answered: SegmentAnswerProp[];
    segments_watched: SegmentWatchedProp[];
    annotator: string;
  }) {
    this.id = id;
    this.question_id = question_id;
    this.answer = answer;
    this.time_spent = time_spent;
    this.segments_answered = segments_answered;
    this.segments_watched = segments_watched;
    this.annotator = annotator;
  }
}
