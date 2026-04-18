import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Package, Clock, CheckCircle,
  XCircle, TrendingUp, ChevronRight, Download
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const allOrders = [
  {
    id: "#DK10234",
    date: "18 Apr 2026",
    status: "Pending",
    store: "Al-Fatah General Store",
    items: [
      { name: "Nestle Milk Pack 1L", qty: 2, price: 180, emoji: "🥛" },
      { name: "Surf Excel 1kg", qty: 1, price: 450, emoji: "🧺" },
    ],
    total: 860,
    payment: "Cash on Delivery",
  },
  {
    id: "#DK10221",
    date: "15 Apr 2026",
    status: "Delivered",
    store: "City Bakery",
    items: [
      { name: "Fresh Brown Bread", qty: 2, price: 120, emoji: "🍞" },
    ],
    total: 290,
    payment: "JazzCash",
  },
  {
    id: "#DK10198",
    date: "10 Apr 2026",
    status: "Delivered",
    store: "D-Mart Pharmacy",
    items: [
      { name: "Panadol Extra", qty: 3, price: 85, emoji: "💊" },
      { name: "Dettol Handwash", qty: 1, price: 220, emoji: "🧴" },
    ],
    total: 525,
    payment: "Easypaisa",
  },
  {
    id: "#DK10175",
    date: "05 Apr 2026",
    status: "Cancelled",
    store: "Metro Cash & Carry",
    items: [
      { name: "Lays Classic", qty: 5, price: 60, emoji: "🍟" },
      { name: "Colgate Toothpaste", qty: 1, price: 150, emoji: "🪥" },
    ],
    total: 500,
    payment: "Cash on Delivery",
  },
  {
    id: "#DK10160",
    date: "01 Apr 2026",
    status: "Delivered",
    store: "Al-Fatah General Store",
    items: [
      { name: "Sunsilk Shampoo", qty: 1, price: 280, emoji: "🧴" },
    ],
    total: 330,
    payment: "Pay at Store",
  },
];

const statusConfig = {
  Pending: {
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock size={13} />,
  },
  Processing: {
    color: "bg-blue-100 text-blue-700",
    icon: <TrendingUp size={13} />,
  },
  Delivered: {
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle size={13} />,
  },
  Cancelled: {
    color: "bg-red-100 text-red-600",
    icon: <XCircle size={13} />,
  },
};

const filters = ["All", "Pending", "Processing", "Delivered", "Cancelled"];

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const filtered =
    activeFilter === "All"
      ? allOrders
      : allOrders.filter((o) => o.status === activeFilter);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="text-olive/50 hover:text-purple transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-olive">My Orders</h1>
            <p className="text-olive/50 text-sm">{allOrders.length} orders placed</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Orders", value: allOrders.length, emoji: "🛒" },
            { label: "Delivered", value: allOrders.filter(o => o.status === "Delivered").length, emoji: "✅" },
            { label: "Pending", value: allOrders.filter(o => o.status === "Pending").length, emoji: "⏳" },
            { label: "Cancelled", value: allOrders.filter(o => o.status === "Cancelled").length, emoji: "❌" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-olive/10 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-1">{s.emoji}</div>
              <p className="text-xl font-bold text-olive">{s.value}</p>
              <p className="text-xs text-olive/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                activeFilter === f
                  ? "bg-purple text-white"
                  : "bg-white text-olive border border-olive/20 hover:border-purple hover:text-purple"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">📦</div>
              <p className="text-olive font-semibold">No orders found</p>
              <p className="text-olive/50 text-sm mt-1">
                You have no {activeFilter.toLowerCase()} orders
              </p>
            </div>
          ) : (
            filtered.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-olive/10 rounded-2xl overflow-hidden"
              >
                {/* Order Header */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-cream transition-colors"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center">
                      <Package size={18} className="text-purple" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-olive">{order.id}</p>
                      <p className="text-xs text-olive/50">
                        {order.store} · {order.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`hidden sm:inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusConfig[order.status].color}`}>
                      {statusConfig[order.status].icon}
                      {order.status}
                    </span>
                    <p className="text-sm font-bold text-olive">
                      Rs. {order.total}
                    </p>
                    <ChevronRight
                      size={16}
                      className={`text-olive/40 transition-transform ${
                        expandedOrder === order.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrder === order.id && (
                  <div className="border-t border-olive/10 px-5 py-4">

                    {/* Status — mobile */}
                    <div className="sm:hidden mb-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusConfig[order.status].color}`}>
                        {statusConfig[order.status].icon}
                        {order.status}
                      </span>
                    </div>

                    {/* Items */}
                    <p className="text-xs font-semibold text-olive/50 uppercase tracking-wide mb-3">
                      Order Items
                    </p>
                    <div className="flex flex-col gap-2 mb-4">
                      {order.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-3 bg-cream rounded-xl px-3 py-2"
                        >
                          <span className="text-xl">{item.emoji}</span>
                          <span className="flex-1 text-sm text-olive font-medium">
                            {item.name}
                          </span>
                          <span className="text-xs text-olive/50">x{item.qty}</span>
                          <span className="text-sm font-bold text-olive">
                            Rs. {item.price * item.qty}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Meta */}
                    <div className="flex flex-wrap gap-4 text-xs text-olive/60 mb-4 pt-3 border-t border-olive/10">
                      <span>💳 {order.payment}</span>
                      <span>📅 {order.date}</span>
                      <span>🏪 {order.store}</span>
                    </div>

                    {/* Total + Actions */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-olive/50">Order Total </span>
                        <span className="text-base font-bold text-olive">
                          Rs. {order.total}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {order.status === "Delivered" && (
                          <button className="flex items-center gap-1.5 text-xs bg-lavender text-purple font-medium px-3 py-2 rounded-lg hover:bg-purple hover:text-white transition-colors">
                            <Download size={13} />
                            Invoice
                          </button>
                        )}
                        {order.status === "Pending" && (
                          <button className="text-xs bg-red-50 text-red-500 font-medium px-3 py-2 rounded-lg hover:bg-red-100 transition-colors">
                            Cancel Order
                          </button>
                        )}
                        <Link
                          to="/"
                          className="text-xs bg-purple text-white font-medium px-3 py-2 rounded-lg hover:bg-purple/90 transition-colors"
                        >
                          Reorder
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}