import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
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
          const returnUrl = location.state?.returnUrl || "/";
          navigate(returnUrl);
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.state?.returnUrl, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Login Your Account
                </h1>
              </div>

              <Auth
                supabaseClient={supabase}
                view="sign_in"
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#359e04',
                        brandAccent: '#359e04',
                      },
                    },
                  },
                  className: {
                    container: 'w-full',
                    button: 'w-full px-4 py-2 rounded-md font-medium bg-primary text-white hover:bg-primary/90',
                    input: 'w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary',
                    divider: 'my-4',
                    label: 'block text-sm font-medium text-gray-700 mb-1',
                    loader: 'text-primary',
                    anchor: 'text-primary hover:text-primary/80',
                    message: 'mt-4',
                  },
                }}
                providers={["google"]}
                redirectTo={`${window.location.origin}/`}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: "Email",
                      password_label: "Password",
                      email_input_placeholder: "Your email address",
                      password_input_placeholder: "Your password",
                      button_label: "Sign In",
                      social_provider_text: "Sign in with {{provider}}",
                      link_text: "Already have an account? Sign in",
                    },
                  },
                }}
              />

              <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-primary hover:text-primary/90 font-medium"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;