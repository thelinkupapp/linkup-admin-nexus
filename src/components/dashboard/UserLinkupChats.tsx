
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { formatJoinDate } from "@/utils/dateFormatting";

interface ChatMessage {
  id: string;
  linkupId: string;
  linkupName: string;
  message: string;
  timestamp: string;
  sender: {
    name: string;
    avatar: string;
  };
}

// Sample data - in a real app this would come from your backend
const chatMessages: ChatMessage[] = [
  {
    id: "1",
    linkupId: "hiking-1",
    linkupName: "Weekend Hiking Trip",
    message: "Hey everyone! Looking forward to the hike tomorrow!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    sender: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    }
  },
  {
    id: "2",
    linkupId: "yoga-1",
    linkupName: "Rooftop Yoga Session",
    message: "What time should we arrive for setup?",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    sender: {
      name: "Mike Richards",
      avatar: "https://i.pravatar.cc/150?u=mike"
    }
  },
  {
    id: "3",
    linkupId: "book-1",
    linkupName: "Book Club Meeting",
    message: "I just finished the chapter, it was amazing!",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    sender: {
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?u=emma"
    }
  },
  {
    id: "4",
    linkupId: "tech-1",
    linkupName: "Tech Meetup",
    message: "Can someone share the presentation slides?",
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    sender: {
      name: "David Chen",
      avatar: "https://i.pravatar.cc/150?u=david"
    }
  }
];

export function UserLinkupChats() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chats</h2>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          View All
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {chatMessages.slice(0, 3).map((message) => (
          <div key={message.id} className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
              <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{message.sender.name}</span>
                <span className="text-sm text-muted-foreground">in</span>
                <Link 
                  to={`/linkups/${message.linkupId}`}
                  className="font-medium hover:underline"
                >
                  {message.linkupName}
                </Link>
              </div>
              <p className="text-sm mt-1">{message.message}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {formatJoinDate(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Chat History
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {chatMessages.map((message) => (
                <div key={message.id} className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.sender.name}</span>
                      <span className="text-sm text-muted-foreground">in</span>
                      <Link 
                        to={`/linkups/${message.linkupId}`}
                        className="font-medium hover:underline"
                      >
                        {message.linkupName}
                      </Link>
                    </div>
                    <p className="text-sm mt-1">{message.message}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatJoinDate(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
