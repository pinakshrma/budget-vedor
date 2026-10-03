import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { mockFlights, mockTrains, mockBuses, mockHotels, mockProducts, mockBlogs, mockExpenseGroups } from "./src/mockData.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use security and performance middleware (configured for AI Studio preview)
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    frameguard: false, // Allow displaying in AI Studio iFrame
  }));
  app.use(compression());
  app.use(cors());
  app.use(express.json());

  // 🔌 API INTEGRATION POINT: Authentication
  app.post("/api/auth/login", (req, res) => {
    console.log("Login attempt:", req.body.email);
    const { email, password } = req.body;
    
    // Check for specific user requested (supporting potential typos)
    const targetEmail = email?.toLowerCase();
    if ((targetEmail === "saxenapranay2504@gmail.com" || targetEmail === "saxenapranay2504@gmai.com") && (password === "123" || !password)) {
      console.log("Premium user login successful");
      return res.json({ 
        token: "auth-token-premium-" + Date.now(), 
        user: { 
          email: "saxenapranay2504@gmail.com", 
          name: "pinak sharma",
          role: "System Architect"
        } 
      });
    }

    // Gimmick login: Accept whatever else enter allow
    const name = email ? email.split("@")[0] : "Explorer";
    res.json({ 
      token: "mock-token-" + Date.now(), 
      user: { 
        email: email || "unknown@example.com", 
        name: name.charAt(0).toUpperCase() + name.slice(1),
        role: "Explorer"
      } 
    });
  });

  app.post("/api/auth/signup", (req, res) => {
    const { email, name } = req.body;
    res.json({ 
      token: "signup-token-" + Date.now(), 
      user: { email, name, role: "Explorer" } 
    });
  });

  // 🔌 API INTEGRATION POINT: Expenses
  app.get("/api/expenses/groups", (req, res) => res.json(mockExpenseGroups));

  // 🔌 API INTEGRATION POINT: Flights Search
  app.get("/api/flights/search", (req, res) => {
    const { from, to, date } = req.query;
    
    // Filter base data
    let results = mockFlights.filter(f => 
      (!from || f.source.toLowerCase() === (from as string).toLowerCase()) &&
      (!to || f.destination.toLowerCase() === (to as string).toLowerCase())
    );

    // If less than 10 results, generate synthetic ones
    if (results.length < 15 && from && to) {
      const needed = 15 - results.length;
      const airlines = ["IndiGo", "Air India", "Vistara", "SpiceJet", "Akasa Air"];
      
      for (let i = 0; i < needed; i++) {
        const depH = Math.floor(Math.random() * 24);
        const depM = Math.floor(Math.random() * 4) * 15;
        const durH = Math.floor(Math.random() * 3) + 1;
        const durM = Math.floor(Math.random() * 60);
        
        results.push({
          id: `SF${Date.now()}${i}`,
          airline: airlines[i % airlines.length],
          airlineLogo: `https://picsum.photos/seed/airline_syn_${i}/100/100`,
          source: from as string,
          destination: to as string,
          departureTime: `${String(depH).padStart(2, '0')}:${String(depM).padStart(2, '0')}`,
          arrivalTime: `${String((depH + durH) % 24).padStart(2, '0')}:${String((depM + durM) % 60).padStart(2, '0')}`,
          duration: `${durH}h ${durM}m`,
          stops: Math.random() > 0.7 ? 1 : 0,
          price: Math.floor(Math.random() * 5000) + 3000,
          rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1))
        });
      }
    }

    // Apply dynamic variations
    const dynamicResults = results.map(f => {
      const priceFactor = 1 + (Math.random() * 0.2 - 0.1); // +/- 10%
      const delay = Math.random() > 0.8 ? Math.floor(Math.random() * 30) + 5 : 0;
      
      return {
        ...f,
        date: date || new Date().toISOString().split('T')[0],
        price: Math.round(f.price * priceFactor),
        delay: delay > 0 ? `${delay}m delay` : "On Time",
        seats: Math.floor(Math.random() * 40) + 1
      };
    });

    res.json(dynamicResults);
  });

  // 🔌 API INTEGRATION POINT: Trains Search
  app.get("/api/trains/search", (req, res) => {
    const { from, to, date } = req.query;
    
    let results = mockTrains.filter(t => 
      (!from || t.source.toLowerCase() === (from as string).toLowerCase()) &&
      (!to || t.destination.toLowerCase() === (to as string).toLowerCase())
    );

    if (results.length < 12 && from && to) {
      const needed = 12 - results.length;
      for (let i = 0; i < needed; i++) {
        results.push({
          id: `ST${Date.now()}${i}`,
          number: `${12000 + Math.floor(Math.random() * 9000)}`,
          name: `${from}-${to} Express`,
          source: from as string,
          destination: to as string,
          departureTime: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:00`,
          arrivalTime: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:00`,
          classes: ["Sleeper", "3AC", "2AC"],
          fare: { "Sleeper": 500, "3AC": 1300, "2AC": 1900 },
          availability: { "Sleeper": "Available 20", "3AC": "Available 5", "2AC": "RAC 2" }
        });
      }
    }

    const dynamicResults = results.map(t => ({
      ...t,
      date: date || new Date().toISOString().split('T')[0],
      delay: Math.random() > 0.7 ? `${Math.floor(Math.random() * 60)}m late` : "On Time",
      price: t.fare["3AC"] // Using 3AC as default price for simple search
    }));

    res.json(dynamicResults);
  });

  // 🔌 API INTEGRATION POINT: Bus Search
  app.get("/api/bus/search", (req, res) => {
    const { from, to, date } = req.query;
    
    let results = mockBuses.filter(b => 
      (!from || b.source.toLowerCase() === (from as string).toLowerCase()) &&
      (!to || b.destination.toLowerCase() === (to as string).toLowerCase())
    );

    if (results.length < 15 && from && to) {
      const needed = 15 - results.length;
      const operators = ["Zingbus", "IntrCity", "Orange", "SRS", "VRL"];
      for (let i = 0; i < needed; i++) {
        results.push({
          id: `SB${Date.now()}${i}`,
          operator: operators[i % operators.length],
          type: "AC Sleeper",
          source: from as string,
          destination: to as string,
          departureTime: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:30`,
          duration: "8h 30m",
          price: Math.floor(Math.random() * 1000) + 800,
          rating: parseFloat((Math.random() * 1 + 3.5).toFixed(1)),
          boardingPoints: ["Main Station", "Highway Hub"]
        });
      }
    }

    const dynamicResults = results.map(b => ({
      ...b,
      date: date || new Date().toISOString().split('T')[0],
      seats: Math.floor(Math.random() * 30) + 2,
      price: Math.round(b.price * (0.9 + Math.random() * 0.2))
    }));

    res.json(dynamicResults);
  });

  // 🔌 API INTEGRATION POINT: Hotels
  app.get("/api/hotels", (req, res) => res.json(mockHotels));

  // 🔌 API INTEGRATION POINT: Products
  app.get("/api/products", (req, res) => res.json(mockProducts));

  // 🔌 API INTEGRATION POINT: Blogs
  app.get("/api/blogs", (req, res) => res.json(mockBlogs));

  // 404 for API routes
  app.use("/api/*", (req, res) => {
    console.warn(`API Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "API Route not found" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
