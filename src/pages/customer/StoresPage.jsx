import { useState } from "react";
import { MapPin, Star, Clock, Search, SlidersHorizontal } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { Link } from "react-router-dom";

const allStores = [
  {
    id: 1,
    name: "Al-Fatah General Store",
    category: "Grocery",
    rating: 4.5,
    reviews: 210,
    distance: "0.3 km",
    time: "15 min",
    tag: "Open Now",
    emoji: "🏪",
    tagColor: "bg-green-100 text-green-700",
    products: 120,
    area: "Gulberg",
  },
  {
    id: 2,
    name: "Metro Cash & Carry",
    category: "Supermarket",
    rating: 4.7,
    reviews: 580,
    distance: "1.2 km",
    time: "25 min",
    tag: "Popular",
    emoji: "🛍️",
    tagColor: "bg-lavender text-purple",
    products: 450,
    area: "DHA",
  },
  {
    id: 3,
    name: "Imtiaz Super Market",
    category: "Grocery",
    rating: 4.3,
    reviews: 320,
    distance: "0.8 km",
    time: "20 min",
    tag: "Open Now",
    emoji: "🏬",
    tagColor: "bg-green-100 text-green-700",
    products: 380,
    area: "Johar Town",
  },
  {
    id: 4,
    name: "D-Mart Pharmacy",
    category: "Pharmacy",
    rating: 4.6,
    reviews: 190,
    distance: "0.5 km",
    time: "10 min",
    tag: "Trending",
    emoji: "💊",
    tagColor: "bg-orange-100 text-orange-600",
    products: 85,
    area: "Gulberg",
  },
  {
    id: 5,
    name: "City Bakery",
    category: "Bakery",
    rating: 4.4,
    reviews: 145,
    distance: "0.6 km",
    time: "12 min",
    tag: "Open Now",
    emoji: "🍞",
    tagColor: "bg-green-100 text-green-700",
    products: 45,
    area: "Model Town",
  },
  {
    id: 6,
    name: "TechZone Electronics",
    category: "Electronics",
    rating: 4.2,
    reviews: 98,
    distance: "2.1 km",
    time: "30 min",
    tag: "New",
    emoji: "📱",
    tagColor: "bg-blue-100 text-blue-600",
    products: 200,
    area: "DHA",
  },
  {
    id: 7,
    name: "Green Valley Fruits",
    category: "Fruits & Veg",
    rating: 4.5,
    reviews: 167,
    distance: "0.4 km",
    time: "10 min",
    tag: "Open Now",
    emoji: "🥦",
    tagColor: "bg-green-100 text-green-700",
    products: 60,
    area: "Johar Town",
  },
  {
    id: 8,
    name: "Campus Stationary",
    category: "Stationary",
    rating: 4.1,
    reviews: 74,
    distance: "1.0 km",
    time: "18 min",
    tag: "Popular",
    emoji: "✏️",
    tagColor: "bg-lavender text-purple",
    products: 95,
    area: "Model Town",
  },
  {
    id: 9,
    name: "Style Hub Clothing",
    category: "Clothing",
    rating: 4.3,
    reviews: 112,
    distance: "1.5 km",
    time: "22 min",
    tag: "Trending",
    emoji: "👕",
    tagColor: "bg-orange-100 text-orange-600",
    products: 180,
    area: "Gulberg",
  },
];

const categories = [
  "All",
  "Grocery",
  "Pharmacy",
  "Bakery",
  "Electronics",
  "Fruits & Veg",
  "Stationary",
  "Clothing",
  "Supermarket",
];

export default function StoresPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("distance");

  const filtered = allStores
    .filter((store) => {
      const matchSearch =
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.area.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "All" || store.category === activeCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "distance")
        return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <div className="bg-olive px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-cream mb-1">
            Stores Near You
          </h1>
          <p className="text-cream/60 text-sm flex items-center gap-1">
            <MapPin size={13} /> Lahore, Pakistan — {allStores.length} stores
            found
          </p>

          {/* Search */}
          <div className="flex items-center bg-white border-2 border-transparent rounded-xl overflow-hidden mt-5 max-w-lg focus-within:border-purple transition-colors">
            <Search size={18} className="ml-4 text-olive/40 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stores or areas..."
              className="flex-1 px-3 py-3 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
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
              <option value="distance">Sort: Nearest</option>
              <option value="rating">Sort: Top Rated</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-olive/50 mb-4">
          Showing {filtered.length} store{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Store Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((store) => (
              <div
                key={store.id}
                className="bg-white border border-olive/10 rounded-2xl overflow-hidden hover:shadow-md hover:border-purple/20 transition-all duration-200 cursor-pointer group"
              >
                {/* Store Banner */}
                <div className="bg-lavender h-32 flex items-center justify-center text-5xl relative">
                  {store.emoji}
                  <span
                    className={`absolute top-3 left-3 text-xs font-medium px-2 py-0.5 rounded-full ${store.tagColor}`}
                  >
                    {store.tag}
                  </span>
                </div>

                {/* Store Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-bold text-olive group-hover:text-purple transition-colors leading-tight">
                      {store.name}
                    </h3>
                  </div>

                  <p className="text-xs text-olive/50 mb-3">
                    {store.category} · {store.area} · {store.products} products
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    <Star
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-xs font-semibold text-olive">
                      {store.rating}
                    </span>
                    <span className="text-xs text-olive/40">
                      ({store.reviews} reviews)
                    </span>
                  </div>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-olive/10">
                    <div className="flex items-center gap-1 text-xs text-olive/60">
                      <MapPin size={11} />
                      {store.distance}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-olive/60">
                      <Clock size={11} />
                      {store.time}
                    </div>
                    <Link
                      to={`/store/${store.id}`}
                      className="bg-purple text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-purple/90 transition-colors"
                    >
                      Visit Store
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-olive font-semibold mb-1">No stores found</h3>
            <p className="text-olive/50 text-sm">
              Try a different search or category
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
