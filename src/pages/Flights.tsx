import React, { useState, useEffect, FormEvent } from "react";
import { Plane, Search, Filter, ArrowRight, Star } from "lucide-react";
import { Flight } from "../mockData";
import { formatCurrency, cn } from "../lib/utils";
import { motion } from "motion/react";

export function Flights() {
  const [flights, setFlights] = useState<any[]>([]);
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Mumbai");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [timeFilter, setTimeFilter] = useState("all");

  const fetchFlights = (source: string, dest: string, travelDate: string) => {
    setLoading(true);
    fetch(`/api/flights/search?from=${source}&to=${dest}&date=${travelDate}`)
      .then(res => res.json())
      .then(data => {
        setFlights(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFlights(from, to, date);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFlights(from, to, date);
  };

  const getSortedAndFilteredFlights = () => {
    let result = [...flights];

    // Time filtering
    if (timeFilter !== "all") {
      result = result.filter(f => {
        const hour = parseInt(f.departureTime.split(":")[0]);
        if (timeFilter === "morning") return hour >= 5 && hour < 12;
        if (timeFilter === "afternoon") return hour >= 12 && hour < 17;
        if (timeFilter === "evening") return hour >= 17 && hour < 21;
        if (timeFilter === "night") return hour >= 21 || hour < 5;
        return true;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "duration") {
        const getDurMinutes = (dur: string) => {
          const parts = dur.split(" ");
          const h = parseInt(parts[0]) || 0;
          const m = parseInt(parts[1]) || 0;
          return h * 60 + m;
        };
        return getDurMinutes(a.duration) - getDurMinutes(b.duration);
      }
      return 0;
    });

    return result;
  };

  const filteredResults = getSortedAndFilteredFlights();

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <h2 className="text-3xl font-black tracking-tight flex items-center gap-3 italic uppercase">
             <Plane className="text-orange-600 w-8 h-8" /> Sky Dashboard
           </h2>
           <div className="flex items-center gap-2">
              <span className="flex w-2 h-2 rounded-full bg-orange-600"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">2026 Season Sync Active</span>
           </div>
        </div>
        
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">From</label>
            <input 
              type="text" 
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Source City"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">To</label>
            <input 
              type="text" 
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Destination City"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>
          <div className="flex items-end">
            <button 
              type="submit"
              className="w-full px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" /> Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-50">
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sort By:</span>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                 <button 
                  onClick={() => setSortBy("price")}
                  className={cn("px-4 py-1.5 rounded-lg text-xs font-black uppercase transition", sortBy === "price" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500")}
                 >Price</button>
                 <button 
                  onClick={() => setSortBy("duration")}
                  className={cn("px-4 py-1.5 rounded-lg text-xs font-black uppercase transition", sortBy === "duration" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500")}
                 >Duration</button>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Departure:</span>
              <div className="flex flex-wrap gap-2">
                 {["all", "morning", "afternoon", "evening", "night"].map(t => (
                   <button 
                    key={t}
                    onClick={() => setTimeFilter(t)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-[9px] font-black uppercase border transition",
                      timeFilter === t ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200"
                    )}
                   >{t}</button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
            {filteredResults.length} Paths Available
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
             <Plane className="w-12 h-12 animate-bounce" />
             <p className="font-black uppercase tracking-[0.3em]">Analyzing Skyways...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredResults.map((flight: any) => (
              <motion.div 
                key={flight.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
              >
                <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                  <div className="flex items-center gap-6 w-full lg:w-64">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center p-2 shadow-inner">
                       <img src={flight.airlineLogo} alt={flight.airline} className="max-w-full h-auto grayscale group-hover:grayscale-0 transition" />
                    </div>
                    <div>
                      <p className="font-black text-xl uppercase tracking-tighter">{flight.airline}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{flight.id}</p>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-between gap-12 w-full">
                    <div className="text-center lg:text-left">
                      <p className="text-3xl font-black tracking-tighter">{flight.departureTime}</p>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{flight.source}</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center px-4">
                      <p className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">{flight.duration} • {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}</p>
                      <div className="relative w-full h-[3px] bg-slate-100 rounded-full">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 bg-white rounded-full border border-slate-100 shadow-sm">
                          <Plane className="w-4 h-4 text-orange-600 rotate-90" />
                        </div>
                      </div>
                      <span className="mt-4 text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-tighter italic">{flight.delay}</span>
                    </div>

                    <div className="text-center lg:text-right">
                      <p className="text-3xl font-black tracking-tighter">{flight.arrivalTime}</p>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{flight.destination}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center lg:items-end gap-3 w-full lg:w-64 pt-8 lg:pt-0 lg:border-l border-slate-100 lg:pl-12">
                    <div className="text-right">
                       <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-1">{formatCurrency(flight.price)}</p>
                       <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center justify-end gap-1">
                          <Star className="w-3 h-3 fill-current" /> {flight.rating} Service
                       </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1 mb-2">
                       <p className={`text-[10px] font-black uppercase tracking-widest ${flight.seats < 10 ? 'text-red-500' : 'text-slate-400'}`}>
                          {flight.seats < 10 ? '🔥 Low availability' : 'Available seats'}
                       </p>
                       <span className="text-xs font-black">{flight.seats} Seats Left</span>
                    </div>

                    <button className="w-full px-8 py-4 bg-orange-600 text-white rounded-[1.2rem] font-black uppercase tracking-[0.2em] hover:bg-orange-700 hover:scale-105 transition-all shadow-lg active:scale-95">
                      Book Seat
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
