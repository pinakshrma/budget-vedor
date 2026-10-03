import React, { useState, useEffect, FormEvent } from "react";
import { Train as TrainIcon, Search, Info, Zap } from "lucide-react";
import { Train } from "../mockData";
import { formatCurrency, cn } from "../lib/utils";
import { motion } from "motion/react";

export function Trains() {
  const [trains, setTrains] = useState<any[]>([]);
  const [from, setFrom] = useState("Jaipur");
  const [to, setTo] = useState("Delhi");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("price");
  const [timeFilter, setTimeFilter] = useState("all");

  const fetchTrains = (source: string, dest: string, travelDate: string) => {
    setLoading(true);
    fetch(`/api/trains/search?from=${source}&to=${dest}&date=${travelDate}`)
      .then(res => res.json())
      .then(data => {
        setTrains(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTrains(from, to, date);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrains(from, to, date);
  };

  const getSortedAndFilteredTrains = () => {
    let result = [...trains];

    // Time filtering
    if (timeFilter !== "all") {
      result = result.filter(t => {
        const hour = parseInt(t.departureTime.split(":")[0]);
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
      return 0;
    });

    return result;
  };

  const filteredResults = getSortedAndFilteredTrains();

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-orange-600 rounded-3xl shadow-lg rotate-[-10deg]">
                <TrainIcon className="w-8 h-8" />
             </div>
             <div>
                <h2 className="text-4xl font-black tracking-tighter uppercase italic">Bharat Express</h2>
                <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">National Rail Simulation Network</p>
             </div>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Source</label>
              <input 
                type="text" 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl font-black focus:ring-2 focus:ring-orange-600 outline-none transition backdrop-blur-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Destination</label>
              <input 
                type="text" 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl font-black focus:ring-2 focus:ring-orange-600 outline-none transition backdrop-blur-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Travel Date</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl font-black focus:ring-2 focus:ring-orange-600 outline-none transition backdrop-blur-xl"
              />
            </div>
            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full px-8 py-5 bg-orange-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-orange-700 transition shadow-xl shadow-orange-900/20 active:scale-95"
              >
                Search Trains
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10">
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Time Filter:</span>
                <div className="flex flex-wrap gap-2">
                   {["all", "morning", "afternoon", "evening", "night"].map(t => (
                     <button 
                      key={t}
                      onClick={() => setTimeFilter(t)}
                      className={cn(
                        "px-4 py-2 rounded-2xl text-[10px] font-black uppercase border transition-all",
                        timeFilter === t ? "bg-white text-slate-900 border-white" : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"
                      )}
                     >{t}</button>
                   ))}
                </div>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
           <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">{date} Schedule</h3>
           <span className="text-[10px] font-black bg-slate-100 px-4 py-2 rounded-full uppercase tracking-widest">{filteredResults.length} Filtered Results</span>
        </div>

        {loading ? (
           <div className="py-24 flex flex-col items-center justify-center gap-6">
              <div className="w-16 h-1 bg-slate-100 relative overflow-hidden rounded-full">
                 <motion.div 
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="absolute top-0 w-1/2 h-full bg-orange-600"
                 />
              </div>
              <p className="font-black italic uppercase tracking-[0.3em] text-slate-400">Synchronizing Locomotives...</p>
           </div>
        ) : (
          <div className="grid gap-8">
            {filteredResults.map((train: any) => (
              <motion.div 
                key={train.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col lg:flex-row"
              >
                <div className="p-10 lg:w-3/4 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <span className="bg-slate-900 text-white px-5 py-1 rounded-full font-black text-xs font-mono">{train.number}</span>
                       <h4 className="text-2xl font-black uppercase tracking-tighter">{train.name}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 font-black italic text-xs uppercase tracking-widest">
                       <Zap className="w-4 h-4" /> {train.delay}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-10 border-y border-slate-50 border-dashed relative">
                    <div className="relative z-10">
                      <p className="text-5xl font-black tracking-tighter mb-1">{train.departureTime}</p>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{train.source}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center px-12">
                       <div className="w-full h-px border-t border-slate-200 border-dashed relative">
                          <TrainIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-slate-200" />
                       </div>
                    </div>

                    <div className="text-right relative z-10">
                      <p className="text-5xl font-black tracking-tighter mb-1">{train.arrivalTime}</p>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{train.destination}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {train.classes.map((cls: string) => (
                       <div key={cls} className="bg-slate-50 rounded-[1.5rem] p-5 border border-slate-100 group/cls hover:bg-orange-50 hover:border-orange-100 transition-colors">
                          <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">{cls}</p>
                          <p className="font-black text-lg mb-1">{formatCurrency(train.fare[cls])}</p>
                          <div className={cn(
                            "text-[10px] font-black uppercase tracking-tighter italic",
                            train.availability[cls].includes('Available') ? "text-green-600" : "text-orange-600"
                          )}>
                            {train.availability[cls].includes('Available') ? '✅ Space Ready' : '⏳ ' + train.availability[cls]}
                          </div>
                       </div>
                     ))}
                  </div>
                </div>

                <div className="p-10 lg:w-1/4 bg-slate-50 flex flex-col justify-center items-center grow">
                   <div className="text-center mb-8">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Starting From</p>
                      <p className="text-5xl font-black text-slate-900 tracking-tighter">{formatCurrency(train.price)}</p>
                   </div>
                   
                   <button className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-colors active:scale-95 text-sm">
                     Proceed
                   </button>
                   
                   <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Info className="w-3 h-3" /> Booking via IRCTC Gateway
                   </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
