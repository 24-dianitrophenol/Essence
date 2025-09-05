import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star } from 'lucide-react';
import { allProducts } from '../data/allProducts';

export default function ShopDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Find product in all products
  const product = allProducts.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-2 md:px-4 py-16 mt-10 text-center">
        <h2 className="text-4xl font-extrabold text-[#dd2581] mb-8">Product Not Found</h2>
        <p className="text-gray-700">Sorry, we couldn't find the product you're looking for.</p>
      </div>
    );
  }

  // Default reviews and rating for demo
  const reviews = [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      comment: "This product has transformed my skin! It's so hydrating and smells amazing.",
      date: "2024-03-15"
    },
    {
      id: 2,
      user: "John D.",
      rating: 4,
      comment: "Great product, very moisturizing. Would recommend to anyone with dry skin.",
      date: "2024-03-10"
    },
    {
      id: 3,
      user: "Emma L.",
      rating: 5,
      comment: "Love how natural this feels on my skin. No irritation at all!",
      date: "2024-03-05"
    }
  ];
  const rating = 5;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#dd2581] mt-16 mb-8 sm:mb-10 text-center">Product Detail</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* Product Image */}
        <div className="rounded-xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover" />
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <span className="bg-[#f98203] text-white px-3 sm:px-4 py-1 rounded-full text-sm font-semibold">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-3 sm:mt-4">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex text-[#f98203]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${i < rating ? 'fill-current' : 'stroke-current'}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2">({rating})</span>
            </div>
          </div>

          <p className="text-2xl sm:text-3xl font-bold text-[#dd2581]">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-600 text-sm sm:text-base">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-3 sm:px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#dd2581] text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-[#f98203] transition-colors text-sm sm:text-base"
            >
              Add to Cart
            </button>
          </div>

          {/* Product Details Section - only if details exist */}
          {product.details && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold mb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Ingredients</p>
                  <p className="text-gray-600">{product.details.ingredients}</p>
                </div>
                <div>
                  <p className="font-semibold">Size</p>
                  <p className="text-gray-600">{product.details.size}</p>
                </div>
                <div>
                  <p className="font-semibold">Usage</p>
                  <p className="text-gray-600">{product.details.usage}</p>
                </div>
                <div>
                  <p className="font-semibold">Benefits</p>
                  <p className="text-gray-600">{product.details.benefits}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Customer Reviews</h2>
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-gray-800">{review.user}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-[#f98203]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'stroke-current'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2 text-sm">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 