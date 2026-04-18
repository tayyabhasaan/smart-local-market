import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const categories = [
  {
    id: 1,
    label: "Grocery",
    emoji: "🛒",
    count: 120,
    stores: 12,
    color: "bg-green-50 border-green-100",
    featured: ["Rice", "Flour", "Oil", "Sugar"],
  },
  {
    id: 2,
    label: "Pharmacy",
    emoji: "💊",
    count: 80,
    stores: 6,
    color: "bg-blue-50 border-blue-100",
    featured: ["Panadol", "Brufen", "Disprin", "Vitamins"],
  },
  {
    id: 3,
    label: "Bakery",
    emoji: "🍞",
    count: 45,
    stores: 5,
    color: "bg-orange-50 border-orange-100",
    featured: ["Bread", "Cake", "Biscuits", "Rusk"],
  },
  {
    id: 4,
    label: "Electronics",
    emoji: "📱",
    count: 200,
    stores: 8,
    color: "bg-purple-50 border-purple-100",
    featured: ["Chargers", "Earphones", "Cables", "Bulbs"],
  },
  {
    id: 5,
    label: "Stationary",
    emoji: "✏️",
    count: 60,
    stores: 7,
    color: "bg-yellow-50 border-yellow-100",
    featured: ["Pens", "Notebooks", "Files", "Markers"],
  },
  {
    id: 6,
    label: "Clothing",
    emoji: "👕",
    count: 150,
    stores: 9,
    color: "bg-pink-50 border-pink-100",
    featured: ["Shirts", "Trousers", "Shalwar Kameez", "Caps"],
  },
  {
    id: 7,
    label: "Fruits & Veg",
    emoji: "🥦",
    count: 90,
    stores: 10,
    color: "bg-lime-50 border-lime-100",
    featured: ["Tomatoes", "Onions", "Bananas", "Apples"],
  },
  {
    id: 8,
    label: "Beverages",
    emoji: "🧃",
    count: 70,
    stores: 11,
    color: "bg-cyan-50 border-cyan-100",
    featured: ["Pepsi", "Nestle Water", "Juice", "Tea"],
  },
  {
    id: 9,
    label: "Dairy",
    emoji: "🥛",
    count: 40,
    stores: 8,
    color: "bg-sky-50 border-sky-100",
    featured: ["Milk", "Yogurt", "Butter", "Cheese"],
  },
  {
    id: 10,
    label: "Household",
    emoji: "🧹",
    count: 95,
    stores: 7,
    color: "bg-stone-50 border-stone-100",
    featured: ["Detergent", "Brooms", "Dishwash", "Tissue"],
  },
  {
    id: 11,
    label: "Snacks",
    emoji: "🍟",
    count: 110,
    stores: 13,
    color: "bg-amber-50 border-amber-100",
    featured: ["Lays", "Kurkure", "Biscuits", "Chocolates"],
  },
  {
    id: 12,
    label: "Hair Care",
    emoji: "🧴",
    count: 55,
    stores: 6,
    color: "bg-rose-50 border-rose-100",
    featured: ["Shampoo", "Conditioner", "Oil", "Gel"],
  },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = categories.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <div className="bg-purple px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">All Categories</h1>
              <p className="text-white/60 text-sm">
                {categories.length} categories · 1,115+ products
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center bg-white rounded-xl overflow-hidden max-w-md focus-within:ring-2 focus-within:ring-white/30 transition-all">
            <Search size={17} className="ml-4 text-olive/40 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="flex-1 px-3 py-3 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Results count */}
        {search && (
          <p className="text-sm text-olive/50 mb-4">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-olive font-semibold">No categories found</p>
            <p className="text-olive/50 text-sm mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.label}`}
                className={`group border-2 rounded-2xl p-5 hover:border-purple hover:shadow-md transition-all duration-200 ${cat.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                    {cat.emoji}
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <p className="text-xs text-olive/40">{cat.stores} stores</p>
                    <p className="text-sm font-bold text-olive">{cat.count}+ items</p>
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-base font-bold text-olive group-hover:text-purple transition-colors mb-2">
                  {cat.label}
                </h3>

                {/* Featured tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.featured.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/70 text-olive/60 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-end mt-3">
                  <span className="text-xs text-purple font-medium group-hover:underline">
                    Browse {cat.label} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}