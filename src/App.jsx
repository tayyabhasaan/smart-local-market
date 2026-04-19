import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/customer/HomePage";
import LoginPage from "./pages/customer/LoginPage";
import RegisterPage from "./pages/customer/RegisterPage";
import StoresPage from "./pages/customer/StoresPage";
import ProductPage from "./pages/customer/ProductPage";
import CartPage from "./pages/customer/CartPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrdersPage from "./pages/customer/OrdersPage";
import ProfilePage from "./pages/customer/ProfilePage";
import CategoriesPage from "./pages/customer/CategoriesPage";
import ProductsPage from "./pages/customer/ProductsPage";
import StorePage from "./pages/customer/StorePage";

import BusinessDashboard from "./pages/business/BusinessDashboard";
import BusinessProducts from "./pages/business/BusinessProducts";
import BusinessOrders from "./pages/business/BusinessOrders";
import BusinessAnalytics from "./pages/business/BusinessAnalytics";
import BusinessStoreProfile from "./pages/business/BusinessStoreProfile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStores from "./pages/admin/AdminStores";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/store/:id" element={<StorePage />} />

        <Route path="/business/dashboard" element={<BusinessDashboard />} />
        <Route path="/business/products" element={<BusinessProducts />} />
        <Route path="/business/orders" element={<BusinessOrders />} />
        <Route path="/business/analytics" element={<BusinessAnalytics />} />
        <Route path="/business/store-profile" element={<BusinessStoreProfile />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/stores" element={<AdminStores />} />

      </Routes>
    </BrowserRouter>
  );
}
