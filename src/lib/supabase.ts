import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

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

// Authentication functions
export const signUp = async (email: string, password: string, userData: {
  firstName: string;
  lastName: string;
  phone: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
      }
    }
  });

  if (error) throw error;

  // Create customer record
  if (data.user) {
    const { error: customerError } = await supabase
      .from('customers')
      .insert({
        id: data.user.id,
        email: data.user.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
      });

    if (customerError) throw customerError;
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Customer data functions
export const getCustomerData = async (userId: string): Promise<Customer | null> => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const getCustomerAppointments = async (customerId: string): Promise<Appointment[]> => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('customer_id', customerId)
    .order('appointment_date', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const getCustomerOrders = async (customerId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('customer_id', customerId)
    .order('order_date', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getCustomerWishlist = async (customerId: string): Promise<WishlistItem[]> => {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Booking functions
export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointmentData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Wishlist functions
export const addToWishlist = async (wishlistData: Omit<WishlistItem, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('wishlist_items')
    .insert(wishlistData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeFromWishlist = async (itemId: string) => {
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('id', itemId);

  if (error) throw error;
};

// Update customer profile
export const updateCustomerProfile = async (customerId: string, updates: Partial<Customer>) => {
  const { data, error } = await supabase
    .from('customers')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', customerId)
    .select()
    .single();

  if (error) throw error;
  return data;
};