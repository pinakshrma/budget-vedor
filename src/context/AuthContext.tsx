import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (email: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("bharatyatri_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // DEFAULT: Auto-login as Pranay Saxena
      const defaultUser = { 
        email: "saxenapranay2504@gmail.com", 
        name: "Pranay Saxena",
        role: "System Architect"
      };
      setUser(defaultUser);
      localStorage.setItem("bharatyatri_user", JSON.stringify(defaultUser));
      localStorage.setItem("authToken", "auto-generated-token");
    }
  }, []);

  const login = async (email: string, password?: string) => {
    // 🔌 API INTEGRATION POINT
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    // Gimmick login: Accept any response if server is configured to return default user
    const data = await response.json();
    const newUser = { 
      email: data.user.email || email, 
      name: data.user.name || "Explorer", 
      role: data.user.role || "Explorer" 
    };
    setUser(newUser);
    localStorage.setItem("bharatyatri_user", JSON.stringify(newUser));
    localStorage.setItem("authToken", data.token || "mock-token");
  };

  const signup = async (email: string, name: string) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    const data = await response.json();
    const newUser = { email, name, role: data.user.role };
    setUser(newUser);
    localStorage.setItem("bharatyatri_user", JSON.stringify(newUser));
    localStorage.setItem("authToken", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bharatyatri_user");
    localStorage.removeItem("authToken");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updates };
      setUser(newUser);
      localStorage.setItem("bharatyatri_user", JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
