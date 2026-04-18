import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  MapPin,
  ShoppingCart,
  Plus,
  Minus,
  ArrowLeft,
  Clock,
  Shield,
  RotateCcw,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useCart } from "../../context/CartContext";
import { allProducts } from "../../data/products";

export default function ProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3">😕</div>
          <p className="text-olive font-semibold">Product not found</p>
          <Link
            to="/products"
            className="text-purple text-sm hover:underline mt-2 block"
          >
            Browse all products
          </Link>
        </div>
      </div>
    );
  }
  
  // Add this below the product lookup
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      store: product.store.name,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-olive/50 mb-6">
          <Link to="/" className="hover:text-purple transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/stores" className="hover:text-purple transition-colors">
            Stores
          </Link>
          <span>/</span>
          <span className="text-olive font-medium">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left — Product Image */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="bg-lavender rounded-2xl h-80 flex items-center justify-center text-8xl relative">
              {product.emoji}
              {discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
              <span
                className={`absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full ${product.badgeColor}`}
              >
                {product.badge}
              </span>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3">
              {[product.emoji, product.emoji, product.emoji].map((em, i) => (
                <div
                  key={i}
                  className={`w-20 h-20 bg-lavender rounded-xl flex items-center justify-center text-3xl cursor-pointer border-2 transition-colors ${
                    i === 0
                      ? "border-purple"
                      : "border-transparent hover:border-olive/30"
                  }`}
                >
                  {em}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="flex flex-col gap-4">
            {/* Category */}
            <span className="text-xs font-medium text-purple bg-lavender px-3 py-1 rounded-full w-fit">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="text-2xl font-bold text-olive leading-tight">
              {product.name}
            </h1>

            {/* Rating Row */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-olive/20"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-olive">
                {product.rating}
              </span>
              <span className="text-sm text-olive/40">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-olive">
                Rs. {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-olive/40 line-through mb-0.5">
                  Rs. {product.originalPrice}
                </span>
              )}
              {discount && (
                <span className="text-sm font-semibold text-green-600 mb-0.5">
                  {discount}% off
                </span>
              )}
            </div>

            {/* Stock */}
            <p className="text-sm text-olive/60">
              {product.stock > 10 ? (
                <span className="text-green-600 font-medium">✓ In Stock</span>
              ) : (
                <span className="text-orange-500 font-medium">
                  ⚠ Only {product.stock} left
                </span>
              )}
              <span className="ml-1">({product.stock} units available)</span>
            </p>

            {/* Store Info */}
            <div className="flex items-center gap-2 bg-white border border-olive/10 rounded-xl px-4 py-3">
              <span className="text-2xl">🏪</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-olive">
                  {product.store.name}
                </p>
                <p className="text-xs text-olive/50 flex items-center gap-1">
                  <MapPin size={11} /> {product.store.area}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-olive">
                  {product.store.rating}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <p className="text-sm font-medium text-olive mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg border-2 border-olive/20 flex items-center justify-center hover:border-purple hover:text-purple transition-colors"
                >
                  <Minus size={15} />
                </button>
                <span className="text-lg font-bold text-olive w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-9 h-9 rounded-lg border-2 border-olive/20 flex items-center justify-center hover:border-purple hover:text-purple transition-colors"
                >
                  <Plus size={15} />
                </button>
                <span className="text-sm text-olive/40 ml-1">
                  Total: Rs. {product.price * quantity}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-purple text-white hover:bg-purple/90"
                }`}
              >
                <ShoppingCart size={17} />
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button className="flex-1 bg-olive text-cream py-3.5 rounded-xl font-semibold text-sm hover:bg-olive/90 transition-colors">
                Order Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: <Shield size={14} />, label: "Secure Payment" },
                { icon: <RotateCcw size={14} />, label: "Easy Returns" },
                { icon: <Clock size={14} />, label: "Fast Delivery" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 text-xs text-olive/50"
                >
                  {badge.icon}
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description + Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 bg-white border border-olive/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-olive mb-3">
              Product Description
            </h2>
            <p className="text-sm text-olive/70 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="bg-lavender rounded-2xl p-6">
            <h2 className="text-lg font-bold text-olive mb-3">Highlights</h2>
            <ul className="flex flex-col gap-2">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-olive/70"
                >
                  <span className="text-purple mt-0.5">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-xl font-bold text-olive mb-4">
            You May Also Like
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {relatedProducts.map((rp) => (
              <Link
                to={`/product/${rp.id}`}
                key={rp.id}
                className="min-w-[160px] bg-white border border-olive/10 rounded-2xl p-4 hover:shadow-md hover:border-purple/20 transition-all group"
              >
                <div className="bg-lavender rounded-xl h-24 flex items-center justify-center text-4xl mb-3">
                  {rp.emoji}
                </div>
                <p className="text-sm font-semibold text-olive group-hover:text-purple transition-colors leading-tight mb-1">
                  {rp.name}
                </p>
                <p className="text-sm font-bold text-olive">Rs. {rp.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
