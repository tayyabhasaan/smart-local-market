import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart2,
  Store,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";

const navItems = [
  {
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
    path: "/business/dashboard",
  },
  {
    icon: <Package size={18} />,
    label: "Products",
    path: "/business/products",
  },
  {
    icon: <ShoppingBag size={18} />,
    label: "Orders",
    path: "/business/orders",
  },
  {
    icon: <BarChart2 size={18} />,
    label: "Analytics",
    path: "/business/analytics",
  },
  {
    icon: <Store size={18} />,
    label: "My Store",
    path: "/business/store-profile",
  },
];

export default function BusinessLayout({ children, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="h-screen bg-cream flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-40 bg-olive flex flex-col
          transition-all duration-300 w-56 shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-cream/10">
          <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          <span className="font-bold text-cream text-sm">DukaanAI</span>
        </div>

        {/* Store Info */}
        <div className="px-5 py-4 border-b border-cream/10">
          <p className="text-xs text-cream/40 mb-1">Logged in as</p>
          <p className="text-sm font-semibold text-cream truncate">
            Al-Fatah General Store
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            <p className="text-xs text-green-400">Store Active</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? "bg-purple text-white"
                    : "text-cream/60 hover:bg-cream/10 hover:text-cream"
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="px-3 py-4 border-t border-cream/10 flex flex-col gap-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-cream/60 hover:bg-cream/10 hover:text-cream transition-colors"
          >
            <Store size={18} className="shrink-0" />
            <span className="text-sm font-medium">View Store</span>
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-cream/60 hover:bg-red-500/20 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} className="shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-olive/10 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button
              className="md:hidden text-olive"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Page Title */}
            <div>
              <h1 className="text-base font-bold text-olive">{title}</h1>
              {subtitle && (
                <p className="text-xs text-olive/40 hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button className="relative p-2 text-olive/60 hover:text-olive transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:bg-cream px-2 py-1.5 rounded-lg transition-colors"
              >
                <div className="w-7 h-7 bg-lavender rounded-full flex items-center justify-center text-xs font-bold text-purple">
                  A
                </div>
                <span className="text-sm font-medium text-olive hidden sm:block">
                  Admin
                </span>
                <ChevronDown
                  size={14}
                  className="text-olive/50 hidden sm:block"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-olive/10 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-olive/10">
                    <p className="text-xs font-semibold text-olive">
                      Al-Fatah Store
                    </p>
                    <p className="text-xs text-olive/40">Business Admin</p>
                  </div>
                  <Link
                    to="/business/store-profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-olive hover:bg-cream transition-colors"
                  >
                    <Store size={14} /> Store Profile
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={14} /> Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
