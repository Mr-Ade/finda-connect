import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log('Attempting to subscribe email:', email);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter",
            variant: "default",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter",
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
      <div className="relative flex-1 max-w-md">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="email"
          placeholder="Enter your email"
          className="pl-10 h-12 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <Button 
        size="lg" 
        className="bg-white text-primary hover:bg-gray-100"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Subscribing..." : "Subscribe Now"}
      </Button>
    </form>
  );
};