import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Home, Plane, Hotel, Train, Bus, Map, 
  CreditCard, ShoppingBag, User, LogOut, Search,
  Menu, X, Compass, MapPin
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Destinations", path: "/destinations", icon: Compass },
  { label: "Flights", path: "/flights", icon: Plane },
  { label: "Hotels", path: "/hotels", icon: Hotel },
  { label: "Trains", path: "/trains", icon: Train },
  { label: "Buses", path: "/buses", icon: Bus },
  { label: "AI Planner", path: "/planner", icon: Map },
  { label: "Expenses", path: "/expenses", icon: CreditCard },
  { label: "Shopping", path: "/shopping", icon: ShoppingBag },
  { label: "Profile", path: "/profile", icon: User },
];

export function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-indigo-900 text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-xl shadow-lg ring-2 ring-white/10">B</div>
            <h1 className="text-xl font-bold tracking-tight text-white">BudgetWander</h1>
          </div>
          <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest ml-13">Super App Ecosystem</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                location.pathname === item.path 
                  ? "bg-indigo-800/80 text-white font-semibold shadow-inner" 
                  : "text-indigo-200 hover:bg-indigo-800/40 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              <span className="flex-1 opacity-80 group-hover:opacity-100">{item.label}</span>
              {["Flights", "Trains", "Buses", "Hotels"].includes(item.label) && (
                <span className="api-badge bg-indigo-400/20 text-indigo-300 border-indigo-400/30">API</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t border-indigo-800/40">
          {user ? (
            <div className="group flex items-center gap-3 p-3 rounded-[1.5rem] hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white font-black text-xl shadow-lg rotate-3 group-hover:rotate-0 transition-all duration-500 shrink-0">
                {user.name?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-black text-white truncate tracking-tight leading-none">{user.name}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
                  <p className="text-[9px] text-indigo-300 font-black uppercase tracking-[0.1em]">
                    {user.role || "Explorer"}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-indigo-300 hover:text-rose-400 hover:bg-rose-500/10 transition-all shrink-0 border border-white/5 hover:border-rose-500/20 active:scale-95"
                title="Terminate Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="flex items-center justify-center w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-950/20 hover:bg-indigo-500 transition-all border border-indigo-500/50"
            >
              Secure Access
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Universal Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shadow-sm shrink-0">
          <div className="flex-1 max-w-xl">
             <div className="relative flex items-center bg-slate-100 rounded-full px-4 py-2 w-full border border-slate-200/50">
                <Search className="mr-2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search Jaipur, Mumbai, Goa..." 
                  className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-slate-400"
                />
                <span className="api-badge !bg-rose-50 !text-rose-500 !border-rose-100 whitespace-nowrap hidden sm:inline-block">AUTH PROTECTED</span>
             </div>
          </div>
          
          <div className="flex gap-4 items-center ml-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-full border border-rose-100 text-[10px] font-bold uppercase tracking-wider">
               <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
               Weather: 28°C Sunny
            </div>
            <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-100 transition-colors relative">
               <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 border border-white rounded-full"></span>
               🔔
            </button>
             <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50 relative">
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                className="fixed inset-0 z-50 bg-indigo-900 lg:hidden text-white overflow-y-auto"
              >
                <div className="p-6 flex justify-between items-center border-b border-indigo-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-xl">B</div>
                    <h1 className="text-xl font-bold tracking-tight">BudgetWander</h1>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
                </div>
                <nav className="p-6 space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl text-lg font-medium",
                        location.pathname === item.path ? "bg-indigo-800 text-white" : "text-indigo-200"
                      )}
                    >
                      <item.icon className="w-6 h-6 opacity-70" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="max-w-7xl mx-auto w-full p-6 lg:p-10">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
