import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function SchoolDashboard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [students, setStudents] = useState([]);

  const [templateTitle, setTemplateTitle] = useState("");
  const [templateMessage, setTemplateMessage] = useState("");
  const [templates, setTemplates] = useState([]);

  const user = auth.currentUser;

  const addStudent = async () => {
    if (!name || !phone) {
      alert("Please enter all fields");
      return;
    }

    try {
      await addDoc(collection(db, "students", user.uid, "list"), {
        name,
        phone,
      });
      alert("Student added!");
      setName("");
      setPhone("");
      fetchStudents(); // reload
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

  const addTemplate = async () => {
    if (!templateTitle || !templateMessage) {
      alert("Please fill both fields");
      return;
    }

    try {
      await addDoc(collection(db, "templates", user.uid, "list"), {
        title: templateTitle,
        message: templateMessage,
      });
      alert("✅ Template Saved!");
      setTemplateTitle("");
      setTemplateMessage("");
      fetchTemplates();
    } catch (e) {
      console.error("Error saving template", e);
    }
  };

  const fetchTemplates = async () => {
    const querySnapshot = await getDocs(collection(db, "templates", user.uid, "list"));
    const tempList = [];
    querySnapshot.forEach((doc) => {
      tempList.push(doc.data());
    });
    setTemplates(tempList);
  };

  useEffect(() => {
    if (user) {
      fetchStudents();
      fetchTemplates();
    }
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏫 School Dashboard</h2>

      <h4>👤 Add Student</h4>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /><br /><br />
      <button onClick={addStudent}>➕ Add Student</button>

      <h4 style={{ marginTop: "30px" }}>📋 Student List</h4>
      <ul>
        {students.map((s, index) => (
          <li key={index}>{s.name} - {s.phone}</li>
        ))}
      </ul>

      <h4 style={{ marginTop: "30px" }}>🧾 Add Message Template</h4>
      <input
        type="text"
        placeholder="Template Title"
        value={templateTitle}
        onChange={(e) => setTemplateTitle(e.target.value)}
      /><br /><br />
      <textarea
        rows="4"
        placeholder="Message Body"
        value={templateMessage}
        onChange={(e) => setTemplateMessage(e.target.value)}
      /><br /><br />
      <button onClick={addTemplate}>➕ Save Template</button>

      <h4 style={{ marginTop: "30px" }}>📄 Your Templates</h4>
      <ul>
        {templates.map((t, idx) => (
          <li key={idx}>
            <strong>{t.title}</strong>: {t.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
