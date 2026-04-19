import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  AlertCircle,
  X,
  Check,
} from "lucide-react";
import BusinessLayout from "../../components/business/BusinessLayout";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialProducts = [
  {
    id: 1,
    name: "Nestle Milk Pack 1L",
    category: "Dairy",
    price: 180,
    stock: 3,
    emoji: "🥛",
    status: "Low Stock",
  },
  {
    id: 2,
    name: "Panadol Extra (10 Tabs)",
    category: "Pharmacy",
    price: 85,
    stock: 30,
    emoji: "💊",
    status: "Active",
  },
  {
    id: 3,
    name: "Fresh Brown Bread",
    category: "Bakery",
    price: 120,
    stock: 20,
    emoji: "🍞",
    status: "Active",
  },
  {
    id: 4,
    name: "Surf Excel 1kg",
    category: "Household",
    price: 450,
    stock: 2,
    emoji: "🧺",
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Lays Classic Salted",
    category: "Snacks",
    price: 60,
    stock: 60,
    emoji: "🍟",
    status: "Active",
  },
  {
    id: 6,
    name: "Dettol Handwash 250ml",
    category: "Household",
    price: 220,
    stock: 1,
    emoji: "🧴",
    status: "Low Stock",
  },
  {
    id: 7,
    name: "Colgate Toothpaste",
    category: "Hair Care",
    price: 150,
    stock: 40,
    emoji: "🪥",
    status: "Active",
  },
  {
    id: 8,
    name: "Basmati Rice 5kg",
    category: "Grocery",
    price: 950,
    stock: 0,
    emoji: "🍚",
    status: "Out of Stock",
  },
];

const categories = [
  "Grocery",
  "Dairy",
  "Bakery",
  "Pharmacy",
  "Snacks",
  "Household",
  "Hair Care",
  "Beverages",
  "Fruits & Veg",
  "Electronics",
  "Stationary",
];

const emptyForm = {
  name: "",
  category: "Grocery",
  price: "",
  stock: "",
  emoji: "📦",
  status: "Active",
};

const statusConfig = {
  Active: "bg-green-100 text-green-700",
  "Low Stock": "bg-orange-100 text-orange-600",
  "Out of Stock": "bg-red-100 text-red-600",
};

