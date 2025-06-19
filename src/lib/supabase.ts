import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
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
  console.log('Creating new user account:', email);
  
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

  if (error) {
    console.error('Sign up error:', error);
    throw error;
  }

  // Create customer record
  if (data.user) {
    const { error: customerError } = await supabase
      .from('customers')
      .insert({
        id: data.user.id,
        email: data.user.email!,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
      });

    if (customerError) {
      console.error('Error creating customer record:', customerError);
      throw customerError;
    }
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  console.log('Signing in user:', email);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    throw error;
  }

  return data;
};

export const signOut = async () => {
  console.log('Signing out user');
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Get user error:', error);
    return null;
  }
  return user;
};

// Customer data functions
export const getCustomerData = async (userId: string): Promise<Customer | null> => {
  console.log('Fetching customer data for user:', userId);
  
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching customer data:', error);
    return null;
  }

  return data;
};

export const getOrCreateCustomerData = async (user: any): Promise<Customer | null> => {
  if (!user) return null;

  console.log('Getting or creating customer data for:', user.email);
  
  // First try to get existing customer
  let customer = await getCustomerData(user.id);
  
  if (!customer) {
    // Create new customer record
    console.log('Creating new customer record for:', user.email);
    
    const customerData = {
      id: user.id,
      email: user.email,
      first_name: user.user_metadata?.first_name || 'User',
      last_name: user.user_metadata?.last_name || '',
      phone: user.user_metadata?.phone || null,
    };

    const { data, error } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single();

    if (error) {
      console.error('Error creating customer:', error);
      return null;
    }

    customer = data;
  }

  return customer;
};

export const getCustomerAppointments = async (customerId: string): Promise<Appointment[]> => {
  console.log('Fetching appointments for customer:', customerId);
  
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('customer_id', customerId)
    .order('appointment_date', { ascending: true });

  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }

  return data || [];
};

export const getCustomerOrders = async (customerId: string): Promise<Order[]> => {
  console.log('Fetching orders for customer:', customerId);
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('customer_id', customerId)
    .order('order_date', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data || [];
};

export const getCustomerWishlist = async (customerId: string): Promise<WishlistItem[]> => {
  console.log('Fetching wishlist for customer:', customerId);
  
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }

  return data || [];
};

// Booking functions
export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at'>) => {
  console.log('Creating new appointment:', appointmentData);
  
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointmentData)
    .select()
    .single();

  if (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }

  return data;
};

// Wishlist functions
export const addToWishlist = async (wishlistData: Omit<WishlistItem, 'id' | 'created_at'>) => {
  console.log('Adding to wishlist:', wishlistData);
  
  const { data, error } = await supabase
    .from('wishlist_items')
    .insert(wishlistData)
    .select()
    .single();

  if (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }

  return data;
};

export const removeFromWishlist = async (itemId: string) => {
  console.log('Removing from wishlist:', itemId);
  
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Update customer profile
export const updateCustomerProfile = async (customerId: string, updates: Partial<Customer>) => {
  console.log('Updating customer profile:', { customerId, updates });
  
  const { data, error } = await supabase
    .from('customers')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', customerId)
    .select()
    .single();

  if (error) {
    console.error('Error updating customer profile:', error);
    throw error;
  }

  return data;
};

// Password reset
export const resetPassword = async (email: string) => {
  console.log('Sending password reset email to:', email);
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    console.error('Error sending password reset:', error);
    throw error;
  }
};

// Update password
export const updatePassword = async (newPassword: string) => {
  console.log('Updating user password');
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};