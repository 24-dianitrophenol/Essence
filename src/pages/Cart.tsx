import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartCount,
  } = useCart();
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-8 text-[#dd2581] text-center">Your Cart ({cartCount} items)</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link 
            to="/products" 
            className="bg-[#f98203] text-white px-4 py-2 rounded hover:bg-[#dd2581] transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="md:col-span-2 space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center border-b py-4 bg-white rounded-lg shadow-md px-4">
                <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                    className="w-20 h-20 object-cover rounded border-2 border-[#f98203]"
                />
                  <div className="ml-4">
                  <h3 className="font-medium text-lg text-[#dd2581]">{item.name}</h3>
                  <p className="text-gray-600 font-semibold">
                    ${item.price.toFixed(2)} per item
                  </p>
                </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0">
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="px-2 py-1 border rounded-l bg-gray-100 hover:bg-[#f98203] hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded-r bg-gray-100 hover:bg-[#f98203] hover:text-white"
                  >
                    +
                  </button>
                  </div>
                  <div className="flex items-center ml-4">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                    <div className="ml-4 text-right">
                  <div className="text-gray-700 font-semibold">
                    Subtotal:
                  </div>
                  <div className="text-[#f98203] font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg h-fit">
            <h2 className="text-xl font-bold mb-4 text-[#f98203]">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link 
              to="/checkout"
              className="w-full block text-center bg-[#dd2581] text-white py-3 rounded mt-6 hover:bg-[#f98203] transition font-bold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}