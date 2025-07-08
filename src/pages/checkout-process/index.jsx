import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import CheckoutProgress from './components/CheckoutProgress';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation';
import Icon from '../../components/AppIcon';

const CheckoutProcess = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [isGuest, setIsGuest] = useState(true);

  // Check if user has items in cart
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (cartItems.length === 0) {
      navigate('/shopping-cart');
    }
  }, [navigate]);

  // Check authentication status
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsGuest(!authStatus);
  }, []);

  const handleShippingNext = (data) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handlePaymentNext = (data) => {
    setPaymentData(data);
    setCurrentStep(3);
  };

  const handleOrderConfirm = (data) => {
    setOrderData(data);
    setCurrentStep(4);
    
    // Clear cart after successful order
    localStorage.removeItem('cartItems');
    
    // Simulate order storage
    const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    existingOrders.push(data);
    localStorage.setItem('userOrders', JSON.stringify(existingOrders));
  };

  const handleBackToShipping = () => {
    setCurrentStep(1);
  };

  const handleBackToPayment = () => {
    setCurrentStep(2);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShippingForm
            onNext={handleShippingNext}
            initialData={shippingData}
          />
        );
      case 2:
        return (
          <PaymentForm
            onNext={handlePaymentNext}
            onBack={handleBackToShipping}
          />
        );
      case 3:
        return (
          <OrderReview
            shippingData={shippingData}
            paymentData={paymentData}
            onBack={handleBackToPayment}
            onConfirm={handleOrderConfirm}
          />
        );
      case 4:
        return (
          <OrderConfirmation orderData={orderData} />
        );
      default:
        return null;
    }
  };

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <OrderConfirmation orderData={orderData} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <NavigationBreadcrumbs />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Secure Checkout
            </h1>
            <p className="text-text-secondary">
              Complete your purchase securely and safely
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <CheckoutProgress currentStep={currentStep} />
          </div>

          {/* Guest Checkout Notice */}
          {isGuest && currentStep === 1 && (
            <div className="mb-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary mb-1">
                    Checking out as guest
                  </p>
                  <p className="text-sm text-primary-600 mb-3">
                    You can create an account after your purchase to track orders and save preferences.
                  </p>
                  <button
                    onClick={() => navigate('/user-authentication')}
                    className="text-sm font-medium text-primary hover:text-primary-700 underline"
                  >
                    Sign in to your account instead
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {renderStepContent()}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary isCollapsible={false} />
                
                {/* Security Badges */}
                <div className="mt-6 bg-surface rounded-lg border border-border p-4">
                  <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
                    <Icon name="Shield" size={18} className="text-success-600" />
                    <span>Secure Checkout</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs text-text-muted">
                    <div className="flex items-center space-x-2">
                      <Icon name="Lock" size={14} className="text-success-600" />
                      <span>256-bit SSL</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={14} className="text-success-600" />
                      <span>PCI Compliant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={14} className="text-success-600" />
                      <span>Verified Secure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Eye" size={14} className="text-success-600" />
                      <span>Privacy Protected</span>
                    </div>
                  </div>
                </div>

                {/* Return Policy */}
                <div className="mt-4 bg-surface-secondary rounded-lg p-4">
                  <h4 className="font-medium text-text-primary mb-2 flex items-center space-x-2">
                    <Icon name="RotateCcw" size={16} className="text-primary" />
                    <span>30-Day Returns</span>
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Free returns on all orders. No questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutProcess;