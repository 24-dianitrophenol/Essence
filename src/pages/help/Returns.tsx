import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Returns() {
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
        <h1 className="text-3xl font-bold text-[#dd2581] mb-4">Returns & Refunds</h1>
        <p className="text-gray-600">Our comprehensive return policy and refund process.</p>
      </motion.div>

      <div className="space-y-8">
        {/* Return Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <RotateCcw className="w-6 h-6 text-[#f98203] mr-3" />
            <h2 className="text-xl font-semibold">30-Day Return Policy</h2>
          </div>
          <p className="text-gray-600 mb-4">
            We offer a 30-day return policy for most items. Returns must be in original condition with all packaging.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
              <h3 className="font-semibold text-green-800">Returnable Items</h3>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• Unopened skincare products</li>
                <li>• Unused beauty tools</li>
                <li>• Items in original packaging</li>
                <li>• Products with receipt/order number</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600 mb-2" />
              <h3 className="font-semibold text-red-800">Non-Returnable Items</h3>
              <ul className="text-sm text-red-700 mt-2 space-y-1">
                <li>• Opened/used skincare products</li>
                <li>• Personal care items</li>
                <li>• Custom/personalized products</li>
                <li>• Items damaged by customer</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Return Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">How to Return an Item</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#f98203] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">1</div>
              <div>
                <h3 className="font-semibold">Contact Customer Service</h3>
                <p className="text-gray-600">WhatsApp us at +256 754 507 334 or email support@puressence.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#f98203] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">2</div>
              <div>
                <h3 className="font-semibold">Get Return Authorization</h3>
                <p className="text-gray-600">We'll provide you with a return authorization number and instructions</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#f98203] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">3</div>
              <div>
                <h3 className="font-semibold">Package & Ship</h3>
                <p className="text-gray-600">Pack the item securely and ship to our return address</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#f98203] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">4</div>
              <div>
                <h3 className="font-semibold">Receive Refund</h3>
                <p className="text-gray-600">Refund processed within 5-7 business days after we receive the item</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Refund Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-[#f98203] mr-3" />
            <h2 className="text-xl font-semibold">Refund Timeline</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#dd2581]">Mobile Money</h3>
              <p className="text-gray-600">1-2 business days after approval</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#dd2581]">Bank Transfer</h3>
              <p className="text-gray-600">3-5 business days after approval</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#dd2581]">Store Credit</h3>
              <p className="text-gray-600">Immediate (can be used for future purchases)</p>
            </div>
          </div>
        </motion.div>

        {/* Contact for Returns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#dd2581] text-white rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Need to Return Something?</h2>
          <p className="mb-4">Our customer service team is here to help make your return process smooth and easy.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/256754507334"
              className="bg-white text-[#dd2581] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Start Return Process
            </a>
            <a
              href="mailto:support@puressence.com"
              className="border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-[#dd2581] transition-colors text-center"
            >
              Email Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}