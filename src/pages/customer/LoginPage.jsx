import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", form);
    // API call will go here later
  };

  return (
    <div className="min-h-screen bg-cream flex">

      {/* Left Panel — Branding */}
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

        {/* Center Content */}
        <div>
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-cream leading-tight mb-4">
            Your local market,<br />now online.
          </h2>
          <p className="text-cream/60 text-base leading-relaxed max-w-sm">
            Discover stores near you, browse fresh products,
            and order from trusted local shops — all in one place.
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-8">
            {[
              { value: "50+", label: "Local Stores" },
              { value: "2k+", label: "Products" },
              { value: "1.2k+", label: "Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-cream font-bold text-xl">{stat.value}</p>
                <p className="text-cream/50 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-cream/30 text-xs">
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
              Welcome back
            </h1>
            <p className="text-olive/50 text-sm">
              Login to continue shopping locally
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-olive">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-purple hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                <Lock size={17} className="ml-4 text-olive/40 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
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
              Login
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-olive/10" />
            <span className="text-xs text-olive/40">or</span>
            <div className="flex-1 h-px bg-olive/10" />
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-olive/60">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple font-semibold hover:underline"
            >
              Create one free
            </Link>
          </p>

          {/* Business CTA */}
          <div className="mt-6 p-4 bg-lavender rounded-xl text-center">
            <p className="text-sm text-olive/70">
              Own a store?{" "}
              <Link
                to="/register-store"
                className="text-purple font-semibold hover:underline"
              >
                Register your business →
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}