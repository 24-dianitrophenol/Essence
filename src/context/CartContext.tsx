import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartCount: number;
  isCheckoutOpen: boolean;
  customerInfo: CustomerInfo;
  paymentMethod: string;
  toggleCheckout: () => void;
  updateCustomerInfo: (info: CustomerInfo) => void;
  setPaymentMethod: (method: string) => void;
  completeOrder: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const addToCart = (product: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prevItems, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? {...item, quantity} : item
      )
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCheckout = () => setIsCheckoutOpen(!isCheckoutOpen);
  
  const updateCustomerInfo = (info: CustomerInfo) => setCustomerInfo(info);
  
  const completeOrder = () => {
    // TODO: Implement order submission logic
    console.log('Order completed:', { customerInfo, paymentMethod, cartItems });
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        cartCount,
        isCheckoutOpen,
        customerInfo,
        paymentMethod,
        toggleCheckout,
        updateCustomerInfo,
        setPaymentMethod,
        completeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
