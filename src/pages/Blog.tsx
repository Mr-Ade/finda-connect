import { Eye, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      image: "/placeholder.svg",
      category: "Marketing",
      title: "What Is a VPN and How Does It Work?",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
      authorImage: "/placeholder.svg",
      views: "10k",
      date: "10 July 2023"
    },
    {
      id: 2,
      image: "/placeholder.svg",
      category: "Business",
      title: "What Is Ransomware: The Ultimate Guide?",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
      authorImage: "/placeholder.svg",
      views: "10k",
      date: "10 July 2023"
    },
    {
      id: 3,
      image: "/placeholder.svg",
      category: "Accounting",
      title: "Can iPads Get Viruses? What You Need",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
      authorImage: "/placeholder.svg",
      views: "10k",
      date: "10 July 2023"
    }
  ];

  return (
    <MainLayout>
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

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:translate-y-[-5px]">
                {/* Blog Image */}
                <Link to={`/blog/${post.id}`}>
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
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
                      <img src={post.authorImage} alt="author" className="w-8 h-8 rounded-full" />
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-green-500 mr-1" />
                        <span>{post.views} Views</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-full inline-flex items-center">
              Load More Blogs
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Blog;