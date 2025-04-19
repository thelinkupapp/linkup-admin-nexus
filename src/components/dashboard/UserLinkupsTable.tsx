
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, ArrowUpDown } from "lucide-react";
import { formatLinkupDateTime } from "@/utils/dateFormatting";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Linkup {
  id: string;
  name: string;
  emoji: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "happening" | "happened" | "cancelled" | "deleted" | "removed";
  type: "hosted" | "attended";
  joinedDate?: string;
  createdDate?: string;
}

const linkups: Linkup[] = [
  {
    id: "1",
    name: "Bali Digital Nomad Retreat",
    emoji: "🌴",
    startDate: "2024-08-01T18:00:00Z",
    endDate: "2024-08-03T22:00:00Z",
    status: "upcoming",
    type: "hosted",
    createdDate: "2024-03-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Evening Social Mixer",
    emoji: "🍷",
    startDate: "2024-04-19T20:00:00Z",
    endDate: "2024-04-19T22:00:00Z",
    status: "upcoming",
    type: "hosted",
    createdDate: "2024-04-01T15:45:00Z"
  },
  {
    id: "3",
    name: "Afternoon Workshop",
    emoji: "💻",
    startDate: "2024-04-20T12:00:00Z",
    endDate: "2024-04-20T15:00:00Z",
    status: "upcoming",
    type: "attended",
    joinedDate: "2024-04-10T09:15:00Z"
  },
  {
    id: "4",
    name: "Monday Tech Meetup",
    emoji: "🚀",
    startDate: "2024-04-22T15:00:00Z",
    endDate: "2024-04-22T21:00:00Z",
    status: "upcoming",
    type: "hosted",
    createdDate: "2024-04-08T11:20:00Z"
  },
  {
    id: "5",
    name: "Beach Cleanup Event",
    emoji: "🏖️",
    startDate: "2024-04-15T19:00:00Z",
    endDate: "2024-04-15T23:00:00Z",
    status: "happened",
    type: "hosted",
    createdDate: "2024-03-25T16:40:00Z"
  },
  {
    id: "6",
    name: "Weekend Mountain Retreat",
    emoji: "⛰️",
    startDate: "2024-05-24T15:00:00Z",
    endDate: "2024-05-26T12:00:00Z",
    status: "upcoming",
    type: "hosted",
    createdDate: "2024-04-12T14:10:00Z"
  }
];

const statusOptions = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Happening", value: "happening" },
  { label: "Happened", value: "happened" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Deleted", value: "deleted" },
  { label: "Removed", value: "removed" }
];

const filteredLinkups = (type?: "hosted" | "attended", selectedStatuses?: string[], sortConfig?: { field: string, direction: 'asc' | 'desc' }) => {
  let filtered = type ? linkups.filter(linkup => linkup.type === type) : linkups;
  
  if (selectedStatuses && selectedStatuses.length > 0) {
    filtered = filtered.filter(linkup => selectedStatuses.includes(linkup.status));
  }
  
  if (sortConfig) {
    return [...filtered].sort((a, b) => {
      if (sortConfig.field === 'date') {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortConfig.field === 'created') {
        const createdDateA = a.createdDate ? new Date(a.createdDate).getTime() : 0;
        const createdDateB = b.createdDate ? new Date(b.createdDate).getTime() : 0;
        const joinedDateA = a.joinedDate ? new Date(a.joinedDate).getTime() : 0;
        const joinedDateB = b.joinedDate ? new Date(b.joinedDate).getTime() : 0;
        
        const dateA = a.type === "hosted" ? createdDateA : joinedDateA;
        const dateB = b.type === "hosted" ? createdDateB : joinedDateB;
        
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  }
  
  return filtered;
};

const getStatusBadgeStyles = (status: Linkup["status"]) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "happening":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "happened":
      return "bg-green-50 text-green-700 border-green-200";
    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    case "deleted":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
};

const LinkupsTable = ({ 
  data, 
  preview = false,
  onSort
}: { 
  data: Linkup[], 
  preview?: boolean,
  onSort?: (field: string) => void
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Linkup</TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort && onSort('date')}>
          <div className="flex items-center">
            Date & Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Type</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {(preview ? data.slice(0, 3) : data).map((linkup) => (
        <TableRow key={linkup.id}>
          <TableCell>
            <div className="space-y-1">
              <Link 
                to={`/linkups/${linkup.id}`} 
                className="flex items-center gap-2 hover:underline"
              >
                <span className="text-xl">{linkup.emoji}</span>
                <span className="font-medium">{linkup.name}</span>
              </Link>
              <div className="text-sm text-muted-foreground cursor-pointer" onClick={() => onSort && onSort('created')}>
                {linkup.type === "attended" && linkup.joinedDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Joined on {new Date(linkup.joinedDate).toLocaleString()}</span>
                    {!preview && <ArrowUpDown className="ml-2 h-3.5 w-3.5" />}
                  </div>
                )}
                {linkup.type === "hosted" && linkup.createdDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Created on {new Date(linkup.createdDate).toLocaleString()}</span>
                    {!preview && <ArrowUpDown className="ml-2 h-3.5 w-3.5" />}
                  </div>
                )}
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatLinkupDateTime(linkup.startDate, linkup.endDate)}</span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              className={getStatusBadgeStyles(linkup.status)}
            >
              {linkup.status.charAt(0).toUpperCase() + linkup.status.slice(1)}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant="outline">
              {linkup.type === "hosted" ? "👑 Host" : "👋 Attendee"}
            </Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export function UserLinkupsTable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ field: string, direction: 'asc' | 'desc' }>({
    field: 'date',
    direction: 'desc'
  });
  const [activeTab, setActiveTab] = useState("all");

  const handleCheckedChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuses(prev => [...prev, value]);
    } else {
      setSelectedStatuses(prev => prev.filter(status => status !== value));
    }
  };
  
  const handleSort = (field: string) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Linkups</h2>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          View All
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="hosted">Host</TabsTrigger>
          <TabsTrigger value="attended">Attendee</TabsTrigger>
        </TabsList>

        {["all", "hosted", "attended"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <LinkupsTable 
              data={filteredLinkups(tab === "all" ? undefined : tab as "hosted" | "attended")} 
              preview={true}
            />
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>All Linkups</DialogTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="ml-auto mr-8">
                    Status ({selectedStatuses.length})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-4" align="end">
                  <div className="space-y-4">
                    {statusOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${option.value}`}
                          checked={selectedStatuses.includes(option.value)}
                          onCheckedChange={(checked) => {
                            handleCheckedChange(option.value, checked === true);
                          }}
                        />
                        <label
                          htmlFor={`status-${option.value}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <Tabs 
              defaultValue="all" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="hosted">Host</TabsTrigger>
                <TabsTrigger value="attended">Attendee</TabsTrigger>
              </TabsList>

              {["all", "hosted", "attended"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <LinkupsTable 
                    data={filteredLinkups(
                      tab === "all" ? undefined : tab as "hosted" | "attended",
                      selectedStatuses,
                      sortConfig
                    )} 
                    preview={false}
                    onSort={handleSort}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
