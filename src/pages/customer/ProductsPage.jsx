import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useCart } from "../../context/CartContext";
import { allProducts as productsData } from "../../data/products.js";
console.log(productsData);

const categories = [
  "All",
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

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "popular", label: "Most Reviewed" },
];

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("default");
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      store: product.store,
      quantity: 1,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filtered = productsData
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.store.name.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        activeCategory === "All" || p.category === activeCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "popular") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <div className="bg-olive px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/"
              className="text-cream/60 hover:text-cream transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-cream">All Products</h1>
              <p className="text-cream/60 text-sm">
                {productsData.length} products from local stores near you
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center bg-white rounded-xl overflow-hidden max-w-lg focus-within:ring-2 focus-within:ring-cream/30 transition-all">
            <Search size={17} className="ml-4 text-olive/40 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or stores..."
              className="flex-1 px-3 py-3 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          {/* Category Pills — horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors shrink-0 ${
                  activeCategory === cat
                    ? "bg-purple text-white"
                    : "bg-white text-olive border border-olive/20 hover:border-purple hover:text-purple"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal size={15} className="text-olive/50" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-olive bg-white border border-olive/20 rounded-lg px-3 py-1.5 outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-olive/50 mb-4">
          Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </p>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-olive font-semibold mb-1">No products found</h3>
            <p className="text-olive/50 text-sm">
              Try a different search or category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-olive/10 rounded-2xl overflow-hidden hover:shadow-md hover:border-purple/20 transition-all duration-200 group"
              >
                {/* Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="bg-lavender h-36 flex items-center justify-center text-5xl relative cursor-pointer">
                    {product.emoji}
                    <span
                      className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>
                  </div>
                </Link>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs text-olive/40 mb-1">
                    {product.category}
                  </p>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-olive leading-tight mb-1 group-hover:text-purple transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-olive/50 mb-2 truncate">
                    📍 {product.store.name}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star
                      size={11}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-xs font-medium text-olive">
                      {product.rating}
                    </span>
                    <span className="text-xs text-olive/40">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price + Cart */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-olive">
                        Rs. {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-olive/40 line-through ml-1">
                          Rs. {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`p-2 rounded-lg transition-colors ${
                        addedId === product.id
                          ? "bg-green-500 text-white"
                          : "bg-purple text-white hover:bg-purple/90"
                      }`}
                    >
                      {addedId === product.id ? (
                        "✓"
                      ) : (
                        <ShoppingCart size={15} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
