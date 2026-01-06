import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-900">
          Brand
        </Link>
        <ul className="flex gap-6">
          <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
          <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
          <li><Link to="/hydration" className="text-gray-600 hover:text-gray-900">Hydration</Link></li>
          <li><Link to="/products" className="text-gray-600 hover:text-gray-900">Products</Link></li>
          <li><Link to="/quality" className="text-gray-600 hover:text-gray-900">Quality</Link></li>
          <li><Link to="/reviews" className="text-gray-600 hover:text-gray-900">Reviews</Link></li>
          <li><Link to="/technology" className="text-gray-600 hover:text-gray-900">Technology</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
