"use client";
import NavigationBar from "@/components/controller/navbar";
import { FieldSet } from "@/components/input/fieldSet";
import { TimeInput } from "@/components/input/timeInput";
import { Button, Divider } from "@nextui-org/react";

export default function Page() {
  const options = ["option 1", "option 2", "option 3", "option 4"];
  return (
    <>
      {/* navbar  */}
      <NavigationBar />
      <section className="w-full h-full flex flex-row items-center justify-center p-10 gap-4">
        {/* video feed */}
        <div className="w-3/4 h-full bg-slate-700 p-5 rounded-md">
          <div className="w-full h-full rounded-md flex items-center justify-center">
            <span className="text-white">Video Player Placeholder</span>
          </div>
        </div>
        <div className="flex flex-col p-5 gap-4">
          {/* question and option */}
          <FieldSet question={"question1"} options={options} />
          <Divider />
          {/* timestamp  */}
          <TimeInput />
          {/* asubmit button  */}
          <Button color="primary">Submit</Button>
        </div>
      </section>
    </>
  );
}
