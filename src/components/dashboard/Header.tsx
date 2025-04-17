
import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header({ title }: { title: string }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
        
        <div className="relative">
          <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-linkup-purple text-white flex items-center justify-center text-[10px]">
            3
          </span>
        </div>
      </div>
    </div>
  );
}
