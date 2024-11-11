"use client";
import { QuestionList } from "@/components/data/questionList";
import HomeBar from "@/components/controller/homebar";
import { HomeSidebar } from "@/components/data/homeSidebar";
import { useContext } from "react";
import { QuestionContext } from "@/config/contexts";

export default function Home() {
  const {
    questions,
    isLoading,
    error,
    completedQuestions,
    progressPercentage,
    totalQuestions,
  } = useContext(QuestionContext);
  return (
    <div className="flex flex-col">
      <HomeBar />

      <section className="w-full h-full flex flex-col-reverse md:flex-row items-start justify-center gap-10 p-10">
        {/* show all questions user needs to annotate  */}
        <div className="w-full h-full overflow-y-auto md:w-1/2 ">
          {isLoading ? (
            <div className="">Loading...</div>
          ) : (
            <QuestionList questions={questions} />
          )}
        </div>
        {/* show user's progress  */}
        <HomeSidebar
          progressPercentage={progressPercentage}
          completedQuestions={completedQuestions}
          totalQuestions={totalQuestions}
        />
      </section>
    </div>
  );
}
