import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RelatedProducts = ({ products = [] }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={12}
          className={i <= rating ? 'text-accent fill-current' : 'text-border'}
        />
      );
    }
    return stars;
  };

  const handleProductClick = (productId) => {
    navigate(`/product-detail?id=${productId}`);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    // Add to cart logic here
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">You Might Also Like</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-surface rounded-lg border border-border hover:shadow-md transition-shadow duration-200 cursor-pointer group"
            onClick={() => handleProductClick(product.id)}
          >
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-t-lg bg-surface-secondary">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2">
              <h3 className="font-medium text-text-primary text-sm line-clamp-2 leading-tight">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
                <span className="text-xs text-text-muted ml-1">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="inline-block bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                  {product.discount}% OFF
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={(e) => handleAddToCart(e, product)}
                iconName="ShoppingCart"
                iconPosition="left"
                className="mt-3"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => navigate('/product-catalog-browse')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View More Products
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;