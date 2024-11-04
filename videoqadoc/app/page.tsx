"use client";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
  Link,
} from "@nextui-org/react";
import { QuestionList } from "@/components/data/questionList";
import HomeBar from "@/components/controller/homebar";
import { Book, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";

export default function Home() {
  // fetch all questions
  const {
    data: questions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: api.fetchQuestions,
  });
  // calculate user's progress
  const totalQuestions = questions.length;
  const completedQuestions = questions
    .flatMap((section) => section) // Flatten the 2D array into a 1D array
    .filter((q) => q.completed).length;
  const progressPercentage =
    totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
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
        <div className="flex flex-col w-full md:w-1/3 gap-4">
          <Card className="p-5">
            <CardHeader className="justify-center font-bold">
              Your progress
            </CardHeader>
            <CardBody className="items-center">
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  value: "text-3xl font-semibold text-white",
                }}
                value={progressPercentage}
                color="primary"
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center">
              <p className="text-sm">
                {completedQuestions} out of {totalQuestions} questions
              </p>
            </CardFooter>
          </Card>
          {/* show links to contact us or guides  */}
          <Card className="p-5">
            <CardHeader className="font-bold justify-center">
              Need help?
            </CardHeader>
            <CardBody>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
                anchorIcon={<Mail className="ml-2" />}
              >
                Our email
              </Link>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
                anchorIcon={<Book className="ml-2" />}
              >
                Annotation Guideline
              </Link>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}
