import React from 'react';
import { Facebook, Twitter, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// TikTok icon component
const TikTokIcon = () => (
  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#dd2581] text-white pt-0 pb-0 mt-20 w-full">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/30 text-center md:text-left">
        {/* Why People Love Us */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Why People Love Us!</h3>
          <p className="text-white/80 mb-6">
            Pure Essence is dedicated to providing natural, safe, and effective skincare products. Our customers love our commitment to quality, sustainability, and real results.
          </p>
          <Link 
            to="/#why-shop-with-us"
            className="border border-white text-[#f98203] px-8 py-2 rounded-full font-semibold hover:bg-[#f98203] hover:text-white transition-colors"
          >
            Read More
          </Link>
        </div>
        {/* Shop Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Shop Info</h3>
          <ul className="space-y-2 text-white/80">
            <li><Link to="/about" className="hover:text-[#f98203] transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#f98203] transition-colors">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-[#f98203] transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[#f98203] transition-colors">Terms & Condition</Link></li>
            <li><Link to="/returns" className="hover:text-[#f98203] transition-colors">Return Policy</Link></li>
            <li><Link to="/faq" className="hover:text-[#f98203] transition-colors">FAQs & Help</Link></li>
          </ul>
        </div>
        {/* Account */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Account</h3>
          <ul className="space-y-2 text-white/80">
            <li><Link to="/account" className="hover:text-[#f98203] transition-colors">My Account</Link></li>
            <li><Link to="/shop-details" className="hover:text-[#f98203] transition-colors">Shop details</Link></li>
            <li><Link to="/cart" className="hover:text-[#f98203] transition-colors">Shopping Cart</Link></li>
            <li><Link to="/wishlist" className="text-[#f98203] hover:text-white transition-colors">Wishlist</Link></li>
            <li><Link to="/orders" className="hover:text-[#f98203] transition-colors">Order History</Link></li>
            <li><Link to="/international-orders" className="hover:text-[#f98203] transition-colors">International Orders</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-white/80">
            <li>Address: 123 Beauty Street, Skincare City</li>
            <li>Email: contact@puressence.com</li>
            <li>Phone: +256 776 203 930</li>
          </ul>
          
          {/* Social Media Links */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-3 sm:space-x-4 justify-center md:justify-start">
              {[
                { Icon: Twitter, href: "#", name: "Twitter" },
                { Icon: Facebook, href: "#", name: "Facebook" },
                { Icon: MessageCircle, href: "https://wa.me/256754507334", name: "WhatsApp" },
                { Icon: TikTokIcon, href: "#", name: "TikTok" }
              ].map(({ Icon, href, name }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white rounded-full p-2 sm:p-3 bg-transparent text-white hover:bg-white hover:text-[#dd2581] transition-colors"
                  aria-label={name}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-6 text-white/80 text-sm text-center md:text-left">
        <div>
          <span className="text-[#f98203]">© Pure Essence</span>, All rights reserved.
        </div>
        <div>
          Designed by <a href="https://www.tamuweb.site" target="_blank" rel="noopener noreferrer" className="text-[#f98203] font-semibold hover:text-white transition-colors">Tamu Web Solutions</a>
        </div>
      </div>
    </footer>
  );
}