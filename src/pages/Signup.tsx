import React from 'react';
import { motion } from 'motion/react';
import userStore from '../services/userStore';

export default function Signup() {
  const [step, setStep] = React.useState<'form' | 'verify'>('form');
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    marketingOptIn: true,
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<string | null>(null);
  const [code, setCode] = React.useState('');
  const [expiresAt, setExpiresAt] = React.useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    if (!form.firstName || !form.lastName) return 'Please enter your first and last name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Please enter a valid email address.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (!/^[0-9+()\-\s]{7,}$/.test(form.phone)) return 'Please enter a valid phone number.';
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) { setError(v); return; }
    setLoading(true);
    try {
      const res = await userStore.createPendingUser({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        password: form.password,
        marketingOptIn: form.marketingOptIn,
      });
      setExpiresAt(res.expiresAt);
      setStep('verify');
      setInfo(`We sent a 6-digit code to ${form.email}. Enter it below to verify your email.`);
    } catch (err: any) {
      setError(err?.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const ok = await userStore.verifyUser(form.email, code.trim());
      if (!ok) {
        setError('Invalid or expired code. Please try again or resend.');
      } else {
        // success: navigate to login with success flag
        window.location.hash = '#/login?verified=1';
      }
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    setError(null);
    const res = await userStore.resendVerificationCode(form.email);
    setExpiresAt(res.expiresAt);
    setInfo(`A new code was sent to ${form.email}.`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-28 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full max-w-md">
        <h1 className="text-4xl font-black mb-6 text-center">{step === 'form' ? 'Create account' : 'Verify your email'}</h1>
        {step === 'form' ? (
          <form className="space-y-4" onSubmit={onSubmit}>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1" htmlFor="firstName">First name</label>
                <input id="firstName" value={form.firstName} onChange={handleChange} type="text" required className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="Branden" />
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="lastName">Last name</label>
                <input id="lastName" value={form.lastName} onChange={handleChange} type="text" required className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="Adams" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="phone">Phone</label>
              <input id="phone" value={form.phone} onChange={handleChange} type="tel" required className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="(555) 555-5555" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="email">Email</label>
              <input id="email" value={form.email} onChange={handleChange} type="email" required className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="password">Password</label>
              <input id="password" value={form.password} onChange={handleChange} type="password" required className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="••••••••" />
            </div>
            <label className="flex items-center gap-2 text-sm opacity-90">
              <input id="marketingOptIn" checked={form.marketingOptIn} onChange={handleChange} type="checkbox" className="accent-white" />
              Subscribe to emails about sales and photoshoot updates
            </label>
            <button disabled={loading} type="submit" className="w-full h-11 rounded-md bg-white text-black font-semibold disabled:opacity-50">{loading ? 'Creating...' : 'Create account'}</button>
            <p className="mt-2 text-xs opacity-70">By creating an account you agree to receive account emails. Marketing emails are optional.</p>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={onVerify}>
            {info && <div className="text-green-300 text-sm">{info}</div>}
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <div>
              <label className="block text-sm mb-1" htmlFor="code">Verification code</label>
              <input id="code" inputMode="numeric" pattern="[0-9]*" value={code} onChange={e => setCode(e.target.value)} maxLength={6} required className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 tracking-widest text-center text-xl" placeholder="●●●●●●" />
            </div>
            <button disabled={loading} type="submit" className="w-full h-11 rounded-md bg-white text-black font-semibold disabled:opacity-50">{loading ? 'Verifying...' : 'Verify email'}</button>
            <div className="text-sm flex items-center justify-between">
              <button type="button" onClick={onResend} className="underline">Resend code</button>
              {expiresAt && <span className="opacity-70">Expires {new Date(expiresAt).toLocaleTimeString()}</span>}
            </div>
          </form>
        )}
        <p className="mt-4 text-sm text-center opacity-80">Already have an account? <a href="#/login" className="underline">Log in</a></p>
      </motion.div>
    </div>
  );
}
