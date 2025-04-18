import React from 'react';
import { nationalities } from "@/constants/filterOptions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface UserFiltersProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  selectedNationalities: string[];
  setSelectedNationalities: React.Dispatch<React.SetStateAction<string[]>>;
  selectedGenders: string[];
  setSelectedGenders: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
  showVerifiedOnly: boolean;
  setShowVerifiedOnly: React.Dispatch<React.SetStateAction<boolean>>;
  showLinkupPlusOnly: boolean;
  setShowLinkupPlusOnly: React.Dispatch<React.SetStateAction<boolean>>;
  verificationStatus: string;
  setVerificationStatus: React.Dispatch<React.SetStateAction<string>>;
  membershipStatus: string;
  setMembershipStatus: React.Dispatch<React.SetStateAction<string>>;
  ageRange: number[];
  setAgeRange: React.Dispatch<React.SetStateAction<number[]>>;
  filteredCount: number;
  totalCount: number;
}

export function UserFilters({
  searchValue,
  setSearchValue,
  selectedNationalities,
  setSelectedNationalities,
  selectedGenders,
  setSelectedGenders,
  selectedLocations,
  setSelectedLocations,
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
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Search by name, username, or email..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Nationality</label>
          <Select
            multiple
            onValueChange={(value) => setSelectedNationalities(value === "" ? [] : (Array.isArray(value) ? value : [value]))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select nationalities" />
            </SelectTrigger>
            <SelectContent>
              {nationalities.map((nationality) => (
                <SelectItem key={nationality.id} value={nationality.id}>
                  {nationality.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Gender</label>
          <Select
            multiple
            onValueChange={(value) => setSelectedGenders(value === "" ? [] : (Array.isArray(value) ? value : [value]))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select genders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location Contains</label>
          <Input
            placeholder="Enter location keyword..."
            value={selectedLocations[0] || ""}
            onChange={(e) => setSelectedLocations(e.target.value ? [e.target.value] : [])}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Age Range</label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              className="w-24"
              value={ageRange[0].toString()}
              onChange={(e) => setAgeRange([Number(e.target.value), ageRange[1]])}
            />
            <Input
              type="number"
              placeholder="Max"
              className="w-24"
              value={ageRange[1].toString()}
              onChange={(e) => setAgeRange([ageRange[0], Number(e.target.value)])}
            />
          </div>
          <Slider
            defaultValue={ageRange}
            max={100}
            min={18}
            step={1}
            onValueChange={(value) => setAgeRange(value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Verification Status</label>
          <div className="flex space-x-2">
            <button
              className={`
                py-1 px-3 rounded-md text-sm transition-all
                ${verificationStatus === "verified" 
                  ? "bg-status-verified text-white" 
                  : "bg-muted/20 text-muted-foreground hover:bg-status-verified/20 hover:text-status-verified"}
              `}
              onClick={() => setVerificationStatus(verificationStatus === "verified" ? "" : "verified")}
            >
              Verified
            </button>
            <button
              className={`
                py-1 px-3 rounded-md text-sm transition-all
                ${verificationStatus === "unverified" 
                  ? "bg-destructive text-white" 
                  : "bg-muted/20 text-muted-foreground hover:bg-destructive/20 hover:text-destructive"}
              `}
              onClick={() => setVerificationStatus(verificationStatus === "unverified" ? "" : "unverified")}
            >
              Unverified
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">
          Displaying {filteredCount} of {totalCount} users
        </p>
      </div>
    </div>
  );
}
