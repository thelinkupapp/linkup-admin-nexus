
interface Linkup {
  id: string;
  name: string;
  emoji: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "happening" | "happened" | "cancelled";
  type: "hosted" | "attended" | "cohost";
  createdDate?: string;
  joinedDate?: string;
}
