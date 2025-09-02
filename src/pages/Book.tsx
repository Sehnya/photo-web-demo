import React from 'react';
import { motion } from 'motion/react';
import TiltedCard from '../components/TiltedCard';

export type PackageItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  hoverColor: string;
  description?: string;
  includes?: string[];
  duration?: string;
  location?: string;
};

interface BookProps {
  onAddPackage?: (pkg: PackageItem) => void;
}

const initialPackages: PackageItem[] = [
  {
    id: 'headshots',
    title: 'PROFESSIONAL HEADSHOTS',
    price: 850,
    image: '/headshot.png',
    hoverColor: '#FF7A00',
    description: 'Perfect for LinkedIn, corporate websites, and professional materials',
    includes: ['1-hour studio session', '3 outfit changes', '25+ edited images', 'High-res digital files', 'Commercial usage rights'],
    duration: '1 hour',
    location: 'Studio or office'
  },
  {
    id: 'classic',
    title: 'CLASSIC PORTRAITS',
    price: 1200,
    image: '/Classic.png',
    hoverColor: '#8B4513',
    description: 'Timeless portrait photography with elegant lighting and composition',
    includes: ['2-hour session', '5 outfit changes', '40+ edited images', 'Print release included', 'Online gallery'],
    duration: '2 hours',
    location: 'Studio'
  },
  {
    id: 'creative',
    title: 'CREATIVE PORTRAITS',
    price: 1500,
    image: '/creative.png',
    hoverColor: '#FF69B4',
    description: 'Artistic and conceptual portraits that showcase your unique personality',
    includes: ['3-hour session', 'Concept development', '50+ edited images', 'Creative retouching', 'Behind-the-scenes video'],
    duration: '3 hours',
    location: 'Studio or location'
  },
  {
    id: 'location',
    title: 'LOCATION SESSIONS',
    price: 1800,
    image: '/Location.png',
    hoverColor: '#3AA3FF',
    description: 'On-location photography in your preferred environment or scenic backdrop',
    includes: ['3-hour session', 'Location scouting', '60+ edited images', 'Travel included (50mi)', 'Weather backup plan'],
    duration: '3 hours',
    location: 'Your choice'
  },
  {
    id: 'branding',
    title: 'PERSONAL BRANDING',
    price: 2500,
    image: '/Twins-2.png',
    hoverColor: '#9C27B0',
    description: 'Comprehensive branding package for entrepreneurs and professionals',
    includes: ['4-hour session', 'Brand consultation', '100+ edited images', 'Multiple locations', 'Social media package', '1 year usage rights'],
    duration: '4 hours',
    location: 'Multiple locations'
  },
];

function hexFromRGB(r: number, g: number, b: number) {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getDominantColor(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src.replace(/^\.\./, '');
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve('#888888'); return; }
      const w = 32, h = 32;
      canvas.width = w; canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) { r += data[i]; g += data[i + 1]; b += data[i + 2]; count++; }
      r = Math.round(r / count); g = Math.round(g / count); b = Math.round(b / count);
      resolve(hexFromRGB(r, g, b));
    };
    img.onerror = () => resolve('#888888');
  });
}

export default function Book({ onAddPackage }: BookProps) {
  const [showScheduleCTA, setShowScheduleCTA] = React.useState(false);
  const handleClick = (pkg: PackageItem) => {
    const ok = window.confirm(`Do you want to add ${pkg.title} to your cart?`);
    if (ok) {
      onAddPackage?.(pkg);
      setShowScheduleCTA(true);
    }
  };

  const [pkgs, setPkgs] = React.useState<PackageItem[]>(initialPackages);
  React.useEffect(() => {
    Promise.all(initialPackages.map(async p => ({ ...p, hoverColor: await getDominantColor(p.image) }))).then(setPkgs);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 w-full relative flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-black text-center w-full"
      >
        BOOK YOUR SHOOT
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-xl md:text-3xl mt-6 opacity-90 w-full"
      >
        OUR PACKAGES
      </motion.p>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        {pkgs.map((pkg) => (
          <div
            key={pkg.id}
            className="group bg-white/5 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 p-6 w-full"
          >
            <div className="mb-4">
              <TiltedCard
                imageSrc={pkg.image}
                altText={pkg.title}
                containerHeight="240px"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                showMobileWarning={false}
                showTooltip={false}
                baseBackgroundColor="transparent"
                hoverBackgroundColor={pkg.hoverColor}
                baseScale={1}
                scaleOnHover={1.02}
              />
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-white text-xl font-bold mb-2">{pkg.title}</h2>
                <p className="text-white/80 text-sm mb-3">{pkg.description}</p>
                <div className="text-3xl font-bold text-white">${pkg.price}</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Duration:</span>
                  <span className="text-white">{pkg.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Location:</span>
                  <span className="text-white">{pkg.location}</span>
                </div>
              </div>

              {pkg.includes && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">What's Included:</h4>
                  <ul className="text-xs text-white/80 space-y-1">
                    {pkg.includes.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => handleClick(pkg)}
                className="w-full bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors mt-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Package Comparison */}
      <div className="mt-16 bg-white/5 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-center mb-8">Not Sure Which Package?</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-lg font-semibold text-blue-400">Quick & Professional</div>
            <div className="text-sm opacity-90">Choose Headshots for LinkedIn, corporate websites, or professional materials</div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold text-purple-400">Personal & Artistic</div>
            <div className="text-sm opacity-90">Choose Creative or Classic for personal branding, social media, or artistic expression</div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold text-green-400">Business & Marketing</div>
            <div className="text-sm opacity-90">Choose Branding for comprehensive business materials, websites, and marketing campaigns</div>
          </div>
        </div>
        <div className="text-center mt-6">
          <a href="#/contact" className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition-colors">
            Need Help Choosing?
          </a>
        </div>
      </div>

      {showScheduleCTA && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8 text-center">
          <a href="#/schedule" className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-white text-black font-semibold no-underline hover:opacity-90">Schedule your shoot</a>
          <p className="text-sm opacity-80 mt-2">Your package was added to the cart.</p>
        </motion.div>
      )}
    </div>
  );
}
