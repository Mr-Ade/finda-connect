import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserManagementFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const UserManagementFilters = ({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange
}: UserManagementFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      
      <Select
        value={roleFilter}
        onValueChange={onRoleFilterChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="admin">Administrators</SelectItem>
          <SelectItem value="business_owner">Business Owners</SelectItem>
          <SelectItem value="user">Regular Users</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={statusFilter}
        onValueChange={onStatusFilterChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};