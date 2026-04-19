import { Link } from "react-router-dom";
import { TrendingUp, AlertCircle, Clock, CheckCircle, X } from "lucide-react";
import BusinessLayout from "../../components/business/BusinessLayout";
import { useNavigate } from "react-router-dom";


const stats = [
  {
    label: "Total Orders",
    value: "128",
    change: "+12%",
    icon: "🛒",
    positive: true,
  },
  {
    label: "Revenue",
    value: "Rs. 54,200",
    change: "+8%",
    icon: "💰",
    positive: true,
  },
  { label: "Products", value: "45", change: "+3", icon: "📦", positive: true },
  {
    label: "Low Stock",
    value: "5",
    change: "Needs attention",
    icon: "⚠️",
    positive: false,
  },
];

const recentOrders = [
  {
    id: "#DK10234",
    customer: "Ali Hassan",
    items: 3,
    total: 540,
    status: "Pending",
    time: "5 min ago",
  },
  {
    id: "#DK10233",
    customer: "Sara Khan",
    items: 1,
    total: 180,
    status: "Processing",
    time: "22 min ago",
  },
  {
    id: "#DK10232",
    customer: "Umar Farooq",
    items: 5,
    total: 1200,
    status: "Delivered",
    time: "1 hr ago",
  },
  {
    id: "#DK10231",
    customer: "Fatima Malik",
    items: 2,
    total: 360,
    status: "Delivered",
    time: "2 hr ago",
  },
  {
    id: "#DK10230",
    customer: "Bilal Ahmed",
    items: 4,
    total: 880,
    status: "Cancelled",
    time: "3 hr ago",
  },
];

const lowStockProducts = [
  { name: "Nestle Milk Pack 1L", stock: 3, emoji: "🥛" },
  { name: "Surf Excel 1kg", stock: 2, emoji: "🧺" },
  { name: "Colgate Toothpaste", stock: 4, emoji: "🪥" },
  { name: "Dettol Handwash", stock: 1, emoji: "🧴" },
  { name: "Panadol Extra", stock: 5, emoji: "💊" },
];

const statusConfig = {
  Pending: {
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock size={12} />,
  },
  Processing: {
    color: "bg-blue-100 text-blue-700",
    icon: <TrendingUp size={12} />,
  },
  Delivered: {
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle size={12} />,
  },
  Cancelled: { color: "bg-red-100 text-red-600", icon: <X size={12} /> },
};

export default function BusinessDashboard() {
  const navigate = useNavigate();

  return (
    <BusinessLayout
      title="Dashboard"
      subtitle="Welcome back, Al-Fatah Store 👋"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-olive/10 rounded-2xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.positive
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-bold text-olive">{stat.value}</p>
            <p className="text-xs text-olive/50 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white border border-olive/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-olive">Recent Orders</h2>
            <Link
              to="/business/orders"
              className="text-xs text-purple font-medium hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-5 px-3 py-2 text-xs font-medium text-olive/40 border-b border-olive/10">
              <span>Order ID</span>
              <span>Customer</span>
              <span className="text-center">Items</span>
              <span className="text-right">Total</span>
              <span className="text-right">Status</span>
            </div>

            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-5 px-3 py-3 text-sm rounded-xl hover:bg-cream transition-colors items-center"
              >
                <span className="font-medium text-olive text-xs">
                  {order.id}
                </span>
                <div>
                  <p className="text-xs font-medium text-olive truncate">
                    {order.customer}
                  </p>
                  <p className="text-xs text-olive/40">{order.time}</p>
                </div>
                <span className="text-xs text-olive/60 text-center">
                  {order.items}
                </span>
                <span className="text-xs font-bold text-olive text-right">
                  Rs. {order.total}
                </span>
                <div className="flex justify-end">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${statusConfig[order.status].color}`}
                  >
                    {statusConfig[order.status].icon}
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white border border-olive/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-olive flex items-center gap-2">
              <AlertCircle size={16} className="text-orange-500" />
              Low Stock
            </h2>
            <Link
              to="/business/products"
              className="text-xs text-purple font-medium hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {lowStockProducts.map((product) => (
              <div key={product.name} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-lavender rounded-lg flex items-center justify-center text-lg shrink-0">
                  {product.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-olive truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-olive/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-400 rounded-full"
                        style={{ width: `${(product.stock / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-orange-500 font-medium shrink-0">
                      {product.stock} left
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/business/products?status=Low Stock")}
            className="w-full mt-4 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold py-2.5 rounded-xl hover:bg-orange-100 transition-colors"
          >
            📦 Restock All Items
          </button>
        </div>
      </div>
    </BusinessLayout>
  );
}
