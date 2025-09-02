import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  const [activeTab, setActiveTab] = React.useState<'photographer' | 'shoot'>('photographer');

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-black mb-8 text-center"
        >
          ABOUT
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
              onClick={() => setActiveTab('photographer')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === 'photographer'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/20'
                }`}
            >
              Your Photographer
            </button>
            <button
              onClick={() => setActiveTab('shoot')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === 'shoot'
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/20'
                }`}
            >
              Your Shoot
            </button>
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {activeTab === 'photographer' && (
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Meet Branden Adams</h2>
                <div className="space-y-4 text-lg leading-relaxed opacity-90">
                  <p>
                    With over 8 years behind the lens, I specialize in capturing authentic moments that tell your unique story. My journey began in street photography, where I learned to find beauty in spontaneous, unguarded moments.
                  </p>
                  <p>
                    Today, I bring that same eye for authenticity to portrait and lifestyle photography. Whether it's a corporate headshot that captures your professional confidence or a creative portrait that showcases your personality, my goal is to create images that feel genuinely you.
                  </p>
                  <p>
                    I believe great photography happens when technical skill meets human connection. That's why I take time to understand who you are and what you want your images to communicate before we even pick up the camera.
                  </p>
                </div>

                <div className="border-l-4 border-white/30 pl-6">
                  <h3 className="text-xl font-semibold mb-2">My Approach</h3>
                  <p className="opacity-90">
                    "Every person has a story worth telling. My job is to create the space and environment where that story can shine through naturally."
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-4">Experience & Recognition</h3>
                  <ul className="space-y-3 opacity-90">
                    <li>• Featured in Portrait Photography Magazine (2023)</li>
                    <li>• Corporate clients include Fortune 500 companies</li>
                    <li>• Over 500 successful portrait sessions</li>
                    <li>• Certified Professional Photographer (CPP)</li>
                    <li>• Workshop instructor at Photography Institute</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-4">Specializations</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/10 rounded-lg p-3 text-center">Corporate Headshots</div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">Creative Portraits</div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">Personal Branding</div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">Lifestyle Sessions</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shoot' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What to Expect</h2>
                <p className="text-xl opacity-90 max-w-3xl mx-auto">
                  From booking to final delivery, here's everything you need to know about your photography experience.
                </p>
              </div>

              {/* Timeline */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">BEFORE</div>
                  <h3 className="text-xl font-semibold mb-4">Pre-Shoot Consultation</h3>
                  <ul className="text-sm opacity-90 space-y-2 text-left">
                    <li>• Style & vision discussion (30 min call)</li>
                    <li>• Location scouting & selection</li>
                    <li>• Wardrobe guidance provided</li>
                    <li>• Shot list creation</li>
                    <li>• Timeline confirmation</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">DURING</div>
                  <h3 className="text-xl font-semibold mb-4">The Shoot Day</h3>
                  <ul className="text-sm opacity-90 space-y-2 text-left">
                    <li>• 1-3 hour session duration</li>
                    <li>• Professional lighting setup</li>
                    <li>• Multiple outfit changes</li>
                    <li>• Variety of poses & expressions</li>
                    <li>• Real-time preview & feedback</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">AFTER</div>
                  <h3 className="text-xl font-semibold mb-4">Post-Production</h3>
                  <ul className="text-sm opacity-90 space-y-2 text-left">
                    <li>• Professional editing & retouching</li>
                    <li>• Color correction & enhancement</li>
                    <li>• Multiple format delivery</li>
                    <li>• High-resolution files</li>
                    <li>• Commercial usage rights included</li>
                  </ul>
                </div>
              </div>

              {/* Delivery Timeline */}
              <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Delivery Timeline</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-3 text-yellow-400">Quick Preview</h4>
                    <p className="opacity-90 mb-2"><strong>24-48 hours:</strong> Sneak peek gallery</p>
                    <p className="text-sm opacity-75">5-10 lightly edited images for immediate use on social media or urgent needs.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3 text-green-400">Final Gallery</h4>
                    <p className="opacity-90 mb-2"><strong>7-14 days:</strong> Complete collection</p>
                    <p className="text-sm opacity-75">25-50 professionally edited high-resolution images, depending on package selected.</p>
                  </div>
                </div>
              </div>

              {/* Client Expectations */}
              <div className="bg-white/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Client Conduct & Expectations</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-blue-400">What We Provide</h4>
                    <ul className="space-y-2 text-sm opacity-90">
                      <li>• Professional, respectful environment</li>
                      <li>• Clear communication throughout</li>
                      <li>• Flexible scheduling & rescheduling</li>
                      <li>• Wardrobe & posing guidance</li>
                      <li>• Comfortable, pressure-free atmosphere</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">What We Ask</h4>
                    <ul className="space-y-2 text-sm opacity-90">
                      <li>• Arrive on time and prepared</li>
                      <li>• Communicate any concerns openly</li>
                      <li>• Follow wardrobe recommendations</li>
                      <li>• Respect studio/location guidelines</li>
                      <li>• Provide feedback during the session</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
