"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import { CheckCircle2 } from "lucide-react";
import { TaskContext } from "@/contexts/task";
import { AnnotationContext } from "@/contexts/annotation";

export const QuestionList = () => {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error("TaskContext needs to be used in TaskProvider");
  }
  const { tasks } = taskContext;
  const annotationContext = useContext(AnnotationContext);
  if (!annotationContext) {
    throw new Error("AnnotationContext needs to be used in AnnotationProvider");
  }
  const { completedQuestions } = annotationContext;
  const completedQuestionsSet = new Set(completedQuestions);

  const router = useRouter();

  const handleQuestionClick = (taskId: string, i: number) => {
    router.push(`/tasks/${taskId}/${i}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-4">
        <div className="flex flex-row w-full items-center justify-between">
          <h3 className="font-bold">Videos you need to annotate</h3>
        </div>
      </div>

      {/* List of questions with completion status */}
      <div className="flex-grow overflow-y-auto max-h-[500px]">
        <Listbox variant="flat">
          {tasks.map((task, idx) => (
            <ListboxSection key={idx} title={`Video ${idx + 1}`}>
              {[1, 2, 3].map((i) => (
                <ListboxItem
                  key={`${idx}-${i}`}
                  onClick={() => handleQuestionClick(task["id"], i)}
                  className="cursor-pointer hover:bg-gray-100"
                  endContent={
                    completedQuestionsSet.has(`${task.video_id}-${i}`) ? (
                      <CheckCircle2 className="text-green-500" size={20} />
                    ) : null
                  }
                >
                  Question {i}
                </ListboxItem>
              ))}
            </ListboxSection>
          ))}
        </Listbox>
      </div>
    </div>
  );
};
