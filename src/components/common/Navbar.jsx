import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  MapPin,
  User,
  Package,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Stores", path: "/stores" },
  { label: "Products", path: "/products" },
  { label: "Categories", path: "/categories" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  // Simulate logged in state — will connect to auth later
  const isLoggedIn = false;
  const user = { name: "Muhammad Ali" };

  return (
    <nav className="bg-cream border-b border-olive/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center">
            <ShoppingCart size={18} color="white" />
          </div>
          <span className="text-olive font-bold text-xl tracking-tight">
            Dukaan<span className="text-purple">AI</span>
          </span>
        </Link>

        {/* Location Tag — Desktop */}
        <div className="hidden md:flex items-center gap-1 text-sm text-olive/70 bg-lavender px-3 py-1.5 rounded-full shrink-0">
          <MapPin size={14} />
          <span>Lahore, PK</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium text-olive">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-purple transition-colors ${
                location.pathname === link.path
                  ? "text-purple font-semibold"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 text-olive hover:text-purple transition-colors"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            /* User Dropdown */
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-lavender px-3 py-2 rounded-lg hover:bg-purple/10 transition-colors"
              >
                <div className="w-6 h-6 bg-purple rounded-full flex items-center justify-center text-xs text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-olive">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown size={14} className="text-olive/50" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-olive/10 rounded-2xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-olive/10">
                    <p className="text-xs font-semibold text-olive">
                      {user.name}
                    </p>
                    <p className="text-xs text-olive/40">Customer</p>
                  </div>
                  {[
                    {
                      label: "My Profile",
                      path: "/profile",
                      icon: <User size={14} />,
                    },
                    {
                      label: "My Orders",
                      path: "/orders",
                      icon: <Package size={14} />,
                    },
                    {
                      label: "My Cart",
                      path: "/cart",
                      icon: <ShoppingCart size={14} />,
                    },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-olive hover:bg-cream hover:text-purple transition-colors"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-olive/10">
                    <button className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Login / Register */
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-olive hover:text-purple transition-colors px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple/90 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-2 md:hidden">
          <Link to="/cart" className="relative p-2 text-olive">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="text-olive p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-olive/10 px-4 py-4 flex flex-col gap-1">
          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-olive/70 bg-lavender px-3 py-1.5 rounded-full w-fit mb-2">
            <MapPin size={14} />
            <span>Lahore, PK</span>
          </div>

          {/* Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`px-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === link.path
                  ? "text-purple bg-lavender"
                  : "text-olive hover:text-purple hover:bg-lavender/50"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-olive/10 pt-3 mt-1 flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-olive hover:text-purple transition-colors"
                >
                  <User size={16} /> My Profile
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-olive hover:text-purple transition-colors"
                >
                  <Package size={16} /> My Orders
                </Link>
                <button className="text-left px-2 py-2.5 text-sm font-medium text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center border border-olive/20 text-olive text-sm font-medium px-4 py-2.5 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-center bg-purple text-white text-sm font-medium px-4 py-2.5 rounded-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
