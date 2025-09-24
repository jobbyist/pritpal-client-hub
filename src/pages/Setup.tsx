import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function Setup() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const handleSetup = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-admin-user', {
        body: {}
      });

      if (error) {
        console.error('Setup error:', error);
        toast({
          title: "Setup Failed",
          description: error.message || "Failed to create admin user",
          variant: "destructive",
        });
      } else {
        console.log('Setup successful:', data);
        setCompleted(true);
        toast({
          title: "Setup Complete",
          description: "Admin user created successfully with sample data!",
        });
      }
    } catch (error) {
      console.error('Setup error:', error);
      toast({
        title: "Setup Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Setup Complete!</CardTitle>
            <CardDescription>
              Your admin account and sample data have been created successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-semibold mb-2">Login Credentials:</h3>
              <p className="text-sm"><strong>Email:</strong> admin@pritsinghlaw.com</p>
              <p className="text-sm"><strong>Password:</strong> IronHorse1901!</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">Production Setup</CardTitle>
          <CardDescription>
            Initialize your client portal with admin user and sample data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">This will create:</h3>
            <ul className="text-sm space-y-1">
              <li>• Admin user account (admin@pritsinghlaw.com)</li>
              <li>• Sample case data</li>
              <li>• Sample billing records</li>
              <li>• Sample messages</li>
            </ul>
          </div>
          <Button 
            onClick={handleSetup}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Setting up...' : 'Initialize Production Data'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}