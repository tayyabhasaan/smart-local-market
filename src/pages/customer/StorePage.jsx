import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Phone,
  ShoppingCart,
  Search,
  Package,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useCart } from "../../context/CartContext";
import { allStores, getStoreProducts } from "../../data/stores";

export default function StorePage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [addedId, setAddedId] = useState(null);

  const store = allStores.find((s) => s.id === id);

  if (!store) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3">🏪</div>
          <p className="text-olive font-semibold">Store not found</p>
          <Link
            to="/stores"
            className="text-purple text-sm hover:underline mt-2 block"
          >
            Browse all stores
          </Link>
        </div>
      </div>
    );
  }

  const storeProducts = getStoreProducts(store.name);

  const filtered = storeProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      store: product.store.name,
      quantity: 1,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Store Banner */}
      <div className="bg-olive px-4 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Back */}
          <Link
            to="/stores"
            className="inline-flex items-center gap-1.5 text-cream/60 hover:text-cream text-sm mb-5 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Stores
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Store Icon */}
            <div className="w-20 h-20 bg-lavender rounded-2xl flex items-center justify-center text-4xl shrink-0">
              {store.emoji}
            </div>

            {/* Store Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-cream">{store.name}</h1>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${store.tagColor}`}
                >
                  {store.tag}
                </span>
              </div>

              <p className="text-cream/60 text-sm mb-3">{store.category}</p>

              {/* Meta Row */}
              <div className="flex flex-wrap gap-4 text-sm text-cream/70">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-cream">
                    {store.rating}
                  </span>
                  <span>({store.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {store.area}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {store.hours}
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={14} />
                  {store.phone}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 sm:flex-col sm:text-right">
              <div>
                <p className="text-cream font-bold text-lg">{store.distance}</p>
                <p className="text-cream/50 text-xs">Distance</p>
              </div>
              <div>
                <p className="text-cream font-bold text-lg">{store.time}</p>
                <p className="text-cream/50 text-xs">Delivery</p>
              </div>
              <div>
                <p className="text-cream font-bold text-lg">
                  {storeProducts.length}
                </p>
                <p className="text-cream/50 text-xs">Products</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-cream/60 text-sm mt-5 max-w-2xl leading-relaxed">
            {store.description}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Section Header + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-olive">
              Products from {store.name}
            </h2>
            <p className="text-olive/50 text-sm mt-0.5">
              {storeProducts.length} products available
            </p>
          </div>

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
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">
              <Package size={48} className="mx-auto text-olive/20" />
            </div>
            <p className="text-olive font-semibold">No products found</p>
            <p className="text-olive/50 text-sm mt-1">
              Try a different search term
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
                  <div className="bg-lavender h-36 flex items-center justify-center text-5xl relative">
                    {product.emoji}
                    <span
                      className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>
                  </div>
                </Link>

                <div className="p-3">
                  <p className="text-xs text-olive/40 mb-1">
                    {product.category}
                  </p>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-olive leading-tight mb-2 group-hover:text-purple transition-colors">
                      {product.name}
                    </h3>
                  </Link>

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
