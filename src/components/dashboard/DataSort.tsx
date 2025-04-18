
import { Dispatch, SetStateAction } from "react";

interface DataSortProps {
  sortDirection: "asc" | "desc";
  onSortChange: Dispatch<SetStateAction<"asc" | "desc">>;
}

// This component is no longer needed but is kept to avoid breaking references
export const DataSort = (_props: DataSortProps) => null;
