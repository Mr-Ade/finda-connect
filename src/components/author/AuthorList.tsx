import { AuthorCard } from "@/components/author/AuthorCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  businesses: { count: number }[];
};

interface AuthorListProps {
  authors: Profile[] | undefined;
  isLoading: boolean;
}

export const AuthorList = ({ authors, isLoading }: AuthorListProps) => {
  const renderSkeletons = () => (
    Array(6).fill(0).map((_, i) => (
      <div key={i} className="space-y-4 p-4 border rounded-lg">
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    ))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {isLoading ? renderSkeletons() : authors?.map((author) => (
        <AuthorCard key={author.id} author={author} />
      ))}
    </div>
  );
};