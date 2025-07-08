import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import DashboardHeader from './components/DashboardHeader';
import DashboardNavigation from './components/DashboardNavigation';
import OverviewSection from './components/OverviewSection';
import OrderHistorySection from './components/OrderHistorySection';
import WishlistSection from './components/WishlistSection';
import ProfileSection from './components/ProfileSection';
import AddressesSection from './components/AddressesSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import SettingsSection from './components/SettingsSection';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, userProfile, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [settings, setSettings] = useState({});

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/user-authentication', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1990-05-15",
      gender: "male",
      memberSince: "March 2022",
      totalOrders: 24,
      totalSpent: "2,450.00",
      wishlistCount: 8,
      reviewsCount: 12
    };

    const mockOrders = [
      {
        id: 1,
        orderNumber: "ORD-2024-001",
        date: "March 15, 2024",
        status: "Delivered",
        total: "149.99",
        itemCount: 3,
        items: [
          {
            name: "Wireless Bluetooth Headphones",
            quantity: 1,
            price: 79.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
          },
          {
            name: "Phone Case",
            quantity: 2,
            price: 35.00,
            image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop"
          }
        ]
      },
      {
        id: 2,
        orderNumber: "ORD-2024-002",
        date: "March 10, 2024",
        status: "Shipped",
        total: "89.50",
        itemCount: 2,
        items: [
          {
            name: "Laptop Stand",
            quantity: 1,
            price: 59.99,
            image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"
          },
          {
            name: "USB Cable",
            quantity: 1,
            price: 29.51,
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
          }
        ]
      },
      {
        id: 3,
        orderNumber: "ORD-2024-003",
        date: "March 5, 2024",
        status: "Processing",
        total: "199.99",
        itemCount: 1,
        items: [
          {
            name: "Smart Watch",
            quantity: 1,
            price: 199.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
          }
        ]
      }
    ];

    const mockWishlistItems = [
      {
        id: 1,
        name: "Premium Wireless Earbuds",
        price: 199.99,
        discountedPrice: 149.99,
        discount: 25,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
        rating: 4.5,
        reviewCount: 128,
        inStock: true
      },
      {
        id: 2,
        name: "Mechanical Gaming Keyboard",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
        rating: 4.8,
        reviewCount: 89,
        inStock: true
      },
      {
        id: 3,
        name: "4K Webcam",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
        rating: 4.3,
        reviewCount: 45,
        inStock: false
      }
    ];

    const mockAddresses = [
      {
        id: 1,
        type: "home",
        name: "John Smith",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        phone: "+1 (555) 123-4567",
        isDefault: true
      },
      {
        id: 2,
        type: "work",
        name: "John Smith",
        street: "456 Business Ave",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "United States",
        phone: "+1 (555) 987-6543",
        isDefault: false
      }
    ];

    const mockPaymentMethods = [
      {
        id: 1,
        type: "card",
        cardType: "visa",
        cardNumber: "4532123456789012",
        expiryMonth: "12",
        expiryYear: "2026",
        cardholderName: "John Smith",
        billingAddress: "123 Main Street, New York, NY 10001",
        isDefault: true
      },
      {
        id: 2,
        type: "card",
        cardType: "mastercard",
        cardNumber: "5555444433332222",
        expiryMonth: "08",
        expiryYear: "2025",
        cardholderName: "John Smith",
        billingAddress: "123 Main Street, New York, NY 10001",
        isDefault: false
      }
    ];

    const mockSettings = {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: true,
      profileVisibility: false,
      dataCollection: true,
      thirdPartySharing: false,
      savePaymentMethods: true,
      autoReorder: true,
      priceAlerts: true
    };

    setUserData(mockUser);
    setOrders(mockOrders);
    setWishlistItems(mockWishlistItems);
    setAddresses(mockAddresses);
    setPaymentMethods(mockPaymentMethods);
    setSettings(mockSettings);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleReorder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      // Add items to cart and navigate
      const cartItems = order.items.map(item => ({
        ...item,
        id: Date.now() + Math.random()
      }));
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      navigate('/shopping-cart');
    }
  };

  const handleTrackOrder = (orderId) => {
    // Mock tracking functionality
    alert(`Tracking order ${orderId}`);
  };

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const newItem = {
      id: Date.now(),
      name: item.name,
      price: item.discountedPrice || item.price,
      image: item.image,
      quantity: 1
    };
    existingCart.push(newItem);
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    alert('Item added to cart!');
  };

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleUpdateProfile = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
    alert('Profile updated successfully!');
  };

  const handleAddAddress = (addressData) => {
    const newAddress = {
      ...addressData,
      id: Date.now(),
      isDefault: addresses.length === 0
    };
    setAddresses(prev => [...prev, newAddress]);
  };

  const handleUpdateAddress = (addressId, addressData) => {
    setAddresses(prev => prev.map(addr => 
      addr.id === addressId ? { ...addr, ...addressData } : addr
    ));
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const handleAddPaymentMethod = (paymentData) => {
    const newPaymentMethod = {
      ...paymentData,
      id: Date.now(),
      cardType: 'visa', // Mock card type detection
      isDefault: paymentMethods.length === 0
    };
    setPaymentMethods(prev => [...prev, newPaymentMethod]);
  };

  const handleDeletePaymentMethod = (methodId) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
  };

  const handleSetDefaultPaymentMethod = (methodId) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === methodId
    })));
  };

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewSection
            user={userData}
            recentOrders={orders}
            onNavigate={handleNavigate}
          />
        );
      case 'orders':
        return (
          <OrderHistorySection
            orders={orders}
            onReorder={handleReorder}
            onTrackOrder={handleTrackOrder}
          />
        );
      case 'wishlist':
        return (
          <WishlistSection
            wishlistItems={wishlistItems}
            onAddToCart={handleAddToCart}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onNavigate={handleNavigate}
          />
        );
      case 'profile':
        return (
          <ProfileSection
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'addresses':
        return (
          <AddressesSection
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
          />
        );
      case 'payments':
        return (
          <PaymentMethodsSection
            paymentMethods={paymentMethods}
            onAddPaymentMethod={handleAddPaymentMethod}
            onDeletePaymentMethod={handleDeletePaymentMethod}
            onSetDefault={handleSetDefaultPaymentMethod}
          />
        );
      case 'settings':
        return (
          <SettingsSection
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        );
      default:
        return (
          <OverviewSection
            user={user}
            recentOrders={orders}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DashboardHeader user={userData} />
      
      <div className="max-w-7xl mx-auto flex">
        <DashboardNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        
        <main className="flex-1 p-4 lg:p-8">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;