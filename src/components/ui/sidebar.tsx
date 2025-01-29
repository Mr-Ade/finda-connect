import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  PlusCircle,
  MessageSquare,
  Heart,
  FileText,
  BarChart3,
  Shield,
  Database,
  Wallet,
  KeyRound,
  LogOut,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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

interface SidebarProps {
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

export function Sidebar({ isAdmin, isSuperAdmin }: SidebarProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      // Delete the user's profile and auth data
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', session.user.id);

      if (deleteError) throw deleteError;

      // Sign out after deletion
      await supabase.auth.signOut();
      
      toast({
        title: "Account deleted successfully",
        description: "Your account has been permanently deleted",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error deleting account",
        description: "There was a problem deleting your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="p-6">
        <Link
          className="flex items-center gap-2 font-semibold"
          to="/"
        >
          <Shield className="h-6 w-6" />
          <span>Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4">
          <div className="space-y-1">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                }`
              }
              to="/dashboard"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                }`
              }
              to="/dashboard/add-listing"
            >
              <PlusCircle className="h-4 w-4" />
              Add Listing
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                }`
              }
              to="/dashboard/messages"
            >
              <MessageSquare className="h-4 w-4" />
              Messages
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                }`
              }
              to="/dashboard/bookmarks"
            >
              <Heart className="h-4 w-4" />
              Bookmarks
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                }`
              }
              to="/dashboard/wallet"
            >
              <Wallet className="h-4 w-4" />
              Wallet
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                }`
              }
              to="/dashboard/change-password"
            >
              <KeyRound className="h-4 w-4" />
              Change Password
            </NavLink>

            {/* Delete Account Dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-red-500 transition-all hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </button>
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
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Logout Dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to logout? You will need to login again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {(isAdmin || isSuperAdmin) && (
              <>
                <div className="pt-4">
                  <h4 className="px-2 py-2 text-sm font-medium">Admin</h4>
                </div>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                      isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    )
                  }
                  to="/dashboard/admin"
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                      isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    )
                  }
                  to="/dashboard/admin/cms"
                >
                  <FileText className="h-4 w-4" />
                  CMS
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                      isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    )
                  }
                  to="/dashboard/admin/database"
                >
                  <Database className="h-4 w-4" />
                  Database
                </NavLink>
              </>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}