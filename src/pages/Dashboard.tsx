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
} from '../lib/supabase';
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
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user && customer) {
      loadDashboardData();
    }
  }, [user, customer, authLoading, navigate]);

  const loadDashboardData = async () => {
    if (!customer) return;
    
    try {
      setLoading(true);
      const [appointmentsData, ordersData, wishlistData] = await Promise.all([
        getCustomerAppointments(customer.id),
        getCustomerOrders(customer.id),
        getCustomerWishlist(customer.id)
      ]);

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
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-soft-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted-coral border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-warm-beige">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-soft-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-warm-beige mb-4">Unable to load customer data</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Return to Login
          </button>
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

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-warm-beige mb-6 flex items-center">
            <Clock className="w-5 h-5 text-muted-coral mr-2" />
            Upcoming Appointments
          </h3>
          <div className="space-y-6">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-warm-beige mb-2">{appointment.service_name}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(appointment.appointment_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {appointment.appointment_time}
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-1" />
                        ${appointment.price}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <a 
                      href="tel:+12048258526"
                      className="btn-secondary text-sm py-2 px-4"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </a>
                  </div>
                </div>
                {appointment.notes && (
                  <div className="bg-golden-yellow bg-opacity-10 rounded-lg p-3 border border-golden-yellow border-opacity-30">
                    <p className="text-sm text-golden-yellow">
                      <strong>Notes:</strong> {appointment.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-warm-beige mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
            Past Appointments
          </h3>
          <div className="space-y-6">
            {pastAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-warm-beige mb-2">{appointment.service_name}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(appointment.appointment_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-1" />
                        ${appointment.price}
                      </div>
                      {appointment.rating && (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < appointment.rating! ? 'text-golden-yellow fill-current' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <button 
                      onClick={() => navigate('/book')}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      Book Again
                    </button>
                  </div>
                </div>
                {appointment.review && (
                  <div className="bg-muted-coral bg-opacity-10 rounded-lg p-3 border border-muted-coral border-opacity-30">
                    <p className="text-sm text-gray-300">
                      <strong className="text-muted-coral">Your Review:</strong> {appointment.review}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

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
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="input-field pl-10 w-64"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field w-32"
          >
            <option value="all">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="card">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-warm-beige mb-2">Order {order.order_number}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <div>Placed on {new Date(order.order_date).toLocaleDateString()}</div>
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-1" />
                      {order.order_items?.length || 0} item{(order.order_items?.length || 0) !== 1 ? 's' : ''}
                    </div>
                    <div className="font-semibold text-muted-coral">${order.total_amount}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <button className="btn-secondary text-sm py-2 px-4">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  <button className="btn-primary text-sm py-2 px-4">
                    <Download className="w-4 h-4 mr-1" />
                    Invoice
                  </button>
                </div>
              </div>

              {order.order_items && order.order_items.length > 0 && (
                <div className="space-y-3">
                  {order.order_items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-800 bg-opacity-50 rounded-lg p-4">
                      <div>
                        <h4 className="font-medium text-warm-beige">{item.product_name}</h4>
                        {item.product_length && <p className="text-sm text-gray-300">Length: {item.product_length}</p>}
                        <p className="text-sm text-gray-300">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-muted-coral font-semibold">${item.price}</div>
                    </div>
                  ))}
                </div>
              )}

              {order.tracking_number && (
                <div className="mt-4 bg-golden-yellow bg-opacity-10 rounded-lg p-3 border border-golden-yellow border-opacity-30">
                  <p className="text-sm text-golden-yellow">
                    <strong>Tracking Number:</strong> {order.tracking_number}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
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

      {wishlistItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="card group hover:scale-105 transition-transform duration-300">
              <div className="aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={item.image_url || '/placeholder-wig.jpg'}
                  alt={item.product_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-semibold text-warm-beige mb-2">{item.product_name}</h3>
              {item.product_length && <p className="text-gray-300 mb-2">Length: {item.product_length}</p>}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-muted-coral">${item.price}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.in_stock 
                    ? 'text-green-400 bg-green-400/20' 
                    : 'text-red-400 bg-red-400/20'
                }`}>
                  {item.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex space-x-2">
                <button 
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    item.in_stock 
                      ? 'bg-muted-coral hover:bg-burnt-orange text-white' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!item.in_stock}
                >
                  {item.in_stock ? 'Add to Cart' : 'Notify When Available'}
                </button>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Heart className="w-5 h-5 text-red-400 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
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

      {/* Account Security */}
      <div className="card">
        <h3 className="text-xl font-semibold text-warm-beige mb-6">Account Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-lg">
            <div>
              <h4 className="font-medium text-warm-beige">Password</h4>
              <p className="text-sm text-gray-300">Manage your account password</p>
            </div>
            <button className="btn-primary text-sm py-2 px-4">Change Password</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-lg">
            <div>
              <h4 className="font-medium text-warm-beige">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-300">Add an extra layer of security</p>
            </div>
            <button className="btn-secondary text-sm py-2 px-4">Enable</button>
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