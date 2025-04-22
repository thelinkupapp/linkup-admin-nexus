
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ReactivateUserDialog } from "./ReactivateUserDialog";
import { format } from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react"; // Only use allowed icons

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
    avatar: "/lovable-uploads/08c01a0c-b394-4d67-8875-445c855a8995.png",
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
    <div className="w-full flex flex-col items-center bg-[#f7f6fa] min-h-[calc(100vh-80px)] py-3">
      <div className="w-full max-w-5xl mt-4">
        <h2 className="text-3xl font-bold mb-1 text-[#1A1F2C]">Suspended Users</h2>
        <p className="text-[#797397] mb-5">
          View and manage users who have been suspended from the platform
        </p>
        <div className="bg-[#FFFBEA] border-l-4 border-[#ffe084] p-3 rounded-lg flex items-center mb-6">
          <span className="text-[#ffd600] mr-2 text-xl">⚠️</span>
          <span className="text-[#8a7700] text-sm">
            These users have been suspended for violating platform policies. Review each case carefully before taking any action.
          </span>
        </div>
      </div>
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-sm border border-[#ececec]">
        <div className="px-6 py-4 border-b border-[#ececec]">
          <span className="text-xl font-semibold text-[#1A1F2C]">Suspended Users</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="bg-[#f7f6fa] h-12 text-[#8E8CA4]">
                <th className="font-semibold pl-6 text-left">User</th>
                <th className="font-semibold text-left cursor-pointer select-none" onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}>
                  <span className="flex items-center gap-1">
                    Suspended
                    {sortOrder === "desc" ? (
                      <ArrowDown className="w-4 h-4 text-[#9b87f5]" />
                    ) : (
                      <ArrowUp className="w-4 h-4 text-[#9b87f5]" />
                    )}
                  </span>
                </th>
                <th className="font-semibold text-left min-w-[150px]">Reason</th>
                <th className="font-semibold text-left min-w-[210px]">Additional Notes</th>
                <th className="font-semibold text-center pr-6 min-w-[150px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    No suspended users found.
                  </td>
                </tr>
              ) : (
                sortedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#f1f0fb] last:border-0 group hover:bg-[#faf9fd] transition">
                    <td className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-11 w-11 border border-[#e6e4f4]">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-[#1A1F2C] text-base">{user.name}</div>
                          <div className="text-xs text-[#9895b2]">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-base text-[#252438]">{formatSuspendedAt(user.suspendedAt)}</td>
                    <td className="py-4">
                      <span className="inline-block border border-[#ea384c] text-[#ea384c] bg-transparent rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap min-w-[40px] text-center" style={{ background: "none" }}>
                        {user.reason}
                      </span>
                    </td>
                    <td className="py-4 text-[#312e46] text-sm">
                      {user.notes}
                    </td>
                    <td className="py-4 pr-6 text-center">
                      <Button
                        size="sm"
                        className="rounded-full px-5 py-1.5 text-base bg-[#9b87f5] hover:bg-[#7E69AB] text-white shadow-none font-medium"
                        style={{ minWidth: 120 }}
                        onClick={() => setReactivateId(user.id)}
                      >
                        Reactivate Account
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="py-4 px-6 text-[#8E8CA4] text-sm border-t border-[#ececec]">
          Showing <span className="text-[#9b87f5] font-medium">{sortedUsers.length}</span> suspended {sortedUsers.length === 1 ? "user" : "users"}
        </div>
      </div>
      <ReactivateUserDialog
        isOpen={!!reactivateId}
        onClose={() => setReactivateId(null)}
        userName={getUserById(reactivateId || "")?.name ?? ""}
        username={getUserById(reactivateId || "")?.username ?? ""}
        userAvatar={getUserById(reactivateId || "")?.avatar ?? ""}
        onConfirm={() => setReactivateId(null)}
      />
    </div>
  );
}
