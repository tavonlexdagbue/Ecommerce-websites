import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const WishlistSection = ({ wishlistItems, onAddToCart, onRemoveFromWishlist, onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">My Wishlist</h2>
          <span className="text-sm text-text-secondary">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-surface-secondary rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-surface rounded-full flex items-center justify-center shadow-md hover:bg-error-50 transition-colors duration-200"
                  >
                    <Icon name="X" size={16} className="text-error" />
                  </button>
                  {item.discount && (
                    <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-text-primary mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-text-primary">
                      ${item.discountedPrice || item.price}
                    </span>
                    {item.discountedPrice && (
                      <span className="text-sm text-text-secondary line-through">
                        ${item.price}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < Math.floor(item.rating) ? 'text-warning fill-current' : 'text-text-muted'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-text-secondary">
                        ({item.reviewCount})
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.inStock 
                        ? 'bg-success-100 text-success-600' :'bg-error-100 text-error-600'
                    }`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onAddToCart(item)}
                      disabled={!item.inStock}
                      iconName="ShoppingCart"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate(`/product-detail?id=${item.id}`)}
                      iconName="Eye"
                      className="px-3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Heart" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">Your wishlist is empty</h3>
            <p className="text-text-secondary mb-6">
              Save items you love to your wishlist and never lose track of them
            </p>
            <Button
              variant="primary"
              onClick={() => onNavigate('/product-catalog-browse')}
              iconName="ShoppingBag"
              iconPosition="left"
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistSection;