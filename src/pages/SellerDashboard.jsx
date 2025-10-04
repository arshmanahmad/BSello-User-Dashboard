import React, { useState, useEffect } from 'react';
import { accountApi, dealApi } from '../services/sellerPanelApi';
import AccountList from '../components/seller/AccountList';
import DealManagement from '../components/seller/DealManagement';
import DashboardStats from '../components/seller/DashboardStats';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'accounts', name: 'Account Management', icon: '📊' },
    { id: 'deals', name: 'Deal Management', icon: '🤝' },
    { id: 'stats', name: 'Dashboard Stats', icon: '📈' },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setError(null);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="w-full px-8 lg:px-16">
          <div className="flex justify-between items-center py-10">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Seller Dashboard</h1>
              <p className="text-xl text-gray-600">Manage your accounts, deals, and sales performance</p>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-right">
                <p className="text-lg text-gray-500">Welcome back,</p>
                <p className="text-2xl font-semibold text-gray-900">Seller Name</p>
              </div>
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-3xl">S</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full px-8 lg:px-16">
          <nav className="flex space-x-16">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-8 px-4 border-b-4 font-bold text-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-4 text-2xl">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-8 lg:px-16 py-16">
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
    </div>
  );
};

export default SellerDashboard;
