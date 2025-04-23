import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { Pin, Volume2, Play, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

export interface ChatMessage {
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
    duration?: string;
  };
}

export interface PinnedMessage {
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    
    const query = searchQuery.toLowerCase();
    return messages.filter(message => 
      message.message.toLowerCase().includes(query) ||
      message.user.name.toLowerCase().includes(query) ||
      message.user.username.toLowerCase().includes(query)
    );
  }, [messages, searchQuery]);

  const renderMessage = (message: ChatMessage) => {
    return (
      <div key={message.id} className="flex items-start gap-3 py-3 border-b last:border-b-0">
        <Link to={`/users/${message.user.username}`} className="flex-shrink-0">
          <Avatar>
            <AvatarImage src={message.user.avatar} alt={message.user.name} />
            <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Link 
              to={`/users/${message.user.username}`} 
              className="font-medium text-linkup-purple hover:underline transition-colors"
            >
              {message.user.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {new Date(message.timestamp).toLocaleString()}
            </p>
          </div>
          
          {message.type === "text" && (
            <p className="mt-1">{message.message}</p>
          )}
          
          {(message.type === "image" || message.type === "gif") && message.media && (
            <div className="mt-2">
              <p className="mb-2">{message.message}</p>
              <div className="rounded-md overflow-hidden border w-full max-w-xs">
                <img 
                  src={message.media.url} 
                  alt={message.type === "image" ? "Shared media" : "GIF"}
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

          {message.type === "voice" && message.media && (
            <div className="mt-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-linkup-soft-purple/10 max-w-xs">
                <div className="h-8 w-8 rounded-full bg-linkup-purple/20 flex items-center justify-center">
                  <Volume2 className="h-4 w-4 text-linkup-purple" />
                </div>
                <div className="flex-1">
                  <div className="h-1 bg-linkup-purple/20 rounded-full">
                    <div className="h-1 w-0 bg-linkup-purple rounded-full" />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <button className="text-linkup-purple hover:text-linkup-purple/80">
                      <Play className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {message.media.duration || "0:00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {pinnedMessage && (
        <div className="p-3 bg-linkup-soft-purple rounded-md border border-linkup-purple/30 flex items-start gap-3">
          <Pin className="h-4 w-4 text-linkup-purple mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">Pinned Message</p>
            <p className="text-sm">{pinnedMessage.message}</p>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={pinnedMessage.user.avatar} alt={pinnedMessage.user.name} />
                <AvatarFallback>{pinnedMessage.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Link 
                to={`/users/${pinnedMessage.user.username}`}
                className="text-xs text-linkup-purple hover:underline transition-colors"
              >
                {pinnedMessage.user.name}
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search messages, users or usernames..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <ScrollArea className="h-[calc(100vh-300px)] pr-4 border rounded-lg bg-white">
        <div className="p-4 space-y-2">
          {filteredMessages.length > 0 ? (
            filteredMessages.map(renderMessage)
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No messages found matching your search.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
