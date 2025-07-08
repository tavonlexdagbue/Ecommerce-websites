import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserMenu = ({ 
  isAuthenticated = false, 
  user = null, 
  onSignIn, 
  onDashboard, 
  onSignOut,
  className = '' 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (action) => {
    setIsDropdownOpen(false);
    action();
  };

  if (!isAuthenticated) {
    return (
      <div className={className}>
        <Button
          variant="outline"
          size="sm"
          onClick={onSignIn}
          iconName="User"
          iconPosition="left"
          className="text-sm"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={handleDropdownToggle}
        className="flex items-center space-x-2 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors duration-200"
        aria-label="User menu"
        aria-expanded={isDropdownOpen}
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <div className="hidden sm:block">
          <span className="text-sm font-medium text-text-primary">
            {user?.name || 'Account'}
          </span>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg border border-border z-1050">
          <div className="py-1">
            <button
              onClick={() => handleMenuItemClick(onDashboard)}
              className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors duration-200"
            >
              <Icon name="User" size={16} className="mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => handleMenuItemClick(onDashboard)}
              className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-surface-secondary transition-colors duration-200"
            >
              <Icon name="Settings" size={16} className="mr-3" />
              Settings
            </button>
            <div className="border-t border-border my-1"></div>
            <button
              onClick={() => handleMenuItemClick(onSignOut)}
              className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200"
            >
              <Icon name="LogOut" size={16} className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;