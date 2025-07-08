import React from 'react';
import Icon from '../AppIcon';

const MobileMenuToggle = ({ isOpen = false, onToggle, className = '' }) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors duration-200 ${className}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <Icon 
        name={isOpen ? 'X' : 'Menu'} 
        size={24} 
        className="transition-transform duration-200"
      />
    </button>
  );
};

export default MobileMenuToggle;