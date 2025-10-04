import React, { useState } from 'react';
import { lockingApi } from '../../services/sellerPanelApi';

const AccountCard = ({ account, onRemove, onBiddingToggle, onLock }) => {
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'locked':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'removed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return '✅';
      case 'locked':
        return '🔒';
      case 'sold':
        return '💰';
      case 'removed':
        return '🗑️';
      default:
        return '❓';
    }
  };

  const handleUnlock = async () => {
    if (!window.confirm('Are you sure you want to unlock this account?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await lockingApi.unlockAccount(account.accountId);
      if (response.success) {
        // Refresh the account list
        window.location.reload();
      } else {
        alert(response.message || 'Failed to unlock account');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred while unlocking the account');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Account Image */}
      {account.accountImages && account.accountImages.length > 0 && (
        <div className="h-64 bg-gray-200 relative">
          <img
            src={account.accountImages[0]}
            alt={account.accountName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute top-4 right-4">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(account.status)}`}>
              <span className="mr-2 text-lg">{getStatusIcon(account.status)}</span>
              {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
            </span>
          </div>
        </div>
      )}

      {/* Account Details */}
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {account.accountName}
            </h3>
            <p className="text-lg text-gray-600 mb-3">
              {account.accountType} • {account.accountUrl}
            </p>
            <div className="text-3xl font-bold text-green-600">
              {formatPrice(account.accountPrice)}
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-2 gap-6 mb-6 text-base">
          <div>
            <span className="text-gray-500 text-sm font-medium">Monthly Profit:</span>
            <div className="font-bold text-lg">{formatPrice(account.MonthlyProfit)}</div>
          </div>
          <div>
            <span className="text-gray-500 text-sm font-medium">Page Views:</span>
            <div className="font-bold text-lg">{account.PageViews?.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-gray-500 text-sm font-medium">Profit Margin:</span>
            <div className="font-bold text-lg">{account.ProfitMargin}%</div>
          </div>
          <div>
            <span className="text-gray-500 text-sm font-medium">Created:</span>
            <div className="font-bold text-lg">{formatDate(account.createdAt)}</div>
          </div>
        </div>

        {/* Bidding Info */}
        {account.biddingEnabled && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-blue-600 text-base font-semibold">Bidding Active</span>
                {account.currentBid > 0 && (
                  <span className="ml-3 text-blue-800 font-bold text-lg">
                    Highest: {formatPrice(account.currentBid)}
                  </span>
                )}
              </div>
              {account.bidEndDate && (
                <span className="text-blue-600 text-sm font-medium">
                  Ends: {formatDate(account.bidEndDate)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Account Description */}
        {account.accountDesc && (
          <p className="text-base text-gray-600 mb-6 line-clamp-2">
            {account.accountDesc}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {account.status === 'locked' ? (
            <button
              onClick={handleUnlock}
              disabled={loading}
              className="flex-1 btn-secondary text-base py-3 disabled:opacity-50"
            >
              {loading ? 'Unlocking...' : '🔓 Unlock'}
            </button>
          ) : (
            <>
              <button
                onClick={() => onBiddingToggle(account)}
                className={`flex-1 text-base py-3 ${
                  account.biddingEnabled ? 'btn-secondary' : 'btn-primary'
                }`}
              >
                {account.biddingEnabled ? '⚙️ Manage Bidding' : '🎯 Enable Bidding'}
              </button>
              <button
                onClick={() => onLock(account)}
                disabled={account.status === 'sold' || account.status === 'removed'}
                className="flex-1 btn-secondary text-base py-3 disabled:opacity-50"
              >
                🔒 Lock Account
              </button>
            </>
          )}
          
          <button
            onClick={() => onRemove(account.accountId)}
            disabled={account.status === 'locked' || account.status === 'sold'}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-base py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            🗑️ Remove
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">ID: {account.accountId}</span>
            <span className="font-medium">Updated: {formatDate(account.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
