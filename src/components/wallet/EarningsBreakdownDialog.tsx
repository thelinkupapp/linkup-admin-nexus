
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface EarningItem {
  description: string;
  linkupId?: string;  // Optional ID to link to the linkup
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
                  {item.status === "earned" && item.linkupId ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <p className="font-medium cursor-pointer hover:text-linkup-purple transition-colors">
                          {item.description}
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{item.description}</h4>
                            <p className="text-sm text-muted-foreground">
                              Click to view linkup details
                            </p>
                          </div>
                          <Button asChild variant="ghost" size="icon">
                            <Link to={`/linkups/${item.linkupId}`}>
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <p className="font-medium">{item.description}</p>
                  )}
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
