
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import bcrypt from 'bcryptjs';
import { toast } from 'sonner';

interface AdminAuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: React.ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if the user is already authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedAuth = localStorage.getItem('adminAuth');
      if (storedAuth) {
        try {
          const { email, timestamp } = JSON.parse(storedAuth);
          
          // Simple session expiration check (24 hours)
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('adminAuth');
          }
        } catch (error) {
          localStorage.removeItem('adminAuth');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Query the admin_users table to get the admin with the provided email
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

      if (adminError || !adminData) {
        toast.error('Invalid email or password');
        setIsLoading(false);
        return false;
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, adminData.password_hash);

      if (!isPasswordValid) {
        toast.error('Invalid email or password');
        setIsLoading(false);
        return false;
      }

      // Set authentication state
      setIsAuthenticated(true);
      
      // Store auth info in localStorage
      localStorage.setItem('adminAuth', JSON.stringify({
        email,
        timestamp: Date.now()
      }));
      
      toast.success('Logged in successfully');
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
    toast.info('Logged out successfully');
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
