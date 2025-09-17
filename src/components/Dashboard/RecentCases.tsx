import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink } from "lucide-react";

interface Case {
  id: string;
  title: string;
  caseNumber: string;
  type: string;
  progress: number;
  status: string;
  statusColor: "success" | "warning" | "default";
}

const RecentCases = () => {
  const cases: Case[] = [
    {
      id: "1",
      title: "Property Purchase - 123 Main St",
      caseNumber: "RE-2024-001",
      type: "Real Estate Purchase",
      progress: 75,
      status: "In Progress",
      statusColor: "warning",
    },
    {
      id: "2", 
      title: "Commercial Lease Agreement",
      caseNumber: "RE-2024-002",
      type: "Commercial Real Estate",
      progress: 45,
      status: "Under Review",
      statusColor: "default",
    },
    {
      id: "3",
      title: "Property Sale - 456 Oak Ave",
      caseNumber: "RE-2024-003", 
      type: "Real Estate Sale",
      progress: 90,
      status: "Closing Scheduled",
      statusColor: "success",
    },
  ];

  return (
    <Card className="border-border/50 shadow-[var(--shadow-card)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Active Cases
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
          View All
          <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {cases.map((case_) => (
          <div
            key={case_.id}
            className="p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">{case_.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {case_.caseNumber} • {case_.type}
                </p>
              </div>
              <Badge 
                variant={case_.statusColor === "success" ? "default" : "secondary"}
                className={
                  case_.statusColor === "success" 
                    ? "bg-success text-success-foreground"
                    : case_.statusColor === "warning"
                    ? "bg-warning text-warning-foreground"
                    : "bg-secondary text-secondary-foreground"
                }
              >
                {case_.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{case_.progress}%</span>
              </div>
              <Progress value={case_.progress} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentCases;