import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Clock } from "lucide-react";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  type: string;
}

const UpcomingTasks = () => {
  const tasks: Task[] = [
    {
      id: "1",
      title: "Sign final closing documents",
      dueDate: "July 30, 2025",
      priority: "High",
      type: "Document Signing",
    },
    {
      id: "2",
      title: "Complete property walkthrough",
      dueDate: "July 29, 2025", 
      priority: "Medium",
      type: "Property Inspection",
    },
    {
      id: "3",
      title: "Submit financing documents",
      dueDate: "August 5, 2025",
      priority: "Medium",
      type: "Financial Documentation",
    },
    {
      id: "4",
      title: "Review lease agreement",
      dueDate: "August 10, 2025",
      priority: "Low",
      type: "Document Review",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      case "Low":
        return "bg-success text-success-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <Clock className="h-3 w-3" />;
      case "Medium":
        return <Calendar className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  return (
    <Card className="border-border/50 shadow-[var(--shadow-card)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Upcoming Tasks
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
          View All
          <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground truncate">
                  {task.title}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`${getPriorityColor(task.priority)} text-xs flex items-center gap-1`}
                >
                  {getPriorityIcon(task.priority)}
                  {task.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{task.type}</p>
            </div>
            <div className="text-right ml-3">
              <p className="text-sm font-medium text-foreground">
                Due: {task.dueDate}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;