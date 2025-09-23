import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, DollarSign, FileText, Filter, Search } from "lucide-react";
import { useCases } from "@/hooks/useCases";
import { useState } from "react";

const Cases = () => {
  const { cases, loading, error } = useCases();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = 
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.case_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Cases</h1>
          <p className="text-muted-foreground">Loading your legal matters...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Cases</h1>
          <p className="text-red-600">Error loading cases: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">My Cases</h1>
        <p className="text-muted-foreground">
          Manage and track your legal matters and cases.
        </p>
      </div>

      {/* Filters */}
      <Card className="border-border/50 shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Cases</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, number, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.length === 0 ? (
          <Card className="border-border/50 shadow-[var(--shadow-card)]">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Cases Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" || priorityFilter !== "all"
                  ? "No cases match your current filters."
                  : "You don't have any cases yet."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredCases.map((case_) => (
            <Card key={case_.id} className="border-border/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {case_.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Case #{case_.case_number} • {case_.case_type}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
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
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>

                {case_.description && (
                  <p className="text-muted-foreground mb-4">
                    {case_.description}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {case_.assigned_attorney && (
                    <div>
                      <span className="font-medium text-foreground">Attorney:</span>
                      <p className="text-muted-foreground">{case_.assigned_attorney}</p>
                    </div>
                  )}
                  
                  {case_.court_name && (
                    <div>
                      <span className="font-medium text-foreground">Court:</span>
                      <p className="text-muted-foreground">{case_.court_name}</p>
                    </div>
                  )}
                  
                  {case_.next_hearing_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium text-foreground">Next Hearing:</span>
                        <p className="text-muted-foreground">
                          {new Date(case_.next_hearing_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {case_.case_value && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium text-foreground">Case Value:</span>
                        <p className="text-muted-foreground">
                          ${case_.case_value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <span className="font-medium text-foreground">Created:</span>
                    <p className="text-muted-foreground">
                      {new Date(case_.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <span className="font-medium text-foreground">Last Updated:</span>
                    <p className="text-muted-foreground">
                      {new Date(case_.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Cases;