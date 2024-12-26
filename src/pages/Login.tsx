import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        if (event === "SIGNED_IN") {
          console.log("User signed in, redirecting");
          // Get the return URL from state or default to home
          const returnUrl = location.state?.returnUrl || "/";
          navigate(returnUrl);
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
        }
      }
    );

    const handleAuthError = (error: any) => {
      console.error("Auth error:", error);
      if (error.message.includes("weak_password")) {
        toast({
          title: "Password too weak",
          description: "Password should be at least 6 characters long.",
          variant: "destructive",
        });
      }
    };

    window.addEventListener("supabase.auth.error", handleAuthError);

    return () => {
      authListener.subscription.unsubscribe();
      window.removeEventListener("supabase.auth.error", handleAuthError);
    };
  }, [navigate, location.state?.returnUrl, toast]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to Finda</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'rgb(var(--primary))',
                  brandAccent: 'rgb(var(--primary))',
                },
              },
            },
          }}
          providers={["google"]}
          redirectTo={`${window.location.origin}/`}
          localization={{
            variables: {
              sign_up: {
                password_label: "Password (minimum 6 characters)",
                password_input_placeholder: "Enter a strong password (min. 6 characters)",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;