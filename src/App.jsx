import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/customer/HomePage";
import LoginPage from "./pages/customer/LoginPage";
import RegisterPage from "./pages/customer/RegisterPage";
import StoresPage from "./pages/customer/StoresPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/stores" element={<StoresPage />} />
      </Routes>
    </BrowserRouter>
  );
}