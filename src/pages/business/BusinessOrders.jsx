import { useState } from "react";
import {
  Search, Filter, Eye, ChevronDown,
  Clock, CheckCircle, X, TrendingUp,
  MapPin, Phone, Package
} from "lucide-react";
import BusinessLayout from "../../components/business/BusinessLayout";

const initialOrders = [
  {
    id: "#DK10234",
    customer: "Ali Hassan",
    phone: "+92 300 1111111",
    address: "House 12, Street 5, Gulberg, Lahore",
    items: [
      { name: "Nestle Milk Pack 1L", qty: 2, price: 180, emoji: "🥛" },
      { name: "Surf Excel 1kg",      qty: 1, price: 450, emoji: "🧺" },
    ],
    total: 860,
    payment: "Cash on Delivery",
    status: "Pending",
    date: "19 Apr 2026",
    time: "5 min ago",
  },
  {
    id: "#DK10233",
    customer: "Sara Khan",
    phone: "+92 300 2222222",
    address: "Flat 3B, DHA Phase 5, Lahore",
    items: [
      { name: "Fresh Brown Bread", qty: 2, price: 120, emoji: "🍞" },
    ],
    total: 290,
    payment: "JazzCash",
    status: "Processing",
    date: "19 Apr 2026",
    time: "22 min ago",
  },
  {
    id: "#DK10232",
    customer: "Umar Farooq",
    phone: "+92 300 3333333",
    address: "Plot 45, Johar Town, Lahore",
    items: [
      { name: "Lays Classic Salted",   qty: 5, price: 60,  emoji: "🍟" },
      { name: "Colgate Toothpaste",    qty: 2, price: 150, emoji: "🪥" },
      { name: "Dettol Handwash 250ml", qty: 1, price: 220, emoji: "🧴" },
    ],
    total: 1020,
    payment: "Easypaisa",
    status: "Delivered",
    date: "18 Apr 2026",
    time: "1 hr ago",
  },
  {
    id: "#DK10231",
    customer: "Fatima Malik",
    phone: "+92 300 4444444",
    address: "House 7, Model Town, Lahore",
    items: [
      { name: "Panadol Extra", qty: 3, price: 85, emoji: "💊" },
    ],
    total: 305,
    payment: "Cash on Delivery",
    status: "Delivered",
    date: "18 Apr 2026",
    time: "2 hr ago",
  },
  {
    id: "#DK10230",
    customer: "Bilal Ahmed",
    phone: "+92 300 5555555",
    address: "Street 8, Gulberg III, Lahore",
    items: [
      { name: "Basmati Rice 5kg",   qty: 1, price: 950, emoji: "🍚" },
      { name: "Nestle Yogurt 400g", qty: 2, price: 120, emoji: "🥣" },
    ],
    total: 1240,
    payment: "Pay at Store",
    status: "Cancelled",
    date: "17 Apr 2026",
    time: "3 hr ago",
  },
  {
    id: "#DK10229",
    customer: "Zara Sheikh",
    phone: "+92 300 6666666",
    address: "House 22, Bahria Town, Lahore",
    items: [
      { name: "Sunsilk Shampoo 185ml", qty: 1, price: 280, emoji: "🧴" },
      { name: "Lays Classic Salted",   qty: 3, price: 60,  emoji: "🍟" },
    ],
    total: 510,
    payment: "JazzCash",
    status: "Pending",
    date: "17 Apr 2026",
    time: "5 hr ago",
  },
];

const statusConfig = {
  Pending:    { color: "bg-yellow-100 text-yellow-700", icon: <Clock size={12} />,       next: "Processing" },
  Processing: { color: "bg-blue-100 text-blue-700",     icon: <TrendingUp size={12} />,  next: "Delivered" },
  Delivered:  { color: "bg-green-100 text-green-700",   icon: <CheckCircle size={12} />, next: null },
  Cancelled:  { color: "bg-red-100 text-red-600",       icon: <X size={12} />,           next: null },
};

const filters = ["All", "Pending", "Processing", "Delivered", "Cancelled"];

