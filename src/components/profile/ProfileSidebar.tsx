import { Link, useLocation } from "react-router-dom";

export const ProfileSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
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
        </ul>
      </div>
    </div>
  );
};