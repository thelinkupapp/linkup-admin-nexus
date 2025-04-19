import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { formatLinkupDateTime } from "@/utils/dateFormatting";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Linkup {
  id: string;
  name: string;
  emoji: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "happened" | "happening" | "cancelled" | "deleted";
  type: "hosted" | "attended";
}

const linkups: Linkup[] = [
  {
    id: "1",
    name: "Bali Digital Nomad Retreat",
    emoji: "🌴",
    startDate: "2024-08-01T18:00:00Z",
    endDate: "2024-08-03T22:00:00Z",
    status: "upcoming",
    type: "hosted"
  },
  {
    id: "2",
    name: "Summer Music Festival Weekend",
    emoji: "🎵",
    startDate: "2024-07-15T12:00:00Z",
    endDate: "2024-07-17T23:00:00Z",
    status: "upcoming",
    type: "attended"
  },
  {
    id: "3",
    name: "Sunset Beach Volleyball",
    emoji: "🏐",
    startDate: "2024-04-20T18:00:00Z",
    endDate: "2024-04-20T22:00:00Z",
    status: "upcoming",
    type: "attended"
  },
  {
    id: "4",
    name: "Downtown Art Gallery Opening",
    emoji: "🎨",
    startDate: "2024-04-15T19:00:00Z",
    endDate: "2024-04-15T23:00:00Z",
    status: "happened",
    type: "hosted"
  },
  {
    id: "5",
    name: "Rooftop Yoga Session",
    emoji: "🧘",
    startDate: "2024-04-10T08:00:00Z",
    endDate: "2024-04-10T09:30:00Z",
    status: "happened",
    type: "attended"
  },
  {
    id: "6",
    name: "Weekend Camping Trip",
    emoji: "⛺️",
    startDate: "2024-05-24T15:00:00Z",
    endDate: "2024-05-26T12:00:00Z",
    status: "upcoming",
    type: "hosted"
  }
];

const filteredLinkups = (type?: "hosted" | "attended") => {
  if (!type) return linkups;
  return linkups.filter(linkup => linkup.type === type);
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

const LinkupsTable = ({ data }: { data: Linkup[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Linkup</TableHead>
        <TableHead>Date & Time</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Type</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((linkup) => (
        <TableRow key={linkup.id}>
          <TableCell>
            <Link 
              to={`/linkups/${linkup.id}`} 
              className="flex items-center gap-2 hover:underline"
            >
              <span className="text-xl">{linkup.emoji}</span>
              <span className="font-medium">{linkup.name}</span>
            </Link>
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
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
            />
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>All Linkups</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
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
