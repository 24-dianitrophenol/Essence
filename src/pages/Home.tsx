import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allProducts } from '../data/allProducts';
import { useCart } from '../context/CartContext';
import { customerReviews } from '../data/customerReviews';
import { supabase, isConfigured } from '../utils/supabaseClient';

const slides = [
  {
    image: "/images/Home Sliders/WEB BANNER 10_page-0001.jpg"
  },
  {
    image: "/images/Home Sliders/SKIN PRODUCTS WEB PAGE.jpg"
  },
  {
    image: "/images/Home Sliders/NATURAL INGREDIENTS WEB BANNER.jpg"
  },
  {
    image: "/images/Home Sliders/CHAT WITH US ON WHATSAPP BANNER.jpg"
  },
  {
    image: "/images/Home Sliders/BEDROOM PRODUCTS WEB BANNER.jpg"
  }
];

const promoImages = [
  {
    image: "/images/Home Sliders/Lower image 1 (1).jpg"
  },
  {
    image: "/images/Home Sliders/Lower image 2.jpg"
  }
];

// Define Product type if not already imported
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  details?: {
    ingredients?: string;
    size?: string;
    usage?: string;
    benefits?: string;
  };
};

const getCategoryImage = (category: string) => {
  // Find a product with a valid image (not empty and not a placeholder)
  const product = allProducts.find(p =>
    p.category === category &&
    p.image &&
    p.image !== '' &&
    !p.image.toLowerCase().includes('placeholder')
  );
  return product?.image || '/images/placeholder.jpg';
};

