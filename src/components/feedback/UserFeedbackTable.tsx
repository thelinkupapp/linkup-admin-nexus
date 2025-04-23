
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Filter, Search, Check, ArrowUp, ArrowDown, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Feedback {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  type: "Feature Request" | "Bug Report" | "Suggestion" | "Other";
  content: string;
  timestamp: string;
  status: "Read" | "Unread";
}

const INITIAL_FEEDBACK: Feedback[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Sarah Wilson",
      username: "@sarahw",
      avatar: "/lovable-uploads/2e089ec4-e032-49e1-af97-37742c6d61ea.png"
    },
    type: "Feature Request",
    content: "Would love to see a dark mode option in the app!",
    timestamp: "2025-04-17T11:30:00Z",
    status: "Unread"
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "David Williams",
      username: "@davidw",
      avatar: "/lovable-uploads/71376d09-ccf7-4580-91f7-0c7e70d3d9e6.png"
    },
    type: "Bug Report",
    content: "App crashes when uploading multiple photos at once. This has been happening consistently when I try to upload more than 3 photos to my profile. Steps to reproduce: 1. Go to profile settings 2. Try to upload 4+ photos at once 3. App freezes and then crashes",
    timestamp: "2025-04-16T16:45:00Z",
    status: "Read"
  }
];

export function UserFeedbackTable() {
  const [feedback, setFeedback] = useState<Feedback[]>(INITIAL_FEEDBACK);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "read" | "unread">("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const { toast } = useToast();

  const handleMarkAsRead = (feedbackId: string) => {
    setFeedback(prev => 
      prev.map(item => 
        item.id === feedbackId 
          ? { ...item, status: "Read" } 
          : item
      )
    );

    toast({
      title: "Feedback marked as read",
      description: "The feedback has been updated successfully.",
    });
  };

  const filteredFeedback = feedback
    .filter(item => {
      const matchesSearch = 
        item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = 
        statusFilter === "all" || 
        item.status.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

  const unreadCount = feedback.filter(item => item.status === "Unread").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[42px] font-bold tracking-tight text-[#23252b] mb-2">
          User Feedback
        </h1>
        <p className="text-[#6B7280] text-lg font-normal">
          Review and manage user feedback submissions
        </p>
        <div className="flex items-center gap-2 mt-6">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
            <AlertCircle className="h-5 w-5 text-violet-700" />
          </span>
          <span className="text-xl text-[#23252b]">
            {unreadCount} unread {unreadCount === 1 ? 'feedback' : 'feedbacks'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 max-w-md"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value: "all" | "read" | "unread") => setStatusFilter(value)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Feedback" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Feedback</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground" 
                onClick={() => setSortDirection(prev => prev === "asc" ? "desc" : "asc")}
              >
                <div className="flex items-center gap-2">
                  Date & Time
                  <div className="flex flex-col">
                    <ArrowUp className={`h-3 w-3 ${sortDirection === 'asc' ? 'text-foreground' : 'text-muted-foreground/30'}`} />
                    <ArrowDown className={`h-3 w-3 ${sortDirection === 'desc' ? 'text-foreground' : 'text-muted-foreground/30'}`} />
                  </div>
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeedback.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.user.avatar} />
                      <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link to={`/users/${item.user.id}`} className="font-medium hover:underline">
                        {item.user.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.user.username}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">
                    {item.content}
                  </div>
                  {item.content.length > 100 && (
                    <Button
                      variant="link"
                      className="text-xs p-0 h-auto mt-1"
                      onClick={() => setSelectedFeedback(item)}
                    >
                      Read more
                    </Button>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(item.timestamp), "MMM d 'at' HH:mm")}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={item.status === "Read"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.status === "Unread" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:text-green-700"
                      onClick={() => handleMarkAsRead(item.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Mark as Read
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              {selectedFeedback?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

