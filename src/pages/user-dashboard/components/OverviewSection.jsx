import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OverviewSection = ({ user, recentOrders, onNavigate }) => {
  const quickActions = [
    { id: 'shop', label: 'Continue Shopping', icon: 'ShoppingBag', action: () => onNavigate('/product-catalog-browse') },
    { id: 'cart', label: 'View Cart', icon: 'ShoppingCart', action: () => onNavigate('/shopping-cart') },
    { id: 'orders', label: 'Track Orders', icon: 'Package', action: () => {} },
    { id: 'support', label: 'Customer Support', icon: 'MessageCircle', action: () => {} }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              onClick={action.action}
              className="flex flex-col items-center space-y-2 h-20"
            >
              <Icon name={action.icon} size={24} />
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-text-secondary">Total Orders</h3>
              <p className="text-2xl font-bold text-text-primary">{user.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-text-secondary">Total Spent</h3>
              <p className="text-2xl font-bold text-text-primary">${user.totalSpent}</p>
            </div>
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={24} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-text-secondary">Wishlist Items</h3>
              <p className="text-2xl font-bold text-text-primary">{user.wishlistCount}</p>
            </div>
            <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={24} className="text-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Recent Orders</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {recentOrders.slice(0, 3).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Order #{order.orderNumber}</p>
                  <p className="text-sm text-text-secondary">{order.date} • {order.itemCount} items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-text-primary">${order.total}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === 'Delivered' ? 'bg-success-100 text-success-600' :
                  order.status === 'Shipped' ? 'bg-primary-100 text-primary-600' :
                  order.status === 'Processing'? 'bg-warning-100 text-warning-600' : 'bg-secondary-100 text-secondary-600'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;