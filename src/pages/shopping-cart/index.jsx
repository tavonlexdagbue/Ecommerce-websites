import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CartHeader from './components/CartHeader';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import SavedItems from './components/SavedItems';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones with Noise Cancellation",
      variant: "Color: Black, Size: Standard",
      price: 79.99,
      originalPrice: 99.99,
      quantity: 2,
      stock: 15,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Smart Fitness Watch with Heart Rate Monitor",
      variant: "Color: Silver, Band: Sport",
      price: 199.99,
      quantity: 1,
      stock: 8,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Portable Wireless Phone Charger",
      variant: "Capacity: 10000mAh",
      price: 29.99,
      originalPrice: 39.99,
      quantity: 1,
      stock: 3,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop"
    }
  ];

  const mockSavedItems = [
    {
      id: 4,
      name: "Premium Laptop Stand",
      variant: "Material: Aluminum",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Wireless Gaming Mouse",
      variant: "Color: RGB, DPI: 16000",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate loading cart data
    setTimeout(() => {
      const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const savedForLater = JSON.parse(localStorage.getItem('savedItems') || '[]');
      
      if (savedCart.length > 0) {
        setCartItems(savedCart);
      } else {
        setCartItems(mockCartItems);
      }
      
      if (savedForLater.length > 0) {
        setSavedItems(savedForLater);
      } else {
        setSavedItems(mockSavedItems);
      }
      
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Save saved items to localStorage whenever it changes
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems.find(item => item.id === itemId);
    if (itemToSave) {
      setSavedItems(prevSaved => [...prevSaved, { ...itemToSave, quantity: 1 }]);
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }
  };

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedItems.find(item => item.id === itemId);
    if (itemToMove) {
      setCartItems(prevCart => [...prevCart, { ...itemToMove, quantity: 1 }]);
      setSavedItems(prevSaved => prevSaved.filter(item => item.id !== itemId));
    }
  };

  const handleRemoveFromSaved = (itemId) => {
    setSavedItems(prevSaved => prevSaved.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setAppliedPromoCode('');
  };

  const handlePromoCodeApply = (promoCode) => {
    setAppliedPromoCode(promoCode);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before proceeding to checkout.');
      return;
    }
    navigate('/checkout-process');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discount = 0;
  if (appliedPromoCode === 'SAVE10') {
    discount = subtotal * 0.1;
  } else if (appliedPromoCode === 'WELCOME20') {
    discount = subtotal * 0.2;
  }

  const shipping = subtotal > 50 || appliedPromoCode === 'FREESHIP' ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <CartHeader 
        itemCount={cartItems.length}
        onClearCart={handleClearCart}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    onSaveForLater={handleSaveForLater}
                  />
                ))}
              </div>

              {/* Saved Items */}
              {savedItems.length > 0 && (
                <SavedItems
                  savedItems={savedItems}
                  onMoveToCart={handleMoveToCart}
                  onRemoveFromSaved={handleRemoveFromSaved}
                  className="mb-8 lg:mb-0"
                />
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary
                  subtotal={subtotal}
                  discount={discount}
                  tax={tax}
                  shipping={shipping}
                  total={total}
                  onPromoCodeApply={handlePromoCodeApply}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Checkout Button */}
        {cartItems.length > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold text-text-primary">
                Total: ${total.toFixed(2)}
              </span>
              <span className="text-sm text-text-secondary">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShoppingCart;