import React, { useState } from 'react';
import { FiDollarSign, FiPlus, FiMinus, FiCreditCard, FiShield, FiAlertCircle } from 'react-icons/fi';

const FundManagement = () => {
  const [currentBalance, setCurrentBalance] = useState(1250.75);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const paymentMethods = [
    { id: 'credit_card', name: 'Credit Card', icon: <FiCreditCard />, fee: '2.9%' },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: <FiShield />, fee: 'Free' },
    { id: 'paypal', name: 'PayPal', icon: <FiDollarSign />, fee: '3.5%' }
  ];

  const recentTransactions = [
    { id: 1, type: 'deposit', amount: 500.00, method: 'Credit Card', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'withdrawal', amount: -200.00, method: 'Bank Transfer', date: '2024-01-14', status: 'pending' },
    { id: 3, type: 'deposit', amount: 1000.00, method: 'PayPal', date: '2024-01-12', status: 'completed' },
    { id: 4, type: 'payment', amount: -150.00, method: 'Account Purchase', date: '2024-01-10', status: 'completed' }
  ];

  const handleAddFunds = () => {
    if (amount && selectedMethod) {
      // Here you would typically process the payment
      alert(`Adding $${amount} via ${paymentMethods.find(m => m.id === selectedMethod)?.name}`);
      setShowAddFunds(false);
      setAmount('');
      setSelectedMethod('');
    }
  };

  const handleWithdraw = () => {
    if (amount) {
      // Here you would typically process the withdrawal
      alert(`Withdrawing $${amount}`);
      setShowWithdraw(false);
      setAmount('');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fund Management</h2>
            <p className="text-xl text-gray-600">Manage your wallet balance and transactions</p>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-lg mb-2">Current Balance</p>
            <p className="text-5xl font-bold">{formatCurrency(currentBalance)}</p>
            <p className="text-blue-100 mt-2">Available for bidding and purchases</p>
          </div>
          <div className="text-right relative z-10">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FiDollarSign className="text-5xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setShowAddFunds(true)}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 hover:shadow-3xl transition-all duration-300 text-left group transform hover:-translate-y-2 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <FiPlus className="text-3xl text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Add Funds</h3>
              <p className="text-gray-600">Top up your wallet balance</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setShowWithdraw(true)}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 hover:shadow-3xl transition-all duration-300 text-left group transform hover:-translate-y-2 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <FiMinus className="text-3xl text-orange-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Withdraw Funds</h3>
              <p className="text-gray-600">Transfer money to your bank account</p>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  transaction.type === 'deposit' ? 'bg-green-100' : 
                  transaction.type === 'withdrawal' ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  {transaction.type === 'deposit' ? (
                    <FiPlus className="text-green-600 text-xl" />
                  ) : transaction.type === 'withdrawal' ? (
                    <FiMinus className="text-orange-600 text-xl" />
                  ) : (
                    <FiDollarSign className="text-blue-600 text-xl" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 capitalize">{transaction.type}</p>
                  <p className="text-sm text-gray-600">{transaction.method}</p>
                  <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                </p>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                  transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Funds</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Payment Method</label>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                        <span className="text-sm text-gray-500 ml-auto">Fee: {method.fee}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddFunds(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFunds}
                  className="btn-primary flex-1"
                >
                  Add Funds
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Withdraw Funds</h3>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="text-yellow-600" />
                  <p className="text-yellow-800 font-medium">Minimum withdrawal: $50</p>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  className="btn-primary flex-1"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundManagement;
