import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = ({ className = '' }) => {
  const navigate = useNavigate();

  const suggestedProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.8
    },
    {
      id: 3,
      name: "Portable Phone Charger",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
      rating: 4.3
    }
  ];

  const handleContinueShopping = () => {
    navigate('/product-catalog-browse');
  };

  const handleProductClick = (productId) => {
    navigate(`/product-detail?id=${productId}`);
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      {/* Empty Cart Illustration */}
      <div className="mb-8">
        <div className="w-32 h-32 mx-auto bg-surface-secondary rounded-full flex items-center justify-center mb-4">
          <Icon name="ShoppingCart" size={48} className="text-text-muted" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Your cart is empty
        </h2>
        <p className="text-text-secondary max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
        </p>
      </div>

      {/* Continue Shopping Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleContinueShopping}
        iconName="ArrowRight"
        iconPosition="right"
        className="mb-12"
      >
        Continue Shopping
      </Button>

      {/* Suggested Products */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-text-primary mb-6">
          You might like these
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-surface-secondary">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              <h4 className="font-semibold text-text-primary mb-2 line-clamp-2">
                {product.name}
              </h4>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-text-muted'}
                    />
                  ))}
                  <span className="text-sm text-text-secondary ml-1">
                    ({product.rating})
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-text-primary">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-text-muted line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                className="mt-3"
                iconName="Plus"
                iconPosition="left"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Truck" size={24} className="text-primary" />
          </div>
          <h4 className="font-semibold text-text-primary mb-1">Free Shipping</h4>
          <p className="text-sm text-text-secondary">
            On orders over $50
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="RotateCcw" size={24} className="text-success" />
          </div>
          <h4 className="font-semibold text-text-primary mb-1">Easy Returns</h4>
          <p className="text-sm text-text-secondary">
            30-day return policy
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Shield" size={24} className="text-accent" />
          </div>
          <h4 className="font-semibold text-text-primary mb-1">Secure Payment</h4>
          <p className="text-sm text-text-secondary">
            SSL encrypted checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;