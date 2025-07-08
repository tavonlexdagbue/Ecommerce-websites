import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];

    // Category chips
    activeFilters.categories.forEach(categoryId => {
      const categoryNames = {
        'electronics': 'Electronics',
        'clothing': 'Clothing',
        'home': 'Home & Garden',
        'sports': 'Sports & Outdoors',
        'books': 'Books',
        'beauty': 'Beauty & Personal Care'
      };
      
      chips.push({
        id: `category-${categoryId}`,
        label: categoryNames[categoryId] || categoryId,
        type: 'category',
        value: categoryId
      });
    });

    // Brand chips
    activeFilters.brands.forEach(brandId => {
      const brandNames = {
        'apple': 'Apple',
        'samsung': 'Samsung',
        'nike': 'Nike',
        'adidas': 'Adidas',
        'sony': 'Sony',
        'lg': 'LG'
      };
      
      chips.push({
        id: `brand-${brandId}`,
        label: brandNames[brandId] || brandId,
        type: 'brand',
        value: brandId
      });
    });

    // Price range chip
    if (activeFilters.priceRange.min || activeFilters.priceRange.max) {
      const min = activeFilters.priceRange.min || '0';
      const max = activeFilters.priceRange.max || '∞';
      chips.push({
        id: 'price-range',
        label: `$${min} - $${max}`,
        type: 'priceRange',
        value: 'priceRange'
      });
    }

    // Rating chip
    if (activeFilters.minRating > 0) {
      chips.push({
        id: 'rating',
        label: `${activeFilters.minRating}+ Stars`,
        type: 'rating',
        value: 'rating'
      });
    }

    return chips;
  };

  const handleRemoveChip = (chip) => {
    switch (chip.type) {
      case 'category': onRemoveFilter('categories', chip.value);
        break;
      case 'brand': onRemoveFilter('brands', chip.value);
        break;
      case 'priceRange': onRemoveFilter('priceRange', null);
        break;
      case 'rating': onRemoveFilter('rating', null);
        break;
      default:
        break;
    }
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 py-3 overflow-x-auto scrollbar-hide">
      <span className="text-sm text-text-secondary whitespace-nowrap mr-2">
        Active filters:
      </span>
      
      <div className="flex items-center space-x-2">
        {chips.map(chip => (
          <div
            key={chip.id}
            className="flex items-center bg-primary-50 text-primary px-3 py-1 rounded-full text-sm whitespace-nowrap"
          >
            <span>{chip.label}</span>
            <button
              onClick={() => handleRemoveChip(chip)}
              className="ml-2 hover:text-primary-700 transition-colors duration-200"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
        
        {chips.length > 1 && (
          <button
            onClick={onClearAll}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 whitespace-nowrap ml-2"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;