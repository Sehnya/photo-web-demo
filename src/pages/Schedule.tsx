import React from 'react';
import { motion } from 'motion/react';

/**
 * Schedule page
 * - Option A: Calendly inline embed. Replace data-url with your actual Calendly link.
 *   TODO (production): Move Calendly link to an environment variable and/or CMS.
 * - Option B: In-app simple slot picker for 2-hour windows between 8am–5pm (Classic shoot demo).
 *   Selections are saved to localStorage under key "bookings".
 */

function formatTime(hour24: number) {
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  const h = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${h}:00 ${ampm}`;
}

export default function Schedule() {
  const [date, setDate] = React.useState<string>(() => new Date().toISOString().slice(0, 10));
  const [message, setMessage] = React.useState<string | null>(null);

  const startHours = [8,9,10,11,12,13,14,15]; // 2-hour windows ending by 5 PM

  const bookSlot = (hour: number) => {
    const booking = {
      id: `${date}-${hour}`,
      type: 'Classic',
      date,
      start: hour,
      end: hour + 2,
      createdAt: Date.now()
    };
    const key = 'bookings';
    try {
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(booking);
      localStorage.setItem(key, JSON.stringify(existing));
      setMessage(`Booked ${formatTime(hour)} – ${formatTime(hour+2)} on ${date}. A confirmation email would be sent in production.`);
    } catch {
      setMessage('Saved locally.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-28">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-black text-center">
        Schedule Your Shoot
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center text-lg md:text-2xl mt-4 opacity-90">
        Choose a convenient time or use the Calendly embed below.
      </motion.p>

      {/* In-app slot picker */}
      <div className="max-w-3xl mx-auto mt-10 bg-white/5 rounded-xl border border-white/10 p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label htmlFor="date" className="opacity-80 text-sm">Select a date</label>
          <input id="date" type="date" className="px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {startHours.map(h => (
            <button key={h} onClick={()=>bookSlot(h)} className="h-11 rounded-md bg-white text-black font-semibold hover:opacity-90">
              {formatTime(h)} – {formatTime(h+2)}
            </button>
          ))}
        </div>
        {message && <div className="mt-4 text-green-300 text-sm">{message}</div>}
      </div>

      {/* Calendly inline embed */}
      <div className="max-w-4xl mx-auto mt-10">
        <div className="text-sm opacity-80 mb-2">Calendly (replace link below with your own):</div>
        <div className="w-full h-[700px] bg-white rounded-xl overflow-hidden">
          <iframe
            title="Calendly Scheduling"
            src="https://calendly.com/your-calendly-username/your-event?hide_event_type_details=1&hide_gdpr_banner=1"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
