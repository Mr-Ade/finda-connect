import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";

const BlogDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Blog Post Title</h1>
          {/* Blog content will go here */}
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default BlogDetail;