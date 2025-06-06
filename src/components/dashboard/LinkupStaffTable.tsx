
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { AddStaffDialog } from "@/components/staff/AddStaffDialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const initialStaffMembers = [
  {
    id: "1", 
    name: "Jack Peagam",
    username: "@jackpeagam",
    avatar: "/lovable-uploads/d2bddf64-f07e-405b-b149-443782e1e95e.png",
    role: "CEO",
  }
];

export function LinkupStaffTable() {
  const [staffMembers, setStaffMembers] = useState(initialStaffMembers);
  const { toast } = useToast();

  // Add event listener for new staff members
  useEffect(() => {
    const handleAddStaffMember = (event: CustomEvent) => {
      setStaffMembers(current => [...current, event.detail]);
    };

    window.addEventListener('addStaffMember', handleAddStaffMember as EventListener);
    
    return () => {
      window.removeEventListener('addStaffMember', handleAddStaffMember as EventListener);
    };
  }, []);

  const handleRemoveStaff = (memberId: string, memberName: string) => {
    setStaffMembers(currentMembers => 
      currentMembers.filter(member => member.id !== memberId)
    );
    
    toast({
      title: "Staff Member Removed",
      description: `${memberName} has been removed from staff.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Linkup Staff Members</h2>
        <AddStaffDialog />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link to={`/users/${member.id}`} className="font-medium hover:underline">
                        {member.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{member.username}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        Remove
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Staff Member</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove {member.name} from the staff? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleRemoveStaff(member.id, member.name)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Remove Staff Member
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
