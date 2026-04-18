import { Link } from "react-router-dom";

const categories = [
  { label: "Grocery", icon: "🛒", count: "120+ items" },
  { label: "Pharmacy", icon: "💊", count: "80+ items" },
  { label: "Bakery", icon: "🍞", count: "45+ items" },
  { label: "Electronics", icon: "📱", count: "200+ items" },
  { label: "Stationary", icon: "✏️", count: "60+ items" },
  { label: "Clothing", icon: "👕", count: "150+ items" },
  { label: "Fruits & Veg", icon: "🥦", count: "90+ items" },
  { label: "Beverages", icon: "🧃", count: "70+ items" },
];

export default function CategoriesSection() {
  return (
    <section className="bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-olive">Browse Categories</h2>
            <p className="text-olive/50 text-sm mt-1">
              Find exactly what you need
            </p>
          </div>
          <Link
            to="/categories"
            className="text-sm text-purple font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              to={`/products?category=${cat.label}`}
              className="group flex flex-col items-center gap-2 bg-white border border-olive/10 rounded-xl p-4 hover:border-purple hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-lavender rounded-xl flex items-center justify-center text-2xl group-hover:bg-purple/10 transition-colors">
                {cat.icon}
              </div>
              <span className="text-xs font-semibold text-olive group-hover:text-purple transition-colors text-center">
                {cat.label}
              </span>
              <span className="text-xs text-olive/40">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
