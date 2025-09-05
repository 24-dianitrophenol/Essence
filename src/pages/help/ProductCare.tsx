import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sun, Thermometer, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCare() {
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
        <h1 className="text-3xl font-bold text-[#dd2581] mb-4">Product Care Guide</h1>
        <p className="text-gray-600">Learn how to properly store and use your Pure Essence products for best results.</p>
      </motion.div>

      <div className="space-y-8">
        {/* Storage Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-6">Storage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-3">
                <Thermometer className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-800">Temperature</h3>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Store at room temperature (15-25°C)</li>
                <li>• Avoid extreme heat or cold</li>
                <li>• Keep away from radiators</li>
                <li>• Don't leave in cars</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center mb-3">
                <Sun className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-yellow-800">Light Protection</h3>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Store in dark, dry places</li>
                <li>• Avoid direct sunlight</li>
                <li>• Use original packaging</li>
                <li>• Close containers tightly</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Product-Specific Care */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-6">Product-Specific Care</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#dd2581] mb-2">Skincare Products</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Use clean hands or spatula</li>
                <li>• Replace caps immediately after use</li>
                <li>• Check expiry dates regularly</li>
                <li>• Patch test new products</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#dd2581] mb-2">Serums & Oils</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Store in cool, dark places</li>
                <li>• Use within 6 months of opening</li>
                <li>• Avoid contamination</li>
                <li>• Check for color/smell changes</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#dd2581] mb-2">Supplements & Tablets</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Keep in original containers</li>
                <li>• Store in dry conditions</li>
                <li>• Follow dosage instructions</li>
                <li>• Check for moisture damage</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Usage Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <Droplets className="w-6 h-6 text-[#f98203] mr-3" />
            <h2 className="text-xl font-semibold">Usage Best Practices</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#dd2581]">Application Tips</h3>
              <ul className="text-gray-600 mt-2 space-y-1">
                <li>• Start with clean skin</li>
                <li>• Apply products in thin layers</li>
                <li>• Allow absorption between products</li>
                <li>• Use sunscreen during the day</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#dd2581]">Frequency Guidelines</h3>
              <ul className="text-gray-600 mt-2 space-y-1">
                <li>• Follow product instructions</li>
                <li>• Start slowly with active ingredients</li>
                <li>• Monitor skin reactions</li>
                <li>• Adjust usage as needed</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Safety Warnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-50 border border-red-200 rounded-xl p-6"
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <h2 className="text-xl font-semibold text-red-800">Important Safety Information</h2>
          </div>
          <div className="space-y-3 text-red-700">
            <p>• Discontinue use if irritation occurs</p>
            <p>• Keep products away from children</p>
            <p>• Do not use expired products</p>
            <p>• Consult a doctor for persistent skin issues</p>
            <p>• Avoid contact with eyes unless specified</p>
          </div>
        </motion.div>

        {/* Contact for Product Care */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#dd2581] text-white rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Need Product Care Advice?</h2>
          <p className="mb-4">Our skincare experts are here to help you get the most out of your products.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/256754507334"
              className="bg-white text-[#dd2581] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Ask an Expert
            </a>
            <a
              href="mailto:skincare@puressence.com"
              className="border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-[#dd2581] transition-colors text-center"
            >
              Email Questions
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}