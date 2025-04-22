
import { Sidebar } from "@/components/dashboard/Sidebar";
import SuspendedUsersTable from "@/components/dashboard/SuspendedUsersTable";

const UserSuspended = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Suspended Users</h1>
          <p className="text-gray-600 mt-1">
            View and manage users who have been suspended from the platform
          </p>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-300 p-4 rounded-lg mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-800">
                These users have been suspended for violating platform policies. Review each case carefully before taking any action.
              </p>
            </div>
          </div>
        </div>

        <SuspendedUsersTable />
      </div>
    </div>
  );
};

export default UserSuspended;
