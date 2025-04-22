import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

interface LinkupFiltersProps {
  layout?: "inline" | "stacked";
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedVisibility: string;
  setSelectedVisibility: (value: string) => void;
  selectedPrice: string;
  setSelectedPrice: (value: string) => void;
  selectedJoinMethod: string;
  setSelectedJoinMethod: (value: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (value: DateRange | undefined) => void;
  filteredCount: number;
  totalCount: number;
}

export function LinkupFilters({
  layout = "inline",
  searchValue,
  setSearchValue,
  selectedCategories,
  setSelectedCategories,
  selectedStatus,
  setSelectedStatus,
  selectedVisibility,
  setSelectedVisibility,
  selectedPrice,
  setSelectedPrice,
  selectedJoinMethod,
  setSelectedJoinMethod,
  dateRange,
  setDateRange,
  filteredCount,
  totalCount,
}: LinkupFiltersProps) {
  const toggleArrayValue = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter((item) => item !== value)
      : [...array, value];
  };

  const categories = [
    { id: "drinks", name: "Drinks", emoji: "🍸" },
    { id: "food", name: "Food", emoji: "🍔" },
    { id: "music", name: "Music", emoji: "🎵" },
    { id: "adventure", name: "Adventure", emoji: "🏃" },
    { id: "outdoors", name: "Outdoors", emoji: "🌲" },
    { id: "wellness", name: "Wellness", emoji: "🧘" },
    { id: "art-culture", name: "Art & Culture", emoji: "🎨" },
    { id: "movies-tv", name: "Movies & TV", emoji: "🎬" },
    { id: "shopping", name: "Shopping", emoji: "🛍️" },
    { id: "co-working", name: "Co-Working", emoji: "💼" },
    { id: "learning", name: "Learning", emoji: "📚" },
    { id: "nightlife", name: "Nightlife", emoji: "🌙" },
    { id: "coffee-chats", name: "Coffee & Chats", emoji: "☕" },
    { id: "travel", name: "Travel & Exploration", emoji: "✈️" },
    { id: "fitness", name: "Fitness", emoji: "🏆" },
    { id: "networking", name: "Networking", emoji: "💼" },
    { id: "content-creation", name: "Content Creation", emoji: "🎥" },
    { id: "tech", name: "Tech", emoji: "💻" },
    { id: "deep-talks", name: "Deep Talks", emoji: "🧠" },
    { id: "other", name: "Other", emoji: "🎯" }
  ];

  const statusOptions = [
    { value: "upcoming", label: "Upcoming" },
    { value: "happening", label: "Happening" },
    { value: "happened", label: "Happened" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const hasActiveFilters = selectedCategories.length > 0 || 
    selectedStatus !== "" || 
    selectedVisibility !== "" || 
    selectedPrice !== "" || 
    selectedJoinMethod !== "" || 
    (dateRange?.from !== undefined) ||
    searchValue !== "";

  const handleStatusChange = (value: string) => {
    if (value === "all") {
      setSelectedStatus("");
    } else {
      setSelectedStatus(value);
    }
  };

  const handleVisibilityChange = (value: string) => {
    if (value === "all") {
      setSelectedVisibility("");
    } else {
      setSelectedVisibility(value);
    }
  };

  const handlePriceChange = (value: string) => {
    if (value === "all") {
      setSelectedPrice("");
    } else {
      setSelectedPrice(value);
    }
  };

  const handleJoinMethodChange = (value: string) => {
    if (value === "all") {
      setSelectedJoinMethod("");
    } else {
      setSelectedJoinMethod(value);
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-7 h-9 w-[180px] text-sm"
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-9 text-xs px-3 font-medium">
            Category ({selectedCategories.length})
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0 z-[100]">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <ScrollArea className="h-60">
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => {
                      setSelectedCategories(
                        toggleArrayValue(selectedCategories, category.id)
                      );
                    }}
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="mr-2">{category.emoji}</span>
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-9 text-xs px-3 font-medium">
            Date Range
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-[100]" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      
      <Select value={selectedStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="h-9 text-xs w-24">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="z-[100]">
          <SelectItem value="all" className="text-xs">
            All Status
          </SelectItem>
          {statusOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-xs"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={selectedVisibility} onValueChange={handleVisibilityChange}>
        <SelectTrigger className="h-9 text-xs w-24">
          <SelectValue placeholder="Visibility" />
        </SelectTrigger>
        <SelectContent className="z-[100]">
          <SelectItem value="all" className="text-xs">
            All Visibility
          </SelectItem>
          <SelectItem value="public" className="text-xs">
            Public
          </SelectItem>
          <SelectItem value="private" className="text-xs">
            Private
          </SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={selectedPrice} onValueChange={handlePriceChange}>
        <SelectTrigger className="h-9 text-xs w-24">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent className="z-[100]">
          <SelectItem value="all" className="text-xs">
            All Prices
          </SelectItem>
          <SelectItem value="free" className="text-xs">
            Free
          </SelectItem>
          <SelectItem value="paid" className="text-xs">
            Paid
          </SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={selectedJoinMethod} onValueChange={handleJoinMethodChange}>
        <SelectTrigger className="h-9 text-xs w-24">
          <SelectValue placeholder="Join Method" />
        </SelectTrigger>
        <SelectContent className="z-[100]">
          <SelectItem value="all" className="text-xs">
            All Join Methods
          </SelectItem>
          <SelectItem value="open" className="text-xs">
            Open
          </SelectItem>
          <SelectItem value="closed" className="text-xs">
            Closed
          </SelectItem>
        </SelectContent>
      </Select>
      
      <div className="text-xs text-muted-foreground ml-2">
        <span className="font-medium text-primary">{filteredCount}</span> of {totalCount} linkups
      </div>
    </div>
  );
}
