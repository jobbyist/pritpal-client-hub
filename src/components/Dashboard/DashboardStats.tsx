import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, DollarSign, Calendar, MessageCircle } from "lucide-react";
import { useCases } from "@/hooks/useCases";
import { useMessages } from "@/hooks/useMessages";
import { useBilling } from "@/hooks/useBilling";
import { useProfile } from "@/hooks/useProfile";

const DashboardStats = () => {
  const { cases, loading: casesLoading } = useCases();
  const { messages, loading: messagesLoading } = useMessages();
  const { billingRecords, loading: billingLoading } = useBilling();
  const { profile } = useProfile();

  const activeCases = cases.filter(c => c.status === 'active').length;
  const unreadMessages = messages.filter(m => !m.is_read && m.recipient_id === profile?.user_id).length;
  const urgentMessages = messages.filter(m => m.is_urgent && !m.is_read && m.recipient_id === profile?.user_id).length;
  const pendingBills = billingRecords.filter(b => b.status === 'pending');
  const outstandingBalance = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);
  
  const upcomingHearings = cases.filter(c => 
    c.next_hearing_date && 
    new Date(c.next_hearing_date) > new Date() &&
    new Date(c.next_hearing_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;

  const stats = [
    {
      title: "Active Cases",
      value: casesLoading ? "..." : activeCases.toString(),
      icon: FileText,
      trend: `${cases.length} total`,
      color: "text-primary",
    },
    {
      title: "Upcoming Events",
      value: casesLoading ? "..." : upcomingHearings.toString(),
      icon: Calendar,
      trend: "Next 7 days",
      color: "text-orange-600",
    },
    {
      title: "Unread Messages",
      value: messagesLoading ? "..." : unreadMessages.toString(),
      icon: MessageCircle,
      trend: urgentMessages > 0 ? `${urgentMessages} urgent` : "No urgent",
      color: "text-blue-600",
    },
    {
      title: "Outstanding Balance",
      value: billingLoading ? "..." : `$${outstandingBalance.toLocaleString()}`,
      icon: DollarSign,
      trend: `${pendingBills.length} pending bills`,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;