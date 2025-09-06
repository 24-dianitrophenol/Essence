import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Search, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { allProducts } from '../data/allProducts';
import { useCart } from '../context/CartContext';

const categories = [
  'All Categories',
  'Skin Products',
  'Lotions', 
  'Bedroom Products',
  'Tablets',
  'Health Products'
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allProducts>([]);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  const isActive = (path: string) => {
    return location.pathname === (path === 'Home' ? '/' : `/${path.toLowerCase()}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category && product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <nav className="bg-[#dd2581] fixed top-0 left-0 right-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/" className="flex items-center group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="/images/Pure Essence logo.png"
                    alt="Logo"
                    className="h-12 w-auto sm:h-12"
                  />
                </motion.div>
                <span className="ml-2 text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-[#f98203] transition-colors select-none"></span>
              </Link>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {['Home', 'Products', 'Help', 'Contact'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className={`text-white px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive(item) ? 'bg-[#f98203]' : 'hover:bg-[#f98203]'
                      }`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-[#f98203] transition-colors p-2"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </motion.button>
              <Link to="/cart" className="relative text-white hover:text-[#f98203] transition-colors p-2" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#f98203] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-[#f98203] transition-colors p-2"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </motion.button>
              <Link to="/cart" className="relative text-white hover:text-[#f98203] transition-colors p-2" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#f98203] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-[#f98203] transition-colors p-2"
                aria-label="Menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#f98203]/20"
            >
              <div className="max-w-7xl mx-auto px-4 py-3">
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#f98203]"
                  autoFocus
                />
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 right-0 mt-2 mx-4 bg-white rounded-md shadow-lg overflow-hidden z-50"
                  >
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                            setSearchResults([]);
                          }}
                          className="flex items-center p-4 hover:bg-gray-50"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.category}</div>
                          </div>
                          <div className="ml-auto text-sm font-medium text-[#dd2581]">
                            ${product.price.toFixed(2)}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {isOpen && (
            <motion.div
              className="md:hidden fixed inset-0 top-16 bg-[#dd2581] shadow-lg overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {['Home', 'Products', 'Help', 'Contact', 'Cart'].map((item) => (
                  <Link
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`text-white block px-4 py-3 rounded-md text-lg transition-colors ${
                      isActive(item) ? 'bg-[#f98203]' : 'hover:bg-[#f98203]'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                
                {/* Mobile Categories */}
                <div className="border-t border-white/20 pt-4 mt-4">
                  <h3 className="text-white font-semibold mb-2">Categories</h3>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to="/products"
                      className={`text-white block px-4 py-2 rounded-md transition-colors hover:bg-[#f98203] ${
                        category === 'All Categories' ? 'text-[#f98203] font-semibold' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Categories Bar - Desktop Only */}
      <div className="bg-white shadow-sm border-b border-gray-200 fixed top-16 left-0 right-0 w-full z-40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center py-3 overflow-x-auto">
            <div className="flex space-x-6 min-w-max">
              {/* All Categories with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                  className="flex items-center text-[#dd2581] hover:text-[#f98203] transition-colors text-sm font-medium whitespace-nowrap"
                >
                  All Categories
                  <ChevronDown className="ml-1 h-4 w-4 text-[#dd2581]" />
                </button>
                
                {showCategoriesDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px]">
                    {categories.slice(1).map((category) => (
                      <Link
                        key={category}
                        to="/products"
                        className="block px-4 py-2 text-gray-700 hover:bg-[#f98203] hover:text-white transition-colors"
                        onClick={() => setShowCategoriesDropdown(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Other Categories */}
              {categories.slice(1).map((category) => (
                <Link
                  key={category}
                  to="/products"
                  className="text-gray-700 hover:text-[#dd2581] transition-colors text-sm font-medium whitespace-nowrap"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}