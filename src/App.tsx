import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isAdminPage && !isLoginPage && <Navbar />}
      <main className={`flex-grow w-full overflow-x-hidden ${!isAdminPage && !isLoginPage ? 'pt-16' : ''}`}>
        {children}
      </main>
      {!isAdminPage && <WhatsAppButton />}
      {!isAdminPage && !isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login />} />
              <Route path="/help" element={<Help />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/help/shipping" element={<Shipping />} />
              <Route path="/help/returns" element={<Returns />} />
              <Route path="/help/payments" element={<Payments />} />
              <Route path="/help/product-care" element={<ProductCare />} />
              <Route path="/shop-detail/:id" element={<ShopDetail />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App