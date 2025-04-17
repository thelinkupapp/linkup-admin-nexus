
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function VerificationsTable() {
  // This is a placeholder component - will be filled with real data later
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
              <button className="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                Approve
              </button>
              <button className="rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                Deny
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
