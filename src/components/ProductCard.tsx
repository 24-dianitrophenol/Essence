import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isInWishlist: boolean;
  isAddedToCart: boolean;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  category, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist, 
  isAddedToCart 
}: ProductCardProps) {
  // Calculate UGX prices (1 USD = 3700 UGX)
  const ugxPrice3pcs = (price * 3700).toLocaleString();
  const ugxPrice12pcs = (price * 3700 * 12).toLocaleString();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Product Image Container */}
      <div className="relative p-4 pb-2">
        <div className="relative bg-gray-50 rounded-lg overflow-hidden">
          <Link to={`/shop-detail/${id}`} className="block">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-auto object-contain max-h-48 mx-auto block"
              style={{ aspectRatio: 'auto' }}
            />
          </Link>
          
          {/* Wishlist Heart - Top Right */}
          <button
            onClick={onToggleWishlist}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
          >
            <Heart 
              className={`w-4 h-4 ${
                isInWishlist 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="px-4 pb-4 flex-1 flex flex-col">
        <Link to={`/shop-detail/${id}`} className="block mb-3">
          <h3 className="text-sm font-medium text-gray-800 hover:text-[#dd2581] transition-colors line-clamp-2 leading-tight text-center">
            {name}
          </h3>
        </Link>
        
        {/* Pricing Section */}
        <div className="mb-4 flex-1 text-center">
          <div className="text-lg font-bold text-[#dd2581] text-center">
            ${price.toFixed(2)}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className={`w-full flex items-center justify-center space-x-1 py-2.5 px-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${
            isAddedToCart 
              ? 'bg-green-600 text-white' 
              : 'bg-[#dd2581] text-white hover:bg-[#f98203] hover:shadow-md'
          }`}
        >
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">{isAddedToCart ? 'ADDED!' : 'ADD TO CART'}</span>
        </button>
      </div>
    </div>
  );
}