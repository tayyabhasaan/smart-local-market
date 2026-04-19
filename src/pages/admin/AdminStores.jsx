import { useState } from "react";
import {
  Search, CheckCircle, X, Eye,
  MapPin, Phone, Star, Filter
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

const initialStores = [
  {
    id: 1,
    name: "Al-Fatah General Store",
    category: "Grocery",
    owner: "Muhammad Fatah",
    phone: "+92 300 1111111",
    email: "alfatah@example.com",
    area: "Gulberg, Lahore",
    status: "Active",
    products: 45,
    orders: 128,
    rating: 4.5,
    joined: "Jan 2026",
    emoji: "🏪",
  },
  {
    id: 2,
    name: "Metro Cash & Carry",
    category: "Supermarket",
    owner: "Metro Admin",
    phone: "+92 300 2222222",
    email: "metro@example.com",
    area: "DHA, Lahore",
    status: "Active",
    products: 450,
    orders: 580,
    rating: 4.7,
    joined: "Dec 2025",
    emoji: "🛍️",
  },
  {
    id: 3,
    name: "D-Mart Pharmacy",
    category: "Pharmacy",
    owner: "Dr. Salman",
    phone: "+92 300 4444444",
    email: "dmart@example.com",
    area: "Gulberg, Lahore",
    status: "Active",
    products: 85,
    orders: 190,
    rating: 4.6,
    joined: "Feb 2026",
    emoji: "💊",
  },
  {
    id: 4,
    name: "Fresh Mart",
    category: "Grocery",
    owner: "Ahmed Khan",
    phone: "+92 300 5555555",
    email: "freshmart@example.com",
    area: "Johar Town, Lahore",
    status: "Pending",
    products: 0,
    orders: 0,
    rating: null,
    joined: "19 Apr 2026",
    emoji: "🥬",
  },
  {
    id: 5,
    name: "MedPlus Pharmacy",
    category: "Pharmacy",
    owner: "Sara Ali",
    phone: "+92 300 6666666",
    email: "medplus@example.com",
    area: "Model Town, Lahore",
    status: "Pending",
    products: 0,
    orders: 0,
    rating: null,
    joined: "18 Apr 2026",
    emoji: "💉",
  },
  {
    id: 6,
    name: "Quick Electronics",
    category: "Electronics",
    owner: "Bilal Hassan",
    phone: "+92 300 7777777",
    email: "quickelec@example.com",
    area: "DHA, Lahore",
    status: "Pending",
    products: 0,
    orders: 0,
    rating: null,
    joined: "17 Apr 2026",
    emoji: "📱",
  },
  {
    id: 7,
    name: "City Bakery",
    category: "Bakery",
    owner: "Bakar Ali",
    phone: "+92 300 8888888",
    email: "citybakery@example.com",
    area: "Model Town, Lahore",
    status: "Active",
    products: 45,
    orders: 145,
    rating: 4.4,
    joined: "Nov 2025",
    emoji: "🍞",
  },
  {
    id: 8,
    name: "Style Hub Clothing",
    category: "Clothing",
    owner: "Nadia Malik",
    phone: "+92 300 9999999",
    email: "stylehub@example.com",
    area: "Gulberg, Lahore",
    status: "Suspended",
    products: 180,
    orders: 112,
    rating: 4.3,
    joined: "Oct 2025",
    emoji: "👕",
  },
];

const statusConfig = {
  Active:    { color: "bg-green-100 text-green-700",  label: "Active" },
  Pending:   { color: "bg-yellow-100 text-yellow-700",label: "Pending" },
  Suspended: { color: "bg-red-100 text-red-600",      label: "Suspended" },
};

const filters = ["All", "Active", "Pending", "Suspended"];

export default function AdminStores() {
  const [stores, setStores]           = useState(initialStores);
  const [search, setSearch]           = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedStore, setSelectedStore] = useState(null);

  const filtered = stores.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.owner.toLowerCase().includes(search.toLowerCase()) ||
      s.area.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || s.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id, newStatus) => {
    setStores(stores.map((s) =>
      s.id === id ? { ...s, status: newStatus } : s
    ));
    if (selectedStore?.id === id) {
      setSelectedStore({ ...selectedStore, status: newStatus });
    }
  };

  return (
    <AdminLayout
      title="Stores"
      subtitle="Manage and approve store registrations"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Stores",  value: stores.length,                                           bg: "bg-white" },
          { label: "Active",        value: stores.filter(s => s.status === "Active").length,        bg: "bg-green-50" },
          { label: "Pending",       value: stores.filter(s => s.status === "Pending").length,       bg: "bg-yellow-50" },
          { label: "Suspended",     value: stores.filter(s => s.status === "Suspended").length,     bg: "bg-red-50" },
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
            placeholder="Search stores..."
            className="flex-1 px-3 py-2.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
          />
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white border border-olive/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-6 px-5 py-3 text-xs font-semibold text-olive/40 uppercase tracking-wide border-b border-olive/10 bg-cream">
          <span className="col-span-2">Store</span>
          <span>Category</span>
          <span className="text-center">Products</span>
          <span className="text-center">Status</span>
          <span className="text-right">Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-2">🏪</div>
            <p className="text-olive font-medium">No stores found</p>
          </div>
        ) : (
          filtered.map((store) => (
            <div
              key={store.id}
              className="grid grid-cols-6 px-5 py-4 border-b border-olive/5 hover:bg-cream/50 transition-colors items-center last:border-0"
            >
              {/* Store */}
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center text-xl shrink-0">
                  {store.emoji}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-olive truncate">
                    {store.name}
                  </p>
                  <p className="text-xs text-olive/40 truncate">{store.owner}</p>
                </div>
              </div>

              {/* Category */}
              <span className="text-sm text-olive/60">{store.category}</span>

              {/* Products */}
              <span className="text-sm text-olive/60 text-center">
                {store.products}
              </span>

              {/* Status */}
              <div className="flex justify-center">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusConfig[store.status].color}`}>
                  {store.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-1.5">
                {store.status === "Pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(store.id, "Active")}
                      className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      title="Approve"
                    >
                      <CheckCircle size={15} />
                    </button>
                    <button
                      onClick={() => updateStatus(store.id, "Suspended")}
                      className="p-1.5 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                      title="Reject"
                    >
                      <X size={15} />
                    </button>
                  </>
                )}
                {store.status === "Active" && (
                  <button
                    onClick={() => updateStatus(store.id, "Suspended")}
                    className="text-xs bg-red-50 text-red-500 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Suspend
                  </button>
                )}
                {store.status === "Suspended" && (
                  <button
                    onClick={() => updateStatus(store.id, "Active")}
                    className="text-xs bg-green-50 text-green-600 px-2.5 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    Restore
                  </button>
                )}
                <button
                  onClick={() => setSelectedStore(store)}
                  className="p-1.5 text-olive/40 hover:text-purple hover:bg-lavender rounded-lg transition-colors"
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Store Detail Modal */}
      {selectedStore && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-olive/10">
              <h3 className="text-base font-bold text-olive">Store Details</h3>
              <button
                onClick={() => setSelectedStore(null)}
                className="text-olive/40 hover:text-olive"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-5">
              {/* Store Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 bg-lavender rounded-2xl flex items-center justify-center text-4xl">
                  {selectedStore.emoji}
                </div>
                <div>
                  <h4 className="text-base font-bold text-olive">
                    {selectedStore.name}
                  </h4>
                  <p className="text-sm text-olive/50">{selectedStore.category}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${statusConfig[selectedStore.status].color}`}>
                    {selectedStore.status}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Owner",    value: selectedStore.owner },
                  { label: "Joined",   value: selectedStore.joined },
                  { label: "Phone",    value: selectedStore.phone },
                  { label: "Email",    value: selectedStore.email },
                  { label: "Area",     value: selectedStore.area },
                  { label: "Products", value: selectedStore.products },
                ].map((d) => (
                  <div key={d.label} className="bg-cream rounded-xl px-3 py-2.5">
                    <p className="text-xs text-olive/40 mb-0.5">{d.label}</p>
                    <p className="text-sm font-semibold text-olive">{d.value}</p>
                  </div>
                ))}
              </div>

              {/* Rating */}
              {selectedStore.rating && (
                <div className="flex items-center gap-2 bg-yellow-50 rounded-xl px-4 py-3 mb-5">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-olive">
                    {selectedStore.rating}
                  </span>
                  <span className="text-xs text-olive/50">
                    · {selectedStore.orders} orders
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {selectedStore.status === "Pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedStore.id, "Active")}
                      className="flex-1 bg-green-500 text-white font-medium py-3 rounded-xl text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={15} /> Approve Store
                    </button>
                    <button
                      onClick={() => updateStatus(selectedStore.id, "Suspended")}
                      className="flex-1 bg-red-500 text-white font-medium py-3 rounded-xl text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <X size={15} /> Reject
                    </button>
                  </>
                )}
                {selectedStore.status === "Active" && (
                  <button
                    onClick={() => updateStatus(selectedStore.id, "Suspended")}
                    className="flex-1 bg-red-500 text-white font-medium py-3 rounded-xl text-sm hover:bg-red-600 transition-colors"
                  >
                    Suspend Store
                  </button>
                )}
                {selectedStore.status === "Suspended" && (
                  <button
                    onClick={() => updateStatus(selectedStore.id, "Active")}
                    className="flex-1 bg-green-500 text-white font-medium py-3 rounded-xl text-sm hover:bg-green-600 transition-colors"
                  >
                    Restore Store
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}