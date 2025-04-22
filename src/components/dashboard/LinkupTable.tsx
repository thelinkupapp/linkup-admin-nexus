import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";

interface Linkup {
  id: string;
  title: string;
  createdOn: string;
  status: string;
  country: string;
}

const linkups: Linkup[] = [
  {
    id: "1",
    title: "Linkup 1",
    createdOn: "2023-01-01",
    status: "upcoming",
    country: "USA",
  },
  {
    id: "2",
    title: "Linkup 2",
    createdOn: "2023-02-01",
    status: "happening",
    country: "Canada",
  },
  {
    id: "3",
    title: "Linkup 3",
    createdOn: "2023-03-01",
    status: "happened",
    country: "UK",
  },
  {
    id: "4",
    title: "Linkup 4",
    createdOn: "2023-04-01",
    status: "cancelled",
    country: "Germany",
  },
  {
    id: "5",
    title: "Linkup 5",
    createdOn: "2023-05-01",
    status: "upcoming",
    country: "France",
  },
];

interface LinkupTableProps {
  onCountChange?: (counts: { filtered: number; total: number }) => void;
  filterCountries?: { id: string; label: string; value: string; emoji: string; }[];
  // NEW:
  selectedStatuses?: string[]; // Selected status list
  setSortField?: (field: string) => void; // For sorting, if needed
  sortField?: string; // Which field is sorted
  sortDirection?: "asc" | "desc";
}

export function LinkupTable({
  onCountChange,
  filterCountries,
  selectedStatuses = [],
  setSortField,
  sortField,
  sortDirection,
}: LinkupTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  // Filter linkups by status array
  const filteredData = linkups.filter((item) =>
    selectedStatuses.length === 0 || selectedStatuses.includes(item.status)
  );

  // Update counts on filter change
  useEffect(() => {
    onCountChange?.({ filtered: filteredData.length, total: linkups.length });
  }, [filteredData.length, linkups.length, onCountChange]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Linkup Title</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Created on
                <span
                  className="cursor-pointer ml-1"
                  onClick={() => setSortField && setSortField("created")}
                >
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                </span>
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((linkup) => (
            <TableRow key={linkup.id}>
              <TableCell>{linkup.title}</TableCell>
              <TableCell>{linkup.createdOn}</TableCell>
              <TableCell>
                <Badge>{linkup.status}</Badge>
              </TableCell>
              <TableCell>{linkup.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
