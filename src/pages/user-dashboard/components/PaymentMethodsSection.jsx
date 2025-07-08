import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentMethodsSection = ({ paymentMethods, onAddPaymentMethod, onDeletePaymentMethod, onSetDefault }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    type: 'card',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onAddPaymentMethod(formData);
    setIsAddingNew(false);
    resetForm();
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'card',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
      billingAddress: ''
    });
  };

  const getCardIcon = (cardType) => {
    switch (cardType) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      case 'amex':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const formatCardNumber = (number) => {
    return `**** **** **** ${number.slice(-4)}`;
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return { value: month.toString().padStart(2, '0'), label: month.toString().padStart(2, '0') };
  });

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Payment Methods</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddingNew(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Payment Method
          </Button>
        </div>

        {/* Add New Payment Method Form */}
        {isAddingNew && (
          <div className="mb-6 p-4 bg-surface-secondary rounded-lg border border-border">
            <h3 className="font-medium text-text-primary mb-4">Add New Payment Method</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Cardholder Name
                </label>
                <Input
                  type="text"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  placeholder="Enter cardholder name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Card Number
                </label>
                <Input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Expiry Month
                  </label>
                  <select
                    value={formData.expiryMonth}
                    onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Month</option>
                    {months.map(month => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Expiry Year
                  </label>
                  <select
                    value={formData.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    CVV
                  </label>
                  <Input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    maxLength="4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Billing Address
                </label>
                <Input
                  type="text"
                  value={formData.billingAddress}
                  onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                  placeholder="Enter billing address"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="primary"
                onClick={handleSave}
                iconName="Check"
                iconPosition="left"
              >
                Save Payment Method
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="p-4 bg-surface-secondary rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-primary-50 rounded flex items-center justify-center">
                    <Icon name={getCardIcon(method.cardType)} size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-text-primary">
                        {formatCardNumber(method.cardNumber)}
                      </span>
                      <span className="text-sm text-text-secondary uppercase">
                        {method.cardType}
                      </span>
                      {method.isDefault && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {method.cardholderName}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSetDefault(method.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <button
                    onClick={() => onDeletePaymentMethod(method.id)}
                    className="p-2 text-text-secondary hover:text-error transition-colors duration-200"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {paymentMethods.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CreditCard" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No payment methods saved</h3>
            <p className="text-text-secondary">
              Add a payment method to make checkout faster and more secure
            </p>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-primary mb-1">Secure Payment Processing</h3>
            <p className="text-sm text-primary-600">
              Your payment information is encrypted and securely stored. We never store your full card details on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsSection;