
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Calendar } from "lucide-react";
import { formatJoinDate } from "@/utils/dateFormatting";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

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

type DateRangeFilter = 'last-7-days' | 'this-month' | 'last-month' | 'custom';

const dateRangeOptions = [
  { value: 'last-7-days', label: 'Last 7 days' },
  { value: 'this-month', label: 'This month' },
  { value: 'last-month', label: 'Last month' },
  { value: 'custom', label: 'Custom range' }
];

// Sample data - in a real app this would come from your backend
const chatMessages: ChatMessage[] = [
  {
    id: "1",
    linkupId: "hiking-1",
    linkupName: "Weekend Hiking Trip",
    message: "Hey everyone! Who's bringing the trail mix?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    sender: {
      name: "Jack Peagam",
      avatar: "https://i.pravatar.cc/150?u=jack"
    }
  },
  {
    id: "2",
    linkupId: "tech-1",
    linkupName: "Tech Meetup",
    message: "I'll be presenting about React hooks!",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    sender: {
      name: "Jack Peagam",
      avatar: "https://i.pravatar.cc/150?u=jack"
    }
  },
  {
    id: "3",
    linkupId: "book-1",
    linkupName: "Book Club Meeting",
    message: "The plot twist in chapter 7 was incredible!",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    sender: {
      name: "Jack Peagam",
      avatar: "https://i.pravatar.cc/150?u=jack"
    }
  }
];

export function UserLinkupChats() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateRangeFilter>('last-7-days');

  const handleDateRangeSelection = (value: DateRangeFilter) => {
    setSelectedDateFilter(value);
    if (value !== 'custom') {
      setDateRange(undefined);
    }
  };

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
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl flex items-center gap-2">
                <MessageCircle className="h-6 w-6" />
                Chat History
              </DialogTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {selectedDateFilter === 'custom' && dateRange?.from && dateRange?.to ? (
                      <span className="truncate">
                        {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                      </span>
                    ) : (
                      <span>
                        {dateRangeOptions.find(option => option.value === selectedDateFilter)?.label || 'Select date range'}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="end">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      {dateRangeOptions.map((option) => (
                        <div key={option.value} className="flex items-center gap-2">
                          <Checkbox 
                            id={`date-range-${option.value}`}
                            checked={selectedDateFilter === option.value}
                            onCheckedChange={() => handleDateRangeSelection(option.value as DateRangeFilter)}
                            className="cursor-pointer hover:bg-primary/10 transition-colors"
                          />
                          <label
                            htmlFor={`date-range-${option.value}`}
                            className="text-sm cursor-pointer w-full hover:text-primary transition-colors"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    {selectedDateFilter === 'custom' && (
                      <div className="pt-4">
                        <Separator className="mb-4" />
                        <div className="grid gap-2">
                          <CalendarComponent
                            mode="range"
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
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

