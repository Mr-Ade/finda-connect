import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const DashboardSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', icon: 'lni lni-dashboard', label: 'Dashboard' },
    { path: '/dashboard/listings', icon: 'lni lni-files', label: 'My Listings' },
    { path: '/dashboard/add-listing', icon: 'lni lni-add-files', label: 'Add Listing' },
    { path: '/dashboard/bookmarks', icon: 'lni lni-bookmark', label: 'Saved Listings' },
    { path: '/dashboard/bookings', icon: 'lni lni-briefcase', label: 'My Bookings' },
    { path: '/dashboard/wallet', icon: 'lni lni-mastercard', label: 'Wallet' },
    { path: '/dashboard/messages', icon: 'lni lni-envelope', label: 'Messages' },
  ];

  const accountItems = [
    { path: '/dashboard/profile', icon: 'lni lni-user', label: 'My Profile' },
    { path: '/dashboard/change-password', icon: 'lni lni-lock-alt', label: 'Change Password' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100",
                  location.pathname === item.path && "bg-primary text-white hover:bg-primary"
                )}
              >
                <i className={item.icon}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="my-4 border-t"></div>

        <ul className="space-y-1">
          {accountItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100",
                  location.pathname === item.path && "bg-primary text-white hover:bg-primary"
                )}
              >
                <i className={item.icon}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};