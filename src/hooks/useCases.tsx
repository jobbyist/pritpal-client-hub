import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Case {
  id: string;
  client_id: string;
  title: string;
  description: string | null;
  case_number: string;
  case_type: string;
  status: string;
  priority: string;
  assigned_attorney: string | null;
  case_value: number | null;
  court_name: string | null;
  next_hearing_date: string | null;
  created_at: string;
  updated_at: string;
}

export const useCases = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchCases = async () => {
      try {
        const { data, error } = await supabase
          .from('cases')
          .select('*')
          .eq('client_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCases(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();

    // Set up real-time subscription
    const channel = supabase
      .channel('cases-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cases',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setCases(prev => [payload.new as Case, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setCases(prev => prev.map(c => c.id === payload.new.id ? payload.new as Case : c));
          } else if (payload.eventType === 'DELETE') {
            setCases(prev => prev.filter(c => c.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    cases,
    loading,
    error,
  };
};