// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("school");

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("role", role);
      localStorage.setItem("auth", "true");
      navigate(role === "school" ? "/dashboard/school" : "/dashboard/agent");
    }
  };

  return (
    <div style={styles.center}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)} style={{ marginBottom: 10 }}>
        <option value="school">School</option>
        <option value="agent">Agent</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const SchoolDashboard = () => {
  return (
    <div style={styles.dashboard}>
      <h1>🎓 School Dashboard</h1>
      <ul>
        <li>👥 Students</li>
        <li>📩 Templates</li>
        <li>🔧 WhatsApp Settings</li>
        <li>📆 Schedule</li>
      </ul>
    </div>
  );
};

const AgentDashboard = () => {
  return (
    <div style={styles.dashboard}>
      <h1>🧑‍💼 Agent Dashboard</h1>
      <ul>
        <li>🏫 Manage Multiple Schools</li>
        <li>📊 View Logs</li>
        <li>👥 Assist Students</li>
      </ul>
    </div>
  );
};

const ProtectedRoute = ({ element, role }) => {
  const auth = localStorage.getItem("auth") === "true";
  const savedRole = localStorage.getItem("role");

  if (!auth || savedRole !== role) {
    return <Login />;
  }

  return element;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/school" element={<ProtectedRoute role="school" element={<SchoolDashboard />} />} />
        <Route path="/dashboard/agent" element={<ProtectedRoute role="agent" element={<AgentDashboard />} />} />
      </Routes>
    </Router>
  );
}

const styles = {
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    gap: 10
  },
  dashboard: {
    padding: 20
  }
};
  
