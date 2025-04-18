
import { MessageSquare, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatActivity {
  id: string;
  type: 'linkup' | 'friend';
  with: string;
  lastMessage: string;
  timestamp: string;
}

interface LinkupActivity {
  id: string;
  type: 'sent' | 'accepted' | 'requested' | 'joined';
  linkupName: string;
  timestamp: string;
}

interface UserActivityProps {
  chatActivity: ChatActivity[];
  linkupActivity: LinkupActivity[];
}

export const UserActivity = ({ chatActivity, linkupActivity }: UserActivityProps) => {
  const getBadgeVariant = (type: LinkupActivity['type']) => {
    switch (type) {
      case 'sent':
        return 'default';
      case 'accepted':
        return 'success';
      case 'requested':
        return 'secondary';
      case 'joined':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getActivityText = (activity: LinkupActivity) => {
    switch (activity.type) {
      case 'sent':
        return 'Sent invite to';
      case 'accepted':
        return 'Accepted invite to';
      case 'requested':
        return 'Requested to join';
      case 'joined':
        return 'Joined';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-linkup-purple" />
            Chat Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {chatActivity.map((chat) => (
                <div key={chat.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant={chat.type === 'linkup' ? 'default' : 'outline'}>
                        {chat.type === 'linkup' ? 'Linkup Chat' : 'Friend Chat'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        with {chat.with}
                      </span>
                    </div>
                    <p className="mt-1 text-sm truncate">{chat.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(chat.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-linkup-purple" />
            Linkup Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {linkupActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant={getBadgeVariant(activity.type)}>
                        {getActivityText(activity)}
                      </Badge>
                      <span className="font-medium">{activity.linkupName}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
