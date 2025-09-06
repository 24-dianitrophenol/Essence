import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { allProducts, getProductsByCategory } from '../data/allProducts';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

// Define category type
type Category = 'All' | 'Health Products' | 'Skin Products' | 'Lotions' | 'Tablets' | 'Bedroom Products';

// Available product categories
const categories: Exclude<Category, 'All'>[] = [
  'Health Products',
  'Skin Products', 
  'Lotions',
  'Tablets',
  'Bedroom Products'
];

// Category-specific slideshow images
const categorySlides: Record<Category, { image: string }[]> = {
  'All': [
    { image: "/images/Home Sliders/WEB BANNER 10_page-0001.jpg" },
    { image: "/images/Home Sliders/NATURAL INGREDIENTS WEB BANNER.jpg" }
  ],
  'Skin Products': [
    { image: "/images/Home Sliders/SKIN PRODUCTS WEB PAGE.jpg" },
    { image: "/images/Home Sliders/CHAT WITH US ON WHATSAPP BANNER.jpg" }
  ],
  'Lotions': [
    { image: "/images/Home Sliders/SKIN PRODUCTS WEB PAGE.jpg" },
    { image: "/images/Home Sliders/WEB BANNER 10_page-0001.jpg" }
  ],
  'Bedroom Products': [
    { image: "/images/Home Sliders/BEDROOM PRODUCTS WEB BANNER.jpg" },
    { image: "/images/Home Sliders/WEB BANNER 10_page-0001.jpg" }
  ],
  'Tablets': [
    { image: "/images/Home Sliders/NATURAL INGREDIENTS WEB BANNER.jpg" },
    { image: "/images/Home Sliders/WEB BANNER 10_page-0001.jpg" }
  ],
  'Health Products': [
    { image: "/images/Home Sliders/NATURAL INGREDIENTS WEB BANNER.jpg" },
    { image: "/images/Home Sliders/WEB BANNER 10_page-0001.jpg" }
  ]
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [currentPromoSlide, setCurrentPromoSlide] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [addedToCart, setAddedToCart] = useState<{[key: string]: boolean}>({});
  const [wishlist, setWishlist] = useState<{[key: string]: boolean}>({});
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const currentSlides = categorySlides[selectedCategory] ?? categorySlides['All'];

  // Auto-slide for promo images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromoSlide((prev) => (prev + 1) % currentSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlides.length]);

  // Reset slide when category changes
  useEffect(() => {
    setCurrentPromoSlide(0);
  }, [selectedCategory]);

  // Filter products by category
  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : getProductsByCategory(selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    
    // Reset button after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="pt-16">
      {/* Full Width Hero Image */}
      <div className="relative w-full mb-8 overflow-hidden" style={{ aspectRatio: '1351/353' }}>
        <div className="flex transition-transform duration-1000 ease-in-out h-full"
             style={{ transform: `translateX(-${currentPromoSlide * 100}%)` }}>
          {currentSlides.map((slide, index) => (
            <div key={index} className="min-w-full h-full">
              <img
                src={slide.image}
                alt={`Promo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {currentSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentPromoSlide === index ? 'bg-[#f98203]' : 'bg-white/50'
              }`}
              onClick={() => setCurrentPromoSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-extrabold text-center text-[#dd2581] mb-8"
        >
          Our Products
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Categories */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-36">
            <h3 className="text-lg font-semibold mb-4 text-[#dd2581]">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 text-sm ${
                  selectedCategory === 'All' 
                    ? 'bg-[#dd2581] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-[#f98203] hover:text-white'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 text-sm ${
                    selectedCategory === category 
                      ? 'bg-[#dd2581] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-[#f98203] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {sortedProducts.length} Products
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f98203] bg-white"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                onAddToCart={() => handleAddToCart(product)}
                onToggleWishlist={() => toggleWishlist(product.id)}
                isInWishlist={wishlist[product.id] || false}
                isAddedToCart={addedToCart[product.id] || false}
              />
            ))}
          </div>

          {/* No products message */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base md:text-lg">No products found in this category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 px-4 md:px-6 py-2 bg-[#f98203] text-white rounded-full hover:bg-[#dd2581] transition-colors text-sm md:text-base"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}