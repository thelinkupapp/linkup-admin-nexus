
import React from "react";
import { Search, DollarSign } from "lucide-react";
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
  filteredCount?: number;
  totalCount?: number;
  earningsSort: "none" | "desc" | "asc";
  setEarningsSort: (value: "desc" | "asc" | "none") => void;
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
  earningsSort,
  setEarningsSort,
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

  // Make compact filter layout
  return (
    <div className="flex items-center flex-wrap gap-1 mb-1">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-7 h-8 w-[150px] text-xs"
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-8 text-xs px-2 font-medium">
            Category ({selectedCategories.length})
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[190px] p-0 z-[100]">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <ScrollArea className="h-44">
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
                      className="mr-2 h-3 w-3"
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
          <Button variant="outline" className="h-8 text-xs px-2 font-medium">
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

      <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value === "all" ? "" : value)}>
        <SelectTrigger className="h-8 text-xs w-20">
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

      <Select value={selectedVisibility} onValueChange={(value) => setSelectedVisibility(value === "all" ? "" : value)}>
        <SelectTrigger className="h-8 text-xs w-20">
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

      <Select value={selectedPrice} onValueChange={(value) => setSelectedPrice(value === "all" ? "" : value)}>
        <SelectTrigger className="h-8 text-xs w-20">
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

      <Select value={selectedJoinMethod} onValueChange={(value) => setSelectedJoinMethod(value === "all" ? "" : value)}>
        <SelectTrigger className="h-8 text-xs w-20">
          <SelectValue placeholder="Join…" />
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

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`h-8 text-xs px-2 font-medium flex items-center gap-1`}
            aria-label="Sort by earnings"
            style={{ minWidth: 105 }}
          >
            <DollarSign className="w-3 h-3 mr-0.5" />
            Earnings
            {earningsSort === "desc" && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 9l7 7 7-7"></path>
              </svg>
            )}
            {earningsSort === "asc" && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 15l-7-7-7 7"></path>
              </svg>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[120px] p-0 z-[100]">
          <div>
            <button
              type="button"
              className={`w-full text-xs px-3 py-2 text-left hover:bg-muted/50 ${
                earningsSort === "desc" ? "font-semibold text-primary" : ""
              }`}
              onClick={() => setEarningsSort("desc")}
            >
              <span className="flex items-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l7 7 7-7"/></svg>
                &nbsp;Highest
              </span>
            </button>
            <button
              type="button"
              className={`w-full text-xs px-3 py-2 text-left hover:bg-muted/50 ${
                earningsSort === "asc" ? "font-semibold text-primary" : ""
              }`}
              onClick={() => setEarningsSort("asc")}
            >
              <span className="flex items-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 15l-7-7-7 7"/></svg>
                &nbsp;Lowest
              </span>
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
