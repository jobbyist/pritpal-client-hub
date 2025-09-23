import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, DollarSign } from "lucide-react";
import { useCases } from "@/hooks/useCases";
import { Link } from "react-router-dom";

const RecentCases = () => {
  const { cases, loading, error } = useCases();

  const recentCases = cases.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      case "closed":
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      case "medium":
        return "bg-orange-500/10 text-orange-700 border-orange-500/20";
      case "low":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
    }
  };

  if (loading) {
    return (
      <Card className="border-border/50 shadow-[var(--shadow-card)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Cases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading cases...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-border/50 shadow-[var(--shadow-card)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Cases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Error loading cases: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-[var(--shadow-card)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Cases
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow" asChild>
          <Link to="/cases">
            View All
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentCases.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No cases found</p>
        ) : (
          recentCases.map((case_) => (
            <div
              key={case_.id}
              className="p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {case_.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Case #{case_.case_number}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className={getStatusColor(case_.status)}
                    >
                      {case_.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getPriorityColor(case_.priority)}
                    >
                      {case_.priority} priority
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                {case_.assigned_attorney && (
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-medium mr-2">Attorney:</span>
                    {case_.assigned_attorney}
                  </div>
                )}
                
                {case_.next_hearing_date && (
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-medium mr-2">Next Hearing:</span>
                    {new Date(case_.next_hearing_date).toLocaleDateString()}
                  </div>
                )}
                
                {case_.case_value && (
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span className="font-medium mr-2">Case Value:</span>
                    ${case_.case_value.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCases;