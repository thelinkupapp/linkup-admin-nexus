
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function UserReportsTable() {
  // This is a placeholder component - will be filled with real data later
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reporter</TableHead>
            <TableHead>Reported User</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">user1</TableCell>
            <TableCell>user2</TableCell>
            <TableCell>Inappropriate behavior</TableCell>
            <TableCell>2025-04-15</TableCell>
            <TableCell>
              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                Pending
              </span>
            </TableCell>
            <TableCell>
              <button className="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                Resolve
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
