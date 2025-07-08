import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const QuickAddModal = ({ isOpen, onClose, product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    };
    
    onAddToCart(cartItem);
    onClose();
    
    // Reset form
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Navy', value: '#1E3A8A' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Red', value: '#EF4444' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-surface rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Quick Add</h2>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Product Info */}
          <div className="flex items-start space-x-4 mb-6">
            <Image
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-medium text-text-primary mb-1">{product.name}</h3>
              <p className="text-sm text-text-secondary mb-2">{product.brand}</p>
              <p className="text-lg font-semibold text-text-primary">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          {/* Size Selection */}
          {product.category === 'clothing' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-3">
                Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-sm font-medium rounded-md border transition-colors duration-200 ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-surface text-text-primary hover:bg-surface-secondary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.category === 'clothing' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-3">
                Color
              </label>
              <div className="flex items-center space-x-3">
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color.name
                        ? 'border-primary scale-110' :'border-border hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-surface-secondary transition-colors duration-200"
                disabled={quantity <= 1}
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="w-12 text-center font-medium text-text-primary">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-surface-secondary transition-colors duration-200"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <div className="flex items-center text-success">
                <Icon name="Check" size={16} className="mr-2" />
                <span className="text-sm">In Stock ({product.stock} available)</span>
              </div>
            ) : (
              <div className="flex items-center text-error">
                <Icon name="X" size={16} className="mr-2" />
                <span className="text-sm">Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center space-x-3 p-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={
              product.stock === 0 ||
              (product.category === 'clothing' && (!selectedSize || !selectedColor))
            }
            iconName="ShoppingCart"
            iconPosition="left"
            className="flex-1"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;