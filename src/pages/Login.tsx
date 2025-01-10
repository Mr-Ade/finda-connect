import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthError, AuthApiError } from '@supabase/supabase-js';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        const returnUrl = location.state?.returnUrl || "/";
        navigate(returnUrl);
      }
      if (error) {
        console.error("Session check error:", error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: getErrorMessage(error),
        });
      }
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);

        if (event === "SIGNED_IN" && session) {
          console.log("User signed in, redirecting");
          const returnUrl = location.state?.returnUrl || "/";
          navigate(returnUrl);
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          toast({
            title: "Signed out",
            description: "You have been signed out successfully.",
          });
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.state?.returnUrl, toast]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          return 'Invalid credentials. Please check your email and password.';
        case 422:
          return 'Invalid email format.';
        case 401:
          return 'Session expired. Please sign in again.';
        default:
          return error.message;
      }
    }
    return 'An unexpected error occurred. Please try again.';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Login to Your Account
              </h1>
            </div>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#2563eb',
                      brandAccent: '#1d4ed8',
                    },
                  },
                },
              }}
              providers={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;