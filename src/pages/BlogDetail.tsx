import { useParams } from "react-router-dom";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Eye, Clock } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: `/blog/${id}`, label: "Blog Detail", active: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="text-white" />
        </div>
      </div>

      {/* Blog Detail Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Featured Image */}
                <div className="mb-6">
                  <img src="/placeholder.svg" alt="Blog Post" className="w-full h-[400px] object-cover rounded-lg" />
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>10k Views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>10 July 2023</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-6">List of Advance Features and Support with Finda</h1>

                {/* Content */}
                <div className="prose max-w-none">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat.
                  </p>

                  <blockquote className="border-l-4 border-primary pl-4 my-6">
                    <p className="italic">
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
                      labore et dolore magna aliqua."
                    </p>
                    <footer className="text-sm">- John Doe</footer>
                  </blockquote>

                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>

                {/* Author Section */}
                <div className="border-t border-b border-gray-200 my-8 py-8">
                  <div className="flex items-center gap-4">
                    <img src="/placeholder.svg" alt="Author" className="w-16 h-16 rounded-full" />
                    <div>
                      <h3 className="font-bold text-lg">Rosalina William</h3>
                      <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-6">Comments (5)</h3>
                  {/* Add comments component here */}
                </div>

                {/* Comment Form */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-6">Leave a Comment</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <textarea 
                      rows={6}
                      placeholder="Your Comment"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    ></textarea>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Search Widget */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h4 className="text-lg font-bold mb-4">Search</h4>
                <div className="relative">
                  <input 
                    type="search" 
                    placeholder="Search..." 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Eye className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h4 className="text-lg font-bold mb-4">Categories</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="flex items-center justify-between text-gray-600 hover:text-primary">
                      <span>Lifestyle</span>
                      <span>09</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-between text-gray-600 hover:text-primary">
                      <span>Travel</span>
                      <span>12</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-between text-gray-600 hover:text-primary">
                      <span>Fashion</span>
                      <span>19</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Recent Posts Widget */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-bold mb-4">Recent Posts</h4>
                <div className="space-y-4">
                  {[1, 2, 3].map((post) => (
                    <div key={post} className="flex gap-4">
                      <img src="/placeholder.svg" alt="" className="w-20 h-20 rounded-lg object-cover" />
                      <div>
                        <h5 className="font-medium hover:text-primary">
                          <a href="#">How to get started with Finda</a>
                        </h5>
                        <p className="text-sm text-gray-500">2 days ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default BlogDetail;