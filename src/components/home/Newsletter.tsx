import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export const Newsletter = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/80 mb-8">
            Stay updated with the latest listings and business opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative flex-1 max-w-md">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10 h-12 w-full"
              />
            </div>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};