import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Login:", form);
    // API call will go here later
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-purple rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Shield size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Admin Portal
          </h1>
          <p className="text-white/40 text-sm">
            DukaanAI Platform Administration
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">

          {/* Warning Badge */}
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
            <Shield size={14} className="text-red-500 shrink-0" />
            <p className="text-xs text-red-600 font-medium">
              Restricted access — authorized personnel only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-olive mb-1.5 block">
                Admin Email
              </label>
              <div className="flex items-center bg-cream border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                <Mail size={16} className="ml-4 text-olive/40 shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@dukaanai.pk"
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
              <div className="flex items-center bg-cream border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                <Lock size={16} className="ml-4 text-olive/40 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  required
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors mt-2 flex items-center justify-center gap-2"
            >
              <Shield size={16} />
              Access Admin Panel
            </button>
          </form>

          {/* Back Links */}
          <div className="mt-6 pt-5 border-t border-olive/10 flex flex-col gap-2 text-center">
            <Link
              to="/login"
              className="text-sm text-olive/50 hover:text-purple transition-colors"
            >
              Customer Login →
            </Link>
            <Link
              to="/business/login"
              className="text-sm text-olive/50 hover:text-purple transition-colors"
            >
              Business Login →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-6">
          © 2025 DukaanAI · Unauthorized access is strictly prohibited
        </p>
      </div>
    </div>
  );
}