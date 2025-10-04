import React, { useState } from 'react';
import { lockingApi } from '../../services/sellerPanelApi';

const LockModal = ({ account, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [lockData, setLockData] = useState({
    buyerId: '',
    reason: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!lockData.buyerId.trim() || !lockData.reason.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const response = await lockingApi.lockAccount(account.accountId, lockData);
      
      if (response.success) {
        onSuccess();
        alert('Account locked successfully');
      } else {
        alert(response.message || 'Failed to lock account');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred while locking the account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Lock Account
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Account to lock:</p>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-medium text-gray-900">{account.accountName}</p>
              <p className="text-sm text-gray-600">{account.accountType}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="buyerId" className="block text-sm font-medium text-gray-700 mb-2">
                Buyer ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="buyerId"
                value={lockData.buyerId}
                onChange={(e) => setLockData({ ...lockData, buyerId: e.target.value })}
                placeholder="Enter buyer's user ID"
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Locking <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reason"
                value={lockData.reason}
                onChange={(e) => setLockData({ ...lockData, reason: e.target.value })}
                placeholder="e.g., Deal in progress, Payment pending, etc."
                rows={3}
                className="input-field"
                required
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Locking an account will prevent it from being sold to other buyers. Make sure you have the correct buyer ID and a valid reason.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Locking...' : '🔒 Lock Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LockModal;
