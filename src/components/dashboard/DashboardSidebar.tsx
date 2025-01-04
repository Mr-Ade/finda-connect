import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Files, 
  PlusCircle, 
  Bookmark, 
  Briefcase,
  CreditCard,
  Mail,
  User,
  Lock,
  Trash2,
  LogOut
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const DashboardSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("No user session");

      // Delete user data from profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", session.user.id);

      if (profileError) throw profileError;

      // Sign out after deletion
      await supabase.auth.signOut();
      
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="space-y-1">
        <h6 className="text-sm font-semibold text-gray-500 px-3 mb-2">Main Navigation</h6>
        <Link to="/profile" className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive('/profile') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Link to="/dashboard/listings" className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive('/dashboard/listings') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
          <Files className="w-4 h-4" />
          My Listings
        </Link>
        <Link to="/dashboard/add-listing" className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive('/dashboard/add-listing') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
          <PlusCircle className="w-4 h-4" />
          Add Listing
        </Link>
        <Link to="/dashboard/bookmarks" className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive('/dashboard/bookmarks') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
          <Bookmark className="w-4 h-4" />
          Saved Listings
        </Link>
        <Link to="/dashboard/messages" className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive('/dashboard/messages') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
          <Mail className="w-4 h-4" />
          Messages
        </Link>
        <Link to="/dashboard/wallet" className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive('/dashboard/wallet') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
          <CreditCard className="w-4 h-4" />
          Wallet
        </Link>
      </div>

      <div className="mt-6 space-y-1">
        <h6 className="text-sm font-semibold text-gray-500 px-3 mb-2">My Account</h6>
        <Link to="/profile" className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive('/profile') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
          <User className="w-4 h-4" />
          My Profile
        </Link>
        <Link to="/profile/password" className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive('/profile/password') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
          <Lock className="w-4 h-4" />
          Change Password
        </Link>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 justify-start">
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 justify-start"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
};