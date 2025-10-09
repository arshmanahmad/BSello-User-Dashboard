import React from 'react';
import { FiHome, FiCreditCard, FiClock, FiUser, FiDollarSign, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const buyerNavItems = [
  { id: 'payment', label: 'Payment', icon: <FiCreditCard /> },
  { id: 'transactions', label: 'Transaction History', icon: <FiClock /> },
  { id: 'profile', label: 'Profile Management', icon: <FiUser /> },
  { id: 'funds', label: 'Fund Management', icon: <FiDollarSign /> },
];

const BuyerSidebar = ({ active, onChange, onLogout, isCollapsed, onToggle }) => {
  return (
    <aside className={`hidden lg:flex lg:flex-col ${isCollapsed ? 'lg:w-20' : 'lg:w-80'} bg-gray-900 border-r border-gray-700 sticky top-0 h-screen overflow-y-auto transition-all duration-300`}>
      <div className="px-4 py-6 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-lg font-semibold shadow-lg">
              <span className="text-white">B</span>
            </div>
            {!isCollapsed && (
              <div className="leading-tight">
                <p className="text-[11px] uppercase tracking-widest text-gray-400">Buyer</p>
                <p className="text-xl font-bold text-white">Dashboard</p>
              </div>
            )}
          </div>
          <button
            onClick={onToggle}
            className="flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? <FiChevronRight className="text-xl" /> : <FiChevronLeft className="text-xl" />}
          </button>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-3">
        {buyerNavItems.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative w-full flex items-center ${isCollapsed ? 'justify-center px-3' : 'gap-4 px-4 justify-start'} py-4 rounded-xl text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              {isActive && !isCollapsed && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-white" />
              )}
              <span className={`text-2xl ${isActive ? 'text-white' : 'text-gray-400'} flex-shrink-0`}>{item.icon}</span>
              {!isCollapsed && (
                <span className="text-xl font-semibold text-left leading-tight">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-gray-700">
        <button className={`w-full flex items-center ${isCollapsed ? 'justify-center px-3' : 'gap-4 px-4 justify-start'} py-4 rounded-xl text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200`} title={isCollapsed ? 'Settings' : undefined}>
          <FiSettings className="text-2xl flex-shrink-0" />
          {!isCollapsed && <span className="text-xl font-semibold text-left leading-tight">Settings</span>}
        </button>
        <button onClick={onLogout} className={`mt-3 w-full flex items-center ${isCollapsed ? 'justify-center px-3' : 'gap-4 px-4 justify-start'} py-4 rounded-xl text-left text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200`} title={isCollapsed ? 'Logout' : undefined}>
          <FiLogOut className="text-2xl flex-shrink-0" />
          {!isCollapsed && <span className="text-xl font-semibold text-left leading-tight">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default BuyerSidebar;
