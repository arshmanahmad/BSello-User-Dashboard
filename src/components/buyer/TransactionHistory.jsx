import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiCreditCard, FiClock, FiCheckCircle, FiXCircle, FiAlertTriangle, FiActivity } from 'react-icons/fi';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    page: 1,
    limit: 10
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockTransactions = [
      {
        id: 'txn_001',
        type: 'payment',
        amount: 150.00,
        status: 'completed',
        description: 'Account purchase - Instagram @fashionista',
        date: '2024-01-15T10:30:00Z',
        paymentMethod: 'Credit Card',
        reference: 'PAY_123456789'
      },
      {
        id: 'txn_002',
        type: 'refund',
        amount: -75.00,
        status: 'completed',
        description: 'Refund for cancelled deal',
        date: '2024-01-14T14:20:00Z',
        paymentMethod: 'Credit Card',
        reference: 'REF_987654321'
      },
      {
        id: 'txn_003',
        type: 'deposit',
        amount: 500.00,
        status: 'pending',
        description: 'Wallet top-up',
        date: '2024-01-13T09:15:00Z',
        paymentMethod: 'Bank Transfer',
        reference: 'DEP_456789123'
      },
      {
        id: 'txn_004',
        type: 'payment',
        amount: 200.00,
        status: 'failed',
        description: 'Account purchase - TikTok @creator',
        date: '2024-01-12T16:45:00Z',
        paymentMethod: 'PayPal',
        reference: 'PAY_789123456'
      }
    ];
    
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="text-green-600" />;
      case 'pending':
        return <FiClock className="text-yellow-600" />;
      case 'failed':
        return <FiXCircle className="text-red-600" />;
      default:
        return <FiAlertTriangle className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'payment':
        return <FiCreditCard className="text-blue-600" />;
      case 'deposit':
        return <FiDollarSign className="text-green-600" />;
      case 'refund':
        return <FiDollarSign className="text-orange-600" />;
      default:
        return <FiDollarSign className="text-gray-600" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transaction History</h2>
            <p className="text-xl text-gray-600">View all your payment and transaction records</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Transactions</p>
            <p className="text-3xl font-bold text-gray-900">{transactions.length}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="payment">Payment</option>
              <option value="deposit">Deposit</option>
              <option value="refund">Refund</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">Items per page</label>
            <select
              value={filters.limit}
              onChange={(e) => setFilters({...filters, limit: parseInt(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-16 text-center">
          <div className="text-gray-400 text-8xl mb-6 flex items-center justify-center">
            <FiActivity />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No transactions found</h3>
          <p className="text-xl text-gray-500">You haven't made any transactions yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{transaction.description}</h3>
                    <p className="text-gray-600">Reference: {transaction.reference}</p>
                    <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(transaction.status)}`}>
                      <span className="mr-2">{getStatusIcon(transaction.status)}</span>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{transaction.paymentMethod}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
