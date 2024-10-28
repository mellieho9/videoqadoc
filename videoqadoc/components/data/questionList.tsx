import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import { CheckCircle2 } from "lucide-react";

export const QuestionList = ({ questions }) => {
  return (
    <Listbox variant="flat">
      {questions.map((question, index) => (
        <ListboxSection key={`section-${index}`} title={`Video ${index + 1}`}>
          {question.map((q, i) => (
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
      ))}
    </Listbox>
  );
};
