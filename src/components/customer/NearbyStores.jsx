import { MapPin, Star, Clock } from "lucide-react";

const stores = [
  {
    id: 1,
    name: "Al-Fatah General Store",
    category: "Grocery",
    rating: 4.5,
    distance: "0.3 km",
    time: "15 min",
    tag: "Open Now",
    emoji: "🏪",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    name: "Metro Cash & Carry",
    category: "Supermarket",
    rating: 4.7,
    distance: "1.2 km",
    time: "25 min",
    tag: "Popular",
    emoji: "🛍️",
    tagColor: "bg-lavender text-purple",
  },
  {
    id: 3,
    name: "Imtiaz Super Market",
    category: "Grocery",
    rating: 4.3,
    distance: "0.8 km",
    time: "20 min",
    tag: "Open Now",
    emoji: "🏬",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    name: "D-Mart Pharmacy",
    category: "Pharmacy",
    rating: 4.6,
    distance: "0.5 km",
    time: "10 min",
    tag: "Trending",
    emoji: "💊",
    tagColor: "bg-orange-100 text-orange-600",
  },
  {
    id: 5,
    name: "City Bakery",
    category: "Bakery",
    rating: 4.4,
    distance: "0.6 km",
    time: "12 min",
    tag: "Open Now",
    emoji: "🍞",
    tagColor: "bg-green-100 text-green-700",
  },
];

export default function NearbyStores() {
  return (
    <section className="bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-olive">
              Stores Near You
            </h2>
            <p className="text-olive/50 text-sm mt-1 flex items-center gap-1">
              <MapPin size={13} />
              Based on your location — Lahore
            </p>
          </div>
          <button className="text-sm text-purple font-medium hover:underline">
            See All
          </button>
        </div>

        {/* Horizontal Scroll on mobile, Grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible scrollbar-hide">
          {stores.map((store) => (
            <div
              key={store.id}
              className="min-w-[220px] md:min-w-0 bg-white rounded-2xl p-4 border border-olive/10 hover:shadow-md hover:border-purple/30 transition-all duration-200 cursor-pointer flex-shrink-0"
            >
              {/* Store Icon */}
              <div className="w-full h-24 bg-lavender rounded-xl flex items-center justify-center text-4xl mb-3">
                {store.emoji}
              </div>

              {/* Tag */}
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${store.tagColor}`}>
                {store.tag}
              </span>

              {/* Name */}
              <h3 className="text-sm font-bold text-olive mt-2 leading-tight">
                {store.name}
              </h3>

              {/* Category */}
              <p className="text-xs text-olive/50 mt-0.5">{store.category}</p>

              {/* Meta Row */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-olive/10">
                {/* Rating */}
                <div className="flex items-center gap-1 text-xs text-olive/70">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{store.rating}</span>
                </div>

                {/* Distance */}
                <div className="flex items-center gap-1 text-xs text-olive/50">
                  <MapPin size={11} />
                  {store.distance}
                </div>

                {/* Time */}
                <div className="flex items-center gap-1 text-xs text-olive/50">
                  <Clock size={11} />
                  {store.time}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}