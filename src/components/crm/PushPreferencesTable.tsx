
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function PushPreferencesTable() {
  // This is a placeholder component - will be filled with real data later
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>All Notifications</TableHead>
            <TableHead>New Messages</TableHead>
            <TableHead>Friend Requests</TableHead>
            <TableHead>Linkup Activity</TableHead>
            <TableHead>Promotions</TableHead>
            <TableHead>Announcements</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">user1</TableCell>
            <TableCell>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                Enabled
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                Enabled
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                Enabled
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                Disabled
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                Disabled
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                Enabled
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
