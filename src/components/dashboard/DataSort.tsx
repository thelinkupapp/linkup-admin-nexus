
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

type SortDirection = "asc" | "desc";

interface DataSortProps {
  sortDirection: SortDirection;
  onSortChange: (direction: SortDirection) => void;
}

export function DataSort({ sortDirection, onSortChange }: DataSortProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
      onClick={() => onSortChange(sortDirection === "asc" ? "desc" : "asc")}
    >
      {sortDirection === "asc" ? (
        <>
          <ArrowUpAZ className="h-4 w-4" />
          Oldest First
        </>
      ) : (
        <>
          <ArrowDownAZ className="h-4 w-4" />
          Newest First
        </>
      )}
    </Button>
  );
}
