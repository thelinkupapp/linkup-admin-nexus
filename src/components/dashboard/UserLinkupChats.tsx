import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Search, Calendar, Image, Video, Mic, Gift as GifIcon } from "lucide-react";
import { formatJoinDate } from "@/utils/dateFormatting";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChatMediaContent } from "./ChatMediaContent";

interface ChatMessage {
  id: string;
  linkupId: string;
  linkupName: string;
  message: string;
  timestamp: string;
  status: 'upcoming' | 'happened' | 'happening' | 'cancelled' | 'removed';
  sender: {
    name: string;
    avatar: string;
  };
  mediaType?: 'text' | 'image' | 'video' | 'gif' | 'voice';
  mediaUrl?: string;
}

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "upcoming", label: "Upcoming" },
  { value: "happening", label: "Happening" },
  { value: "happened", label: "Happened" },
  { value: "cancelled", label: "Cancelled" },
  { value: "removed", label: "Removed" }
];

const chatMessages: ChatMessage[] = [
  {
    id: "1",
    linkupId: "hiking-1",
    linkupName: "Weekend Hiking Trip",
    message: "Hey everyone! Who's bringing the trail mix?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: 'upcoming',
    sender: {
      name: "Jack Peagam",
      avatar: "/lovable-uploads/e3298a53-bda5-4cc9-9f92-f09065f5a448.png"
    },
    mediaType: 'text'
  },
  {
    id: "2",
    linkupId: "tech-1",
    linkupName: "Tech Meetup",
    message: "Check out my presentation slides!",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'happening',
    sender: {
      name: "Jack Peagam",
      avatar: "/lovable-uploads/e3298a53-bda5-4cc9-9f92-f09065f5a448.png"
    },
    mediaType: 'image',
    mediaUrl: "/lovable-uploads/2d714cfa-f1e3-488d-bb49-22aee977af8d.png"
  },
  {
    id: "3",
    linkupId: "book-1",
    linkupName: "Book Club Meeting",
    message: "My reaction to the plot twist",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: 'happened',
    sender: {
      name: "Jack Peagam",
      avatar: "/lovable-uploads/e3298a53-bda5-4cc9-9f92-f09065f5a448.png"
    },
    mediaType: 'gif',
    mediaUrl: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif"
  },
  {
    id: "4",
    linkupId: "music-1",
    linkupName: "Music Jam Session",
    message: "Here's my latest recording",
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    status: 'upcoming',
    sender: {
      name: "Jack Peagam",
      avatar: "/lovable-uploads/e3298a53-bda5-4cc9-9f92-f09065f5a448.png"
    },
    mediaType: 'voice',
    mediaUrl: "/audio-sample.mp3"
  },
  {
    id: "5",
    linkupId: "dance-1",
    linkupName: "Dance Workshop",
    message: "Tutorial for the new routine",
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    status: 'happening',
    sender: {
      name: "Jack Peagam",
      avatar: "/lovable-uploads/e3298a53-bda5-4cc9-9f92-f09065f5a448.png"
    },
    mediaType: 'video',
    mediaUrl: "/video-sample.mp4"
  }
];

const getUniqueLinkupsByStatus = (messages: ChatMessage[], status: string) => {
  if (status === 'all') {
    return Array.from(new Set(messages.map(msg => msg.linkupName)));
  }
  return Array.from(new Set(
    messages
      .filter(msg => msg.status === status)
      .map(msg => msg.linkupName)
  ));
};

const getMediaTypeIndicator = (mediaType?: string) => {
  if (!mediaType || mediaType === 'text') return null;

  const icons = {
    image: <Image className="h-4 w-4" />,
    video: <Video className="h-4 w-4" />,
    gif: <GifIcon className="h-4 w-4" />,
    voice: <Mic className="h-4 w-4" />
  };

  const labels = {
    image: "Image",
    video: "Video",
    gif: "GIF",
    voice: "Voice Message"
  };

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
      {icons[mediaType as keyof typeof icons]}
      <span>{labels[mediaType as keyof typeof labels]}</span>
    </div>
  );
};

export function UserLinkupChats() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLinkup, setSelectedLinkup] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [availableLinkups, setAvailableLinkups] = useState<string[]>(
    getUniqueLinkupsByStatus(chatMessages, 'all')
  );

  useEffect(() => {
    const newLinkups = getUniqueLinkupsByStatus(chatMessages, selectedStatus);
    setAvailableLinkups(newLinkups);
    if (!newLinkups.includes(selectedLinkup)) {
      setSelectedLinkup('all');
    }
  }, [selectedStatus]);

  const filteredMessages = chatMessages
    .filter(message => {
      const matchesSearch = message.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          message.linkupName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLinkup = selectedLinkup === "all" || message.linkupName === selectedLinkup;
      const matchesStatus = selectedStatus === "all" || message.status === selectedStatus;
      return matchesSearch && matchesLinkup && matchesStatus;
    });

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
              <Link 
                to={`/linkups/${message.linkupId}`}
                className="font-medium hover:underline"
              >
                {message.linkupName}
              </Link>
              <p className="text-sm mt-1">{message.message}</p>
              {getMediaTypeIndicator(message.mediaType)}
              <p className="text-sm text-muted-foreground mt-2">
                {formatJoinDate(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <div className="flex items-center justify-between mb-4">
              <DialogTitle className="text-2xl flex items-center gap-2">
                <MessageCircle className="h-6 w-6" />
                Chat History
              </DialogTitle>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages or linkups..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="min-w-[140px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLinkup} onValueChange={setSelectedLinkup}>
                  <SelectTrigger className="min-w-[160px]">
                    <SelectValue placeholder="Filter by Linkup" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Linkups</SelectItem>
                    {availableLinkups.map(linkup => (
                      <SelectItem key={linkup} value={linkup}>
                        {linkup}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogHeader>
          
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {filteredMessages.map((message) => (
                <div key={message.id} className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link 
                      to={`/linkups/${message.linkupId}`}
                      className="font-medium hover:underline"
                    >
                      {message.linkupName}
                    </Link>
                    <p className="text-sm mt-1">{message.message}</p>
                    <ChatMediaContent 
                      mediaType={message.mediaType}
                      mediaUrl={message.mediaUrl}
                      message={message.message}
                    />
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
