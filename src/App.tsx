import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Checkout from './pages/Checkout';
import ShopDetail from './pages/ShopDetail';
import ScrollToTop from './components/ScrollToTop';
import Help from './pages/Help';
import Shipping from './pages/help/Shipping';
import Returns from './pages/help/Returns';
import Payments from './pages/help/Payments';
import ProductCare from './pages/help/ProductCare';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
          <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
            <main className="flex-grow w-full overflow-x-hidden pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<LoginForm />} />
                <Route path="/help" element={<Help />} />
                <Route path="/help/shipping" element={<Shipping />} />
                <Route path="/help/returns" element={<Returns />} />
                <Route path="/help/payments" element={<Payments />} />
                <Route path="/help/product-care" element={<ProductCare />} />
              <Route path="/register" element={
                  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                  <RegistrationForm />
                </div>
              } />
              <Route path="/shop-detail/:id" element={<ShopDetail />} />
            </Routes>
          </main>
          <WhatsAppButton />
          <Footer />
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App