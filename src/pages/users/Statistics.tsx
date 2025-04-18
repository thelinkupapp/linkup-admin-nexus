
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Stats } from "@/components/dashboard/Stats";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const UserStatistics = () => {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Statistics</h1>
          <p className="text-muted-foreground">
            Key metrics and trends for platform users
          </p>
        </div>

        <Stats />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly user acquisition</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Chart will be displayed here
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Activity and participation metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
