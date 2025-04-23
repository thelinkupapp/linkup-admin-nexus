
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ActivityFilters as ActivityFiltersType, DateRangeFilter } from "@/types/activityFilters";

interface ActivityFiltersProps {
  activeTab: string;
  selectedFilters: ActivityFiltersType;
  onFilterChange: (filters: ActivityFiltersType) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange) => void;
}

const dateRangeOptions = [
  { value: 'last-7-days', label: 'Last 7 days' },
  { value: 'this-month', label: 'This month' },
  { value: 'last-month', label: 'Last month' },
  { value: 'custom', label: 'Custom range' }
];

export function ActivityFilters({ 
  activeTab, 
  selectedFilters, 
  onFilterChange,
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange
}: ActivityFiltersProps) {

  // Handle date range selection
  const handleDateRangeSelection = (value: DateRangeFilter) => {
    onFilterChange({
      ...selectedFilters,
      dateRange: value
    });
  };

  const getDateRangeLabel = () => {
    if (selectedFilters.dateRange !== 'custom' || !dateRange?.from || !dateRange?.to) {
      return dateRangeOptions.find(option => option.value === selectedFilters.dateRange)?.label || 'Select date range';
    }
    return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`;
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search linkups or people..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 min-w-[180px]">
            <Calendar className="h-4 w-4" />
            {getDateRangeLabel()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="end">
          <div className="space-y-4">
            <div className="grid gap-2">
              {dateRangeOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <label
                    className={cn(
                      "text-sm w-full px-2 py-1 rounded cursor-pointer transition-colors",
                      selectedFilters.dateRange === option.value
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                    onClick={() => {
                      handleDateRangeSelection(option.value as DateRangeFilter);
                      if (option.value !== 'custom') {
                        onDateRangeChange?.({ from: undefined, to: undefined });
                      }
                    }}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            
            {selectedFilters.dateRange === 'custom' && (
              <div className="pt-4">
                <CalendarComponent
                  mode="range"
                  selected={dateRange}
                  onSelect={onDateRangeChange}
                  numberOfMonths={2}
                  className={cn("p-3 pointer-events-auto")}
                />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
