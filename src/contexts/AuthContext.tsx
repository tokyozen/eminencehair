import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { getCurrentUser, Customer, getOrCreateCustomerData, signOut as supabaseSignOut } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  customer: Customer | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshCustomerData: () => Promise<void>;
  mockSignIn: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshCustomerData = async () => {
    if (user) {
      try {
        console.log('Refreshing customer data for user:', user.email);
        const customerData = await getOrCreateCustomerData(user);
        setCustomer(customerData);
        console.log('Customer data refreshed:', customerData?.email);
      } catch (error) {
        console.error('Error refreshing customer data:', error);
        setCustomer(null);
      }
    }
  };

  // Mock sign in function for development
  const mockSignIn = async (email: string) => {
    console.log('Mock sign in for:', email);
    
    const mockUser = {
      id: 'mock-user-id',
      email,
      user_metadata: {
        first_name: 'Demo',
        last_name: 'User',
        phone: '(204) 825-8526',
      }
    } as User;
    
    setUser(mockUser);
    
    // Get customer data
    const customerData = await getOrCreateCustomerData(mockUser);
    setCustomer(customerData);
    
    console.log('Mock sign in complete:', { user: mockUser.email, customer: customerData?.email });
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        // For development, start with no user
        const currentUser = await getCurrentUser();
        
        if (!mounted) return;
        
        console.log('Initial user check:', currentUser?.email || 'No user');
        setUser(currentUser);
        
        if (currentUser) {
          const customerData = await getOrCreateCustomerData(currentUser);
          if (mounted) {
            console.log('Initial customer data:', customerData?.email || 'No customer data');
            setCustomer(customerData);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setUser(null);
          setCustomer(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
          console.log('Auth initialization complete');
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    try {
      console.log('Signing out...');
      await supabaseSignOut();
      setUser(null);
      setCustomer(null);
      console.log('Sign out complete');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    customer,
    loading,
    signOut: handleSignOut,
    refreshCustomerData,
    mockSignIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};