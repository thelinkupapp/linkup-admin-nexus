import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Clock, Crown, Flag } from "lucide-react";
import { formatJoinDate } from "@/utils/dateFormatting";
import { getCountryEmoji, getGenderEmoji } from "@/utils/countryUtils";
import { Card } from "@/components/ui/card";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

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
    gender: string;
  };
}

export const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
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
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-background flex items-center justify-center shadow-sm border border-border transition-transform hover:scale-110">
                      {getGenderEmoji(user.gender)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.gender} User</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
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
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Joined {formatJoinDate(user.joinDate)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 self-start md:self-center">
              <Button 
                variant="outline" 
                className="text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                <Flag className="h-4 w-4 mr-2" />
                Suspend User
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
