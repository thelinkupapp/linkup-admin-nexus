import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatJoinDate } from "@/utils/dateFormatting";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationItemsPerPage
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ActivityItem {
  id: string;
  type: 
    | "request_join" 
    | "joined" 
    | "accepted_join" 
    | "accepted_invite"
    | "sent_invite"
    | "invite_cohost"
    | "accept_cohost"
    | "change_location"
    | "reschedule"
    | "update_details"
    | "cancel"
    | "delete";
  firstName: string;
  otherUserFirstName?: string;
  otherUserId?: string;
  linkupName: string;
  linkupId: string;
  timestamp: string;
  newDateTime?: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "joined",
    firstName: "Jack",
    linkupName: "Sunset Beach Volleyball",
    linkupId: "volleyball-1",
    timestamp: "2024-04-18T15:30:00Z"
  },
  {
    id: "2",
    type: "sent_invite",
    firstName: "Jack",
    otherUserFirstName: "Sarah",
    otherUserId: "user-sarah",
    linkupName: "Downtown Art Gallery Opening",
    linkupId: "art-1",
    timestamp: "2024-04-15T10:00:00Z"
  },
  {
    id: "3",
    type: "reschedule",
    firstName: "Jack",
    linkupName: "Rooftop Yoga Session",
    linkupId: "yoga-1",
    timestamp: "2024-04-10T09:00:00Z",
    newDateTime: "2024-04-15T08:00:00Z"
  }
];

function getActivityMessage(activity: ActivityItem) {
  const linkupLink = (
    <Link 
      to={`/linkups/${activity.linkupId}`}
      className="font-medium hover:underline"
    >
      {activity.linkupName}
    </Link>
  );

  const otherUserLink = activity.otherUserId && (
    <Link 
      to={`/users/${activity.otherUserId}`}
      className="font-medium hover:underline"
    >
      {activity.otherUserFirstName}
    </Link>
  );

  switch (activity.type) {
    case "request_join":
      return <span>{activity.firstName} requested to join {linkupLink}</span>;
    case "joined":
      return <span>{activity.firstName} joined {linkupLink}</span>;
    case "accepted_join":
      return <span>{activity.firstName} got accepted to join {linkupLink}</span>;
    case "accepted_invite":
      return <span>{activity.firstName} accepted {otherUserLink}'s invite to join {linkupLink}</span>;
    case "sent_invite":
      return <span>{activity.firstName} sent an invite to {otherUserLink} to join their linkup {linkupLink}</span>;
    case "invite_cohost":
      return <span>{activity.firstName} invited {otherUserLink} to co-host their linkup {linkupLink}</span>;
    case "accept_cohost":
      return <span>{activity.firstName} accepted {otherUserLink}'s invite to co-host {linkupLink}</span>;
    case "change_location":
      return <span>{activity.firstName} changed the location for {linkupLink}</span>;
    case "reschedule":
      return (
        <span>
          {activity.firstName} rescheduled {linkupLink} to{" "}
          {formatJoinDate(activity.newDateTime || "")}
        </span>
      );
    case "update_details":
      return <span>{activity.firstName} updated details for {linkupLink}</span>;
    case "cancel":
      return <span>{activity.firstName} cancelled {linkupLink}</span>;
    case "delete":
      return <span>{activity.firstName} deleted {linkupLink}</span>;
    default:
      return null;
  }
}

export function UserLinkupActivity() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const handleStatusChange = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.linkupName.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(activity.type);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  const total = activities.length;
  const totalFiltered = filteredActivities.length;

  const getHeaderText = () => {
    const roleText = activeTab === "hosted" ? "Host of " : 
                    activeTab === "attended" ? "Attendee of " : "";
    const linkupText = total === 1 ? "linkup" : "linkups";
    
    return (
      <div className="flex flex-col gap-1">
        <DialogTitle className="text-2xl">All Linkups</DialogTitle>
        <div className="flex items-center gap-2 text-lg">
          <span className="text-[#1A1F2C]">
            {activeTab === "hosted" ? "Host of " : 
             activeTab === "attended" ? "Attendee of " : ""}
          </span>
          <span className="text-[#9b87f5] font-bold text-xl">{total}</span>
          <span className="text-[#1A1F2C]">{linkupText}</span>
          {(selectedStatuses.length > 0 || searchValue) && (
            <>
              <span className="mx-1">•</span>
              <span>showing </span>
              <span className="text-[#9b87f5] font-bold">{totalFiltered}</span>
              <span> of </span>
              <span className="text-[#9b87f5] font-bold">{total}</span>
              <span> {totalFiltered === 1 ? "linkup" : "linkups"}</span>
            </>
          )}
        </div>
      </div>
    );
  };

  const statusOptions = [
    { label: "Upcoming", value: "upcoming" },
    { label: "Happened", value: "happened" },
    { label: "Cancelled", value: "cancelled" }
  ];

  const ActivityList = ({ data }: { data: ActivityItem[] }) => (
    <div className="space-y-6">
      {data.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg">
              {activity.type === "joined" || activity.type === "accepted_join" ? "✅" :
               activity.type === "sent_invite" || activity.type === "invite_cohost" ? "📨" :
               activity.type === "reschedule" ? "🕒" :
               activity.type === "cancel" || activity.type === "delete" ? "❌" : "📝"}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm">{getActivityMessage(activity)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {formatJoinDate(activity.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          View All
        </Button>
      </div>
      <ActivityList data={activities.slice(0, 5)} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            {getHeaderText()}
            <div className="flex items-center justify-between mt-4">
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search linkups..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="space-y-4">
                <div className="font-medium">Status</div>
                {statusOptions.map((status) => (
                  <div 
                    key={status.value}
                    className="flex items-center space-x-2 group cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                    onClick={() => handleStatusChange(status.value)}
                  >
                    <Checkbox
                      id={`status-${status.value}`}
                      checked={selectedStatuses.includes(status.value)}
                      onCheckedChange={() => handleStatusChange(status.value)}
                      className="border-gray-300 data-[state=checked]:bg-[#9b87f5] data-[state=checked]:border-[#9b87f5]"
                    />
                    <label
                      htmlFor={`status-${status.value}`}
                      className="text-sm font-medium leading-none cursor-pointer flex-grow"
                    >
                      {status.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <ActivityList data={currentActivities} />
          </ScrollArea>
          <div className="mt-4 flex items-center justify-between">
            <PaginationItemsPerPage className="flex items-center gap-2">
              <span>Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded px-2 py-1"
              >
                {[5, 10, 15].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </PaginationItemsPerPage>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
