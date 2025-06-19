import { createClient } from '@supabase/supabase-js';

// Use placeholder values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

console.log('Supabase config:', { 
  url: supabaseUrl, 
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey.length 
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  member_since: string;
  total_orders: number;
  total_spent: number;
  loyalty_points: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  customer_id: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  duration?: string;
  notes?: string;
  rating?: number;
  review?: string;
  created_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  order_number: string;
  order_date: string;
  total_amount: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  tracking_number?: string;
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  product_length?: string;
  price: number;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  customer_id: string;
  product_name: string;
  product_length?: string;
  price: number;
  image_url?: string;
  in_stock: boolean;
  created_at: string;
}

// Mock authentication functions for development
export const signUp = async (email: string, password: string, userData: {
  firstName: string;
  lastName: string;
  phone: string;
}) => {
  console.log('Mock signUp called:', { email, userData });
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock user data
  const mockUser = {
    id: 'mock-user-id',
    email,
    user_metadata: {
      first_name: userData.firstName,
      last_name: userData.lastName,
      phone: userData.phone,
    }
  };
  
  return { user: mockUser, session: null };
};

export const signIn = async (email: string, password: string) => {
  console.log('Mock signIn called:', { email });
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock user data
  const mockUser = {
    id: 'mock-user-id',
    email,
    user_metadata: {
      first_name: 'Demo',
      last_name: 'User',
      phone: '(204) 825-8526',
    }
  };
  
  return { user: mockUser, session: { user: mockUser } };
};

export const signOut = async () => {
  console.log('Mock signOut called');
  await new Promise(resolve => setTimeout(resolve, 500));
};

export const getCurrentUser = async () => {
  console.log('Mock getCurrentUser called');
  return null; // No user initially
};

// Mock customer data functions
export const getCustomerData = async (userId: string): Promise<Customer | null> => {
  console.log('Mock getCustomerData called:', userId);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock customer data
  return {
    id: userId,
    email: 'demo@example.com',
    first_name: 'Demo',
    last_name: 'User',
    phone: '(204) 825-8526',
    member_since: '2024-01-01T00:00:00Z',
    total_orders: 5,
    total_spent: 450.00,
    loyalty_points: 45,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  };
};

export const getOrCreateCustomerData = async (user: any): Promise<Customer | null> => {
  console.log('Mock getOrCreateCustomerData called:', user?.email);
  return await getCustomerData(user.id);
};

export const getCustomerAppointments = async (customerId: string): Promise<Appointment[]> => {
  console.log('Mock getCustomerAppointments called:', customerId);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'apt-1',
      customer_id: customerId,
      service_name: 'Wig Install + Styling',
      appointment_date: '2025-01-20',
      appointment_time: '14:00',
      status: 'confirmed',
      price: 80.00,
      duration: '3-4 hours',
      notes: 'Bring wig for installation - Body Wave 22"',
      created_at: '2024-01-01T00:00:00Z'
    }
  ];
};

export const getCustomerOrders = async (customerId: string): Promise<Order[]> => {
  console.log('Mock getCustomerOrders called:', customerId);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'order-1',
      customer_id: customerId,
      order_number: 'ORD-000001',
      order_date: '2024-12-10T00:00:00Z',
      total_amount: 383.00,
      status: 'delivered',
      tracking_number: 'TRK123456789',
      created_at: '2024-12-10T00:00:00Z',
      order_items: [
        {
          id: 'item-1',
          order_id: 'order-1',
          product_name: '13x6 HD Lace Body Wave Wig',
          product_length: '22"',
          price: 328.00,
          quantity: 1
        }
      ]
    }
  ];
};

export const getCustomerWishlist = async (customerId: string): Promise<WishlistItem[]> => {
  console.log('Mock getCustomerWishlist called:', customerId);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'wish-1',
      customer_id: customerId,
      product_name: '13x6 HD Lace Deep Wave Wig',
      product_length: '26"',
      price: 383.00,
      image_url: 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/ca7ef7cb-f5f7-4f21-be43-bd3b9c7725e9.jpg',
      in_stock: true,
      created_at: '2024-01-01T00:00:00Z'
    }
  ];
};

// Mock booking functions
export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at'>) => {
  console.log('Mock createAppointment called:', appointmentData);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: 'new-apt-' + Date.now(),
    ...appointmentData,
    created_at: new Date().toISOString()
  };
};

// Mock wishlist functions
export const addToWishlist = async (wishlistData: Omit<WishlistItem, 'id' | 'created_at'>) => {
  console.log('Mock addToWishlist called:', wishlistData);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: 'new-wish-' + Date.now(),
    ...wishlistData,
    created_at: new Date().toISOString()
  };
};

export const removeFromWishlist = async (itemId: string) => {
  console.log('Mock removeFromWishlist called:', itemId);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
};

// Mock update customer profile
export const updateCustomerProfile = async (customerId: string, updates: Partial<Customer>) => {
  console.log('Mock updateCustomerProfile called:', { customerId, updates });
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: customerId,
    email: 'demo@example.com',
    first_name: 'Demo',
    last_name: 'User',
    phone: '(204) 825-8526',
    member_since: '2024-01-01T00:00:00Z',
    total_orders: 5,
    total_spent: 450.00,
    loyalty_points: 45,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
    ...updates
  };
};