import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, Lock, Mail } from 'lucide-react';
import grayscaleLogo from "../../../public/images/Grayscale.png";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isLoading, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  // Enable normal cursor on admin login page
  useEffect(() => {
    // Enable normal cursor
    document.body.style.cursor = '';
    
    // Override any global cursor: none rules
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        cursor: initial !important;
      }
      a, button, [role="button"], .clickable {
        cursor: pointer !important;
      }
      input, textarea, select {
        cursor: text !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Cleanup function
    return () => {
      document.head.removeChild(styleElement);
      // Only restore 'none' cursor when going back to public pages
      if (!window.location.pathname.startsWith('/admin')) {
        document.body.style.cursor = 'none';
      }
    };
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const user = await login(email, password);
      if (user) {
        toast.success('Login successful');
        navigate('/admin/dashboard');
      }
      // If login returns null, the error is already handled in the login function
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with logo */}
          <div className="bg-orange-50 p-6 border-b border-orange-100">
            <div className="flex justify-center mb-4">
              <img src={grayscaleLogo} alt="GrayScale Logo" className="h-12" />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900">Admin Login</h1>
            <p className="mt-2 text-center text-gray-600">Sign in to access the admin dashboard</p>
          </div>
          
          {/* Login form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="pl-10 bg-gray-50 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-gray-50 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5 text-gray-400" /> : 
                    <Eye className="h-5 w-5 text-gray-400" />
                  }
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          
          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500">
              © {new Date().getFullYear()} GrayScale Realtors. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Return to website link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
            ← Return to website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;