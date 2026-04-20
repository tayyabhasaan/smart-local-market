import { ShoppingCart, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-olive text-cream mt-12">

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center">
                <ShoppingCart size={18} color="white" />
              </div>
              <span className="font-bold text-xl text-cream">
                Dukaan<span className="text-lavender">AI</span>
              </span>
            </Link>

            <p className="text-cream/60 text-sm leading-relaxed mb-4">
              Connecting customers with nearby local stores.
              Shop smart, shop local.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-cream/60 text-sm">
                <MapPin size={14} />
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-cream/60 text-sm">
                <Phone size={14} />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2 text-cream/60 text-sm">
                <Mail size={14} />
                <span>support@dukaanai.pk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-cream mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "Browse Stores", to: "/stores" },
                { label: "Categories", to: "/categories" },
                { label: "My Orders", to: "/orders" },
                { label: "My Cart", to: "/cart" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-cream/60 text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h4 className="font-semibold text-cream mb-4">For Businesses</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Register Your Store", to: "/business/register" },
                { label: "Business Dashboard", to: "/business/dashboard" },
                { label: "Manage Products", to: "/business/products" },
                { label: "View Orders", to: "/business/orders" },
                { label: "Analytics", to: "/business/analytics" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-cream/60 text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment & Support */}
          <div>
            <h4 className="font-semibold text-cream mb-4">We Accept</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { label: "JazzCash", emoji: "💚" },
                { label: "Easypaisa", emoji: "🟢" },
                { label: "COD", emoji: "💵" },
                { label: "Pay at Store", emoji: "🏪" },
              ].map((method) => (
                <span
                  key={method.label}
                  className="flex items-center gap-1 bg-cream/10 text-cream text-xs px-3 py-1.5 rounded-full"
                >
                  {method.emoji} {method.label}
                </span>
              ))}
            </div>

            <h4 className="font-semibold text-cream mb-3">Support</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Help Center", to: "/help" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms of Service", to: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-cream/60 text-sm hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-cream/40 text-xs">
            © 2025 DukaanAI. All rights reserved.
          </p>
          <p className="text-cream/40 text-xs">
            Built for local businesses in Pakistan 🇵🇰
          </p>
        </div>
      </div>

    </footer>
  );
}