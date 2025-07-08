import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedItems = ({ 
  savedItems, 
  onMoveToCart, 
  onRemoveFromSaved,
  className = '' 
}) => {
  if (!savedItems || savedItems.length === 0) {
    return null;
  }

  const handleMoveToCart = (itemId) => {
    onMoveToCart(itemId);
  };

  const handleRemoveFromSaved = (itemId) => {
    onRemoveFromSaved(itemId);
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Heart" size={20} className="text-accent" />
        <h2 className="text-lg font-semibold text-text-primary">
          Saved for Later ({savedItems.length})
        </h2>
      </div>

      <div className="space-y-4">
        {savedItems.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 border border-border-light rounded-lg">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-secondary">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary line-clamp-1 mb-1">
                {item.name}
              </h3>
              {item.variant && (
                <p className="text-sm text-text-secondary mb-2">
                  {item.variant}
                </p>
              )}
              <div className="flex items-center gap-3">
                <span className="font-semibold text-text-primary">
                  ${item.price.toFixed(2)}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-sm text-text-muted line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMoveToCart(item.id)}
                iconName="ShoppingCart"
                iconPosition="left"
                className="text-xs"
              >
                Move to Cart
              </Button>
              <Button
                variant="text"
                size="sm"
                onClick={() => handleRemoveFromSaved(item.id)}
                iconName="X"
                iconPosition="left"
                className="text-xs text-error hover:text-error-600"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItems;