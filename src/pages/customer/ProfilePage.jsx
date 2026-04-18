import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, User, Mail, Phone, MapPin,
  ShoppingBag, Heart, Settings, ChevronRight,
  Camera, Edit2, Package, Star
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const menuItems = [
  {
    group: "Shopping",
    items: [
      { icon: <Package size={17} />, label: "My Orders", desc: "Track and manage your orders", path: "/orders" },
      { icon: <Heart size={17} />, label: "Saved Items", desc: "Products you have liked", path: "/saved" },
      { icon: <ShoppingBag size={17} />, label: "My Cart", desc: "Items waiting for checkout", path: "/cart" },
    ],
  },
  {
    group: "Account",
    items: [
      { icon: <MapPin size={17} />, label: "Saved Addresses", desc: "Manage delivery addresses", path: "/addresses" },
      { icon: <Star size={17} />, label: "My Reviews", desc: "Reviews you have written", path: "/reviews" },
      { icon: <Settings size={17} />, label: "Account Settings", desc: "Password and preferences", path: "/settings" },
    ],
  },
];

const spendingData = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 850 },
  { month: "Mar", amount: 2100 },
  { month: "Apr", amount: 1505 },
];

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Muhammad Ali Hassan",
    email: "ali.hassan@example.com",
    phone: "+92 300 1234567",
    city: "Lahore",
    joined: "January 2026",
  });
  const [form, setForm] = useState({ ...profile });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile({ ...form });
    setEditMode(false);
  };

  const maxSpend = Math.max(...spendingData.map((d) => d.amount));

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="text-olive/50 hover:text-purple transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-olive">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="flex flex-col gap-4">

            {/* Avatar Card */}
            <div className="bg-white border border-olive/10 rounded-2xl p-6 flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-lavender rounded-full flex items-center justify-center text-4xl font-bold text-purple">
                  {profile.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple rounded-full flex items-center justify-center shadow-md hover:bg-purple/90 transition-colors">
                  <Camera size={14} color="white" />
                </button>
              </div>

              <h2 className="text-base font-bold text-olive mb-0.5">
                {profile.name}
              </h2>
              <p className="text-xs text-olive/50 mb-1">{profile.email}</p>
              <p className="text-xs text-olive/40">Member since {profile.joined}</p>

              {/* Edit Button */}
              <button
                onClick={() => setEditMode(!editMode)}
                className="mt-4 flex items-center gap-2 bg-lavender text-purple text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple hover:text-white transition-colors"
              >
                <Edit2 size={14} />
                {editMode ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>

            {/* Stats Card */}
            <div className="bg-white border border-olive/10 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-olive mb-4">
                My Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Orders", value: "5", emoji: "🛒" },
                  { label: "Delivered", value: "3", emoji: "✅" },
                  { label: "Reviews", value: "2", emoji: "⭐" },
                  { label: "Saved", value: "8", emoji: "❤️" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-cream rounded-xl p-3 text-center"
                  >
                    <div className="text-xl mb-1">{s.emoji}</div>
                    <p className="text-lg font-bold text-olive">{s.value}</p>
                    <p className="text-xs text-olive/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending Chart */}
            <div className="bg-white border border-olive/10 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-olive mb-4">
                Monthly Spending
              </h3>
              <div className="flex items-end gap-2 h-24">
                {spendingData.map((d) => (
                  <div
                    key={d.month}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-xs text-olive/50">
                      {Math.round(d.amount / 100) / 10}k
                    </span>
                    <div
                      className="w-full bg-purple rounded-t-md transition-all"
                      style={{ height: `${(d.amount / maxSpend) * 64}px` }}
                    />
                    <span className="text-xs text-olive/50">{d.month}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-olive/40 mt-3 text-center">
                Total spent: Rs. {spendingData.reduce((s, d) => s + d.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Edit / View Profile Info */}
            <div className="bg-white border border-olive/10 rounded-2xl p-6">
              <h3 className="text-base font-bold text-olive mb-5">
                Personal Information
              </h3>

              {editMode ? (
                /* Edit Form */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", name: "name", icon: <User size={15} />, type: "text" },
                    { label: "Email Address", name: "email", icon: <Mail size={15} />, type: "email" },
                    { label: "Phone Number", name: "phone", icon: <Phone size={15} />, type: "tel" },
                    { label: "City", name: "city", icon: <MapPin size={15} />, type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="text-xs font-medium text-olive/60 mb-1.5 block">
                        {field.label}
                      </label>
                      <div className="flex items-center bg-cream border border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                        <span className="ml-3 text-olive/40 shrink-0">{field.icon}</span>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          className="flex-1 px-3 py-3 text-sm text-olive bg-transparent outline-none"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="sm:col-span-2 flex gap-3 mt-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-purple text-white font-semibold py-3 rounded-xl hover:bg-purple/90 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setForm({ ...profile });
                        setEditMode(false);
                      }}
                      className="flex-1 border border-olive/20 text-olive font-semibold py-3 rounded-xl hover:border-olive/40 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", value: profile.name, icon: <User size={15} /> },
                    { label: "Email Address", value: profile.email, icon: <Mail size={15} /> },
                    { label: "Phone Number", value: profile.phone, icon: <Phone size={15} /> },
                    { label: "City", value: profile.city, icon: <MapPin size={15} /> },
                  ].map((field) => (
                    <div
                      key={field.label}
                      className="bg-cream rounded-xl px-4 py-3"
                    >
                      <p className="text-xs text-olive/40 mb-1 flex items-center gap-1.5">
                        {field.icon} {field.label}
                      </p>
                      <p className="text-sm font-semibold text-olive">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Groups */}
            {menuItems.map((group) => (
              <div
                key={group.group}
                className="bg-white border border-olive/10 rounded-2xl p-5"
              >
                <h3 className="text-xs font-semibold text-olive/40 uppercase tracking-wider mb-3">
                  {group.group}
                </h3>
                <div className="flex flex-col divide-y divide-olive/10">
                  {group.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="flex items-center gap-3 py-3 hover:text-purple transition-colors group"
                    >
                      <div className="w-9 h-9 bg-lavender rounded-xl flex items-center justify-center text-olive group-hover:bg-purple group-hover:text-white transition-colors shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-olive group-hover:text-purple transition-colors">
                          {item.label}
                        </p>
                        <p className="text-xs text-olive/40">{item.desc}</p>
                      </div>
                      <ChevronRight size={16} className="text-olive/30 group-hover:text-purple transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Logout */}
            <button className="w-full bg-red-50 border border-red-100 text-red-500 font-semibold py-3.5 rounded-2xl hover:bg-red-100 transition-colors text-sm">
              Logout
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}