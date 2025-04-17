
import { Clock, Filter, MessageSquare, Search, Tag, User } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UserFeedbackTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search feedback..."
            className="h-9"
            type="search"
            onChange={(e) => console.log("Search:", e.target.value)}
          />
          <Button size="sm" variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Sort: Newest
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-[40%]">Feedback</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Sarah Wilson</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  <Tag className="mr-1 h-3 w-3" />
                  Feature Request
                </Badge>
              </TableCell>
              <TableCell className="max-w-md">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm">Would love to see a dark mode option in the app!</p>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">2025-04-17</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  Under Review
                </Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  Mark Reviewed
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
