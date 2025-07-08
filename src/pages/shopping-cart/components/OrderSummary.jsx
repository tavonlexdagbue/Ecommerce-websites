import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  discount, 
  tax, 
  shipping, 
  total,
  onPromoCodeApply,
  onCheckout,
  className = '' 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
    setPromoError('');
    setPromoSuccess('');
  };

  const handlePromoCodeApply = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);
    
    // Mock promo code validation
    setTimeout(() => {
      const validPromoCodes = ['SAVE10', 'WELCOME20', 'FREESHIP'];
      
      if (validPromoCodes.includes(promoCode.toUpperCase())) {
        setPromoSuccess('Promo code applied successfully!');
        setPromoError('');
        onPromoCodeApply(promoCode.toUpperCase());
      } else {
        setPromoError('Invalid promo code. Please try again.');
        setPromoSuccess('');
      }
      
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePromoCodeApply();
    }
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        Order Summary
      </h2>

      {/* Promo Code Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Promo Code
        </label>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={handlePromoCodeChange}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handlePromoCodeApply}
            loading={isApplyingPromo}
            disabled={!promoCode.trim()}
            className="px-4"
          >
            Apply
          </Button>
        </div>
        {promoError && (
          <p className="text-sm text-error mt-1 flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {promoError}
          </p>
        )}
        {promoSuccess && (
          <p className="text-sm text-success mt-1 flex items-center gap-1">
            <Icon name="CheckCircle" size={14} />
            {promoSuccess}
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary font-medium">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Discount</span>
            <span className="text-success font-medium">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Shipping</span>
          <span className="text-text-primary font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Tax</span>
          <span className="text-text-primary font-medium">
            ${tax.toFixed(2)}
          </span>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-text-primary">Total</span>
            <span className="text-lg font-bold text-text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={onCheckout}
        iconName="ArrowRight"
        iconPosition="right"
        className="mb-4"
      >
        Proceed to Checkout
      </Button>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
        <Icon name="Shield" size={16} />
        <span>Secure checkout with SSL encryption</span>
      </div>

      {/* Payment Methods */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-text-secondary text-center mb-2">
          We accept
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-6 bg-primary rounded flex items-center justify-center">
            <Icon name="CreditCard" size={14} color="white" />
          </div>
          <div className="w-8 h-6 bg-secondary rounded flex items-center justify-center">
            <Icon name="Smartphone" size={14} color="white" />
          </div>
          <div className="w-8 h-6 bg-accent rounded flex items-center justify-center">
            <Icon name="Wallet" size={14} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;