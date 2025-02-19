
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { AuthContextType } from "@/types/auth";
import { signIn, signInWithGoogle, sendMagicLink, signUp, signOut as authSignOut } from "@/services/auth";

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signIn: async () => null,
  signInWithGoogle: async () => null,
  sendMagicLink: async () => null,
  signUp: async () => null,
  signOut: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    loading,
    signIn,
    signInWithGoogle,
    sendMagicLink,
    signUp,
    signOut: async () => {
      await authSignOut();
      navigate('/login');
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
