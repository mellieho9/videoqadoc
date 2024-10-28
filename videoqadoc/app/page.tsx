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

export default function Home() {
  const mockQuestions = [
    [
      { text: "What is the purpose of this course?", completed: true },
      { text: "What are the key concepts covered?", completed: false },
      { text: "How long does the course take to complete?", completed: false },
    ],
    [
      { text: "What is the difference between A and B?", completed: true },
      { text: "How do you implement feature X?", completed: true },
      { text: "What are the best practices for Y?", completed: false },
    ],
    [
      { text: "Explain the algorithm used in this module.", completed: false },
      {
        text: "How do you optimize performance for this use case?",
        completed: false,
      },
      { text: "What are the common pitfalls to avoid?", completed: false },
    ],
  ];

  return (
    <>
      <HomeBar />
      <section className="w-full h-full flex flex-row items-start justify-center gap-4 p-10">
        <div className="w-1/2 ">
          <h3 className="font-bold">Videos you need to annotate</h3>
          <QuestionList questions={mockQuestions} />
        </div>
        <div className="flex flex-col w-1/3 gap-4">
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
                value={45}
                color="primary"
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center">
              <p className="text-sm">2 out of 6 questions</p>
            </CardFooter>
          </Card>
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
    </>
  );
}
