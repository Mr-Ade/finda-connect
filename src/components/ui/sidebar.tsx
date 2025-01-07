import { NavLink } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  User,
  Building2,
  Calendar,
  MessageSquare,
  Heart,
  Settings,
  Users,
  FileText,
  BarChart3,
  Shield
} from "lucide-react";

interface SidebarProps {
  isAdmin?: boolean;
}

export const Sidebar = ({ isAdmin }: SidebarProps) => {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <NavLink className="flex items-center gap-2 font-semibold" to="/">
            <Building2 className="h-6 w-6" />
            <span className="">Finda</span>
          </NavLink>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-6">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                }`
              }
              to="/dashboard"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                }`
              }
              to="/dashboard/profile"
            >
              <User className="h-4 w-4" />
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                }`
              }
              to="/dashboard/listings"
            >
              <Building2 className="h-4 w-4" />
              My Listings
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                  isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                }`
              }
              to="/dashboard/appointments"
            >
              <Calendar className="h-4 w-4" />
              Appointments
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

            {isAdmin && (
              <>
                <div className="mt-6 border-t pt-6">
                  <h3 className="mb-2 px-3 text-sm font-semibold">Admin</h3>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                        isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                      }`
                    }
                    to="/dashboard/admin/users"
                  >
                    <Users className="h-4 w-4" />
                    Users
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                        isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                      }`
                    }
                    to="/dashboard/admin/listings"
                  >
                    <FileText className="h-4 w-4" />
                    All Listings
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                        isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                      }`
                    }
                    to="/dashboard/admin/analytics"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                        isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                      }`
                    }
                    to="/dashboard/admin/settings"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                        isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : ""
                      }`
                    }
                    to="/dashboard/admin/audit-logs"
                  >
                    <Shield className="h-4 w-4" />
                    Audit Logs
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};