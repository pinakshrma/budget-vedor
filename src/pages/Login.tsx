import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { LogIn, UserPlus, Compass } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
            <Compass className="w-8 h-8" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500 text-center mb-8">Access your personalized travel ecosystem</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="pinaksharma1120@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" /> Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-slate-500">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-orange-600 font-bold hover:underline">Create Account</Link>
        </div>
      </motion.div>
    </div>
  );
}
