import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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

export const ProfileSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(
        (await supabase.auth.getUser()).data.user?.id || ""
      );
      
      if (error) throw error;
      
      await supabase.auth.signOut();
      navigate("/login");
      toast({
        title: "Account deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error deleting account",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Dashboard Navigation</h3>
      </div>
      
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-50 ${isActive('/dashboard') ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}
            >
              <span className="flex-1">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/my-bookings"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-50 ${isActive('/dashboard/my-bookings') ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}
            >
              <span className="flex-1">My Bookings</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/add-listing"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-50 ${isActive('/dashboard/add-listing') ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}
            >
              <span className="flex-1">Add Listing</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/listings"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-50 ${isActive('/dashboard/listings') ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}
            >
              <span className="flex-1">My Listings</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/saved-listings"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-50 ${isActive('/dashboard/saved-listings') ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}
            >
              <span className="flex-1">Saved Listings</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/messages"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-50 ${isActive('/dashboard/messages') ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}
            >
              <span className="flex-1">Messages</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/wallet"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-50 ${isActive('/dashboard/wallet') ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}
            >
              <span className="flex-1">Wallet</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/profile"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-50 ${isActive('/dashboard/profile') ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}
            >
              <span className="flex-1">My Profile</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/change-password"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-50 ${isActive('/dashboard/change-password') ? 'bg-gray-50 text-primary' : 'text-gray-700'}`}
            >
              <span className="flex-1">Change Password</span>
            </Link>
          </li>
          <li className="pt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </li>
          <li>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Logout
                </Button>
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
          </li>
        </ul>
      </div>
    </div>
  );
};