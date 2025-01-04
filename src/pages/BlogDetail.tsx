import { Eye, Clock, Facebook, Twitter, Linkedin, Youtube, Instagram, Search, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BlogDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">List of Advance Features and Support with Finda</h1>
            <nav className="text-sm">
              <ol className="flex items-center space-x-2">
                <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
                <li><span className="text-gray-400 mx-2">/</span></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
                <li><span className="text-gray-400 mx-2">/</span></li>
                <li className="text-primary">Blog Detail</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="rounded-lg overflow-hidden mb-6">
                <img src="/placeholder.svg" alt="Blog Post" className="w-full h-[400px] object-cover" />
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Posted on March 15, 2024</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>45 Comments</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose max-w-none mb-12">
                <p className="text-gray-600 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <blockquote className="border-l-4 border-primary pl-4 italic my-8">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  <footer className="text-sm mt-2">- John Doe</footer>
                </blockquote>

                <p className="text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              {/* Author Box */}
              <div className="bg-gray-50 p-6 rounded-lg mb-12">
                <div className="flex items-center space-x-4">
                  <img src="/placeholder.svg" alt="Author" className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="font-bold text-lg">Rosalina William</h3>
                    <p className="text-gray-600 mt-2">
                      Content Writer & Marketing Specialist
                    </p>
                    <div className="flex space-x-4 mt-4">
                      <Facebook className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer" />
                      <Twitter className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer" />
                      <Linkedin className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer" />
                      <Instagram className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Comments (5)</h3>
                {/* Comment Thread */}
                <div className="space-y-6">
                  {/* Single Comment */}
                  <div className="flex space-x-4">
                    <img src="/placeholder.svg" alt="Commenter" className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold">John Doe</h4>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-gray-600">
                          Great article! Thanks for sharing these insights.
                        </p>
                      </div>
                      <button className="text-primary text-sm mt-2 hover:underline">Reply</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Form */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Leave a Comment</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 border rounded-lg"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <textarea
                    placeholder="Your Comment"
                    rows={6}
                    className="w-full p-3 border rounded-lg"
                  ></textarea>
                  <Button className="bg-primary text-white">
                    Post Comment
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h4 className="font-bold text-lg mb-4">Search</h4>
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="w-full p-3 pr-10 border rounded-lg"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h4 className="font-bold text-lg mb-4">Categories</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <Link to="#" className="text-gray-600 hover:text-primary">Lifestyle</Link>
                    <span className="text-gray-400">(15)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <Link to="#" className="text-gray-600 hover:text-primary">Travel</Link>
                    <span className="text-gray-400">(23)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <Link to="#" className="text-gray-600 hover:text-primary">Fashion</Link>
                    <span className="text-gray-400">(18)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <Link to="#" className="text-gray-600 hover:text-primary">Technology</Link>
                    <span className="text-gray-400">(32)</span>
                  </li>
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h4 className="font-bold text-lg mb-4">Recent Posts</h4>
                <div className="space-y-4">
                  {[1, 2, 3].map((post) => (
                    <div key={post} className="flex space-x-4">
                      <img src="/placeholder.svg" alt="" className="w-20 h-20 rounded object-cover" />
                      <div>
                        <Link to="#" className="font-medium hover:text-primary">
                          How to get started with React in 2024
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>March 15, 2024</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-lg mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Technology', 'Business', 'Design', 'Development', 'Marketing'].map((tag) => (
                    <Link
                      key={tag}
                      to="#"
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;