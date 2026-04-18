import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  CheckCircle,
  Phone,
  User,
  Home,
  ChevronRight,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import { useCart } from "../../context/CartContext";

const DELIVERY_FEE = 50;

const paymentMethods = [
  {
    id: "cod",
    label: "Cash on Delivery",
    emoji: "💵",
    desc: "Pay when your order arrives",
  },
  {
    id: "jazzcash",
    label: "JazzCash",
    emoji: "💚",
    desc: "Pay via JazzCash mobile wallet",
  },
  {
    id: "easypaisa",
    label: "Easypaisa",
    emoji: "🟢",
    desc: "Pay via Easypaisa mobile wallet",
  },
  {
    id: "store",
    label: "Pay at Store",
    emoji: "🏪",
    desc: "Pay when you pick up in store",
  },
];

export default function CheckoutPage() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const grandTotal = totalPrice + DELIVERY_FEE;
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Lahore",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setStep(3);
    clearCart();
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const isOnlinePayment =
    selectedPayment === "jazzcash" || selectedPayment === "easypaisa";

  // Step indicators
  const steps = [
    { num: 1, label: "Address" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Confirm" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/cart"
            className="text-olive/50 hover:text-purple transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-olive">Checkout</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step >= s.num
                      ? "bg-purple text-white"
                      : "bg-white border-2 border-olive/20 text-olive/40"
                  }`}
                >
                  {step > s.num ? <CheckCircle size={18} /> : s.num}
                </div>
                <span
                  className={`text-xs font-medium ${
                    step >= s.num ? "text-purple" : "text-olive/40"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-20 h-0.5 mb-4 mx-1 transition-colors ${
                    step > s.num ? "bg-purple" : "bg-olive/15"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 — Delivery Address */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border border-olive/10 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-olive mb-5 flex items-center gap-2">
                  <MapPin size={18} className="text-purple" />
                  Delivery Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="text-sm font-medium text-olive mb-1.5 block">
                      Full Name
                    </label>
                    <div className="flex items-center bg-cream border border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                      <User size={15} className="ml-3 text-olive/40 shrink-0" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Muhammad Ali"
                        className="flex-1 px-3 py-3 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-medium text-olive mb-1.5 block">
                      Phone Number
                    </label>
                    <div className="flex items-center bg-cream border border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                      <Phone
                        size={15}
                        className="ml-3 text-olive/40 shrink-0"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+92 300 1234567"
                        className="flex-1 px-3 py-3 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-olive mb-1.5 block">
                      Street Address
                    </label>
                    <div className="flex items-center bg-cream border border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                      <Home size={15} className="ml-3 text-olive/40 shrink-0" />
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="House #, Street, Area"
                        className="flex-1 px-3 py-3 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-sm font-medium text-olive mb-1.5 block">
                      City
                    </label>
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full bg-cream border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                    >
                      {[
                        "Lahore",
                        "Karachi",
                        "Islamabad",
                        "Rawalpindi",
                        "Faisalabad",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-sm font-medium text-olive mb-1.5 block">
                      Order Notes{" "}
                      <span className="text-olive/40 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any special instructions..."
                      className="w-full bg-cream border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors placeholder:text-olive/30"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!form.name || !form.phone || !form.address}
                  className="w-full bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <OrderSummary
              cartItems={cartItems}
              totalPrice={totalPrice}
              grandTotal={grandTotal}
              totalItems={totalItems}
            />
          </div>
        )}

        {/* Step 2 — Payment */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Payment Method Selection */}
              <div className="bg-white border border-olive/10 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-olive mb-5 flex items-center gap-2">
                  <CreditCard size={18} className="text-purple" />
                  Select Payment Method
                </h2>

                <div className="flex flex-col gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => {
                        setSelectedPayment(method.id);
                        setScreenshot(null);
                        setScreenshotPreview(null);
                      }}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        selectedPayment === method.id
                          ? "border-purple bg-lavender/40"
                          : "border-olive/15 hover:border-olive/30"
                      }`}
                    >
                      <span className="text-2xl">{method.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-olive">
                          {method.label}
                        </p>
                        <p className="text-xs text-olive/50">{method.desc}</p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedPayment === method.id
                            ? "border-purple"
                            : "border-olive/30"
                        }`}
                      >
                        {selectedPayment === method.id && (
                          <div className="w-2 h-2 bg-purple rounded-full" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Online Payment Instructions — JazzCash / Easypaisa */}
              {isOnlinePayment && (
                <div className="bg-white border border-purple/20 rounded-2xl p-6">
                  {/* Account Details */}
                  <h3 className="text-base font-bold text-olive mb-4 flex items-center gap-2">
                    <span className="text-xl">
                      {selectedPayment === "jazzcash" ? "💚" : "🟢"}
                    </span>
                    {selectedPayment === "jazzcash" ? "JazzCash" : "Easypaisa"}{" "}
                    Account Details
                  </h3>

                  <div className="bg-lavender rounded-xl p-4 mb-5">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-olive/60">
                          Account Number
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-olive tracking-wider">
                            {selectedPayment === "jazzcash"
                              ? "0300-1234567"
                              : "0333-7654321"}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                selectedPayment === "jazzcash"
                                  ? "03001234567"
                                  : "03337654321",
                              );
                            }}
                            className="text-xs bg-purple text-white px-2 py-0.5 rounded-md hover:bg-purple/90 transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-olive/60">
                          Account Name
                        </span>
                        <span className="text-sm font-bold text-olive">
                          DukaanAI Store
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-olive/60">
                          Amount to Send
                        </span>
                        <span className="text-base font-bold text-purple">
                          Rs. {totalPrice + DELIVERY_FEE}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-5">
                    <p className="text-xs font-semibold text-orange-700 mb-2">
                      ⚠️ Important Instructions
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {[
                        `Open your ${selectedPayment === "jazzcash" ? "JazzCash" : "Easypaisa"} app`,
                        `Send exactly Rs. ${totalPrice + DELIVERY_FEE} to the number above`,
                        "Take a screenshot of the confirmation",
                        "Upload the screenshot below to confirm your order",
                      ].map((instruction, i) => (
                        <li
                          key={i}
                          className="text-xs text-orange-600 flex items-start gap-2"
                        >
                          <span className="font-bold shrink-0">{i + 1}.</span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Screenshot Upload */}
                  <div>
                    <p className="text-sm font-medium text-olive mb-2">
                      Upload Payment Screenshot
                      <span className="text-red-500 ml-1">*</span>
                    </p>

                    {!screenshotPreview ? (
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-olive/25 rounded-xl p-8 cursor-pointer hover:border-purple hover:bg-lavender/20 transition-all">
                        <span className="text-3xl mb-2">📸</span>
                        <span className="text-sm font-medium text-olive">
                          Click to upload screenshot
                        </span>
                        <span className="text-xs text-olive/40 mt-1">
                          PNG, JPG up to 5MB
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotUpload}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative border-2 border-purple rounded-xl overflow-hidden">
                        <img
                          src={screenshotPreview}
                          alt="Payment screenshot"
                          className="w-full max-h-48 object-cover"
                        />
                        <button
                          onClick={() => {
                            setScreenshot(null);
                            setScreenshotPreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                        <div className="bg-green-50 border-t border-green-200 px-4 py-2 flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-500" />
                          <span className="text-xs text-green-600 font-medium">
                            Screenshot uploaded successfully
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-olive/20 text-olive font-semibold py-3.5 rounded-xl hover:border-olive/40 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isOnlinePayment && !screenshot}
                  className="flex-1 bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isOnlinePayment && !screenshot
                    ? "Upload Screenshot First"
                    : "Place Order"}
                </button>
              </div>
            </div>

            <OrderSummary
              cartItems={cartItems}
              totalPrice={totalPrice}
              grandTotal={totalPrice + DELIVERY_FEE}
              totalItems={totalItems}
            />
          </div>
        )}

        {/* Step 3 — Success */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-olive mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-olive/50 text-sm mb-2">
              Your order has been received and is being processed.
            </p>
            <p className="text-olive/50 text-sm mb-8">
              Estimated delivery:{" "}
              <span className="font-semibold text-olive">30–45 minutes</span>
            </p>

            {/* Order ID */}
            <div className="bg-lavender rounded-2xl px-8 py-4 mb-8">
              <p className="text-xs text-olive/50 mb-1">Order ID</p>
              <p className="text-lg font-bold text-purple">
                #DK{Math.floor(Math.random() * 90000) + 10000}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/"
                className="bg-purple text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple/90 transition-colors"
              >
                Back to Home
              </Link>
              <Link
                to="/orders"
                className="bg-white border border-olive/20 text-olive font-semibold px-6 py-3 rounded-xl hover:border-olive/40 transition-colors"
              >
                View Orders
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Order Summary component
function OrderSummary({ cartItems, totalPrice, grandTotal, totalItems }) {
  return (
    <div className="bg-white border border-olive/10 rounded-2xl p-5 h-fit">
      <h3 className="text-base font-bold text-olive mb-4">Order Summary</h3>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lavender rounded-lg flex items-center justify-center text-xl shrink-0">
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-olive truncate">
                {item.name}
              </p>
              <p className="text-xs text-olive/40">x{item.quantity}</p>
            </div>
            <p className="text-xs font-bold text-olive shrink-0">
              Rs. {item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-olive/10 pt-3 flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-olive/60">
          <span>Subtotal ({totalItems} items)</span>
          <span>Rs. {totalPrice}</span>
        </div>
        <div className="flex justify-between text-olive/60">
          <span>Delivery</span>
          <span>Rs. 50</span>
        </div>
        <div className="flex justify-between font-bold text-olive mt-1 pt-2 border-t border-olive/10">
          <span>Total</span>
          <span>Rs. {grandTotal}</span>
        </div>
      </div>
    </div>
  );
}
