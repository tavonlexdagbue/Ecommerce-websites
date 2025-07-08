import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import NavigationBreadcrumbs from '../../../components/ui/NavigationBreadcrumbs';

const CartHeader = ({ 
  itemCount, 
  onClearCart,
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/product-catalog-browse');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
      onClearCart();
    }
  };

  return (
    <div className={`bg-surface border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumbs */}
        <NavigationBreadcrumbs className="mb-4" />
        
        {/* Header Content */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
              <Icon name="ShoppingCart" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Shopping Cart
              </h1>
              <p className="text-text-secondary">
                {itemCount === 0 
                  ? 'Your cart is empty' 
                  : `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart`
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleContinueShopping}
              iconName="ArrowLeft"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Continue Shopping
            </Button>
            
            {itemCount > 0 && (
              <Button
                variant="text"
                onClick={handleClearCart}
                iconName="Trash2"
                iconPosition="left"
                className="text-error hover:text-error-600"
              >
                Clear Cart
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Continue Shopping Button */}
        <div className="sm:hidden mt-4">
          <Button
            variant="outline"
            onClick={handleContinueShopping}
            iconName="ArrowLeft"
            iconPosition="left"
            fullWidth
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;