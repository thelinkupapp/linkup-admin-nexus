
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Shield, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data - replace with actual data
const admins = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    dateAdded: "2024-01-15",
    role: "Super Admin",
    status: "Active"
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    dateAdded: "2024-02-01",
    role: "Admin",
    status: "Active"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    dateAdded: "2024-03-10",
    role: "Admin",
    status: "Suspended"
  }
];

export function AdminList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell className="font-medium">{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {admin.role === "Super Admin" ? (
                    <ShieldAlert className="h-4 w-4 text-purple-500" />
                  ) : (
                    <Shield className="h-4 w-4 text-blue-500" />
                  )}
                  {admin.role}
                </div>
              </TableCell>
              <TableCell>{new Date(admin.dateAdded).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "bg-status-verified/10 border-status-verified/20",
                    admin.status === "Suspended" && "bg-destructive/10 text-destructive border-destructive/20"
                  )}
                >
                  {admin.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                    {admin.status === "Active" ? (
                      <DropdownMenuItem className="text-destructive">Suspend Access</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>Reactivate Access</DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-destructive">Revoke Access</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
