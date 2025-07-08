import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductActions = ({ 
  variants = [],
  onAddToCart,
  onAddToWishlist,
  isInWishlist = false,
  availability = 'in-stock',
  maxQuantity = 10
}) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (availability === 'out-of-stock') return;
    
    setIsAddingToCart(true);
    try {
      await onAddToCart({
        variant: selectedVariant,
        quantity
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const isOutOfStock = availability === 'out-of-stock';

  return (
    <div className="space-y-6">
      {/* Variant Selection */}
      {variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-text-primary">
            {variants[0].type === 'size' ? 'Size' : 'Options'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                disabled={!variant.available}
                className={`px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedVariant?.id === variant.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : variant.available
                    ? 'border-border bg-surface hover:border-primary-300 text-text-primary' :'border-border bg-surface-secondary text-text-muted cursor-not-allowed'
                }`}
              >
                {variant.name}
                {!variant.available && (
                  <span className="ml-1 text-xs">(Out of Stock)</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text-primary">Quantity</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="w-12 text-center text-text-primary font-medium">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= maxQuantity}
              className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <span className="text-sm text-text-muted">
            {maxQuantity} available
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={isOutOfStock || (variants.length > 0 && !selectedVariant?.available)}
          loading={isAddingToCart}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onAddToWishlist}
            iconName={isInWishlist ? 'Heart' : 'Heart'}
            iconPosition="left"
            className={isInWishlist ? 'text-error border-error' : ''}
          >
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </Button>

          <Button
            variant="ghost"
            size="lg"
            iconName="Share"
            className="px-4"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: document.title,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Truck" size={16} />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="RotateCcw" size={16} />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Shield" size={16} />
          <span>2-year warranty included</span>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;