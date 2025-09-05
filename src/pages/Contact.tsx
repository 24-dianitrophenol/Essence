import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1351/353' }}>
        <img
          src="/images/natural/8.jpg"
          alt="Contact Us"
          className="w-full h-full object-cover"
          style={{ maxWidth: '1351px', maxHeight: '353px' }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            Contact Us
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl font-bold text-[#dd2581] mb-6">A Journey of Faith</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2014, Pure Essence began with a small group of beauty enthusiasts who
              shared a vision of creating a welcoming community where people could experience
              natural beauty products and grow in their wellness journey.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-[#f98203] mr-4" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">contact@puressence.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-[#f98203] mr-4" />
                <div>
                  <h3 className="font-semibold">WhatsApp Contacts</h3>
                  <p className="text-gray-600">
                    Canada & USA: +(1204) 698-4791, +1 (778) 922-2041<br />
                    Uganda: +256 776 203 930, +256 754 507 334<br />
                    <em>All numbers are on WhatsApp</em>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-[#f98203] mr-4" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">123 Beauty Street<br />Skincare City, SC 12345</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg order-1 md:order-2"
          >
            <h2 className="text-2xl font-semibold text-[#dd2581] mb-6">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#dd2581]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#dd2581]"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#dd2581] h-32"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#f98203] text-white py-2 rounded-md hover:bg-[#dd2581] transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}