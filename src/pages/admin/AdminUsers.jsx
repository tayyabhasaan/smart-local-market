import { useState } from "react";
import {
  Search, Eye, X, Shield,
  ShoppingBag, Calendar, Mail, Phone
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

const initialUsers = [
  { id: 1,  name: "Muhammad Ali Hassan", email: "ali@example.com",    phone: "+92 300 1111111", joined: "Jan 2026",  orders: 5,  spent: 2505, status: "Active",    city: "Lahore" },
  { id: 2,  name: "Fatima Khan",         email: "fatima@example.com", phone: "+92 300 2222222", joined: "Feb 2026",  orders: 7,  spent: 3850, status: "Active",    city: "Lahore" },
  { id: 3,  name: "Umar Farooq",         email: "umar@example.com",   phone: "+92 300 3333333", joined: "Jan 2026",  orders: 1,  spent: 860,  status: "Active",    city: "Lahore" },
  { id: 4,  name: "Zara Sheikh",         email: "zara@example.com",   phone: "+92 300 4444444", joined: "Mar 2026",  orders: 5,  spent: 2100, status: "Active",    city: "Lahore" },
  { id: 5,  name: "Bilal Ahmed",         email: "bilal@example.com",  phone: "+92 300 5555555", joined: "Dec 2025",  orders: 12, spent: 8400, status: "Active",    city: "Lahore" },
  { id: 6,  name: "Sara Malik",          email: "sara@example.com",   phone: "+92 300 6666666", joined: "Mar 2026",  orders: 3,  spent: 1200, status: "Active",    city: "Karachi" },
  { id: 7,  name: "Ahmed Raza",          email: "ahmed@example.com",  phone: "+92 300 7777777", joined: "Apr 2026",  orders: 2,  spent: 540,  status: "Active",    city: "Lahore" },
  { id: 8,  name: "Nadia Hussain",       email: "nadia@example.com",  phone: "+92 300 8888888", joined: "Feb 2026",  orders: 0,  spent: 0,    status: "Suspended", city: "Islamabad" },
  { id: 9,  name: "Hassan Ali",          email: "hassan@example.com", phone: "+92 300 9999999", joined: "Apr 2026",  orders: 1,  spent: 305,  status: "Active",    city: "Lahore" },
  { id: 10, name: "Ayesha Tariq",        email: "ayesha@example.com", phone: "+92 300 0000000", joined: "Jan 2026",  orders: 8,  spent: 4200, status: "Active",    city: "Lahore" },
];

const statusConfig = {
  Active:    "bg-green-100 text-green-700",
  Suspended: "bg-red-100 text-red-600",
};

const filters = ["All", "Active", "Suspended"];

export default function AdminUsers() {
  const [users, setUsers]             = useState(initialUsers);
  const [search, setSearch]           = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || u.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const toggleStatus = (id) => {
    setUsers(users.map((u) =>
      u.id === id
        ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
        : u
    ));
    if (selectedUser?.id === id) {
      setSelectedUser({
        ...selectedUser,
        status: selectedUser.status === "Active" ? "Suspended" : "Active",
      });
    }
  };

  return (
    <AdminLayout
      title="Users"
      subtitle="Manage platform customers"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Users",     value: users.length,                                          bg: "bg-white" },
          { label: "Active",          value: users.filter(u => u.status === "Active").length,       bg: "bg-green-50" },
          { label: "Suspended",       value: users.filter(u => u.status === "Suspended").length,    bg: "bg-red-50" },
          { label: "Total Orders",    value: users.reduce((s, u) => s + u.orders, 0),              bg: "bg-lavender" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border border-olive/10 rounded-2xl px-4 py-3 text-center`}>
            <p className="text-2xl font-bold text-olive">{s.value}</p>
            <p className="text-xs text-olive/50 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-5">
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

        <div className="flex items-center bg-white border border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors w-full sm:w-64">
          <Search size={15} className="ml-3 text-olive/40 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="flex-1 px-3 py-2.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-olive/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-6 px-5 py-3 text-xs font-semibold text-olive/40 uppercase tracking-wide border-b border-olive/10 bg-cream">
          <span className="col-span-2">Customer</span>
          <span className="text-center">City</span>
          <span className="text-center">Orders</span>
          <span className="text-center">Status</span>
          <span className="text-right">Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-olive font-medium">No users found</p>
          </div>
        ) : (
          filtered.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-6 px-5 py-4 border-b border-olive/5 hover:bg-cream/50 transition-colors items-center last:border-0"
            >
              {/* User */}
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-9 h-9 bg-lavender rounded-full flex items-center justify-center text-sm font-bold text-purple shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-olive truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-olive/40 truncate">{user.email}</p>
                </div>
              </div>

              {/* City */}
              <span className="text-sm text-olive/60 text-center">
                {user.city}
              </span>

              {/* Orders */}
              <span className="text-sm font-bold text-olive text-center">
                {user.orders}
              </span>

              {/* Status */}
              <div className="flex justify-center">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusConfig[user.status]}`}>
                  {user.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => toggleStatus(user.id)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    user.status === "Active"
                      ? "bg-red-50 text-red-500 hover:bg-red-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }`}
                >
                  {user.status === "Active" ? "Suspend" : "Restore"}
                </button>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="p-1.5 text-olive/40 hover:text-purple hover:bg-lavender rounded-lg transition-colors"
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-olive/10">
              <h3 className="text-base font-bold text-olive">User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-olive/40 hover:text-olive"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-5">

              {/* Avatar */}
              <div className="flex flex-col items-center mb-5">
                <div className="w-16 h-16 bg-lavender rounded-full flex items-center justify-center text-2xl font-bold text-purple mb-2">
                  {selectedUser.name.charAt(0)}
                </div>
                <h4 className="text-base font-bold text-olive">
                  {selectedUser.name}
                </h4>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${statusConfig[selectedUser.status]}`}>
                  {selectedUser.status}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-2 mb-5">
                {[
                  { icon: <Mail size={14} />,     label: selectedUser.email },
                  { icon: <Phone size={14} />,    label: selectedUser.phone },
                  { icon: <Calendar size={14} />, label: `Joined ${selectedUser.joined}` },
                  { icon: <Shield size={14} />,   label: selectedUser.city },
                ].map((d, i) => (
                  <div key={i} className="flex items-center gap-3 bg-cream rounded-xl px-3 py-2.5">
                    <span className="text-olive/40 shrink-0">{d.icon}</span>
                    <span className="text-sm text-olive">{d.label}</span>
                  </div>
                ))}
              </div>

              {/* Order Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-lavender rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-olive">{selectedUser.orders}</p>
                  <p className="text-xs text-olive/50">Total Orders</p>
                </div>
                <div className="bg-lavender rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-olive">
                    Rs. {selectedUser.spent.toLocaleString()}
                  </p>
                  <p className="text-xs text-olive/50">Total Spent</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => toggleStatus(selectedUser.id)}
                className={`w-full font-medium py-3 rounded-xl text-sm transition-colors ${
                  selectedUser.status === "Active"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {selectedUser.status === "Active"
                  ? "Suspend User"
                  : "Restore User"
                }
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}