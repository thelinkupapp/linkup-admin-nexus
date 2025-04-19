import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatJoinDate } from "@/utils/dateFormatting";
import { useState } from "react";

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
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Activity</h2>
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            View All
          </Button>
        </div>
        <ActivityList data={activities.slice(0, 5)} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>All Activity</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <ActivityList data={activities} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
