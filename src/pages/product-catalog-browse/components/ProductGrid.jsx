import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onQuickAdd, isLoading = false }) => {
  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-surface rounded-lg border border-border shadow-sm animate-pulse">
      <div className="h-48 sm:h-56 bg-gray-200 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="flex items-center mb-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-12 ml-2"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-surface-secondary rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No products found
        </h3>
        <p className="text-text-secondary max-w-md">
          We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickAdd={onQuickAdd}
        />
      ))}
    </div>
  );
};

export default ProductGrid;