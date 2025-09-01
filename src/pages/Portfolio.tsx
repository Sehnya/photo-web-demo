import React from 'react';
import { motion } from 'motion/react';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white p-8 pt-28 flex flex-col items-center">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl font-black mb-6 text-center">Portfolio</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto leading-7 text-lg opacity-90 text-center">
        Explore selected works, editorial sets, and client highlights.
      </motion.p>
    </div>
  );
}
