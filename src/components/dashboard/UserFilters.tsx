import React from "react";
import { Search, Filter, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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

import {
  countries,
  nationalities,
} from "@/constants/filterOptions";

interface UserFiltersProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedNationalities: string[];
  setSelectedNationalities: (value: string[]) => void;
  selectedLocations: string[];
  setSelectedLocations: (value: string[]) => void;
  selectedGenders: string[];
  setSelectedGenders: (value: string[]) => void;
  showVerifiedOnly: boolean;
  setShowVerifiedOnly: (value: boolean) => void;
  showLinkupPlusOnly: boolean;
  setShowLinkupPlusOnly: (value: boolean) => void;
  verificationStatus: string;
  setVerificationStatus: (value: string) => void;
  membershipStatus: string;
  setMembershipStatus: (value: string) => void;
  ageRange: number[];
  setAgeRange: (value: number[]) => void;
  filteredCount: number;
  totalCount: number;
}

export function UserFilters({
  searchValue,
  setSearchValue,
  selectedNationalities,
  setSelectedNationalities,
  selectedLocations,
  setSelectedLocations,
  selectedGenders,
  setSelectedGenders,
  showVerifiedOnly,
  setShowVerifiedOnly,
  showLinkupPlusOnly,
  setShowLinkupPlusOnly,
  verificationStatus,
  setVerificationStatus,
  membershipStatus,
  setMembershipStatus,
  ageRange,
  setAgeRange,
  filteredCount,
  totalCount,
}: UserFiltersProps) {
  const toggleArrayValue = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter((item) => item !== value)
      : [...array, value];
  };

  const genderOptions = [
    { value: "male", label: "Male 💁‍♂️" },
    { value: "female", label: "Female 💁‍♀️" },
    { value: "non-binary", label: "Non-binary 💖" },
  ];

  const hasActiveFilters = selectedNationalities.length > 0 || 
    selectedLocations.length > 0 || 
    selectedGenders.length > 0 || 
    verificationStatus !== "" || 
    membershipStatus !== "" || 
    ageRange[0] !== 18 || 
    ageRange[1] !== 100 ||
    searchValue !== "";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg font-semibold text-foreground">
            {hasActiveFilters ? (
              <>Showing <span className="font-bold text-primary">{filteredCount}</span> of <span className="font-bold text-primary">{totalCount}</span> users</>
            ) : (
              <><span className="font-bold text-primary">{totalCount}</span> total users</>
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-grow max-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="font-medium">
              Gender ({selectedGenders.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <div className="p-2">
              {genderOptions.map((gender) => (
                <div key={gender.value} className="flex items-center space-x-2 p-2">
                  <Checkbox
                    checked={selectedGenders.includes(gender.value)}
                    onCheckedChange={() => {
                      setSelectedGenders(
                        toggleArrayValue(selectedGenders, gender.value)
                      );
                    }}
                  />
                  <label className="text-sm">{gender.label}</label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="font-medium">
              Age ({ageRange[0]} - {ageRange[1]})
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-4">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>{ageRange[0]}</span>
                <span>{ageRange[1]}</span>
              </div>
              <Slider
                min={18}
                max={100}
                step={1}
                value={ageRange}
                onValueChange={setAgeRange}
                className="mb-6"
              />
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="font-medium">
              Location ({selectedLocations.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search location..." />
              <CommandEmpty>No location found.</CommandEmpty>
              <ScrollArea className="h-60">
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.id}
                      onSelect={() => {
                        setSelectedLocations(
                          toggleArrayValue(selectedLocations, country.value)
                        );
                      }}
                    >
                      <Checkbox
                        checked={selectedLocations.includes(country.value)}
                        className="mr-2 h-4 w-4"
                      />
                      <span className="mr-2">{country.emoji}</span>
                      {country.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="font-medium">
              Nationality ({selectedNationalities.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search nationality..." />
              <CommandEmpty>No nationality found.</CommandEmpty>
              <ScrollArea className="h-60">
                <CommandGroup>
                  {nationalities.map((nationality) => (
                    <CommandItem
                      key={nationality.id}
                      onSelect={() => {
                        setSelectedNationalities(
                          toggleArrayValue(selectedNationalities, nationality.id)
                        );
                      }}
                    >
                      <Checkbox
                        checked={selectedNationalities.includes(nationality.id)}
                        className="mr-2 h-4 w-4"
                      />
                      <span className="mr-2">{nationality.emoji}</span>
                      {nationality.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>

        <Select value={verificationStatus} onValueChange={setVerificationStatus}>
          <SelectTrigger className="w-[140px] font-medium">
            <SelectValue placeholder="Verification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="verified">
              <div className="flex items-center gap-2">
                Verified
                <img 
                  src="/lovable-uploads/560d8a54-e5fd-4af3-84b1-62f333f56b27.png" 
                  alt="Verified" 
                  className="h-4 w-4" 
                />
              </div>
            </SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
          </SelectContent>
        </Select>

        <Select value={membershipStatus} onValueChange={setMembershipStatus}>
          <SelectTrigger className="w-[140px] font-medium">
            <SelectValue placeholder="Membership" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="free">Free User</SelectItem>
            <SelectItem value="plus">
              <div className="flex items-center gap-2">
                Linkup Plus
                <span className="text-amber-500">👑</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
