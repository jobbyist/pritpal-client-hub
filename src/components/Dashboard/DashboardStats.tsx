import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease" | "neutral";
  icon?: React.ReactNode;
}

const StatCard = ({ title, value, change, changeType, icon }: StatCardProps) => {
  const getTrendIcon = () => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "decrease":
        return <TrendingDown className="h-4 w-4 text-warning" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="border-border/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center space-x-1 text-xs">
          {getTrendIcon()}
          <span className="text-muted-foreground">{change}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats = () => {
  const stats = [
    {
      title: "Active Cases",
      value: 3,
      change: "+1 this month",
      changeType: "increase" as const,
    },
    {
      title: "Documents Pending",
      value: 7,
      change: "-2 since last week",
      changeType: "decrease" as const,
    },
    {
      title: "Messages",
      value: 12,
      change: "+5 new",
      changeType: "increase" as const,
    },
    {
      title: "Upcoming Deadlines",
      value: 2,
      change: "No change",
      changeType: "neutral" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;