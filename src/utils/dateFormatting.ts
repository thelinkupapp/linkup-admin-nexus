import { format, isToday, isYesterday, isThisWeek, differenceInDays, differenceInYears, startOfWeek, differenceInHours, differenceInMinutes, isThisYear } from "date-fns";

function isLastWeek(date: Date): boolean {
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now);
  const diff = differenceInDays(startOfCurrentWeek, date);
  return diff > 0 && diff < 8; // If the date is 1-7 days before the start of current week
}

export function formatLinkupDateTime(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate duration in hours
  const hoursDiff = differenceInHours(end, start);
  
  // Format time without seconds
  const timeStr = format(start, "MMM d, yyyy, h:mm a");
  
  // Format duration
  return `${format(start, "MMM d, yyyy, h:mm a")} (${hoursDiff}hr)`;
}

export function formatCompactLinkupDateTime(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate duration in hours
  const hoursDiff = differenceInHours(end, start);
  
  return `${format(start, "MMM d, yyyy, h:mm a")} (${hoursDiff}hr)`;
}

export function formatCreatedDate(date: string | Date): string {
  const createdDate = new Date(date);
  
  if (isToday(createdDate)) {
    return 'Today at ' + format(createdDate, 'HH:mm');
  }
  
  if (isYesterday(createdDate)) {
    return 'Yesterday at ' + format(createdDate, 'HH:mm');
  }
  
  if (isThisYear(createdDate)) {
    return format(createdDate, 'EEE d') + ' at ' + format(createdDate, 'HH:mm');
  }
  
  return format(createdDate, 'MMM d, yyyy, h:mm a');
}

export function formatJoinDate(date: string | Date): string {
  // This can be implemented similarly to formatCreatedDate if needed
  return formatCreatedDate(date);
}
