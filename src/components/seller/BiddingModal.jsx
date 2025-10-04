import React, { useState, useEffect } from 'react';
import { biddingApi } from '../../services/sellerPanelApi';

const BiddingModal = ({ account, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [bids, setBids] = useState([]);
  const [biddingData, setBiddingData] = useState({
    biddingEnabled: account.biddingEnabled || false,
    bidEndDate: account.bidEndDate ? new Date(account.bidEndDate).toISOString().slice(0, 16) : ''
  });

  useEffect(() => {
    if (account.biddingEnabled) {
      fetchBids();
    }
  }, [account.accountId]);

  const fetchBids = async () => {
    try {
      const response = await biddingApi.getBids(account.accountId);
      if (response.success) {
        setBids(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch bids:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await biddingApi.updateBidding(account.accountId, biddingData);
      
      if (response.success) {
        onSuccess();
        alert('Bidding settings updated successfully');
      } else {
        alert(response.message || 'Failed to update bidding settings');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred while updating bidding settings');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBid = async (bidId) => {
    if (!window.confirm('Are you sure you want to accept this bid? This will lock the account.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await biddingApi.acceptBid(account.accountId, bidId);
      
      if (response.success) {
        onSuccess();
        alert('Bid accepted and account locked successfully');
      } else {
        alert(response.message || 'Failed to accept bid');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred while accepting the bid');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Bidding Management - {account.accountName}
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
          {/* Bidding Settings Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="biddingEnabled"
                  checked={biddingData.biddingEnabled}
                  onChange={(e) => setBiddingData({
                    ...biddingData,
                    biddingEnabled: e.target.checked
                  })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="biddingEnabled" className="ml-2 text-sm font-medium text-gray-700">
                  Enable bidding for this account
                </label>
              </div>

              {biddingData.biddingEnabled && (
                <div>
                  <label htmlFor="bidEndDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Bidding End Date
                  </label>
                  <input
                    type="datetime-local"
                    id="bidEndDate"
                    value={biddingData.bidEndDate}
                    onChange={(e) => setBiddingData({
                      ...biddingData,
                      bidEndDate: e.target.value
                    })}
                    className="input-field"
                    required
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
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
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Settings'}
              </button>
            </div>
          </form>

          {/* Current Bids */}
          {biddingData.biddingEnabled && bids.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Bids</h4>
              <div className="space-y-3">
                {bids.map((bid) => (
                  <div key={bid.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {bid.bidderId.fullName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {bid.bidderId.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              {formatPrice(bid.bidAmount)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(bid.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => handleAcceptBid(bid.id)}
                          disabled={loading || bid.status !== 'active'}
                          className="btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {bid.status === 'active' ? 'Accept Bid' : bid.status}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Bids Message */}
          {biddingData.biddingEnabled && bids.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-2">🎯</div>
              <p className="text-gray-500">No bids yet for this account</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiddingModal;
