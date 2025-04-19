
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Link as LinkIcon, 
  Mail, 
  Edit, 
  Trash2, 
  CheckCircle, 
  ArrowDown, 
  ArrowUp 
} from "lucide-react";

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

// Sample data - in a real app, this would come from an API or props
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
  },
  {
    id: "4",
    type: "request_join",
    firstName: "Emily",
    linkupName: "Weekend Hiking Trip",
    linkupId: "hiking-1",
    timestamp: "2024-04-16T11:30:00Z"
  },
  {
    id: "5",
    type: "accepted_join",
    firstName: "Michael",
    linkupName: "Book Club Meeting",
    linkupId: "book-1",
    timestamp: "2024-04-14T14:00:00Z"
  },
  {
    id: "6",
    type: "accepted_invite",
    firstName: "Lisa",
    otherUserFirstName: "David",
    otherUserId: "user-david",
    linkupName: "Cooking Class",
    linkupId: "cooking-1",
    timestamp: "2024-04-13T18:30:00Z"
  },
  {
    id: "7",
    type: "invite_cohost",
    firstName: "Brian",
    otherUserFirstName: "Jessica",
    otherUserId: "user-jessica",
    linkupName: "Tech Meetup",
    linkupId: "tech-1",
    timestamp: "2024-04-12T19:00:00Z"
  },
  {
    id: "8",
    type: "accept_cohost",
    firstName: "Amanda",
    otherUserFirstName: "Robert",
    otherUserId: "user-robert",
    linkupName: "Photography Workshop",
    linkupId: "photo-1",
    timestamp: "2024-04-11T16:45:00Z"
  },
  {
    id: "9",
    type: "change_location",
    firstName: "Daniel",
    linkupName: "Networking Event",
    linkupId: "network-1",
    timestamp: "2024-04-09T12:15:00Z"
  },
  {
    id: "10",
    type: "update_details",
    firstName: "Sophie",
    linkupName: "Yoga in the Park",
    linkupId: "yoga-2",
    timestamp: "2024-04-08T08:30:00Z"
  },
  {
    id: "11",
    type: "cancel",
    firstName: "Thomas",
    linkupName: "Movie Night",
    linkupId: "movie-1",
    timestamp: "2024-04-07T20:00:00Z"
  },
  {
    id: "12",
    type: "delete",
    firstName: "Rachel",
    linkupName: "Art Exhibition",
    linkupId: "art-2",
    timestamp: "2024-04-06T15:00:00Z"
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

function getActivityIcon(type: ActivityItem["type"]) {
  switch (type) {
    case "request_join":
    case "joined":
    case "accepted_join":
    case "accepted_invite":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "sent_invite":
    case "invite_cohost":
    case "accept_cohost":
      return <Mail className="h-5 w-5 text-blue-500" />;
    case "change_location":
    case "reschedule":
    case "update_details":
      return <Edit className="h-5 w-5 text-amber-500" />;
    case "cancel":
    case "delete":
      return <Trash2 className="h-5 w-5 text-red-500" />;
    default:
      return <LinkIcon className="h-5 w-5 text-gray-500" />;
  }
}

// Helper function to check if an activity should be in a particular tab
function activityMatchesTab(activity: ActivityItem, tab: string): boolean {
  switch (tab) {
    case "participation":
      return ["request_join", "joined", "accepted_join", "accepted_invite"].includes(activity.type);
    case "invites":
      return ["sent_invite", "invite_cohost", "accept_cohost"].includes(activity.type);
    case "edits":
      return ["change_location", "reschedule", "update_details"].includes(activity.type);
    case "cancellations":
      return ["cancel", "delete"].includes(activity.type);
    default:
      return true; // "all" tab or any other
  }
}

export function UserLinkupActivity() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filter activities based on selected tab
  const filteredActivities = activities.filter(activity => 
    activityMatchesTab(activity, activeTab)
  );

  // Sort activities based on timestamp
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  const total = activities.length;
  const totalFiltered = filteredActivities.length;
  
  // Calculate pagination
  const totalPages = Math.ceil(sortedActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = sortedActivities.slice(startIndex, endIndex);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };

  // Generate title text based on active tab
  const getHeaderText = () => {
    let tabText = "";
    let countText = `${totalFiltered} linkup${totalFiltered !== 1 ? 's' : ''}`;
    
    switch (activeTab) {
      case "all":
        tabText = "All";
        break;
      case "participation":
        tabText = "Participation";
        break;
      case "invites":
        tabText = "Invites & Co-Hosts";
        break;
      case "edits":
        tabText = "Edits & Updates";
        break;
      case "cancellations":
        tabText = "Cancellations & Deletions";
        break;
    }
    
    return (
      <div className="flex flex-col gap-1">
        <DialogTitle className="text-2xl">{tabText}</DialogTitle>
        <div className="text-[#9b87f5] font-bold text-xl">{countText}</div>
      </div>
    );
  };

  const ActivityList = ({ data }: { data: ActivityItem[] }) => (
    <div className="space-y-6">
      {data.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1">
            <p className="text-sm">{getActivityMessage(activity)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {formatJoinDate(activity.timestamp)}
            </p>
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <div className="flex items-center justify-center p-6">
          <p className="text-muted-foreground">No activities to display</p>
        </div>
      )}
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
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="participation" className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" /> 
                    Participation
                  </TabsTrigger>
                  <TabsTrigger value="invites" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> 
                    Invites
                  </TabsTrigger>
                  <TabsTrigger value="edits" className="flex items-center gap-1">
                    <Edit className="h-4 w-4" /> 
                    Edits
                  </TabsTrigger>
                  <TabsTrigger value="cancellations" className="flex items-center gap-1">
                    <Trash2 className="h-4 w-4" /> 
                    Cancellations
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSortDirection}
              className="self-end flex items-center gap-1 mt-2"
            >
              Sort by {sortDirection === "asc" ? "Oldest" : "Newest"}
              {sortDirection === "asc" ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </Button>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <TabsContent value="all" className="mt-0">
              <ActivityList data={currentActivities} />
            </TabsContent>
            <TabsContent value="participation" className="mt-0">
              <ActivityList data={currentActivities} />
            </TabsContent>
            <TabsContent value="invites" className="mt-0">
              <ActivityList data={currentActivities} />
            </TabsContent>
            <TabsContent value="edits" className="mt-0">
              <ActivityList data={currentActivities} />
            </TabsContent>
            <TabsContent value="cancellations" className="mt-0">
              <ActivityList data={currentActivities} />
            </TabsContent>
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
                {[10, 25, 50].map((value) => (
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
