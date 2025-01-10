import { Eye, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Blog = () => {
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  const { data: blogPosts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useQuery({
    queryKey: ['blog-posts', page],
    queryFn: async () => {
      console.log('Fetching blog posts for page:', page);
      const start = (page - 1) * postsPerPage;
      const end = start + postsPerPage - 1;

      const { data, error, count } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles(id, full_name, avatar_url),
          views:post_views(count)
        `, { count: 'exact' })
        .range(start, end)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      console.log('Blog posts fetched:', data);
      return {
        posts: data || [],
        totalCount: count || 0,
        hasMore: (count || 0) > (page * postsPerPage)
      };
    },
    keepPreviousData: true
  });

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-white hover:text-primary">Home</Link>
            <span className="mx-2 text-white">/</span>
            <Link to="/blog" className="text-white hover:text-primary">Pages</Link>
            <span className="mx-2 text-white">/</span>
            <span className="text-primary">Blog Page</span>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h6 className="text-primary mb-2">Latest Updates</h6>
            <h2 className="text-3xl font-bold">View Recent Updates</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts?.posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:translate-y-[-5px]">
                    {/* Blog Image */}
                    <Link to={`/blog/${post.id}`}>
                      <img 
                        src={post.image_url || "/placeholder.svg"} 
                        alt={post.title} 
                        className="w-full h-48 object-cover" 
                      />
                    </Link>

                    {/* Blog Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </span>
                      </div>
                      <h4 className="text-xl font-semibold mb-3">
                        <Link to={`/blog/${post.id}`} className="hover:text-primary">
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-gray-600 mb-4">{post.description}</p>
                    </div>

                    {/* Blog Footer */}
                    <div className="border-t px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            src={post.author?.avatar_url || "/placeholder.svg"} 
                            alt={post.author?.full_name} 
                            className="w-8 h-8 rounded-full" 
                          />
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 text-green-500 mr-1" />
                            <span>{post.views?.[0]?.count || 0} Views</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {blogPosts?.hasMore && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={isFetchingNextPage}
                    className="inline-flex items-center"
                  >
                    {isFetchingNextPage ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Blogs
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;