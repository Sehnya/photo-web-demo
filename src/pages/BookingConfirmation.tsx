import React from 'react';
import { motion } from 'motion/react';
import { FaCheckCircle, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCamera, FaEnvelope, FaInfoCircle, FaEye, FaShoppingCart } from 'react-icons/fa';
import { previewBookingEmail } from '../services/emailService';

interface CheckoutBookingDetails {
    orderId: string;
    packages: Array<{ id: string; title: string; price: number; qty: number }>;
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: 'full' | 'deposit';
    depositAmount: number;
    remainingAmount: number;
    stateCode: string;
    timestamp: string;
}

interface BookingConfirmationProps {
    onNewBooking?: () => void;
    booking?: any; // For direct booking data from Schedule page
}

function formatTime(hour24: number) {
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    const h = hour24 % 12 === 0 ? 12 : hour24 % 12;
    return `${h}:00 ${ampm}`;
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export default function BookingConfirmation({ onNewBooking, booking }: BookingConfirmationProps) {
    const [bookingDetails, setBookingDetails] = React.useState<CheckoutBookingDetails | null>(null);

    React.useEffect(() => {
        // If booking is passed directly (from Schedule page), convert it to checkout format
        if (booking) {
            const checkoutFormat: CheckoutBookingDetails = {
                orderId: booking.bookingId,
                packages: [{
                    id: booking.sessionType.toLowerCase().replace(/\s+/g, '-'),
                    title: booking.sessionType,
                    price: booking.price,
                    qty: 1
                }],
                subtotal: booking.price,
                tax: booking.price * 0.0825, // Default CA tax
                total: booking.price * 1.0825,
                paymentMethod: 'full' as const,
                depositAmount: booking.price * 1.0825,
                remainingAmount: 0,
                stateCode: 'CA',
                timestamp: new Date(booking.createdAt).toISOString()
            };
            setBookingDetails(checkoutFormat);
            return;
        }

        // Load booking details from localStorage (from checkout flow)
        try {
            const stored = localStorage.getItem('lastBooking');
            if (stored) {
                setBookingDetails(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load booking details:', error);
        }
    }, [booking]);

    if (!bookingDetails) {
        return (
            <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 md:px-8 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">No Booking Found</h1>
                    <p className="text-gray-400 mb-6">We couldn't find your booking details.</p>
                    <a
                        href="#/book"
                        className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Browse Packages
                    </a>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                        <FaCheckCircle className="text-3xl text-white" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-4">
                        PAYMENT SUCCESSFUL
                    </h1>
                    <div className="text-xl md:text-2xl font-semibold text-green-400 mb-2">
                        Order #{bookingDetails.orderId}
                    </div>
                    <div className="text-lg text-gray-300">
                        Thank you for choosing Branden Adams Photography
                    </div>
                </motion.div>

                {/* Order Details Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <FaShoppingCart className="mr-3 text-blue-400" />
                        Order Summary
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FaInfoCircle className="mr-3 text-purple-400 w-5" />
                                <div>
                                    <div className="text-sm text-gray-400">Order ID</div>
                                    <div className="font-mono text-sm">{bookingDetails.orderId}</div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaCalendarAlt className="mr-3 text-green-400 w-5" />
                                <div>
                                    <div className="text-sm text-gray-400">Order Date</div>
                                    <div className="font-semibold">{new Date(bookingDetails.timestamp).toLocaleDateString()}</div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaClock className="mr-3 text-yellow-400 w-5" />
                                <div>
                                    <div className="text-sm text-gray-400">Payment Method</div>
                                    <div className="font-semibold">
                                        {bookingDetails.paymentMethod === 'deposit' ? '50% Deposit' : 'Full Payment'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="text-sm text-gray-400">Packages Purchased</div>
                                {bookingDetails.packages.map((pkg, index) => (
                                    <div key={index} className="bg-white/10 rounded-lg p-3">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold">{pkg.title}</div>
                                                <div className="text-sm text-gray-300">
                                                    ${pkg.price.toFixed(2)} × {pkg.qty}
                                                </div>
                                            </div>
                                            <div className="font-bold">
                                                ${(pkg.price * pkg.qty).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="text-sm text-gray-400 mb-3">Payment Breakdown</div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${bookingDetails.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax ({bookingDetails.stateCode})</span>
                                        <span>${bookingDetails.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-white/20 pt-2 flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${bookingDetails.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                                <div className="text-sm text-gray-400 mb-1">Amount Paid Today</div>
                                <div className="text-2xl font-bold text-green-400">
                                    ${bookingDetails.depositAmount.toFixed(2)}
                                </div>
                                {bookingDetails.paymentMethod === 'deposit' && (
                                    <div className="text-xs text-gray-300 mt-1">
                                        Remaining balance: ${bookingDetails.remainingAmount.toFixed(2)}
                                    </div>
                                )}
                            </div>

                            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                                <div className="text-sm text-gray-400 mb-2">Next Steps</div>
                                <div className="text-sm">
                                    <div className="mb-2">✓ Payment processed successfully</div>
                                    <div className="mb-2">📧 Confirmation email sent</div>
                                    <div>📅 Schedule your session below</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* About Your Shoot */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold mb-6">About Your Shoot</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-blue-400">What to Expect</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">•</span>
                                    <span>Professional consultation to understand your vision and goals</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">•</span>
                                    <span>Guided posing and direction throughout the session</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">•</span>
                                    <span>Multiple outfit changes and styling options</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">•</span>
                                    <span>Professional lighting and backdrop setups</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">•</span>
                                    <span>Immediate preview of select images during session</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-400 mr-2">•</span>
                                    <span>Post-session gallery review and selection process</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-purple-400">Preparation Guidelines</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start">
                                    <span className="text-yellow-400 mr-2">•</span>
                                    <span>Arrive 15 minutes early for consultation and setup</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-400 mr-2">•</span>
                                    <span>Bring 2-3 outfit options in garment bags</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-400 mr-2">•</span>
                                    <span>Professional hair and makeup recommended (we can provide referrals)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-400 mr-2">•</span>
                                    <span>Avoid busy patterns; solid colors photograph best</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-400 mr-2">•</span>
                                    <span>Bring any props or accessories you'd like to include</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-400 mr-2">•</span>
                                    <span>Stay hydrated and get plenty of rest the night before</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Expectations and Code of Conduct */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold mb-6">Expectations & Code of Conduct</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-green-400">Our Commitment to You</h3>
                            <ul className="space-y-2 text-sm">
                                <li>• Professional, respectful, and comfortable environment</li>
                                <li>• Clear communication throughout the entire process</li>
                                <li>• High-quality images delivered within 2-3 weeks</li>
                                <li>• Complete privacy and confidentiality of your session</li>
                                <li>• Flexible rescheduling for weather or emergencies</li>
                                <li>• Satisfaction guarantee on final image selection</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-4 mt-6 text-blue-400">Session Policies</h3>
                            <ul className="space-y-2 text-sm">
                                <li>• Sessions start promptly at scheduled time</li>
                                <li>• 50% deposit required to secure booking</li>
                                <li>• 48-hour cancellation policy for full refund</li>
                                <li>• Weather-related rescheduling is always complimentary</li>
                                <li>• Additional time can be purchased during session if needed</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-red-400">Professional Standards</h3>
                            <ul className="space-y-2 text-sm">
                                <li>• Maintain professional boundaries at all times</li>
                                <li>• Respectful communication and behavior expected</li>
                                <li>• No inappropriate requests or conduct will be tolerated</li>
                                <li>• Studio is a safe, inclusive space for all clients</li>
                                <li>• Alcohol or substances are not permitted during sessions</li>
                                <li>• Guests are welcome but must not interfere with session</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-4 mt-6 text-purple-400">Image Rights & Usage</h3>
                            <ul className="space-y-2 text-sm">
                                <li>• You retain full rights to your images</li>
                                <li>• High-resolution files included with all packages</li>
                                <li>• Print release provided for personal use</li>
                                <li>• Commercial usage rights available upon request</li>
                                <li>• Portfolio usage requires written consent</li>
                                <li>• Social media sharing guidelines will be provided</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Next Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/5 rounded-lg p-6">
                            <div className="text-3xl mb-3">✅</div>
                            <h3 className="font-semibold mb-2">1. Payment Complete</h3>
                            <p className="text-sm text-gray-300">
                                Your {bookingDetails.paymentMethod === 'deposit' ? 'deposit' : 'payment'} has been processed successfully.
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-6">
                            <div className="text-3xl mb-3">📅</div>
                            <h3 className="font-semibold mb-2">2. Schedule Your Session</h3>
                            <p className="text-sm text-gray-300">Choose your preferred date and time for your photography session.</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-6">
                            <div className="text-3xl mb-3">📸</div>
                            <h3 className="font-semibold mb-2">3. Your Session</h3>
                            <p className="text-sm text-gray-300">Arrive ready to create amazing images that you'll treasure forever.</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#/schedule"
                            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                        >
                            <FaCalendarAlt className="mr-2" />
                            Schedule Your Session
                        </a>
                        <button
                            onClick={() => {
                                // Create a mock booking object for email preview
                                const mockBooking = {
                                    sessionType: bookingDetails.packages.map(p => p.title).join(', '),
                                    date: new Date().toISOString().split('T')[0],
                                    startTime: 10,
                                    endTime: 12,
                                    client: {
                                        name: 'Valued Client',
                                        email: 'client@example.com',
                                        phone: '(555) 123-4567'
                                    },
                                    price: bookingDetails.total,
                                    bookingId: bookingDetails.orderId
                                };
                                previewBookingEmail(mockBooking);
                            }}
                            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-blue-400 text-blue-400 font-semibold hover:bg-blue-400/10 transition-colors"
                        >
                            <FaEye className="mr-2" />
                            Preview Email
                        </button>
                        <a
                            href="#/book"
                            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition-colors"
                        >
                            Book Another Package
                        </a>
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                        <h3 className="font-semibold mb-2">Questions or Need to Make Changes?</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Contact us at <a href="mailto:hello@brandenadams.com" className="text-blue-400 hover:underline">hello@brandenadams.com</a> or
                            <a href="tel:+1234567890" className="text-blue-400 hover:underline ml-1">(123) 456-7890</a>
                        </p>
                        <p className="text-xs text-gray-400">
                            Order ID: {bookingDetails.orderId} • Please reference this ID in all communications
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}