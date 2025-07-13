import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function AdminDashboard() {
  const [schools, setSchools] = useState([]);

  const fetchSchools = async () => {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const schoolsData = [];

    for (const doc of usersSnapshot.docs) {
      const uid = doc.id;
      const studentSnap = await getDocs(collection(db, 'students', uid, 'list'));
      const templateSnap = await getDocs(collection(db, 'templates', uid, 'list'));

      schoolsData.push({
        email: doc.data().email,
        students: studentSnap.size,
        templates: templateSnap.size,
      });
    }

    setSchools(schoolsData);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      {schools.map((s, i) => (
        <div key={i} className="mt-2 p-3 border rounded shadow">
          <p><strong>Email:</strong> {s.email}</p>
          <p>👥 Students: {s.students} | 🧾 Templates: {s.templates}</p>
        </div>
      ))}
    </div>
  );
}

// =========================
// 🏫 SchoolDashboard.js
// =========================
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
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

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
      fetchStudents();
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

  const handleSend = () => {
    if (!selectedStudent || !selectedTemplate) {
      alert("Please select both student and template");
      return;
    }

    const student = JSON.parse(selectedStudent);
    const template = JSON.parse(selectedTemplate);

    let message = template.message
      .replace("{name}", student.name || "")
      .replace("{amount}", student.amount || "")
      .replace("{due_date}", student.due_date || "");

    const url = `https://wa.me/91${student.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
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
      <input placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
      <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br /><br />
      <button onClick={addStudent}>➕ Add Student</button>
      <h4>📋 Student List</h4>
      <ul>{students.map((s, i) => <li key={i}>{s.name} - {s.phone}</li>)}</ul>

      <h4>🧾 Add Template</h4>
      <input placeholder="Template Title" value={templateTitle} onChange={(e) => setTemplateTitle(e.target.value)} /><br /><br />
      <textarea placeholder="Message Body (use {name})" value={templateMessage} onChange={(e) => setTemplateMessage(e.target.value)} /><br /><br />
      <button onClick={addTemplate}>➕ Save Template</button>

      <h4>📄 Your Templates</h4>
      <ul>{templates.map((t, i) => <li key={i}><strong>{t.title}</strong>: {t.message}</li>)}</ul>

      <h4>📲 Send WhatsApp</h4>
      <select onChange={(e) => setSelectedStudent(e.target.value)}>
        <option value="">Select Student</option>
        {students.map((s, i) => <option key={i} value={JSON.stringify(s)}>{s.name}</option>)}
      </select><br /><br />
      <select onChange={(e) => setSelectedTemplate(e.target.value)}>
        <option value="">Select Template</option>
        {templates.map((t, i) => <option key={i} value={JSON.stringify(t)}>{t.title}</option>)}
      </select><br /><br />
      <button onClick={handleSend}>📤 Send WhatsApp</button>
    </div>
  );
    }
