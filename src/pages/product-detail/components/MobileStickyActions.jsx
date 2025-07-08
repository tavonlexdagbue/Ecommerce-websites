import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MobileStickyActions = ({ 
  price,
  onAddToCart,
  onAddToWishlist,
  isInWishlist = false,
  availability = 'in-stock',
  variants = [],
  maxQuantity = 10
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      variant: selectedVariant,
      quantity
    });
  };

  const isOutOfStock = availability === 'out-of-stock';

  return (
    <>
      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border shadow-lg">
        <div className="flex items-center p-4 space-x-3">
          {/* Price */}
          <div className="flex-shrink-0">
            <div className="text-lg font-bold text-text-primary">
              {formatPrice(price)}
            </div>
          </div>

          {/* Quick Actions Toggle */}
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="flex-shrink-0 p-2 rounded-md border border-border hover:bg-surface-secondary transition-colors duration-200"
          >
            <Icon name="Settings" size={20} />
          </button>

          {/* Add to Cart Button */}
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleAddToCart}
            disabled={isOutOfStock || (variants.length > 0 && !selectedVariant?.available)}
            iconName="ShoppingCart"
            iconPosition="left"
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>

          {/* Wishlist Button */}
          <button
            onClick={onAddToWishlist}
            className="flex-shrink-0 p-2 rounded-md border border-border hover:bg-surface-secondary transition-colors duration-200"
          >
            <Icon 
              name="Heart" 
              size={20} 
              className={isInWishlist ? 'text-error fill-current' : 'text-text-secondary'} 
            />
          </button>
        </div>

        {/* Quick Actions Panel */}
        {showQuickActions && (
          <div className="border-t border-border bg-surface-secondary p-4 space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">Quantity:</span>
              <div className="flex items-center border border-border rounded-md bg-surface">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-50"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <span className="w-12 text-center text-text-primary font-medium text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= maxQuantity}
                  className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-50"
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>
            </div>

            {/* Variant Selection */}
            {variants.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-text-primary">
                  {variants[0].type === 'size' ? 'Size:' : 'Options:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.available}
                      className={`px-3 py-1 border rounded-md text-xs font-medium transition-all duration-200 ${
                        selectedVariant?.id === variant.id
                          ? 'border-primary bg-primary text-primary-foreground'
                          : variant.available
                          ? 'border-border bg-surface hover:border-primary-300 text-text-primary' :'border-border bg-surface-secondary text-text-muted cursor-not-allowed'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Spacer to prevent content overlap */}
      <div className="md:hidden h-20"></div>
    </>
  );
};

export default MobileStickyActions;