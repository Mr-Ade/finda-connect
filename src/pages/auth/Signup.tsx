
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Create an Account
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Sign up to get started
                </p>
              </div>

              <Auth
                supabaseClient={supabase}
                view="sign_up"
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
                  className: {
                    container: 'w-full',
                    button: 'w-full px-4 py-2 rounded-md font-medium bg-primary text-white hover:bg-primary/90',
                    input: 'w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary',
                    divider: 'my-4',
                    label: 'block text-sm font-medium text-gray-700 mb-1',
                    anchor: 'text-primary hover:text-primary/80',
                  },
                }}
                providers={["google"]}
                redirectTo={`${window.location.origin}/`}
                onError={(error) => {
                  toast({
                    variant: "destructive",
                    title: "Authentication Error",
                    description: error.message,
                  });
                }}
              />

              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/90 font-medium"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
