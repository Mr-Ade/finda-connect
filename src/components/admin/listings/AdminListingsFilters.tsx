import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

export const AdminListingsFilters = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Input 
        placeholder="Search listings..." 
        className="w-full"
      />
      
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="restaurant">Restaurants</SelectItem>
          <SelectItem value="retail">Retail</SelectItem>
          <SelectItem value="service">Services</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="name">Name A-Z</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};