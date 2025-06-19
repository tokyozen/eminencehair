import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging to check if environment variables are loaded
console.log('🔍 Supabase URL:', supabaseUrl);
console.log('🔍 Supabase Key exists:', !!supabaseAnonKey);
console.log('🔍 Supabase Key length:', supabaseAnonKey?.length);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY exists:', !!supabaseAnonKey);
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

// Test if URL is valid
try {
  new URL(supabaseUrl);
  console.log('✅ Supabase URL is valid');
} catch (error) {
  console.error('❌ Invalid Supabase URL:', supabaseUrl);
  throw new Error('Invalid Supabase URL format');
}

// Network connectivity test
const testNetworkConnectivity = async () => {
  try {
    console.log('🔍 Testing network connectivity to Supabase...');
    
    // Try a simple fetch to the Supabase URL
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    if (response.ok) {
      console.log('✅ Network connectivity to Supabase is working');
      return true;
    } else {
      console.warn('⚠️ Supabase responded but with status:', response.status);
      return false;
    }
  } catch (error: any) {
    console.error('❌ Network connectivity test failed:', error.message);
    
    if (error.message.includes('ERR_NAME_NOT_RESOLVED')) {
      console.error('🌐 DNS Resolution failed - this might be a network/firewall issue');
      console.error('💡 Try accessing your Supabase dashboard directly in a new tab to test connectivity');
    } else if (error.message.includes('ERR_NETWORK_CHANGED')) {
      console.error('🔄 Network connection changed - try refreshing the page');
    } else if (error.message.includes('Failed to fetch')) {
      console.error('🚫 Network request blocked - this might be a CORS or firewall issue');
    }
    
    return false;
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Test connection with better error handling
const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // First test basic network connectivity
    const networkOk = await testNetworkConnectivity();
    if (!networkOk) {
      console.error('❌ Network connectivity test failed - skipping Supabase test');
      return;
    }
    
    // Test Supabase API
    const { error, count } = await supabase
      .from('customers')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase API test failed:', error);
      
      if (error.message.includes('relation "customers" does not exist')) {
        console.error('📋 Database tables not created yet - run migrations first');
      } else if (error.message.includes('JWT')) {
        console.error('🔑 Authentication token issue - check your API key');
      } else if (error.message.includes('permission denied')) {
        console.error('🔒 Permission denied - check RLS policies');
      }
    } else {
      console.log('✅ Supabase connected successfully! Customer count:', count);
    }
  } catch (error: any) {
    console.error('❌ Supabase connection error:', error);
    
    if (error.message?.includes('fetch')) {
      console.error('🌐 This appears to be a network connectivity issue');
      console.error('💡 Possible solutions:');
      console.error('   1. Check your internet connection');
      console.error('   2. Try refreshing the page');
      console.error('   3. Check if your firewall is blocking the request');
      console.error('   4. Try accessing your Supabase dashboard directly');
    }
  }
};

// Run connection test after a short delay to allow the app to load
setTimeout(testSupabaseConnection, 2000);

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

// Authentication functions with better error handling
export const signUp = async (email: string, password: string, userData: {
  firstName: string;
  lastName: string;
  phone: string;
}) => {
  console.log('🔄 Creating new user account:', email);
  
  try {
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
      console.error('❌ Sign up error:', error);
      throw error;
    }

    console.log('✅ User created successfully:', data.user?.email);

    // Create customer record
    if (data.user) {
      console.log('🔄 Creating customer record...');
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
        console.error('❌ Error creating customer record:', customerError);
        throw customerError;
      }
      console.log('✅ Customer record created successfully');
    }

    return data;
  } catch (error: any) {
    console.error('❌ SignUp failed:', error);
    if (error.message?.includes('fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('Unable to connect to Supabase. Please check your internet connection and try again.');
    }
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  console.log('🔄 Signing in user:', email);
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Sign in error:', error);
      throw error;
    }

    console.log('✅ User signed in successfully:', data.user?.email);
    return data;
  } catch (error: any) {
    console.error('❌ SignIn failed:', error);
    if (error.message?.includes('fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('Unable to connect to Supabase. Please check your internet connection and try again.');
    }
    throw error;
  }
};

export const signOut = async () => {
  console.log('🔄 Signing out user');
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('❌ Sign out error:', error);
      throw error;
    }
    console.log('✅ User signed out successfully');
  } catch (error: any) {
    console.error('❌ SignOut failed:', error);
    if (error.message?.includes('fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('Unable to connect to Supabase. Please check your internet connection and try again.');
    }
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('❌ Get user error:', error);
      return null;
    }
    return user;
  } catch (error: any) {
    console.error('❌ GetCurrentUser failed:', error);
    return null;
  }
};

// Customer data functions with better error handling
export const getCustomerData = async (userId: string): Promise<Customer | null> => {
  console.log('🔄 Fetching customer data for user:', userId);
  
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('❌ Error fetching customer data:', error);
      return null;
    }

    console.log('✅ Customer data fetched successfully:', data?.email);
    return data;
  } catch (error: any) {
    console.error('❌ GetCustomerData failed:', error);
    return null;
  }
};

