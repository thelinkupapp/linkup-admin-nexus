
import { Trash2 } from "lucide-react";

const UserDeletedTable = () => {
  return (
    <div className="rounded-md border">
      <div className="flex items-center gap-4 p-4 border-b">
        <div className="flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">No deleted users found</span>
        </div>
      </div>
    </div>
  );
};

export default UserDeletedTable;
