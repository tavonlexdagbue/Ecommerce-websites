import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderReview = ({ shippingData, paymentData, onBack, onConfirm, className = '' }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleConfirmOrder = async () => {
    if (!agreedToTerms) return;
    
    setIsConfirming(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const orderData = {
      orderId: `ORD-${Date.now()}`,
      shipping: shippingData,
      payment: paymentData,
      timestamp: new Date().toISOString()
    };
    
    onConfirm(orderData);
    setIsConfirming(false);
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return '';
    const cleaned = cardNumber.replace(/\s/g, '');
    return `**** **** **** ${cleaned.slice(-4)}`;
  };

  return (
    <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="CheckCircle" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-text-primary">Review Your Order</h2>
      </div>

      <div className="space-y-6">
        {/* Shipping Information */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-text-primary flex items-center space-x-2">
              <Icon name="Truck" size={18} className="text-primary" />
              <span>Shipping Address</span>
            </h3>
            <button
              onClick={onBack}
              className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200"
            >
              Edit
            </button>
          </div>
          <div className="text-sm text-text-secondary space-y-1">
            <p className="font-medium text-text-primary">
              {shippingData?.firstName} {shippingData?.lastName}
            </p>
            <p>{shippingData?.address}</p>
            {shippingData?.apartment && <p>{shippingData.apartment}</p>}
            <p>
              {shippingData?.city}, {shippingData?.state} {shippingData?.zipCode}
            </p>
            <p>{shippingData?.country}</p>
            <div className="pt-2 space-y-1">
              <p className="flex items-center space-x-2">
                <Icon name="Mail" size={14} />
                <span>{shippingData?.email}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Icon name="Phone" size={14} />
                <span>{shippingData?.phone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-text-primary flex items-center space-x-2">
              <Icon name="CreditCard" size={18} className="text-primary" />
              <span>Payment Method</span>
            </h3>
            <button
              onClick={onBack}
              className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200"
            >
              Edit
            </button>
          </div>
          <div className="text-sm text-text-secondary">
            {paymentData?.paymentMethod === 'card' ? (
              <div className="space-y-1">
                <p className="font-medium text-text-primary">
                  {paymentData.cardData?.cardholderName}
                </p>
                <p className="flex items-center space-x-2">
                  <Icon name="CreditCard" size={14} />
                  <span>{maskCardNumber(paymentData.cardData?.cardNumber)}</span>
                </p>
                <p>Expires {paymentData.cardData?.expiryDate}</p>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Icon name="Smartphone" size={14} />
                <span className="capitalize">
                  {paymentData?.paymentMethod?.replace('-', ' ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Security & Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 text-sm text-success-600">
            <Icon name="Shield" size={16} />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-success-600">
            <Icon name="Lock" size={16} />
            <span>Encrypted</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-success-600">
            <Icon name="CheckCircle" size={16} />
            <span>PCI Compliant</span>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-text-primary">
              I agree to the{' '}
              <a href="#" className="text-primary hover:text-primary-700 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary-700 underline">
                Privacy Policy
              </a>
              . I understand that my order will be processed immediately upon confirmation.
            </label>
          </div>
        </div>

        {/* Order Confirmation Notice */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-primary mb-1">Order Confirmation</p>
              <p className="text-primary-600">
                You'll receive an email confirmation with your order details and tracking information 
                once your order is processed. Please keep this for your records.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
            className="sm:w-auto"
          >
            Back to Payment
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmOrder}
            disabled={!agreedToTerms}
            loading={isConfirming}
            iconName="CheckCircle"
            iconPosition="right"
            fullWidth
            className="h-12"
          >
            {isConfirming ? 'Processing Order...' : 'Confirm Order'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;