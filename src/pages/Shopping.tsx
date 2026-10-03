import { useState, useEffect } from "react";
import { ShoppingBag, Search, Tag, Filter, CloudRain, Sun, Waves } from "lucide-react";
import { Product } from "../mockData";
import { formatCurrency, cn } from "../lib/utils";
import { motion } from "motion/react";

export function Shopping() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<"all" | "clothes" | "gadgets">("all");

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <section className="bg-slate-950 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden shadow-2xl">
         <div className="relative z-10 max-w-4xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
                Field <span className="text-rose-500">Equipment</span>
              </h1>
              <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Logistics Grid v1.0.4 - Performance Tested Gear</p>
            </div>

            <div className="flex flex-wrap gap-3">
               {[
                 { id: "all", label: "All Gear" },
                 { id: "clothes", label: "Apparel" },
                 { id: "gadgets", label: "Gadgets" }
               ].map(btn => (
                 <button 
                   key={btn.id}
                   onClick={() => setFilter(btn.id as any)}
                   className={cn(
                     "px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border",
                     filter === btn.id 
                       ? "bg-rose-600 text-white border-rose-600 shadow-xl shadow-rose-900/40" 
                       : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                   )}
                 >
                   {btn.label}
                 </button>
               ))}
            </div>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>
      </section>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((p, idx) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
               <img 
                 src={p.image} 
                 alt={p.name} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 referrerPolicy="no-referrer" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               
               {/* Badges */}
               <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  <span className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {p.category}
                  </span>
               </div>
               
               {/* Quick Tags (Overlay on hover) */}
               <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-white/20 backdrop-blur-md text-white text-[8px] font-bold uppercase px-2 py-1 rounded-md border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
               </div>
            </div>

            {/* Content Container */}
            <div className="p-8 space-y-4">
               <div>
                  <h4 className="font-black text-slate-900 text-lg leading-tight group-hover:text-rose-600 transition-colors uppercase tracking-tight">
                    {p.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-1">Ref. ID: {p.id}</p>
               </div>
               
               <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                 {p.description}
               </p>

               <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Pricing</span>
                    <span className="text-2xl font-black text-slate-950 tracking-tighter">
                      {formatCurrency(p.price)}
                    </span>
                  </div>
                  <button className="bg-slate-950 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-rose-600 shadow-xl hover:shadow-rose-900/20 active:scale-95 transition-all duration-300">
                     <ShoppingBag className="w-6 h-6" />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
