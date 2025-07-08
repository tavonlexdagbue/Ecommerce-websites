import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onQuickAdd }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate('/product-detail', { state: { productId: product.id } });
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onQuickAdd(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const calculateDiscountPercentage = (originalPrice, salePrice) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  return (
    <div 
      className="bg-surface rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group"
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-error text-error-foreground px-2 py-1 rounded-md text-xs font-medium">
            -{calculateDiscountPercentage(product.originalPrice, product.price)}%
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Icon name="Heart" size={16} className="text-text-secondary hover:text-error" />
        </button>

        {/* Quick Add Button */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleQuickAdd}
            iconName="Plus"
            iconPosition="left"
          >
            Quick Add
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-medium text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>

        {/* Brand */}
        <p className="text-sm text-text-secondary mb-2">{product.brand}</p>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-border'}
              />
            ))}
          </div>
          <span className="text-sm text-text-secondary ml-2">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          {product.stock < 10 && product.stock > 0 && (
            <span className="text-xs text-warning font-medium">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className="text-xs text-error font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;