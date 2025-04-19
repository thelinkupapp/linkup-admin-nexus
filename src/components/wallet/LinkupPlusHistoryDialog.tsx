
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LinkupPlusHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startDate: string | null;
  plan: "annual" | "weekly";
  transactions: Array<{
    date: string;
    amount: number;
    description: string;
  }>;
}

export function LinkupPlusHistoryDialog({
  open,
  onOpenChange,
  startDate,
  plan,
  transactions,
}: LinkupPlusHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Linkup Plus History</DialogTitle>
        </DialogHeader>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-linkup-purple/10 text-linkup-purple border-linkup-purple/20">
              {plan === "annual" ? "Annual Plan" : "Weekly Plan"}
            </Badge>
            {startDate && (
              <p className="text-sm text-muted-foreground">
                Active since {new Date(startDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-medium">£{transaction.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
