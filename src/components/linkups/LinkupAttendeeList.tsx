
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Attendee {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface LinkupAttendeeListProps {
  attendees: Attendee[];
}

export function LinkupAttendeeList({ attendees }: LinkupAttendeeListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {attendees.map((attendee) => (
        <div key={attendee.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={attendee.avatar} alt={attendee.name} />
              <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{attendee.name}</p>
              <p className="text-sm text-muted-foreground">@{attendee.username}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">View</Button>
        </div>
      ))}
    </div>
  );
}
