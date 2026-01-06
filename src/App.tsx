import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import HydrationPage from './pages/HydrationPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import QualityPage from './pages/QualityPage';
import ReviewsPage from './pages/ReviewsPage';
import TechnologyPage from './pages/TechnologyPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/hydration" element={<HydrationPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/quality" element={<QualityPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
