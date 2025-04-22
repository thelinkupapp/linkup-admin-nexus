
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, ShieldX, UserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ReactivateUserDialog } from "./ReactivateUserDialog";
import { format } from "date-fns";

const SUSPENDED_USERS = [
  {
    id: "0",
    avatar: "/lovable-uploads/a165dd8e-2635-4f3a-a050-ce01c92a0a6f.png",
    name: "Elie Abou Samra",
    username: "elieabousamra",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // yesterday
    reason: "Violation of community guidelines",
    location: "🇦🇪 Dubai, United Arab Emirates",
    nationality: "Lebanese",
    age: 39,
    isVerified: true,
    isLinkupPlus: true,
    hosted: 36,
    attended: 21,
    earnings: 999999,
    joined: new Date("2025-02-21T18:30:00Z")
  },
  {
    id: "1",
    avatar: "/lovable-uploads/1fa5e36a-9e47-4933-9b3c-d103bedaf3bf.png",
    name: "Harper Walker",
    username: "harper_walker62",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 28), // yesterday
    reason: "Harassment",
    location: "🇧🇪 Antwerp, Belgium",
    nationality: "Belgian",
    age: 29,
    isVerified: false,
    isLinkupPlus: false,
    hosted: 3,
    attended: 27,
    earnings: 2980.06,
    joined: new Date("2024-11-20T09:58:00Z")
  },
  {
    id: "2",
    avatar: "/lovable-uploads/f85e5796-4ca0-42bd-99b9-a9eaca40db93.png",
    name: "Sebastian Garcia",
    username: "sebastian_garcia42",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 120), // Apr 19
    reason: "Fake account",
    location: "🇫🇮 Turku, Finland",
    nationality: "Finnish",
    age: 28,
    isVerified: true,
    isLinkupPlus: true,
    hosted: 4,
    attended: 0,
    earnings: 2577.00,
    joined: new Date("2025-04-19T11:09:00Z")
  }
];

function formatCurrency(amount: number) {
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatSuspendedAt(date: Date) {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  if (isToday) {
    return `Today at ${format(date, "HH:mm")}`;
  }
  if (isYesterday) {
    return `Yesterday at ${format(date, "HH:mm")}`;
  }
  return format(date, "MMM d 'at' HH:mm");
}

const filterLabels = [
  { label: "Gender", count: 0 },
  { label: "Age (18 - 100)", count: 0 },
  { label: "Location", count: 0 },
  { label: "Nationality", count: 0 },
  { label: "Verification", count: 0 },
  { label: "Membership", count: 0 },
];

export default function SuspendedUsersTable() {
  const [search, setSearch] = useState("");
  const [reactivateId, setReactivateId] = useState<string | null>(null);

  const filteredUsers = SUSPENDED_USERS.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsers = SUSPENDED_USERS.length;
  const totalFiltered = filteredUsers.length;

  const getUserById = (id: string) => SUSPENDED_USERS.find(u => u.id === id);

  // You can expand filter logic in the future – for now, UI is per design.
  return (
    <div>
      <div className="flex items-center gap-3 mb-6 mt-3">
        <UserRound className="h-6 w-6 text-[#9b87f5]" />
        <span className="text-[22px] font-semibold text-[#9b87f5] leading-none">{totalUsers}</span>
        <span className="text-lg font-medium text-gray-900">total users</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
        <Input
          className="max-w-md h-11 text-base"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {filterLabels.map((item, idx) => (
          <Button
            variant="outline"
            key={item.label}
            className="rounded-full h-9 px-3 text-base font-normal border-muted-foreground"
            disabled
          >
            {item.label}
            {item.count > 0 && (
              <span className="ml-1 rounded-full bg-[#9b87f5] text-white px-2 py-0.5 text-xs">{item.count}</span>
            )}
          </Button>
        ))}
      </div>
      
      <div className="rounded-2xl border border-[#ECECEC] overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-700">
              <TableHead className="min-w-[220px]">User</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>Hosted</TableHead>
              <TableHead>Attended</TableHead>
              <TableHead>Earnings</TableHead>
              <TableHead>Suspended</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="py-12 text-center text-muted-foreground">
                  No suspended users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">@{user.username}</div>
                        <div className="flex gap-1 items-center mt-1">
                          {user.isVerified && (
                            <img src="/lovable-uploads/560d8a54-e5fd-4af3-84b1-62f333f56b27.png" alt="Verified" className="h-4 w-4" />
                          )}
                          {user.isLinkupPlus && (
                            <span className="text-amber-500 ml-1 align-middle">👑</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>{user.nationality}</TableCell>
                  <TableCell>{user.hosted}</TableCell>
                  <TableCell>{user.attended}</TableCell>
                  <TableCell>{formatCurrency(user.earnings)}</TableCell>
                  <TableCell>{formatSuspendedAt(user.suspendedAt)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">{user.reason}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-green-600 focus:text-green-700 cursor-pointer"
                          onClick={() => setReactivateId(user.id)}
                        >
                          Reactivate Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <ReactivateUserDialog
        isOpen={!!reactivateId}
        onClose={() => setReactivateId(null)}
        userName={getUserById(reactivateId || "")?.name ?? ""}
        username={getUserById(reactivateId || "")?.username ?? ""}
        userAvatar={getUserById(reactivateId || "")?.avatar ?? ""}
        onConfirm={() => setReactivateId(null)}
      />
      <div className="mt-6 text-muted-foreground text-sm">
        Showing <span className="text-[#9b87f5] font-medium">{totalFiltered}</span> of <span className="text-[#9b87f5] font-medium">{totalUsers}</span> suspended users
      </div>
    </div>
  );
}
