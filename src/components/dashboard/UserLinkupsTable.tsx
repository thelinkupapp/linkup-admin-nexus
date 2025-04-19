
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { formatJoinDate } from "@/utils/dateFormatting";

interface Linkup {
  id: string;
  name: string;
  emoji: string;
  date: string;
  status: "upcoming" | "happened" | "cancelled";
  type: "hosted" | "attended";
}

const linkups: Linkup[] = [
  {
    id: "1",
    name: "Sunset Beach Volleyball",
    emoji: "🏐",
    date: "2024-04-20T18:00:00Z",
    status: "upcoming",
    type: "attended"
  },
  {
    id: "2",
    name: "Downtown Art Gallery Opening",
    emoji: "🎨",
    date: "2024-04-15T19:00:00Z",
    status: "happened",
    type: "hosted"
  },
  {
    id: "3",
    name: "Rooftop Yoga Session",
    emoji: "🧘",
    date: "2024-04-10T08:00:00Z",
    status: "happened",
    type: "attended"
  }
];

export function UserLinkupsTable() {
  const filteredLinkups = (type?: "hosted" | "attended") => {
    if (!type) return linkups;
    return linkups.filter(linkup => linkup.type === type);
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="hosted">Hosted</TabsTrigger>
        <TabsTrigger value="attended">Attended</TabsTrigger>
      </TabsList>

      {["all", "hosted", "attended"].map((tab) => (
        <TabsContent key={tab} value={tab}>
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
              {filteredLinkups(tab === "all" ? undefined : tab as "hosted" | "attended").map((linkup) => (
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
                        <span>{formatJoinDate(linkup.date)}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        linkup.status === "upcoming" 
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : linkup.status === "happened"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {linkup.status.charAt(0).toUpperCase() + linkup.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {linkup.type.charAt(0).toUpperCase() + linkup.type.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      ))}
    </Tabs>
  );
}
