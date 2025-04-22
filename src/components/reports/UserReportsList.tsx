
import { useState } from 'react';
import { Check, ArrowDown, ArrowUp, Filter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatJoinDate } from "@/utils/dateFormatting";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterAvatar: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

interface UserReportsListProps {
  reports: Report[];
}

export function UserReportsList({ reports: initialReports }: UserReportsListProps) {
  const [reports, setReports] = useState(initialReports);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  
  const unreadCount = reports.filter(report => !report.isRead).length;
  
  const handleMarkAsRead = (reportId: string) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId ? { ...report, isRead: true } : report
      )
    );
  };

  const toggleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    
    setReports(prevReports => {
      const sorted = [...prevReports].sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return newDirection === 'asc' ? dateA - dateB : dateB - dateA;
      });
      return sorted;
    });
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'read') return report.isRead;
    if (filter === 'unread') return !report.isRead;
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Reports
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {reports.length === 0 
                ? "No reports have been filed against this user" 
                : `${reports.length} report${reports.length === 1 ? '' : 's'} total`}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                {filter === 'all' ? 'All Reports' : filter === 'read' ? 'Read' : 'Unread'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={() => setFilter('all')}>
                All Reports
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('read')}>
                Read
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('unread')}>
                Unread
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {reports.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">No reports have been filed against this user</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:text-foreground transition-colors"
                    onClick={toggleSort}
                  >
                    <div className="flex items-center gap-2">
                      Date & Time
                      <div className="flex flex-col">
                        <ArrowUp className={`h-3 w-3 ${sortDirection === 'asc' ? 'text-foreground' : 'text-muted-foreground/30'}`} />
                        <ArrowDown className={`h-3 w-3 ${sortDirection === 'desc' ? 'text-foreground' : 'text-muted-foreground/30'}`} />
                      </div>
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={report.reporterAvatar} />
                          <AvatarFallback>{report.reporterName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{report.reporterName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{report.description}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatJoinDate(report.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={report.isRead 
                          ? "bg-green-100 text-green-800 hover:bg-green-100" 
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                      >
                        {report.isRead ? 'Read' : 'Unread'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {!report.isRead && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleMarkAsRead(report.id)}
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Mark as Read
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