export const getOrCreateCustomerData = async (user: any): Promise<Customer | null> => {
  if (!user) return null;

  console.log('🔄 Getting or creating customer data for:', user.email);
  
  try {
    // First try to get existing customer
    let customer = await getCustomerData(user.id);
    
    if (!customer) {
      // Create new customer record
      console.log('🔄 Creating new customer record for:', user.email);
      
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
        console.error('❌ Error creating customer:', error);
        return null;
      }

      customer = data;
      console.log('✅ Customer record created successfully:', customer?.email);
    }

    return customer;
  } catch (error: any) {
    console.error('❌ GetOrCreateCustomerData failed:', error);
    return null;
  }
};

export const getCustomerAppointments = async (customerId: string): Promise<Appointment[]> => {
  console.log('🔄 Fetching appointments for customer:', customerId);
  
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('customer_id', customerId)
      .order('appointment_date', { ascending: true });

    if (error) {
      console.error('❌ Error fetching appointments:', error);
      return [];
    }

    console.log('✅ Appointments fetched successfully:', data?.length || 0);
    return data || [];
  } catch (error: any) {
    console.error('❌ GetCustomerAppointments failed:', error);
    return [];
  }
};

export const getCustomerOrders = async (customerId: string): Promise<Order[]> => {
  console.log('🔄 Fetching orders for customer:', customerId);
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('customer_id', customerId)
      .order('order_date', { ascending: false });

    if (error) {
      console.error('❌ Error fetching orders:', error);
      return [];
    }

    console.log('✅ Orders fetched successfully:', data?.length || 0);
    return data || [];
  } catch (error: any) {
    console.error('❌ GetCustomerOrders failed:', error);
    return [];
  }
};

export const getCustomerWishlist = async (customerId: string): Promise<WishlistItem[]> => {
  console.log('🔄 Fetching wishlist for customer:', customerId);
  
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching wishlist:', error);
      return [];
    }

    console.log('✅ Wishlist fetched successfully:', data?.length || 0);
    return data || [];
  } catch (error: any) {
    console.error('❌ GetCustomerWishlist failed:', error);
    return [];
  }
};

// Booking functions
export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at'>) => {
  console.log('🔄 Creating new appointment:', appointmentData);
  
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating appointment:', error);
      throw error;
    }

    console.log('✅ Appointment created successfully:', data?.id);
    return data;
  } catch (error: any) {
    console.error('❌ CreateAppointment failed:', error);
    if (error.message?.includes('fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('Unable to connect to Supabase. Please check your internet connection and try again.');
    }
    throw error;
  }
};

// Wishlist functions
export const addToWishlist = async (wishlistData: Omit<WishlistItem, 'id' | 'created_at'>) => {
  console.log('🔄 Adding to wishlist:', wishlistData);
  
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .insert(wishlistData)
      .select()
      .single();

    if (error) {
      console.error('❌ Error adding to wishlist:', error);
      throw error;
    }

    console.log('✅ Item added to wishlist successfully:', data?.id);
    return data;
  } catch (error: any) {
    console.error('❌ AddToWishlist failed:', error);
    if (error.message?.includes('fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('Unable to connect to Supabase. Please check your internet connection and try again.');
    }
    throw error;
  }
};

export const removeFromWishlist = async (itemId: string) => {
  console.log('🔄 Removing from wishlist:', itemId);
  
  try {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('❌ Error removing from wishlist:', error);
      throw error;
    }

    console.log('✅ Item removed from wishlist successfully');
  } catch (error: any) {
    console.error('❌ RemoveFromWishlist failed:', error);
    if (error.message?.includes('fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('Unable to connect to Supabase. Please check your internet connection and try again.');
    }
    throw error;
  }
};

// Update customer profile
export const updateCustomerProfile = async (customerId: string, updates: Partial<Customer>) => {
  console.log('🔄 Updating customer profile:', { customerId, updates });
  
  try {
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
      console.error('❌ Error updating customer profile:', error);
      throw error;
    }

    console.log('✅ Customer profile updated successfully');
    return data;
  } catch (error: any) {
    console.error('❌ UpdateCustomerProfile failed:', error);
    if (error.message?.includes('fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('Unable to connect to Supabase. Please check your internet connection and try again.');
    }
    throw error;
  }
};

// Password reset
export const resetPassword = async (email: string) => {
  console.log('🔄 Sending password reset email to:', email);
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      console.error('❌ Error sending password reset:', error);
      throw error;
    }

    console.log('✅ Password reset email sent successfully');
  } catch (error: any) {
    console.error('❌ ResetPassword failed:', error);
    if (error.message?.includes('fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('Unable to connect to Supabase. Please check your internet connection and try again.');
    }
    throw error;
  }
};

// Update password
export const updatePassword = async (newPassword: string) => {
  console.log('🔄 Updating user password');
  
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error('❌ Error updating password:', error);
      throw error;
    }

    console.log('✅ Password updated successfully');
  } catch (error: any) {
    console.error('❌ UpdatePassword failed:', error);
    if (error.message?.includes('fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('Unable to connect to Supabase. Please check your internet connection and try again.');
    }
    throw error;
  }
};