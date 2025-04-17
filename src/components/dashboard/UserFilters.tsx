
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
  interests,
  languages,
  genderOptions,
  countries,
} from "@/constants/filterOptions";

interface UserFiltersProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedInterests: string[];
  setSelectedInterests: (value: string[]) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (value: string[]) => void;
  selectedGenders: string[];
  setSelectedGenders: (value: string[]) => void;
  selectedLocations: string[];
  setSelectedLocations: (value: string[]) => void;
  showVerifiedOnly: boolean;
  setShowVerifiedOnly: (value: boolean) => void;
  showLinkupPlusOnly: boolean;
  setShowLinkupPlusOnly: (value: boolean) => void;
}

export function UserFilters({
  searchValue,
  setSearchValue,
  selectedInterests,
  setSelectedInterests,
  selectedLanguages,
  setSelectedLanguages,
  selectedGenders,
  setSelectedGenders,
  selectedLocations,
  setSelectedLocations,
  showVerifiedOnly,
  setShowVerifiedOnly,
  showLinkupPlusOnly,
  setShowLinkupPlusOnly,
}: UserFiltersProps) {
  const toggleArrayValue = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter((item) => item !== value)
      : [...array, value];
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 w-full sm:w-80"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={showVerifiedOnly}
                onCheckedChange={() => setShowVerifiedOnly(!showVerifiedOnly)}
              />
              <label
                htmlFor="verified"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Verified Only
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="linkupPlus"
                checked={showLinkupPlusOnly}
                onCheckedChange={() => setShowLinkupPlusOnly(!showLinkupPlusOnly)}
              />
              <label
                htmlFor="linkupPlus"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Linkup Plus Only
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              Interests ({selectedInterests.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search interests..." />
              <CommandEmpty>No interest found.</CommandEmpty>
              <CommandGroup>
                {interests.map((interest) => (
                  <CommandItem
                    key={interest.id}
                    onSelect={() => {
                      setSelectedInterests(
                        toggleArrayValue(selectedInterests, interest.id)
                      );
                    }}
                  >
                    <Checkbox
                      checked={selectedInterests.includes(interest.id)}
                      className="mr-2 h-4 w-4 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    {interest.emoji} {interest.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              Languages ({selectedLanguages.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search languages..." />
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {languages.map((language) => (
                  <CommandItem
                    key={language.id}
                    onSelect={() => {
                      setSelectedLanguages(
                        toggleArrayValue(selectedLanguages, language.id)
                      );
                    }}
                  >
                    <Checkbox
                      checked={selectedLanguages.includes(language.id)}
                      className="mr-2 h-4 w-4 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    {language.emoji} {language.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              Gender ({selectedGenders.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search gender..." />
              <CommandEmpty>No gender found.</CommandEmpty>
              <CommandGroup>
                {genderOptions.map((gender) => (
                  <CommandItem
                    key={gender.id}
                    onSelect={() => {
                      setSelectedGenders(
                        toggleArrayValue(selectedGenders, gender.id)
                      );
                    }}
                  >
                    <Checkbox
                      checked={selectedGenders.includes(gender.id)}
                      className="mr-2 h-4 w-4 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    {gender.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              Location ({selectedLocations.length})
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search location..." />
              <CommandEmpty>No location found.</CommandEmpty>
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
                      className="mr-2 h-4 w-4 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    {country.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
