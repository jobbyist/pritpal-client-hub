import DashboardStats from "@/components/Dashboard/DashboardStats";
import RecentCases from "@/components/Dashboard/RecentCases";
import RecentMessages from "@/components/Dashboard/RecentMessages";
import UpcomingTasks from "@/components/Dashboard/UpcomingTasks";
import PaymentHistory from "@/components/Dashboard/PaymentHistory";
import { useProfile } from "@/hooks/useProfile";

const Dashboard = () => {
  const { profile, loading } = useProfile();

  const getDisplayName = () => {
    if (loading) return "Loading...";
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
    return "Client";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {getDisplayName()}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your legal matters and recent activity.
        </p>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <RecentCases />
          <RecentMessages />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <UpcomingTasks />
          <PaymentHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;