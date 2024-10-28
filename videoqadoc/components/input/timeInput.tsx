"use client";

import React, { useState } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import { Plus, Trash2 } from "lucide-react";

interface TimeRange {
  id: string;
  from: string;
  to: string;
}

interface TimeInputProps {
  onChange?: (timeRanges: TimeRange[]) => void;
  value?: TimeRange[];
}

export const TimeInput: React.FC<TimeInputProps> = ({ onChange, value }) => {
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>(
    value || [{ id: "1", from: "", to: "" }]
  );

  const handleAddTimeRange = () => {
    const newTimeRange = {
      id: Date.now().toString(),
      from: "",
      to: "",
    };

    const updatedRanges = [...timeRanges, newTimeRange];
    setTimeRanges(updatedRanges);
    onChange?.(updatedRanges);
  };

  const handleRemoveTimeRange = (id: string) => {
    const updatedRanges = timeRanges.filter((range) => range.id !== id);
    setTimeRanges(updatedRanges);
    onChange?.(updatedRanges);
  };

  const validateTimeFormat = (value: string): string => {
    // Remove any non-digit characters
    const digitsOnly = value.replace(/\D/g, "");

    // Ensure we don't exceed 4 digits
    const limitedDigits = digitsOnly.slice(0, 4);

    // Split into minutes and seconds
    let minutes = limitedDigits.slice(0, 2);
    let seconds = limitedDigits.slice(2);

    // Pad with zeros if necessary
    minutes = minutes.padStart(2, "0");
    seconds = seconds.padStart(2, "0");

    // Validate minutes and seconds
    const mins = parseInt(minutes);
    const secs = parseInt(seconds);

    if (mins > 59) minutes = "59";
    if (secs > 59) seconds = "59";

    // Return formatted time
    return `${minutes}:${seconds}`;
  };

  const handleTimeChange = (
    id: string,
    field: "from" | "to",
    value: string
  ) => {
    // Only process if there's input
    if (value) {
      value = validateTimeFormat(value);
    }

    const updatedRanges = timeRanges.map((range) =>
      range.id === id ? { ...range, [field]: value } : range
    );
    setTimeRanges(updatedRanges);
    onChange?.(updatedRanges);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">
        What timepoints help you answer the above question?
      </h3>

      <div className="space-y-4">
        {timeRanges.map((range) => (
          <div key={range.id} className="flex justify-center items-center gap-4">
            <Input
              type="text"
              label="From (mm:ss)"
              placeholder="00:00"
              value={range.from}
              onChange={(e) =>
                handleTimeChange(range.id, "from", e.target.value)
              }
              className="flex-1"
              maxLength={5}
              pattern="[0-5][0-9]:[0-5][0-9]"
            />
            <Input
              type="text"
              label="To (mm:ss)"
              placeholder="00:00"
              value={range.to}
              onChange={(e) => handleTimeChange(range.id, "to", e.target.value)}
              className="flex-1"
              maxLength={5}
              pattern="[0-5][0-9]:[0-5][0-9]"
            />
            {timeRanges.length > 1 && (
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={() => handleRemoveTimeRange(range.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        color="primary"
        variant="light"
        startContent={<Plus className="h-4 w-4" />}
        onClick={handleAddTimeRange}
      >
        Add Time Range
      </Button>
    </div>
  );
};
