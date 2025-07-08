import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ isCollapsible = false, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(!isCollapsible);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 79.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.99;
  const tax = subtotal * 0.08; // 8% tax
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) : 0;
  const total = subtotal + shipping + tax - promoDiscount;

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    setPromoError('');

    // Mock promo codes
    const validPromoCodes = {
      'SAVE10': { discount: 0.10, description: '10% off your order' },
      'WELCOME20': { discount: 0.20, description: '20% off for new customers' },
      'FREESHIP': { discount: 0, description: 'Free shipping', freeShipping: true }
    };

    if (validPromoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        ...validPromoCodes[promoCode.toUpperCase()]
      });
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  return (
    <div className={`bg-surface rounded-lg border border-border ${className}`}>
      {/* Collapsible Header */}
      {isCollapsible && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 border-b border-border hover:bg-surface-secondary transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <Icon name="ShoppingBag" size={20} className="text-primary" />
            <span className="font-semibold text-text-primary">Order Summary</span>
            <span className="text-sm text-text-secondary">
              ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-text-primary">${total.toFixed(2)}</span>
            <Icon 
              name="ChevronDown" 
              size={20} 
              className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </button>
      )}

      {/* Order Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {!isCollapsible && (
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="ShoppingBag" size={24} className="text-primary" />
              <h2 className="text-xl font-semibold text-text-primary">Order Summary</h2>
            </div>
          )}

          {/* Cart Items */}
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  {item.quantity > 1 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-medium text-text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code Section */}
          <div className="border-t border-border pt-4">
            {!appliedPromo ? (
              <form onSubmit={handlePromoSubmit} className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    type="submit"
                    disabled={!promoCode.trim()}
                  >
                    Apply
                  </Button>
                </div>
                {promoError && (
                  <p className="text-sm text-error">{promoError}</p>
                )}
                <p className="text-xs text-text-muted">
                  Try: SAVE10, WELCOME20, or FREESHIP
                </p>
              </form>
            ) : (
              <div className="flex items-center justify-between bg-success-50 border border-success-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Tag" size={16} className="text-success-600" />
                  <div>
                    <p className="text-sm font-medium text-success-800">
                      {appliedPromo.code}
                    </p>
                    <p className="text-xs text-success-600">
                      {appliedPromo.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={removePromo}
                  className="text-success-600 hover:text-success-800 transition-colors duration-200"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Order Totals */}
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-text-primary">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-text-primary">
                {appliedPromo?.freeShipping ? (
                  <span className="line-through text-text-muted">${shipping.toFixed(2)}</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Tax</span>
              <span className="text-text-primary">${tax.toFixed(2)}</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-success-600">Discount ({appliedPromo.code})</span>
                <span className="text-success-600">-${promoDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-border pt-2">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-text-primary">Total</span>
                <span className="text-text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={16} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-primary">
                  Estimated Delivery
                </p>
                <p className="text-xs text-primary-600">
                  3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;