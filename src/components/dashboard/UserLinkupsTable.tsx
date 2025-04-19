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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationItemsPerPage
} from "@/components/ui/pagination";

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

const filteredLinkupsData = (type?: "hosted" | "attended", selectedStatuses?: string[], sortConfig?: { field: string, direction: 'asc' | 'desc' }) => {
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
      } else if (sortConfig.field === 'name') {
        return sortConfig.direction === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
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
        <TableHead className="cursor-pointer" onClick={() => onSort && onSort('name')}>
          <div className="flex items-center">
            Linkup
            {!preview && <ArrowUpDown className="ml-2 h-4 w-4" />}
          </div>
        </TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort && onSort('date')}>
          <div className="flex items-center">
            Date & Time
            {!preview && <ArrowUpDown className="ml-2 h-4 w-4" />}
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
              <div className="text-sm text-muted-foreground">
                {linkup.type === "attended" && linkup.joinedDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Joined on {new Date(linkup.joinedDate).toLocaleString()}</span>
                  </div>
                )}
                {linkup.type === "hosted" && linkup.createdDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Created on {new Date(linkup.createdDate).toLocaleString()}</span>
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
  const [statusPopoverOpen, setStatusPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleCheckedChange = (value: string, checked: boolean) => {
    setSelectedStatuses(prev => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
  };

  const filteredLinkups = linkups.filter(linkup => {
    if (activeTab !== "all" && linkup.type !== activeTab) return false;
    
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(linkup.status)) return false;
    
    if (searchQuery && !linkup.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const totalPages = Math.ceil(filteredLinkups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLinkups = filteredLinkups.slice(startIndex, endIndex);

  const totalLinkups = linkups.filter(linkup => 
    activeTab === "all" ? true : linkup.type === activeTab
  ).length;

  const getHeaderText = () => {
    const filteredCount = filteredLinkups.length;
    const roleText = activeTab === "hosted" ? "Host" : activeTab === "attended" ? "Attendee" : "";
    const linkupText = totalLinkups === 1 ? "linkup" : "linkups";
    
    if (roleText) {
      return (
        <div className="flex flex-col gap-1">
          <DialogTitle className="text-2xl">All Linkups</DialogTitle>
          <div className="flex items-center gap-2 text-lg">
            <span>{roleText} of </span>
            <span className="text-[#9b87f5] font-bold text-xl">{totalLinkups}</span>
            <span> {linkupText}</span>
            {(selectedStatuses.length > 0 || searchQuery) && (
              <>
                <span className="mx-1">•</span>
                <span>showing </span>
                <span className="text-[#9b87f5] font-bold">{filteredCount}</span>
                <span> of </span>
                <span className="text-[#9b87f5] font-bold">{totalLinkups}</span>
                <span> {linkupText}</span>
              </>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col gap-1">
        <DialogTitle className="text-2xl">All Linkups</DialogTitle>
        <div className="flex items-center gap-2 text-lg">
          <span className="text-[#9b87f5] font-bold text-xl">{totalLinkups}</span>
          <span className="text-[#1A1F2C]">{totalLinkups === 1 ? "linkup" : "linkups"}</span>
          {(selectedStatuses.length > 0 || searchQuery) && (
            <>
              <span className="mx-1">•</span>
              <span>showing </span>
              <span className="text-[#9b87f5] font-bold">{filteredCount}</span>
              <span> of </span>
              <span className="text-[#9b87f5] font-bold">{totalLinkups}</span>
              <span> {totalLinkups === 1 ? "linkup" : "linkups"}</span>
            </>
          )}
        </div>
      </div>
    );
  };

  const getFilteredLinkupsCount = (type?: "hosted" | "attended") => {
    return linkups.filter(linkup => type ? linkup.type === type : true).length;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          View All
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="hosted">Host</TabsTrigger>
          <TabsTrigger value="attended">Attendee</TabsTrigger>
        </TabsList>

        {["all", "hosted", "attended"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg">
                <span className="text-[#9b87f5] font-bold">{getFilteredLinkupsCount(tab === "all" ? undefined : tab as "hosted" | "attended")}</span>
                {' '}linkups
              </p>
            </div>
            <LinkupsTable 
              data={filteredLinkupsData(tab === "all" ? undefined : tab as "hosted" | "attended")} 
              preview={true}
            />
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <div className="flex flex-col gap-4 pr-12">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  {getHeaderText()}
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search linkups..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-[200px]"
                    />
                  </div>
                  <Popover 
                    open={statusPopoverOpen} 
                    onOpenChange={setStatusPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        Status ({selectedStatuses.length})
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[220px] p-4 bg-white" align="end">
                      <div className="space-y-2">
                        {statusOptions.map((option) => (
                          <div 
                            key={option.value} 
                            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                            onClick={() => {
                              handleCheckedChange(option.value, !selectedStatuses.includes(option.value));
                            }}
                          >
                            <Checkbox 
                              id={`status-${option.value}`}
                              checked={selectedStatuses.includes(option.value)} 
                              onCheckedChange={(checked) => {
                                handleCheckedChange(option.value, checked === true);
                              }}
                              className="border-gray-300 data-[state=checked]:bg-[#9b87f5] data-[state=checked]:border-[#9b87f5]"
                            />
                            <label
                              htmlFor={`status-${option.value}`}
                              className="text-sm font-medium leading-none cursor-pointer flex-grow"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
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

              <TabsContent value={activeTab}>
                <LinkupsTable 
                  data={currentLinkups}
                  preview={false}
                  onSort={(field) => {
                    setSortConfig(prev => ({
                      field,
                      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
                    }));
                  }}
                />
              </TabsContent>
            </Tabs>
          </ScrollArea>
          <div className="mt-4 flex items-center justify-between">
            <PaginationItemsPerPage className="flex items-center gap-2">
              <span>Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded px-2 py-1"
              >
                {[5, 10, 15].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </PaginationItemsPerPage>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
