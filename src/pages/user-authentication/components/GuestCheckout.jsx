import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const GuestCheckout = () => {
  const navigate = useNavigate();

  const handleGuestCheckout = () => {
    // Set guest mode in localStorage
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('guestSession', Date.now().toString());
    
    // Navigate to checkout
    navigate('/checkout-process');
  };

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <div className="text-center">
        <h3 className="text-sm font-medium text-text-primary mb-2">
          Don't want to create an account?
        </h3>
        <p className="text-xs text-text-secondary mb-4">
          You can checkout as a guest and create an account later
        </p>
        
        <Button
          variant="ghost"
          onClick={handleGuestCheckout}
          iconName="ShoppingCart"
          iconPosition="left"
          className="text-sm"
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
};

export default GuestCheckout;