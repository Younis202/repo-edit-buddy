
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast({
        title: "Thank you for subscribing!",
        description: "You'll now receive our monthly Nobel Campus newsletter.",
        duration: 5000,
      });
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Stay Informed</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
            Subscribe to our newsletter for the latest news about Nobel Prize winners, events, and educational resources.
          </p>
        </div>

        <div className="mt-8 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-md bg-white text-gray-800 placeholder:text-gray-500"
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-2 px-4"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="mt-3 text-sm text-blue-100 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
