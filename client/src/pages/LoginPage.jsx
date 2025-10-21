import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

/**
 * Login Page Component
 * 
 * Features:
 * - Email + Password login form
 * - Client-side validation
 * - Password visibility toggle
 * - Error handling with toast notifications
 * - Redirect to home after successful login
 * 
 * Flow:
 * 1. User enters credentials
 * 2. Client validates inputs
 * 3. Calls auth context login()
 * 4. Shows success toast
 * 5. Redirects to home page
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      const response = await login(formData);
      toast.success(response.message || 'Login successful!');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid email or password';
      toast.error(errorMessage);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-surface to-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Login Card */}
      <div className="max-w-md w-full space-y-8 bg-surface p-8 rounded-2xl shadow-2xl border border-border">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" clickable={false} showTagline />
          </div>
          <h2 className="text-3xl font-bold text-text-primary">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`
                    block w-full pl-10 pr-3 py-3
                    border ${errors.email ? 'border-negative-500' : 'border-border'}
                    rounded-lg
                    text-text-primary placeholder-text-muted
                    focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                    transition-colors
                  `}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-negative-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    block w-full pl-10 pr-10 py-3
                    border ${errors.password ? 'border-negative-500' : 'border-border'}
                    rounded-lg
                    text-text-primary placeholder-text-muted
                    focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                    transition-colors
                  `}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-text-muted hover:text-text-secondary" />
                  ) : (
                    <Eye className="h-5 w-5 text-text-muted hover:text-text-secondary" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-negative-500">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full flex items-center justify-center gap-2
              px-4 py-3
              bg-brand-500 text-text-inverse
              text-base font-semibold
              rounded-lg
              hover:bg-brand-600
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              shadow-lg hover:shadow-xl
            "
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-text-inverse border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-text-muted">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
