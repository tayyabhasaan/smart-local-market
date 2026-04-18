import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, Tag } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useCart } from "../../context/CartContext";

const DELIVERY_FEE = 50;

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const grandTotal = totalPrice + (cartItems.length > 0 ? DELIVERY_FEE : 0);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="text-olive/50 hover:text-purple transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-olive">Your Cart</h1>
            <p className="text-olive/50 text-sm">
              {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-olive mb-2">Your cart is empty</h2>
            <p className="text-olive/50 text-sm mb-6">
              Looks like you haven't added anything yet.
            </p>
            <Link
              to="/"
              className="bg-purple text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-olive/10 rounded-2xl p-4 flex items-center gap-4"
                >
                  {/* Emoji Image */}
                  <div className="w-20 h-20 bg-lavender rounded-xl flex items-center justify-center text-4xl shrink-0">
                    {item.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-olive leading-tight mb-0.5 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-olive/50 mb-2">📍 {item.store}</p>
                    <p className="text-base font-bold text-olive">
                      Rs. {item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-olive/20 flex items-center justify-center hover:border-purple hover:text-purple transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="text-sm font-bold text-olive w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-olive/20 flex items-center justify-center hover:border-purple hover:text-purple transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-olive">
                      Rs. {item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 transition-colors mt-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link
                to="/"
                className="flex items-center gap-2 text-sm text-purple font-medium hover:underline mt-2 w-fit"
              >
                <ArrowLeft size={15} />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col gap-4">

              {/* Promo Code */}
              <div className="bg-white border border-olive/10 rounded-2xl p-4">
                <p className="text-sm font-semibold text-olive mb-3 flex items-center gap-2">
                  <Tag size={15} /> Promo Code
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 border border-olive/20 rounded-lg px-3 py-2 text-sm text-olive outline-none focus:border-purple transition-colors placeholder:text-olive/30"
                  />
                  <button className="bg-olive text-cream text-sm font-medium px-4 py-2 rounded-lg hover:bg-olive/90 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white border border-olive/10 rounded-2xl p-5">
                <h2 className="text-base font-bold text-olive mb-4">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-olive/70">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-medium text-olive">Rs. {totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-olive/70">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-olive">Rs. {DELIVERY_FEE}</span>
                  </div>
                  <div className="flex justify-between text-olive/70">
                    <span>Discount</span>
                    <span className="font-medium text-green-600">— Rs. 0</span>
                  </div>
                </div>

                <div className="border-t border-olive/10 mt-4 pt-4 flex justify-between">
                  <span className="font-bold text-olive">Total</span>
                  <span className="font-bold text-xl text-olive">
                    Rs. {grandTotal}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors mt-5 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={17} />
                  Proceed to Checkout
                </Link>

                {/* Payment Methods */}
                <div className="mt-4 pt-4 border-t border-olive/10">
                  <p className="text-xs text-olive/40 text-center mb-2">
                    We accept
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["💚 JazzCash", "🟢 Easypaisa", "💵 COD", "🏪 Pay at Store"].map(
                      (m) => (
                        <span
                          key={m}
                          className="text-xs bg-lavender text-olive px-2 py-1 rounded-full"
                        >
                          {m}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}