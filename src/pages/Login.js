import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('Agent');

  const handleLogin = () => {
    if (role === 'Admin') navigate('/admin');
    else navigate('/dashboard');
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Login</h2>
      <input placeholder="Email" /><br /><br />
      <input placeholder="Password" type="password" /><br /><br />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Agent</option>
        <option>School</option>
        <option>Admin</option>
      </select><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
