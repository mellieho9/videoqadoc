const convertTimeToSeconds = (time: string): number => {
  if (!time) return 0;
  const [hours, minutes, seconds] = [time.hour, time.minute, time.second];
  return hours * 3600 + minutes * 60 + seconds;
};

// validate time and whether end time is earlier than start time
export const validateTimeRange = (fromTime: string, toTime: string): string => {
  if (!fromTime || !toTime) return "";

  const fromSeconds = convertTimeToSeconds(fromTime);
  const toSeconds = convertTimeToSeconds(toTime);

  if (fromSeconds >= toSeconds) {
    return "End time must be later than start time";
  }
  return "";
};
