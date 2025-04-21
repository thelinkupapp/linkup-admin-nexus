
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, Search, Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ActivityFilters as ActivityFiltersType, DateRangeFilter } from "@/types/activityFilters";

interface FilterGroup {
  label: string;
  options: { value: string; label: string }[];
}

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

const filterGroups: Record<string, FilterGroup[]> = {
  participation: [
    {
      label: 'Type',
      options: [
        { value: 'joined', label: 'Joined' },
        { value: 'left_removed', label: 'Left / Removed' },
        { value: 'requested', label: 'Requested' },
        { value: 'accepted_declined', label: 'Accepted / Declined' }
      ]
    },
    {
      label: 'Involvement',
      options: [
        { value: 'host', label: 'Host' },
        { value: 'attendee', label: 'Attendee' }
      ]
    }
  ],
  invites: [
    {
      label: 'Type',
      options: [
        { value: 'invite_join', label: 'Invite to Join' },
        { value: 'invite_cohost', label: 'Invite to Co-Host' }
      ]
    },
    {
      label: 'Status',
      options: [
        { value: 'sent', label: 'Sent' },
        { value: 'received', label: 'Received' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'declined', label: 'Declined' }
      ]
    },
    {
      label: 'Role',
      options: [
        { value: 'host', label: 'Host' },
        { value: 'cohost', label: 'Co-host' }
      ]
    }
  ],
  edits: [
    {
      label: 'Change Type',
      options: [
        { value: 'location', label: 'Location Changed' },
        { value: 'datetime', label: 'Date/Time Changed' },
        { value: 'other', label: 'Other Updates' }
      ]
    }
  ],
  cancellations: [
    {
      label: 'Action',
      options: [
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'deleted', label: 'Deleted' }
      ]
    },
    {
      label: 'Who Did It',
      options: [
        { value: 'me', label: 'Me' },
        { value: 'others', label: 'Others' }
      ]
    }
  ]
};

export function ActivityFilters({ 
  activeTab, 
  selectedFilters, 
  onFilterChange,
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange
}: ActivityFiltersProps) {
  const currentFilters = filterGroups[activeTab] || [];

  const handleFilterChange = (group: string, value: string, checked: boolean) => {
    const newFilters = { ...selectedFilters };
    const currentGroup = newFilters[activeTab]?.[group] || [];
    
    if (checked) {
      newFilters[activeTab] = {
        ...newFilters[activeTab],
        [group]: [...currentGroup, value]
      };
    } else {
      newFilters[activeTab] = {
        ...newFilters[activeTab],
        [group]: currentGroup.filter((item: string) => item !== value)
      };
    }
    
    onFilterChange(newFilters);
  };

  // Handle date range selection
  const handleDateRangeSelection = (value: DateRangeFilter) => {
    onFilterChange({
      ...selectedFilters,
      dateRange: value
    });
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
            {selectedFilters.dateRange === 'custom' && dateRange?.from && dateRange?.to ? (
              <span className="truncate">
                {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
              </span>
            ) : (
              <span>
                {dateRangeOptions.find(option => option.value === selectedFilters.dateRange)?.label || 'Select date range'}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="end">
          <div className="space-y-4">
            <div className="grid gap-2">
              {dateRangeOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <Checkbox 
                    id={`date-range-${option.value}`}
                    checked={selectedFilters.dateRange === option.value}
                    onCheckedChange={() => handleDateRangeSelection(option.value as DateRangeFilter)}
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                  />
                  <label
                    htmlFor={`date-range-${option.value}`}
                    className="text-sm cursor-pointer w-full hover:text-primary transition-colors"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            
            {selectedFilters.dateRange === 'custom' && (
              <div className="pt-4">
                <Separator className="mb-4" />
                <div className="grid gap-2">
                  <CalendarComponent
                    mode="range"
                    selected={dateRange}
                    onSelect={onDateRangeChange}
                    numberOfMonths={2}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-4" align="end">
          <div className="space-y-4">
            {currentFilters.map((group, groupIndex) => (
              <div key={group.label}>
                {groupIndex > 0 && <Separator className="my-4" />}
                <Label className="text-sm font-medium mb-2">{group.label}</Label>
                <div className="space-y-2 mt-2">
                  {group.options.map((option) => (
                    <div 
                      key={option.value}
                      className="flex items-center space-x-2 p-1 rounded hover:bg-slate-50 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        const isCurrentlyChecked = selectedFilters[activeTab]?.[group.label.toLowerCase()]?.includes(option.value) || false;
                        handleFilterChange(group.label.toLowerCase(), option.value, !isCurrentlyChecked);
                      }}
                    >
                      <Checkbox 
                        id={`${group.label}-${option.value}`}
                        checked={selectedFilters[activeTab]?.[group.label.toLowerCase()]?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          handleFilterChange(group.label.toLowerCase(), option.value, checked === true);
                        }}
                        className="cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <label
                        htmlFor={`${group.label}-${option.value}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
