import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail, updatePassword as firebaseUpdatePassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, orderBy, getDocs, updateDoc, deleteDoc, serverTimestamp, increment } from 'firebase/firestore';

// Firebase configuration - replace with your config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Debug logging
console.log('🔍 Firebase Config Check:');
console.log('API Key exists:', !!firebaseConfig.apiKey);
console.log('Auth Domain:', firebaseConfig.authDomain);
console.log('Project ID:', firebaseConfig.projectId);

if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error('❌ Missing Firebase configuration!');
  throw new Error('Missing Firebase environment variables. Please check your .env file.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('✅ Firebase initialized successfully');

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

// Utility function to generate order numbers
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}${random}`;
};

// Authentication functions
export const signUp = async (email: string, password: string, userData: {
  firstName: string;
  lastName: string;
  phone: string;
}) => {
  console.log('🔄 Creating new user account:', email);
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile
    await updateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`
    });

    // Create customer document
    const customerData: Omit<Customer, 'id'> = {
      email: user.email!,
      first_name: userData.firstName,
      last_name: userData.lastName,
      phone: userData.phone,
      member_since: new Date().toISOString(),
      total_orders: 0,
      total_spent: 0,
      loyalty_points: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await setDoc(doc(db, 'customers', user.uid), customerData);

    console.log('✅ User and customer record created successfully');
    return { user, customer: { id: user.uid, ...customerData } };
  } catch (error: any) {
    console.error('❌ Sign up error:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  console.log('🔄 Signing in user:', email);
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ User signed in successfully:', userCredential.user.email);
    return userCredential;
  } catch (error: any) {
    console.error('❌ Sign in error:', error);
    throw error;
  }
};

export const signOut = async () => {
  console.log('🔄 Signing out user');
  try {
    await firebaseSignOut(auth);
    console.log('✅ User signed out successfully');
  } catch (error: any) {
    console.error('❌ Sign out error:', error);
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

// Customer data functions
export const getCustomerData = async (userId: string): Promise<Customer | null> => {
  console.log('🔄 Fetching customer data for user:', userId);
  
  try {
    const customerDoc = await getDoc(doc(db, 'customers', userId));
    
    if (customerDoc.exists()) {
      const data = customerDoc.data();
      console.log('✅ Customer data fetched successfully:', data.email);
      return { id: customerDoc.id, ...data } as Customer;
    } else {
      console.log('❌ No customer document found');
      return null;
    }
  } catch (error: any) {
    console.error('❌ Error fetching customer data:', error);
    return null;
  }
};

export const getOrCreateCustomerData = async (user: any): Promise<Customer | null> => {
  if (!user) return null;

  console.log('🔄 Getting or creating customer data for:', user.email);
  
  try {
    // First try to get existing customer
    let customer = await getCustomerData(user.uid);
    
    if (!customer) {
      // Create new customer record
      console.log('🔄 Creating new customer record for:', user.email);
      
      const customerData: Omit<Customer, 'id'> = {
        email: user.email,
        first_name: user.displayName?.split(' ')[0] || 'User',
        last_name: user.displayName?.split(' ').slice(1).join(' ') || '',
        phone: user.phoneNumber || '',
        member_since: new Date().toISOString(),
        total_orders: 0,
        total_spent: 0,
        loyalty_points: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await setDoc(doc(db, 'customers', user.uid), customerData);
      customer = { id: user.uid, ...customerData };
      console.log('✅ Customer record created successfully:', customer.email);
    }

    return customer;
  } catch (error: any) {
    console.error('❌ Error getting/creating customer data:', error);
    return null;
  }
};

export const getCustomerAppointments = async (customerId: string): Promise<Appointment[]> => {
  console.log('🔄 Fetching appointments for customer:', customerId);
  
  try {
    const appointmentsQuery = query(
      collection(db, 'appointments'),
      where('customer_id', '==', customerId),
      orderBy('appointment_date', 'asc')
    );
    
    const querySnapshot = await getDocs(appointmentsQuery);
    const appointments: Appointment[] = [];
    
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() } as Appointment);
    });

    console.log('✅ Appointments fetched successfully:', appointments.length);
    return appointments;
  } catch (error: any) {
    console.error('❌ Error fetching appointments:', error);
    return [];
  }
};

export const getCustomerOrders = async (customerId: string): Promise<Order[]> => {
  console.log('🔄 Fetching orders for customer:', customerId);
  
  try {
    const ordersQuery = query(
      collection(db, 'orders'),
      where('customer_id', '==', customerId),
      orderBy('order_date', 'desc')
    );
    
    const querySnapshot = await getDocs(ordersQuery);
    const orders: Order[] = [];
    
    for (const orderDoc of querySnapshot.docs) {
      const orderData = { id: orderDoc.id, ...orderDoc.data() } as Order;
      
      // Fetch order items
      const orderItemsQuery = query(
        collection(db, 'order_items'),
        where('order_id', '==', orderDoc.id)
      );
      
      const orderItemsSnapshot = await getDocs(orderItemsQuery);
      const orderItems: OrderItem[] = [];
      
      orderItemsSnapshot.forEach((itemDoc) => {
        orderItems.push({ id: itemDoc.id, ...itemDoc.data() } as OrderItem);
      });
      
      orderData.order_items = orderItems;
      orders.push(orderData);
    }

    console.log('✅ Orders fetched successfully:', orders.length);
    return orders;
  } catch (error: any) {
    console.error('❌ Error fetching orders:', error);
    return [];
  }
};

