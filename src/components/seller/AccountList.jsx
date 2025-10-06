import React, { useState, useEffect } from 'react';
import { accountApi, biddingApi, lockingApi } from '../../services/sellerPanelApi';
import { FiBarChart2 } from 'react-icons/fi';
import AccountCard from './AccountCard';
import BiddingModal from './BiddingModal';
import LockModal from './LockModal';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    status: '',
    page: 1,
    limit: 10
  });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showBiddingModal, setShowBiddingModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, [filters]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await accountApi.getAccounts(filters);
      
      if (response.success) {
        setAccounts(response.data);
        setPagination(response.pagination);
      } else {
        setError('Failed to fetch accounts');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAccount = async (accountId) => {
    if (!window.confirm('Are you sure you want to remove this account?')) {
      return;
    }

    try {
      const response = await accountApi.removeAccount(accountId);
      if (response.success) {
        setAccounts(accounts.filter(account => account.accountId !== accountId));
        // Show success message
        alert('Account removed successfully');
      } else {
        alert(response.message || 'Failed to remove account');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred while removing the account');
    }
  };

  const handleBiddingToggle = (account) => {
    setSelectedAccount(account);
    setShowBiddingModal(true);
  };

  const handleLockAccount = (account) => {
    setSelectedAccount(account);
    setShowLockModal(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'locked', label: 'Locked' },
    { value: 'sold', label: 'Sold' },
    { value: 'removed', label: 'Removed' }
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
      {/* Header and Filters */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Account Management</h2>
            <p className="text-xl text-gray-600">Manage your social media accounts and listings</p>
          </div>
          <div className="mt-6 lg:mt-0">
            <span className="text-xl font-bold text-gray-700 bg-gray-100 px-6 py-3 rounded-xl">
              Total: {pagination.totalAccounts || 0} accounts
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

      {/* Accounts Grid */}
      {accounts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-16 text-center">
          <div className="text-gray-400 text-8xl mb-6 flex items-center justify-center">
            <FiBarChart2 />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No accounts found</h3>
          <p className="text-xl text-gray-500">You haven't listed any accounts yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {accounts.map((account) => (
            <AccountCard
              key={account.accountId}
              account={account}
              onRemove={() => handleRemoveAccount(account.accountId)}
              onBiddingToggle={() => handleBiddingToggle(account)}
              onLock={() => handleLockAccount(account)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-700">
              Showing {((pagination.currentPage - 1) * filters.limit) + 1} to{' '}
              {Math.min(pagination.currentPage * filters.limit, pagination.totalAccounts)} of{' '}
              {pagination.totalAccounts} results
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
                className="px-6 py-3 text-lg font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                className="px-6 py-3 text-lg font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showBiddingModal && selectedAccount && (
        <BiddingModal
          account={selectedAccount}
          onClose={() => {
            setShowBiddingModal(false);
            setSelectedAccount(null);
          }}
          onSuccess={() => {
            fetchAccounts();
            setShowBiddingModal(false);
            setSelectedAccount(null);
          }}
        />
      )}

      {showLockModal && selectedAccount && (
        <LockModal
          account={selectedAccount}
          onClose={() => {
            setShowLockModal(false);
            setSelectedAccount(null);
          }}
          onSuccess={() => {
            fetchAccounts();
            setShowLockModal(false);
            setSelectedAccount(null);
          }}
        />
      )}
    </div>
  );
};

export default AccountList;
