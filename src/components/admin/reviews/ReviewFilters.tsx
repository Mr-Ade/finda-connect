import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface ReviewFiltersProps {
  onFilterChange: (filters: {
    search: string;
    status: string;
    rating: string;
  }) => void;
}

export const ReviewFilters = ({ onFilterChange }: ReviewFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center p-4 bg-background border rounded-lg mb-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        <Input
          placeholder="Search reviews..."
          onChange={(e) => 
            onFilterChange({
              search: e.target.value,
              status: 'all',
              rating: 'all'
            })
          }
        />
        
        <Select 
          onValueChange={(value) =>
            onFilterChange({
              search: '',
              status: value,
              rating: 'all'
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            onFilterChange({
              search: '',
              status: 'all',
              rating: value
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};