import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { LocationBlog, mockFlights, mockHotels, mockProducts } from "../mockData";
import { 
  MapPin, Utensils, Landmark, User as UserIcon, 
  ShoppingBag, Sun, Calendar, Info, Plane, 
  Hotel, ShoppingCart, Compass 
} from "lucide-react";
import { formatCurrency, cn } from "../lib/utils";
import { motion } from "motion/react";

export function Blog() {
  const { city } = useParams();
  const [blog, setBlog] = useState<LocationBlog | null>(null);

  useEffect(() => {
    // 🔌 API INTEGRATION POINT
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        const found = data.find((b: LocationBlog) => b.name.toLowerCase() === city?.toLowerCase());
        setBlog(found || data[0]);
      });
  }, [city]);

  if (!blog) return <div className="p-12 text-center font-bold">Loading location intelligence...</div>;

  // Smart suggestions based on city
  const cityFlights = mockFlights.filter(f => f.destination.toLowerCase() === blog.name.toLowerCase()).slice(0, 2);
  const cityHotels = mockHotels.filter(h => h.city.toLowerCase() === blog.name.toLowerCase()).slice(0, 2);
  const cityClothes = mockProducts.filter(p => 
    p.category === "clothes" && (p.tags.includes(blog.weather) || p.tags.includes(blog.name))
  ).slice(0, 3);

  return (
    <div className="space-y-12 pb-20">
      {/* Hero */}
      <section className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src={blog.images[0]} 
          alt={blog.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-12">
          <div className="flex items-center gap-2 text-white/60 mb-4 uppercase tracking-[0.3em] font-bold text-sm">
             <MapPin className="w-4 h-4" /> Exploring India
          </div>
          <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter mb-6">{blog.name}</h1>
          <div className="flex flex-wrap gap-6 text-white/80">
             <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                <Sun className="w-5 h-5 text-orange-400" /> {blog.weather} Weather
             </div>
             <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                <Calendar className="w-5 h-5 text-indigo-400" /> Best Time: {blog.bestTime}
             </div>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Content Section */}
        <div className="lg:col-span-2 space-y-16">
          <section className="bg-white p-8 lg:p-12 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-8 tracking-tight">Overview</h2>
              <p className="text-slate-600 text-xl leading-relaxed mb-12 font-medium">{blog.overview}</p>
              
              <div className="grid md:grid-cols-1 gap-12">
                 <div className="space-y-8">
                    <h3 className="font-black text-2xl flex items-center gap-3 uppercase tracking-tighter italic"><Utensils className="text-orange-600 w-8 h-8" /> Culinary Signature</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                       {blog.food.map((f, idx) => (
                         <motion.div 
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 group"
                         >
                            <img src={f.image} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="p-6">
                               <p className="font-black text-lg mb-2">{f.name}</p>
                               <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.description}</p>
                            </div>
                         </motion.div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-4xl font-black tracking-tight italic">Iconic Experience</h2>
               <div className="h-px flex-1 bg-slate-100 mx-8"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {blog.places.map((place, i) => (
                 <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl group"
                 >
                    <div className="h-64 overflow-hidden">
                       <img src={place.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-8">
                       <h4 className="text-2xl font-black mb-3">{place.name}</h4>
                       <p className="text-slate-500 font-medium leading-relaxed mb-6">{place.description}</p>
                       <div className="flex items-center gap-2 text-orange-600 font-black text-sm uppercase tracking-widest cursor-pointer group/link">
                          Explore History <div className="w-8 h-0.5 bg-orange-600 group-hover/link:w-16 transition-all"></div>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
          </section>

          {/* Personalities Section */}
          <section className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="shrink-0">
                   <h3 className="text-3xl font-black mb-2 italic">Icons of</h3>
                   <h4 className="text-6xl font-black text-orange-500 tracking-tighter uppercase">{blog.name}</h4>
                </div>
                <div className="flex -space-x-12">
                   {blog.personalities.map((pers, idx) => (
                     <div key={idx} className="group relative">
                        <div className="w-32 h-32 rounded-full border-4 border-slate-900 overflow-hidden shadow-2xl group-hover:z-50 group-hover:scale-110 transition-all">
                           <img src={pers.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition mt-2 whitespace-nowrap shadow-lg">
                           {pers.name}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mb-48 -mr-48"></div>
          </section>

          <section className="bg-indigo-50 p-8 lg:p-12 rounded-[3rem] border border-indigo-100 relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl font-black mb-10 flex items-center gap-3 italic uppercase tracking-tighter"><ShoppingBag className="text-indigo-600 w-8 h-8" /> Local Treasures</h2>
                <div className="grid sm:grid-cols-2 gap-8">
                   {blog.shopping.map((item, idx) => (
                     <div key={idx} className="flex gap-6 items-center bg-white p-6 rounded-[2rem] shadow-sm border border-indigo-100 group">
                        <img src={item.image} className="w-20 h-20 rounded-2xl object-cover shadow-md group-hover:rotate-3 transition-transform" />
                        <div>
                           <p className="font-black text-lg text-indigo-950 uppercase leading-none mb-2">{item.item}</p>
                           <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest">Handcrafted</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          </section>

          <section className="bg-orange-50 p-8 lg:p-12 rounded-[3rem] border border-orange-100 group hover:border-orange-200 transition-colors">
             <h2 className="text-4xl font-black mb-10 flex items-center gap-4 text-orange-950 italic">
                <div className="p-3 bg-orange-600 text-white rounded-2xl shadow-lg rotate-[-4deg] group-hover:rotate-0 transition-transform"><Info /></div>
                Cultural Intel
             </h2>
             <div className="grid md:grid-cols-3 gap-8">
                {blog.tips.map((tip, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-orange-200/50 shadow-sm hover:shadow-md transition-shadow">
                     <p className="text-orange-600 font-black text-xs mb-4 uppercase tracking-[0.2em] font-mono italic">Protocol #{i+1}</p>
                     <p className="text-slate-700 font-medium leading-relaxed italic">"{tip}"</p>
                  </div>
                ))}
             </div>
          </section>

          {/* New Stay Recommendations in Guide */}
          <section>
             <h2 className="text-4xl font-black tracking-tight mb-8 italic">Stay Like Royalty</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blog.hotels.map((hotel, idx) => (
                  <a href={hotel.link} target="_blank" rel="noopener noreferrer" key={idx} className="group cursor-pointer">
                    <div className="bg-white rounded-[3rem] p-4 border border-slate-100 shadow-xl overflow-hidden">
                       <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6">
                          <img src={hotel.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest border border-white/30">
                             Official Site
                          </div>
                       </div>
                       <div className="px-6 pb-6">
                          <h4 className="text-2xl font-black mb-3">{hotel.name}</h4>
                          <p className="text-slate-500 font-medium mb-6 line-clamp-2">{hotel.description}</p>
                          <div className="flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-widest">
                             Book Experience <Compass className="w-4 h-4" />
                          </div>
                       </div>
                    </div>
                  </a>
                ))}
             </div>
          </section>
        </div>

        {/* Smart Sidebar Integrations */}
        <div className="space-y-8">
           {/* Flights Sync */}
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2"><Plane className="text-orange-600" /> Flights to {blog.name}</h4>
              <div className="space-y-4">
                 {cityFlights.map(f => (
                   <div key={f.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                         <span className="font-bold text-sm">{f.airline}</span>
                         <span className="text-orange-600 font-black">{formatCurrency(f.price)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest">
                         {f.source} <div className="flex-1 h-px bg-slate-200"></div> {f.destination}
                      </div>
                   </div>
                 ))}
                 <Link to="/flights" className="block text-center text-orange-600 font-bold text-sm mt-4 hover:underline">View More Flights</Link>
              </div>
           </div>

           {/* Hotels Sync */}
           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2"><Hotel className="text-indigo-400" /> Stays in {blog.name}</h4>
              <div className="space-y-4">
                 {cityHotels.map(h => (
                   <div key={h.id} className="group cursor-pointer">
                      <img src={h.images[0]} className="w-full h-32 object-cover rounded-2xl mb-2 opacity-80 group-hover:opacity-100 transition" />
                      <p className="font-bold text-sm">{h.name}</p>
                      <p className="text-indigo-400 font-black text-sm">{formatCurrency(h.pricePerNight)}<span className="text-[10px] uppercase ml-1 opacity-60">/ night</span></p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Smart Shopping Sync */}
           <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10"><ShoppingBag /> Gear for {blog.weather} Weather</h4>
              <div className="space-y-6 relative z-10">
                 {cityClothes.map(p => (
                   <div key={p.id} className="flex gap-4 items-center">
                      <img src={p.image} className="w-12 h-12 rounded-xl object-cover border border-white/20" />
                      <div>
                         <p className="font-bold text-sm leading-tight">{p.name}</p>
                         <p className="text-indigo-200 font-black text-xs">{formatCurrency(p.price)}</p>
                      </div>
                   </div>
                 ))}
                 <Link to="/shopping" className="block w-full bg-white text-indigo-600 text-center py-3 rounded-xl font-bold shadow-lg">Visit Gear Shop</Link>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
