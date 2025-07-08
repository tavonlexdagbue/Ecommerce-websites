import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/product-catalog-browse': { label: 'Shop', parent: null },
    '/product-detail': { label: 'Product Details', parent: '/product-catalog-browse' },
    '/shopping-cart': { label: 'Shopping Cart', parent: '/product-catalog-browse' },
    '/checkout-process': { label: 'Checkout', parent: '/shopping-cart' },
    '/user-authentication': { label: 'Sign In', parent: null },
    '/user-dashboard': { label: 'Dashboard', parent: null }
  };

  const generateBreadcrumbs = () => {
    const currentPath = location.pathname;
    const breadcrumbs = [];
    
    // Always start with Home
    breadcrumbs.push({ label: 'Home', path: '/product-catalog-browse' });
    
    // Add current route if it's not home
    if (currentPath !== '/product-catalog-browse' && routeMap[currentPath]) {
      const route = routeMap[currentPath];
      
      // Add parent if exists
      if (route.parent && routeMap[route.parent]) {
        breadcrumbs.push({
          label: routeMap[route.parent].label,
          path: route.parent
        });
      }
      
      // Add current route
      breadcrumbs.push({
        label: route.label,
        path: currentPath,
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs if only home
  if (breadcrumbs.length <= 1) {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={16} 
              className="text-text-muted"
            />
          )}
          {breadcrumb.isActive ? (
            <span className="text-text-primary font-medium">
              {breadcrumb.label}
            </span>
          ) : (
            <button
              onClick={() => handleBreadcrumbClick(breadcrumb.path)}
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {breadcrumb.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default NavigationBreadcrumbs;