import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase.utils";
import { toast } from 'sonner';
import { AdminUser } from '@/types/admin.types';
import bcrypt from 'bcryptjs';

interface AdminAuthContextProps {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AdminUser | void>;
  logout: () => void;
}

export const AdminAuthContext = createContext<AdminAuthContextProps>({
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {},
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user');
    if (adminUser) {
      setUser(JSON.parse(adminUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Login error:', error);
        throw new Error('Invalid email or password');
      }

      if (!data) {
        throw new Error('Invalid email or password');
      }

      const user = data as any;
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      // Set user information
      const userData: AdminUser = {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      };

      setUser(userData);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      return userData;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  const value: AdminAuthContextProps = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
