import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ 
  item, 
  onQuantityChange, 
  onRemove, 
  onSaveForLater,
  className = '' 
}) => {
  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    if (item.quantity < item.stock) {
      onQuantityChange(item.id, item.quantity + 1);
    }
  };

  const handleRemoveClick = () => {
    onRemove(item.id);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item.id);
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-surface-secondary">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-primary line-clamp-2">
                {item.name}
              </h3>
              {item.variant && (
                <p className="text-sm text-text-secondary mt-1">
                  {item.variant}
                </p>
              )}
              <div className="flex items-center gap-4 mt-2">
                <span className="text-lg font-bold text-text-primary">
                  ${item.price.toFixed(2)}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-sm text-text-muted line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleQuantityDecrease}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-secondary transition-colors duration-200"
                >
                  <Icon name="Minus" size={16} />
                </button>
                <span className="text-lg font-medium text-text-primary min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={handleQuantityIncrease}
                  disabled={item.quantity >= item.stock}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-secondary transition-colors duration-200"
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Stock Status */}
          {item.stock <= 5 && (
            <div className="flex items-center gap-1 mt-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm text-warning">
                Only {item.stock} left in stock
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-3">
            <Button
              variant="text"
              size="sm"
              onClick={handleSaveForLater}
              iconName="Heart"
              iconPosition="left"
              className="text-text-secondary hover:text-text-primary"
            >
              Save for Later
            </Button>
            <Button
              variant="text"
              size="sm"
              onClick={handleRemoveClick}
              iconName="Trash2"
              iconPosition="left"
              className="text-error hover:text-error-600"
            >
              Remove
            </Button>
          </div>
        </div>

        {/* Desktop Quantity and Price */}
        <div className="hidden sm:flex flex-col items-end gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleQuantityDecrease}
              disabled={item.quantity <= 1}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-secondary transition-colors duration-200"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="text-lg font-medium text-text-primary min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={handleQuantityIncrease}
              disabled={item.quantity >= item.stock}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-secondary transition-colors duration-200"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-text-primary">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;