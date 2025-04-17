
import { useState } from "react";
import { Search, Filter, User as UserIcon, Languages, Tag, Coins, CalendarDays, Users } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataSort } from "./DataSort";
import { cn } from "@/lib/utils";
import { interests, languages, genderOptions } from "@/constants/filterOptions";
import type { User } from "@/types/user";

// Mock data - replace with actual data
const users: User[] = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=1",
    name: "Emma Thompson",
    username: "emma_t",
    email: "emma@example.com",
    age: 28,
    joinDate: "2023-03-15",
    location: "London, UK",
    isLinkupPlus: true,
    isVerified: true,
    interests: ["photography", "travel"],
    languages: ["en", "es"],
    gender: "Female",
    hostedLinkups: 15,
    attendedLinkups: 23,
    totalEarnings: 1250.50
  },
  // ... Add more mock users with similar structure
];

export function UserTable() {
  const [searchValue, setSearchValue] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [ageRange, setAgeRange] = useState([18, 80]);
  const [minEarnings, setMinEarnings] = useState(0);
  
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchValue.toLowerCase());
      const matchesInterests = selectedInterests.length === 0 || 
                              selectedInterests.some(interest => user.interests.includes(interest));
      const matchesLanguages = selectedLanguages.length === 0 || 
                              selectedLanguages.some(lang => user.languages.includes(lang));
      const matchesGender = !selectedGender || user.gender === selectedGender;
      const matchesAge = user.age >= ageRange[0] && user.age <= ageRange[1];
      const matchesEarnings = user.totalEarnings >= minEarnings;
      
      return matchesSearch && matchesInterests && matchesLanguages && 
             matchesGender && matchesAge && matchesEarnings;
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a.totalEarnings - b.totalEarnings;
      }
      return b.totalEarnings - a.totalEarnings;
    });

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
          {/* Interests Filter */}
          <Select
            value={selectedInterests[0]}
            onValueChange={(value) => setSelectedInterests([value])}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Interests" />
            </SelectTrigger>
            <SelectContent>
              {interests.map((interest) => (
                <SelectItem key={interest.id} value={interest.id}>
                  <div className="flex items-center gap-2">
                    <span>{interest.emoji}</span>
                    <span>{interest.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Languages Filter */}
          <Select
            value={selectedLanguages[0]}
            onValueChange={(value) => setSelectedLanguages([value])}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Languages" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  <div className="flex items-center gap-2">
                    <span>{language.emoji}</span>
                    <span>{language.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Gender Filter */}
          <Select value={selectedGender} onValueChange={setSelectedGender}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((option) => (
                <SelectItem key={option.id} value={option.label}>
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Age Range Slider */}
          <div className="min-w-[200px]">
            <Slider
              min={18}
              max={80}
              step={1}
              value={ageRange}
              onValueChange={setAgeRange}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground mt-1">
              Age: {ageRange[0]} - {ageRange[1]}
            </div>
          </div>

          {/* Earnings Sort */}
          <DataSort
            sortDirection={sortDirection}
            onSortChange={setSortDirection}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Hosted</TableHead>
              <TableHead>Attended</TableHead>
              <TableHead>Total Earnings</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">@{user.username}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>{user.hostedLinkups}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{user.attendedLinkups}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4 text-muted-foreground" />
                    <span>£{user.totalEarnings.toFixed(2)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.isVerified && (
                      <Badge variant="outline" className="bg-status-verified/10 text-status-verified border-status-verified/20">
                        Verified
                      </Badge>
                    )}
                    {user.isLinkupPlus && (
                      <Badge variant="outline" className="bg-linkup-purple/10 text-linkup-purple border-linkup-purple/20">
                        Plus
                      </Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
