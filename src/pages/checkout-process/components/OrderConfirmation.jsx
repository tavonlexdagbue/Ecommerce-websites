import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderConfirmation = ({ orderData, className = '' }) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/product-catalog-browse');
  };

  const handleViewDashboard = () => {
    navigate('/user-dashboard');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEstimatedDelivery = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5); // 5 days from now
    return formatDate(deliveryDate.toISOString());
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={40} className="text-success-600" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Order Confirmed!
        </h1>
        <p className="text-lg text-text-secondary">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-surface rounded-lg border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Order Details</h2>
          <span className="text-sm text-text-muted">
            {formatDate(orderData?.timestamp)}
          </span>
        </div>

        <div className="space-y-4">
          {/* Order Number */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-text-secondary">Order Number</span>
            <span className="font-mono font-semibold text-text-primary">
              {orderData?.orderId}
            </span>
          </div>

          {/* Email Confirmation */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-text-secondary">Confirmation Email</span>
            <span className="text-text-primary">
              {orderData?.shipping?.email}
            </span>
          </div>

          {/* Estimated Delivery */}
          <div className="flex items-center justify-between py-3">
            <span className="text-text-secondary">Estimated Delivery</span>
            <span className="text-text-primary font-medium">
              {getEstimatedDelivery()}
            </span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-primary mb-4 flex items-center space-x-2">
          <Icon name="Info" size={20} />
          <span>What happens next?</span>
        </h3>
        <div className="space-y-3 text-sm text-primary-700">
          <div className="flex items-start space-x-3">
            <Icon name="Mail" size={16} className="mt-0.5 text-primary" />
            <p>
              You'll receive an email confirmation with your order details and receipt.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Package" size={16} className="mt-0.5 text-primary" />
            <p>
              Your order will be processed and prepared for shipping within 1-2 business days.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Truck" size={16} className="mt-0.5 text-primary" />
            <p>
              You'll receive tracking information once your order ships.
            </p>
          </div>
        </div>
      </div>

      {/* Support Information */}
      <div className="bg-surface-secondary rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-text-primary mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <Icon name="Phone" size={16} className="text-primary" />
            <div>
              <p className="font-medium text-text-primary">Call Us</p>
              <p className="text-text-secondary">1-800-SHOP-NOW</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={16} className="text-primary" />
            <div>
              <p className="font-medium text-text-primary">Email Support</p>
              <p className="text-text-secondary">support@ecommercehub.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="MessageCircle" size={16} className="text-primary" />
            <div>
              <p className="font-medium text-text-primary">Live Chat</p>
              <p className="text-text-secondary">Available 24/7</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="HelpCircle" size={16} className="text-primary" />
            <div>
              <p className="font-medium text-text-primary">FAQ</p>
              <p className="text-text-secondary">Find quick answers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="primary"
          onClick={handleViewDashboard}
          iconName="User"
          iconPosition="left"
          fullWidth
          className="h-12"
        >
          View Order in Dashboard
        </Button>
        <Button
          variant="outline"
          onClick={handleContinueShopping}
          iconName="ShoppingBag"
          iconPosition="left"
          fullWidth
          className="h-12"
        >
          Continue Shopping
        </Button>
      </div>

      {/* Social Sharing */}
      <div className="text-center mt-8 pt-6 border-t border-border">
        <p className="text-sm text-text-muted mb-4">
          Love your purchase? Share it with friends!
        </p>
        <div className="flex justify-center space-x-4">
          <button className="p-2 text-text-muted hover:text-primary transition-colors duration-200">
            <Icon name="Facebook" size={20} />
          </button>
          <button className="p-2 text-text-muted hover:text-primary transition-colors duration-200">
            <Icon name="Twitter" size={20} />
          </button>
          <button className="p-2 text-text-muted hover:text-primary transition-colors duration-200">
            <Icon name="Instagram" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;