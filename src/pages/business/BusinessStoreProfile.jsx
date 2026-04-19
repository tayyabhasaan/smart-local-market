import { useState } from "react";
import {
  Store, MapPin, Phone, Mail, Clock,
  Edit2, Check, X, Camera, Globe
} from "lucide-react";
import BusinessLayout from "../../components/business/BusinessLayout";

const initialProfile = {
  name:        "Al-Fatah General Store",
  category:    "Grocery",
  email:       "alfatah@example.com",
  phone:       "+92 300 1111111",
  address:     "House 12, Street 5, Gulberg III",
  city:        "Lahore",
  area:        "Gulberg",
  description: "Al-Fatah is one of Lahore's most trusted grocery stores, offering fresh produce, dairy, household items and much more at competitive prices.",
  openTime:    "07:00",
  closeTime:   "23:00",
  deliveryTime:"30",
  emoji:       "🏪",
};

const categories = [
  "Grocery", "Pharmacy", "Bakery", "Electronics",
  "Stationary", "Clothing", "Fruits & Veg", "Beverages",
  "Dairy", "Household", "Snacks", "Supermarket",
];

export default function BusinessStoreProfile() {
  const [profile, setProfile]   = useState(initialProfile);
  const [form, setForm]         = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved]       = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile({ ...form });
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({ ...profile });
    setEditMode(false);
  };

  return (
    <BusinessLayout
      title="My Store"
      subtitle="Manage your store profile"
    >
      {/* Success Toast */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <Check size={16} /> Store profile updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — Store Card */}
        <div className="flex flex-col gap-4">

          {/* Store Avatar */}
          <div className="bg-white border border-olive/10 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-lavender rounded-2xl flex items-center justify-center text-5xl">
                {profile.emoji}
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple rounded-full flex items-center justify-center shadow-md hover:bg-purple/90 transition-colors">
                <Camera size={14} color="white" />
              </button>
            </div>

            <h2 className="text-base font-bold text-olive mb-0.5">
              {profile.name}
            </h2>
            <p className="text-xs text-olive/50 mb-3">{profile.category}</p>

            {/* Status Badge */}
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Store Active
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 bg-lavender text-purple text-sm font-medium px-4 py-2 rounded-lg hover:bg-purple hover:text-white transition-colors w-full justify-center"
            >
              <Edit2 size={14} />
              Edit Profile
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-olive/10 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-olive mb-4">Store Stats</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Total Products", value: "45",     emoji: "📦" },
                { label: "Total Orders",   value: "128",    emoji: "🛒" },
                { label: "Rating",         value: "4.5 ⭐", emoji: "🏆" },
                { label: "Reviews",        value: "210",    emoji: "💬" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between py-2 border-b border-olive/5 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{s.emoji}</span>
                    <span className="text-sm text-olive/60">{s.label}</span>
                  </div>
                  <span className="text-sm font-bold text-olive">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-white border border-olive/10 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-olive mb-3 flex items-center gap-2">
              <Clock size={15} className="text-purple" />
              Operating Hours
            </h3>
            <div className="bg-cream rounded-xl p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-olive/50">Opens</span>
                <span className="text-sm font-bold text-olive">{profile.openTime}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-olive/50">Closes</span>
                <span className="text-sm font-bold text-olive">{profile.closeTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-olive/50">Delivery Time</span>
                <span className="text-sm font-bold text-olive">
                  ~{profile.deliveryTime} mins
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Profile Details */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Basic Info */}
          <div className="bg-white border border-olive/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-olive">
                Store Information
              </h3>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-1.5 text-xs text-purple font-medium hover:underline"
                >
                  <Edit2 size={13} /> Edit
                </button>
              )}
            </div>

            {editMode ? (
              /* Edit Form */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Store Name */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Store Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                  >
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Emoji */}
                <div>
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Store Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    name="emoji"
                    value={form.emoji}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors text-center text-xl"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                  />
                </div>

                {/* City + Area */}
                <div>
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    City
                  </label>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                  >
                    {["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"].map(
                      (c) => <option key={c}>{c}</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Area
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                  />
                </div>

                {/* Operating Hours */}
                <div>
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Opening Time
                  </label>
                  <input
                    type="time"
                    name="openTime"
                    value={form.openTime}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Closing Time
                  </label>
                  <input
                    type="time"
                    name="closeTime"
                    value={form.closeTime}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                  />
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Avg Delivery Time (mins)
                  </label>
                  <input
                    type="number"
                    name="deliveryTime"
                    value={form.deliveryTime}
                    onChange={handleChange}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-olive/50 mb-1.5 block">
                    Store Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-olive/20 rounded-xl px-3 py-3 text-sm text-olive outline-none focus:border-purple transition-colors resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="sm:col-span-2 flex gap-3 mt-2">
                  <button
                    onClick={handleCancel}
                    className="flex-1 border border-olive/20 text-olive font-medium py-3 rounded-xl text-sm hover:border-olive/40 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={15} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-purple text-white font-medium py-3 rounded-xl text-sm hover:bg-purple/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={15} /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Store Name",   value: profile.name,     icon: <Store size={14} /> },
                  { label: "Category",     value: profile.category, icon: <Globe size={14} /> },
                  { label: "Email",        value: profile.email,    icon: <Mail size={14} /> },
                  { label: "Phone",        value: profile.phone,    icon: <Phone size={14} /> },
                  { label: "Address",      value: profile.address,  icon: <MapPin size={14} /> },
                  { label: "City / Area",  value: `${profile.city} · ${profile.area}`, icon: <MapPin size={14} /> },
                ].map((field) => (
                  <div key={field.label} className="bg-cream rounded-xl px-4 py-3">
                    <p className="text-xs text-olive/40 mb-1 flex items-center gap-1.5">
                      {field.icon} {field.label}
                    </p>
                    <p className="text-sm font-semibold text-olive">{field.value}</p>
                  </div>
                ))}

                {/* Description full width */}
                <div className="sm:col-span-2 bg-cream rounded-xl px-4 py-3">
                  <p className="text-xs text-olive/40 mb-1">Description</p>
                  <p className="text-sm text-olive leading-relaxed">{profile.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BusinessLayout>
  );
}