export default function BusinessOrders() {
  const [orders, setOrders]         = useState(initialOrders);
  const [search, setSearch]         = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || o.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const cancelOrder = (orderId) => {
    updateStatus(orderId, "Cancelled");
  };

  return (
    <BusinessLayout
      title="Orders"
      subtitle="Manage and process customer orders"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Orders",  value: orders.length,                                          bg: "bg-white" },
          { label: "Pending",       value: orders.filter(o => o.status === "Pending").length,      bg: "bg-yellow-50" },
          { label: "Processing",    value: orders.filter(o => o.status === "Processing").length,   bg: "bg-blue-50" },
          { label: "Delivered",     value: orders.filter(o => o.status === "Delivered").length,    bg: "bg-green-50" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border border-olive/10 rounded-2xl px-4 py-3 text-center`}>
            <p className="text-2xl font-bold text-olive">{s.value}</p>
            <p className="text-xs text-olive/50 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-5">
        {/* Filter Pills */}
        <div className="flex gap-2 flex-wrap">
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

        {/* Search */}
        <div className="flex items-center bg-white border border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors w-full sm:w-64">
          <Search size={15} className="ml-3 text-olive/40 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="flex-1 px-3 py-2.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-olive/10 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-6 px-5 py-3 text-xs font-semibold text-olive/40 uppercase tracking-wide border-b border-olive/10 bg-cream">
          <span className="col-span-2">Customer</span>
          <span className="text-center">Items</span>
          <span className="text-center">Total</span>
          <span className="text-center">Status</span>
          <span className="text-right">Action</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-olive font-medium">No orders found</p>
          </div>
        ) : (
          filtered.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-6 px-5 py-4 border-b border-olive/5 hover:bg-cream/50 transition-colors items-center last:border-0"
            >
              {/* Customer */}
              <div className="col-span-2">
                <p className="text-sm font-semibold text-olive">{order.customer}</p>
                <p className="text-xs text-olive/40">{order.id} · {order.time}</p>
              </div>

              {/* Items */}
              <span className="text-sm text-olive/60 text-center">
                {order.items.length} item{order.items.length > 1 ? "s" : ""}
              </span>

              {/* Total */}
              <span className="text-sm font-bold text-olive text-center">
                Rs. {order.total}
              </span>

              {/* Status */}
              <div className="flex justify-center">
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusConfig[order.status].color}`}>
                  {statusConfig[order.status].icon}
                  {order.status}
                </span>
              </div>

              {/* Action */}
              <div className="flex items-center justify-end gap-2">
                {/* Quick status update */}
                {statusConfig[order.status].next && (
                  <button
                    onClick={() => updateStatus(order.id, statusConfig[order.status].next)}
                    className="text-xs bg-purple text-white px-2.5 py-1.5 rounded-lg hover:bg-purple/90 transition-colors flex items-center gap-1"
                  >
                    <ChevronDown size={11} className="-rotate-90" />
                    {statusConfig[order.status].next}
                  </button>
                )}

                {/* View Details */}
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="p-1.5 text-olive/50 hover:text-purple hover:bg-lavender rounded-lg transition-colors"
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-olive/10 sticky top-0 bg-white">
              <div>
                <h3 className="text-base font-bold text-olive">
                  Order {selectedOrder.id}
                </h3>
                <p className="text-xs text-olive/40">{selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-olive/40 hover:text-olive p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-5">

              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${statusConfig[selectedOrder.status].color}`}>
                  {statusConfig[selectedOrder.status].icon}
                  {selectedOrder.status}
                </span>
                <span className="text-xs text-olive/50">{selectedOrder.payment}</span>
              </div>

              {/* Customer Info */}
              <div className="bg-cream rounded-xl p-4">
                <p className="text-xs font-semibold text-olive/40 uppercase tracking-wide mb-3">
                  Customer Info
                </p>
                <p className="text-sm font-bold text-olive mb-2">
                  {selectedOrder.customer}
                </p>
                <div className="flex items-center gap-2 text-xs text-olive/60 mb-1.5">
                  <Phone size={12} /> {selectedOrder.phone}
                </div>
                <div className="flex items-start gap-2 text-xs text-olive/60">
                  <MapPin size={12} className="shrink-0 mt-0.5" />
                  {selectedOrder.address}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <p className="text-xs font-semibold text-olive/40 uppercase tracking-wide mb-3">
                  Order Items
                </p>
                <div className="flex flex-col gap-2">
                  {selectedOrder.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-cream rounded-xl px-3 py-2.5"
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <span className="flex-1 text-sm font-medium text-olive">
                        {item.name}
                      </span>
                      <span className="text-xs text-olive/50">x{item.qty}</span>
                      <span className="text-sm font-bold text-olive">
                        Rs. {item.price * item.qty}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between mt-3 pt-3 border-t border-olive/10">
                  <span className="text-sm font-bold text-olive">Total</span>
                  <span className="text-sm font-bold text-olive">
                    Rs. {selectedOrder.total}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              {(statusConfig[selectedOrder.status].next ||
                selectedOrder.status === "Pending") && (
                <div className="flex gap-3">
                  {selectedOrder.status === "Pending" && (
                    <button
                      onClick={() => cancelOrder(selectedOrder.id)}
                      className="flex-1 border border-red-200 text-red-500 font-medium py-3 rounded-xl text-sm hover:bg-red-50 transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                  {statusConfig[selectedOrder.status].next && (
                    <button
                      onClick={() => updateStatus(
                        selectedOrder.id,
                        statusConfig[selectedOrder.status].next
                      )}
                      className="flex-1 bg-purple text-white font-medium py-3 rounded-xl text-sm hover:bg-purple/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Package size={15} />
                      Mark as {statusConfig[selectedOrder.status].next}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </BusinessLayout>
  );
}