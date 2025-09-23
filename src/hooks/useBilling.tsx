import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface BillingRecord {
  id: string;
  client_id: string;
  case_id: string | null;
  invoice_number: string;
  description: string;
  amount: number;
  status: string;
  due_date: string;
  payment_date: string | null;
  payment_method: string | null;
  hourly_rate: number | null;
  hours_worked: number | null;
  created_at: string;
  updated_at: string;
}

export const useBilling = () => {
  const { user } = useAuth();
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchBilling = async () => {
      try {
        const { data, error } = await supabase
          .from('billing')
          .select('*')
          .eq('client_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBillingRecords(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBilling();

    // Set up real-time subscription
    const channel = supabase
      .channel('billing-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'billing',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBillingRecords(prev => [payload.new as BillingRecord, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setBillingRecords(prev => prev.map(b => b.id === payload.new.id ? payload.new as BillingRecord : b));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    billingRecords,
    loading,
    error,
  };
};