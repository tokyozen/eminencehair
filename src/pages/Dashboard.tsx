import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Package, 
  Heart, 
  User, 
  Settings, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Star,
  Eye,
  Download,
  MessageCircle,
  Gift,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Plus,
  Filter,
  Search,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getCustomerAppointments, 
  getCustomerOrders, 
  getCustomerWishlist,
  Appointment,
  Order,
  WishlistItem
} from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, customer, signOut, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dashboard useEffect - Auth state:', { 
      authLoading, 
      user: user?.email, 
      customer: customer?.email
    });

    // Don't do anything while auth is still loading
    if (authLoading) {
      console.log('Auth still loading, waiting...');
      return;
    }

    // If no user, redirect to login
    if (!user) {
      console.log('No user found, redirecting to login');
      navigate('/login', { replace: true });
      return;
    }

    // If we have a user but no customer data, wait a bit more
    if (user && !customer) {
      console.log('User exists but no customer data, waiting...');
      // Set a timeout to prevent infinite waiting
      const timeout = setTimeout(() => {
        if (!customer) {
          console.log('Customer data timeout, redirecting to login');
          navigate('/login', { replace: true });
        }
      }, 5000);
      
      return () => clearTimeout(timeout);
    }

    // If we have both user and customer, load dashboard data
    if (user && customer) {
      console.log('Both user and customer available, loading dashboard data');
      loadDashboardData();
    }
  }, [user, customer, authLoading, navigate]);

  const loadDashboardData = async () => {
    if (!customer) {
      console.log('No customer data available for loading dashboard');
      return;
    }
    
    try {
      setLoading(true);
      console.log('Loading dashboard data for customer:', customer.email);
      
      const [appointmentsData, ordersData, wishlistData] = await Promise.all([
        getCustomerAppointments(customer.id),
        getCustomerOrders(customer.id),
        getCustomerWishlist(customer.id)
      ]);

      console.log('Dashboard data loaded successfully:', {
        appointments: appointmentsData.length,
        orders: ordersData.length,
        wishlist: wishlistData.length
      });

      setAppointments(appointmentsData);
      setOrders(ordersData);
      setWishlistItems(wishlistData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-soft-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted-coral border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-warm-beige">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show loading while dashboard data is loading (only if we have customer)
  if (customer && loading) {
    return (
      <div className="min-h-screen bg-soft-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted-coral border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-warm-beige">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error if we have user but no customer data after loading
  if (user && !customer && !authLoading) {
    return (
      <div className="min-h-screen bg-soft-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-warm-beige mb-2">Unable to Load Account Data</h2>
          <p className="text-gray-300 mb-6">There was an issue loading your customer information.</p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Retry
            </button>
            <button 
              onClick={() => navigate('/login', { replace: true })} 
              className="btn-secondary"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If we don't have customer data, show loading or redirect
  if (!customer) {
    return (
      <div className="min-h-screen bg-soft-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted-coral border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-warm-beige">Loading...</p>
        </div>
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.appointment_date) >= new Date() && apt.status !== 'cancelled'
  );
  
  const pastAppointments = appointments.filter(apt => 
    new Date(apt.appointment_date) < new Date() || apt.status === 'completed'
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="w-4 h-4" /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <Settings className="w-4 h-4" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'completed': return 'text-muted-coral bg-muted-coral/20';
      case 'cancelled': return 'text-red-400 bg-red-400/20';
      case 'delivered': return 'text-green-400 bg-green-400/20';
      case 'processing': return 'text-blue-400 bg-blue-400/20';
      case 'shipped': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card bg-gradient-to-br from-muted-coral/10 to-golden-yellow/10 border-2 border-muted-coral border-opacity-30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-warm-beige mb-2">
              Welcome back, {customer.first_name}! 👋
            </h2>
            <p className="text-gray-300">
              Member since {new Date(customer.member_since).toLocaleDateString()} • {customer.loyalty_points} loyalty points
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button 
              onClick={() => navigate('/book')}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <Calendar className="w-8 h-8 text-muted-coral mx-auto mb-3" />
          <div className="text-2xl font-bold text-warm-beige mb-1">{upcomingAppointments.length}</div>
          <div className="text-gray-300 text-sm">Upcoming Appointments</div>
        </div>
        <div className="card text-center">
          <Package className="w-8 h-8 text-golden-yellow mx-auto mb-3" />
          <div className="text-2xl font-bold text-warm-beige mb-1">{customer.total_orders}</div>
          <div className="text-gray-300 text-sm">Total Orders</div>
        </div>
        <div className="card text-center">
          <CreditCard className="w-8 h-8 text-muted-coral mx-auto mb-3" />
          <div className="text-2xl font-bold text-warm-beige mb-1">${customer.total_spent}</div>
          <div className="text-gray-300 text-sm">Total Spent</div>
        </div>
        <div className="card text-center">
          <Star className="w-8 h-8 text-golden-yellow mx-auto mb-3" />
          <div className="text-2xl font-bold text-warm-beige mb-1">{customer.loyalty_points}</div>
          <div className="text-gray-300 text-sm">Loyalty Points</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-warm-beige flex items-center">
              <Calendar className="w-5 h-5 text-muted-coral mr-2" />
              Upcoming Appointments
            </h3>
            <button 
              onClick={() => setActiveTab('appointments')}
              className="text-muted-coral hover:text-burnt-orange text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.slice(0, 2).map((appointment) => (
              <div key={appointment.id} className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-warm-beige">{appointment.service_name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                  </div>
                  <div>${appointment.price} • {appointment.duration}</div>
                </div>
              </div>
            ))}
            {upcomingAppointments.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming appointments</p>
                <button 
                  onClick={() => navigate('/book')}
                  className="btn-primary mt-3"
                >
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-warm-beige flex items-center">
              <Package className="w-5 h-5 text-golden-yellow mr-2" />
              Recent Orders
            </h3>
            <button 
              onClick={() => setActiveTab('orders')}
              className="text-muted-coral hover:text-burnt-orange text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {orders.slice(0, 2).map((order) => (
              <div key={order.id} className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-warm-beige">Order {order.order_number}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  <div>{new Date(order.order_date).toLocaleDateString()}</div>
                  <div className="font-medium text-muted-coral">${order.total_amount}</div>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No orders yet</p>
                <button 
                  onClick={() => navigate('/collection')}
                  className="btn-primary mt-3"
                >
                  Shop Collection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-warm-beige mb-4 sm:mb-0">My Appointments</h2>
        <button 
          onClick={() => navigate('/book')}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Book New Appointment
        </button>
      </div>

      {appointments.length === 0 && (
        <div className="card text-center py-12">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
          <h3 className="text-xl font-semibold text-warm-beige mb-2">No Appointments Yet</h3>
          <p className="text-gray-300 mb-6">Book your first appointment to get started with our services.</p>
          <button 
            onClick={() => navigate('/book')}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Book Your First Appointment
          </button>
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-warm-beige mb-4 sm:mb-0">Order History</h2>
      </div>

      {orders.length === 0 && (
        <div className="card text-center py-12">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
          <h3 className="text-xl font-semibold text-warm-beige mb-2">No Orders Yet</h3>
          <p className="text-gray-300 mb-6">Start shopping to see your order history here.</p>
          <button 
            onClick={() => navigate('/collection')}
            className="btn-primary"
          >
            <Package className="w-4 h-4 mr-2" />
            Shop Our Collection
          </button>
        </div>
      )}
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-warm-beige mb-4 sm:mb-0">My Wishlist</h2>
        <p className="text-gray-300">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
      </div>

      {wishlistItems.length === 0 && (
        <div className="card text-center py-12">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
          <h3 className="text-xl font-semibold text-warm-beige mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-300 mb-6">Save items you love to keep track of them and get notified when they're back in stock.</p>
          <button 
            onClick={() => navigate('/collection')}
            className="btn-primary"
          >
            <Heart className="w-4 h-4 mr-2" />
            Browse Products
          </button>
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-warm-beige">Profile Settings</h2>

      {/* Personal Information */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-warm-beige">Personal Information</h3>
          <button className="btn-secondary text-sm py-2 px-4">
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-warm-beige">First Name</label>
            <input
              type="text"
              value={customer.first_name}
              className="input-field"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-warm-beige">Last Name</label>
            <input
              type="text"
              value={customer.last_name}
              className="input-field"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-warm-beige">Email</label>
            <input
              type="email"
              value={customer.email}
              className="input-field"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-warm-beige">Phone</label>
            <input
              type="tel"
              value={customer.phone || ''}
              className="input-field"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Loyalty Program */}
      <div className="card bg-gradient-to-br from-muted-coral/10 to-golden-yellow/10 border-2 border-muted-coral border-opacity-30">
        <h3 className="text-xl font-semibold text-warm-beige mb-6 flex items-center">
          <Gift className="w-5 h-5 text-golden-yellow mr-2" />
          Loyalty Program
        </h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-muted-coral mb-2">{customer.loyalty_points}</div>
            <div className="text-gray-300 text-sm">Current Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-golden-yellow mb-2">{Math.max(0, 200 - customer.loyalty_points)}</div>
            <div className="text-gray-300 text-sm">Points to Next Reward</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-muted-coral mb-2">$15</div>
            <div className="text-gray-300 text-sm">Reward Value</div>
          </div>
        </div>
        <div className="mt-6">
          <div className="bg-gray-800 bg-opacity-50 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-muted-coral to-golden-yellow h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (customer.loyalty_points / 200) * 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300 text-center">
            Earn 1 point for every $1 spent • 200 points = $15 reward
          </p>
        </div>
      </div>

      {/* Sign Out */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-warm-beige">Sign Out</h4>
            <p className="text-sm text-gray-300">Sign out of your account</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="btn-secondary text-sm py-2 px-4 flex items-center"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'appointments': return renderAppointments();
      case 'orders': return renderOrders();
      case 'wishlist': return renderWishlist();
      case 'profile': return renderProfile();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-soft-black">
      {/* Header */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-slider2-background-img.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-90"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-warm-beige drop-shadow-lg">
              Customer Dashboard
            </h1>
            <p className="text-lg text-warm-beige max-w-2xl mx-auto drop-shadow-lg">
              Manage your appointments, track orders, and access your account information
            </p>
          </div>
        </div>
      </section>

      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="card sticky top-8">
                <div className="text-center mb-6 pb-6 border-b border-gray-700">
                  <div className="w-16 h-16 bg-gradient-to-br from-muted-coral to-golden-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-warm-beige">{customer.first_name} {customer.last_name}</h3>
                  <p className="text-sm text-gray-300">Member since {new Date(customer.member_since).toLocaleDateString()}</p>
                </div>
                
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-muted-coral text-white'
                          : 'text-gray-300 hover:text-warm-beige hover:bg-gray-800 hover:bg-opacity-50'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;