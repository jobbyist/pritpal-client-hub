import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertCircle, MessageCircle, Search, Send } from "lucide-react";
import { useMessages } from "@/hooks/useMessages";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";

const Messages = () => {
  const { messages, loading, error, markAsRead } = useMessages();
  const { profile } = useProfile();
  const [searchTerm, setSearchTerm] = useState("");

  const getSenderName = (senderId: string) => {
    return senderId === profile?.user_id ? "You" : "Law Office";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getSenderName(message.sender_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMessageClick = (message: any) => {
    if (!message.is_read && message.recipient_id === profile?.user_id) {
      markAsRead(message.id);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">Loading your messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-red-600">Error loading messages: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with your legal team and stay updated on your cases.
        </p>
      </div>

      {/* Search and New Message */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          New Message
        </Button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card className="border-border/50 shadow-[var(--shadow-card)]">
            <CardContent className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Messages Found</h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? "No messages match your search."
                  : "You don't have any messages yet."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card 
              key={message.id} 
              className={`border-border/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow cursor-pointer ${
                !message.is_read && message.recipient_id === profile?.user_id ? 'ring-1 ring-primary/20' : ''
              }`}
              onClick={() => handleMessageClick(message)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {getInitials(getSenderName(message.sender_id))}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">
                          {getSenderName(message.sender_id)}
                        </h3>
                        {message.is_urgent && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Urgent
                          </Badge>
                        )}
                        {!message.is_read && message.recipient_id === profile?.user_id && (
                          <div className="h-2 w-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(message.created_at).toLocaleDateString()} at{' '}
                        {new Date(message.created_at).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    
                    <h4 className="font-medium text-foreground mb-2">
                      {message.subject}
                    </h4>
                    
                    <p className="text-muted-foreground line-clamp-3">
                      {message.content}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {message.message_type && (
                          <Badge variant="outline" className="text-xs">
                            {message.message_type}
                          </Badge>
                        )}
                        {message.case_id && (
                          <Badge variant="outline" className="text-xs">
                            Case Related
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm">
                          Mark as {message.is_read ? 'Unread' : 'Read'}
                        </Button>
                      </div>
                    </div>
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

export default Messages;