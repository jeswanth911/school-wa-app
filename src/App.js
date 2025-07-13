import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

function AdminDashboard() {
  return <h1>👑 Admin Dashboard</h1>;
}

function SchoolDashboard() {
  return <h1>🏫 School Dashboard</h1>;
}

function AgentDashboard() {
  return <h1>📦 Agent Dashboard</h1>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/school-dashboard" element={<SchoolDashboard />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
      </Routes>
    </Router>
  );
  }

