import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;

        if (role === "Admin") {
          navigate("/admin-dashboard");
        } else if (role === "School") {
          navigate("/school-dashboard");
        } else if (role === "Agent") {
          navigate("/agent-dashboard");
        } else {
          alert("Unknown role: " + role);
        }
      } else {
        alert("No user data found in Firestore!");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
