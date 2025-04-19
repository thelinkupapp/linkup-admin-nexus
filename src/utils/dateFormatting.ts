import { format, isToday, isYesterday, isThisWeek, differenceInDays, differenceInYears, startOfWeek, differenceInHours, differenceInMinutes } from "date-fns";

function isLastWeek(date: Date): boolean {
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now);
  const diff = differenceInDays(startOfCurrentWeek, date);
  return diff > 0 && diff < 8; // If the date is 1-7 days before the start of current week
}

export function formatJoinDate(date: string | Date): string {
  // Ensure we're working with a valid date
  const joinDate = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const time = format(joinDate, 'HH:mm'); // 24-hour clock format

  if (isToday(joinDate)) {
    return `Today at ${time}`;
  }

  if (isYesterday(joinDate)) {
    return `Yesterday at ${time}`;
  }

  if (isThisWeek(joinDate)) {
    return `${format(joinDate, 'EEEE')} at ${time}`; // Returns full day name like "Monday"
  }

  if (isLastWeek(joinDate)) {
    return `${format(joinDate, 'EEE d')} at ${time}`; // Returns abbreviated day name + date like "Wed 15"
  }

  if (differenceInYears(now, joinDate) > 0) {
    return `${format(joinDate, 'MMM d yyyy')} at ${time}`; // Returns full date with year like "Mar 21 2024"
  }

  return `${format(joinDate, 'MMM d')} at ${time}`; // Returns month and day like "Mar 21"
}

export function formatLinkupDateTime(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Format the times
  const startTime = format(start, 'HH:mm');
  const endTime = format(end, 'HH:mm');
  
  // Calculate duration
  const hoursDiff = differenceInHours(end, start);
  const minutesDiff = differenceInMinutes(end, start);
  const daysDiff = differenceInDays(end, start);
  
  // Format duration string
  let duration;
  if (daysDiff > 0) {
    duration = `${daysDiff}d`;
  } else {
    duration = `${hoursDiff}hr`;
  }
  
  // Format the date part
  let dateStr;
  if (isToday(start)) {
    dateStr = 'Today';
  } else if (isYesterday(start)) {
    dateStr = 'Tomorrow';
  } else if (isThisWeek(start)) {
    dateStr = format(start, 'EEEE'); // Full day name
  } else if (differenceInYears(new Date(), start) > 0) {
    dateStr = format(start, 'EEEE d MMMM'); // e.g. "Thursday 1 August"
  } else {
    dateStr = format(start, 'EEEE d MMMM');
  }
  
  // Format time range
  let timeRange;
  if (daysDiff > 0) {
    timeRange = `${startTime} - ${format(end, 'd MMM')}, ${endTime}`;
  } else {
    timeRange = `${startTime} - ${endTime}`;
  }
  
  return `${dateStr}\n${timeRange} (${duration})`;
}
