import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart, User, Mail, Lock, Phone,
  Store, MapPin, ChevronRight, CheckCircle,
  Eye, EyeOff, Building
} from "lucide-react";

const categories = [
  "Grocery", "Pharmacy", "Bakery", "Electronics",
  "Stationary", "Clothing", "Fruits & Veg", "Beverages",
  "Dairy", "Household", "Snacks", "Supermarket",
];

const cities = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"];

const steps = [
  { num: 1, label: "Personal Info" },
  { num: 2, label: "Store Details" },
  { num: 3, label: "Done" },
];

export default function BusinessRegister() {
  const [step, setStep]             = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm]             = useState({
    // Step 1
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    // Step 2
    storeName: "",
    category: "Grocery",
    city: "Lahore",
    area: "",
    address: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const step1Valid =
    form.ownerName && form.email && form.phone && form.password.length >= 8;

  const step2Valid =
    form.storeName && form.area && form.address;

  const handleSubmit = () => {
    console.log("Business Register:", form);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-cream flex">

      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-olive p-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-purple rounded-lg flex items-center justify-center">
            <ShoppingCart size={20} color="white" />
          </div>
          <span className="font-bold text-2xl text-cream">
            Dukaan<span className="text-lavender">AI</span>
          </span>
        </Link>

        {/* Content */}
        <div>
          <div className="text-6xl mb-6">🏪</div>
          <h2 className="text-3xl font-bold text-cream leading-tight mb-4">
            Grow your business<br />with DukaanAI
          </h2>
          <p className="text-cream/60 text-base leading-relaxed max-w-sm mb-8">
            Join hundreds of local stores already selling on DukaanAI.
            Reach more customers and manage your store digitally.
          </p>

          {/* Benefits */}
          <div className="flex flex-col gap-3">
            {[
              "🛒 Reach customers in your area",
              "📦 Easy inventory management",
              "📊 Sales analytics dashboard",
              "💳 Multiple payment methods",
              "🤖 AI-powered recommendations",
            ].map((b) => (
              <p key={b} className="text-cream/70 text-sm">{b}</p>
            ))}
          </div>
        </div>

        <p className="text-cream/30 text-xs">
          © 2025 DukaanAI. Built for Pakistan 🇵🇰
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center">
              <ShoppingCart size={18} color="white" />
            </div>
            <span className="font-bold text-xl text-olive">
              Dukaan<span className="text-purple">AI</span>
            </span>
          </Link>

          {/* Step Indicator */}
          {step < 3 && (
            <div className="flex items-center justify-center gap-0 mb-8">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step >= s.num
                        ? "bg-purple text-white"
                        : "bg-white border-2 border-olive/20 text-olive/40"
                    }`}>
                      {step > s.num ? <CheckCircle size={16} /> : s.num}
                    </div>
                    <span className={`text-xs font-medium ${
                      step >= s.num ? "text-purple" : "text-olive/40"
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mb-4 mx-1 ${
                      step > s.num ? "bg-purple" : "bg-olive/15"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Step 1 — Personal Info */}
          {step === 1 && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-olive mb-1">
                  Create your account
                </h1>
                <p className="text-olive/50 text-sm">
                  Start with your personal information
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Owner Name */}
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    Full Name
                  </label>
                  <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                    <User size={16} className="ml-4 text-olive/40 shrink-0" />
                    <input
                      type="text"
                      name="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                      placeholder="Muhammad Ali"
                      className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    Email Address
                  </label>
                  <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                    <Mail size={16} className="ml-4 text-olive/40 shrink-0" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    Phone Number
                  </label>
                  <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                    <Phone size={16} className="ml-4 text-olive/40 shrink-0" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    Password
                  </label>
                  <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                    <Lock size={16} className="ml-4 text-olive/40 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                      minLength={8}
                      className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="pr-4 text-olive/40 hover:text-olive transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!step1Valid}
                  className="w-full bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight size={17} />
                </button>
              </div>

              <p className="text-center text-sm text-olive/60 mt-6">
                Already have an account?{" "}
                <Link to="/business/login" className="text-purple font-semibold hover:underline">
                  Login here
                </Link>
              </p>
            </>
          )}

          {/* Step 2 — Store Details */}
          {step === 2 && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-olive mb-1">
                  Tell us about your store
                </h1>
                <p className="text-olive/50 text-sm">
                  This information will be shown to customers
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Store Name */}
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    Store Name
                  </label>
                  <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                    <Store size={16} className="ml-4 text-olive/40 shrink-0" />
                    <input
                      type="text"
                      name="storeName"
                      value={form.storeName}
                      onChange={handleChange}
                      placeholder="Al-Fatah General Store"
                      className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    Store Category
                  </label>
                  <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                    <Building size={16} className="ml-4 text-olive/40 shrink-0" />
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City + Area */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-olive mb-1.5 block">
                      City
                    </label>
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full bg-white border-2 border-olive/20 rounded-xl px-3 py-3.5 text-sm text-olive outline-none focus:border-purple transition-colors"
                    >
                      {cities.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-olive mb-1.5 block">
                      Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      placeholder="Gulberg"
                      className="w-full bg-white border-2 border-olive/20 rounded-xl px-3 py-3.5 text-sm text-olive outline-none focus:border-purple transition-colors placeholder:text-olive/30"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    Street Address
                  </label>
                  <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                    <MapPin size={16} className="ml-4 text-olive/40 shrink-0" />
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House #, Street, Area"
                      className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    Store Description{" "}
                    <span className="text-olive/40 font-normal">(optional)</span>
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Tell customers about your store..."
                    rows={3}
                    className="w-full bg-white border-2 border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors resize-none placeholder:text-olive/30"
                  />
                </div>

                {/* Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                  <p className="text-xs text-yellow-700">
                    ⏳ Your store will be reviewed by our admin team before going live.
                    This usually takes 24 hours.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-olive/20 text-olive font-semibold py-3.5 rounded-xl hover:border-olive/40 transition-colors text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!step2Valid}
                    className="flex-1 bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 3 — Success */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-olive mb-2">
                Application Submitted!
              </h2>
              <p className="text-olive/50 text-sm mb-2">
                Your store registration is under review.
              </p>
              <p className="text-olive/50 text-sm mb-8">
                We'll notify you at{" "}
                <span className="font-semibold text-olive">{form.email}</span>{" "}
                once approved.
              </p>

              {/* Store Summary */}
              <div className="bg-lavender rounded-2xl p-5 text-left mb-8">
                <p className="text-xs font-semibold text-olive/40 uppercase tracking-wide mb-3">
                  Submitted Store
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
                    🏪
                  </div>
                  <div>
                    <p className="text-sm font-bold text-olive">{form.storeName}</p>
                    <p className="text-xs text-olive/50">
                      {form.category} · {form.area}, {form.city}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/business/login"
                  className="w-full bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors text-sm"
                >
                  Go to Business Login
                </Link>
                <Link
                  to="/"
                  className="w-full border border-olive/20 text-olive font-semibold py-3.5 rounded-xl hover:border-olive/40 transition-colors text-sm"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}