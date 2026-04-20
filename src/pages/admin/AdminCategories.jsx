import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

const initialCategories = [
  { id: 1,  label: "Grocery",      emoji: "🛒", stores: 12, products: 120, active: true },
  { id: 2,  label: "Pharmacy",     emoji: "💊", stores: 6,  products: 80,  active: true },
  { id: 3,  label: "Bakery",       emoji: "🍞", stores: 5,  products: 45,  active: true },
  { id: 4,  label: "Electronics",  emoji: "📱", stores: 8,  products: 200, active: true },
  { id: 5,  label: "Stationary",   emoji: "✏️", stores: 7,  products: 60,  active: true },
  { id: 6,  label: "Clothing",     emoji: "👕", stores: 9,  products: 150, active: true },
  { id: 7,  label: "Fruits & Veg", emoji: "🥦", stores: 10, products: 90,  active: true },
  { id: 8,  label: "Beverages",    emoji: "🧃", stores: 11, products: 70,  active: true },
  { id: 9,  label: "Dairy",        emoji: "🥛", stores: 8,  products: 40,  active: true },
  { id: 10, label: "Household",    emoji: "🧹", stores: 7,  products: 95,  active: true },
  { id: 11, label: "Snacks",       emoji: "🍟", stores: 13, products: 110, active: true },
  { id: 12, label: "Hair Care",    emoji: "🧴", stores: 6,  products: 55,  active: false },
];

const emptyForm = { label: "", emoji: "📦" };

export default function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal]   = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [form, setForm]             = useState(emptyForm);
  const [deleteId, setDeleteId]     = useState(null);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setEditItem(cat);
    setForm({ label: cat.label, emoji: cat.emoji });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.label.trim()) return;
    if (editItem) {
      setCategories(categories.map((c) =>
        c.id === editItem.id ? { ...c, ...form } : c
      ));
    } else {
      setCategories([...categories, {
        id: Date.now(),
        ...form,
        stores: 0,
        products: 0,
        active: true,
      }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
    setDeleteId(null);
  };

  const toggleActive = (id) => {
    setCategories(categories.map((c) =>
      c.id === id ? { ...c, active: !c.active } : c
    ));
  };

  return (
    <AdminLayout
      title="Categories"
      subtitle="Manage platform product categories"
    >
      {/* Stats + Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-3">
          {[
            { label: "Total",    value: categories.length,                          bg: "bg-white" },
            { label: "Active",   value: categories.filter(c => c.active).length,   bg: "bg-green-50" },
            { label: "Inactive", value: categories.filter(c => !c.active).length,  bg: "bg-red-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border border-olive/10 rounded-2xl px-5 py-3 text-center`}>
              <p className="text-xl font-bold text-olive">{s.value}</p>
              <p className="text-xs text-olive/50">{s.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-purple text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-purple/90 transition-colors shrink-0"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`bg-white border-2 rounded-2xl p-5 transition-all ${
              cat.active
                ? "border-olive/10 hover:border-purple/20"
                : "border-dashed border-olive/20 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              {/* Icon + Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-lavender rounded-xl flex items-center justify-center text-2xl">
                  {cat.emoji}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-olive">{cat.label}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    cat.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {cat.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => openEdit(cat)}
                  className="p-1.5 text-olive/40 hover:text-purple hover:bg-lavender rounded-lg transition-colors"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => setDeleteId(cat.id)}
                  className="p-1.5 text-olive/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-cream rounded-xl px-3 py-2 text-center">
                <p className="text-base font-bold text-olive">{cat.stores}</p>
                <p className="text-xs text-olive/40">Stores</p>
              </div>
              <div className="flex-1 bg-cream rounded-xl px-3 py-2 text-center">
                <p className="text-base font-bold text-olive">{cat.products}</p>
                <p className="text-xs text-olive/40">Products</p>
              </div>
            </div>

            {/* Toggle Active */}
            <button
              onClick={() => toggleActive(cat.id)}
              className={`w-full text-xs font-medium py-2 rounded-xl transition-colors ${
                cat.active
                  ? "bg-red-50 text-red-500 hover:bg-red-100"
                  : "bg-green-50 text-green-600 hover:bg-green-100"
              }`}
            >
              {cat.active ? "Deactivate Category" : "Activate Category"}
            </button>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">

            <div className="flex items-center justify-between px-6 py-4 border-b border-olive/10">
              <h3 className="text-base font-bold text-olive">
                {editItem ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-olive/40 hover:text-olive"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Emoji + Name */}
              <div className="flex gap-3">
                <div>
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={form.emoji}
                    onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                    className="w-16 text-center border border-olive/20 rounded-xl px-2 py-3 text-xl outline-none focus:border-purple transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    placeholder="e.g. Grocery"
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors placeholder:text-olive/30"
                  />
                </div>
              </div>

              {/* Preview */}
              {form.label && (
                <div className="bg-cream rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center text-xl">
                    {form.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-olive">{form.label}</p>
                    <p className="text-xs text-olive/40">Preview</p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-olive/10 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-olive/20 text-olive font-medium py-3 rounded-xl text-sm hover:border-olive/40 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.label.trim()}
                className="flex-1 bg-purple text-white font-medium py-3 rounded-xl text-sm hover:bg-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check size={15} />
                {editItem ? "Save Changes" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-olive mb-1">
              Delete Category?
            </h3>
            <p className="text-sm text-olive/50 mb-6">
              This will remove the category from the platform.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-olive/20 text-olive font-medium py-2.5 rounded-xl text-sm"
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

    </AdminLayout>
  );
}