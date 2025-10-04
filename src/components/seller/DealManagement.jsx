import React, { useState, useEffect } from 'react';
import { dealApi } from '../../services/sellerPanelApi';
import CredentialModal from './CredentialModal';

const DealManagement = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    status: '',
    page: 1,
    limit: 10
  });
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showCredentialModal, setShowCredentialModal] = useState(false);

  useEffect(() => {
    fetchDeals();
  }, [filters]);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dealApi.getDeals(filters);
      
      if (response.success) {
        setDeals(response.data);
        setPagination(response.pagination);
      } else {
        setError('Failed to fetch deals');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching deals');
    } finally {
      setLoading(false);
    }
  };

  const handleShareCredentials = (deal) => {
    setSelectedDeal(deal);
    setShowCredentialModal(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'payment_completed', label: 'Payment Completed' },
    { value: 'credentials_shared', label: 'Credentials Shared' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'disputed', label: 'Disputed' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'payment_completed':
        return 'bg-blue-100 text-blue-800';
      case 'credentials_shared':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'disputed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'payment_completed':
        return '💳';
      case 'credentials_shared':
        return '🔑';
      case 'completed':
        return '✅';
      case 'cancelled':
        return '❌';
      case 'disputed':
        return '⚠️';
      default:
        return '❓';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 w-full">
      {/* Header and Filters */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Deal Management</h2>
            <p className="text-xl text-gray-600">Manage your sales and share account credentials</p>
          </div>
          <div className="mt-6 lg:mt-0">
            <span className="text-xl font-bold text-gray-700 bg-gray-100 px-6 py-3 rounded-xl">
              Total: {pagination.totalDeals || 0} deals
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <label className="block text-xl font-bold text-gray-700 mb-4">
              Filter by Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange({ status: e.target.value })}
              className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:w-80">
            <label className="block text-xl font-bold text-gray-700 mb-4">
              Items per page
            </label>
            <select
              value={filters.limit}
              onChange={(e) => handleFilterChange({ limit: parseInt(e.target.value) })}
              className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deals List */}
      {deals.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-16 text-center">
          <div className="text-gray-400 text-8xl mb-6">🤝</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No deals found</h3>
          <p className="text-xl text-gray-500">You don't have any deals yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {deal.accountName}
                    </h3>
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(deal.status)}`}>
                      <span className="mr-2 text-lg">{getStatusIcon(deal.status)}</span>
                      {deal.status.replace('_', ' ').charAt(0).toUpperCase() + deal.status.replace('_', ' ').slice(1)}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 mb-4">
                    {deal.accountType} • Deal ID: {deal.dealId}
                  </p>
                  <div className="text-4xl font-bold text-green-600">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(deal.finalPrice)}
                  </div>
                </div>
              </div>

              {/* Deal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-500">Buyer:</span>
                  <div className="font-medium text-gray-900">{deal.buyerId.fullName}</div>
                  <div className="text-sm text-gray-600">{deal.buyerId.email}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Payment Method:</span>
                  <div className="font-medium text-gray-900 capitalize">{deal.paymentMethod}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Deal Created:</span>
                  <div className="font-medium text-gray-900">
                    {new Date(deal.dealCreatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Payment Completed:</span>
                  <div className="font-medium text-gray-900">
                    {deal.paymentCompletedAt ? new Date(deal.paymentCompletedAt).toLocaleDateString() : 'Pending'}
                  </div>
                </div>
              </div>

              {/* Credentials Status */}
              {deal.accountCredentials && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center">
                    <span className="text-green-600 text-sm font-medium">Credentials Shared</span>
                    <span className="ml-2 text-green-800 text-sm">
                      on {new Date(deal.accountCredentials.sharedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {deal.status === 'payment_completed' && !deal.accountCredentials && (
                  <button
                    onClick={() => handleShareCredentials(deal)}
                    className="btn-primary text-sm py-2 px-4"
                  >
                    🔑 Share Credentials
                  </button>
                )}
                
                {deal.status === 'credentials_shared' && (
                  <button
                    onClick={() => handleShareCredentials(deal)}
                    className="btn-secondary text-sm py-2 px-4"
                  >
                    👁️ View Credentials
                  </button>
                )}

                <button
                  onClick={() => window.open(`/deals/${deal.dealId}`, '_blank')}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  📄 View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((pagination.currentPage - 1) * filters.limit) + 1} to{' '}
              {Math.min(pagination.currentPage * filters.limit, pagination.totalDeals)} of{' '}
              {pagination.totalDeals} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Credential Modal */}
      {showCredentialModal && selectedDeal && (
        <CredentialModal
          deal={selectedDeal}
          onClose={() => {
            setShowCredentialModal(false);
            setSelectedDeal(null);
          }}
          onSuccess={() => {
            fetchDeals();
            setShowCredentialModal(false);
            setSelectedDeal(null);
          }}
        />
      )}
    </div>
  );
};

export default DealManagement;
