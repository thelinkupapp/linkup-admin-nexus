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
  Calendar
} from "lucide-react";
import { ActivityFilters } from "@/components/dashboard/ActivityFilters";
import { DateRangeFilter } from "@/types/activityFilters";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addDays, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";

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

const now = new Date();
const activities: ActivityItem[] = [
  {
    id: "1",
    type: "request_join",
    linkupName: "Weekend Hiking Trip",
    linkupId: "hiking-1",
    timestamp: subDays(now, 1).toISOString()
  },
  {
    id: "2",
    type: "joined",
    linkupName: "Sunset Beach Volleyball",
    linkupId: "volleyball-1",
    timestamp: subDays(now, 2).toISOString()
  },
  {
    id: "3",
    type: "accepted_join",
    linkupName: "Book Club Meeting",
    linkupId: "book-1",
    timestamp: subDays(now, 3).toISOString()
  },
  {
    id: "14",
    type: "other_joined",
    linkupName: "Jack's Weekly Meetup",
    linkupId: "meetup-1",
    otherUserFirstName: "Alex",
    otherUserId: "user-alex",
    timestamp: subDays(now, 2).toISOString()
  },
  {
    id: "15",
    type: "received_join_request",
    linkupName: "Coding Workshop",
    linkupId: "coding-1",
    otherUserFirstName: "Michael",
    otherUserId: "user-michael",
    timestamp: subDays(now, 4).toISOString()
  },
  {
    id: "16",
    type: "accept_join_request",
    linkupName: "Yoga Class",
    linkupId: "yoga-3",
    otherUserFirstName: "Jessica",
    otherUserId: "user-jessica",
    timestamp: subDays(now, 3).toISOString()
  },
  {
    id: "17",
    type: "decline_join_request",
    linkupName: "Private Dinner Party",
    linkupId: "dinner-1",
    otherUserFirstName: "Ryan",
    otherUserId: "user-ryan",
    timestamp: subDays(now, 5).toISOString()
  },
  {
    id: "18",
    type: "join_request_declined",
    linkupName: "Executive Networking Event",
    linkupId: "network-2",
    otherUserFirstName: "Catherine",
    otherUserId: "user-catherine",
    timestamp: subDays(now, 6).toISOString()
  },
  {
    id: "19",
    type: "left_linkup",
    linkupName: "Weekly Book Club",
    linkupId: "book-2",
    timestamp: subDays(now, 5).toISOString()
  },
  {
    id: "20",
    type: "removed_from",
    linkupName: "Private Gaming Session",
    linkupId: "gaming-1",
    timestamp: subDays(now, 4).toISOString()
  },
  {
    id: "21",
    type: "removed_user",
    linkupName: "Meditation Circle",
    linkupId: "meditation-1",
    otherUserFirstName: "Daniel",
    otherUserId: "user-daniel",
    timestamp: subDays(now, 6).toISOString()
  },
  {
    id: "4",
    type: "accepted_invite",
    linkupName: "Cooking Class",
    linkupId: "cooking-1",
    otherUserFirstName: "Sarah",
    otherUserId: "user-sarah",
    timestamp: subDays(now, 3).toISOString()
  },
  {
    id: "5",
    type: "sent_invite",
    linkupName: "Downtown Art Gallery Opening",
    linkupId: "art-1",
    otherUserFirstName: "Emily",
    otherUserId: "user-emily",
    timestamp: subDays(now, 2).toISOString()
  },
  {
    id: "6",
    type: "invite_cohost",
    linkupName: "Tech Meetup",
    linkupId: "tech-1",
    otherUserFirstName: "David",
    otherUserId: "user-david",
    timestamp: subDays(now, 5).toISOString()
  },
  {
    id: "7",
    type: "accept_cohost",
    linkupName: "Photography Workshop",
    linkupId: "photo-1",
    otherUserFirstName: "Lisa",
    otherUserId: "user-lisa",
    timestamp: subDays(now, 6).toISOString()
  },
  {
    id: "13",
    type: "received_invite",
    linkupName: "Photography Workshop",
    linkupId: "photo-2",
    timestamp: subDays(now, 4).toISOString(),
    otherUserFirstName: "Emma",
    otherUserId: "user-emma"
  },
  {
    id: "22",
    type: "declined_invite",
    linkupName: "Weekend Camping Trip",
    linkupId: "camping-1",
    timestamp: subDays(now, 5).toISOString()
  },
  {
    id: "23",
    type: "received_cohost_invite",
    linkupName: "Community Fundraiser",
    linkupId: "fundraiser-1",
    otherUserFirstName: "Rachel",
    otherUserId: "user-rachel",
    timestamp: subDays(now, 2).toISOString()
  },
  {
    id: "24",
    type: "decline_cohost",
    linkupName: "Corporate Workshop",
    linkupId: "corporate-1",
    otherUserFirstName: "Thomas",
    otherUserId: "user-thomas",
    timestamp: subDays(now, 7).toISOString()
  },
  {
    id: "25",
    type: "removed_cohost",
    linkupName: "Art Exhibition",
    linkupId: "art-3",
    otherUserFirstName: "Olivia",
    otherUserId: "user-olivia",
    timestamp: subDays(now, 3).toISOString()
  },
  {
    id: "26",
    type: "removed_as_cohost",
    linkupName: "Music Festival",
    linkupId: "music-1",
    otherUserFirstName: "Nathan",
    otherUserId: "user-nathan",
    timestamp: subDays(now, 6).toISOString()
  },
  {
    id: "8",
    type: "change_location",
    linkupName: "Networking Event",
    linkupId: "network-1",
    timestamp: subDays(now, 2).toISOString()
  },
  {
    id: "9",
    type: "reschedule",
    linkupName: "Rooftop Yoga Session",
    linkupId: "yoga-1",
    timestamp: subDays(now, 1).toISOString(),
    newDateTime: addDays(now, 5).toISOString()
  },
  {
    id: "10",
    type: "update_details",
    linkupName: "Yoga in the Park",
    linkupId: "yoga-2",
    timestamp: subDays(now, 3).toISOString()
  },
  {
    id: "11",
    type: "cancel",
    linkupName: "Movie Night",
    linkupId: "movie-1",
    timestamp: subDays(now, 2).toISOString()
  },
  {
    id: "12",
    type: "delete",
    linkupName: "Art Exhibition",
    linkupId: "art-2",
    timestamp: subDays(now, 4).toISOString()
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
    case "other_joined":
    case "received_join_request":
    case "accept_join_request":
    case "decline_join_request":
    case "join_request_declined":
    case "left_linkup":
    case "removed_from":
    case "removed_user":
      return <LinkIcon className="h-5 w-5 text-green-500" />;
    case "sent_invite":
    case "received_invite":
    case "accepted_invite":
    case "declined_invite":
    case "invite_cohost":
    case "received_cohost_invite":
    case "accept_cohost":
    case "decline_cohost":
    case "removed_cohost":
    case "removed_as_cohost":
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    dateRange: 'last-7-days' as DateRangeFilter,
    search: '',
    participation: {
      type: [],
      involvement: []
    },
    invites: {
      type: [],
      status: [],
      role: []
    },
    edits: {
      changeType: []
    },
    cancellations: {
      action: [],
      actor: []
    }
  });
  
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined
  });

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    if (range.from && range.to) {
      setFilters({
        ...filters,
        dateRange: 'custom'
      });
    }
  };

  const filterActivities = (activities: ActivityItem[]) => {
    let tabFiltered = activeTab === "all" 
      ? activities 
      : activities.filter(activity => activityMatchesTab(activity, activeTab));

    return tabFiltered.filter(activity => {
      if (searchQuery) {
        const searchText = searchQuery.toLowerCase();
        const matchesLinkup = activity.linkupName.toLowerCase().includes(searchText);
        const matchesPerson = activity.otherUserFirstName?.toLowerCase().includes(searchText);
        if (!matchesLinkup && !matchesPerson) {
          return false;
        }
      }

      const activityDate = new Date(activity.timestamp);
      const now = new Date();
      
      if (filters.dateRange === 'last-7-days') {
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        if (activityDate < sevenDaysAgo) {
          return false;
        }
      } else if (filters.dateRange === 'this-month') {
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        if (activityDate < firstDayOfMonth) {
          return false;
        }
      } else if (filters.dateRange === 'last-month') {
        const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const firstDayOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        if (activityDate < firstDayOfLastMonth || activityDate >= firstDayOfThisMonth) {
          return false;
        }
      } else if (filters.dateRange === 'custom' && dateRange.from && dateRange.to) {
        const from = new Date(dateRange.from);
        const to = new Date(dateRange.to);
        to.setHours(23, 59, 59, 999);
        if (activityDate < from || activityDate > to) {
          return false;
        }
      }

      const tabFilters = filters[activeTab as keyof typeof filters];
      if (!tabFilters || typeof tabFilters !== 'object') return true;

      switch (activeTab) {
        case 'participation': {
          const participationFilters = filters.participation;
          
          if (participationFilters.type.length > 0) {
            const typeMap: Record<string, ActivityItem["type"][]> = {
              "joined": ["joined"],
              "left_removed": ["left_linkup", "removed_from", "removed_user"],
              "requested": ["request_join", "received_join_request"],
              "accepted_declined": ["accepted_join", "accept_join_request", "decline_join_request", "join_request_declined"]
            };
            
            let matchesType = false;
            for (const filterType of participationFilters.type) {
              const activityTypes = typeMap[filterType] || [];
              if (activityTypes.includes(activity.type)) {
                matchesType = true;
                break;
              }
            }
            
            if (!matchesType) return false;
          }
          
          if (participationFilters.involvement.length > 0) {
            const isHost = ["other_joined", "received_join_request", "accept_join_request", 
                           "decline_join_request", "removed_user"].includes(activity.type);
            
            if (participationFilters.involvement.includes("host") && !isHost) return false;
            if (participationFilters.involvement.includes("attendee") && isHost) return false;
          }
          
          break;
        }
        
        case 'invites': {
          const inviteFilters = filters.invites;
          
          if (inviteFilters.type.length > 0) {
            const typeMap: Record<string, ActivityItem["type"][]> = {
              "invite_join": ["sent_invite", "received_invite", "accepted_invite", "declined_invite"],
              "invite_cohost": ["invite_cohost", "received_cohost_invite", "accept_cohost", "decline_cohost", "removed_cohost", "removed_as_cohost"]
            };
            
            let matchesType = false;
            for (const filterType of inviteFilters.type) {
              const activityTypes = typeMap[filterType] || [];
              if (activityTypes.includes(activity.type)) {
                matchesType = true;
                break;
              }
            }
            
            if (!matchesType) return false;
          }
          
          if (inviteFilters.status.length > 0) {
            const statusMap: Record<string, ActivityItem["type"][]> = {
              "sent": ["sent_invite", "invite_cohost"],
              "received": ["received_invite", "received_cohost_invite"],
              "accepted": ["accepted_invite", "accept_cohost"],
              "declined": ["declined_invite", "decline_cohost"]
            };
            
            let matchesStatus = false;
            for (const status of inviteFilters.status) {
              const activityTypes = statusMap[status] || [];
              if (activityTypes.includes(activity.type)) {
                matchesStatus = true;
                break;
              }
            }
            
            if (!matchesStatus) return false;
          }
          
          if (inviteFilters.role.length > 0) {
            const isCohost = ["invite_cohost", "received_cohost_invite", "accept_cohost", 
                             "decline_cohost", "removed_cohost", "removed_as_cohost"].includes(activity.type);
            const isRegularHost = !isCohost;
            
            if (inviteFilters.role.includes("host") && !isRegularHost) return false;
            if (inviteFilters.role.includes("cohost") && !isCohost) return false;
          }
          
          break;
        }
        
        case 'edits': {
          const editFilters = filters.edits;
          
          if (editFilters.changeType.length > 0) {
            const changeTypeMap: Record<string, ActivityItem["type"][]> = {
              "location": ["change_location"],
              "datetime": ["reschedule"],
              "other": ["update_details"]
            };
            
            let matchesChangeType = false;
            for (const changeType of editFilters.changeType) {
              const activityTypes = changeTypeMap[changeType] || [];
              if (activityTypes.includes(activity.type)) {
                matchesChangeType = true;
                break;
              }
            }
            
            if (!matchesChangeType) return false;
          }
          
          break;
        }
        
        case 'cancellations': {
          const cancellationFilters = filters.cancellations;
          
          if (cancellationFilters.action.length > 0) {
            const actionMap: Record<string, ActivityItem["type"][]> = {
              "cancelled": ["cancel"],
              "deleted": ["delete"]
            };
            
            let matchesAction = false;
            for (const action of cancellationFilters.action) {
              const activityTypes = actionMap[action] || [];
              if (activityTypes.includes(activity.type)) {
                matchesAction = true;
                break;
              }
            }
            
            if (!matchesAction) return false;
          }
          
          break;
        }
      }
      
      return true;
    });
  };

  const filteredActivities = filterActivities(activities);

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

  const getDateRangeLabel = () => {
    if (filters.dateRange !== 'custom' || !dateRange.from || !dateRange.to) {
      return '';
    }
    
    return `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
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
            <ActivityFilters
              activeTab={activeTab}
              selectedFilters={filters}
              onFilterChange={setFilters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
            />
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {filteredActivities.length > 0 ? (
                currentActivities.map((activity) => (
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
                ))
              ) : (
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
            {totalPages > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1; // Simple case for first few pages
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNumber)}
                          isActive={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
