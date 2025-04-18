import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MoreVertical, Users, Mail, MapPin, Clock, Flag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { UserFilters } from "@/components/dashboard/UserFilters";

const users = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=1",
    name: "John Smith",
    username: "john_smith",
    email: "john.123@example.com",
    location: "New York, USA",
    joinDate: "2023-01-15",
    isVerified: true,
    isLinkupPlus: true,
    gender: "male",
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=2",
    name: "Alice Johnson",
    username: "alice_j",
    email: "alice.johnson@example.com",
    location: "London, UK",
    joinDate: "2023-02-20",
    isVerified: false,
    isLinkupPlus: false,
    gender: "female",
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=3",
    name: "Bob Williams",
    username: "bob_w",
    email: "bob.williams@example.com",
    location: "Sydney, Australia",
    joinDate: "2023-03-10",
    isVerified: true,
    isLinkupPlus: false,
    gender: "male",
  },
  {
    id: "4",
    avatar: "https://i.pravatar.cc/150?img=4",
    name: "Emily Brown",
    username: "emily_b",
    email: "emily.brown@example.com",
    location: "Toronto, Canada",
    joinDate: "2023-04-05",
    isVerified: false,
    isLinkupPlus: true,
    gender: "female",
  },
  {
    id: "5",
    avatar: "https://i.pravatar.cc/150?img=5",
    name: "David Garcia",
    username: "david_g",
    email: "david.garcia@example.com",
    location: "Los Angeles, USA",
    joinDate: "2023-05-01",
    isVerified: true,
    isLinkupPlus: false,
    gender: "male",
  },
  {
    id: "6",
    avatar: "https://i.pravatar.cc/150?img=6",
    name: "Linda Rodriguez",
    username: "linda_r",
    email: "linda.rodriguez@example.com",
    location: "Madrid, Spain",
    joinDate: "2023-06-12",
    isVerified: false,
    isLinkupPlus: false,
    gender: "female",
  },
  {
    id: "7",
    avatar: "https://i.pravatar.cc/150?img=7",
    name: "Michael Davis",
    username: "michael_d",
    email: "michael.davis@example.com",
    location: "Berlin, Germany",
    joinDate: "2023-07-22",
    isVerified: true,
    isLinkupPlus: true,
    gender: "male",
  },
  {
    id: "8",
    avatar: "https://i.pravatar.cc/150?img=8",
    name: "Susan Wilson",
    username: "susan_w",
    email: "susan.wilson@example.com",
    location: "Paris, France",
    joinDate: "2023-08-08",
    isVerified: false,
    isLinkupPlus: false,
    gender: "female",
  },
  {
    id: "9",
    avatar: "https://i.pravatar.cc/150?img=9",
    name: "Kevin Martinez",
    username: "kevin_m",
    email: "kevin.martinez@example.com",
    location: "Tokyo, Japan",
    joinDate: "2023-09-18",
    isVerified: true,
    isLinkupPlus: false,
    gender: "male",
  },
  {
    id: "10",
    avatar: "https://i.pravatar.cc/150?img=10",
    name: "Jessica Anderson",
    username: "jessica_a",
    email: "jessica.anderson@example.com",
    location: "Rome, Italy",
    joinDate: "2023-10-28",
    isVerified: false,
    isLinkupPlus: true,
    gender: "female",
  },
];

const UserTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showLinkupPlusOnly, setShowLinkupPlusOnly] = useState(false);
  const [showUnverifiedOnly, setShowUnverifiedOnly] = useState(false);
  const [showFreeUsersOnly, setShowFreeUsersOnly] = useState(false);
  const [ageRange, setAgeRange] = useState<number[]>([18, 100]);

  const filteredUsers = users.filter(user => {
    const searchRegex = new RegExp(searchValue, 'i');
    if (searchValue && !searchRegex.test(user.name) && !searchRegex.test(user.email)) {
      return false;
    }

    if (selectedNationalities.length > 0 && !selectedNationalities.includes(user.location)) {
      return false;
    }

    if (selectedLocations.length > 0 && !selectedLocations.includes(user.location)) {
      return false;
    }

    if (selectedGenders.length > 0 && !selectedGenders.includes(user.gender)) {
      return false;
    }

    if (showVerifiedOnly && !user.isVerified) return false;
    if (showUnverifiedOnly && user.isVerified) return false;
    if (showLinkupPlusOnly && !user.isLinkupPlus) return false;
    if (showFreeUsersOnly && user.isLinkupPlus) return false;

    return true;
  });

  return (
    <div className="space-y-4">
      <UserFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedNationalities={selectedNationalities}
        setSelectedNationalities={setSelectedNationalities}
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
        selectedGenders={selectedGenders}
        setSelectedGenders={setSelectedGenders}
        showVerifiedOnly={showVerifiedOnly}
        setShowVerifiedOnly={setShowVerifiedOnly}
        showLinkupPlusOnly={showLinkupPlusOnly}
        setShowLinkupPlusOnly={setShowLinkupPlusOnly}
        showUnverifiedOnly={showUnverifiedOnly}
        setShowUnverifiedOnly={setShowUnverifiedOnly}
        showFreeUsersOnly={showFreeUsersOnly}
        setShowFreeUsersOnly={setShowFreeUsersOnly}
        ageRange={ageRange}
        setAgeRange={setAgeRange}
        filteredCount={filteredUsers.length}
        totalCount={users.length}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  {user.isVerified ? (
                    <Badge variant="outline">Verified</Badge>
                  ) : (
                    <Badge variant="secondary">Unverified</Badge>
                  )}
                  {user.isLinkupPlus && (
                    <Badge variant="default">Linkup Plus</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link to={`/users/${user.id}`}>View Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to={`/users/${user.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
