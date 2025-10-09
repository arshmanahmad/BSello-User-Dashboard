import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiBell } from 'react-icons/fi';
import BuyerSidebar, { buyerNavItems } from '../components/buyer/BuyerSidebar';
import BuyerPayment from './BuyerPayment';
import TransactionHistory from '../components/buyer/TransactionHistory';
import ProfileManagement from '../components/buyer/ProfileManagement';
import FundManagement from '../components/buyer/FundManagement';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('payment');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
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
      case 'payment':
        return <BuyerPayment />;
      case 'transactions':
        return <TransactionHistory />;
      case 'profile':
        return <ProfileManagement />;
      case 'funds':
        return <FundManagement />;
      default:
        return <BuyerPayment />;
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">B</div>
            <div>
              <p className="text-sm text-gray-500">Buyer</p>
              <p className="font-semibold text-gray-900">Dashboard</p>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-gray-900">
            <FiX className="text-2xl" />
          </button>
        </div>
        <nav className="p-3 space-y-2">
          {buyerNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
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
        <BuyerSidebar 
          active={activeTab} 
          onChange={handleTabChange} 
          onLogout={handleLogout}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-white to-blue-50 shadow-xl border-b border-gray-200">
            <div className="w-full px-6 lg:px-12">
              <div className="flex justify-between items-center py-8 lg:py-12">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-2xl">B</span>
                    </div>
                    <div>
                      <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
                        Buyer Dashboard
                      </h1>
                      <p className="text-lg lg:text-xl text-gray-600 mt-2">Manage your purchases, funds, and account</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => navigate('/notifications')}
                    className="relative p-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                  >
                    <FiBell className="text-xl" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      2
                    </span>
                  </button>
                  <button onClick={() => setMobileOpen(true)} className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm">
                    <FiMenu className="text-xl" />
                  </button>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-500 mb-1">Welcome back,</p>
                    <p className="text-xl font-semibold text-gray-900">Buyer Name</p>
                    <p className="text-sm text-blue-600 font-medium">Online</p>
                  </div>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-blue-100">
                    <span className="text-white font-bold text-2xl lg:text-3xl">B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile quick nav (small screens) */}
          <div className="lg:hidden bg-white border-b border-gray-200">
            <div className="px-4 py-4 overflow-x-auto">
              <div className="flex gap-3">
                {buyerNavItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-6 py-3 rounded-xl text-base font-semibold whitespace-nowrap transition-all duration-200 text-left ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <MobileDrawer />

          {/* Main Content */}
          <div className="w-full px-6 lg:px-12 py-8 lg:py-16">
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
