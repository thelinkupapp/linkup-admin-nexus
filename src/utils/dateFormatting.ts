
import { format, isToday, isYesterday, isThisWeek, isLastWeek, differenceInYears } from "date-fns";

export function formatJoinDate(date: string | Date): string {
  const joinDate = new Date(date);
  const now = new Date();
  const time = format(joinDate, 'h:mm a');

  if (isToday(joinDate)) {
    return `Today at ${time}`;
  }

  if (isYesterday(joinDate)) {
    return `Yesterday at ${time}`;
  }

  if (isThisWeek(joinDate)) {
    return `${format(joinDate, 'EEEE')} at ${time}`;
  }

  if (isLastWeek(joinDate)) {
    return `${format(joinDate, 'EEE d')} at ${time}`;
  }

  if (differenceInYears(now, joinDate) > 0) {
    return `${format(joinDate, 'MMM d yyyy')} at ${time}`;
  }

  return `${format(joinDate, 'MMM d')} at ${time}`;
}
