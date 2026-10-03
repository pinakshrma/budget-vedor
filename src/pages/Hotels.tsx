import { useState, useEffect } from "react";
import { Star, MapPin, Wifi, Waves, Wind, Coffee, Search } from "lucide-react";
import { Hotel } from "../mockData";
import { formatCurrency } from "../lib/utils";
import { motion } from "motion/react";

export function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/hotels")
      .then(res => res.json())
      .then(data => setHotels(data));
  }, []);

  const filteredHotels = hotels.filter(h => 
    h.city.toLowerCase().includes(search.toLowerCase()) ||
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Stay Comfortably <span className="api-badge">GET /hotels</span>
          </h2>
          <p className="text-slate-500 font-medium">Premium hotels & heritage stays across India</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search city, neighborhood, or hotel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-3xl shadow-sm outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHotels.map((hotel) => (
          <motion.div 
            key={hotel.id}
            whileHover={{ y: -8 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col group"
          >
            <div className="relative h-64">
              <img 
                src={hotel.images[0]} 
                alt={hotel.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-sm font-bold flex items-center gap-1">
                <Star className="w-4 h-4 text-orange-500 fill-current" /> {hotel.rating}
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                 <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium">Free WiFi</span>
                 <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium">Pool</span>
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-1 text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">
                <MapPin className="w-3 h-3" /> {hotel.city}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{hotel.name}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-1">{hotel.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div>
                  <p className="text-sm text-slate-400 font-medium">Starts from</p>
                  <p className="text-2xl font-bold text-slate-900">{formatCurrency(hotel.pricePerNight)}<span className="text-sm text-slate-400 font-normal">/night</span></p>
                </div>
                <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-600 transition shadow-lg shadow-slate-200">
                  Book
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
