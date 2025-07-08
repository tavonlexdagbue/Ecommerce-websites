import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductInfo = ({ 
  title = '', 
  price = 0, 
  originalPrice = 0, 
  discount = 0,
  rating = 0,
  reviewCount = 0,
  description = '',
  features = [],
  specifications = {},
  brand = '',
  sku = '',
  availability = 'in-stock'
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-accent fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-border" />
      );
    }

    return stars;
  };

  const getAvailabilityStatus = () => {
    switch (availability) {
      case 'in-stock':
        return { text: 'In Stock', color: 'text-success', icon: 'Check' };
      case 'low-stock':
        return { text: 'Low Stock', color: 'text-warning', icon: 'AlertTriangle' };
      case 'out-of-stock':
        return { text: 'Out of Stock', color: 'text-error', icon: 'X' };
      default:
        return { text: 'Unknown', color: 'text-text-muted', icon: 'Help' };
    }
  };

  const availabilityStatus = getAvailabilityStatus();

  return (
    <div className="space-y-6">
      {/* Brand */}
      {brand && (
        <div className="text-sm text-text-secondary font-medium uppercase tracking-wide">
          {brand}
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight">
        {title}
      </h1>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(rating)}
          <span className="text-sm font-medium text-text-primary ml-2">
            {rating.toFixed(1)}
          </span>
        </div>
        <div className="text-sm text-text-secondary">
          ({reviewCount.toLocaleString()} reviews)
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-text-primary">
            {formatPrice(price)}
          </span>
          {originalPrice > price && (
            <span className="text-lg text-text-muted line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-sm font-medium">
              {discount}% OFF
            </span>
          )}
        </div>
        {originalPrice > price && (
          <div className="text-sm text-success">
            You save {formatPrice(originalPrice - price)}
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Icon name={availabilityStatus.icon} size={16} className={availabilityStatus.color} />
        <span className={`text-sm font-medium ${availabilityStatus.color}`}>
          {availabilityStatus.text}
        </span>
      </div>

      {/* SKU */}
      {sku && (
        <div className="text-sm text-text-secondary">
          SKU: <span className="font-mono">{sku}</span>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-text-primary">Description</h3>
          <div className="text-text-secondary leading-relaxed whitespace-pre-line">
            {description}
          </div>
        </div>
      )}

      {/* Key Features */}
      {features.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-text-primary">Key Features</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Specifications */}
      {Object.keys(specifications).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-text-primary">Specifications</h3>
          <div className="bg-surface-secondary rounded-lg p-4">
            <dl className="space-y-2">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-1">
                  <dt className="text-sm font-medium text-text-secondary">{key}:</dt>
                  <dd className="text-sm text-text-primary">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;