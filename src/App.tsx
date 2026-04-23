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

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/${store.slug}`} replace />} />

          {/* Storefront */}
          <Route path="/:storeSlug" element={<Storefront />} />
          <Route path="/:storeSlug/p/:productSlug" element={<ProductDetail />} />
          <Route path="/:storeSlug/cart" element={<CartPage />} />
          <Route path="/:storeSlug/checkout" element={<Checkout />} />
          <Route path="/:storeSlug/order/:token" element={<OrderTracking />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<AdminProductForm />} />
          <Route path="/admin/products/:id/edit" element={<AdminProductForm />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
