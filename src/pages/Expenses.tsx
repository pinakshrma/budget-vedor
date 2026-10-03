import { useState, useEffect, useMemo } from "react";
import { 
  Plus, Users, Receipt, TrendingDown, TrendingUp, History, 
  Search, LayoutDashboard, Group, ArrowRightLeft, ShieldCheck, 
  Wallet, Settings, ChevronRight, UserPlus, X, Check,
  PiggyBank, CreditCard, PieChart as PieChartIcon, 
  ArrowUpRight, ArrowDownRight, MoreVertical, Trash2, Edit3,
  Globe, Bell, Download, Filter, Star
} from "lucide-react";
import { formatCurrency, cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from "recharts";
import { 
  mockExpenseGroups, 
  GROUP_MEMBERS, 
  ExpenseGroup, 
  Expense, 
  SplitType,
  ExpenseSplit
} from "../mockData";
import { getExchangeRates } from "../services/currencyService";
import { useAuth } from "../context/AuthContext";

export function Expenses() {
  const { user } = useAuth();
  const [activeGroupId, setActiveGroupId] = useState("");
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [groups, setGroups] = useState<ExpenseGroup[]>([]);
  const [currency, setCurrency] = useState("INR");
  const [rates, setRates] = useState<Record<string, number>>({
    "INR": 1,
    "USD": 0.012,
    "EUR": 0.011,
    "GBP": 0.0095,
    "CAD": 0.016,
    "AUD": 0.018
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSettleUp, setShowSettleUp] = useState(false);

  // Add Expense State
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: 0,
    currency: "INR",
    paidBy: "u1",
    category: "Food",
    splitType: "equal" as SplitType,
    splits: [] as ExpenseSplit[],
    notes: "",
    items: [{ name: "Main Item", price: 0 }]
  });

  const [newGroupForm, setNewGroupForm] = useState({
    name: "",
    type: "trip" as const,
    currency: "INR",
    members: [GROUP_MEMBERS[0]]
  });

  useEffect(() => {
    getExchangeRates().then(data => {
      if (data) setRates(data);
    });
  }, []);

  useEffect(() => {
    fetch("/api/expenses/groups")
      .then(res => res.json())
      .then(data => {
        setGroups(data);
        if (data.length > 0) setActiveGroupId(data[0].id);
      })
      .catch(() => {
        setGroups(mockExpenseGroups);
        if (mockExpenseGroups.length > 0) setActiveGroupId(mockExpenseGroups[0].id);
      });
  }, []);

  const activeGroup = groups.find(g => g.id === activeGroupId) || groups[0];

  // Utility for currency conversion
  const convert = (amount: number, from: string, to: string) => {
    if (!rates || Object.keys(rates).length === 0) return amount;
    if (!from || !to || from === to) return amount;
    
    const fromRate = rates[from];
    const toRate = rates[to];

    if (fromRate === undefined || toRate === undefined) return amount;
    
    return (amount / fromRate) * toRate;
  };
  const balances = useMemo(() => {
    if (!activeGroup) return {};
    const bal: Record<string, number> = {};
    activeGroup.members.forEach(m => bal[m.id] = 0);

    activeGroup.expenses.forEach(exp => {
      const expAmount = convert(exp.amount, exp.currency || activeGroup.currency, currency);
      // Add amount to the person who paid
      bal[exp.paidBy] += expAmount;
      // Subtract the shares for everyone
      exp.splits.forEach(split => {
        const splitAmount = convert(split.amount, exp.currency || activeGroup.currency, currency);
        bal[split.userId] -= splitAmount;
      });
    });

    return bal;
  }, [activeGroup, currency, rates]);

  const simplifiedDebts = useMemo(() => {
    if (!activeGroup) return [];
    const debtors = Object.entries(balances)
      .filter(([_, val]) => (val as number) < -0.01)
      .map(([id, val]) => ({ id, val: -(val as number) }));
    const creditors = Object.entries(balances)
      .filter(([_, val]) => (val as number) > 0.01)
      .map(([id, val]) => ({ id, val: (val as number) }));
    
    const transactions: { from: string; to: string; amount: number }[] = [];
    
    let dIdx = 0, cIdx = 0;
    while(dIdx < debtors.length && cIdx < creditors.length) {
      const debtor = debtors[dIdx];
      const creditor = creditors[cIdx];
      const amount = Math.min(debtor.val, creditor.val);
      
      if (amount > 0) {
        transactions.push({ from: debtor.id, to: creditor.id, amount });
      }
      
      debtor.val -= amount;
      creditor.val -= amount;
      
      if (debtor.val < 0.01) dIdx++;
      if (creditor.val < 0.01) cIdx++;
    }
    return transactions;
  }, [balances, activeGroup]);

  const [isScanning, setIsScanning] = useState(false);

  const handleScanReceipt = () => {
    setIsScanning(true);
    setTimeout(() => {
      setNewExpense({
        ...newExpense,
        title: "Starbucks Coffee",
        amount: 850,
        category: "Food"
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleSplitChange = (userId: string, value: number) => {
    const existing = newExpense.splits.find(s => s.userId === userId);
    let updatedSplits = [];
    if (existing) {
      updatedSplits = newExpense.splits.map(s => s.userId === userId ? { ...s, amount: value } : s);
    } else {
      updatedSplits = [...newExpense.splits, { userId, amount: value }];
    }
    setNewExpense({ ...newExpense, splits: updatedSplits });
  };

  const handleAddExpense = () => {
    if (!activeGroup) return;
    
    const finalSplits = newExpense.splitType === "equal" 
      ? activeGroup.members.map(m => ({ userId: m.id, amount: newExpense.amount / activeGroup.members.length }))
      : newExpense.splits;

    const expense: Expense = {
      id: `e${Date.now()}`,
      title: newExpense.title,
      amount: newExpense.amount,
      currency: newExpense.currency || activeGroup.currency,
      date: new Date().toISOString().split("T")[0],
      paidBy: newExpense.paidBy,
      category: newExpense.category,
      splitType: newExpense.splitType,
      splits: finalSplits,
      notes: newExpense.notes
    };

    const updatedGroups = groups.map(g => {
      if (g.id === activeGroupId) {
        return { ...g, expenses: [expense, ...g.expenses] };
      }
      return g;
    });

    setGroups(updatedGroups);
    setShowAddExpense(false);
    setNewExpense({ 
      title: "", 
      amount: 0, 
      currency: currency,
      paidBy: "u1", 
      category: "Food", 
      splitType: "equal", 
      splits: [], 
      notes: "",
      items: [{ name: "Main Item", price: 0 }]
    });
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (!activeGroup) return;
    const updatedGroups = groups.map(g => {
      if (g.id === activeGroupId) {
        return { ...g, expenses: g.expenses.filter(e => e.id !== expenseId) };
      }
      return g;
    });
    setGroups(updatedGroups);
  };

  const handleSettleUp = (from: string, to: string, amountInUICurrency: number) => {
    // We need to record this in the group's currency or the current UI currency.
    // Let's store it in the UI currency we are using to settle.
    const settlement: Expense = {
      id: `s${Date.now()}`,
      title: `Settlement: ${activeGroup?.members.find(m => m.id === from)?.name} to ${activeGroup?.members.find(m => m.id === to)?.name}`,
      amount: amountInUICurrency,
      date: new Date().toISOString().split("T")[0],
      paidBy: from,
      category: "Settlement",
      splitType: "exact",
      splits: [{ userId: to, amount: -amountInUICurrency }, { userId: from, amount: amountInUICurrency }],
      notes: "System generated settlement",
      currency: currency
    };

    const updatedGroups = groups.map(g => {
      if (g.id === activeGroupId) {
        return { ...g, expenses: [settlement, ...g.expenses] };
      }
      return g;
    });
    setGroups(updatedGroups);
  };

  const handleCreateGroup = () => {
    const newGroup: ExpenseGroup = {
      id: `g${Date.now()}`,
      name: newGroupForm.name,
      type: newGroupForm.type,
      members: newGroupForm.members,
      totalBudget: 0,
      currency: newGroupForm.currency,
      expenses: []
    };
    setGroups([...groups, newGroup]);
    setActiveGroupId(newGroup.id);
    setShowAddGroup(false);
    setNewGroupForm({ name: "", type: "trip", currency: "INR", members: [GROUP_MEMBERS[0]] });
  };

  const handleDeleteGroup = (groupId: string) => {
    if (groups.length <= 1) {
      alert("You need at least one group.");
      return;
    }
    if (confirm("Are you sure you want to delete this group and all its expenses?")) {
      const updatedGroups = groups.filter(g => g.id !== groupId);
      setGroups(updatedGroups);
      setActiveGroupId(updatedGroups[0].id);
    }
  };

  const filteredExpenses = useMemo(() => {
    if (!activeGroup) return [];
    return activeGroup.expenses.filter(e => 
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeGroup, searchTerm]);

  const totalSpent = useMemo(() => {
     if (!activeGroup) return 0;
     return activeGroup.expenses.reduce((acc, curr) => {
       return acc + convert(curr.amount, curr.currency || activeGroup.currency, currency);
     }, 0);
  }, [activeGroup, currency, rates]);

  const categoryChartData = useMemo(() => {
    if (!activeGroup) return [];
    const cats: Record<string, number> = {};
    activeGroup.expenses.forEach(e => {
      const amount = convert(e.amount, e.currency || activeGroup.currency, currency);
      cats[e.category] = (cats[e.category] || 0) + amount;
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value }));
  }, [activeGroup]);

  if (!activeGroup) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
        {/* Navigation & Group Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 line-height-1.2">Ledger <span className="text-orange-600">Dynamics</span></h1>
            <p className="text-slate-500 font-medium text-xs">Precision expense tracking for teams and trips.</p>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm mr-2 group hover:border-indigo-200 transition-all">
                <Globe className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent text-[11px] font-black uppercase outline-none text-slate-600 cursor-pointer"
                >
                   <option value="INR">INR (₹)</option>
                   <option value="USD">USD ($)</option>
                   <option value="EUR">EUR (€)</option>
                   <option value="GBP">GBP (£)</option>
                </select>
             </div>

             <div className="flex bg-white p-1.5 rounded-[1.25rem] border border-slate-200 shadow-sm overflow-x-auto max-w-[300px] no-scrollbar gap-1">
                {groups.map(g => (
                  <button 
                    key={g.id}
                    onClick={() => setActiveGroupId(g.id)}
                    className={cn(
                      "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap",
                      activeGroupId === g.id 
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {g.name}
                  </button>
                ))}
             </div>
             <button 
               onClick={() => setShowAddGroup(true)}
               className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-900 group transition-all shadow-sm"
             >
                <Plus className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
             </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-slate-950/20 border border-white/5">
                 <div className="relative z-10">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total Outlay</p>
                    <h3 className="text-4xl font-mono font-bold mb-2 tracking-tighter">{formatCurrency(totalSpent, currency)}</h3>
                    <div className="flex items-center gap-2">
                       <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-emerald-500/20 flex items-center gap-1">
                          <TrendingUp className="w-2.5 h-2.5" /> Fully Audited
                       </span>
                    </div>
                 </div>
                 <CreditCard className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
              </div>

              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 group shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Net Balance</p>
                 <h3 className={cn(
                   "text-4xl font-mono font-bold mb-2 tracking-tighter",
                   balances["u1"] >= 0 ? "text-emerald-600" : "text-rose-600"
                 )}>
                   {balances["u1"] >= 0 ? "+" : "-"}{formatCurrency(Math.abs(balances["u1"]), currency) || "0.00"}
                 </h3>
                 <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-slate-200 flex items-center gap-1">
                       <History className="w-2.5 h-2.5" /> Current Standing
                    </span>
                 </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-[2.5rem] p-8 shadow-sm group">
                 <p className="text-orange-900/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Efficiency Score</p>
                 <h3 className="text-4xl font-mono font-bold text-orange-900 mb-2 tracking-tighter">98%</h3>
                 <div className="flex items-center gap-2">
                    <span className="bg-orange-600/10 text-orange-600 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-orange-200/50 flex items-center gap-1">
                       <ShieldCheck className="w-2.5 h-2.5" /> Simplified Debts
                    </span>
                 </div>
              </div>
            </div>

            {/* History & Filters */}
            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 lg:p-12 shadow-sm">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase italic">Transaction <span className="text-orange-600 font-serif">Journal</span></h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Chronological ledger of all audit records</p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input 
                         placeholder="Filter history..." 
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-orange-500 text-xs font-black uppercase tracking-wider placeholder:text-slate-300"
                       />
                    </div>
                    <button 
                      onClick={() => setShowAddExpense(true)} 
                      className="bg-slate-950 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl shadow-slate-950/20 active:scale-95"
                    >
                       Record Entry
                    </button>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="grid grid-cols-12 px-6 py-2 border-b border-slate-100 mb-2">
                    <div className="col-span-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Origin & Classification</div>
                    <div className="col-span-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-center">Filing Status</div>
                    <div className="col-span-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic text-right px-4">Audit Amount</div>
                  </div>

                  <AnimatePresence mode="popLayout" initial={false}>
                    {filteredExpenses.map((exp, idx) => (
                      <motion.div 
                        key={exp.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2, delay: idx * 0.03 }}
                        className="group grid grid-cols-12 items-center p-3 hover:bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 transition-all cursor-pointer relative"
                      >
                         <div className="col-span-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                               <Receipt className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                               <h4 className="font-black text-[13px] text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight truncate">{exp.title}</h4>
                               <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded-md leading-none">{exp.category}</span>
                                  <span className="text-[8px] font-bold text-slate-400 font-mono italic">{exp.date}</span>
                               </div>
                            </div>
                         </div>

                         <div className="col-span-3">
                            <div className="flex flex-col items-center">
                               <div className="flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-sm group-hover:border-slate-200 transition-all">
                                  <div className="w-5 h-5 rounded-lg bg-slate-950 text-white flex items-center justify-center text-[8px] font-black shadow-inner">
                                     {activeGroup.members.find(m => m.id === exp.paidBy)?.avatar}
                                  </div>
                                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter truncate max-w-[80px]">
                                     {activeGroup.members.find(m => m.id === exp.paidBy)?.name}
                                  </span>
                               </div>
                            </div>
                         </div>

                         <div className="col-span-4 flex items-center justify-end gap-6 px-4">
                            <div className="text-right">
                               <p className="text-lg font-mono font-bold text-slate-900 tracking-tighter">{formatCurrency(convert(exp.amount, exp.currency || activeGroup.currency, currency), currency)}</p>
                               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{exp.currency || activeGroup.currency} BASE</p>
                            </div>
                            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <button 
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   handleDeleteExpense(exp.id);
                                 }}
                                 className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all shadow-sm"
                               >
                                  <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>
            </div>

            {/* Spending Insights */}
            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 lg:p-12 shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase italic">Spending <span className="text-indigo-600">Analytics</span></h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie 
                            data={categoryChartData} 
                            innerRadius={60} 
                            outerRadius={80} 
                            paddingAngle={5} 
                            dataKey="value"
                            stroke="none"
                          >
                             {categoryChartData.map((_, index) => (
                               <Cell key={`cell-${index}`} fill={["#f97316", "#6366f1", "#0ea5e9", "#f43f5e", "#10b981"][index % 5]} />
                             ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                       </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={activeGroup.members.map(m => ({ 
                         name: m.name, 
                         paid: activeGroup.expenses.filter(e => e.paidBy === m.id).reduce((a, b) => a + convert(b.amount, b.currency || activeGroup.currency, currency), 0)
                       }))}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                          <YAxis hide />
                          <Tooltip 
                             contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                             cursor={{ fill: '#f8fafc' }}
                          />
                          <Bar dataKey="paid" fill="#6366f1" radius={[10, 10, 0, 0]} />
                       </BarChart>
                    </ResponsiveContainer>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Net Balances Quick List */}
            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8 px-2">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">Member <span className="text-orange-600">Balances</span></h3>
                  <UserPlus className="w-5 h-5 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer" />
               </div>
               <div className="space-y-3">
                  {activeGroup.members.map(member => {
                    const bal = balances[member.id];
                    return (
                      <div key={member.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all group cursor-pointer shadow-sm hover:shadow-md">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg shadow-xl shadow-slate-900/10 group-hover:bg-orange-600 transition-colors">{member.avatar}</div>
                            <div>
                               <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{member.name}</p>
                               <p className={cn(
                                 "text-[8px] font-black uppercase tracking-[0.2em] mt-1 px-2 py-0.5 rounded-md border",
                                 bal > 0 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : bal < 0 ? "text-rose-600 bg-rose-50 border-rose-100" : "text-slate-400 bg-slate-100 border-slate-200"
                               )}>
                                 {bal > 0 ? "is owed" : bal < 0 ? "owes" : "settled"}
                               </p>
                            </div>
                         </div>
                         <div className="text-right">
                           <span className={cn(
                             "text-sm font-mono font-bold block",
                             bal > 0 ? "text-emerald-600" : bal < 0 ? "text-rose-600" : "text-slate-300"
                           )}>
                             {bal === 0 ? "—" : formatCurrency(Math.abs(bal), currency)}
                           </span>
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>

            {/* Smart Settlement Engine */}
            <div className="bg-indigo-950 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl font-black italic tracking-tight flex items-center gap-2">
                        <ArrowRightLeft className="text-indigo-400" /> Settlement Hub
                     </h3>
                     <span className="text-[10px] font-black bg-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full uppercase tracking-tighter">AI Optimized</span>
                  </div>

                  <div className="space-y-3">
                     {simplifiedDebts.length > 0 ? (
                       simplifiedDebts.map((debt, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                           <div className="flex items-center gap-3">
                               <span className="text-sm font-bold text-indigo-300">{activeGroup.members.find(m => m.id === debt.from)?.name}</span>
                               <ChevronRight className="w-3 h-3 text-white/20" />
                               <span className="text-sm font-bold text-indigo-300">{activeGroup.members.find(m => m.id === debt.to)?.name}</span>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className="text-sm font-black text-white">{formatCurrency(debt.amount, currency)}</span>
                              <button 
                                onClick={() => handleSettleUp(debt.from, debt.to, debt.amount)}
                                className="bg-emerald-500 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-lg shadow-emerald-900/20"
                              >
                                Settle
                              </button>
                           </div>
                        </div>
                       ))
                     ) : (
                       <div className="text-center py-8">
                          <Check className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-20" />
                          <p className="text-sm font-bold text-indigo-300">System is fully balanced.</p>
                       </div>
                     )}
                  </div>

                  <button className="w-full bg-white text-indigo-950 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-100 transition shadow-xl shadow-indigo-900/40">
                     Mass Settle All Entries
                  </button>
               </div>
               <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white border border-slate-200 rounded-[3rem] p-8 shadow-sm space-y-4">
               <button className="w-full flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100 hover:bg-emerald-100 transition group">
                  <div className="flex items-center gap-3">
                     <Download className="w-5 h-5 text-emerald-600" />
                     <span className="text-sm font-black text-emerald-900 uppercase italic">Export Audit (PDF)</span>
                  </div>
               </button>
               <button className="w-full flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100 hover:bg-indigo-100 transition group">
                  <div className="flex items-center gap-3">
                     <Bell className="w-5 h-5 text-indigo-600" />
                     <span className="text-sm font-black text-indigo-900 uppercase italic">Blast Reminders</span>
                  </div>
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: ADD EXPENSE */}
      <AnimatePresence>
        {showAddExpense && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowAddExpense(false)}
               className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0 }}
               exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
               className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-white/20 relative z-10"
             >
                {/* Modal Header */}
                <div className="bg-slate-950 p-10 lg:p-14 text-white flex justify-between items-center relative overflow-hidden">
                   <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="bg-orange-600 text-[10px] font-black px-2 py-0.5 rounded text-white uppercase tracking-widest">Entry Type: Expense</span>
                         <span className="bg-white/10 text-[10px] font-black px-2 py-0.5 rounded text-slate-300 uppercase tracking-widest">Draft Saved</span>
                      </div>
                      <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-[0.8] mb-2">Commit <span className="text-orange-500">Audit</span></h2>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Accounting record for {activeGroup.name}</p>
                   </div>
                   <button 
                     onClick={() => setShowAddExpense(false)} 
                     className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                   >
                      <X className="w-6 h-6" />
                   </button>
                   <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 translate-x-1/4 translate-y-1/4">
                      <Receipt className="w-64 h-64" />
                   </div>
                </div>

                {/* Modal Body */}
                <div className="p-10 lg:p-14 overflow-y-auto space-y-12 custom-scrollbar bg-white">
                   {/* OCR Trigger */}
                   <div className="flex justify-between items-center bg-slate-50 p-4 rounded-3xl border border-slate-100">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-indigo-600" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-900 uppercase">AI OCR Scanner</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Automated extraction from raw imagery</p>
                         </div>
                      </div>
                      <button 
                        onClick={handleScanReceipt}
                        disabled={isScanning}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition"
                      >
                        {isScanning ? "Analyzing..." : "Scan Image"}
                      </button>
                   </div>

                   {/* Primary Inputs */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Item Description</label>
                         <input 
                           value={newExpense.title}
                           onChange={e => setNewExpense({...newExpense, title: e.target.value})}
                           placeholder="e.g. Flight to Jaipur" 
                           className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 font-black text-lg transition-all"
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Exact Amount ({currency})</label>
                         <div className="relative">
                            <input 
                              type="number"
                              value={newExpense.amount || ""}
                              onChange={e => setNewExpense({...newExpense, amount: Number(e.target.value)})}
                              placeholder="0.00" 
                              className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 font-black text-lg transition-all"
                            />
                            <Wallet className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                         </div>
                      </div>
                   </div>

                   {/* Split Configuration */}
                   <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Split Mode</label>
                        <div className="flex gap-2">
                           {["equal", "exact", "percentage", "shares"].map(type => (
                             <button
                               key={type}
                               onClick={() => setNewExpense({...newExpense, splitType: type as SplitType})}
                               className={cn(
                                 "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all",
                                 newExpense.splitType === type ? "bg-orange-600 text-white shadow-lg" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                               )}
                             >
                               {type}
                             </button>
                           ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {activeGroup.members.map(member => (
                           <div key={member.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">{member.avatar}</div>
                              <div className="flex-1 min-w-0">
                                 <p className="text-[10px] font-bold text-slate-900 truncate">{member.name}</p>
                                 <input 
                                   disabled={newExpense.splitType === "equal"}
                                   value={newExpense.splitType === "equal" ? (newExpense.amount / activeGroup.members.length).toFixed(0) : (newExpense.splits.find(s => s.userId === member.id)?.amount || "")}
                                   onChange={e => handleSplitChange(member.id, Number(e.target.value))}
                                   placeholder="0"
                                   className="w-full bg-transparent text-xs font-black text-slate-400 focus:text-orange-600 outline-none"
                                 />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Itemization */}
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Itemization</label>
                      </div>
                      <div className="space-y-2">
                        {newExpense.items.map((item, idx) => (
                           <div key={idx} className="flex gap-3">
                              <input 
                                value={item.name}
                                onChange={(e) => {
                                  const items = [...newExpense.items];
                                  items[idx].name = e.target.value;
                                  setNewExpense({...newExpense, items});
                                }}
                                placeholder="Item name" 
                                className="flex-1 px-5 py-3 rounded-xl bg-slate-50 border-none text-xs font-bold" 
                              />
                              <input 
                                type="number" 
                                value={item.price || ""}
                                onChange={(e) => {
                                  const items = [...newExpense.items];
                                  items[idx].price = Number(e.target.value);
                                  const total = items.reduce((acc, curr) => acc + curr.price, 0);
                                  setNewExpense({...newExpense, items, amount: total});
                                }}
                                placeholder="Price" 
                                className="w-24 px-5 py-3 rounded-xl bg-slate-50 border-none text-xs font-black" 
                              />
                           </div>
                        ))}
                        <button 
                          onClick={() => setNewExpense({...newExpense, items: [...newExpense.items, { name: "", price: 0 }]})}
                          className="text-[10px] font-black uppercase text-indigo-600 hover:underline px-4 mt-2"
                        >+ Add Item</button>
                      </div>
                   </div>

                   {/* Secondary Info */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Category</label>
                         <select 
                           value={newExpense.category}
                           onChange={e => setNewExpense({...newExpense, category: e.target.value})}
                           className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 font-bold appearance-none transition-all"
                         >
                            <option>Food</option>
                            <option>Stay</option>
                            <option>Transport</option>
                            <option>Sightseeing</option>
                            <option>Adventure</option>
                            <option>Shopping</option>
                         </select>
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Paid By</label>
                         <select 
                           value={newExpense.paidBy}
                           onChange={e => setNewExpense({...newExpense, paidBy: e.target.value})}
                           className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 font-bold appearance-none transition-all"
                         >
                            {activeGroup.members.map(m => (
                              <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                         </select>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Internal Notes</label>
                      <textarea 
                        value={newExpense.notes}
                        onChange={e => setNewExpense({...newExpense, notes: e.target.value})}
                        placeholder="Add more details about the expense..." 
                        rows={3}
                        className="w-full px-8 py-5 rounded-[2rem] bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 font-medium text-sm transition-all resize-none"
                      />
                   </div>
                   
                   <button 
                     onClick={handleAddExpense}
                     className="w-full py-6 rounded-[2rem] bg-orange-600 text-white font-black text-base uppercase tracking-[0.2em] shadow-3xl shadow-orange-900/20 hover:bg-orange-700 transition transform active:scale-[0.98] mt-8"
                   >
                      Validate & Commit
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD GROUP */}
      <AnimatePresence>
        {showAddGroup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-white rounded-[3rem] w-full max-w-lg p-10 shadow-3xl space-y-8"
            >
               <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tighter">Create Group</h3>
                  <p className="text-slate-500 font-medium text-sm">Organize your next collective outing.</p>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Display Name</label>
                     <input 
                       value={newGroupForm.name}
                       onChange={e => setNewGroupForm({...newGroupForm, name: e.target.value})}
                       placeholder="e.g. Kasol 2024" 
                       className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 font-bold" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Base Currency</label>
                     <select 
                       value={newGroupForm.currency}
                       onChange={e => setNewGroupForm({...newGroupForm, currency: e.target.value})}
                       className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 font-bold appearance-none"
                     >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Group Type</label>
                     <div className="grid grid-cols-4 gap-2">
                        {["trip", "home", "couple", "other"].map(t => (
                          <button 
                            key={t} 
                            onClick={() => setNewGroupForm({...newGroupForm, type: t as any})}
                            className={cn(
                              "py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                              newGroupForm.type === t ? "bg-indigo-600 text-white border-transparent" : "bg-slate-50 border-slate-100 text-slate-400 hover:border-indigo-600"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Invite Members</label>
                     <div className="flex gap-2">
                        <select 
                          className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-600 font-bold appearance-none"
                          onChange={(e) => {
                            const member = GROUP_MEMBERS.find(m => m.id === e.target.value);
                            if (member && !newGroupForm.members.find(m => m.id === member.id)) {
                              setNewGroupForm({...newGroupForm, members: [...newGroupForm.members, member]});
                            }
                          }}
                        >
                           <option value="">Select Crew Member</option>
                           {GROUP_MEMBERS.map(m => (
                             <option key={m.id} value={m.id}>{m.name}</option>
                           ))}
                        </select>
                        <button className="bg-slate-900 text-white p-4 rounded-2xl"><UserPlus className="w-5 h-5" /></button>
                     </div>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {newGroupForm.members.map(m => (
                          <div key={m.id} className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-[10px] font-black border border-indigo-100">
                             <span>{m.name}</span>
                             <button onClick={() => setNewGroupForm({...newGroupForm, members: newGroupForm.members.filter(mem => mem.id !== m.id)})} className="hover:text-rose-500 transition-colors"><X className="w-3 h-3" /></button>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="flex gap-4 pt-4">
                  <button onClick={() => setShowAddGroup(false)} className="flex-1 py-4 font-black text-slate-400 hover:bg-slate-50 rounded-2xl transition">Cancel</button>
                  <button 
                    onClick={handleCreateGroup}
                    disabled={!newGroupForm.name}
                    className="flex-1 py-4 font-black bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 transition active:scale-95 disabled:opacity-50"
                  >
                    Initialize
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
