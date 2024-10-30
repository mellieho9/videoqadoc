"use client";
import { useState } from "react";
import TaskBar from "@/components/controller/taskBar";
import { FieldSet } from "@/components/input/fieldSet";
import TimeRangeContainer from "@/components/input/timeRangeContainer";
import { Button, Divider } from "@nextui-org/react";
import { YouTubeEmbed } from "@next/third-parties/google";

export default function Page() {
  const options = ["option 1", "option 2", "option 3", "option 4"];

  // State to track values for FieldSet and TimeRangeContainer
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [timeRanges, setTimeRanges] = useState([]);

  // Check if all required inputs are filled
  const isSubmitDisabled =
    !selectedOption ||
    timeRanges.length === 0 ||
    timeRanges.some((range) => !range.from || !range.to || range.error);

  return (
    <>
      {/* navbar */}
      <TaskBar />
      <section className="w-full h-full flex flex-col md:flex-row items-center justify-center p-10 gap-4">
        {/* video feed */}
        <div className="w-full md:w-3/4rounded-md">
          <YouTubeEmbed videoid="yptflB597IQ" />
        </div>

        <div className="flex flex-col p-5 gap-4">
          {/* question and options */}
          <FieldSet
            question={"question1"}
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
          />

          <Divider />

          {/* timestamp */}
          <TimeRangeContainer value={timeRanges} onChange={setTimeRanges} />

          {/* submit button */}
          <Button color="primary" isDisabled={isSubmitDisabled}>
            Submit
          </Button>
        </div>
      </section>
    </>
  );
}
