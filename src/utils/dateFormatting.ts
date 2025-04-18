
import { format, isToday, isYesterday, isThisWeek, differenceInDays, differenceInYears, startOfWeek } from "date-fns";

// Custom implementation since isLastWeek is not exported from date-fns
function isLastWeek(date: Date): boolean {
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now);
  const diff = differenceInDays(startOfCurrentWeek, date);
  return diff > 0 && diff < 8; // If the date is 1-7 days before the start of current week
}

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
