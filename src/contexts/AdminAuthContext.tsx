
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabaseTable, assertType } from "@/utils/supabase.utils";
import { AdminUser } from '@/types/admin.types';
import { toast } from 'sonner';
import bcrypt from 'bcryptjs';

interface AdminAuthContextProps {
  user: AdminUser | null;
  isAuthenticated: boolean; // Add this property
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
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
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabaseTable('admin_users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();
      
      if (error || !data) {
        toast.error('Invalid email or password');
        return false;
      }
      
      const typedUser = assertType<AdminUser>(data);
      const passwordMatch = await bcrypt.compare(password, typedUser.password_hash || '');
      
      if (!passwordMatch) {
        toast.error('Invalid email or password');
        return false;
      }
      
      // Remove password_hash from user object before storing
      const { password_hash, ...safeUser } = typedUser;
      setUser(safeUser);
      localStorage.setItem('adminUser', JSON.stringify(safeUser));
      
      toast.success('Logged in successfully');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setIsLoading(true);
      
      if (!user) {
        toast.error('No user logged in');
        return false;
      }
      
      const { data: userData, error: userError } = await supabaseTable('admin_users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (userError || !userData) {
        toast.error('Failed to load user data');
        return false;
      }
      
      const typedUser = assertType<AdminUser>(userData);
      const passwordMatch = await bcrypt.compare(currentPassword, typedUser.password_hash || '');
      
      if (!passwordMatch) {
        toast.error('Invalid current password');
        return false;
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      const { error } = await supabaseTable('admin_users')
        .update(assertType({
          password_hash: hashedPassword
        }))
        .eq('id', userData.id);
      
      if (error) {
        console.error('Password update error:', error);
        toast.error('Failed to update password');
        return false;
      }
      
      toast.success('Password updated successfully');
      return true;
    } catch (error) {
      console.error('Password update error:', error);
      toast.error('An error occurred while updating the password');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AdminAuthContextProps = {
    user,
    isAuthenticated: !!user, // Add this property
    login,
    logout,
    updatePassword,
    isLoading,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!isLoading && children}
    </AdminAuthContext.Provider>
  );
};
