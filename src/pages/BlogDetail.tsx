import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Search, Quote } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-semibold mb-2">
              List of Advance Features and Support with Finda
            </h1>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-700 hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2.5 text-gray-400">/</span>
                    <span className="text-primary">Blog Detail</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Article */}
              <article className="bg-white rounded-lg shadow-sm mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="Blog post" 
                  className="w-full h-[400px] object-cover rounded-t-lg"
                />
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-gray-600">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-user"></i>
                      by Mach K. Mortin
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-comment"></i>
                      45 Comments
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-4">List of Advance Features and Support with Finda</h2>
                  <p className="text-gray-600 mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <blockquote className="border-l-4 border-primary pl-4 my-8">
                    <div className="flex gap-4 mb-4">
                      <Quote size={24} className="text-primary" />
                    </div>
                    <p className="text-gray-600 italic mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
                      labore et dolore magna aliqua.
                    </p>
                    <footer className="text-gray-700 font-medium">- Litha K. Mortin</footer>
                  </blockquote>
                </div>
              </article>

              {/* Author Info */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
                    <AvatarFallback>RW</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Rosalina William</h3>
                    <div className="flex gap-4 mb-4">
                      <a href="#" className="text-gray-400 hover:text-primary">
                        <Facebook size={20} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary">
                        <Twitter size={20} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary">
                        <Instagram size={20} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary">
                        <Linkedin size={20} />
                      </a>
                    </div>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
                      labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h3 className="text-xl font-semibold mb-6">Comments (5)</h3>
                {/* Comment Form */}
                <form className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" />
                  </div>
                  <Textarea 
                    className="mb-4" 
                    placeholder="Your Comment" 
                    rows={6}
                  />
                  <Button>Post Comment</Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h4 className="text-lg font-semibold mb-4">Search</h4>
                <div className="relative">
                  <Input placeholder="Search..." />
                  <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h4 className="text-lg font-semibold mb-4">Categories</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="flex justify-between text-gray-600 hover:text-primary">
                      Lifestyle <span>09</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex justify-between text-gray-600 hover:text-primary">
                      Travel <span>12</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex justify-between text-gray-600 hover:text-primary">
                      Fashion <span>19</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex justify-between text-gray-600 hover:text-primary">
                      Music <span>10</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h4 className="text-lg font-semibold mb-4">Recent Posts</h4>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4">
                      <img
                        src={`https://images.unsplash.com/photo-148${i}312338219-ce68d2c6f44d`}
                        alt="Recent post"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h5 className="font-medium mb-1 hover:text-primary">
                          <a href="#">How to get started with Finda</a>
                        </h5>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="text-lg font-semibold mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Lifestyle', 'Travel', 'Fashion', 'Music', 'Food'].map((tag) => (
                    <a
                      key={tag}
                      href="#"
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}