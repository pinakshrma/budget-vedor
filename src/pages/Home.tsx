import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Plane, Hotel, Train, Bus, Map, TrendingUp, Search, MapPin, Zap, ShoppingBag } from "lucide-react";
import { LocationBlog } from "../mockData";
import { formatCurrency, cn } from "../lib/utils";

export function Home() {
  const [blogs, setBlogs] = useState<LocationBlog[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data.slice(0, 12)));
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Featured Location Banner */}
      <section className="bg-white rounded-[3rem] p-10 border border-slate-100 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center gap-12">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl lg:text-7xl font-black text-rose-950 mb-3 tracking-tighter">Jaipur</h2>
          <p className="text-rose-800 text-lg leading-relaxed mb-6 font-medium">
             Known as the 'Pink City', Jaipur is a vibrant blend of heritage and culture. Home to the majestic Hawa Mahal and Amer Fort.
          </p>
          <div className="flex gap-3 mb-6">
            <span className="bg-rose-200/50 px-4 py-1.5 rounded-full text-xs font-bold text-rose-900 border border-rose-300/30">Culture: Rajputana</span>
            <span className="bg-rose-200/50 px-4 py-1.5 rounded-full text-xs font-bold text-rose-900 border border-rose-300/30">Food: Dal Baati</span>
          </div>
          <Link 
            to="/blog/Jaipur" 
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-rose-900/20 hover:bg-rose-700 transition-all"
          >
            Explore Pink City Blog
          </Link>
        </div>
        <div className="absolute right-0 top-0 h-full w-full lg:w-1/2 bg-[url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 lg:opacity-60 mask-gradient"></div>
      </section>

      {/* Main Grid: Flights & Trains */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Flights Quick Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 flex flex-col shadow-sm group">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center">
              ✈️ Flights <span className="api-badge">GET /flights</span>
            </h3>
            <span className="text-indigo-600 text-xs font-black uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">50+ Available</span>
          </div>
          <div className="space-y-4 flex-1">
             <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100 hover:border-indigo-200 transition-colors">
                <div className="flex flex-col">
                   <span className="text-sm font-bold text-slate-800">IndiGo 6E-204</span>
                   <span className="text-[11px] text-slate-500 font-medium">08:20 AM - DEL to JAI</span>
                </div>
                <div className="text-right">
                   <span className="block font-black text-slate-900 leading-tight">₹ 3,450</span>
                   <span className="text-[9px] font-bold text-emerald-500 uppercase">Non-stop</span>
                </div>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100 opacity-60">
                <div className="flex flex-col">
                   <span className="text-sm font-bold text-slate-800">Air India AI-402</span>
                   <span className="text-[11px] text-slate-500 font-medium">10:45 AM - BOM to JAI</span>
                </div>
                <span className="font-black text-slate-900">₹ 5,100</span>
             </div>
          </div>
          <Link to="/flights" className="mt-6 w-full py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all text-center">
            Search more flights
          </Link>
        </div>

        {/* Trains Quick Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center">
              🚆 Trains <span className="api-badge">GET /trains</span>
            </h3>
            <span className="text-orange-600 text-xs font-black uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">IRCTC Sync</span>
          </div>
          <div className="space-y-4 flex-1">
             <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex justify-between items-center">
                <div className="flex flex-col">
                   <span className="text-sm font-bold text-orange-900">12958 Swarna Jayanti</span>
                   <span className="text-[11px] text-orange-700 font-medium italic">Class: 3AC | Avail: 42</span>
                </div>
                <div className="text-right">
                   <span className="block font-black text-orange-900 leading-tight">₹ 1,220</span>
                   <span className="text-[9px] font-bold text-orange-400 uppercase">Fastest</span>
                </div>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div className="flex flex-col">
                   <span className="text-sm font-bold text-slate-800">22464 BKN SF Exp</span>
                   <span className="text-[11px] text-slate-500 font-medium">Class: SL | Avail: WL-10</span>
                </div>
                <span className="font-black text-slate-900">₹ 480</span>
             </div>
          </div>
          <Link to="/trains" className="mt-6 w-full py-3 bg-slate-100 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all text-center">
            Check PNR Status
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        {/* Expenses Side Section */}
        <div className="lg:col-span-5 bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            💸 Expenses <span className="api-badge">OCR /currency</span>
          </h3>
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 border border-emerald-100">
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Trip Spend</span>
              <span className="text-2xl font-black text-emerald-600">₹ 14,300</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-2/3 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm p-4 bg-white/50 hover:bg-white rounded-2xl cursor-pointer transition-all border border-transparent hover:border-emerald-200">
              <span className="font-bold text-slate-700">Hotel Booking</span>
              <span className="font-black text-rose-500 italic">-₹ 4,500</span>
            </div>
            <div className="flex justify-between items-center text-sm p-4 bg-white/50 hover:bg-white rounded-2xl cursor-pointer transition-all border border-transparent hover:border-emerald-200">
              <span className="font-bold text-slate-700">Dinner at Chokhi Dhani</span>
              <span className="font-black text-emerald-600 italic">+₹ 850</span>
            </div>
          </div>
          <Link to="/expenses" className="mt-6 block text-center text-emerald-700 font-black text-[10px] uppercase tracking-widest hover:underline">
            Manage full Splitwise ledger
          </Link>
        </div>

        {/* AI Itinerary Section */}
        <div className="lg:col-span-7 bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-8">
             <div>
                <h3 className="text-xl font-bold flex items-center">
                  🧠 AI Itinerary (Jaipur) <span className="api-badge">LLM GEN</span>
                </h3>
                <p className="text-amber-700 text-xs font-semibold mt-1 opacity-70">Hyper-localized smart routes</p>
             </div>
             <Zap className="text-amber-500 w-6 h-6 animate-bounce" />
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-2xl bg-amber-200 border border-amber-300 text-sm flex items-center justify-center font-black text-amber-800 shadow-sm">D1</div>
              <div className="flex-1">
                <p className="font-black text-slate-800 leading-tight">Morning Heritage</p>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">Visit Amer Fort & Panna Meena Kund early to catch the best light.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-2xl bg-amber-200 border border-amber-300 text-sm flex items-center justify-center font-black text-amber-800 shadow-sm">D2</div>
              <div className="flex-1">
                <p className="font-black text-slate-800 leading-tight">Old City & Street Food</p>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">Hawa Mahal morning session followed by lunch at Pandit Kulfi.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 p-5 bg-white rounded-3xl border border-amber-200 shadow-sm italic text-slate-600">
             <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Smart Shopping Advice</span>
             </div>
             <p className="text-[12px] leading-relaxed">
                Jaipur is warm. Consider purchasing a <strong>Cotton Kurta</strong> at Johri Bazaar. It's breathable and culturally synonymous.
             </p>
          </div>
        </div>
      </div>

      {/* Trending Destinations Section */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <TrendingUp className="text-rose-600" /> Trending Across India
            </h3>
            <p className="text-slate-500 font-medium">Top picks based on seasonal weather and travel demand.</p>
          </div>
          <Link to="/destinations" className="bg-white border border-slate-200 px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, i) => (
            <Link key={blog.id} to={`/blog/${blog.name}`}>
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative h-80 rounded-[2rem] overflow-hidden shadow-lg border border-slate-200/50"
              >
                <img 
                  src={blog.images[0]} 
                  alt={blog.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 text-white/80 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                    <MapPin className="w-3 h-3 text-rose-500" /> {blog.weather}
                  </div>
                  <h4 className="text-xl font-black text-white">{blog.name}</h4>
                  <p className="text-white/60 text-xs line-clamp-1 group-hover:text-white transition-colors">
                    Best Time: {blog.bestTime}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
