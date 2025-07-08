import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';
import QuickAddModal from './components/QuickAddModal';

import Button from '../../components/ui/Button';

const ProductCatalogBrowse = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState('relevance');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: { min: '', max: '' },
    minRating: 0
  });

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      category: "electronics",
      price: 1199.99,
      originalPrice: 1299.99,
      discount: true,
      rating: 4.8,
      reviewCount: 2847,
      stock: 15,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      category: "electronics",
      price: 1099.99,
      originalPrice: null,
      discount: false,
      rating: 4.6,
      reviewCount: 1923,
      stock: 8,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      brand: "Nike",
      category: "clothing",
      price: 149.99,
      originalPrice: 179.99,
      discount: true,
      rating: 4.4,
      reviewCount: 856,
      stock: 23,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "MacBook Air M2",
      brand: "Apple",
      category: "electronics",
      price: 1199.99,
      originalPrice: null,
      discount: false,
      rating: 4.9,
      reviewCount: 3421,
      stock: 12,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Adidas Ultraboost 22",
      brand: "Adidas",
      category: "clothing",
      price: 189.99,
      originalPrice: 220.00,
      discount: true,
      rating: 4.3,
      reviewCount: 642,
      stock: 31,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Sony WH-1000XM5",
      brand: "Sony",
      category: "electronics",
      price: 399.99,
      originalPrice: 449.99,
      discount: true,
      rating: 4.7,
      reviewCount: 1534,
      stock: 19,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop"
    },
    {
      id: 7,
      name: "The Great Gatsby",
      brand: "Penguin Classics",
      category: "books",
      price: 12.99,
      originalPrice: null,
      discount: false,
      rating: 4.2,
      reviewCount: 2847,
      stock: 156,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop"
    },
    {
      id: 8,
      name: "Organic Face Moisturizer",
      brand: "Natural Beauty",
      category: "beauty",
      price: 29.99,
      originalPrice: 39.99,
      discount: true,
      rating: 4.5,
      reviewCount: 423,
      stock: 67,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop"
    },
    {
      id: 9,
      name: "Yoga Mat Premium",
      brand: "FitLife",
      category: "sports",
      price: 49.99,
      originalPrice: null,
      discount: false,
      rating: 4.6,
      reviewCount: 789,
      stock: 45,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop"
    },
    {
      id: 10,
      name: "Smart Garden Kit",
      brand: "GreenThumb",
      category: "home",
      price: 89.99,
      originalPrice: 109.99,
      discount: true,
      rating: 4.1,
      reviewCount: 234,
      stock: 28,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop"
    },
    {
      id: 11,
      name: "iPad Pro 12.9",
      brand: "Apple",
      category: "electronics",
      price: 1099.99,
      originalPrice: null,
      discount: false,
      rating: 4.8,
      reviewCount: 1876,
      stock: 9,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop"
    },
    {
      id: 12,
      name: "Wireless Charging Pad",
      brand: "TechGear",
      category: "electronics",
      price: 24.99,
      originalPrice: 34.99,
      discount: true,
      rating: 4.0,
      reviewCount: 567,
      stock: 89,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, filters, searchQuery, currentSort]);

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        filters.brands.includes(product.brand.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter(product => {
        const price = product.price;
        const min = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
        const max = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.minRating);
    }

    // Apply sorting
    switch (currentSort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterType, value) => {
    const newFilters = { ...filters };
    
    switch (filterType) {
      case 'categories':
        newFilters.categories = newFilters.categories.filter(cat => cat !== value);
        break;
      case 'brands':
        newFilters.brands = newFilters.brands.filter(brand => brand !== value);
        break;
      case 'priceRange':
        newFilters.priceRange = { min: '', max: '' };
        break;
      case 'rating':
        newFilters.minRating = 0;
        break;
      default:
        break;
    }
    
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: { min: '', max: '' },
      minRating: 0
    });
    setSearchQuery('');
  };

  const handleQuickAdd = (product) => {
    setSelectedProduct(product);
    setIsQuickAddModalOpen(true);
  };

  const handleAddToCart = (cartItem) => {
    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if item already exists
    const existingItemIndex = existingCart.findIndex(item => 
      item.id === cartItem.id && 
      item.size === cartItem.size && 
      item.color === cartItem.color
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // Add new item
      existingCart.push(cartItem);
    }

    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    // Show success message (you can implement a toast notification here)
    console.log('Item added to cart:', cartItem);
  };

  const hasActiveFilters = () => {
    return (
      filters.categories.length > 0 ||
      filters.brands.length > 0 ||
      filters.priceRange.min ||
      filters.priceRange.max ||
      filters.minRating > 0
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <NavigationBreadcrumbs className="mb-6" />

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            Shop All Products
          </h1>
          <p className="text-text-secondary">
            Discover our complete collection of premium products
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filter Chips */}
        {hasActiveFilters() && (
          <FilterChips
            activeFilters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />
        )}

        <div className="flex">
          {/* Desktop Filter Sidebar */}
          {!isMobile && (
            <FilterSidebar
              isOpen={isFilterSidebarOpen}
              onClose={() => setIsFilterSidebarOpen(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
              isMobile={false}
            />
          )}

          {/* Main Content */}
          <div className={`flex-1 ${!isMobile && isFilterSidebarOpen ? 'ml-6' : ''}`}>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-surface p-4 rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterSidebarOpen(true)}
                  iconName="Filter"
                  iconPosition="left"
                  className="lg:hidden"
                >
                  Filters
                </Button>

                {/* Desktop Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                  iconName="Filter"
                  iconPosition="left"
                  className="hidden lg:flex"
                >
                  {isFilterSidebarOpen ? 'Hide Filters' : 'Show Filters'}
                </Button>

                {/* Results Count */}
                <span className="text-sm text-text-secondary">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </span>
              </div>

              {/* Sort Dropdown */}
              <SortDropdown
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                className="w-48"
              />
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              onQuickAdd={handleQuickAdd}
              isLoading={isLoading}
            />

            {/* Load More Button (for infinite scroll simulation) */}
            {!isLoading && filteredProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen && isMobile}
        onClose={() => setIsFilterSidebarOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        isMobile={true}
      />

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isQuickAddModalOpen}
        onClose={() => setIsQuickAddModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductCatalogBrowse;