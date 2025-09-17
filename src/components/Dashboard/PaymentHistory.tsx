import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CreditCard, FileText } from "lucide-react";

interface Payment {
  id: string;
  invoiceNumber: string;
  description: string;
  amount: string;
  date: string;
  status: "Paid" | "Pending" | "Overdue";
}

const PaymentHistory = () => {
  const payments: Payment[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      description: "Legal Services - Property Purchase",
      amount: "$2,500.00",
      date: "July 15, 2025",
      status: "Paid",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002", 
      description: "Document Review and Preparation",
      amount: "$1,200.00",
      date: "June 30, 2025",
      status: "Paid",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      description: "Closing Services",
      amount: "$800.00",
      date: "August 1, 2025",
      status: "Pending",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success text-success-foreground";
      case "Pending":
        return "bg-warning text-warning-foreground";
      case "Overdue":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CreditCard className="h-3 w-3" />;
      case "Pending":
        return <FileText className="h-3 w-3" />;
      case "Overdue":
        return <ExternalLink className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <Card className="border-border/50 shadow-[var(--shadow-card)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Payment History
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
          View All
          <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground">
                  {payment.invoiceNumber}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`${getStatusColor(payment.status)} text-xs flex items-center gap-1`}
                >
                  {getStatusIcon(payment.status)}
                  {payment.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {payment.description}
              </p>
              <p className="text-sm text-muted-foreground">
                {payment.date}
              </p>
            </div>
            <div className="text-right ml-3">
              <p className="text-lg font-semibold text-foreground">
                {payment.amount}
              </p>
              {payment.status === "Pending" && (
                <Button variant="professional" size="sm" className="mt-1">
                  Pay Now
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;