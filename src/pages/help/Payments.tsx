import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Banknote, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Payments() {
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
        <h1 className="text-3xl font-bold text-[#dd2581] mb-4">Payment Methods</h1>
        <p className="text-gray-600">Secure and convenient payment options for your purchases.</p>
      </motion.div>

      <div className="space-y-8">
        {/* Payment Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-6">Available Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-3">
                <Smartphone className="w-6 h-6 text-[#f98203] mr-3" />
                <h3 className="font-semibold">Mobile Money</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• MTN Mobile Money</li>
                <li>• Airtel Money</li>
                <li>• Instant payment confirmation</li>
                <li>• No additional fees</li>
              </ul>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-3">
                <Banknote className="w-6 h-6 text-[#f98203] mr-3" />
                <h3 className="font-semibold">Cash on Delivery</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pay when you receive your order</li>
                <li>• Available in major cities</li>
                <li>• Exact change preferred</li>
                <li>• Small handling fee may apply</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Payment Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-[#f98203] mr-3" />
            <h2 className="text-xl font-semibold">Payment Security</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#dd2581] mb-2">Secure Transactions</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• SSL encryption for all payments</li>
                <li>• PCI DSS compliant processing</li>
                <li>• No card details stored on our servers</li>
                <li>• Fraud protection monitoring</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#dd2581] mb-2">Privacy Protection</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Personal information encrypted</li>
                <li>• Secure payment gateway partners</li>
                <li>• Regular security audits</li>
                <li>• GDPR compliant data handling</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Payment Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">How Payment Works</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#f98203] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">1</div>
              <div>
                <h3 className="font-semibold">Select Payment Method</h3>
                <p className="text-gray-600">Choose your preferred payment option at checkout</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#f98203] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">2</div>
              <div>
                <h3 className="font-semibold">Enter Payment Details</h3>
                <p className="text-gray-600">Provide necessary information securely</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#f98203] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">3</div>
              <div>
                <h3 className="font-semibold">Confirm Payment</h3>
                <p className="text-gray-600">Review and confirm your payment</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#f98203] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">4</div>
              <div>
                <h3 className="font-semibold">Order Confirmation</h3>
                <p className="text-gray-600">Receive confirmation via SMS and email</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#f98203] text-white rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Payment Issues?</h2>
          <p className="mb-4">Having trouble with your payment? Our support team is ready to help.</p>
          <div className="space-y-2 mb-4">
            <p className="text-sm">Common issues we can help with:</p>
            <ul className="text-sm space-y-1 ml-4">
              <li>• Payment declined or failed</li>
              <li>• Mobile money transaction issues</li>
              <li>• Refund status inquiries</li>
              <li>• Payment confirmation problems</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/256754507334"
              className="bg-white text-[#f98203] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              WhatsApp Support
            </a>
            <a
              href="mailto:payments@puressence.com"
              className="border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-[#f98203] transition-colors text-center"
            >
              Email Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}