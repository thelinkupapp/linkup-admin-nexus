
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface Attendee {
  id: string;
  name: string;
  username: string;
  avatar: string;
  joinedAt: string;
  role?: "host" | "co-host" | undefined;
}

interface LinkupAttendeeListProps {
  host: Attendee;
  coHosts: Attendee[];
  attendees: Attendee[];
}

export function LinkupAttendeeList({ host, coHosts, attendees }: LinkupAttendeeListProps) {
  // Combine and sort all attendees
  const allAttendees = [
    { ...host, role: "host" as const },
    ...coHosts.map(coHost => ({ ...coHost, role: "co-host" as const })),
    ...attendees
  ];

  const getRoleBadge = (role?: "host" | "co-host" | undefined) => {
    if (!role) return null;
    
    return (
      <Badge variant="outline" className={
        role === "host" 
          ? "border-linkup-purple bg-linkup-soft-purple/20 text-linkup-purple" 
          : "border-purple-400 bg-purple-50 text-purple-600"
      }>
        {role === "host" ? "Host" : "Co-host"}
      </Badge>
    );
  };

  return (
    <div className="space-y-3">
      {allAttendees.map((attendee) => (
        <div 
          key={attendee.id} 
          className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-linkup-purple/30 hover:bg-linkup-soft-purple/5 transition-all"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage src={attendee.avatar} alt={attendee.name} />
              <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Link 
                  to={`/users/${attendee.username}`} 
                  className="font-semibold text-lg hover:text-linkup-purple hover:underline decoration-linkup-purple"
                >
                  {attendee.name}
                </Link>
                {getRoleBadge(attendee.role)}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>@{attendee.username}</span>
                <span>•</span>
                <span>Joined {format(new Date(attendee.joinedAt), 'MMM d, h:mm a')}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
