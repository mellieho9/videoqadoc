import { useState } from "react";
import { Button, TimeInput } from "@nextui-org/react";
import { Plus, Trash2 } from "lucide-react";

interface TimeRange {
  id: string;
  from: string;
  to: string;
  error?: string;
}

interface TimeRangeContainerProps {
  onChange?: (timeRanges: TimeRange[]) => void;
  value?: TimeRange[];
}

// input for recording timestamps in a vid helping user answer a question
export const TimeRangeContainer: React.FC<TimeRangeContainerProps> = ({
  onChange,
  value,
}) => {
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>(
    value || [{ id: "1", from: "", to: "", error: "" }]
  );

  const convertTimeToSeconds = (time: string): number => {
    if (!time) return 0;
    const [hours, minutes, seconds] = [time.hour, time.minute, time.second];
    return hours * 3600 + minutes * 60 + seconds;
  };

  // validate time and whether end time is earlier than start time
  const validateTimeRange = (fromTime: string, toTime: string): string => {
    if (!fromTime || !toTime) return "";

    const fromSeconds = convertTimeToSeconds(fromTime);
    const toSeconds = convertTimeToSeconds(toTime);

    if (fromSeconds >= toSeconds) {
      return "End time must be later than start time";
    }
    return "";
  };

  const handleTimeChange = (
    id: string,
    field: "from" | "to",
    value: string
  ) => {
    const updatedRanges = timeRanges.map((range) => {
      if (range.id === id) {
        const updatedRange = {
          ...range,
          [field]: value,
        };

        if (updatedRange.from && updatedRange.to) {
          updatedRange.error = validateTimeRange(
            updatedRange.from,
            updatedRange.to
          );
        } else {
          updatedRange.error = "";
        }

        return updatedRange;
      }
      return range;
    });

    setTimeRanges(updatedRanges);
    onChange?.(updatedRanges);
  };

  const handleAddTimeRange = () => {
    const newTimeRange = {
      id: Date.now().toString(),
      from: "",
      to: "",
      error: "",
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

  return (
    <div className="space-y-4">
      <h3 className="font-medium">
        What timepoints help you answer the above question?
      </h3>

      <div className="space-y-4">
        {timeRanges.map((range) => (
          <div key={range.id} className="space-y-2">
            <div className="flex flex-col justify-start items-start gap-2">
              <h3 className="text-red text-xs font-medium">{range.error}</h3>
              <div className="flex w-full flex-row items-center gap-4">
                <TimeInput
                  label="From (HH:mm:ss)"
                  hourCycle={24}
                  granularity="second"
                  value={range.from}
                  onChange={(value) =>
                    handleTimeChange(range.id, "from", value)
                  }
                  isInvalid={!!range.error}
                />
                <TimeInput
                  label="To (HH:mm:ss)"
                  hourCycle={24}
                  granularity="second"
                  value={range.to}
                  onChange={(value) => handleTimeChange(range.id, "to", value)}
                  isInvalid={!!range.error}
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
            </div>
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

export default TimeRangeContainer;
