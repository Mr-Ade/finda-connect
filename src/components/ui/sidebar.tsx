import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText,
  Building2,
  Star,
  BarChart3,
  History,
  FolderTree,
  HeadphonesIcon,
  Crown
} from "lucide-react";

interface SidebarProps {
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

export function Sidebar({ isAdmin, isSuperAdmin }: SidebarProps) {
  const location = useLocation();

  const adminLinks = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      superAdminOnly: false
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
      superAdminOnly: true
    },
    {
      title: "Listings",
      href: "/dashboard/admin/listings",
      icon: Building2,
      superAdminOnly: false
    },
    {
      title: "Reviews",
      href: "/dashboard/admin/reviews",
      icon: Star,
      superAdminOnly: false
    },
    {
      title: "Categories",
      href: "/dashboard/admin/categories",
      icon: FolderTree,
      superAdminOnly: true
    },
    {
      title: "Content",
      href: "/dashboard/admin/cms",
      icon: FileText,
      superAdminOnly: false
    },
    {
      title: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
      superAdminOnly: true
    },
    {
      title: "Audit Logs",
      href: "/dashboard/admin/audit-logs",
      icon: History,
      superAdminOnly: true
    },
    {
      title: "Support",
      href: "/dashboard/admin/support",
      icon: HeadphonesIcon,
      superAdminOnly: true
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
      superAdminOnly: true
    },
    {
      title: "Super Admin",
      href: "/dashboard/admin/super",
      icon: Crown,
      superAdminOnly: true
    }
  ];

  if (!isAdmin) return null;

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin Panel
          </h2>
          <div className="space-y-1">
            {adminLinks.map((link) => {
              // Only show superadmin links to superadmins
              if (link.superAdminOnly && !isSuperAdmin) return null;
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                    location.pathname === link.href 
                      ? "bg-muted font-semibold text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}