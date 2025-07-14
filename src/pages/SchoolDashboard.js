import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import BulkStudentUploader from "../components/BulkStudentUploader";

export default function SchoolDashboard() {
  const [templateTitle, setTemplateTitle] = useState("");
  const [templateMessage, setTemplateMessage] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [students, setStudents] = useState([]);

  const user = auth.currentUser;

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(
      collection(db, "students", user.uid, "list")
    );
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
    const querySnapshot = await getDocs(
      collection(db, "templates", user.uid, "list")
    );
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

    const url = `https://wa.me/91${student.phone}?text=${encodeURIComponent(
      message
    )}`;
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

      {/* 📋 Bulk Upload Students */}
      <BulkStudentUploader />

      {/* 🧾 Add New Template */}
      <h4>🧾 Add Template</h4>
      <input
        placeholder="Template Title"
        value={templateTitle}
        onChange={(e) => setTemplateTitle(e.target.value)}
      />
      <br />
      <br />
      <textarea
        placeholder="Message Body (use {name}, {amount}, {due_date})"
        value={templateMessage}
        onChange={(e) => setTemplateMessage(e.target.value)}
      />
      <br />
      <br />
      <button onClick={addTemplate}>➕ Save Template</button>

      {/* 📄 List of Templates */}
      <h4>📄 Your Templates</h4>
      <ul>
        {templates.map((t, i) => (
          <li key={i}>
            <strong>{t.title}</strong>: {t.message}
          </li>
        ))}
      </ul>

      {/* 📲 Send WhatsApp Message */}
      <h4>📲 Send WhatsApp</h4>
      <select onChange={(e) => setSelectedStudent(e.target.value)}>
        <option value="">Select Student</option>
        {students.map((s, i) => (
          <option key={i} value={JSON.stringify(s)}>
            {s.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <select onChange={(e) => setSelectedTemplate(e.target.value)}>
        <option value="">Select Template</option>
        {templates.map((t, i) => (
          <option key={i} value={JSON.stringify(t)}>
            {t.title}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button onClick={handleSend}>📤 Send WhatsApp</button>
    </div>
  );
}
