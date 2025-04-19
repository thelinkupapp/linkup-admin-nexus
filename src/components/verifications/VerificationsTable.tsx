import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Check, X, ShieldOff, ArrowUpDown, Search, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { formatJoinDate } from "@/utils/dateFormatting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { MoreVertical, Users } from "lucide-react";

// Define verification user type
interface VerificationUser {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  submissionDate: string;
  submissionTime: string;
  status: 'pending' | 'approved' | 'denied';
  statusChangeTime?: string | null;
  verificationPhoto: string;
}

// Generate mock verification data
const generateVerificationUsers = (): VerificationUser[] => {
  const users: VerificationUser[] = [
    {
      id: "1",
      avatar: "/lovable-uploads/a165dd8e-2635-4f3a-a050-ce01c92a0a6f.png",
      firstName: "Jack",
      lastName: "Peagam",
      username: "jackpeagam",
      submissionDate: "May 10, 2023",
      submissionTime: "15:30:00",
      status: "pending",
      verificationPhoto: "/lovable-uploads/450d74c3-6ea4-449f-80b8-6aac987c12d6.png"
    },
    {
      id: "2",
      avatar: "/lovable-uploads/1fa5e36a-9e47-4933-9b3c-d103bedaf3bf.png",
      firstName: "Ben",
      lastName: "Whatson",
      username: "benwhatson",
      submissionDate: "Apr 15, 2023",
      submissionTime: "10:45:00",
      status: "approved",
      statusChangeTime: "2023-04-16T14:30:00Z",
      verificationPhoto: "/lovable-uploads/86fc1136-a3e8-49f3-8cd1-b0c29bc1af83.png"
    },
    {
      id: "3",
      avatar: "/lovable-uploads/f1cb2afb-e7ab-44e6-95c2-037da6ccad60.png",
      firstName: "Elie",
      lastName: "Abou Samra",
      username: "elieabousamra",
      submissionDate: "Jun 5, 2023",
      submissionTime: "08:20:00",
      status: "denied",
      statusChangeTime: "2023-06-07T09:15:00Z",
      verificationPhoto: "/lovable-uploads/3a92fc9e-fe93-44e4-8c0e-0b14a7085082.png"
    },
    {
      id: "4",
      avatar: "https://i.pravatar.cc/150?img=62",
      firstName: "Marcus",
      lastName: "Chen",
      username: "marcus_c",
      submissionDate: "Mar 22, 2023",
      submissionTime: "12:15:00",
      status: "pending",
      verificationPhoto: "/lovable-uploads/86fc1136-a3e8-49f3-8cd1-b0c29bc1af83.png"
    },
    {
      id: "5",
      avatar: "https://i.pravatar.cc/150?img=45",
      firstName: "Emma",
      lastName: "Williams",
      username: "emma_w",
      submissionDate: "Feb 18, 2023",
      submissionTime: "09:10:00",
      status: "approved",
      statusChangeTime: "2023-02-19T11:30:00Z",
      verificationPhoto: "/lovable-uploads/86fc1136-a3e8-49f3-8cd1-b0c29bc1af83.png"
    },
    {
      id: "6",
      avatar: "https://i.pravatar.cc/150?img=68",
      firstName: "Raj",
      lastName: "Patel",
      username: "raj_p",
      submissionDate: "Apr 30, 2023",
      submissionTime: "16:45:00",
      status: "approved",
      statusChangeTime: "2023-05-01T10:20:00Z",
      verificationPhoto: "/lovable-uploads/86fc1136-a3e8-49f3-8cd1-b0c29bc1af83.png"
    },
    {
      id: "7",
      avatar: "https://i.pravatar.cc/150?img=33",
      firstName: "Isabella",
      lastName: "Rodriguez",
      username: "bella_r",
      submissionDate: "May 12, 2023",
      submissionTime: "14:20:00",
      status: "denied",
      statusChangeTime: "2023-05-13T09:45:00Z",
      verificationPhoto: "/lovable-uploads/86fc1136-a3e8-49f3-8cd1-b0c29bc1af83.png"
    }
  ];
  
  // Generate additional verification users
  for (let i = 8; i <= 50; i++) {
    const statuses: ('pending' | 'approved' | 'denied')[] = ['pending', 'approved', 'denied'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const firstName = ["Sofia", "Alexander", "Olivia", "Noah", "Emma", "Liam", "Charlotte", "Lucas"][Math.floor(Math.random() * 8)];
    const lastName = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"][Math.floor(Math.random() * 8)];
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`;
    
    // Generate random date within last 6 months
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomHour = Math.floor(Math.random() * 12) + 1;
    const randomMinute = Math.floor(Math.random() * 60);
    
    users.push({
      id: i.toString(),
      avatar: `https://i.pravatar.cc/150?u=${username}`,
      firstName,
      lastName,
      username,
      submissionDate: `${randomMonth} ${randomDay}, 2023`,
      submissionTime: `${randomHour}:${randomMinute < 10 ? '0' + randomMinute : randomMinute}:00`,
      status: randomStatus,
      statusChangeTime: randomStatus !== 'pending' ? `2023-${String(months.indexOf(randomMonth) + 1).padStart(2, '0')}-${String(randomDay + 1).padStart(2, '0')}T10:30:00Z` : undefined,
      verificationPhoto: "/lovable-uploads/86fc1136-a3e8-49f3-8cd1-b0c29bc1af83.png"
    });
  }
  
  return users;
};

