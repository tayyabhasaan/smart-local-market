import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, MapPin } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-cream border-b border-olive/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center">
            <ShoppingCart size={18} color="white" />
          </div>
          <span className="text-olive font-bold text-xl tracking-tight">
            Dukaan<span className="text-purple">AI</span>
          </span>
        </Link>

        {/* Location Tag — Desktop */}
        <div className="hidden md:flex items-center gap-1 text-sm text-olive/70 bg-lavender px-3 py-1.5 rounded-full">
          <MapPin size={14} />
          <span>Lahore, PK</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-olive">
          <Link to="/" className="hover:text-purple transition-colors">
            Home
          </Link>
          <Link to="/stores" className="hover:text-purple transition-colors">
            Stores
          </Link>
          <Link to="/categories" className="hover:text-purple transition-colors">
            Categories
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/cart"
            className="relative p-2 text-olive hover:text-purple transition-colors"
          >
            <ShoppingCart size={22} />
            {/* Cart badge */}
            <span className="absolute -top-1 -right-1 bg-purple text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>

          <Link
            to="/login"
            className="bg-purple text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple/90 transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-olive"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-olive/10 px-4 py-4 flex flex-col gap-4">

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-olive/70 bg-lavender px-3 py-1.5 rounded-full w-fit">
            <MapPin size={14} />
            <span>Lahore, PK</span>
          </div>

          {/* Links */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-olive font-medium hover:text-purple transition-colors"
          >
            Home
          </Link>
          <Link
            to="/stores"
            onClick={() => setMenuOpen(false)}
            className="text-olive font-medium hover:text-purple transition-colors"
          >
            Stores
          </Link>
          <Link
            to="/categories"
            onClick={() => setMenuOpen(false)}
            className="text-olive font-medium hover:text-purple transition-colors"
          >
            Categories
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="bg-purple text-white text-sm font-medium px-4 py-2 rounded-lg text-center hover:bg-purple/90 transition-colors"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}