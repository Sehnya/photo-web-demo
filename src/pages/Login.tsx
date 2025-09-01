import React from 'react';
import { motion } from 'motion/react';
import userStore from '../services/userStore';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Show success notice if just verified
    if (window.location.hash.includes('verified=1')) {
      setInfo('Your email has been verified. You can now log in.');
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await userStore.signIn(email.trim(), password);
    setLoading(false);
    if (!res.ok) {
      setError(res.reason || 'Login failed.');
      return;
    }
    if (res.user) {
      await userStore.setCurrentUser(res.user);
      setInfo(`Welcome back, ${res.user.firstName}!`);
      // Navigate home after a brief pause
      setTimeout(() => { window.location.hash = '#/'; }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-28 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full max-w-md">
        <h1 className="text-4xl font-black mb-6 text-center">Log in</h1>
        {info && <div className="text-green-300 text-sm mb-3 text-center">{info}</div>}
        {error && <div className="text-red-400 text-sm mb-3 text-center">{error}</div>}
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input id="email" value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="password">Password</label>
            <input id="password" value={password} onChange={e=>setPassword(e.target.value)} type="password" required className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="••••••••" />
          </div>
          <button disabled={loading} type="submit" className="w-full h-11 rounded-md bg-white text-black font-semibold disabled:opacity-50">{loading ? 'Signing in…' : 'Continue'}</button>
        </form>
        <p className="mt-4 text-sm text-center opacity-80">Don’t have an account? <a href="#/signup" className="underline">Sign up</a></p>
      </motion.div>
    </div>
  );
}
