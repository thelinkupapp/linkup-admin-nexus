import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatJoinDate } from "@/utils/dateFormatting";
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
  ArrowDown, 
  ArrowUp 
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: 
    | "request_join" 
    | "joined" 
    | "accepted_join" 
    | "other_joined"
    | "received_join_request"
    | "accept_join_request"
    | "decline_join_request"
    | "join_request_declined"
    | "left_linkup"
    | "removed_from"
    | "removed_user"
    | "sent_invite" 
    | "received_invite"
    | "accepted_invite"
    | "declined_invite"
    | "invite_cohost"
    | "received_cohost_invite"
    | "accept_cohost"
    | "decline_cohost"
    | "removed_cohost"
    | "removed_as_cohost"
    | "change_location"
    | "reschedule"
    | "update_details"
    | "cancel"
    | "delete";
  linkupName: string;
  linkupId: string;
  timestamp: string;
  otherUserFirstName?: string;
  otherUserId?: string;
  newDateTime?: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "request_join",
    linkupName: "Weekend Hiking Trip",
    linkupId: "hiking-1",
    timestamp: "2024-04-16T11:30:00Z"
  },
  {
    id: "2",
    type: "joined",
    linkupName: "Sunset Beach Volleyball",
    linkupId: "volleyball-1",
    timestamp: "2024-04-18T15:30:00Z"
  },
  {
    id: "3",
    type: "accepted_join",
    linkupName: "Book Club Meeting",
    linkupId: "book-1",
    timestamp: "2024-04-14T14:00:00Z"
  },
  {
    id: "4",
    type: "accepted_invite",
    linkupName: "Cooking Class",
    linkupId: "cooking-1",
    otherUserFirstName: "Sarah",
    otherUserId: "user-sarah",
    timestamp: "2024-04-13T18:30:00Z"
  },
  {
    id: "5",
    type: "sent_invite",
    linkupName: "Downtown Art Gallery Opening",
    linkupId: "art-1",
    otherUserFirstName: "Emily",
    otherUserId: "user-emily",
    timestamp: "2024-04-15T10:00:00Z"
  },
  {
    id: "6",
    type: "invite_cohost",
    linkupName: "Tech Meetup",
    linkupId: "tech-1",
    otherUserFirstName: "David",
    otherUserId: "user-david",
    timestamp: "2024-04-12T19:00:00Z"
  },
  {
    id: "7",
    type: "accept_cohost",
    linkupName: "Photography Workshop",
    linkupId: "photo-1",
    otherUserFirstName: "Lisa",
    otherUserId: "user-lisa",
    timestamp: "2024-04-11T16:45:00Z"
  },
  {
    id: "8",
    type: "change_location",
    linkupName: "Networking Event",
    linkupId: "network-1",
    timestamp: "2024-04-09T12:15:00Z"
  },
  {
    id: "9",
    type: "reschedule",
    linkupName: "Rooftop Yoga Session",
    linkupId: "yoga-1",
    timestamp: "2024-04-10T09:00:00Z",
    newDateTime: "2024-04-15T08:00:00Z"
  },
  {
    id: "10",
    type: "update_details",
    linkupName: "Yoga in the Park",
    linkupId: "yoga-2",
    timestamp: "2024-04-08T08:30:00Z"
  },
  {
    id: "11",
    type: "cancel",
    linkupName: "Movie Night",
    linkupId: "movie-1",
    timestamp: "2024-04-07T20:00:00Z"
  },
  {
    id: "12",
    type: "delete",
    linkupName: "Art Exhibition",
    linkupId: "art-2",
    timestamp: "2024-04-06T15:00:00Z"
  },
  {
    id: "13",
    type: "received_invite",
    linkupName: "Photography Workshop",
    linkupId: "photo-2",
    timestamp: "2024-04-05T14:00:00Z",
    otherUserFirstName: "Emma",
    otherUserId: "user-emma"
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
    // Participation
    case "request_join":
      return <span>Jack requested to join {linkupLink}</span>;
    case "joined":
      return <span>Jack joined {linkupLink}</span>;
    case "accepted_join":
      return <span>Jack was accepted to join {linkupLink}</span>;
    case "other_joined":
      return <span>{otherUserLink} joined Jack's linkup {linkupLink}</span>;
    case "received_join_request":
      return <span>Jack received a request from {otherUserLink} to join {linkupLink}</span>;
    case "accept_join_request":
      return <span>Jack accepted {otherUserLink}'s request to join {linkupLink}</span>;
    case "decline_join_request":
      return <span>Jack declined {otherUserLink}'s request to join {linkupLink}</span>;
    case "join_request_declined":
      return <span>Jack's request to join {linkupLink} was declined by {otherUserLink}</span>;
    case "left_linkup":
      return <span>Jack left {linkupLink}</span>;
    case "removed_from":
      return <span>Jack was removed from {linkupLink}</span>;
    case "removed_user":
      return <span>Jack removed {otherUserLink} from {linkupLink}</span>;

    // Invites & Co-Hosting
    case "sent_invite":
      return <span>Jack invited {otherUserLink} to join {linkupLink}</span>;
    case "received_invite":
      return <span>Jack received an invite from {otherUserLink} to join {linkupLink}</span>;
    case "accepted_invite":
      return <span>Jack accepted {otherUserLink}'s invite to join {linkupLink}</span>;
    case "declined_invite":
      return <span>Jack declined invite to join {linkupLink}</span>;
    case "invite_cohost":
      return <span>Jack invited {otherUserLink} to co-host their linkup {linkupLink}</span>;
    case "received_cohost_invite":
      return <span>Jack received an invite from {otherUserLink} to co-host {linkupLink}</span>;
    case "accept_cohost":
      return <span>Jack accepted {otherUserLink}'s invite to co-host {linkupLink}</span>;
    case "decline_cohost":
      return <span>Jack declined co-host invite from {otherUserLink}</span>;
    case "removed_cohost":
      return <span>Jack removed {otherUserLink} as co-host of {linkupLink}</span>;
    case "removed_as_cohost":
      return <span>Jack was removed as co-host of {linkupLink} by {otherUserLink}</span>;

    // Edits & Updates
    case "change_location":
      return <span>Jack changed the location for {linkupLink}</span>;
    case "reschedule":
      return (
        <span>
          Jack rescheduled {linkupLink} to {formatJoinDate(activity.newDateTime || "")}
        </span>
      );
    case "update_details":
      return <span>Jack updated details for {linkupLink}</span>;

    // Cancellations & Deletions
    case "cancel":
      return <span>Jack cancelled {linkupLink}</span>;
    case "delete":
      return <span>Jack deleted {linkupLink}</span>;
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
      return <LinkIcon className="h-5 w-5 text-green-500" />;
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

function activityMatchesTab(activity: ActivityItem, tab: string): boolean {
  switch (tab) {
    case "participation":
      return [
        "request_join", 
        "joined", 
        "accepted_join", 
        "other_joined",
        "received_join_request",
        "accept_join_request",
        "decline_join_request",
        "join_request_declined",
        "left_linkup",
        "removed_from",
        "removed_user"
      ].includes(activity.type);
    case "invites":
      return [
        "sent_invite",
        "received_invite",
        "accepted_invite",
        "declined_invite",
        "invite_cohost",
        "received_cohost_invite",
        "accept_cohost",
        "decline_cohost",
        "removed_cohost",
        "removed_as_cohost"
      ].includes(activity.type);
    case "edits":
      return ["change_location", "reschedule", "update_details"].includes(activity.type);
    case "cancellations":
      return ["cancel", "delete"].includes(activity.type);
    default:
      return true; // "all" tab
  }
}

export function UserLinkupActivity() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredActivities = activities.filter(activity => 
    activityMatchesTab(activity, activeTab)
  );

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  const totalFiltered = filteredActivities.length;
  
  const totalPages = Math.ceil(sortedActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = sortedActivities.slice(startIndex, endIndex);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };

  const getHeaderText = () => {
    let tabText = "";
    let countText = `${totalFiltered} activities`;
    
    switch (activeTab) {
      case "all":
        tabText = "All Activities";
        break;
      case "participation":
        tabText = "🔗 Participation";
        break;
      case "invites":
        tabText = "📨 Invites & Co-Hosts";
        break;
      case "edits":
        tabText = "🛠️ Edits & Updates";
        break;
      case "cancellations":
        tabText = "🗑️ Cancellations & Deletions";
        break;
    }
    
    return (
      <div className="flex flex-col gap-1">
        <DialogTitle className="text-2xl">{tabText}</DialogTitle>
        <div className="text-[#9b87f5] font-bold text-xl">{countText}</div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Activity</h2>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          View All
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {activities.slice(0, 3).map((activity) => (
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
      </div>

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
                    Updates
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
            <div className="space-y-6">
              {currentActivities.map((activity) => (
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
              {currentActivities.length === 0 && (
                <div className="flex items-center justify-center p-6">
                  <p className="text-muted-foreground">No activities to display</p>
                </div>
              )}
            </div>
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
