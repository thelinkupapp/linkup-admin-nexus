
import { Check, Filter, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

export function UserReportsTable() {
  const handleResolve = () => {
    toast({
      title: "Report resolved",
      description: "The report has been marked as resolved successfully.",
    });
  };

  const handleDismiss = () => {
    toast({
      title: "Report dismissed",
      description: "The report has been dismissed successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search reports..."
            className="h-9"
            type="search"
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
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link 
                      to="/users/user1"
                      className="font-medium hover:underline"
                    >
                      user1
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      @username1
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link 
                      to="/users/user2"
                      className="font-medium hover:underline"
                    >
                      user2
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      @username2
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>Inappropriate behavior</TableCell>
              <TableCell className="text-muted-foreground">2025-04-15</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  Pending
                </Badge>
              </TableCell>
              <TableCell className="space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-green-600 hover:text-green-700"
                  onClick={handleResolve}
                >
                  <Check className="mr-1 h-4 w-4" />
                  Resolve
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-600 hover:text-red-700"
                  onClick={handleDismiss}
                >
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
