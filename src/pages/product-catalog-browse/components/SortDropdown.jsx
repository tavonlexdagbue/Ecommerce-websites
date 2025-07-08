import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ currentSort, onSortChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.label : 'Sort by';
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-text-primary bg-surface border border-border rounded-md hover:bg-surface-secondary transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} />
          <span>{getCurrentSortLabel()}</span>
        </span>
        <Icon
          name="ChevronDown"
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md shadow-lg z-50 min-w-48">
          <div className="py-1" role="listbox">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 ${
                  currentSort === option.value
                    ? 'bg-primary-50 text-primary' :'text-text-primary hover:bg-surface-secondary'
                }`}
                role="option"
                aria-selected={currentSort === option.value}
              >
                <Icon name={option.icon} size={16} className="mr-3" />
                <span>{option.label}</span>
                {currentSort === option.value && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;