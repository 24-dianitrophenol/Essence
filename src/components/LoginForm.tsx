import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500">Please enter your details to sign in</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f98203] focus:border-transparent transition-all outline-none"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#f98203] focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="rounded border-gray-300 text-[#f98203] focus:ring-[#f98203] mr-2" />
              Remember me
            </label>
            <a href="#" className="text-[#f98203] font-medium hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f98203] text-white py-3 rounded-xl font-bold hover:bg-[#e07502] transform active:scale-[0.98] transition-all shadow-lg shadow-[#f98203]/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/icon_google.svg" className="w-5 h-5" alt="Google" />
          </button>
          <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </button>
          <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.96.95-2.18 1.43-3.66 1.43-1.48 0-2.85-.48-3.81-1.43-1.04-1.01-1.57-2.3-1.57-4.14 0-1.84.53-3.13 1.57-4.14.96-.95 2.33-1.43 3.81-1.43 1.48 0 2.7.48 3.66 1.43 1.04 1.01 1.57 2.3 1.57 4.14 0 1.84-.53 3.13-1.57 4.14zM13.39 1.72c2.18 0 4.17.7 5.96 2.08l-2.18 2.18c-1.43-1.01-2.73-1.52-3.78-1.52-1.48 0-2.67.51-3.56 1.52-.89 1.01-1.34 2.21-1.34 3.59h-2.3c0-2.18.73-3.99 2.18-5.43 1.45-1.44 2.91-2.16 5.02-2.16V1.72z" /></svg>
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#f98203] font-bold hover:underline">
              Join Essence Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