const verificationUsers = generateVerificationUsers();

export function VerificationsTable() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [searchValue, setSearchValue] = useState("");
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [itemsPerPageOptions] = useState([25, 50, 100]);
  
  // State for verification users
  const [users, setUsers] = useState<VerificationUser[]>(verificationUsers);
  
  // Handle status change
  const handleStatusChange = (userId: string, newStatus: 'approved' | 'denied') => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: newStatus,
          statusChangeTime: new Date().toISOString()
        };
      }
      return user;
    }));
    
    if (newStatus === 'approved') {
      toast({
        title: "Verification Approved",
        description: "The user has been successfully verified",
      });
    } else {
      toast({
        title: "Verification Denied",
        description: "The user has been notified to resubmit their verification",
        variant: "destructive",
      });
    }
  };

  // Handle remove verification
  const handleRemoveVerification = (userId: string) => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: 'denied',
          statusChangeTime: new Date().toISOString()
        };
      }
      return user;
    }));
    
    toast({
      title: "Verification Removed",
      description: "The user has been notified to resubmit their verification",
      variant: "destructive",
    });
  };
  
  // Filter users based on search and status
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const matchesSearch = fullName.toLowerCase().includes(searchValue.toLowerCase()) || 
                        user.username.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = user.status === activeTab;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort users based on submission date
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const dateA = new Date(`${a.submissionDate} ${a.submissionTime}`).getTime();
    const dateB = new Date(`${b.submissionDate} ${b.submissionTime}`).getTime();
    
    return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
  });
  
  // Get paginated users
  const totalUsers = sortedUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Handle user profile click
  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };
  
  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };
  
  // Count users by status
  const pendingCount = users.filter(user => user.status === 'pending').length;
  const approvedCount = users.filter(user => user.status === 'approved').length;
  const deniedCount = users.filter(user => user.status === 'denied').length;

  // Get the appropriate header text based on active tab
  const getHeaderText = () => {
    const count = filteredUsers.length;
    switch (activeTab) {
      case 'pending':
        return `${count} verification ${count === 1 ? 'submission' : 'submissions'}`;
      case 'approved':
        return `${count} verified ${count === 1 ? 'user' : 'users'}`;
      case 'denied':
        return `${count} denied ${count === 1 ? 'submission' : 'submissions'}`;
      default:
        return `${count} verification ${count === 1 ? 'request' : 'requests'}`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg font-medium">
            {getHeaderText()}
          </span>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full sm:w-[250px] pl-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex gap-2">
            Pending <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">{pendingCount}</span>
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex gap-2">
            Approved <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">{approvedCount}</span>
          </TabsTrigger>
          <TabsTrigger value="denied" className="flex gap-2">
            Denied <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">{deniedCount}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Verification Photo</TableHead>
                  <TableHead className="cursor-pointer" onClick={toggleSortDirection}>
                    <div className="flex items-center">
                      Date Submitted
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No pending verification requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 cursor-pointer" onClick={() => handleUserClick(user.id)}>
                            <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                            <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div 
                              className="font-medium hover:underline cursor-pointer"
                              onClick={() => handleUserClick(user.id)}
                            >
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">@{user.username}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="w-[120px] cursor-pointer group">
                              <AspectRatio ratio={9/16}>
                                <img
                                  src={user.verificationPhoto}
                                  alt="Verification selfie"
                                  className="rounded-md object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                  <span className="text-white text-xs">Click to enlarge</span>
                                </div>
                              </AspectRatio>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <img
                              src={user.verificationPhoto}
                              alt="Verification selfie"
                              className="w-full h-auto max-h-[80vh] object-contain"
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.submissionDate}</span>
                          <span className="text-sm text-muted-foreground">{user.submissionTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          onClick={() => handleStatusChange(user.id, 'approved')}
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleStatusChange(user.id, 'denied')}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="mr-1 h-4 w-4" />
                          Deny
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="approved" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Verification Photo</TableHead>
                  <TableHead className="cursor-pointer" onClick={toggleSortDirection}>
                    <div className="flex items-center">
                      Date Submitted
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No approved verification requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 cursor-pointer" onClick={() => handleUserClick(user.id)}>
                            <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                            <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div 
                              className="font-medium hover:underline cursor-pointer"
                              onClick={() => handleUserClick(user.id)}
                            >
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">@{user.username}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="w-[120px] cursor-pointer group">
                              <AspectRatio ratio={9/16}>
                                <img
                                  src={user.verificationPhoto}
                                  alt="Verification selfie"
                                  className="rounded-md object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                  <span className="text-white text-xs">Click to enlarge</span>
                                </div>
                              </AspectRatio>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <img
                              src={user.verificationPhoto}
                              alt="Verification selfie"
                              className="w-full h-auto max-h-[80vh] object-contain"
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.submissionDate}</span>
                          <span className="text-sm text-muted-foreground">{user.submissionTime}</span>
                          {user.statusChangeTime && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Approved: {formatJoinDate(user.statusChangeTime)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold bg-green-100 text-green-800">
                            Approved
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => handleRemoveVerification(user.id)}
                          variant="outline"
                          size="sm"
                          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                          <ShieldOff className="mr-1 h-4 w-4" />
                          Remove Verification
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="denied" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Verification Photo</TableHead>
                  <TableHead className="cursor-pointer" onClick={toggleSortDirection}>
                    <div className="flex items-center">
                      Date Submitted
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No denied verification requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 cursor-pointer" onClick={() => handleUserClick(user.id)}>
                            <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                            <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div 
                              className="font-medium hover:underline cursor-pointer"
                              onClick={() => handleUserClick(user.id)}
                            >
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">@{user.username}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="w-[120px] cursor-pointer group">
                              <AspectRatio ratio={9/16}>
                                <img
                                  src={user.verificationPhoto}
                                  alt="Verification selfie"
                                  className="rounded-md object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                  <span className="text-white text-xs">Click to enlarge</span>
                                </div>
                              </AspectRatio>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <img
                              src={user.verificationPhoto}
                              alt="Verification selfie"
                              className="w-full h-auto max-h-[80vh] object-contain"
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.submissionDate}</span>
                          <span className="text-sm text-muted-foreground">{user.submissionTime}</span>
                          {user.statusChangeTime && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Denied: {formatJoinDate(user.statusChangeTime)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold bg-red-100 text-red-800">
                            Denied
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => handleUserClick(user.id)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(user.id, 'approved')}
                              className="cursor-pointer text-green-600"
                            >
                              <Check className="mr-2 h-4 w-4" />
                              <span>Approve Now</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {filteredUsers.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} requests
            </p>
            <div className="flex items-center ml-4">
              <span className="text-sm text-muted-foreground mr-2">Requests per page:</span>
              <Select 
                value={itemsPerPage.toString()} 
                onValueChange={(value) => setItemsPerPage(Number(value))}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {itemsPerPageOptions.map(option => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={cn(
                    "cursor-pointer",
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {totalPages > 5 && (currentPage < totalPages - 2) && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(totalPages)}
                    className="cursor-pointer"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={cn(
                    "cursor-pointer",
                    currentPage === totalPages && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

import { MoreVertical, Users } from "lucide-react";