export default function BusinessProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get("status") || "All";
  const [filterStatus, setFilterStatus] = useState(initialStatus);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  // Filter products
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Open Add Modal
  const openAdd = () => {
    setEditProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  // Open Edit Modal
  const openEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      emoji: product.emoji,
      status: product.status,
    });
    setShowModal(true);
  };

  // Save product
  const handleSave = () => {
    if (!form.name || !form.price || form.stock === "") return;

    // Auto set status based on stock
    const stock = parseInt(form.stock);
    const status =
      stock === 0 ? "Out of Stock" : stock <= 5 ? "Low Stock" : "Active";

    if (editProduct) {
      setProducts(
        products.map((p) =>
          p.id === editProduct.id
            ? { ...p, ...form, price: parseInt(form.price), stock, status }
            : p,
        ),
      );
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...form,
          price: parseInt(form.price),
          stock,
          status,
        },
      ]);
    }
    setShowModal(false);
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <BusinessLayout title="Products" subtitle="Manage your store inventory">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
        {/* Search */}
        <div className="flex items-center bg-white border border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors w-full sm:w-72">
          <Search size={16} className="ml-3 text-olive/40 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-3 py-2.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm text-olive bg-white border border-olive/20 rounded-xl px-3 py-2.5 outline-none cursor-pointer"
          >
            {["All", "Active", "Low Stock", "Out of Stock"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {/* Add Product Button */}
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-purple text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-purple/90 transition-colors shrink-0"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Total Products",
            value: products.length,
            color: "bg-white",
          },
          {
            label: "Active",
            value: products.filter((p) => p.status === "Active").length,
            color: "bg-green-50",
          },
          {
            label: "Low Stock",
            value: products.filter((p) => p.status === "Low Stock").length,
            color: "bg-orange-50",
          },
          {
            label: "Out of Stock",
            value: products.filter((p) => p.status === "Out of Stock").length,
            color: "bg-red-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`${s.color} border border-olive/10 rounded-2xl px-4 py-3 text-center`}
          >
            <p className="text-2xl font-bold text-olive">{s.value}</p>
            <p className="text-xs text-olive/50 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Products Table */}
      <div className="bg-white border border-olive/10 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-6 px-5 py-3 text-xs font-semibold text-olive/40 uppercase tracking-wide border-b border-olive/10 bg-cream">
          <span className="col-span-2">Product</span>
          <span>Category</span>
          <span className="text-center">Price</span>
          <span className="text-center">Stock</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-2">📦</div>
            <p className="text-olive font-medium">No products found</p>
            <p className="text-olive/40 text-sm mt-1">Try a different search</p>
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-6 px-5 py-4 border-b border-olive/5 hover:bg-cream/50 transition-colors items-center last:border-0"
            >
              {/* Product Name */}
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center text-xl shrink-0">
                  {product.emoji}
                </div>
                <div>
                  <p className="text-sm font-semibold text-olive leading-tight">
                    {product.name}
                  </p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusConfig[product.status]}`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Category */}
              <span className="text-sm text-olive/60">{product.category}</span>

              {/* Price */}
              <span className="text-sm font-bold text-olive text-center">
                Rs. {product.price}
              </span>

              {/* Stock */}
              <div className="text-center">
                <span
                  className={`text-sm font-bold ${
                    product.stock === 0
                      ? "text-red-500"
                      : product.stock <= 5
                        ? "text-orange-500"
                        : "text-green-600"
                  }`}
                >
                  {product.stock}
                </span>
                {product.stock <= 5 && product.stock > 0 && (
                  <AlertCircle
                    size={12}
                    className="text-orange-400 inline ml-1"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => openEdit(product)}
                  className="p-2 text-olive/50 hover:text-purple hover:bg-lavender rounded-lg transition-colors"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => setDeleteId(product.id)}
                  className="p-2 text-olive/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-olive/10">
              <h3 className="text-base font-bold text-olive">
                {editProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-olive/40 hover:text-olive transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Emoji + Name */}
              <div className="flex gap-3">
                <div>
                  <label className="text-xs font-medium text-olive/60 mb-1.5 block">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={form.emoji}
                    onChange={(e) =>
                      setForm({ ...form, emoji: e.target.value })
                    }
                    className="w-16 text-center border border-olive/20 rounded-xl px-2 py-3 text-xl outline-none focus:border-purple transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-olive/60 mb-1.5 block">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Nestle Milk Pack"
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors placeholder:text-olive/30"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-medium text-olive/60 mb-1.5 block">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Price + Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-olive/60 mb-1.5 block">
                    Price (Rs.) *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="e.g. 180"
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors placeholder:text-olive/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-olive/60 mb-1.5 block">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    placeholder="e.g. 50"
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors placeholder:text-olive/30"
                  />
                </div>
              </div>

              {/* Stock hint */}
              <p className="text-xs text-olive/40 -mt-2">
                Status auto-sets: 0 = Out of Stock · 1–5 = Low Stock · 6+ =
                Active
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-olive/10 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-olive/20 text-olive font-medium py-3 rounded-xl hover:border-olive/40 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name || !form.price || form.stock === ""}
                className="flex-1 bg-purple text-white font-medium py-3 rounded-xl hover:bg-purple/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check size={16} />
                {editProduct ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-olive mb-1">
              Delete Product?
            </h3>
            <p className="text-sm text-olive/50 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-olive/20 text-olive font-medium py-2.5 rounded-xl text-sm hover:border-olive/40 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 text-white font-medium py-2.5 rounded-xl text-sm hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </BusinessLayout>
  );
}
