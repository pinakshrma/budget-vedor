import { useAuth } from "../context/AuthContext";
import { User, Mail, ShieldCheck, MapPin, CreditCard, Bell, ChevronRight, X, Save, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, FormEvent } from "react";

type Section = "profile" | "email" | "security" | "payments" | "notifications" | null;

export function Profile() {
  const { user, updateUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  // Section States
  const [emailPrefs, setEmailPrefs] = useState([
    { id: "confirm", title: "Booking Confirmations", desc: "Get all your tickets via email", enabled: true },
    { id: "alerts", title: "Price Alerts", desc: "Notify when fares drop for routes", enabled: false },
    { id: "digest", title: "News & Monthly Digest", desc: "Best of BudgetWander stories", enabled: true }
  ]);

  const [cards, setCards] = useState([
    { id: "1", last4: "4492", holder: user?.name || "PRANAY SAXENA", type: "VISA" }
  ]);

  const [notifications, setNotifications] = useState({
    push: true,
    sms: true
  });

  const handleUpdateProfile = (e: FormEvent) => {
    e.preventDefault();
    updateUser({ name });
    setActiveSection(null);
  };

  const toggleEmailPref = (id: string) => {
    setEmailPrefs(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const deleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const addMockCard = () => {
    const newCard = {
      id: Math.random().toString(36).substr(2, 9),
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      holder: user?.name?.toUpperCase() || "NEW EXPLORER",
      type: "MASTERCARD"
    };
    setCards([...cards, newCard]);
  };

  const revokeSessions = () => {
    if (confirm("Are you sure you want to revoke all other active sessions? You will be kept logged in here.")) {
      alert("All other sessions have been successfully revoked.");
      setActiveSection(null);
    }
  };

  const disableAccount = () => {
    if (confirm("WARNING: This will permanently disable your access to BudgetWander. This action cannot be undone.")) {
      logout();
    }
  };

  const menuItems = [
    { id: "profile" as Section, icon: User, label: "Edit Profile", desc: "Update your name and personal details" },
    { id: "email" as Section, icon: Mail, label: "Email Preferences", desc: "Manage your travel alerts and receipts" },
    { id: "security" as Section, icon: ShieldCheck, label: "Security", desc: "Change password and session management" },
    { id: "payments" as Section, icon: CreditCard, label: "Saved Payments", desc: "Manage saved cards and UPI IDs" },
    { id: "notifications" as Section, icon: Bell, label: "Notifications", desc: "Enable app and SMS travel updates" },
  ];

  return (
    <div className="space-y-8 max-w-2xl mx-auto px-4 pb-12">
      <div className="text-center pt-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-orange-100 text-orange-600 rounded-[3rem] mx-auto flex items-center justify-center text-4xl font-black mb-6 shadow-xl shadow-orange-100"
        >
           {user?.name?.[0].toUpperCase()}
        </motion.div>
        <h2 className="text-3xl font-black text-slate-900">{user?.name}</h2>
        <p className="text-slate-500 font-medium">{user?.email}</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
         {menuItems.map((item, i) => (
           <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 5 }}
            onClick={() => setActiveSection(item.id)}
            className="flex items-center gap-4 p-6 border-b border-slate-50 last:border-0 cursor-pointer hover:bg-slate-50 transition"
           >
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                 <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                 <p className="font-bold text-slate-900">{item.label}</p>
                 <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
           </motion.div>
         ))}
      </div>

      <div className="bg-orange-600 text-white p-8 rounded-[2.5rem] text-center shadow-xl shadow-orange-200">
         <h4 className="text-xl font-bold mb-2">BudgetWander Platinum</h4>
         <p className="text-orange-100 text-sm mb-6">Enjoy zero convenience fees on all flight & train bookings.</p>
         <button 
          onClick={() => alert("Welcome to Platinum Club! You are now a premium member of BudgetWander.")}
          className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition active:scale-95"
         >
            Join Club
         </button>
      </div>

      <AnimatePresence>
        {activeSection && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 border border-slate-200">
                    {activeSection === "profile" && <User className="w-5 h-5" />}
                    {activeSection === "email" && <Mail className="w-5 h-5" />}
                    {activeSection === "security" && <ShieldCheck className="w-5 h-5" />}
                    {activeSection === "payments" && <CreditCard className="w-5 h-5" />}
                    {activeSection === "notifications" && <Bell className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {menuItems.find(i => i.id === activeSection)?.label}
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveSection(null)}
                  className="p-3 hover:bg-white rounded-2xl border border-transparent hover:border-slate-200 transition"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar">
                {activeSection === "profile" && (
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 transition"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Email Identity (ReadOnly)</label>
                       <input 
                        type="email" 
                        value={email}
                        readOnly
                        className="w-full bg-slate-100 border-none rounded-2xl p-4 font-bold text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition shadow-xl shadow-slate-900/10 active:scale-95">
                       Update Identity
                    </button>
                  </form>
                )}

                {activeSection === "email" && (
                  <div className="space-y-4">
                    {emailPrefs.map((pref) => (
                      <div key={pref.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                          <p className="font-bold text-slate-900">{pref.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{pref.desc}</p>
                        </div>
                        <div 
                          onClick={() => toggleEmailPref(pref.id)}
                          className={`w-12 h-6 rounded-full p-1 cursor-pointer transition ${pref.enabled ? "bg-orange-600" : "bg-slate-300"}`}
                        >
                           <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition ${pref.enabled ? "translate-x-6" : "translate-x-0"}`} />
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        alert("Preferences Saved Successfully");
                        setActiveSection(null);
                      }}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition shadow-xl shadow-slate-900/10 mt-4 active:scale-95"
                    >
                       Save Preferences
                    </button>
                  </div>
                )}

                {activeSection === "security" && (
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-950 rounded-3xl text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Current Session</p>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-orange-500" />
                         </div>
                         <div>
                            <p className="font-black">Mumbai, India</p>
                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.1em]">Logged in via Chrome on MacOS</p>
                         </div>
                      </div>
                    </div>
                    <button 
                      onClick={revokeSessions}
                      className="w-full bg-white border border-slate-200 text-slate-900 py-4 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition active:scale-95"
                    >
                       Revoke All Sessions
                    </button>
                    <button 
                      onClick={disableAccount}
                      className="w-full bg-rose-50 border border-rose-100 text-rose-600 py-4 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-rose-100 transition active:scale-95"
                    >
                       Disable Account
                    </button>
                  </div>
                )}

                {activeSection === "payments" && (
                   <div className="space-y-4">
                      {cards.map(card => (
                        <div key={card.id} className="p-6 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl text-white relative overflow-hidden group">
                           <div className="relative z-10">
                              <div className="flex justify-between items-start mb-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">{card.type} Card</p>
                                <button 
                                  onClick={() => deleteCard(card.id)}
                                  className="p-2 bg-rose-500/20 text-rose-200 rounded-lg hover:bg-rose-500 transition active:scale-95"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex justify-between items-end">
                                 <div>
                                    <p className="text-xl font-mono tracking-[0.2em]">•••• •••• •••• {card.last4}</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-4">{card.holder}</p>
                                 </div>
                                 <CreditCard className="w-8 h-8 opacity-50" />
                              </div>
                           </div>
                           <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition duration-700">
                              <CreditCard className="w-48 h-48" />
                           </div>
                        </div>
                      ))}
                      
                      {cards.length === 0 && (
                        <div className="text-center py-12 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                          <p className="text-slate-400 font-bold mb-2">No Saved Cards</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Add a payment method for faster checkout</p>
                        </div>
                      )}

                      <button 
                        onClick={addMockCard}
                        className="w-full border-2 border-dashed border-slate-200 p-6 rounded-3xl flex items-center justify-center gap-3 text-slate-400 hover:text-orange-600 hover:border-orange-200 transition bg-slate-50/50 active:scale-95"
                      >
                         <Plus className="w-5 h-5" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Connect New Asset</span>
                      </button>
                   </div>
                )}

                {activeSection === "notifications" && (
                   <div className="space-y-4">
                      <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                         <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm border border-orange-200">
                               <Bell className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="font-black text-slate-900">Push Notifications</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                 {notifications.push ? "Enabled on 2 devices" : "Disabled on all devices"}
                               </p>
                            </div>
                         </div>
                         <button 
                           onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                           className={`w-full py-3 rounded-xl font-black uppercase tracking-[0.1em] text-[10px] transition border active:scale-95 ${
                             notifications.push 
                             ? "bg-white border-orange-200 text-orange-600 hover:bg-orange-600 hover:text-white" 
                             : "bg-orange-600 border-transparent text-white hover:bg-orange-700"
                           }`}
                         >
                           {notifications.push ? "Disable Devices" : "Enable Push Notifications"}
                         </button>
                      </div>
                      <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                         <div>
                            <p className="font-black text-slate-900">SMS Updates</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global delivery enabled</p>
                         </div>
                         <div 
                           onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                           className={`w-12 h-6 rounded-full p-1 cursor-pointer transition ${notifications.sms ? "bg-orange-600" : "bg-slate-300"}`}
                         >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition ${notifications.sms ? "translate-x-6" : "translate-x-0"}`} />
                         </div>
                      </div>
                   </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
