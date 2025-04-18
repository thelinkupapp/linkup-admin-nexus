import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserRoundX } from "lucide-react";

interface SuspendUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  username: string;
  userAvatar?: string;
  userName?: string;
}

const suspensionReasons = [
  "Violation of community guidelines",
  "Inappropriate behavior",
  "Spam or misleading content",
  "Fake account",
  "Harassment",
  "Other"
] as const;

export function SuspendUserDialog({ 
  isOpen, 
  onClose, 
  userId, 
  username,
  userAvatar,
  userName 
}: SuspendUserDialogProps) {
  const [reason, setReason] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();

  const handleSuspend = () => {
    if (!reason) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a reason for suspension",
      });
      return;
    }

    console.log("Suspending user:", {
      userId,
      reason,
      notes: notes.trim(),
    });
    
    setIsConfirmed(true);
  };

  const handleClose = () => {
    setIsConfirmed(false);
    setReason("");
    setNotes("");
    onClose();
  };

  // Extract first name (first word of userName)
  const firstName = userName?.split(' ')[0] || username;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        {!isConfirmed ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Suspend User</AlertDialogTitle>
              <div className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName?.[0] ?? username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{userName}</h3>
                  <p className="text-sm text-muted-foreground">@{username}</p>
                </div>
              </div>
              <AlertDialogDescription>
                Are you sure you want to suspend this user? This action can be reversed later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Reason for Suspension
                </label>
                <Select onValueChange={setReason} value={reason}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {suspensionReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Additional Notes (Optional)
                </label>
                <Textarea
                  placeholder="Add any additional context..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={handleSuspend}
              >
                Suspend User
              </Button>
            </AlertDialogFooter>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-fit p-3 rounded-full bg-red-100 text-red-600 mb-4">
              <UserRoundX className="h-12 w-12" />
            </div>
            
            <div className="flex flex-col items-center mb-4 space-y-2">
              <Avatar className="h-16 w-16 border-4 border-red-100">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName?.[0] ?? username[0]}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <div className="font-light text-lg text-gray-500">@{username}</div>
              </div>
            </div>
            
            <AlertDialogTitle className="text-2xl mb-2">
              Bye bye for now, {firstName}! 👋
            </AlertDialogTitle>
            
            <AlertDialogDescription className="text-md mb-6 px-4">
              This user has been suspended and moved to the Suspended Users section.
              <br />
              You can always revoke their suspension if needed.
            </AlertDialogDescription>

            <Button 
              variant="outline" 
              onClick={handleClose}
              className="w-full max-w-xs mx-auto"
            >
              Close
            </Button>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
