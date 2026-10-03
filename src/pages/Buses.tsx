import React, { useState, useEffect, FormEvent } from "react";
import { Bus as BusIcon, Search, Clock, MapPin, Star, ShieldCheck } from "lucide-react";
import { Bus } from "../mockData";
import { formatCurrency, cn } from "../lib/utils";
import { motion } from "motion/react";

export function Buses() {
  const [buses, setBuses] = useState<any[]>([]);
  const [from, setFrom] = useState("Mumbai");
  const [to, setTo] = useState("Goa");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [timeFilter, setTimeFilter] = useState("all");

  const fetchBuses = (source: string, dest: string, travelDate: string) => {
    setLoading(true);
    fetch(`/api/bus/search?from=${source}&to=${dest}&date=${travelDate}`)
      .then(res => res.json())
      .then(data => {
        setBuses(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBuses(from, to, date);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBuses(from, to, date);
  };

  const getSortedAndFilteredBuses = () => {
    let result = [...buses];

    // Time filtering
    if (timeFilter !== "all") {
      result = result.filter(b => {
        const hour = parseInt(b.departureTime.split(":")[0]);
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

  const filteredResults = getSortedAndFilteredBuses();

  return (
    <div className="space-y-8">
      <div className="bg-emerald-600 text-white rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-10">
           <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="bg-white/20 p-6 rounded-[2.5rem] border border-white/20 shadow-xl backdrop-blur-md">
                 <BusIcon className="w-12 h-12" />
              </div>
              <div className="flex-1 text-center md:text-left">
                 <h2 className="text-5xl font-black tracking-tighter mb-2 italic uppercase">
                    Road Master
                 </h2>
                 <p className="text-emerald-100 text-lg font-black uppercase tracking-[0.2em] text-xs">Inter-City Highway Simulation</p>
              </div>
           </div>

           <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100 ml-2">From</label>
               <input 
                 type="text" 
                 value={from}
                 onChange={(e) => setFrom(e.target.value)}
                 className="w-full px-8 py-5 bg-white/10 border border-white/20 rounded-3xl font-black focus:ring-2 focus:ring-white outline-none transition backdrop-blur-xl placeholder:text-white/40"
                 placeholder="Source"
               />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100 ml-2">To</label>
               <input 
                 type="text" 
                 value={to}
                 onChange={(e) => setTo(e.target.value)}
                 className="w-full px-8 py-5 bg-white/10 border border-white/20 rounded-3xl font-black focus:ring-2 focus:ring-white outline-none transition backdrop-blur-xl placeholder:text-white/40"
                 placeholder="Destination"
               />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100 ml-2">Date</label>
               <input 
                 type="date" 
                 value={date}
                 onChange={(e) => setDate(e.target.value)}
                 className="w-full px-8 py-5 bg-white/10 border border-white/20 rounded-3xl font-black focus:ring-2 focus:ring-white outline-none transition backdrop-blur-xl"
               />
             </div>
             <div className="flex items-end">
               <button 
                 type="submit"
                 className="w-full px-8 py-5 bg-white text-emerald-600 rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-emerald-50 transition shadow-xl active:scale-95 text-sm"
               >
                 Find Buses
               </button>
             </div>
           </form>

           <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-black uppercase text-emerald-200 tracking-widest">Sort:</span>
                 <div className="flex bg-white/10 p-1 rounded-2xl">
                    {["price", "duration"].map(s => (
                      <button 
                       key={s}
                       onClick={() => setSortBy(s)}
                       className={cn(
                        "px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all",
                        sortBy === s ? "bg-white text-emerald-600 shadow-lg" : "text-emerald-100 hover:text-white"
                       )}
                      >{s}</button>
                    ))}
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-black uppercase text-emerald-200 tracking-widest">Departure:</span>
                 <div className="flex flex-wrap gap-2">
                    {["all", "morning", "afternoon", "evening", "night"].map(t => (
                      <button 
                       key={t}
                       onClick={() => setTimeFilter(t)}
                       className={cn(
                        "px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all",
                        timeFilter === t ? "bg-white text-emerald-600 border-white shadow-lg" : "bg-white/5 text-emerald-100 border-white/10"
                       )}
                      >{t}</button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mb-40 -ml-40"></div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-6">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredResults.length} Result Paths</p>
           <div className="h-px flex-1 mx-8 bg-slate-100"></div>
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Simulating Routes</span>
           </div>
        </div>

        {loading ? (
           <div className="py-24 flex flex-col items-center justify-center gap-6">
              <div className="flex gap-1">
                 {[0,1,2].map(i => (
                   <motion.div 
                    key={i}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-3 h-3 bg-emerald-600 rounded-full"
                   />
                 ))}
              </div>
              <p className="font-black italic uppercase tracking-[0.4em] text-slate-400 text-xs">Mapping Highways...</p>
           </div>
        ) : (
          <div className="grid gap-6">
            {filteredResults.map((bus: any) => (
              <motion.div 
                key={bus.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-100 rounded-[3rem] p-4 shadow-sm hover:shadow-2xl transition-all flex flex-col lg:flex-row gap-10 items-stretch"
              >
                <div className="flex-1 p-6 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                          <BusIcon className="w-6 h-6" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-black tracking-tighter uppercase">{bus.operator}</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{bus.type}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-900 text-white px-4 py-1 rounded-full font-black text-xs italic tracking-tighter">
                       <Star className="w-3 h-3 fill-orange-500 text-orange-500" /> {bus.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-8 border-y border-slate-50 border-dashed">
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-emerald-600 transition">
                           <Clock className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-3xl font-black tracking-tighter leading-none mb-1">{bus.departureTime}</p>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{bus.source}</p>
                        </div>
                     </div>
                     
                     <div className="flex-1 flex flex-col items-center px-10">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">{bus.duration}</p>
                        <div className="w-full h-px bg-slate-100 relative">
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-slate-100 rounded-full"></div>
                        </div>
                     </div>

                     <div className="flex items-start gap-4 text-right">
                        <div>
                           <p className="text-3xl font-black tracking-tighter leading-none mb-1">Morning</p>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{bus.destination}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                           <MapPin className="w-6 h-6" />
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                     {bus.boardingPoints.map((pt: string) => (
                       <span key={pt} className="text-[10px] font-black bg-slate-50 text-slate-500 px-4 py-2 rounded-xl border border-slate-100 uppercase tracking-tight">{pt}</span>
                     ))}
                  </div>
                </div>

                <div className="w-full lg:w-72 bg-slate-50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6">
                   <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Final Price</p>
                      <p className="text-5xl font-black text-slate-900 tracking-tighter">{formatCurrency(bus.price)}</p>
                   </div>

                   <div className="flex flex-col items-center gap-1">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${bus.seats < 5 ? 'text-red-500' : 'text-emerald-600'}`}>
                         {bus.seats < 5 ? '🔥 Fast Filling' : 'Available'}
                      </span>
                      <p className="text-[10px] font-black text-slate-400">{bus.seats} Seats Left</p>
                   </div>
                   
                   <button className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-emerald-600 transition shadow-xl active:scale-95 text-xs uppercase tracking-[0.2em]">
                      Pick Seats
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
