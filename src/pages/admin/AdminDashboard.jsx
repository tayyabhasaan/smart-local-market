import { Link } from "react-router-dom";
import {
  Store, Users, ShoppingBag,
  TrendingUp, CheckCircle, Clock, X
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

const stats = [
  { label: "Total Stores",    value: "9",        change: "+2 this month", icon: "🏪", positive: true },
  { label: "Total Customers", value: "1,248",     change: "+48 this month",icon: "👥", positive: true },
  { label: "Total Orders",    value: "5,842",     change: "+128 today",    icon: "🛒", positive: true },
  { label: "Platform Revenue",value: "Rs. 2.4M",  change: "+12% growth",  icon: "💰", positive: true },
];

const pendingStores = [
  { id: 1, name: "Fresh Mart",        category: "Grocery",    owner: "Ahmed Khan",   date: "19 Apr 2026" },
  { id: 2, name: "MedPlus Pharmacy",  category: "Pharmacy",   owner: "Sara Ali",     date: "18 Apr 2026" },
  { id: 3, name: "Quick Electronics", category: "Electronics",owner: "Bilal Hassan", date: "17 Apr 2026" },
];

const recentUsers = [
  { name: "Muhammad Ali",   email: "ali@example.com",    joined: "Today",      orders: 3 },
  { name: "Fatima Khan",    email: "fatima@example.com", joined: "Yesterday",  orders: 7 },
  { name: "Umar Farooq",    email: "umar@example.com",   joined: "2 days ago", orders: 1 },
  { name: "Zara Sheikh",    email: "zara@example.com",   joined: "3 days ago", orders: 5 },
];

export default function AdminDashboard() {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Platform overview and statistics"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-olive/10 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-bold text-olive">{stat.value}</p>
            <p className="text-xs text-olive/50 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pending Store Approvals */}
        <div className="bg-white border border-olive/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-olive">
                Pending Approvals
              </h2>
              <p className="text-xs text-olive/40 mt-0.5">
                {pendingStores.length} stores waiting
              </p>
            </div>
            <Link
              to="/admin/stores"
              className="text-xs text-purple font-medium hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {pendingStores.map((store) => (
              <div
                key={store.id}
                className="flex items-center gap-3 p-3 bg-cream rounded-xl"
              >
                <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center text-xl shrink-0">
                  🏪
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-olive truncate">
                    {store.name}
                  </p>
                  <p className="text-xs text-olive/40">
                    {store.category} · {store.owner}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors">
                    <CheckCircle size={15} />
                  </button>
                  <button className="w-8 h-8 bg-red-100 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                    <X size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white border border-olive/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-olive">Recent Users</h2>
              <p className="text-xs text-olive/40 mt-0.5">Newly registered customers</p>
            </div>
            <Link
              to="/admin/users"
              className="text-xs text-purple font-medium hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            {/* Header */}
            <div className="grid grid-cols-3 px-3 py-2 text-xs font-semibold text-olive/40 uppercase tracking-wide border-b border-olive/10">
              <span className="col-span-2">Customer</span>
              <span className="text-right">Orders</span>
            </div>

            {recentUsers.map((user) => (
              <div
                key={user.email}
                className="grid grid-cols-3 px-3 py-3 hover:bg-cream rounded-xl transition-colors items-center"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-8 h-8 bg-lavender rounded-full flex items-center justify-center text-xs font-bold text-purple shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-olive truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-olive/40">{user.joined}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-olive text-right">
                  {user.orders}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="bg-white border border-olive/10 rounded-2xl p-5">
          <h2 className="text-base font-bold text-olive mb-4">
            Platform Health
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Active Stores",    value: "7",   icon: <Store size={16} />,      color: "bg-green-50 text-green-700" },
              { label: "Pending Stores",   value: "3",   icon: <Clock size={16} />,      color: "bg-yellow-50 text-yellow-700" },
              { label: "Active Users",     value: "1.2k",icon: <Users size={16} />,      color: "bg-blue-50 text-blue-700" },
              { label: "Orders Today",     value: "128", icon: <ShoppingBag size={16} />,color: "bg-purple-50 text-purple" },
            ].map((s) => (
              <div key={s.label} className={`${s.color} rounded-xl p-4`}>
                <div className="mb-2">{s.icon}</div>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs opacity-70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-olive/10 rounded-2xl p-5">
          <h2 className="text-base font-bold text-olive mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: "Review Pending Stores", path: "/admin/stores",     emoji: "🏪", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
              { label: "Manage Users",          path: "/admin/users",      emoji: "👥", color: "bg-blue-50 border-blue-200 text-blue-700" },
              { label: "Edit Categories",       path: "/admin/categories", emoji: "🏷️", color: "bg-green-50 border-green-200 text-green-700" },
            ].map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className={`flex items-center gap-3 p-3 border rounded-xl hover:shadow-sm transition-all ${action.color}`}
              >
                <span className="text-xl">{action.emoji}</span>
                <span className="text-sm font-medium">{action.label}</span>
                <TrendingUp size={14} className="ml-auto opacity-50" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}