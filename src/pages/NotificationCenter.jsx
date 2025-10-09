import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiBell, 
  FiCheckCircle, 
  FiInfo, 
  FiAlertTriangle, 
  FiAlertCircle,
  FiMail,
  FiMessageSquare,
  FiClock,
  FiX,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';

const NotificationCenter = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Mock notifications - in real app, these would come from API
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Deal Confirmed',
        message: 'Your bid has been accepted by the seller! The account is now locked and ready for transfer.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        read: false,
        action: {
          text: 'View Deal',
          url: '/deal-completion',
          data: { dealId: 'DEAL-ABC123-XYZ789' }
        },
        details: {
          account: 'TikTok @example_user',
          price: '$500',
          seller: 'John Seller'
        }
      },
      {
        id: 2,
        type: 'info',
        title: 'Account Credentials Received',
        message: 'Seller has shared the account credentials. Please verify within 5 minutes.',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        read: false,
        action: {
          text: 'Verify Now',
          url: '/deal-completion',
          data: { dealId: 'DEAL-ABC123-XYZ789' }
        },
        details: {
          platform: 'TikTok',
          timeLimit: '5 minutes',
          dealId: 'DEAL-ABC123-XYZ789'
        }
      },
      {
        id: 3,
        type: 'warning',
        title: 'Verification Time Running Out',
        message: 'You have 2 minutes left to verify the account. Please complete verification soon.',
        timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 minutes ago
        read: true,
        action: {
          text: 'Verify Now',
          url: '/deal-completion',
          data: { dealId: 'DEAL-ABC123-XYZ789' }
        },
        details: {
          timeRemaining: '2 minutes',
          dealId: 'DEAL-ABC123-XYZ789'
        }
      },
      {
        id: 4,
        type: 'success',
        title: 'Deal Completed Successfully',
        message: 'The account transfer has been completed. Thank you for using our platform!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        read: true,
        action: {
          text: 'View Details',
          url: '/deal-completion',
          data: { dealId: 'DEAL-DEF456-UVW123' }
        },
        details: {
          account: 'YouTube @channel_name',
          price: '$750',
          rating: 5
        }
      },
      {
        id: 5,
        type: 'info',
        title: 'New Bid Received',
        message: 'A new buyer has placed a bid on your TikTok account.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
        read: true,
        action: {
          text: 'View Bids',
          url: '/seller-dashboard',
          data: { tab: 'deals' }
        },
        details: {
          account: 'TikTok @my_account',
          bidAmount: '$450',
          buyer: 'Alice Buyer'
        }
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-green-500" />;
      case 'info':
        return <FiInfo className="text-blue-500" />;
      case 'warning':
        return <FiAlertTriangle className="text-yellow-500" />;
      case 'error':
        return <FiAlertCircle className="text-red-500" />;
      default:
        return <FiBell className="text-gray-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    setSelectedNotification(notification);
    
    if (notification.action) {
      // Navigate to the action URL with data
      navigate(notification.action.url, {
        state: notification.action.data
      });
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Notification Center</h1>
                <p className="text-sm text-gray-500">{notifications.length} total notifications</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {unreadCount > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-red-600">{unreadCount} unread</span>
                </div>
              )}
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Notifications List */}
          <div className="lg:col-span-3">
            {/* Filter Tabs */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All ({notifications.length})
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'unread'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Unread ({unreadCount})
                </button>
                <button
                  onClick={() => setFilter('read')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === 'read'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Read ({notifications.length - unreadCount})
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
                  <FiBell className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-500">
                    {filter === 'unread' 
                      ? "You're all caught up! No unread notifications."
                      : filter === 'read'
                      ? "No read notifications to show."
                      : "You don't have any notifications yet."
                    }
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-6 cursor-pointer transition-all duration-200 hover:shadow-2xl ${
                      !notification.read ? 'ring-2 ring-blue-100' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{notification.message}</p>
                            
                            {notification.details && (
                              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  {Object.entries(notification.details).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="text-gray-500 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                                      </span>
                                      <span className="font-medium text-gray-900">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <FiClock />
                                  <span>{formatTimeAgo(notification.timestamp)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <FiMail />
                                  <span>{notification.type}</span>
                                </div>
                              </div>
                              
                              {notification.action && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNotificationClick(notification);
                                  }}
                                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                                >
                                  {notification.action.text}
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <FiX />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-semibold">{notifications.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Unread:</span>
                  <span className="font-semibold text-red-600">{unreadCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Read:</span>
                  <span className="font-semibold text-green-600">{notifications.length - unreadCount}</span>
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">By Type</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    <span className="text-sm">Success</span>
                  </div>
                  <span className="text-sm font-medium">
                    {notifications.filter(n => n.type === 'success').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiInfo className="text-blue-500" />
                    <span className="text-sm">Info</span>
                  </div>
                  <span className="text-sm font-medium">
                    {notifications.filter(n => n.type === 'info').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiAlertTriangle className="text-yellow-500" />
                    <span className="text-sm">Warning</span>
                  </div>
                  <span className="text-sm font-medium">
                    {notifications.filter(n => n.type === 'warning').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiAlertCircle className="text-red-500" />
                    <span className="text-sm">Error</span>
                  </div>
                  <span className="text-sm font-medium">
                    {notifications.filter(n => n.type === 'error').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/seller-dashboard')}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FiMessageSquare className="text-blue-500" />
                    <span className="text-sm font-medium">Go to Dashboard</span>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/buyer-dashboard')}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FiMessageSquare className="text-green-500" />
                    <span className="text-sm font-medium">Buyer Dashboard</span>
                  </div>
                </button>
                <button
                  onClick={markAllAsRead}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-gray-500" />
                    <span className="text-sm font-medium">Mark All Read</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
