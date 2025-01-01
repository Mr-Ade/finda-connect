import { Link, useLocation, useNavigate } from "react-router-dom";
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

export const ProfileSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    // This is a placeholder for account deletion functionality
    toast({
      title: "Coming Soon",
      description: "Account deletion will be available in a future update.",
    });
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
        <Link to="/business/new" className={`flex items-center gap-2 px-3 py-2 rounded-md ${isActive('/business/new') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
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
        <button 
          onClick={handleDeleteAccount}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
};