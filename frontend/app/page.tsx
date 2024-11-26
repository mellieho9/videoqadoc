"use client";
import { QuestionList } from "@/components/data/questionList";
import HomeBar from "@/components/controller/homebar";
import { HomeSidebar } from "@/components/data/homeSidebar";
import { useContext } from "react";
import { TaskContext } from "@/config/contexts";

export default function Home() {
  const { isLoading, completedTasks, progressPercentage, totalTasks } =
    useContext(TaskContext);
  return (
    <div className="flex flex-col">
      <HomeBar />

      <section className="w-full h-full flex flex-col-reverse md:flex-row items-start justify-center gap-10 p-10">
        {/* show all questions user needs to annotate  */}
        <div className="w-full h-full overflow-y-auto md:w-1/2 ">
          {isLoading ? <div className="">Loading...</div> : <QuestionList />}
        </div>
        {/* show user's progress  */}
        <HomeSidebar
          progressPercentage={progressPercentage}
          completedTasks={completedTasks}
          totalTasks={totalTasks}
        />
      </section>
    </div>
  );
}
