
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export function VerificationsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Profile Photo</TableHead>
            <TableHead>Verification Photo</TableHead>
            <TableHead>Date Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">user123</TableCell>
            <TableCell>
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            </TableCell>
            <TableCell>
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            </TableCell>
            <TableCell>2025-04-10</TableCell>
            <TableCell>
              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                Pending
              </span>
            </TableCell>
            <TableCell className="space-x-2">
              <Button 
                className="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-800"
                variant="ghost"
                size="sm"
              >
                <CheckCircle className="mr-1 h-3 w-3" />
                Approve
              </Button>
              <Button 
                className="rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-800"
                variant="ghost"
                size="sm"
              >
                <XCircle className="mr-1 h-3 w-3" />
                Deny
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
