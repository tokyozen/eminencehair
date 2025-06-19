import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, getCurrentUser, Customer, getOrCreateCustomerData } from '../lib/supabase';

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
        const customerData = await getOrCreateCustomerData(user);
        setCustomer(customerData);
        console.log('Customer data refreshed:', customerData);
      } catch (error) {
        console.error('Error refreshing customer data:', error);
        setCustomer(null);
      }
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        console.log('Initial user check:', currentUser?.email);
        
        setUser(currentUser);
        
        if (currentUser) {
          const customerData = await getOrCreateCustomerData(currentUser);
          console.log('Initial customer data:', customerData);
          setCustomer(customerData);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            const customerData = await getOrCreateCustomerData(session.user);
            setCustomer(customerData);
            console.log('Customer data loaded after auth change:', customerData);
          } catch (error) {
            console.error('Error loading customer data:', error);
            setCustomer(null);
          }
        } else {
          setCustomer(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setCustomer(null);
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