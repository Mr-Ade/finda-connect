import { useEffect } from 'react';
import { Routes } from './Routes';
import { Toaster } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

function App() {
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        toast({
          title: "Signed out",
          description: "You have been signed out successfully."
        });
      } else if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user?.email);
        toast({
          title: "Signed in",
          description: "Welcome back!"
        });
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      } else if (event === 'USER_UPDATED') {
        console.log('User updated');
      }
    });

    // Initialize auth state
    const initializeAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error.message);
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive"
        });
      }
      if (session) {
        console.log('Initial session:', session);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
}

export default App;