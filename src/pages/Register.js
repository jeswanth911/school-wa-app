import React from 'react';

export default function Register() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Register</h2>
      <input placeholder="Name" /><br /><br />
      <input placeholder="Email" /><br /><br />
      <input placeholder="Password" type="password" /><br /><br />
      <button>Register</button>
    </div>
  );
}
