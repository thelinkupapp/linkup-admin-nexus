
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Check, X, ShieldOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function VerificationsTable() {
  const [status, setStatus] = useState<'pending' | 'verified' | 'denied'>('pending');

  const handleApprove = () => {
    setStatus('verified');
    toast({
      title: "Verification Approved",
      description: "The user has been successfully verified",
    });
  };

  const handleDeny = () => {
    setStatus('denied');
    toast({
      title: "Verification Denied",
      description: "The user has been notified to resubmit their verification",
      variant: "destructive",
    });
  };

  const handleRemoveVerification = () => {
    setStatus('denied');
    toast({
      title: "Verification Removed",
      description: "The user has been notified to resubmit their verification",
      variant: "destructive",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Verification Photo</TableHead>
            <TableHead>Date Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">user123</TableCell>
            <TableCell>
              <div className="w-[120px]">
                <AspectRatio ratio={9/16}>
                  <img
                    src="https://i.pravatar.cc/300?img=3"
                    alt="Verification selfie"
                    className="rounded-md object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">May 10, 2023</span>
                <span className="text-sm text-muted-foreground">15:30:00</span>
              </div>
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                status === 'verified'
                  ? "bg-green-100 text-green-800"
                  : status === 'denied'
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {status === 'verified' ? "Verified" : status === 'denied' ? "Denied" : "Pending"}
              </span>
            </TableCell>
            <TableCell className="space-x-2">
              {status === 'pending' ? (
                <>
                  <Button 
                    onClick={handleApprove}
                    variant="outline"
                    size="sm"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                  <Button 
                    onClick={handleDeny}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="mr-1 h-4 w-4" />
                    Deny
                  </Button>
                </>
              ) : status === 'verified' ? (
                <Button 
                  onClick={handleRemoveVerification}
                  variant="outline"
                  size="sm"
                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                >
                  <ShieldOff className="mr-1 h-4 w-4" />
                  Remove Verification
                </Button>
              ) : null}
            </TableCell>
          </TableRow>
          {status === 'denied' && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-sm text-muted-foreground bg-red-50 py-3">
                User has been notified to resubmit their verification photo
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
