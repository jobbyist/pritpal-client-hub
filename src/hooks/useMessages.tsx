import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  content: string;
  message_type: string | null;
  is_read: boolean | null;
  is_urgent: boolean | null;
  case_id: string | null;
  parent_message_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMessages(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up real-time subscription
    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const message = payload.new as Message;
          if (message && (message.sender_id === user.id || message.recipient_id === user.id)) {
            if (payload.eventType === 'INSERT') {
              setMessages(prev => [message, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              setMessages(prev => prev.map(m => m.id === message.id ? message : m));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAsRead = async (messageId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId)
        .eq('recipient_id', user.id);

      if (error) throw error;
    } catch (err: any) {
      console.error('Error marking message as read:', err.message);
    }
  };

  return {
    messages,
    loading,
    error,
    markAsRead,
  };
};