export const getCustomerWishlist = async (customerId: string): Promise<WishlistItem[]> => {
  console.log('🔄 Fetching wishlist for customer:', customerId);
  
  try {
    const wishlistQuery = query(
      collection(db, 'wishlist_items'),
      where('customer_id', '==', customerId),
      orderBy('created_at', 'desc')
    );
    
    const querySnapshot = await getDocs(wishlistQuery);
    const wishlistItems: WishlistItem[] = [];
    
    querySnapshot.forEach((doc) => {
      wishlistItems.push({ id: doc.id, ...doc.data() } as WishlistItem);
    });

    console.log('✅ Wishlist fetched successfully:', wishlistItems.length);
    return wishlistItems;
  } catch (error: any) {
    console.error('❌ Error fetching wishlist:', error);
    return [];
  }
};

// Booking functions
export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at'>) => {
  console.log('🔄 Creating new appointment:', appointmentData);
  
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      created_at: new Date().toISOString()
    });

    console.log('✅ Appointment created successfully:', docRef.id);
    return { id: docRef.id, ...appointmentData, created_at: new Date().toISOString() };
  } catch (error: any) {
    console.error('❌ Error creating appointment:', error);
    throw error;
  }
};

// Wishlist functions
export const addToWishlist = async (wishlistData: Omit<WishlistItem, 'id' | 'created_at'>) => {
  console.log('🔄 Adding to wishlist:', wishlistData);
  
  try {
    const docRef = await addDoc(collection(db, 'wishlist_items'), {
      ...wishlistData,
      created_at: new Date().toISOString()
    });

    console.log('✅ Item added to wishlist successfully:', docRef.id);
    return { id: docRef.id, ...wishlistData, created_at: new Date().toISOString() };
  } catch (error: any) {
    console.error('❌ Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async (itemId: string) => {
  console.log('🔄 Removing from wishlist:', itemId);
  
  try {
    await deleteDoc(doc(db, 'wishlist_items', itemId));
    console.log('✅ Item removed from wishlist successfully');
  } catch (error: any) {
    console.error('❌ Error removing from wishlist:', error);
    throw error;
  }
};

// Update customer profile
export const updateCustomerProfile = async (customerId: string, updates: Partial<Customer>) => {
  console.log('🔄 Updating customer profile:', { customerId, updates });
  
  try {
    await updateDoc(doc(db, 'customers', customerId), {
      ...updates,
      updated_at: new Date().toISOString()
    });

    console.log('✅ Customer profile updated successfully');
    return { id: customerId, ...updates };
  } catch (error: any) {
    console.error('❌ Error updating customer profile:', error);
    throw error;
  }
};

// Password reset
export const resetPassword = async (email: string) => {
  console.log('🔄 Sending password reset email to:', email);
  
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('✅ Password reset email sent successfully');
  } catch (error: any) {
    console.error('❌ Error sending password reset:', error);
    throw error;
  }
};

// Update password
export const updatePassword = async (newPassword: string) => {
  console.log('🔄 Updating user password');
  
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No authenticated user');
    }
    
    await firebaseUpdatePassword(user, newPassword);
    console.log('✅ Password updated successfully');
  } catch (error: any) {
    console.error('❌ Error updating password:', error);
    throw error;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Create sample data (for development/testing)
export const createSampleData = async () => {
  console.log('🔄 Creating sample data...');
  
  try {
    // Sample customers
    const sampleCustomers = [
      {
        id: 'sample-customer-1',
        email: 'sarah.johnson@email.com',
        first_name: 'Sarah',
        last_name: 'Johnson',
        phone: '(204) 825-8526',
        member_since: '2024-03-15T00:00:00Z',
        total_orders: 8,
        total_spent: 1240.00,
        loyalty_points: 156,
        created_at: '2024-03-15T00:00:00Z',
        updated_at: '2024-12-15T00:00:00Z'
      }
    ];

    // Create sample customer
    for (const customer of sampleCustomers) {
      await setDoc(doc(db, 'customers', customer.id), customer);
    }

    // Sample appointments
    const sampleAppointments = [
      {
        customer_id: 'sample-customer-1',
        service_name: 'Wig Install + Styling',
        appointment_date: '2025-01-20',
        appointment_time: '14:00',
        status: 'confirmed' as const,
        price: 80.00,
        duration: '3-4 hours',
        notes: 'Bring wig for installation - Body Wave 22"',
        created_at: new Date().toISOString()
      }
    ];

    // Create sample appointments
    for (const appointment of sampleAppointments) {
      await addDoc(collection(db, 'appointments'), appointment);
    }

    console.log('✅ Sample data created successfully');
  } catch (error: any) {
    console.error('❌ Error creating sample data:', error);
  }
};