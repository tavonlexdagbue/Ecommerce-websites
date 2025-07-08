import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardNavigation = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'Order History', icon: 'Package' },
    { id: 'wishlist', label: 'Wishlist', icon: 'Heart' },
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'addresses', label: 'Addresses', icon: 'MapPin' },
    { id: 'payments', label: 'Payment Methods', icon: 'CreditCard' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block w-64 bg-surface border-r border-border">
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default DashboardNavigation;