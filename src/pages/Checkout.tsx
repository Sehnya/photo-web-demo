import React from 'react';
import { motion } from 'motion/react';
import { PAYMENT_LINK_FALLBACK, getPaymentLinkForProduct } from '../services/payments';
import { FaLock, FaCreditCard, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

// Mirrors the cart item shape from App.tsx
type CartItem = { id: string; title: string; price: number; qty: number };

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
}

export default function Checkout() {
  const [cart, setCart] = React.useState<CartItem[]>(() => loadCart());
  const [stateCode, setStateCode] = React.useState<string>('CA');
  const [paymentMethod, setPaymentMethod] = React.useState<'full' | 'deposit'>('deposit');

  const taxRates: Record<string, number> = { CA: 0.0825, NY: 0.088, TX: 0.0625, FL: 0.06, IL: 0.1025, Other: 0.05 };
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const taxRate = taxRates[stateCode] ?? taxRates.Other;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const depositAmount = paymentMethod === 'deposit' ? total * 0.5 : total;
  const remainingAmount = total - depositAmount;

  React.useEffect(() => {
    // Keep cart snapshot up to date if user navigates back and forth
    const onStorage = () => setCart(loadCart());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-black text-center mb-8"
        >
          CHECKOUT
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaCheckCircle className="mr-3 text-green-400" />
                Order Summary
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">Your cart is empty</div>
                  <a
                    href="#/book"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Browse Packages
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-white/5 rounded-lg p-4">
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{item.title}</div>
                        <div className="text-sm opacity-80">
                          ${item.price.toFixed(2)} × {item.qty} session{item.qty > 1 ? 's' : ''}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl">${(item.price * item.qty).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Terms & Conditions */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Terms & Conditions</h3>
              <div className="space-y-4 text-sm opacity-90">
                <div>
                  <h4 className="font-semibold mb-2">Payment Terms</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• 50% deposit required to secure booking</li>
                    <li>• Remaining balance due on shoot day</li>
                    <li>• Payment plans available for orders over $2,000</li>
                    <li>• All payments are processed securely through Stripe</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Free cancellation up to 48 hours before session</li>
                    <li>• 50% refund for cancellations within 24-48 hours</li>
                    <li>• No refund for same-day cancellations</li>
                    <li>• Weather-related rescheduling is always free</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Usage Rights</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Commercial usage rights included in all packages</li>
                    <li>• High-resolution files provided for all edited images</li>
                    <li>• Print release included for personal use</li>
                    <li>• Extended licensing available for additional fee</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaShieldAlt className="mr-3 text-blue-400" />
                Secure Payment
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <FaLock className="text-2xl text-green-400 mx-auto" />
                  <div className="font-semibold">SSL Encrypted</div>
                  <div className="text-xs opacity-80">Your data is protected</div>
                </div>
                <div className="space-y-2">
                  <FaCreditCard className="text-2xl text-blue-400 mx-auto" />
                  <div className="font-semibold">Stripe Powered</div>
                  <div className="text-xs opacity-80">Industry-leading security</div>
                </div>
                <div className="space-y-2">
                  <FaCheckCircle className="text-2xl text-purple-400 mx-auto" />
                  <div className="font-semibold">PCI Compliant</div>
                  <div className="text-xs opacity-80">Bank-level protection</div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 rounded-2xl p-6 sticky top-28">
              <h3 className="text-xl font-bold mb-6">Payment Details</h3>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Payment Option</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="deposit"
                      checked={paymentMethod === 'deposit'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'full' | 'deposit')}
                      className="text-white"
                    />
                    <span>50% Deposit (Recommended)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="full"
                      checked={paymentMethod === 'full'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'full' | 'deposit')}
                      className="text-white"
                    />
                    <span>Full Payment</span>
                  </label>
                </div>
              </div>

              {/* Tax Calculation */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">State/Region</label>
                <select
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-white/50 focus:outline-none"
                >
                  <option value="CA">California (8.25%)</option>
                  <option value="NY">New York (8.8%)</option>
                  <option value="TX">Texas (6.25%)</option>
                  <option value="FL">Florida (6%)</option>
                  <option value="IL">Illinois (10.25%)</option>
                  <option value="Other">Other States (5%)</option>
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-white/20">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax ({(taxRate * 100).toFixed(2)}%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {paymentMethod === 'deposit' && (
                  <>
                    <div className="flex justify-between text-lg font-bold text-green-400">
                      <span>Pay Today (50%)</span>
                      <span>${depositAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm opacity-80">
                      <span>Remaining Balance</span>
                      <span>${remainingAmount.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Payment Methods Accepted */}
              <div className="mb-6">
                <div className="text-sm font-medium mb-3">Accepted Payment Methods</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/10 rounded p-2 text-center">Visa</div>
                  <div className="bg-white/10 rounded p-2 text-center">Mastercard</div>
                  <div className="bg-white/10 rounded p-2 text-center">American Express</div>
                  <div className="bg-white/10 rounded p-2 text-center">Discover</div>
                  <div className="bg-white/10 rounded p-2 text-center">Apple Pay</div>
                  <div className="bg-white/10 rounded p-2 text-center">Google Pay</div>
                </div>
              </div>

              {/* Payment Button */}
              {PAYMENT_LINK_FALLBACK ? (
                <a
                  href={PAYMENT_LINK_FALLBACK}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-white text-black font-semibold py-4 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center no-underline"
                >
                  <FaLock className="mr-2" />
                  Secure Checkout - ${depositAmount.toFixed(2)}
                </a>
              ) : (
                <button
                  disabled={cart.length === 0}
                  onClick={() => alert('Add your Stripe Payment Link(s) in src/services/payments.ts to enable payment.')}
                  className="w-full bg-white text-black font-semibold py-4 px-6 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <FaLock className="mr-2" />
                  Secure Checkout - ${depositAmount.toFixed(2)}
                </button>
              )}

              <div className="text-xs opacity-70 mt-4 text-center">
                {paymentMethod === 'deposit'
                  ? `Remaining $${remainingAmount.toFixed(2)} due on shoot day`
                  : 'Full payment secures your booking'
                }
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <div className="text-sm font-semibold mb-2">What happens next?</div>
                <ul className="text-xs space-y-1 opacity-90">
                  <li>1. Complete secure payment</li>
                  <li>2. Receive booking confirmation</li>
                  <li>3. Get preparation guidelines</li>
                  <li>4. Schedule your session</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
