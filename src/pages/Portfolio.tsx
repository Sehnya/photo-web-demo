import { motion } from 'motion/react';
import React from 'react';
import TiltedCard from '../components/TiltedCard';

export default function Portfolio() {
  const [activeSection, setActiveSection] = React.useState<'gallery' | 'reviews'>('gallery');

  const portfolioImages = [
    { src: '/photo-1.png', title: 'Corporate Executive', category: 'Headshots' },
    { src: '/photo-2.png', title: 'Creative Artist', category: 'Creative Portraits' },
    { src: '/photo-3.png', title: 'Lifestyle Session', category: 'Lifestyle' },
    { src: '/headshot.png', title: 'Professional Headshot', category: 'Headshots' },
    { src: '/Classic.png', title: 'Classic Portrait', category: 'Classic Portraits' },
    { src: '/creative.png', title: 'Artistic Vision', category: 'Creative Portraits' },
    { src: '/Location.png', title: 'On Location', category: 'Location' },
    { src: '/Twins-2.png', title: 'Brand Photography', category: 'Branding' },
  ];

  const reviews = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      company: 'TechFlow Inc.',
      rating: 5,
      text: 'Branden captured exactly what I was looking for in my professional headshots. The process was smooth, comfortable, and the results exceeded my expectations. I use these photos for everything now!',
      date: 'December 2024'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Entrepreneur',
      company: 'Rodriguez Consulting',
      rating: 5,
      text: 'As someone who\'s camera-shy, I was nervous about the shoot. Branden made me feel at ease immediately and guided me through every pose. The final images perfectly represent my brand.',
      date: 'November 2024'
    },
    {
      name: 'Emily Watson',
      role: 'Creative Director',
      company: 'Design Studio',
      rating: 5,
      text: 'The creative portrait session was incredible. Branden understood my vision and brought it to life in ways I hadn\'t even imagined. Truly artistic work with professional execution.',
      date: 'October 2024'
    },
    {
      name: 'David Kim',
      role: 'Real Estate Agent',
      company: 'Premier Properties',
      rating: 5,
      text: 'Quick turnaround, professional quality, and great communication throughout. My new headshots have already helped me book more clients. Highly recommend!',
      date: 'September 2024'
    },
    {
      name: 'Lisa Thompson',
      role: 'Author',
      company: 'Independent',
      rating: 5,
      text: 'Branden captured the essence of who I am as a writer. The photos feel authentic and powerful - exactly what I needed for my book launch and speaking engagements.',
      date: 'August 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-black mb-8 text-center"
        >
          PORTFOLIO
        </motion.h1>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-white/10 rounded-full p-1">
            <button
              onClick={() => setActiveSection('gallery')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeSection === 'gallery'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white/20'
                }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setActiveSection('reviews')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeSection === 'reviews'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white/20'
                }`}
            >
              Reviews
            </button>
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeSection === 'gallery' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Selected Works</h2>
                <p className="text-lg opacity-90 max-w-3xl mx-auto">
                  A curated collection showcasing the range and quality of our portrait photography across different styles and settings.
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {portfolioImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white/5 p-3">
                      <TiltedCard
                        imageSrc={image.src}
                        altText={image.title}
                        containerHeight="320px"
                        containerWidth="100%"
                        imageHeight="100%"
                        imageWidth="100%"
                        showMobileWarning={false}
                        showTooltip={false}
                        baseBackgroundColor="transparent"
                        hoverBackgroundColor="#FF7A00"
                        baseScale={1}
                        scaleOnHover={1.05}
                      />
                      <div className="mt-4 text-center">
                        <h3 className="font-semibold text-white">{image.title}</h3>
                        <p className="text-sm opacity-70">{image.category}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center bg-white/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Create Your Own?</h3>
                <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                  Every image tells a story. Let's create yours with a professional photography session tailored to your vision and goals.
                </p>
                <a
                  href="#/book"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                >
                  Book Your Session
                </a>
              </div>
            </div>
          )}

          {activeSection === 'reviews' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Client Reviews</h2>
                <p className="text-lg opacity-90 max-w-3xl mx-auto">
                  Hear from professionals who have experienced our photography services and see why they trust us with their image.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">4.9/5</div>
                  <div className="text-sm opacity-90">Average Rating</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
                  <div className="text-sm opacity-90">Happy Clients</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">98%</div>
                  <div className="text-sm opacity-90">Recommend Us</div>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-2xl p-6"
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400 mr-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="text-sm opacity-70">{review.date}</span>
                    </div>

                    <p className="text-white mb-4 leading-relaxed">"{review.text}"</p>

                    <div className="border-t border-white/20 pt-4">
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-sm opacity-70">{review.role}</div>
                      <div className="text-sm opacity-70">{review.company}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Review CTA */}
              <div className="text-center bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Join Our Happy Clients</h3>
                <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                  Experience the same professional service and exceptional results that our clients rave about.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#/book"
                    className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Book Your Session
                  </a>
                  <a
                    href="#/contact"
                    className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition-colors"
                  >
                    Ask Questions
                  </a>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
