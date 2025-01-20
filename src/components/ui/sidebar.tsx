import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";

export interface SidebarProps {
  items: {
    title: string;
    href: string;
    icon: string;
  }[];
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

export function Sidebar({ items, isAdmin, isSuperAdmin }: SidebarProps) {
  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {items.map((item) => {
              const IconComponent = Icons[item.icon as keyof typeof Icons];
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.href ? "bg-accent" : "transparent"
                  )}
                >
                  {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}