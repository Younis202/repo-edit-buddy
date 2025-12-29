
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found | Nobel Campus";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl font-extrabold text-blue-800 mb-6">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-lg text-gray-500 mb-8">
            We're sorry, the page you requested could not be found. It might have been moved or doesn't exist.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <Link to="/">
              <Button className="bg-blue-800 hover:bg-blue-900 w-full">
                Return to Homepage
              </Button>
            </Link>
            <Link to="/laureates" className="text-blue-800 hover:text-blue-900 text-sm font-medium">
              Browse Laureates
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
