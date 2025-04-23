
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-800">Nobel Campus</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/laureates" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
              Laureates
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
              Categories
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
              Resources
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <Button variant="default" className="bg-blue-800 hover:bg-blue-900">
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800">
              Home
            </Link>
            <Link to="/laureates" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800">
              Laureates
            </Link>
            <Link to="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800">
              Categories
            </Link>
            <Link to="/resources" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800">
              Resources
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800">
              About
            </Link>
            <div className="mt-4">
              <Button variant="default" className="w-full bg-blue-800 hover:bg-blue-900">
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
