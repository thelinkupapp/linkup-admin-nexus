
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, Search } from "lucide-react";

interface FilterGroup {
  label: string;
  options: { value: string; label: string }[];
}

interface ActivityFiltersProps {
  activeTab: string;
  selectedFilters: any;
  onFilterChange: (filters: any) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
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
  onSearchChange
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
      
      <Select 
        defaultValue="last-7-days"
        onValueChange={(value) => {
          onFilterChange({
            ...selectedFilters,
            dateRange: value
          });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          {dateRangeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
                      className="flex items-center space-x-2"
                    >
                      <Checkbox 
                        id={`${group.label}-${option.value}`}
                        checked={selectedFilters[activeTab]?.[group.label.toLowerCase()]?.includes(option.value)}
                        onCheckedChange={(checked) => 
                          handleFilterChange(group.label.toLowerCase(), option.value, checked === true)
                        }
                      />
                      <label
                        htmlFor={`${group.label}-${option.value}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
