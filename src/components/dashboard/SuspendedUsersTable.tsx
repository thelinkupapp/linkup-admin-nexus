
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReactivateUserDialog } from "./ReactivateUserDialog";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, SortAsc, SortDesc } from "lucide-react";

const SUSPENDED_USERS = [
  {
    id: "0",
    avatar: "/lovable-uploads/a165dd8e-2635-4f3a-a050-ce01c92a0a6f.png",
    name: "Elie Abou Samra",
    username: "elieabousamra",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // yesterday
    reason: "Violation of community guidelines",
    notes: "Sent warning before suspension.",
  },
  {
    id: "1",
    avatar: "/lovable-uploads/1fa5e36a-9e47-4933-9b3c-d103bedaf3bf.png",
    name: "Harper Walker",
    username: "harper_walker62",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 28),
    reason: "Harassment",
    notes: "Multiple users reported harassment via DMs.",
  },
  {
    id: "2",
    avatar: "/lovable-uploads/f85e5796-4ca0-42bd-99b9-a9eaca40db93.png",
    name: "Sebastian Garcia",
    username: "sebastian_garcia42",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 120),
    reason: "Fake account",
    notes: "Identity could not be validated.",
  },
  {
    id: "3",
    avatar: "/lovable-uploads/08c01a0c-b394-4d67-8875-445c855a8995.png", // David Williams updated photo
    name: "David Williams",
    username: "davidwilliams",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
    reason: "Spam activity",
    notes: "Flagged for repetitive posting and spamming in linkups.",
  }
];

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
  return format(date, "MMM d yyyy, HH:mm");
}

type SortOrder = "asc" | "desc";

export default function SuspendedUsersTable() {
  const [reactivateId, setReactivateId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedUsers = [...SUSPENDED_USERS].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.suspendedAt.getTime() - b.suspendedAt.getTime();
    } else {
      return b.suspendedAt.getTime() - a.suspendedAt.getTime();
    }
  });

  const getUserById = (id: string) => SUSPENDED_USERS.find(u => u.id === id);

  return (
    <div className="max-w-4xl mx-auto bg-white mt-10 rounded-xl shadow-sm border border-[#ECECEC]">
      <h2 className="text-2xl font-bold py-6 px-8 border-b text-[#1A1F2C]">Suspended Users</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-700">
              <TableHead className="min-w-[240px]">User</TableHead>
              <TableHead className="min-w-[180px]">
                <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}>
                  Suspended
                  {sortOrder === "desc" ? <SortDesc className="w-4 h-4 text-[#9b87f5]" /> : <SortAsc className="w-4 h-4 text-[#9b87f5]" />}
                </div>
              </TableHead>
              <TableHead className="min-w-[120px]">Reason</TableHead>
              <TableHead className="min-w-[200px]">Additional Notes</TableHead>
              <TableHead className="min-w-[120px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  No suspended users found.
                </TableCell>
              </TableRow>
            ) : (
              sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-[#1A1F2C]">{user.name}</div>
                        <div className="text-sm text-muted-foreground">@{user.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{formatSuspendedAt(user.suspendedAt)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal text-[#ea384c] border-[#ea384c] bg-red-50">{user.reason}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{user.notes}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white rounded-full px-4"
                      onClick={() => setReactivateId(user.id)}
                    >
                      Reactivate Account
                    </Button>
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
      <div className="mt-4 mb-4 px-8 text-muted-foreground text-sm">
        Showing <span className="text-[#9b87f5] font-medium">{sortedUsers.length}</span> suspended {sortedUsers.length === 1 ? "user" : "users"}
      </div>
    </div>
  );
}
