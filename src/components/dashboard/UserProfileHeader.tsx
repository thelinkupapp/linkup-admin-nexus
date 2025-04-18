
import { Link } from "react-router-dom";
import { ArrowLeft, Flag, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SuspendUserDialog } from "./SuspendUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { useToast } from "@/hooks/use-toast";

interface UserProfileHeaderProps {
  user: {
    id: string;
    avatar: string;
    name: string;
    username: string;
    email: string;
    location: string;
    joinDate: string;
    isVerified: boolean;
    isLinkupPlus: boolean;
    hostingLinkups?: number;
  };
}

export const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSuspendClick = () => {
    if (user.isLinkupPlus) {
      toast({
        variant: "destructive",
        title: "Unable to Suspend User",
        description: "This user has an active Linkup Plus subscription. Please cancel their subscription before proceeding with suspension.",
      });
      return;
    }

    setIsSuspendDialogOpen(true);
  };

  const handleDeleteClick = () => {
    if (user.hostingLinkups && user.hostingLinkups > 0) {
      toast({
        variant: "destructive",
        title: "Unable to Delete User",
        description: "This user is a host of an upcoming linkup. Please remove the linkup(s) before proceeding with account deletion.",
      });
      return;
    }

    if (user.isLinkupPlus) {
      toast({
        variant: "destructive",
        title: "Unable to Delete User",
        description: "This user has an active Linkup Plus subscription. Please cancel their subscription before proceeding with account deletion.",
      });
      return;
    }

    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="mb-6">
        <Link to="/users">
          <Button 
            variant="ghost" 
            className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <div className="relative p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                {user.isVerified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex transition-transform hover:scale-110">
                          <img 
                            src="/lovable-uploads/560d8a54-e5fd-4af3-84b1-62f333f56b27.png" 
                            alt="Verified" 
                            className="h-5 w-5" 
                          />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified User</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {user.isLinkupPlus && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex text-amber-500 transition-transform hover:scale-110">
                          👑
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Linkup Plus Member</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
            
            <div className="flex gap-2 self-start md:self-center">
              <Button 
                variant="outline" 
                className="text-destructive border-destructive/20 hover:bg-destructive/10"
                onClick={handleSuspendClick}
              >
                <Flag className="h-4 w-4 mr-2" />
                Suspend User
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteClick}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <SuspendUserDialog 
        isOpen={isSuspendDialogOpen}
        onClose={() => setIsSuspendDialogOpen(false)}
        userId={user.id}
        username={user.username}
        userAvatar={user.avatar}
        userName={user.name}
      />

      <DeleteUserDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        userId={user.id}
        username={user.username}
        userAvatar={user.avatar}
        userName={user.name}
      />
    </>
  );
};
