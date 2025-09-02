import React from 'react';
import { motion } from 'motion/react';
import { FaClock, FaMapMarkerAlt, FaCamera, FaCalendarAlt } from 'react-icons/fa';

function formatTime(hour24: number) {
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  const h = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${h}:00 ${ampm}`;
}

type SessionType = {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  hours: number;
};

const sessionTypes: SessionType[] = [
  { id: 'headshots', name: 'Professional Headshots', duration: '1 hour', price: 850, description: 'Perfect for LinkedIn and corporate use', hours: 1 },
  { id: 'classic', name: 'Classic Portraits', duration: '2 hours', price: 1200, description: 'Timeless portrait photography', hours: 2 },
  { id: 'creative', name: 'Creative Portraits', duration: '3 hours', price: 1500, description: 'Artistic and conceptual portraits', hours: 3 },
  { id: 'location', name: 'Location Sessions', duration: '3 hours', price: 1800, description: 'On-location photography', hours: 3 },
  { id: 'branding', name: 'Personal Branding', duration: '4 hours', price: 2500, description: 'Comprehensive branding package', hours: 4 },
];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = React.useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  });
  const [selectedSession, setSelectedSession] = React.useState<SessionType>(sessionTypes[0]);
  const [selectedTime, setSelectedTime] = React.useState<number | null>(null);
  const [bookingStep, setBookingStep] = React.useState<'select' | 'confirm' | 'success'>('select');
  const [clientInfo, setClientInfo] = React.useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Generate available time slots based on session duration
  const getAvailableSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM

    for (let hour = startHour; hour <= endHour - selectedSession.hours; hour++) {
      slots.push(hour);
    }
    return slots;
  };

  const handleBooking = () => {
    if (!selectedTime || !clientInfo.name || !clientInfo.email) {
      alert('Please fill in all required fields');
      return;
    }

    const booking = {
      id: `${selectedDate}-${selectedTime}-${Date.now()}`,
      sessionType: selectedSession.name,
      date: selectedDate,
      startTime: selectedTime,
      endTime: selectedTime + selectedSession.hours,
      client: clientInfo,
      price: selectedSession.price,
      createdAt: Date.now()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
      existing.push(booking);
      localStorage.setItem('bookings', JSON.stringify(existing));
      setBookingStep('success');
    } catch {
      alert('Error saving booking. Please try again.');
    }
  };

  const resetBooking = () => {
    setBookingStep('select');
    setSelectedTime(null);
    setClientInfo({ name: '', email: '', phone: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-black text-center mb-8"
        >
          SCHEDULE YOUR SHOOT
        </motion.h1>

        {bookingStep === 'select' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Session Type Selection */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaCamera className="mr-3 text-blue-400" />
                Choose Your Session Type
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sessionTypes.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${selectedSession.id === session.id
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                      }`}
                  >
                    <div className="font-semibold text-lg">{session.name}</div>
                    <div className="text-sm opacity-80 mb-2">{session.description}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{session.duration}</span>
                      <span className="font-bold">${session.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaCalendarAlt className="mr-3 text-green-400" />
                Select Date
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label htmlFor="date" className="text-lg">Choose a date:</label>
                <input
                  id="date"
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none text-lg"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaClock className="mr-3 text-purple-400" />
                Available Times
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {getAvailableSlots().map((hour) => (
                  <button
                    key={hour}
                    onClick={() => setSelectedTime(hour)}
                    className={`p-3 rounded-lg font-semibold transition-all ${selectedTime === hour
                        ? 'bg-white text-black'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                  >
                    {formatTime(hour)} - {formatTime(hour + selectedSession.hours)}
                  </button>
                ))}
              </div>
              {selectedTime && (
                <div className="mt-4 p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center text-green-400 mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    Session Details
                  </div>
                  <div className="text-sm space-y-1">
                    <div><strong>Session:</strong> {selectedSession.name}</div>
                    <div><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</div>
                    <div><strong>Time:</strong> {formatTime(selectedTime)} - {formatTime(selectedTime + selectedSession.hours)}</div>
                    <div><strong>Duration:</strong> {selectedSession.duration}</div>
                    <div><strong>Price:</strong> ${selectedSession.price}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Client Information */}
            {selectedTime && (
              <div className="bg-white/5 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">Your Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/50 focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/50 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/50 focus:outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Special Requests</label>
                    <textarea
                      value={clientInfo.notes}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-white/50 focus:outline-none resize-none"
                      rows={3}
                      placeholder="Any special requests or notes..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBooking}
                    disabled={!clientInfo.name || !clientInfo.email}
                    className="flex-1 bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={resetBooking}
                    className="flex-1 border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {bookingStep === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center bg-white/5 rounded-2xl p-8"
          >
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Thank you for booking your {selectedSession.name} session. You'll receive a confirmation email shortly with all the details and preparation instructions.
            </p>

            <div className="bg-white/10 rounded-lg p-6 mb-6 max-w-md mx-auto">
              <h3 className="font-semibold mb-3">Booking Summary</h3>
              <div className="text-sm space-y-2 text-left">
                <div className="flex justify-between">
                  <span>Session:</span>
                  <span>{selectedSession.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date(selectedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{selectedTime && formatTime(selectedTime)} - {selectedTime && formatTime(selectedTime + selectedSession.hours)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${selectedSession.price}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm opacity-80">
                A 50% deposit (${selectedSession.price / 2}) is required to secure your booking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#/checkout"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                >
                  Pay Deposit Now
                </a>
                <button
                  onClick={resetBooking}
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Book Another Session
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Preparation Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Preparing for Your Session</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">👔</div>
              <h4 className="font-semibold mb-2">Wardrobe</h4>
              <p className="text-sm opacity-90">Bring 2-3 outfit options. Solid colors work best. Avoid busy patterns.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💄</div>
              <h4 className="font-semibold mb-2">Grooming</h4>
              <p className="text-sm opacity-90">Professional hair and makeup recommended. We can provide referrals.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⏰</div>
              <h4 className="font-semibold mb-2">Timing</h4>
              <p className="text-sm opacity-90">Arrive 15 minutes early. Sessions start promptly at scheduled time.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
