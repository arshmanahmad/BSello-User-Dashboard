import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiCheckCircle, 
  FiClock, 
  FiMail, 
  FiLock, 
  FiUser, 
  FiStar,
  FiSend,
  FiEye,
  FiEyeOff,
  FiCopy,
  FiAlertCircle,
  FiShield,
  FiMessageSquare,
  FiArrowRight
} from 'react-icons/fi';

const DealCompletion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get deal data from navigation state
  const { dealId, account, buyer, seller } = location.state || {};
  
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    platform: account?.platform || 'TikTok'
  });
  const [buyerReview, setBuyerReview] = useState({
    rating: 0,
    comment: '',
    verified: false
  });

  // Mock data if no state passed
  const mockDealId = 'DEAL-ABC123-XYZ789';
  const mockAccount = {
    id: 'ACC-001',
    platform: 'TikTok',
    username: '@example_user',
    followers: '125K',
    price: '$500'
  };
  const mockBuyer = {
    name: 'Jane Buyer',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  };
  const mockSeller = {
    name: 'John Seller',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  };

  const dealData = {
    id: dealId || mockDealId,
    account: account || mockAccount,
    seller: seller || mockSeller,
    buyer: buyer || mockBuyer,
    status: 'in_progress'
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      // Handle timeout - could show warning or auto-advance
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle credential submission
  const handleCredentialSubmit = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      setCurrentStep(2);
      setIsTimerActive(true);
      
      // Simulate sending notification to buyer
      console.log('Notification sent to buyer:', dealData.buyer.name);
    }
  };

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (buyerReview.rating > 0) {
      setCurrentStep(3);
      setBuyerReview(prev => ({ ...prev, verified: true }));
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

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
                <h1 className="text-xl font-bold text-gray-900">Deal Completion</h1>
                <p className="text-sm text-gray-500">Deal ID: {dealData.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FiShield className="text-green-500 text-xl" />
              <span className="text-sm font-medium text-green-600">Secure Transaction</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Deal Information Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Account Details</h2>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500 text-xl" />
                  <span className="text-sm font-medium text-green-600">Deal Active</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">T</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{dealData.account.platform} Account</h3>
                      <p className="text-gray-500">{dealData.account.username}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Followers:</span>
                      <span className="font-semibold">{dealData.account.followers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold text-green-600">{dealData.account.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={dealData.seller.avatar} 
                      alt="Seller" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">Seller</h3>
                      <p className="text-gray-500">{dealData.seller.name}</p>
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-400 text-sm" />
                        <span className="text-sm text-gray-600">{dealData.seller.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src={dealData.buyer.avatar} 
                      alt="Buyer" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">Buyer</h3>
                      <p className="text-gray-500">{dealData.buyer.name}</p>
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-400 text-sm" />
                        <span className="text-sm text-gray-600">{dealData.buyer.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Seller Credentials */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Share Account Credentials</h2>
                </div>
                
                <form onSubmit={handleCredentialSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform
                    </label>
                    <select
                      value={credentials.platform}
                      onChange={(e) => setCredentials(prev => ({ ...prev, platform: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="TikTok">TikTok</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Twitter">Twitter</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={credentials.email}
                        onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter account email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showCredentials ? "text" : "password"}
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter account password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCredentials(!showCredentials)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCredentials ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <FiAlertCircle className="text-blue-500 text-xl flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Important Notice</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Once you submit the credentials, the buyer will have 5 minutes to verify the account. 
                          Make sure the credentials are correct and the account is accessible.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <FiSend className="inline mr-2" />
                    Send Credentials to Buyer
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Buyer Verification */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Account Verification</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Timer */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FiClock className="text-orange-500 text-2xl" />
                        <div>
                          <h3 className="font-semibold text-orange-900">Verification Timer</h3>
                          <p className="text-sm text-orange-700">Please verify the account within the time limit</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-orange-600">
                          {formatTime(timeLeft)}
                        </div>
                        <p className="text-sm text-orange-500">Time Remaining</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Credentials Display */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Account Credentials</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <FiMail className="text-gray-400" />
                          <span className="text-gray-600">Email:</span>
                          <span className="font-mono text-sm">{credentials.email}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(credentials.email)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <FiCopy />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <FiLock className="text-gray-400" />
                          <span className="text-gray-600">Password:</span>
                          <span className="font-mono text-sm">
                            {showCredentials ? credentials.password : '••••••••'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowCredentials(!showCredentials)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showCredentials ? <FiEyeOff /> : <FiEye />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(credentials.password)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <FiCopy />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Verification Steps */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Verification Steps:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-bold">1</span>
                        </div>
                        <span className="text-blue-800">Open the {credentials.platform} app or website</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-bold">2</span>
                        </div>
                        <span className="text-blue-800">Login using the provided credentials</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-bold">3</span>
                        </div>
                        <span className="text-blue-800">Verify account details and functionality</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-bold">4</span>
                        </div>
                        <span className="text-blue-800">Return here to submit your review</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <FiCheckCircle className="inline mr-2" />
                    Account Verified - Submit Review
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Submission */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Submit Review</h2>
                </div>
                
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Rate your experience
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setBuyerReview(prev => ({ ...prev, rating: star }))}
                          className={`p-2 rounded-lg transition-colors ${
                            star <= buyerReview.rating
                              ? 'text-yellow-400 bg-yellow-50'
                              : 'text-gray-300 hover:text-yellow-400'
                          }`}
                        >
                          <FiStar className="text-2xl" />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      value={buyerReview.comment}
                      onChange={(e) => setBuyerReview(prev => ({ ...prev, comment: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Share your experience with this transaction..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <FiMessageSquare className="inline mr-2" />
                    Submit Review & Complete Deal
                  </button>
                </form>
              </div>
            )}

            {/* Deal Completed */}
            {currentStep === 4 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle className="text-green-500 text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Deal Completed Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for using our platform. The transaction has been completed and both parties have been notified.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => navigate('/seller-dashboard')}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Deal Status */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Deal Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    In Progress
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Step:</span>
                  <span className="font-semibold">{currentStep} of 3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Deal ID:</span>
                  <span className="font-mono text-sm">{dealData.id}</span>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiShield className="text-green-500" />
                Security
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span>End-to-end encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span>Secure credential sharing</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span>Verified users only</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span>24/7 support available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCompletion;
