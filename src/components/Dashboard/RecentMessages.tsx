import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  avatar?: string;
}

const RecentMessages = () => {
  const messages: Message[] = [
    {
      id: "1",
      sender: "Pritpal Singh",
      subject: "Closing Date Confirmation",
      preview: "The closing for 123 Main St has been confirmed for July 30th at 2:00 PM...",
      date: "July 27, 2025",
    },
    {
      id: "2",
      sender: "Sarah Johnson",
      subject: "Document Question",
      preview: "I have a question about the property disclosure form...",
      date: "July 26, 2025",
    },
    {
      id: "3",
      sender: "Title Company",
      subject: "Title Insurance Update",
      preview: "Your title insurance policy has been updated with the latest information...",
      date: "July 25, 2025",
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="border-border/50 shadow-[var(--shadow-card)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Messages
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
          View All
          <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={message.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {getInitials(message.sender)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {message.sender}
                </p>
                <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {message.date}
                </p>
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                {message.subject}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {message.preview}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentMessages;