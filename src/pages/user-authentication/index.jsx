import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import GuestCheckout from './components/GuestCheckout';
import SecurityBadges from './components/SecurityBadges';
import Icon from '../../components/AppIcon';

const UserAuthentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');

  // Check if user is already authenticated
  useEffect(() => {
    if (!loading && user) {
      const from = location.state?.from?.pathname || '/user-dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location, user, loading]);

  // Set initial tab based on URL params or state
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get('mode');
    if (mode === 'register') {
      setActiveTab('register');
    }
  }, [location]);

  const handleAuthSuccess = () => {
    const from = location.state?.from?.pathname || '/user-dashboard';
    navigate(from, { replace: true });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without causing navigation
    const newUrl = new URL(window.location);
    if (tab === 'register') {
      newUrl.searchParams.set('mode', 'register');
    } else {
      newUrl.searchParams.delete('mode');
    }
    window.history.replaceState({}, '', newUrl);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <Icon name="User" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              {activeTab === 'login' ?'Sign in to your account to continue shopping' :'Join thousands of satisfied customers'
              }
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-surface rounded-lg shadow-md border border-border p-6">
            <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
            
            {activeTab === 'login' ? (
              <LoginForm onSuccess={handleAuthSuccess} />
            ) : (
              <RegisterForm onSuccess={handleAuthSuccess} />
            )}
            
            <SocialAuth onSuccess={handleAuthSuccess} />
            
            {/* Show guest checkout only on login tab */}
            {activeTab === 'login' && <GuestCheckout />}
          </div>

          {/* Security Badges */}
          <div className="bg-surface rounded-lg shadow-sm border border-border p-4">
            <SecurityBadges />
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-2">
            <p className="text-xs text-text-muted">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary-700 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary-700 underline">
                Privacy Policy
              </a>
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-text-muted">
              <button 
                onClick={() => navigate('/product-catalog-browse')}
                className="hover:text-text-primary transition-colors duration-200"
              >
                Continue Shopping
              </button>
              <span>•</span>
              <a href="#" className="hover:text-text-primary transition-colors duration-200">
                Help & Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;