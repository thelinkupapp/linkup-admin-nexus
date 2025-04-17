
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function SubscribersTable() {
  // This is a placeholder component - will be filled with real data later
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>iOS</TableCell>
            <TableCell>2025-03-15</TableCell>
            <TableCell>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                Active
              </span>
            </TableCell>
            <TableCell>
              <button className="rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                Export
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
