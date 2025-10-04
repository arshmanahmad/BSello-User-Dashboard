import React from 'react';
import { useNavigate } from 'react-router-dom';

const SellerAccessCard = () => {
  const navigate = useNavigate();

  const handleSellerDashboard = () => {
    navigate('/seller-dashboard');
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white mb-8">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">🚀 Seller Dashboard</h3>
          <p className="text-green-100 mb-4">
            Manage your accounts, control bidding, handle deals, and track your sales performance.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-green-400 bg-opacity-30 px-3 py-1 rounded-full">Account Management</span>
            <span className="bg-green-400 bg-opacity-30 px-3 py-1 rounded-full">Bidding Control</span>
            <span className="bg-green-400 bg-opacity-30 px-3 py-1 rounded-full">Deal Management</span>
            <span className="bg-green-400 bg-opacity-30 px-3 py-1 rounded-full">Analytics</span>
          </div>
        </div>
        <div className="ml-6">
          <button
            onClick={handleSellerDashboard}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Open Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerAccessCard;
