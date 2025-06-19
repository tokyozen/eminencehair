import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, Customer, getOrCreateCustomerData, signOut as supabaseSignOut } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  customer: Customer | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshCustomerData: () => Promise<void>;
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

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (!mounted) return;
        
        const currentUser = session?.user || null;
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

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'No user');
        
        if (!mounted) return;
        
        const currentUser = session?.user || null;
        setUser(currentUser);
        
        if (currentUser) {
          // Get customer data when user signs in
          try {
            const customerData = await getOrCreateCustomerData(currentUser);
            if (mounted) {
              setCustomer(customerData);
            }
          } catch (error) {
            console.error('Error getting customer data:', error);
            if (mounted) {
              setCustomer(null);
            }
          }
        } else {
          // Clear customer data when user signs out
          if (mounted) {
            setCustomer(null);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};