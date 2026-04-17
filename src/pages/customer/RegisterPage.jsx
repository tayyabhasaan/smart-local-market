import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", form);
    // API call will go here later
  };

  return (
    <div className="min-h-screen bg-cream flex">

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-purple p-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
            <ShoppingCart size={20} color="white" />
          </div>
          <span className="font-bold text-2xl text-white">
            Dukaan<span className="text-lavender">AI</span>
          </span>
        </Link>

        {/* Center Content */}
        <div>
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Join thousands of<br />local shoppers.
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Create your free account and start discovering
            the best local stores in your area today.
          </p>

          {/* Benefits */}
          <div className="flex flex-col gap-3 mt-8">
            {[
              "🛒 Browse products from nearby stores",
              "⚡ Fast checkout with saved addresses",
              "🤖 AI-powered product recommendations",
              "💳 Multiple payment options supported",
            ].map((benefit) => (
              <p key={benefit} className="text-white/70 text-sm">
                {benefit}
              </p>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs">
          © 2025 DukaanAI. Built for Pakistan 🇵🇰
        </p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center">
              <ShoppingCart size={18} color="white" />
            </div>
            <span className="font-bold text-xl text-olive">
              Dukaan<span className="text-purple">AI</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-olive mb-1">
              Create your account
            </h1>
            <p className="text-olive/50 text-sm">
              Free forever. No credit card required.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-olive mb-1.5 block">
                Full Name
              </label>
              <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                <User size={17} className="ml-4 text-olive/40 shrink-0" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Muhammad Ali"
                  required
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
                <Mail size={17} className="ml-4 text-olive/40 shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
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
                <Phone size={17} className="ml-4 text-olive/40 shrink-0" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  required
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
                <Lock size={17} className="ml-4 text-olive/40 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-4 text-olive/40 hover:text-olive transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors mt-2"
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-olive/60 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}