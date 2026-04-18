import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="bg-cream pt-12 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left — Text + Search */}
          <div className="flex-1 text-center md:text-left">
            {/* Location pill */}
            <div className="inline-flex items-center gap-1.5 bg-lavender text-olive text-sm px-3 py-1.5 rounded-full mb-5">
              <MapPin size={14} />
              <span>Serving Lahore & nearby areas</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-bold text-olive leading-tight mb-4">
              Shop Local, <span className="text-purple">Delivered</span> to Your
              Door
            </h1>

            {/* Subtext */}
            <p className="text-olive/60 text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
              Discover nearby stores, browse fresh products, and order from your
              favorite local shops — all in one place.
            </p>

            {/* Search Bar */}
            {/* <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden shadow-sm max-w-lg mx-auto md:mx-0 focus-within:border-purple transition-colors">
              <Search size={20} className="ml-4 text-olive/40 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stores or products..."
                className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
              />
              <button className="bg-purple text-white text-sm font-medium px-5 py-3.5 hover:bg-purple/90 transition-colors shrink-0">
                Search
              </button>
            </div> */}
            <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden shadow-sm max-w-lg mx-auto md:mx-0 focus-within:border-purple transition-colors">
              <Search size={20} className="ml-4 text-olive/40 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search stores or products..."
                className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
              />
              <button
                onClick={handleSearch}
                className="bg-purple text-white text-sm font-medium px-5 py-3.5 hover:bg-purple/90 transition-colors shrink-0"
              >
                Search
              </button>
            </div>

            {/* Quick Tags */}
            {["Grocery", "Pharmacy", "Bakery", "Electronics", "Stationary"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => navigate(`/products?category=${tag}`)}
                  className="text-xs bg-lavender text-olive my-2 mx-1 px-3 py-1.5 rounded-full hover:bg-purple hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ),
            )}
          </div>

          {/* Right — Illustration Card */}
          <div className="flex-1 w-full max-w-sm md:max-w-none">
            <div className="bg-lavender rounded-2xl p-6 relative">
              {/* Floating stat cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-md px-4 py-2.5 flex items-center gap-2">
                <span className="text-xl">🏪</span>
                <div>
                  <p className="text-xs text-olive/50">Stores Nearby</p>
                  <p className="text-sm font-bold text-olive">24 Active</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-md px-4 py-2.5 flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <div>
                  <p className="text-xs text-olive/50">Avg Delivery</p>
                  <p className="text-sm font-bold text-olive">30 mins</p>
                </div>
              </div>

              {/* Center Illustration */}
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="text-7xl">🛒</div>
                <p className="text-olive font-semibold text-lg text-center">
                  Your local market, online
                </p>
                <p className="text-olive/50 text-sm text-center max-w-xs">
                  Fresh products from trusted nearby stores
                </p>

                {/* Mini store pills */}
                <div className="flex gap-2 flex-wrap justify-center mt-2">
                  {["Al-Fatah", "Metro", "Imtiaz", "D-Mart"].map((store) => (
                    <span
                      key={store}
                      className="bg-white text-olive text-xs px-3 py-1 rounded-full shadow-sm font-medium"
                    >
                      {store}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Local Stores", value: "50+", icon: "🏪" },
            { label: "Products Listed", value: "2,000+", icon: "📦" },
            { label: "Happy Customers", value: "1,200+", icon: "😊" },
            { label: "Orders Delivered", value: "5,000+", icon: "🚀" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-olive/10 rounded-xl px-4 py-4 text-center shadow-sm"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className="text-xl font-bold text-olive">{stat.value}</p>
              <p className="text-xs text-olive/50 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
