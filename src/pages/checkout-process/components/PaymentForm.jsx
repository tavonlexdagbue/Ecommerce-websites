import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ onNext, onBack, className = '' }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'apple-pay', label: 'Apple Pay', icon: 'Smartphone' },
    { id: 'google-pay', label: 'Google Pay', icon: 'Smartphone' },
    { id: 'paypal', label: 'PayPal', icon: 'DollarSign' }
  ];

  const validateCard = () => {
    const newErrors = {};

    if (!cardData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!cardData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format (MM/YY)';
    }

    if (!cardData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardData.cvv.length < 3) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }

    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    setCardData(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'card' && !validateCard()) {
      setIsProcessing(false);
      return;
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    onNext({ paymentMethod, cardData });
    setIsProcessing(false);
  };

  return (
    <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="CreditCard" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-text-primary">Payment Method</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Choose Payment Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors duration-200 ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
                }`}
              >
                <Icon name={method.icon} size={20} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  {method.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Card Details Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Card Number *
              </label>
              <Input
                type="text"
                value={cardData.cardNumber}
                onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={errors.cardNumber ? 'border-error' : ''}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-error">{errors.cardNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Cardholder Name *
              </label>
              <Input
                type="text"
                value={cardData.cardholderName}
                onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                placeholder="John Doe"
                className={errors.cardholderName ? 'border-error' : ''}
              />
              {errors.cardholderName && (
                <p className="mt-1 text-sm text-error">{errors.cardholderName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Expiry Date *
                </label>
                <Input
                  type="text"
                  value={cardData.expiryDate}
                  onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={errors.expiryDate ? 'border-error' : ''}
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-error">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  CVV *
                </label>
                <Input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                  placeholder="123"
                  maxLength={4}
                  className={errors.cvv ? 'border-error' : ''}
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-error">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Digital Wallet Messages */}
        {(paymentMethod === 'apple-pay' || paymentMethod === 'google-pay') && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Info" size={20} className="text-primary" />
              <p className="text-sm text-primary">
                You'll be redirected to {paymentMethod === 'apple-pay' ? 'Apple Pay' : 'Google Pay'} to complete your payment securely.
              </p>
            </div>
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Info" size={20} className="text-primary" />
              <p className="text-sm text-primary">
                You'll be redirected to PayPal to complete your payment securely.
              </p>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-success-50 border border-success-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={20} className="text-success-600" />
            <div>
              <p className="text-sm font-medium text-success-800">Secure Payment</p>
              <p className="text-sm text-success-600">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            type="button"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
            className="sm:w-auto"
          >
            Back to Shipping
          </Button>
          <Button
            variant="primary"
            type="submit"
            loading={isProcessing}
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
            className="h-12"
          >
            {isProcessing ? 'Processing Payment...' : 'Review Order'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;