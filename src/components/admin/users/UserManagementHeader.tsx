import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export const UserManagementHeader = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">User Management</h1>
          <nav className="text-sm breadcrumbs">
            <ol className="flex gap-2 text-muted-foreground">
              <li><Link to="/">Home</Link></li>
              <li className="before:content-['/'] before:mx-2">Dashboard</li>
              <li className="before:content-['/'] before:mx-2 text-primary">Users</li>
            </ol>
          </nav>
        </div>
        <Button asChild>
          <Link to="/dashboard/admin/users/new">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Link>
        </Button>
      </div>
    </div>
  );
};