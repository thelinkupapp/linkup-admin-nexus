import React from "react";
import { Search, DollarSign, MapPin } from "lucide-react";
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
import { countries } from "@/constants/filterOptions";

const countryFlagMap: Record<string, string> = Object.fromEntries(
  countries.map((c) => [c.label, c.emoji])
);

interface LinkupFiltersProps {
  searchValue: string;
  setSearchValue: (val: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (val: string[]) => void;
  selectedStatuses: string[];
  setSelectedStatuses: (val: string[]) => void;
  selectedVisibility: string;
  setSelectedVisibility: (val: string) => void;
  selectedPrice: string;
  setSelectedPrice: (val: string) => void;
  selectedJoinMethod: string;
  setSelectedJoinMethod: (val: string) => void;
  selectedLocations: string[];
  setSelectedLocations: (val: string[]) => void;
  allLocations: string[];
  dateRange?: any;
  setDateRange?: (range: any) => void;
  earningsSort: "none" | "asc" | "desc";
  setEarningsSort: (val: "none" | "asc" | "desc") => void;
  attendeesSort: "none" | "asc" | "desc";
  setAttendeesSort: (val: "none" | "asc" | "desc") => void;
}

const STATUS_OPTIONS = [
  { value: "upcoming", label: "Upcoming" },
  { value: "happening", label: "Happening" },
  { value: "happened", label: "Happened" },
  { value: "cancelled", label: "Cancelled" },
];

export function LinkupFilters({
  searchValue,
  setSearchValue,
  selectedCategories,
  setSelectedCategories,
  selectedStatuses,
  setSelectedStatuses,
  selectedVisibility,
  setSelectedVisibility,
  selectedPrice,
  setSelectedPrice,
  selectedJoinMethod,
  setSelectedJoinMethod,
  selectedLocations,
  setSelectedLocations,
  allLocations,
  dateRange,
  setDateRange,
  earningsSort,
  setEarningsSort,
  attendeesSort,
  setAttendeesSort,
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

  const handleStatusChange = (value: string) => {
    if (selectedStatuses.includes(value)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== value));
    } else {
      setSelectedStatuses([...selectedStatuses, value]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 mb-3 w-full bg-transparent justify-between max-w-5xl">
      <div className="flex flex-wrap items-center gap-2.5 flex-grow">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-7 h-8 w-[160px] text-xs"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8 text-xs px-2 font-medium min-w-[84px]">
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
            <Button variant="outline" className="h-8 text-xs px-2 font-medium min-w-[110px] flex gap-1">
              <MapPin className="h-3 w-3 mr-1 opacity-60" />
              Location ({selectedLocations.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[230px] p-0 z-[200]">
            <Command>
              <CommandInput placeholder="Search location..." />
              <CommandEmpty>No location found.</CommandEmpty>
              <ScrollArea className="h-52">
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.id}
                      onSelect={() => setSelectedLocations(toggleArrayValue(selectedLocations, country.value))}
                      className="flex items-center"
                    >
                      <Checkbox
                        checked={selectedLocations.includes(country.value)}
                        className="mr-2 h-3 w-3"
                      />
                      <span className="mr-2">{country.emoji}</span>
                      <span className="text-xs">{country.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8 text-xs px-2 font-medium min-w-[106px]">
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

        <div className="mb-3">
          <label className="block text-xs font-semibold mb-1">Status</label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map(opt => (
              <label
                key={opt.value}
                className={`flex items-center gap-1 rounded px-2 py-1 cursor-pointer text-xs border transition 
                  ${selectedStatuses.includes(opt.value)
                    ? "bg-[#ece6fd] border-[#a89af5] text-[#8564f5]"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"}`}
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={selectedStatuses.includes(opt.value)}
                  onChange={() => handleStatusChange(opt.value)}
                  className="form-checkbox accent-[#9b87f5]"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <Select value={selectedVisibility} onValueChange={(value) => setSelectedVisibility(value === "all" ? "" : value)}>
          <SelectTrigger className="h-8 text-xs w-24">
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
              className="h-8 text-xs px-2 font-medium flex items-center gap-1 min-w-[110px]"
              aria-label="Sort by earnings"
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
          <PopoverContent className="w-[120px] p-0 z-[110]">
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

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-8 text-xs px-2 font-medium flex items-center gap-1 min-w-[110px]"
              aria-label="Sort by attendees"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17v-2a4 4 0 0 1 4-4h2"/><circle cx="9" cy="7" r="4"/><path d="M16 21v-2a4 4 0 0 0-3-3.87"/><path d="M17 3.13a4 4 0 0 1 0 7.75" /></svg>
              Attendees
              {attendeesSort === "desc" && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 9l7 7 7-7"></path>
                </svg>
              )}
              {attendeesSort === "asc" && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 15l-7-7-7 7"></path>
                </svg>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[120px] p-0 z-[110]">
            <div>
              <button
                type="button"
                className={`w-full text-xs px-3 py-2 text-left hover:bg-muted/50 ${
                  attendeesSort === "desc" ? "font-semibold text-primary" : ""
                }`}
                onClick={() => setAttendeesSort("desc")}
              >
                <span className="flex items-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l7 7 7-7"/></svg>
                  &nbsp;Highest
                </span>
              </button>
              <button
                type="button"
                className={`w-full text-xs px-3 py-2 text-left hover:bg-muted/50 ${
                  attendeesSort === "asc" ? "font-semibold text-primary" : ""
                }`}
                onClick={() => setAttendeesSort("asc")}
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
    </div>
  );
}
