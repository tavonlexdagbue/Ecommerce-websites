import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange, isMobile = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    brands: true,
    rating: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handleBrandChange = (brandId) => {
    const updatedBrands = filters.brands.includes(brandId)
      ? filters.brands.filter(id => id !== brandId)
      : [...filters.brands, brandId];
    
    onFilterChange({ ...filters, brands: updatedBrands });
  };

  const handlePriceChange = (field, value) => {
    onFilterChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [field]: value
      }
    });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, minRating: rating });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      priceRange: { min: '', max: '' },
      minRating: 0
    });
  };

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 245 },
    { id: 'clothing', name: 'Clothing', count: 189 },
    { id: 'home', name: 'Home & Garden', count: 156 },
    { id: 'sports', name: 'Sports & Outdoors', count: 134 },
    { id: 'books', name: 'Books', count: 98 },
    { id: 'beauty', name: 'Beauty & Personal Care', count: 87 }
  ];

  const brands = [
    { id: 'apple', name: 'Apple', count: 45 },
    { id: 'samsung', name: 'Samsung', count: 38 },
    { id: 'nike', name: 'Nike', count: 32 },
    { id: 'adidas', name: 'Adidas', count: 28 },
    { id: 'sony', name: 'Sony', count: 25 },
    { id: 'lg', name: 'LG', count: 22 }
  ];

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-medium text-text-primary mb-3"
      >
        <span>{title}</span>
        <Icon
          name="ChevronDown"
          size={16}
          className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      {isExpanded && children}
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="text"
            size="sm"
            onClick={clearAllFilters}
            className="text-text-secondary"
          >
            Clear All
          </Button>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1 text-text-secondary hover:text-text-primary"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Categories */}
        <FilterSection
          title="Categories"
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection('categories')}
        >
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category.id} className="flex items-center cursor-pointer">
                <Input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="mr-3"
                />
                <span className="text-sm text-text-primary flex-1">{category.name}</span>
                <span className="text-xs text-text-muted">({category.count})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Price Range"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="flex-1"
              />
              <span className="text-text-muted">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['Under $25', '$25-$50', '$50-$100', '$100-$200', 'Over $200'].map(range => (
                <button
                  key={range}
                  className="px-3 py-1 text-xs border border-border rounded-full hover:bg-surface-secondary transition-colors duration-200"
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection
          title="Brands"
          isExpanded={expandedSections.brands}
          onToggle={() => toggleSection('brands')}
        >
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand.id} className="flex items-center cursor-pointer">
                <Input
                  type="checkbox"
                  checked={filters.brands.includes(brand.id)}
                  onChange={() => handleBrandChange(brand.id)}
                  className="mr-3"
                />
                <span className="text-sm text-text-primary flex-1">{brand.name}</span>
                <span className="text-xs text-text-muted">({brand.count})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection
          title="Customer Rating"
          isExpanded={expandedSections.rating}
          onToggle={() => toggleSection('rating')}
        >
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`flex items-center w-full p-2 rounded-md transition-colors duration-200 ${
                  filters.minRating === rating ? 'bg-primary-50 text-primary' : 'hover:bg-surface-secondary'
                }`}
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < rating ? 'text-accent fill-current' : 'text-border'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">& Up</span>
              </button>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && (
        <div className="p-4 border-t border-border">
          <Button
            variant="primary"
            fullWidth
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-surface">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className={`w-80 bg-surface border-r border-border transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;