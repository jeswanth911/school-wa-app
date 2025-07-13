import React from 'react';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🛠 Admin Dashboard</h1>
      <ul>
        <li>📋 View All Agents</li>
        <li>🏫 View All Schools</li>
        <li>➕ Add Agent / School</li>
        <li>📊 Message Stats</li>
      </ul>
    </div>
  );
}
