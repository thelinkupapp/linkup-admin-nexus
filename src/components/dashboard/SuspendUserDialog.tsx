
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

interface SuspendUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  username: string;
}

const suspensionReasons = [
  "Violation of community guidelines",
  "Inappropriate behavior",
  "Spam or misleading content",
  "Fake account",
  "Harassment",
  "Other"
] as const;

export function SuspendUserDialog({ isOpen, onClose, userId, username }: SuspendUserDialogProps) {
  const [reason, setReason] = useState<string>("");
  const [notes, setNotes] = useState("");
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
    
    toast({
      title: "User Suspended",
      description: `${username} has been suspended.`,
    });
    
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Suspend User</AlertDialogTitle>
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
      </AlertDialogContent>
    </AlertDialog>
  );
}
