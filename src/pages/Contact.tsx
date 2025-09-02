import React from 'react';
import { motion } from 'motion/react';
import { FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-black mb-8 text-center"
        >
          CONTACT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-center opacity-90 mb-12 max-w-3xl mx-auto"
        >
          Ready to create something amazing? Let's discuss your vision and bring it to life.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-3 rounded-full">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="opacity-90">studio@brandenadams.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-3 rounded-full">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="opacity-90">(555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <div className="font-semibold">Studio Location</div>
                    <div className="opacity-90">Downtown Creative District<br />Available by appointment</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-white/10 p-3 rounded-full">
                    <FaInstagram className="text-xl" />
                  </div>
                  <div>
                    <div className="font-semibold">Instagram</div>
                    <div className="opacity-90">@brandenadamsphotography</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="opacity-90">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="opacity-90">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="opacity-90">By appointment only</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Payment Methods Accepted</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                  <FaCreditCard className="text-lg text-blue-400" />
                  <span className="text-sm">Credit Cards</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                  <FaPaypal className="text-lg text-blue-600" />
                  <span className="text-sm">PayPal</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                  <FaApplePay className="text-lg text-white" />
                  <span className="text-sm">Apple Pay</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                  <FaGooglePay className="text-lg text-green-500" />
                  <span className="text-sm">Google Pay</span>
                </div>
              </div>
              <div className="mt-4 text-sm opacity-90">
                <p><strong>Payment Terms:</strong></p>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• 50% deposit required to secure booking</li>
                  <li>• Remaining balance due on shoot day</li>
                  <li>• Payment plans available for packages over $2,000</li>
                  <li>• All transactions are secure and encrypted</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/50 focus:outline-none transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/50 focus:outline-none transition-colors"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Booking Request">Booking Request</option>
                  <option value="Package Information">Package Information</option>
                  <option value="Pricing Question">Pricing Question</option>
                  <option value="Rescheduling">Rescheduling</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/50 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Send Message
              </button>
            </form>

            <div className="mt-6 text-center text-sm opacity-90">
              <p>We typically respond within 24 hours</p>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Book?</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Skip the back-and-forth and book your session directly. Choose your package and schedule your shoot today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#/book"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
            >
              Book Your Session
            </a>
            <a
              href="#/schedule"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              View Available Dates
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
