import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Logic for sending email (e.g. via EmailJS or similar service)
      console.log('Sending message to pureesscense@gmail.com:', formData);
      
      // Simulate success for now
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', whatsapp: '', message: '' });
      }, 1500);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://pureesssense.com/"
            }, {
              "@type": "ListItem",
              "position": 2,
              "name": "Contact Us",
              "item": "https://pureesssense.com/contact"
            }]
          })
        }}
      />

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
                  <p className="text-gray-600">pureesscense@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-[#f98203] mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">WhatsApp Support</h3>
                  <p className="text-gray-600 font-bold text-xl">+1(204) 698-4791</p>
                  <p className="text-gray-500 text-sm italic">Available 24/7 for your beauty needs</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-[#f98203] mr-4" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">Home, 1850 Kings Rd<br />Oak Bay, BC V8R 2P3</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl order-1 md:order-2 border border-orange-50"
          >
            <h2 className="text-3xl font-bold text-[#dd2581] mb-8">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 text-green-700 p-4 rounded-2xl text-sm font-bold border border-green-100 flex items-center gap-3"
                >
                  <div className="bg-green-500 text-white p-1 rounded-full">✓</div>
                  <span>Message sent! We'll reach out to your WhatsApp/Email soon.</span>
                </motion.div>
              )}
              
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium"
                  placeholder="Your name"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium"
                    placeholder="+1 (xxx) xxx-xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Your Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium h-40 resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#f98203] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#dd2581] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-orange-100 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}