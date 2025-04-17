
import { Check, Filter, Search, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LinkupReportsTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search linkup reports..."
            className="h-9"
            type="search"
            onChange={(e) => console.log("Search:", e.target.value)}
          />
          <Button size="sm" variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reporting User</TableHead>
              <TableHead>Linkup Title</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">user1</TableCell>
              <TableCell>Coffee Meetup</TableCell>
              <TableCell>host_user</TableCell>
              <TableCell>Inaccurate description</TableCell>
              <TableCell className="text-muted-foreground">2025-04-16</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  Pending
                </Badge>
              </TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                  <Check className="mr-1 h-4 w-4" />
                  Resolve
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <X className="mr-1 h-4 w-4" />
                  Dismiss
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
