
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pin } from "lucide-react";

interface ChatMessage {
  id: string;
  type: "text" | "image" | "video" | "voice" | "gif";
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  media?: {
    url: string;
    type: string;
    thumbnail?: string;
  };
}

interface PinnedMessage {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
}

interface LinkupChatViewProps {
  messages: ChatMessage[];
  pinnedMessage?: PinnedMessage;
}

export function LinkupChatView({ messages, pinnedMessage }: LinkupChatViewProps) {
  return (
    <div className="space-y-6">
      {pinnedMessage && (
        <div className="p-3 bg-linkup-soft-purple rounded-md border border-linkup-purple/30 flex items-start gap-3 mb-6">
          <Pin className="h-4 w-4 text-linkup-purple mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">Pinned Message</p>
            <p className="text-sm">{pinnedMessage.message}</p>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={pinnedMessage.user.avatar} alt={pinnedMessage.user.name} />
                <AvatarFallback>{pinnedMessage.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs">{pinnedMessage.user.name}</span>
            </div>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div key={message.id} className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={message.user.avatar} alt={message.user.name} />
            <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="font-medium">{message.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </div>
            
            {message.type === "text" && <p className="mt-1">{message.message}</p>}
            
            {message.type === "image" && message.media && (
              <div className="mt-2">
                <p className="mb-2">{message.message}</p>
                <div className="rounded-md overflow-hidden border w-full max-w-xs">
                  <img 
                    src={message.media.url} 
                    alt="Shared media"
                    className="w-full h-auto" 
                  />
                </div>
              </div>
            )}
            
            {message.type === "video" && message.media && (
              <div className="mt-2">
                <p className="mb-2">{message.message}</p>
                <div className="rounded-md overflow-hidden border w-full max-w-xs">
                  <video 
                    src={message.media.url} 
                    controls
                    poster={message.media.thumbnail} 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
