import React, { useState } from 'react';
import { dealApi } from '../../services/sellerPanelApi';

const CredentialModal = ({ deal, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: deal.accountCredentials?.email || '',
    password: deal.accountCredentials?.password || '',
    additionalInfo: deal.accountCredentials?.additionalInfo || ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const isViewMode = deal.accountCredentials && deal.status === 'credentials_shared';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email.trim() || !credentials.password.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const response = await dealApi.completeDeal({
        accountId: deal.accountId,
        buyerId: deal.buyerId.id,
        paymentId: deal.paymentId,
        paymentMethod: deal.paymentMethod,
        accountCredentials: credentials
      });
      
      if (response.success) {
        onSuccess();
        alert('Credentials shared successfully');
      } else {
        alert(response.message || 'Failed to share credentials');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred while sharing credentials');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {isViewMode ? 'Account Credentials' : 'Share Account Credentials'}
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
          {/* Deal Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Deal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Account:</span>
                <div className="font-medium">{deal.accountName}</div>
              </div>
              <div>
                <span className="text-gray-500">Buyer:</span>
                <div className="font-medium">{deal.buyerId.fullName}</div>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <div className="font-medium text-green-600">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(deal.finalPrice)}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <div className="font-medium capitalize">{deal.status.replace('_', ' ')}</div>
              </div>
            </div>
          </div>

          {isViewMode ? (
            /* View Mode - Show existing credentials */
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Credentials Already Shared</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>These credentials were shared on {new Date(deal.accountCredentials.sharedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={credentials.email}
                      readOnly
                      className="input-field flex-1"
                    />
                    <button
                      onClick={() => copyToClipboard(credentials.email)}
                      className="btn-secondary text-sm py-2 px-3"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      readOnly
                      className="input-field flex-1"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn-secondary text-sm py-2 px-3"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(credentials.password)}
                      className="btn-secondary text-sm py-2 px-3"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {credentials.additionalInfo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                    <div className="flex items-start space-x-2">
                      <textarea
                        value={credentials.additionalInfo}
                        readOnly
                        rows={3}
                        className="input-field flex-1"
                      />
                      <button
                        onClick={() => copyToClipboard(credentials.additionalInfo)}
                        className="btn-secondary text-sm py-2 px-3"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Edit Mode - Form to share credentials */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Ready to Share Credentials</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Payment has been completed. You can now safely share the account credentials with the buyer.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Account Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="Enter account email"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Account Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    placeholder="Enter account password"
                    className="input-field pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  value={credentials.additionalInfo}
                  onChange={(e) => setCredentials({ ...credentials, additionalInfo: e.target.value })}
                  placeholder="Any additional login information, 2FA details, etc."
                  rows={3}
                  className="input-field"
                />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Important Security Notice</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>Make sure you have verified the payment before sharing credentials. Once shared, the deal will be marked as completed.</p>
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
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Sharing...' : '🔑 Share Credentials'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CredentialModal;
