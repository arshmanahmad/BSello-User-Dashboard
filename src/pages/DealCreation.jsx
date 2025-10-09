import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiCheckCircle, 
  FiLock, 
  FiUser, 
  FiDollarSign,
  FiAlertTriangle,
  FiArrowRight,
  FiShield
} from 'react-icons/fi';

const DealCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get account and buyer data from navigation state
  const { account, buyer, seller } = location.state || {};
  
  const [isCreating, setIsCreating] = useState(false);
  const [dealCreated, setDealCreated] = useState(false);
  const [generatedDealId, setGeneratedDealId] = useState('');

  // Generate unique deal ID
  const generateDealId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `DEAL-${timestamp}-${randomStr}`.toUpperCase();
  };

  // Create deal and lock account
  const handleCreateDeal = async () => {
    setIsCreating(true);
    
    try {
      // Generate unique deal ID
      const dealId = generateDealId();
      setGeneratedDealId(dealId);
      
      // Simulate API call to create deal and lock account
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would:
      // 1. Lock the account (prevent further bidding)
      // 2. Create deal record in database
      // 3. Send notification to buyer
      // 4. Update account status
      
      setDealCreated(true);
      
    } catch (error) {
      console.error('Error creating deal:', error);
      alert('Failed to create deal. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  // Navigate to deal completion page
  const goToDealCompletion = () => {
    navigate('/deal-completion', {
      state: {
        dealId: generatedDealId,
        account,
        buyer,
        seller
      }
    });
  };

  // Mock data if no state passed
  const mockAccount = {
    id: 'ACC-001',
    platform: 'TikTok',
    username: '@example_user',
    followers: '125K',
    price: '$500',
    description: 'High engagement TikTok account with viral content'
  };

  const mockBuyer = {
    id: 'BUYER-001',
    name: 'Jane Buyer',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    verified: true
  };

  const mockSeller = {
    id: 'SELLER-001',
    name: 'John Seller',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    verified: true
  };

  const accountData = account || mockAccount;
  const buyerData = buyer || mockBuyer;
  const sellerData = seller || mockSeller;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Create Deal</h1>
                <p className="text-sm text-gray-500">Lock account and notify buyer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FiShield className="text-green-500 text-xl" />
              <span className="text-sm font-medium text-green-600">Secure Transaction</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          
          {/* Account Information */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">T</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{accountData.platform} Account</h3>
                    <p className="text-gray-600">{accountData.username}</p>
                    <p className="text-sm text-gray-500">{accountData.followers} followers</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-green-600 text-lg">{accountData.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform:</span>
                    <span className="font-semibold">{accountData.platform}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 text-sm">{accountData.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Information */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Selected Buyer</h2>
            
            <div className="flex items-center gap-6">
              <img 
                src={buyerData.avatar} 
                alt="Buyer" 
                className="w-20 h-20 rounded-full object-cover border-4 border-green-200"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{buyerData.name}</h3>
                  {buyerData.verified && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <FiCheckCircle className="text-green-600" />
                      Verified
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-gray-600 font-medium">{buyerData.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600">Ready to purchase this account</p>
              </div>
            </div>
          </div>

          {/* Deal Creation */}
          {!dealCreated ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiLock className="text-blue-600 text-2xl" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Deal & Lock Account</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  This will create a unique deal ID, lock the account to prevent other buyers from bidding, 
                  and immediately notify the selected buyer about the deal.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <FiAlertTriangle className="text-yellow-500 text-2xl flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h4 className="font-semibold text-yellow-900 mb-2">Important Notice</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Once created, this account will be locked and no other buyers can bid</li>
                        <li>• The buyer will receive an immediate notification</li>
                        <li>• You'll be redirected to the deal completion page</li>
                        <li>• Make sure you want to proceed with this buyer</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCreateDeal}
                  disabled={isCreating}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Creating Deal...
                    </>
                  ) : (
                    <>
                      <FiLock className="inline mr-3" />
                      Create Deal & Lock Account
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle className="text-green-500 text-3xl" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Deal Created Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  The account has been locked and the buyer has been notified. 
                  You can now proceed to share account credentials.
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Deal ID:</p>
                      <p className="font-mono text-xl font-bold text-gray-900">{generatedDealId}</p>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedDealId)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={goToDealCompletion}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <FiArrowRight className="inline mr-3" />
                    Continue to Deal Completion
                  </button>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <FiCheckCircle className="text-blue-500 text-xl flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">What happens next?</h4>
                        <ul className="text-sm text-blue-700 mt-2 space-y-1">
                          <li>• Buyer receives notification about the deal</li>
                          <li>• Both parties meet on the deal completion page</li>
                          <li>• You share account credentials securely</li>
                          <li>• Buyer verifies the account within 5 minutes</li>
                          <li>• Buyer submits review to complete the deal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealCreation;
