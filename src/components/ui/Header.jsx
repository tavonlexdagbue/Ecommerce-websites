import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';

import CartIndicator from './CartIndicator';

import MobileMenuToggle from './MobileMenuToggle';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userProfile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Mock authentication state - replace with actual auth context
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  // Mock cart state - replace with actual cart context
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItemCount(cartItems.length);
  }, []);

  const handleAuthAction = async () => {
    if (user) {
      // User is logged in, show logout
      const result = await signOut();
      if (result?.success) {
        navigate('/product-catalog-browse');
      }
    } else {
      // User not logged in, go to auth page
      navigate('/user-authentication');
    }
  };

  const navigationItems = [
    {
      label: 'Shop',
      path: '/product-catalog-browse',
      icon: 'Store',
      requiresAuth: false
    },
    {
      label: 'Cart',
      path: '/shopping-cart',
      icon: 'ShoppingCart',
      requiresAuth: false,
      showCartIndicator: true
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/product-catalog-browse')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-text-primary font-heading">
                EcommerceHub
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                {item.showCartIndicator && cartItemCount > 0 && (
                  <span className="ml-1 bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Cart Indicator */}
            <div className="hidden md:block">
              <CartIndicator 
                itemCount={cartItemCount}
                onClick={() => handleNavigation('/shopping-cart')}
              />
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">
                    {userProfile?.full_name || user?.email}
                  </span>
                  <button
                    onClick={handleAuthAction}
                    className="text-sm text-primary hover:text-primary-700"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAuthAction}
                  className="text-sm text-primary hover:text-primary-700"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <MobileMenuToggle 
                isOpen={isMobileMenuOpen}
                onToggle={handleMobileMenuToggle}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </div>
                  {item.showCartIndicator && cartItemCount > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;