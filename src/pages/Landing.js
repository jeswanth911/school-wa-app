import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1> School WhatsApp Reminder App</h1>
      <p>Send fee and event reminders easily.</p>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
}
