
// Update the supabase query in AdminAuthContext to use type assertions
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from "@/utils/supabase.utils";
import bcrypt from 'bcryptjs';
import { toast } from 'sonner';

export interface AdminUser {
  id: string;
  email: string;
}

export interface AdminAuthContextProps {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AdminUser | void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for existing session in localStorage
    const checkAuth = () => {
      const adminUser = localStorage.getItem('admin_user');
      if (adminUser) {
        try {
          setUser(JSON.parse(adminUser));
        } catch (e) {
          localStorage.removeItem('admin_user');
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users' as any)
        .select('*')
        .eq('email', email)
        .single();
      
      if (error || !data) {
        throw new Error('Invalid email or password');
      }
      
      const isValidPassword = await bcrypt.compare(password, data.password_hash);
      
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }
      
      const adminUser: AdminUser = {
        id: data.id,
        email: data.email
      };
      
      setUser(adminUser);
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      
      return adminUser;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
      return;
    }
  };
  
  const logout = async () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };
  
  return (
    <AdminAuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isLoading,
        login, 
        logout 
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
