
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeleteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  username: string;
  userAvatar?: string;
  userName?: string;
}

const deleteReasons = [
  { value: "inappropriate", label: "Inappropriate Behavior" },
  { value: "spam", label: "Spam/Scam Activities" },
  { value: "fake", label: "Fake Account" },
  { value: "inactive", label: "Long-term Inactivity" },
  { value: "request", label: "User Request" },
  { value: "other", label: "Other" }
];

export function DeleteUserDialog({ 
  isOpen, 
  onClose, 
  userId, 
  username,
  userAvatar,
  userName 
}: DeleteUserDialogProps) {
  const [notes, setNotes] = useState("");
  const [reason, setReason] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();

  const handleDelete = () => {
    if (!reason) {
      toast({
        title: "Required Field",
        description: "Please select a reason for deletion",
        variant: "destructive",
      });
      return;
    }

    console.log("Deleting user:", {
      userId,
      reason,
      notes: notes.trim(),
    });
    
    setIsConfirmed(true);
  };

  const handleClose = () => {
    setIsConfirmed(false);
    setNotes("");
    setReason("");
    onClose();
  };

  const firstName = userName?.split(' ')[0] || username;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        {!isConfirmed ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete User</AlertDialogTitle>
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
              <AlertDialogDescription className="text-red-600">
                Are you sure you want to delete this user? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Reason for Deletion *
                </label>
                <Select
                  value={reason}
                  onValueChange={setReason}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {deleteReasons.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value}>
                        {reason.label}
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
                onClick={handleDelete}
              >
                Delete User
              </Button>
            </AlertDialogFooter>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-fit p-3 rounded-full bg-red-100 text-red-600 mb-4">
              <Trash2 className="h-12 w-12" />
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
              Bye bye forever, {firstName}! 👋
            </AlertDialogTitle>
            
            <AlertDialogDescription className="text-md mb-6 px-4">
              This user has been permanently deleted from the app. 
              This action cannot be undone. 
              They have been moved to the 'deleted users' section.
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
