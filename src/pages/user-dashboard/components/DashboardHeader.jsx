import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardHeader = ({ user }) => {
  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={32} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Welcome back, {user.name}!
              </h1>
              <p className="text-text-secondary">
                Member since {user.memberSince}
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.totalOrders}</div>
              <div className="text-sm text-text-secondary">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">${user.totalSpent}</div>
              <div className="text-sm text-text-secondary">Total Spent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;