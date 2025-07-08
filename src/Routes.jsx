import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import ProductCatalogBrowse from "pages/product-catalog-browse";
import UserAuthentication from "pages/user-authentication";
import ShoppingCart from "pages/shopping-cart";
import ProductDetail from "pages/product-detail";
import CheckoutProcess from "pages/checkout-process";
import UserDashboard from "pages/user-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ProductCatalogBrowse />} />
        <Route path="/product-catalog-browse" element={<ProductCatalogBrowse />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/checkout-process" element={<CheckoutProcess />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;