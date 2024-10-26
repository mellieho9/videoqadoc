import React from "react";
import { Radio, RadioGroup } from "@nextui-org/radio";

interface FieldSetProps {
  question: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

export const FieldSet: React.FC<FieldSetProps> = ({
  question,
  options,
  value,
  onChange,
  name = "radio-group",
}) => {
  return (
    <div className="w-full max-w-md">
      <p className="text-lg font-medium mb-2">{question}</p>
      <RadioGroup
        name={name}
        value={value}
        onValueChange={onChange}
        className="gap-3"
      >
        {options.map((option, index) => (
          <Radio
            key={`${option}-${index}`}
            value={option}
            className="max-w-full"
          >
            {option}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};
