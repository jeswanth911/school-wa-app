// src/pages/SchoolDashboard.js
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function SchoolDashboard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [students, setStudents] = useState([]);

  const user = auth.currentUser;

  const addStudent = async () => {
    if (!name || !phone) {
      alert("Please enter all fields");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "students", user.uid, "list"), {
        name,
        phone,
      });
      alert("Student added!");
      setName("");
      setPhone("");
      fetchStudents(); // reload list
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students", user.uid, "list"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setStudents(data);
  };

  useEffect(() => {
    if (user) {
      fetchStudents();
    }
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏫 School Dashboard</h2>

      <h4>Add Student</h4>
      <input type="text" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
      <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} /><br /><br />
      <button onClick={addStudent}>➕ Add Student</button>

      <h4 style={{ marginTop: "30px" }}>📋 Student List</h4>
      <ul>
        {students.map((s, index) => (
          <li key={index}>{s.name} - {s.phone}</li>
        ))}
      </ul>
    </div>
  );
}
