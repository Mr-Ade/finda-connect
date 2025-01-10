import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  LayoutDashboard, 
  User, 
  Building2, 
  Calendar, 
  MessageSquare, 
  Heart,
  Settings,
  LogOut
} from "lucide-react";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
}

export const AuthButtons = ({ isAuthenticated, handleLogout }: AuthButtonsProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: isAuthenticated
  });

  if (isAuthenticated) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || ''} />
              <AvatarFallback>
                {profile?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem onClick={() => navigate('/dashboard')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard/listings')}>
            <Building2 className="mr-2 h-4 w-4" />
            <span>My Listings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard/appointments')}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Appointments</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard/messages')}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Messages</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard/bookmarks')}>
            <Heart className="mr-2 h-4 w-4" />
            <span>Bookmarks</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
        Log in
      </Button>
      <Button size="sm" onClick={() => navigate("/signup")}>
        Sign up
      </Button>
    </>
  );
};