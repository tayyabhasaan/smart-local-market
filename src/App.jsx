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

      </Routes>
    </BrowserRouter>
  );
}