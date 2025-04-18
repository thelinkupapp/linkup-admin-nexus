
import { Sidebar } from "@/components/dashboard/Sidebar";
import UserTable from "@/components/dashboard/UserTable";
import { UserFilters } from "@/components/dashboard/UserFilters";
import { DataSort } from "@/components/dashboard/DataSort";
import { useState } from "react";

const UserManagement = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([18, 100]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showLinkupPlusOnly, setShowLinkupPlusOnly] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">
            View and manage all users registered on the platform
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <UserFilters 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            selectedNationalities={selectedNationalities}
            setSelectedNationalities={setSelectedNationalities}
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            showVerifiedOnly={showVerifiedOnly}
            setShowVerifiedOnly={setShowVerifiedOnly}
            showLinkupPlusOnly={showLinkupPlusOnly}
            setShowLinkupPlusOnly={setShowLinkupPlusOnly}
            ageRange={ageRange}
            setAgeRange={setAgeRange}
          />
          <DataSort 
            sortDirection={sortDirection}
            onSortChange={(direction) => setSortDirection(direction)}
          />
        </div>

        <UserTable />
      </div>
    </div>
  );
};

export default UserManagement;
