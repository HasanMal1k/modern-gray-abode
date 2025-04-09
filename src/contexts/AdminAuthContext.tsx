
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, CustomDatabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import bcrypt from 'bcryptjs';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing authentication on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('adminUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Fetch the user from the database
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single() as { 
          data: CustomDatabase['public']['Tables']['admin_users']['Row'] | null; 
          error: any 
        };

      if (error) throw new Error('Authentication failed');
      if (!data) throw new Error('User not found');

      // Compare the passwords
      const passwordMatch = await bcrypt.compare(password, data.password_hash);
      if (!passwordMatch) throw new Error('Invalid credentials');

      // Set the authenticated user
      const adminUser: AdminUser = {
        id: data.id,
        email: data.email,
        created_at: data.created_at
      };

      setUser(adminUser);
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      toast.success('Login successful');
      navigate('/admin');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) return false;
    
    try {
      // Fetch the user from the database to get current password hash
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', user.id)
        .single() as {
          data: CustomDatabase['public']['Tables']['admin_users']['Row'] | null;
          error: any
        };
      
      if (error) throw error;
      if (!data) throw new Error('User not found');
      
      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, data.password_hash);
      if (!isMatch) {
        toast.error('Current password is incorrect');
        return false;
      }
      
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const newPasswordHash = await bcrypt.hash(newPassword, salt);
      
      // Update the password in the database
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password_hash: newPasswordHash } as any)
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      toast.success('Password updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
      return false;
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updatePassword
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
