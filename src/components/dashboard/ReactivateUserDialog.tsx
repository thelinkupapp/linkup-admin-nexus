
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ReactivateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  username: string;
  userAvatar: string;
  onConfirm: () => void;
}

export function ReactivateUserDialog({ isOpen, onClose, userName, username, userAvatar, onConfirm }: ReactivateUserDialogProps) {
  const { toast } = useToast();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
    onConfirm();
    toast({
      title: "User reactivated",
      description: `${userName} (@${username}) has been reactivated.`,
      variant: "default",
    });
    // Close after a short delay for feedback
    setTimeout(() => {
      setIsConfirmed(false);
      onClose();
    }, 1700);
  };

  const handleCancel = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleCancel}>
      <AlertDialogContent>
        {!isConfirmed ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Reactivate User?</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex items-center gap-4 my-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{userName}</p>
                <p className="text-muted-foreground text-sm">@{username}</p>
              </div>
            </div>
            <AlertDialogDescription>
              Are you sure you want to reactivate this account? The user will regain full platform access.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant="default" onClick={handleConfirm}>
                Reactivate
              </Button>
            </AlertDialogFooter>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto w-fit rounded-full bg-green-100 p-4 mb-4">
              {/* <UserCheck className="h-8 w-8 text-green-600" /> */}
              <span className="text-green-600 text-3xl">✔</span>
            </div>
            <AlertDialogTitle className="mb-2">User Reactivated</AlertDialogTitle>
            <AlertDialogDescription>
              {userName} (@{username}) can now access the platform.
            </AlertDialogDescription>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
