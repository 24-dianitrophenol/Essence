import React from 'react';
import { motion } from 'framer-motion';

const offers = [
  { id: 1, title: 'Summer Sale - Up to 50% Off!', description: 'Get your favorite products at half price this summer.' },
  { id: 2, title: 'Buy One Get One Free', description: 'Special offer on selected items. Limited time only!' },
  { id: 3, title: 'Free Shipping on Orders Over $50', description: 'Enjoy free delivery when you spend $50 or more.' },
];

export default function Offers() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Current Offers</h1>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        {offers.map((offer) => (
          <motion.div
            key={offer.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow bg-gradient-to-r from-pink-50 to-purple-50"
          >
            <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
            <p className="text-gray-700">{offer.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
