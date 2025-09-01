import React from 'react';
import { motion } from 'motion/react';
import { PAYMENT_LINK_FALLBACK, getPaymentLinkForProduct } from '../services/payments';

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

  const taxRates: Record<string, number> = { CA: 0.0825, NY: 0.088, TX: 0.0625, FL: 0.06, IL: 0.1025, Other: 0.05 };
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const taxRate = taxRates[stateCode] ?? taxRates.Other;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  React.useEffect(() => {
    // Keep cart snapshot up to date if user navigates back and forth
    const onStorage = () => setCart(loadCart());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-black text-center">
        Checkout
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center text-lg md:text-2xl mt-4 opacity-90">
        Secure payment powered by Stripe. Apple Pay, Google Pay, and Link are available when enabled on your account.
      </motion.p>

      <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <div className="text-gray-400 border border-white/10 rounded-lg p-6 text-center">Your cart is empty. <a className="underline" href="#/book">Continue shopping</a></div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 border border-white/10 rounded-lg p-4">
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm opacity-80">${(item.price).toFixed(2)} each × {item.qty}</div>
                </div>
                <div className="w-24 text-right font-semibold">${(item.price * item.qty).toFixed(2)}</div>
                {(() => {
                  const link = getPaymentLinkForProduct(item.id as any);
                  if (!link) return null;
                  return (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 h-10 px-3 rounded-md bg-white text-black text-sm font-semibold flex items-center no-underline hover:opacity-90"
                    >
                      Pay for this item
                    </a>
                  );
                })()}
              </div>
            ))
          )}
        </div>
        <div className="md:col-span-1 border border-white/10 rounded-lg p-4 h-fit sticky top-28">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <label className="opacity-80" htmlFor="stateSel">State</label>
            <select id="stateSel" className="border rounded px-2 py-1 bg-white text-black"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
            >
              <option value="CA">CA</option>
              <option value="NY">NY</option>
              <option value="TX">TX</option>
              <option value="FL">FL</option>
              <option value="IL">IL</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span>Tax ({(taxRate * 100).toFixed(2)}%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-lg mt-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {PAYMENT_LINK_FALLBACK ? (
            <a
              href={PAYMENT_LINK_FALLBACK}
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full h-11 rounded-md bg-white text-black font-semibold grid place-items-center no-underline hover:opacity-90"
            >
              Proceed to Payment
            </a>
          ) : (
            <button
              disabled={cart.length === 0}
              onClick={() => alert('Add your Stripe Payment Link(s) in src/services/payments.ts to enable payment.')}
              className="mt-4 w-full h-11 rounded-md bg-white text-black font-semibold disabled:opacity-50"
            >
              Proceed to Payment
            </button>
          )}

          <div className="text-xs opacity-70 mt-3">
            Note: Wallets like Apple Pay, Google Pay, and Link appear on Stripe's checkout when available for the buyer and enabled on your Stripe account.
          </div>
        </div>
      </div>
    </div>
  );
}
