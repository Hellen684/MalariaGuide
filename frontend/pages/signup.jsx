import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      // Offline fallback for prototyping
      if (email.includes('@') && password.length >= 4 && name.length >= 2) {
        router.push('/dashboard');
      } else {
        setError('Connection failed. Please enter valid details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#10a396] flex flex-col justify-center items-center px-4 py-8">
      <div className="text-center mb-6 text-white flex flex-col items-center">
        <img src="/logo.jpeg" alt="Malaria Guide Logo" className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-white/30 shadow-lg" />
        <h1 className="text-4xl font-bold tracking-wide mb-2">Malaria Guide</h1>
        <p className="text-lg opacity-90 font-medium tracking-wider">Predict. Prevent. Educate.</p>
      </div>

      <div className="bg-white w-full max-w-md rounded-[32px] shadow-xl p-8 md:p-10">
        <h2 className="text-2xl font-bold text-[#10a396] mb-8">Create Account</h2>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#10a396]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#10a396]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#10a396] pr-11"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#10a396] hover:bg-[#0d877c] text-white font-bold py-3.5 rounded-2xl transition-all">
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500 font-medium">
          Already have an account?{' '}
          <Link href="/" className="text-[#10a396] font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
