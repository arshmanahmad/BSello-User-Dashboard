import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountList from '../components/seller/AccountList';
import DealManagement from '../components/seller/DealManagement';
import DashboardStats from '../components/seller/DashboardStats';
import SellerSidebar, { navItems } from '../components/seller/SellerSidebar';
import { FiMenu, FiX } from 'react-icons/fi';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = [
    { id: 'accounts', name: 'Account Management', icon: '📊' },
    { id: 'deals', name: 'Deal Management', icon: '🤝' },
    { id: 'stats', name: 'Dashboard Stats', icon: '📈' },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setError(null);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      navigate('/login');
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'accounts':
        return <AccountList />;
      case 'deals':
        return <DealManagement />;
      case 'stats':
        return <DashboardStats />;
      default:
        return <AccountList />;
    }
  };

  const MobileDrawer = () => (
    <div className={`lg:hidden fixed inset-0 z-50 ${mobileOpen ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`absolute top-0 left-0 h-full w-80 bg-white shadow-xl border-r border-gray-200 transform transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">S</div>
            <div>
              <p className="text-sm text-gray-500">Seller</p>
              <p className="font-semibold text-gray-900">Dashboard</p>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-900">
            <FiX className="text-2xl" />
          </button>
        </div>
        <nav className="p-3 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:flex lg:min-h-screen">
        <SellerSidebar active={activeTab} onChange={handleTabChange} onLogout={handleLogout} />

        <main className="flex-1">
          {/* Header */}
          <div className="bg-white shadow-lg border-b border-gray-200">
            <div className="w-full px-4 sm:px-6 lg:px-10">
              <div className="flex justify-between items-center py-4 sm:py-6 lg:py-8">
                <div>
                  <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">Seller Dashboard</h1>
                  <p className="text-base lg:text-xl text-gray-600">Manage your accounts, deals, and sales performance</p>
                </div>
                <div className="flex items-center space-x-4 sm:space-x-6">
                  <button onClick={() => setMobileOpen(true)} className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                    <FiMenu className="text-xl" />
                  </button>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm lg:text-lg text-gray-500">Welcome back,</p>
                    <p className="text-lg lg:text-2xl font-semibold text-gray-900">Seller Name</p>
                  </div>
                  <div className="w-12 h-12 lg:w-20 lg:h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl lg:text-3xl">S</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile quick nav (small screens) */}
          <div className="lg:hidden bg-white border-b border-gray-200">
            <div className="px-4 py-3 overflow-x-auto">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                      activeTab === tab.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <MobileDrawer />

          {/* Main Content */}
          <div className="w-full px-6 lg:px-10 py-8 lg:py-12">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="loader"></div>
              </div>
            ) : (
              renderActiveTab()
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
