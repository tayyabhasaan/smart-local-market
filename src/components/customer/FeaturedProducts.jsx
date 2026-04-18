import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { allProducts } from "../../data/products";

// Show only first 8 products on homepage
const featured = allProducts.slice(0, 8);

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

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
    <section className="bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-olive">Featured Products</h2>
            <p className="text-olive/50 text-sm mt-1">
              Handpicked from stores near you
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm text-purple font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-olive/10 rounded-2xl overflow-hidden hover:shadow-md hover:border-purple/20 transition-all duration-200 group cursor-pointer"
            >
              {/* Product Image */}
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

              {/* Product Info */}
              <div className="p-3">
                <p className="text-xs text-olive/40 mb-1">{product.category}</p>

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
                  <Star size={11} className="fill-yellow-400 text-yellow-400" />
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
                    {addedId === product.id ? "✓" : <ShoppingCart size={15} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
