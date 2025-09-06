import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Truck, ShieldCheck, Phone, Package, Smile, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allProducts } from '../data/allProducts';
import { useCart } from '../context/CartContext';

const slides = [
  {
    image: "/images/Home Sliders/WEB BANNER PURE ESSENCE 1_page-0001.jpg"
  },
  {
    image: "/images/Home Sliders/WEB BANNER PURE ESSENCE TWO_page-0001.jpg"
  },
  {
    image: "/images/Home Sliders/WEB BANNER PURE ESSENCE THREE_page-0001.jpg"
  },
  {
    image: "/images/Home Sliders/WEB BANNER PURE ESSENCE FOUR_page-0001.jpg"
  },
  {
    image: "/images/Home Sliders/WEB BANNER PURE ESSENCE FIVE_page-0001.jpg"
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
  // add other fields as needed
};

// Get trending products (first 8 products from different categories)
const trendingProducts: Product[] = [
  allProducts.find(p => p.category === 'Skin Products' && p.name.includes('Lanorient')),
  allProducts.find(p => p.category === 'Health Products' && p.name.includes('Organika')),
  allProducts.find(p => p.category === 'Lotions' && p.name.includes('Vaseline')),
  allProducts.find(p => p.category === 'Tablets' && p.name.includes('Vitamin C')),
  allProducts.find(p => p.category === 'Bedroom Products' && p.name.includes('Testosterone')),
  allProducts.find(p => p.category === 'Skin Products' && p.name.includes('PCA')),
  allProducts.find(p => p.category === 'Health Products' && p.name.includes('Naka')),
  allProducts.find(p => p.category === 'Lotions' && p.name.includes('Dr Teals'))
].filter(Boolean) as Product[];

const categoryProducts = [
  {
    category: 'Skin Products',
    image: '/images/natural/23.jpg',
    product: allProducts.find(p => p.category === 'Skin Products') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Lotions',
    image: '/images/natural/24.jpg',
    product: allProducts.find(p => p.category === 'Lotions') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Health Products',
    image: '/images/natural/15.jpg',
    product: allProducts.find(p => p.category === 'Health Products') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Tablets',
    image: '/images/natural/16.jpg',
    product: allProducts.find(p => p.category === 'Tablets') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Bedroom Products',
    image: '/images/natural/17.jpg',
    product: allProducts.find(p => p.category === 'Bedroom Products') || { name: "Coming Soon", price: 0 }
  },
  {
    category: 'Health Products',
    image: '/images/natural/18.jpg',
    product: allProducts.find(p => p.category === 'Health Products') || { name: "Coming Soon", price: 0 }
  }
];

const testimonials = [
  {
    name: 'Sarah K.',
    profession: 'Entrepreneur',
    image: '/images/testimonials/client1.jpg',
    rating: 5,
    comment: 'Absolutely love these products! My skin has never felt better.'
  },
  {
    name: 'James O.',
    profession: 'Teacher',
    image: '/images/testimonials/client2.jpg',
    rating: 4,
    comment: 'High quality and natural. I recommend to all my friends.'
  },
  {
    name: 'Aisha N.',
    profession: 'Model',
    image: '/images/testimonials/client3.jpg',
    rating: 5,
    comment: 'The best skincare I have ever used! Will buy again.'
  }
];

const features = [
  {
    icon: Leaf,
    title: "100% Natural Ingredients",
    description: "Pure, safe, and effective for all skin types.",
    backDescription: "Our products are made with certified organic ingredients sourced from sustainable farms worldwide."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your order quickly, wherever you are in Uganda.",
    backDescription: "Same-day delivery in Kampala and 2-3 days nationwide with real-time tracking."
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Your transactions are always safe and protected.",
    backDescription: "Bank-level encryption and multiple payment options including mobile money and cards."
  },
  {
    icon: Phone,
    title: "Customer Support",
    description: "Friendly help whenever you need it.",
    backDescription: "24/7 WhatsApp support and expert skincare consultations available."
  },
  {
    icon: Package,
    title: "Eco-Friendly Packaging",
    description: "We care for the planet as much as your skin.",
    backDescription: "100% recyclable packaging made from biodegradable materials."
  },
  {
    icon: Smile,
    title: "Satisfaction Guarantee",
    description: "We promise you'll love your purchase.",
    backDescription: "30-day money-back guarantee and free product exchanges."
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<{[key: string]: boolean}>({});
  const [wishlist, setWishlist] = useState<{[key: string]: boolean}>({});

  // Carousel refs for sliding
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
      {/* Hero Slider - Clean images sliding left */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1351/353' }}>
        <div className="flex transition-transform duration-1000 ease-in-out h-full"
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

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-[#f98203]' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
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
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Shop by Category</h2>
          <div className="w-24 sm:w-32 h-1 bg-[#dd2581] rounded-full mx-auto mb-6"></div>
        </div>
        
        {/* Category Grid - Responsive Layout */}
        <div className="relative">
          {/* Mobile & Tablet: Stacked Grid Layout */}
          <div className="block lg:hidden">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {categoryProducts.slice(0, 6).map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="relative h-32 sm:h-40 overflow-hidden bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.category}
                        className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 sm:p-4 text-center">
                      <h3 className="text-xs sm:text-sm lg:text-base font-bold text-gray-800 leading-tight line-clamp-2">
                        {item.category}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Horizontal Scrollable */}
          <div className="hidden lg:block">
            <div className="relative bg-white rounded-2xl shadow-lg p-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-4 hover:bg-[#dd2581] hover:text-white transition-all duration-300 border-2 border-gray-100"
                onClick={() => scrollCarousel(categoryRef, -1)}
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <div
                ref={categoryRef}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-12"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {categoryProducts.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="min-w-[200px] bg-white border border-gray-200 rounded-2xl overflow-hidden snap-center hover:shadow-xl transition-all duration-300 flex-shrink-0"
                  >
                    <div className="relative h-40 overflow-hidden bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.category}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-base font-bold text-gray-800">{item.category}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-4 hover:bg-[#dd2581] hover:text-white transition-all duration-300 border-2 border-gray-100"
                onClick={() => scrollCarousel(categoryRef, 1)}
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* View More Button - Centered */}
          <div className="text-center mt-6">
            <Link 
              to="/products" 
              className="inline-block border-2 border-[#dd2581] text-[#dd2581] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold hover:bg-[#dd2581] hover:text-white transition-all duration-300 shadow-md text-sm sm:text-base"
            >
              View More
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Items Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Trending Items</h2>
          <div className="w-24 sm:w-32 h-1 bg-[#dd2581] rounded-full mx-auto mb-6"></div>
        </div>
        
        <div className="relative">
          {/* Mobile & Tablet: Grid Layout */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {trendingProducts.slice(0, 6).map((product, idx) => (
                product && (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
                >
                  {/* Product Image Container */}
                  <div className="relative p-3 pb-2">
                    <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                      <Link to={`/shop-detail/${product.id}`} className="block">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-auto object-contain max-h-28 sm:max-h-32 mx-auto block group-hover:scale-105 transition-transform duration-300"
                          style={{ aspectRatio: 'auto' }}
                        />
                      </Link>
                      
                      {/* TRENDING Badge */}
                      <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
                        <span className="bg-[#f98203] text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                          HOT
                        </span>
                      </div>
                      
                      {/* Wishlist Heart */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <Heart 
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            wishlist[product.id] 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="px-3 pb-3 flex-1 flex flex-col">
                    <Link to={`/shop-detail/${product.id}`} className="block mb-2">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-800 hover:text-[#dd2581] transition-colors line-clamp-2 leading-tight text-center">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Pricing Section */}
                    <div className="mb-3 flex-1">
                      <div className="text-sm sm:text-base font-bold text-[#dd2581] text-center">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full flex items-center justify-center space-x-1 py-2 px-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
                        addedToCart[product.id] 
                          ? 'bg-green-600 text-white' 
                          : 'bg-[#dd2581] text-white hover:bg-[#f98203] hover:shadow-md'
                      }`}
                    >
                      <ShoppingCart className="w-3 h-3 flex-shrink-0" />
                      <span className="whitespace-nowrap text-xs">{addedToCart[product.id] ? 'ADDED!' : 'ADD'}</span>
                    </button>
                  </div>
                </motion.div>
                )
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal Scrollable */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-4 hover:bg-[#dd2581] hover:text-white transition-all duration-300 border-2 border-gray-100"
              onClick={() => scrollCarousel(trendingRef, -1)}
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <div
              ref={trendingRef}
              className="flex gap-3 lg:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-8 lg:px-12"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {trendingProducts.map((product, idx) => (
                product && (
                <div
                  key={product.id}
                  className="min-w-[180px] lg:min-w-[260px] bg-white rounded-xl shadow-lg overflow-hidden snap-center hover:shadow-xl transition-all duration-300 flex-shrink-0 border border-gray-100 flex flex-col"
                >
                  {/* Product Image Container */}
                  <div className="relative p-3 lg:p-4 pb-2">
                    <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                      <Link to={`/shop-detail/${product.id}`} className="block">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-auto object-contain max-h-32 lg:max-h-44 mx-auto block"
                          style={{ aspectRatio: 'auto' }}
                        />
                      </Link>
                      
                      {/* TRENDING Badge */}
                      <div className="absolute top-2 left-2 lg:top-3 lg:left-3">
                        <span className="bg-[#f98203] text-white px-1.5 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs font-bold">
                          TRENDING
                        </span>
                      </div>
                      
                      {/* Wishlist Heart */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 lg:top-3 lg:right-3 p-1 lg:p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <Heart 
                          className={`w-2.5 h-2.5 lg:w-4 lg:h-4 ${
                            wishlist[product.id] 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="px-3 lg:px-4 pb-3 lg:pb-4 flex-1 flex flex-col">
                    <Link to={`/shop-detail/${product.id}`} className="block mb-3">
                      <h3 className="text-xs lg:text-base font-medium text-gray-800 hover:text-[#dd2581] transition-colors line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Pricing Section */}
                    <div className="mb-4 flex-1">
                      <div className="text-xs lg:text-base font-bold text-[#dd2581] text-center">
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full flex items-center justify-center space-x-1 py-2 lg:py-2.5 px-2 lg:px-4 rounded-lg font-semibold text-xs lg:text-sm transition-all duration-300 ${
                        addedToCart[product.id] 
                          ? 'bg-green-600 text-white' 
                          : 'bg-[#dd2581] text-white hover:bg-[#f98203] hover:shadow-md'
                      }`}
                    >
                      <ShoppingCart className="w-2.5 h-2.5 lg:w-4 lg:h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{addedToCart[product.id] ? 'ADDED!' : 'ADD TO CART'}</span>
                    </button>
                  </div>
                </div>
                )
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-4 hover:bg-[#dd2581] hover:text-white transition-all duration-300 border-2 border-gray-100"
              onClick={() => scrollCarousel(trendingRef, 1)}
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* View More Button - Centered */}
          <div className="text-center mt-6">
            <Link 
              to="/products" 
              className="inline-block border-2 border-[#dd2581] text-[#dd2581] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold hover:bg-[#dd2581] hover:text-white transition-all duration-300 shadow-md text-sm sm:text-base"
            >
              View More
            </Link>
          </div>
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
            className="relative rounded-2xl overflow-hidden group cursor-pointer full-width-bottom"
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

      {/* Why Shop With Us - Pink front, Orange back, no gradient */}
      <section id="why-shop-with-us" className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#f98203] mb-12 text-center"
        >
          Why Shop With Us?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flip-card h-64"
            >
              <div className="flip-card-inner">
                {/* Front of card - Pink */}
                <div className="flip-card-front bg-[#dd2581] text-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
                  {React.createElement(feature.icon, { className: "h-12 w-12 mb-4" })}
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </div>
                {/* Back of card - Orange */}
                <div className="flip-card-back bg-[#f98203] text-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
                  {React.createElement(feature.icon, { className: "h-12 w-12 mb-4" })}
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/90">{feature.backDescription}</p>
                </div>
              </div>
            </motion.div>
          ))}
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
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
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