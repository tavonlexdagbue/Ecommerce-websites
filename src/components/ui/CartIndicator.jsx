import React from 'react';
import Icon from '../AppIcon';

const CartIndicator = ({ itemCount = 0, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-text-secondary hover:text-text-primary transition-colors duration-200 ${className}`}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <Icon name="ShoppingCart" size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 z-1001 bg-accent text-accent-foreground text-xs font-medium min-w-[20px] h-5 flex items-center justify-center rounded-full px-1">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIndicator;