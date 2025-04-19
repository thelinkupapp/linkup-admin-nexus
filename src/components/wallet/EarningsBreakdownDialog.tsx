
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { formatJoinDate } from "@/utils/dateFormatting";
import { Badge } from "@/components/ui/badge";

interface EarningItem {
  description: string;
  linkupId?: string;
  amount: number;
  timestamp: string;
  status: "earned" | "failed" | "withdrawn";
}

interface AttendancePayment {
  description: string;
  linkupId: string;
  amount: number;
  timestamp: string;
}

interface EarningsBreakdownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  earnings: EarningItem[];
  attendancePayments?: AttendancePayment[];
}

export function EarningsBreakdownDialog({
  open,
  onOpenChange,
  earnings,
  attendancePayments = [],
}: EarningsBreakdownDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payments Breakdown</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="earnings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="earnings" className="flex items-center gap-2">
              Linkup Earnings
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-1">
                Hosted
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              Linkup Payments
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 ml-1">
                Attended
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="earnings">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {earnings.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <Link 
                        to={`/linkups/${item.linkupId}`} 
                        className="font-medium hover:underline"
                      >
                        {item.description}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {formatJoinDate(item.timestamp)}
                      </p>
                    </div>
                    {item.status === "earned" && (
                      <p className="font-medium text-green-600">+£{item.amount.toFixed(2)}</p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="payments">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {attendancePayments.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <Link 
                        to={`/linkups/${item.linkupId}`}
                        className="font-medium hover:underline"
                      >
                        {item.description}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {formatJoinDate(item.timestamp)}
                      </p>
                    </div>
                    <p className="font-medium text-red-600">-£{item.amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
