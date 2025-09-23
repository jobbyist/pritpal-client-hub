import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, AlertCircle } from "lucide-react";
import { useMessages } from "@/hooks/useMessages";
import { useProfile } from "@/hooks/useProfile";
import { Link } from "react-router-dom";

const RecentMessages = () => {
  const { messages, loading, error } = useMessages();
  const { profile } = useProfile();

  const recentMessages = messages
    .filter(m => m.recipient_id === profile?.user_id)
    .slice(0, 3);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getSenderName = (senderId: string) => {
    // For now, return a placeholder. In a real app, you'd fetch sender profiles
    return senderId === profile?.user_id ? "You" : "Law Office";
  };

  if (loading) {
    return (
      <Card className="border-border/50 shadow-[var(--shadow-card)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading messages...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-border/50 shadow-[var(--shadow-card)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Error loading messages: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-[var(--shadow-card)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Messages
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow" asChild>
          <Link to="/messages">
            View All
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentMessages.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No messages found</p>
        ) : (
          recentMessages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/30 transition-colors cursor-pointer ${
                !message.is_read ? 'ring-1 ring-primary/20' : ''
              }`}
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {getInitials(getSenderName(message.sender_id))}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {getSenderName(message.sender_id)}
                    </p>
                    {message.is_urgent && (
                      <AlertCircle className="h-3 w-3 text-red-500" />
                    )}
                    {!message.is_read && (
                      <div className="h-2 w-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {new Date(message.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  {message.subject}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {message.content.slice(0, 100)}...
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RecentMessages;