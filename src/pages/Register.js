import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("School");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
      });

      alert("✅ Registered Successfully!");
    } catch (error) {
      alert("❌ Error: " + error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Register</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} /><br /><br />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="School">School</option>
        <option value="Agent">Agent</option>
        <option value="Admin">Admin</option>
      </select><br /><br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
  }
  
