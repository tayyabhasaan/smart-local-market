import { ShoppingCart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Nestle Milk Pack 1L",
    store: "Al-Fatah General Store",
    price: 180,
    originalPrice: 200,
    rating: 4.5,
    reviews: 120,
    category: "Dairy",
    emoji: "🥛",
    badge: "Best Seller",
    badgeColor: "bg-orange-100 text-orange-600",
  },
  {
    id: 2,
    name: "Panadol Extra (10 Tablets)",
    store: "D-Mart Pharmacy",
    price: 85,
    originalPrice: null,
    rating: 4.8,
    reviews: 340,
    category: "Medicine",
    emoji: "💊",
    badge: "Popular",
    badgeColor: "bg-lavender text-purple",
  },
  {
    id: 3,
    name: "Fresh Brown Bread",
    store: "City Bakery",
    price: 120,
    originalPrice: 140,
    rating: 4.3,
    reviews: 89,
    category: "Bakery",
    emoji: "🍞",
    badge: "Fresh",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    name: "Surf Excel 1kg",
    store: "Metro Cash & Carry",
    price: 450,
    originalPrice: 500,
    rating: 4.6,
    reviews: 210,
    category: "Household",
    emoji: "🧺",
    badge: "Sale",
    badgeColor: "bg-red-100 text-red-600",
  },
  {
    id: 5,
    name: "Lays Classic Salted",
    store: "Imtiaz Super Market",
    price: 60,
    originalPrice: null,
    rating: 4.4,
    reviews: 178,
    category: "Snacks",
    emoji: "🍟",
    badge: "Trending",
    badgeColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 6,
    name: "Dettol Handwash 250ml",
    store: "Al-Fatah General Store",
    price: 220,
    originalPrice: 250,
    rating: 4.7,
    reviews: 95,
    category: "Hygiene",
    emoji: "🧴",
    badge: "Best Seller",
    badgeColor: "bg-orange-100 text-orange-600",
  },
  {
    id: 7,
    name: "Colgate Toothpaste 100g",
    store: "D-Mart Pharmacy",
    price: 150,
    originalPrice: null,
    rating: 4.5,
    reviews: 143,
    category: "Hygiene",
    emoji: "🪥",
    badge: "Popular",
    badgeColor: "bg-lavender text-purple",
  },
  {
    id: 8,
    name: "Sunsilk Shampoo 185ml",
    store: "Metro Cash & Carry",
    price: 280,
    originalPrice: 320,
    rating: 4.2,
    reviews: 67,
    category: "Hair Care",
    emoji: "🧴",
    badge: "Sale",
    badgeColor: "bg-red-100 text-red-600",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-olive">
              Featured Products
            </h2>
            <p className="text-olive/50 text-sm mt-1">
              Handpicked from stores near you
            </p>
          </div>
          <button className="text-sm text-purple font-medium hover:underline">
            View All
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-olive/10 rounded-2xl overflow-hidden hover:shadow-md hover:border-purple/20 transition-all duration-200 group cursor-pointer"
            >
              {/* Product Image Area */}
              <div className="bg-lavender h-36 flex items-center justify-center text-5xl relative">
                {product.emoji}

                {/* Badge */}
                <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${product.badgeColor}`}>
                  {product.badge}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-3">
                {/* Category */}
                <p className="text-xs text-olive/40 mb-1">{product.category}</p>

                {/* Name */}
                <h3 className="text-sm font-semibold text-olive leading-tight mb-1 group-hover:text-purple transition-colors">
                  {product.name}
                </h3>

                {/* Store */}
                <p className="text-xs text-olive/50 mb-2 truncate">
                  📍 {product.store}
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

                {/* Price + Cart Button */}
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

                  <button className="bg-purple text-white p-2 rounded-lg hover:bg-purple/90 transition-colors">
                    <ShoppingCart size={15} />
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