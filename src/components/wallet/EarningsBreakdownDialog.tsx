
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EarningItem {
  description: string;
  amount: number;
  timestamp: string;
  status: "earned" | "failed" | "withdrawn";
}

interface EarningsBreakdownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  earnings: EarningItem[];
}

export function EarningsBreakdownDialog({
  open,
  onOpenChange,
  earnings,
}: EarningsBreakdownDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Earnings Breakdown</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {earnings.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.description}</p>
                  {item.timestamp && (
                    <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                  )}
                </div>
                {item.status === "earned" && (
                  <p className="font-medium">£{item.amount.toFixed(2)}</p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
