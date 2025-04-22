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
import React, { useMemo } from "react";

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
  const sortedEarnings = useMemo(() => 
    earnings.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()), 
    [earnings]
  );

  const sortedAttendancePayments = useMemo(() => 
    attendancePayments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()), 
    [attendancePayments]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl">Payments Breakdown</DialogTitle>
          {/* Removed "View All" button */}
        </DialogHeader>

        <Tabs defaultValue="earnings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger 
              key="earnings-tab" 
              value="earnings" 
              className="flex items-center gap-2"
            >
              Linkup Earnings
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-1">
                Hosted
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              key="payments-tab"
              value="payments" 
              className="flex items-center gap-2"
            >
              Linkup Payments
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 ml-1">
                Attended
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="earnings">
            <ScrollArea className="h-[400px]">
              <div className="space-y-6">
                {sortedEarnings.map((item, index) => (
                  <div
                    key={`earnings-${index}`}
                    className="flex flex-col space-y-1"
                  >
                    <Link 
                      to={`/linkups/${item.linkupId}`} 
                      className="text-lg font-semibold hover:underline"
                    >
                      {item.description}
                    </Link>
                    <p className="text-muted-foreground">
                      {formatJoinDate(item.timestamp)}
                    </p>
                    {item.status === "earned" && (
                      <p className="text-lg font-medium text-green-600">+£{item.amount.toFixed(2)}</p>
                    )}
                    <div className="h-px bg-border mt-4" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="payments">
            <ScrollArea className="h-[400px]">
              <div className="space-y-6">
                {sortedAttendancePayments.map((item, index) => (
                  <div
                    key={`payments-${index}`}
                    className="flex flex-col space-y-1"
                  >
                    <Link 
                      to={`/linkups/${item.linkupId}`}
                      className="text-lg font-semibold hover:underline"
                    >
                      {item.description}
                    </Link>
                    <p className="text-muted-foreground">
                      {formatJoinDate(item.timestamp)}
                    </p>
                    <p className="text-lg font-medium text-red-600">-£{item.amount.toFixed(2)}</p>
                    <div className="h-px bg-border mt-4" />
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
