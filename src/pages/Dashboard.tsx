import React, { useState } from 'react';
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
  Search
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - in real app this would come from API
  const userInfo = {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(204) 825-8526',
    memberSince: 'January 2024',
    totalOrders: 8,
    totalSpent: 1240,
    loyaltyPoints: 156
  };

  const upcomingAppointments = [
    {
      id: 1,
      service: 'Wig Install + Styling',
      date: '2025-01-20',
      time: '2:00 PM',
      status: 'confirmed',
      price: 80,
      duration: '3-4 hours',
      notes: 'Bring wig for installation - Body Wave 22"'
    },
    {
      id: 2,
      service: 'Basic Wig Customization',
      date: '2025-01-25',
      time: '10:00 AM',
      status: 'pending',
      price: 55,
      duration: '4-6 hours',
      notes: 'HD Lace Frontal - Bleaching and plucking'
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      service: 'Wig Install (No Styling)',
      date: '2024-12-15',
      time: '1:00 PM',
      status: 'completed',
      price: 75,
      rating: 5,
      review: 'Amazing service! The installation was perfect and looked so natural.'
    },
    {
      id: 4,
      service: 'Reinstall',
      date: '2024-11-20',
      time: '3:30 PM',
      status: 'completed',
      price: 60,
      rating: 5,
      review: 'Quick and professional service as always!'
    }
  ];

  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-12-10',
      items: [
        { name: '13x6 HD Lace Body Wave Wig', length: '22"', price: 328 },
        { name: 'Basic Wig Customization', price: 55 }
      ],
      total: 383,
      status: 'delivered',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      date: '2024-11-15',
      items: [
        { name: '13x4 HD Lace Straight Wig', length: '24"', price: 315 }
      ],
      total: 315,
      status: 'delivered',
      trackingNumber: 'TRK987654321'
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      name: '13x6 HD Lace Deep Wave Wig',
      length: '26"',
      price: 383,
      image: 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/ca7ef7cb-f5f7-4f21-be43-bd3b9c7725e9.jpg',
      inStock: true
    },
    {
      id: 2,
      name: '13x6 HD Lace Straight Wig',
      length: '30"',
      price: 438,
      image: 'https://eminenceextensions.com/old/wp-content/uploads/2025/05/4928a5b9-be1f-4d6e-9bdb-927a8f2afa9b.jpg',
      inStock: false
    }
  ];

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
              Welcome back, {userInfo.firstName}! 👋
            </h2>
            <p className="text-gray-300">
              Member since {userInfo.memberSince} • {userInfo.loyaltyPoints} loyalty points
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="btn-primary">
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
          <div className="text-2xl font-bold text-warm-beige mb-1">{userInfo.totalOrders}</div>
          <div className="text-gray-300 text-sm">Total Orders</div>
        </div>
        <div className="card text-center">
          <CreditCard className="w-8 h-8 text-muted-coral mx-auto mb-3" />
          <div className="text-2xl font-bold text-warm-beige mb-1">${userInfo.totalSpent}</div>
          <div className="text-gray-300 text-sm">Total Spent</div>
        </div>
        <div className="card text-center">
          <Star className="w-8 h-8 text-golden-yellow mx-auto mb-3" />
          <div className="text-2xl font-bold text-warm-beige mb-1">{userInfo.loyaltyPoints}</div>
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
                  <h4 className="font-medium text-warm-beige">{appointment.service}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                  </div>
                  <div>${appointment.price} • {appointment.duration}</div>
                </div>
              </div>
            ))}
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
            {orderHistory.slice(0, 2).map((order) => (
              <div key={order.id} className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-warm-beige">Order {order.id}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  <div>{new Date(order.date).toLocaleDateString()}</div>
                  <div className="font-medium text-muted-coral">${order.total}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-warm-beige mb-4 sm:mb-0">My Appointments</h2>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Book New Appointment
        </button>
      </div>

      {/* Upcoming Appointments */}
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
                  <h4 className="text-lg font-semibold text-warm-beige mb-2">{appointment.service}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {appointment.time}
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
                  <button className="btn-secondary text-sm py-2 px-4">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Contact
                  </button>
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

      {/* Past Appointments */}
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
                  <h4 className="text-lg font-semibold text-warm-beige mb-2">{appointment.service}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-1" />
                      ${appointment.price}
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < appointment.rating ? 'text-golden-yellow fill-current' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                  <button className="btn-primary text-sm py-2 px-4">
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
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {orderHistory.map((order) => (
          <div key={order.id} className="card">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-warm-beige mb-2">Order {order.id}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <div>Placed on {new Date(order.date).toLocaleDateString()}</div>
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-1" />
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </div>
                  <div className="font-semibold text-muted-coral">${order.total}</div>
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

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-800 bg-opacity-50 rounded-lg p-4">
                  <div>
                    <h4 className="font-medium text-warm-beige">{item.name}</h4>
                    {item.length && <p className="text-sm text-gray-300">Length: {item.length}</p>}
                  </div>
                  <div className="text-muted-coral font-semibold">${item.price}</div>
                </div>
              ))}
            </div>

            {order.trackingNumber && (
              <div className="mt-4 bg-golden-yellow bg-opacity-10 rounded-lg p-3 border border-golden-yellow border-opacity-30">
                <p className="text-sm text-golden-yellow">
                  <strong>Tracking Number:</strong> {order.trackingNumber}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-warm-beige mb-4 sm:mb-0">My Wishlist</h2>
        <p className="text-gray-300">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="card group hover:scale-105 transition-transform duration-300">
            <div className="aspect-square overflow-hidden rounded-lg mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-lg font-semibold text-warm-beige mb-2">{item.name}</h3>
            <p className="text-gray-300 mb-2">Length: {item.length}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-muted-coral">${item.price}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.inStock 
                  ? 'text-green-400 bg-green-400/20' 
                  : 'text-red-400 bg-red-400/20'
              }`}>
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className="flex space-x-2">
              <button 
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  item.inStock 
                    ? 'bg-muted-coral hover:bg-burnt-orange text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!item.inStock}
              >
                {item.inStock ? 'Add to Cart' : 'Notify When Available'}
              </button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-red-400 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>
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
              value={userInfo.firstName}
              className="input-field"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-warm-beige">Last Name</label>
            <input
              type="text"
              value={userInfo.lastName}
              className="input-field"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-warm-beige">Email</label>
            <input
              type="email"
              value={userInfo.email}
              className="input-field"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-warm-beige">Phone</label>
            <input
              type="tel"
              value={userInfo.phone}
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
              <p className="text-sm text-gray-300">Last updated 3 months ago</p>
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

      {/* Preferences */}
      <div className="card">
        <h3 className="text-xl font-semibold text-warm-beige mb-6">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-warm-beige">Email Notifications</h4>
              <p className="text-sm text-gray-300">Receive updates about appointments and orders</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-muted-coral"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-warm-beige">SMS Notifications</h4>
              <p className="text-sm text-gray-300">Get text reminders for appointments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-muted-coral"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-warm-beige">Marketing Emails</h4>
              <p className="text-sm text-gray-300">Receive promotional offers and updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-muted-coral"></div>
            </label>
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
            <div className="text-3xl font-bold text-muted-coral mb-2">{userInfo.loyaltyPoints}</div>
            <div className="text-gray-300 text-sm">Current Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-golden-yellow mb-2">44</div>
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
              style={{ width: `${(userInfo.loyaltyPoints / 200) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300 text-center">
            Earn 1 point for every $1 spent • 200 points = $15 reward
          </p>
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
                  <h3 className="font-semibold text-warm-beige">{userInfo.firstName} {userInfo.lastName}</h3>
                  <p className="text-sm text-gray-300">Member since {userInfo.memberSince}</p>
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