import { useState } from 'react';
import { X } from 'lucide-react';

export default function AuthModal({ open, onClose, onAuthed }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const base = import.meta.env.VITE_BACKEND_URL;
      const path = mode === 'signup' ? '/auth/signup' : '/auth/login';
      const body = mode === 'signup' ? { name, email, password } : { email, password };
      const res = await fetch(base + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Authentication failed');
      localStorage.setItem('bw_token', data.access_token);
      onAuthed?.({ token: data.access_token, email });
      onClose?.();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-white/10 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">{mode === 'signup' ? 'Create account' : 'Welcome back'}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-3">
          {mode === 'signup' && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none"
            required
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button
            disabled={loading}
            type="submit"
            className="w-full px-4 py-3 rounded-xl bg-[#1DB954] text-black font-semibold hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'Please wait…' : (mode === 'signup' ? 'Sign up' : 'Log in')}
          </button>
        </form>
        <div className="mt-4 text-white/70 text-sm">
          {mode === 'signup' ? (
            <span>
              Already have an account?{' '}
              <button className="text-[#1DB954] hover:underline" onClick={() => setMode('login')}>Log in</button>
            </span>
          ) : (
            <span>
              New here?{' '}
              <button className="text-[#1DB954] hover:underline" onClick={() => setMode('signup')}>Create an account</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
