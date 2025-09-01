import React from 'react';
import { motion } from 'motion/react';
import TiltedCard from '../components/TiltedCard';

export type PackageItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  hoverColor: string;
};

interface BookProps {
  onAddPackage?: (pkg: PackageItem) => void;
}

const initialPackages: PackageItem[] = [
  { id: 'headshots', title: 'HEADSHOTS', price: 1000, image: '/headshot.png', hoverColor: '#FF7A00' },
  { id: 'classic', title: 'CLASSIC PORTRAITS', price: 1000, image: '/Classic.png', hoverColor: '#8B4513' },
  { id: 'creative', title: 'CREATIVE PORTRAITS', price: 1000, image: '/creative.png', hoverColor: '#FF69B4' },
  { id: 'location', title: 'LOCATION SPECIAL', price: 1000, image: '/Location.png', hoverColor: '#3AA3FF' },
  { id: 'branding', title: 'BRANDING SHOOTS', price: 1000, image: '/Twins-2.png', hoverColor: '#9C27B0' },
];

function hexFromRGB(r:number,g:number,b:number){
  const toHex=(n:number)=>n.toString(16).padStart(2,'0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getDominantColor(src:string): Promise<string> {
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
      let r=0,g=0,b=0,count=0;
      for (let i=0;i<data.length;i+=4){ r+=data[i]; g+=data[i+1]; b+=data[i+2]; count++; }
      r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
      resolve(hexFromRGB(r,g,b));
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

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto w-full place-items-center">
        {pkgs.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => handleClick(pkg)}
            className="group bg-transparent rounded-2xl border border-white/40 hover:border-white transition-colors p-3 text-left w-full max-w-[420px]"
            style={{
              transition: 'background-color 300ms ease, box-shadow 300ms ease, border-color 300ms ease'
            }}
            onMouseEnter={(e) => {
              const color = pkg.hoverColor;
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${color}22`;
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 2px ${color}80, 0 14px 38px -12px ${color}55`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <TiltedCard
                imageSrc={pkg.image}
                altText={pkg.title}
                containerHeight="364px"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                showMobileWarning={false}
                showTooltip={false}
                baseBackgroundColor="transparent"
                hoverBackgroundColor={pkg.hoverColor}
              />
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-white text-lg md:text-xl font-semibold text-center">{pkg.title}</h2>
                <p className="text-white text-3xl md:text-4xl">${'{'}pkg.price{'}'}</p>
                <span className="inline-block text-sm opacity-80 group-hover:opacity-100 transition-opacity">Click to add to cart</span>
              </div>
            </div>
          </button>
        ))}
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
