
import { Sidebar } from "@/components/dashboard/Sidebar";
import { LinkupTable } from "@/components/dashboard/LinkupTable";

const LinkupRemoved = () => {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Removed Linkups</h1>
          <p className="text-muted-foreground">
            View and manage linkups that have been removed from the platform
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                These linkups have been removed for violating platform policies. Review each case carefully before taking any action.
              </p>
            </div>
          </div>
        </div>

        <LinkupTable />
      </div>
    </div>
  );
};

export default LinkupRemoved;
