import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, Customer, getOrCreateCustomerData, signOut as firebaseSignOut, onAuthStateChange } from '../lib/firebase';

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
    console.log('Setting up Firebase auth listener...');
    
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      console.log('Firebase auth state changed:', firebaseUser?.email || 'No user');
      
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Get customer data when user signs in
        try {
          const customerData = await getOrCreateCustomerData(firebaseUser);
          setCustomer(customerData);
          console.log('Customer data loaded:', customerData?.email);
        } catch (error) {
          console.error('Error getting customer data:', error);
          setCustomer(null);
        }
      } else {
        // Clear customer data when user signs out
        setCustomer(null);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up Firebase auth listener');
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      console.log('Signing out...');
      await firebaseSignOut();
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