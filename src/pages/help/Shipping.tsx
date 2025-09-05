import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Shipping() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link to="/help" className="text-[#f98203] hover:text-[#dd2581] mb-4 inline-block">
          ← Back to Help
        </Link>
        <h1 className="text-3xl font-bold text-[#dd2581] mb-4">Shipping Information</h1>
        <p className="text-gray-600">Everything you need to know about our shipping and delivery services.</p>
      </motion.div>

      <div className="space-y-8">
        {/* Delivery Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-[#f98203] mr-3" />
            <h2 className="text-xl font-semibold">Delivery Times</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">Express Delivery</h3>
              <p className="text-green-700">Within 24 hours</p>
              <p className="text-sm text-green-600">Available in Kampala and major cities</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">Standard Delivery</h3>
              <p className="text-blue-700">2-3 business days</p>
              <p className="text-sm text-blue-600">Nationwide coverage</p>
            </div>
          </div>
        </motion.div>

        {/* Shipping Zones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-[#f98203] mr-3" />
            <h2 className="text-xl font-semibold">Shipping Zones</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#dd2581]">Zone 1 - Kampala & Entebbe</h3>
              <p className="text-gray-600">Free shipping on orders over $25</p>
              <p className="text-sm text-gray-500">Same-day delivery available</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#dd2581]">Zone 2 - Major Cities</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
              <p className="text-sm text-gray-500">Includes Jinja, Mbarara, Gulu, Lira</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#dd2581]">Zone 3 - Other Areas</h3>
              <p className="text-gray-600">Shipping fee: $5</p>
              <p className="text-sm text-gray-500">3-5 business days delivery</p>
            </div>
          </div>
        </motion.div>

        {/* Packaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 text-[#f98203] mr-3" />
            <h2 className="text-xl font-semibold">Packaging & Handling</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• All products are carefully packaged to prevent damage</li>
            <li>• Eco-friendly packaging materials used</li>
            <li>• Fragile items receive extra protection</li>
            <li>• Discreet packaging for sensitive products</li>
            <li>• Order tracking number provided via SMS/Email</li>
          </ul>
        </motion.div>

        {/* Contact for Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#f98203] text-white rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Need Help with Shipping?</h2>
          <p className="mb-4">Contact our customer service team for any shipping-related questions.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/256754507334"
              className="bg-white text-[#f98203] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              WhatsApp Support
            </a>
            <a
              href="tel:+256754507334"
              className="border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-[#f98203] transition-colors text-center"
            >
              Call Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}