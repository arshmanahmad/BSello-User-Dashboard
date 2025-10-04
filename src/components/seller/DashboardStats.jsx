import React, { useState, useEffect } from 'react';
import { accountApi, dealApi } from '../../services/sellerPanelApi';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalAccounts: 0,
    activeAccounts: 0,
    lockedAccounts: 0,
    soldAccounts: 0,
    totalDeals: 0,
    pendingDeals: 0,
    completedDeals: 0,
    totalRevenue: 0,
    monthlyRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch accounts data
      const accountsResponse = await accountApi.getAccounts({ limit: 1000 });
      const accounts = accountsResponse.success ? accountsResponse.data : [];

      // Fetch deals data
      const dealsResponse = await dealApi.getDeals({ limit: 1000 });
      const deals = dealsResponse.success ? dealsResponse.data : [];

      // Calculate stats
      const totalAccounts = accounts.length;
      const activeAccounts = accounts.filter(acc => acc.status === 'active').length;
      const lockedAccounts = accounts.filter(acc => acc.status === 'locked').length;
      const soldAccounts = accounts.filter(acc => acc.status === 'sold').length;

      const totalDeals = deals.length;
      const pendingDeals = deals.filter(deal => deal.status === 'pending').length;
      const completedDeals = deals.filter(deal => deal.status === 'completed').length;

      const totalRevenue = deals
        .filter(deal => deal.status === 'completed' || deal.status === 'credentials_shared')
        .reduce((sum, deal) => sum + (deal.finalPrice || 0), 0);

      // Calculate monthly revenue (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const monthlyRevenue = deals
        .filter(deal => {
          const dealDate = new Date(deal.paymentCompletedAt || deal.createdAt);
          return dealDate >= thirtyDaysAgo && 
                 (deal.status === 'completed' || deal.status === 'credentials_shared');
        })
        .reduce((sum, deal) => sum + (deal.finalPrice || 0), 0);

      setStats({
        totalAccounts,
        activeAccounts,
        lockedAccounts,
        soldAccounts,
        totalDeals,
        pendingDeals,
        completedDeals,
        totalRevenue,
        monthlyRevenue
      });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching stats');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const statCards = [
    {
      title: 'Total Accounts',
      value: stats.totalAccounts,
      icon: '📊',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Accounts',
      value: stats.activeAccounts,
      icon: '✅',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Locked Accounts',
      value: stats.lockedAccounts,
      icon: '🔒',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Sold Accounts',
      value: stats.soldAccounts,
      icon: '💰',
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Deals',
      value: stats.totalDeals,
      icon: '🤝',
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600'
    },
    {
      title: 'Pending Deals',
      value: stats.pendingDeals,
      icon: '⏳',
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      title: 'Completed Deals',
      value: stats.completedDeals,
      icon: '🎉',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: '💵',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(stats.monthlyRevenue),
      icon: '📈',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 w-full">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dashboard Statistics</h2>
            <p className="text-xl text-gray-600">Overview of your selling performance</p>
          </div>
          <button
            onClick={fetchStats}
            className="btn-secondary text-lg py-4 px-8"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className={`flex-shrink-0 w-20 h-20 ${card.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <span className="text-4xl">{card.icon}</span>
              </div>
              <div className="ml-8 flex-1">
                <p className="text-lg font-bold text-gray-500 mb-3">{card.title}</p>
                <p className={`text-4xl font-bold ${card.textColor}`}>
                  {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Charts Placeholder */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Revenue Overview</h3>
          <div className="h-96 bg-gray-50 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-8xl mb-6">📊</div>
              <p className="text-xl text-gray-500 mb-3">Revenue chart would go here</p>
              <p className="text-lg text-gray-400">Integration with chart library needed</p>
            </div>
          </div>
        </div>

        {/* Account Status Chart */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Account Status Distribution</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded-lg mr-4"></div>
                <span className="text-lg font-semibold text-gray-600">Active</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{stats.activeAccounts}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-lg mr-4"></div>
                <span className="text-lg font-semibold text-gray-600">Locked</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{stats.lockedAccounts}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-purple-500 rounded-lg mr-4"></div>
                <span className="text-lg font-semibold text-gray-600">Sold</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{stats.soldAccounts}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-500 rounded-lg mr-4"></div>
                <span className="text-lg font-semibold text-gray-600">Removed</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{stats.totalAccounts - stats.activeAccounts - stats.lockedAccounts - stats.soldAccounts}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <button className="btn-primary text-center py-6 text-xl font-bold">
            📊 View All Accounts
          </button>
          <button className="btn-secondary text-center py-6 text-xl font-bold">
            🤝 View All Deals
          </button>
          <button className="btn-secondary text-center py-6 text-xl font-bold">
            📈 View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
