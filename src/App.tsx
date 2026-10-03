/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Flights } from "./pages/Flights";
import { Hotels } from "./pages/Hotels";
import { Trains } from "./pages/Trains";
import { Buses } from "./pages/Buses";
import { Planner } from "./pages/Planner";
import { Expenses } from "./pages/Expenses";
import { Shopping } from "./pages/Shopping";
import { Blog } from "./pages/Blog";
import { Destinations } from "./pages/Destinations";
import { Profile } from "./pages/Profile";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="flights" element={<PrivateRoute><Flights /></PrivateRoute>} />
            <Route path="hotels" element={<PrivateRoute><Hotels /></PrivateRoute>} />
            <Route path="trains" element={<PrivateRoute><Trains /></PrivateRoute>} />
            <Route path="buses" element={<PrivateRoute><Buses /></PrivateRoute>} />
            <Route path="planner" element={<PrivateRoute><Planner /></PrivateRoute>} />
            <Route path="expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
            <Route path="shopping" element={<PrivateRoute><Shopping /></PrivateRoute>} />
            <Route path="blog/:city" element={<Blog />} />
            <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