const categoryProducts = [
  {
    category: 'Supplements',
    image: getCategoryImage('Supplements'),
    product: allProducts.find(p => p.category === 'Supplements') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Sports',
    image: getCategoryImage('Sports'),
    product: allProducts.find(p => p.category === 'Sports') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Bath',
    image: getCategoryImage('Bath'),
    product: allProducts.find(p => p.category === 'Bath') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Beauty',
    image: getCategoryImage('Beauty'),
    product: allProducts.find(p => p.category === 'Beauty') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Grocery',
    image: getCategoryImage('Grocery'),
    product: allProducts.find(p => p.category === 'Grocery') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Baby',
    image: getCategoryImage('Baby'),
    product: allProducts.find(p => p.category === 'Baby') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Pets',
    image: getCategoryImage('Pets'),
    product: allProducts.find(p => p.category === 'Pets') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Bedroom Products',
    image: getCategoryImage('Bedroom Products'),
    product: allProducts.find(p => p.category === 'Bedroom Products') || { name: "Coming Soon", price: 0 }
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});
  const [wishlist, setWishlist] = useState<{ [key: string]: boolean }>({});
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  // Carousel refs for sliding
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    if (isConfigured) {
      fetchTrendingProducts();
    } else {
      // Fallback to static if not configured
      const fallback = allProducts
        .filter(p => p.category === 'Supplements' && p.image && !p.image.toLowerCase().includes('placeholder'))
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      setTrendingProducts(fallback as any);
    }

    return () => clearInterval(timer);
  }, []);

  const fetchTrendingProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'Supplements')
      .limit(10);
    
    if (error) console.error('Error fetching trending:', error);
    else if (data) setTrendingProducts(data);
  };

  // Carousel navigation handlers
  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, dir: number) => {
    if (ref.current) {
      const width = ref.current.offsetWidth;
      ref.current.scrollBy({ left: dir * (width * 0.7), behavior: 'smooth' });
    }
  };

  const handleAddToCart: (product: Product) => void = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));

    // Reset button after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <div className="pt-0">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://pureesssense.com/"
            }]
          })
        }}
      />

      {/* Hero Slider - Clean images sliding left */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1351/353' }}>
        <div className="flex transition-transform duration-3000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full h-full">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ maxWidth: '1351px', maxHeight: '353px' }}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Two rectangular promotional images - Clean without text */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promoImages.map((promo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ aspectRatio: '900/400' }}
            >
              <img
                src={promo.image}
                alt={`Promo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ maxWidth: '900px', maxHeight: '400px' }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Header - Centered Layout */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Shop by Category</h2>
          <Link
            to="/products"
            className="border border-[#dd2581] text-[#dd2581] px-3 py-1 rounded-full text-xs font-medium hover:bg-[#dd2581] hover:text-white transition-all duration-300"
          >
            View More
          </Link>
        </div>

        {/* Horizontal Scrollable Categories */}
        <div className="relative bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:bg-[#dd2581] hover:text-white transition-all duration-300 border-2 border-gray-100"
            onClick={() => scrollCarousel(categoryRef, -1)}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <div
            ref={categoryRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-10"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {categoryProducts.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[160px] sm:min-w-[180px] bg-white border border-gray-200 rounded-xl overflow-hidden snap-center hover:shadow-xl transition-all duration-300 flex-shrink-0"
              >
                <div className="relative h-32 sm:h-36 overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.category}
                    className="w-full h-full object-contain p-3"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-sm font-bold text-gray-800">{item.category}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:bg-[#dd2581] hover:text-white transition-all duration-300 border-2 border-gray-100"
            onClick={() => scrollCarousel(categoryRef, 1)}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </section>

      {/* Trending Items Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Header - Centered Layout */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Trending Items</h2>
          <Link
            to="/products"
            className="border border-[#dd2581] text-[#dd2581] px-3 py-1 rounded-full text-xs font-medium hover:bg-[#dd2581] hover:text-white transition-all duration-300"
          >
            View More
          </Link>
        </div>

        {/* Horizontal Scrollable Trending Products */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:bg-[#dd2581] hover:text-white transition-all duration-300 border-2 border-gray-100"
            onClick={() => scrollCarousel(trendingRef, -1)}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <div
            ref={trendingRef}
            className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-10"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="w-[180px] sm:w-[220px] lg:w-[260px] min-w-[180px] sm:min-w-[220px] lg:min-w-[260px] bg-white rounded-xl shadow-lg transition-all duration-300 flex-shrink-0 border border-gray-100 flex flex-col snap-center hover:shadow-xl"
              >
                {/* Product Image Container */}
                <div className="relative p-3">
                  <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                    <Link to={`/shop-detail/${product.id}`} className="w-full h-full flex items-center justify-center p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-110"
                      />
                    </Link>

                    {/* TRENDING Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#f98203] text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                        NEW
                      </span>
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 ${wishlist[product.id]
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                          }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 pt-0 flex-1 flex flex-col">
                  <div className="mb-3">
                    <Link to={`/shop-detail/${product.id}`} className="block">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-[#dd2581] transition-colors line-clamp-2 leading-tight text-center h-10 flex items-center justify-center overflow-hidden">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-2 text-center">
                      <span className="text-sm sm:text-lg font-extrabold text-[#dd2581]">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="mt-auto">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-bold text-[10px] sm:text-xs tracking-wider transition-all duration-300 ${addedToCart[product.id]
                          ? 'bg-green-600 text-white shadow-inner scale-[0.98]'
                          : 'bg-[#dd2581] text-white hover:bg-[#f98203] hover:shadow-lg active:scale-95'
                        }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span className="uppercase">{addedToCart[product.id] ? 'ADDED!' : 'ADD TO CART'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:bg-[#dd2581] hover:text-white transition-all duration-300 border-2 border-gray-100"
            onClick={() => scrollCarousel(trendingRef, 1)}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </section>

      {/* Three images in 2+1 layout */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="three-images-layout">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
            style={{ aspectRatio: '900/400' }}
          >
            <img
              src="/images/Home Sliders/WEB BANNER 8_page-0001.jpg"
              alt="Feature 1"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
            style={{ aspectRatio: '900/400' }}
          >
            <img
              src="images/Home Sliders/WEB BANNER 9_page-0001 (1).jpg"
              alt="Feature 2"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative rounded-2xl overflow-hidden group full-width-bottom"
            style={{ aspectRatio: '1001/254' }}
          >
            <img
              src="images/Home Sliders/WEB BANNER 10_page-0001.jpg"
              alt="Feature 3"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Horizontal Slider */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#f98203] mb-12 text-center"
        >
          What Customers Say
        </motion.h2>
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-[#dd2581] hover:text-white"
            onClick={() => scrollCarousel(testimonialsRef, -1)}
            aria-label="Scroll left"
          >
            &#8592;
          </button>
          <div
            ref={testimonialsRef}
            className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {customerReviews.map((t) => (
              <motion.div
                key={t.id}
                className="min-w-[320px] max-w-sm bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center snap-center"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-[#dd2581]"
                />
                <h4 className="text-lg font-bold text-[#f98203] mb-1">{t.name}</h4>
                <span className="text-gray-500 mb-2">{t.profession}</span>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-yellow-400 text-lg ${i < t.rating ? '' : 'opacity-30'}`}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{t.comment}"</p>
              </motion.div>
            ))}
          </div>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-[#dd2581] hover:text-white"
            onClick={() => scrollCarousel(testimonialsRef, 1)}
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </section>
    </div>
  );
}