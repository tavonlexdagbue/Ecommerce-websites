import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderHistorySection = ({ orders, onReorder, onTrackOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search orders by number or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-surface rounded-lg border border-border overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name="Package" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Order #{order.orderNumber}</h3>
                    <p className="text-sm text-text-secondary">
                      Placed on {order.date} • {order.itemCount} items
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">${order.total}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-success-100 text-success-600' :
                      order.status === 'Shipped' ? 'bg-primary-100 text-primary-600' :
                      order.status === 'Processing'? 'bg-warning-100 text-warning-600' : 'bg-error-100 text-error-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{item.name}</h4>
                      <p className="text-sm text-text-secondary">
                        Quantity: {item.quantity} • ${item.price} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTrackOrder(order.id)}
                  iconName="MapPin"
                  iconPosition="left"
                >
                  Track Order
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReorder(order.id)}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reorder
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Invoice
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No orders found</h3>
          <p className="text-text-secondary">
            {searchTerm || statusFilter !== 'all' ?'Try adjusting your search or filter criteria' :'You haven\'t placed any orders yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderHistorySection;