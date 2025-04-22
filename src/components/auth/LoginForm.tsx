import React, { useState } from 'react';
import { signIn } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Login attempt with:', { email });
      const { user, error } = await signIn(email, password);
      
      if (error) {
        console.error('Login error from API:', error);
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (user) {
        console.log('Login successful, user:', user);
        toast.success('Successfully logged in!');
        
        // First store user in session storage for more immediate access
        sessionStorage.setItem('redirect_after_login', 'true');

        // Force a longer delay before redirect to ensure state updates
        setTimeout(() => {
          console.log('Redirecting to dashboard...');
          navigate('/dashboard', { replace: true });
          
          // After a small additional delay, trigger a manual check if redirection hasn't happened
          setTimeout(() => {
            if (window.location.pathname !== '/dashboard') {
              console.log('Forced redirect to dashboard...');
              window.location.href = '/dashboard';
            }
          }, 500);
        }, 300);
      } else {
        console.error('No user returned despite successful login');
        toast.error('Login successful but user data is missing');
        setLoading(false);
      }
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:border-blue-500 focus:ring-blue-500 outline-none transition"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:border-blue-500 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center w-full py-3 px-4 rounded-lg transition ${
          loading
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
        } text-white font-medium`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in...
          </span>
        ) : (
          <span className="flex items-center">
            Log in
            <ArrowRight size={18} className="ml-2" />
          </span>
        )}
      </button>
    </form>
  );
};

export default LoginForm;