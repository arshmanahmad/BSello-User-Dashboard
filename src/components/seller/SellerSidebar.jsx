import React from 'react';
import { FiHome, FiUsers, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi';

export const navItems = [
  { id: 'accounts', label: 'Accounts', icon: <FiUsers /> },
  { id: 'deals', label: 'Deals', icon: <FiHome /> },
  { id: 'stats', label: 'Analytics', icon: <FiBarChart2 /> },
];

const SellerSidebar = ({ active, onChange, onLogout }) => {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-80 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
      <div className="px-6 py-6 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg font-semibold">S</div>
          <div className="leading-tight">
            <p className="text-[11px] uppercase tracking-widest text-gray-500">Seller</p>
            <p className="text-xl font-bold text-gray-900">Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative w-full flex items-center gap-4 px-5 py-3 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-gray-50 text-gray-900 ring-1 ring-gray-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-green-600" />
              )}
              <span className={`text-2xl ${isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'}`}>{item.icon}</span>
              <span className="text-lg font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-gray-200">
        <button className="w-full flex items-center gap-4 px-5 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-50">
          <FiSettings className="text-xl" />
          <span className="text-lg font-semibold">Settings</span>
        </button>
        <button onClick={onLogout} className="mt-3 w-full flex items-center gap-4 px-5 py-3 rounded-lg text-left text-red-600 hover:bg-red-50">
          <FiLogOut className="text-xl" />
          <span className="text-lg font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SellerSidebar;


