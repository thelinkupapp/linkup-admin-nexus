
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatJoinDate } from "@/utils/dateFormatting";

interface PayoutHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payoutHistory: Array<{
    amount: number;
    date: string;
    method: string;
    status: string;
  }>;
}

export function PayoutHistoryDialog({
  open,
  onOpenChange,
  payoutHistory,
}: PayoutHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payout History</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {payoutHistory.map((payout, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">£{payout.amount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{payout.method}</p>
                </div>
                <div className="text-right">
                  <p>{formatJoinDate(payout.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
