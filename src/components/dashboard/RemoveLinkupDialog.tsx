
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

interface RemoveLinkupDialogProps {
  open: boolean;
  linkupTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const RemoveLinkupDialog = ({ open, linkupTitle, onConfirm, onCancel }: RemoveLinkupDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Linkup</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you wish to remove <span className="font-bold">{linkupTitle}</span>? This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-white hover:bg-destructive/90">
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveLinkupDialog;
