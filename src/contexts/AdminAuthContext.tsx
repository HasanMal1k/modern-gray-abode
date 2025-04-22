import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabaseTable, assertType } from "@/utils/supabase.utils";
import bcrypt from 'bcryptjs';
import { toast } from 'sonner';
import { AdminUser } from "@/types/admin.types";

export interface AdminAuthContextProps {
  currentUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AdminUser | null>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = () => {
      const adminUser = localStorage.getItem('admin_user');
      if (adminUser) {
        try {
          setCurrentUser(JSON.parse(adminUser));
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
      setIsLoading(true);
      
      const { data, error } = await supabaseTable('admin_users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        toast.error('Invalid email or password');
        return null;
      }
      
      const user = assertType<AdminUser>(data);
      
      if (!await bcrypt.compare(password, user.password_hash)) {
        toast.error('Invalid email or password');
        console.log("User data from Supabase:", data);
        return null;
      }
      
      const safeUser = {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      };
      
      setCurrentUser(safeUser);
      
      sessionStorage.setItem('adminUser', JSON.stringify(safeUser));
      
      return safeUser;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    setCurrentUser(null);
    sessionStorage.removeItem('adminUser');
  };
  
  return (
    <AdminAuthContext.Provider 
      value={{ 
        currentUser, 
        isAuthenticated: !!currentUser,
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
