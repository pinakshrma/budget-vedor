import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LocationBlog } from "../mockData";
import { Search, MapPin, TrendingUp, Compass } from "lucide-react";
import { motion } from "motion/react";

export function Destinations() {
  const [blogs, setBlogs] = useState<LocationBlog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  const filtered = blogs.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl font-black tracking-tighter mb-4">Discover India</h2>
        <p className="text-slate-500 font-medium">Curated travel guides for every corner of the incredible India.</p>
      </header>

      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search for a city (e.g. Manali, Varanasi...)"
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((blog, i) => (
          <Link key={blog.id} to={`/blog/${blog.name}`}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl"
            >
              <img 
                src={blog.images[0]} 
                alt={blog.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-2 text-white/70 text-xs font-black uppercase tracking-widest mb-2">
                  <MapPin className="w-3 h-3 text-rose-500" /> {blog.weather}
                </div>
                <h4 className="text-3xl font-black text-white mb-2">{blog.name}</h4>
                <p className="text-white/60 text-sm line-clamp-2 leading-relaxed mb-4 group-hover:text-white transition-colors">{blog.overview}</p>
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm tracking-tight opacity-0 group-hover:opacity-100 transition-opacity">
                   Explore Guide <Compass className="w-4 h-4 animate-spin-slow" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
           <Compass className="w-16 h-16 text-slate-200 mx-auto mb-4" />
           <p className="text-slate-400 font-bold">No destinations found matching your search.</p>
        </div>
      )}
    </div>
  );
}
