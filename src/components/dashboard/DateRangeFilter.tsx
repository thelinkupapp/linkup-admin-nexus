
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface DateRange {
  from?: Date;
  to?: Date;
}

interface DateRangeFilterProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  dateRange,
  setDateRange,
}) => {
  const label =
    dateRange.from && dateRange.to
      ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(
          dateRange.to,
          "MMM d, yyyy"
        )}`
      : dateRange.from
        ? `${format(dateRange.from, "MMM d, yyyy")}`
        : "Pick a date range";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("min-w-[160px] flex justify-between items-center text-left font-normal", !dateRange.from && "text-muted-foreground")}
        >
          <span>
            <CalendarIcon className="inline mr-2 h-4 w-4" />
            {label}
          </span>
          {(dateRange.from || dateRange.to) && (
            <button
              className="ml-3 text-xs px-2 py-0.5 bg-gray-100 rounded hover:bg-gray-200 transition"
              type="button"
              onClick={e => {
                e.stopPropagation();
                setDateRange({});
              }}
            >
              Clear
            </button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4">
          <p className="mb-2 text-sm font-semibold text-muted-foreground">Date Range</p>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            className={cn("p-3 pointer-events-auto")}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
