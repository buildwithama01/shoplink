import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/lib/mock-data";
import NotFound from "./pages/NotFound";

import Storefront from "./pages/storefront/Storefront";
import ProductDetail from "./pages/storefront/ProductDetail";
import CartPage from "./pages/storefront/CartPage";
import Checkout from "./pages/storefront/Checkout";
import OrderTracking from "./pages/storefront/OrderTracking";
import OrderConfirmation from "./pages/storefront/OrderConfirmation";

import SellerLogin from "./pages/seller/SellerLogin";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerProductForm from "./pages/seller/SellerProductForm";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerOrderDetail from "./pages/seller/SellerOrderDetail";
import SellerCategories from "./pages/seller/SellerCategories";
import SellerSettings from "./pages/seller/SellerSettings";

import LandingPage from "./pages/LandingPage";

// Super Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStores from "./pages/admin/AdminStores";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Storefront */}
          <Route path="/:storeSlug" element={<Storefront />} />
          <Route path="/:storeSlug/p/:productSlug" element={<ProductDetail />} />
          <Route path="/:storeSlug/cart" element={<CartPage />} />
          <Route path="/:storeSlug/checkout" element={<Checkout />} />
          <Route path="/:storeSlug/order/:token" element={<OrderTracking />} />
          <Route path="/:storeSlug/order-confirmation" element={<OrderConfirmation />} />

          {/* Main Admin (Platform) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/stores" element={<AdminStores />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Seller */}
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/seller/products/new" element={<SellerProductForm />} />
          <Route path="/seller/products/:id/edit" element={<SellerProductForm />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/orders/:id" element={<SellerOrderDetail />} />
          <Route path="/seller/categories" element={<SellerCategories />} />
          <Route path="/seller/settings" element={<SellerSettings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
