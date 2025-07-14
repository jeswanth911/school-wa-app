import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function BulkStudentUploader() {
  const [students, setStudents] = useState([{ name: "", phone: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const addRow = () => {
    setStudents([...students, { name: "", phone: "" }]);
  };

  const saveAll = async () => {
    const user = auth.currentUser;
    if (!user) return alert("User not authenticated");

    try {
      for (const s of students) {
        if (s.name && s.phone) {
          await addDoc(collection(db, "students", user.uid, "list"), s);
        }
      }
      alert("✅ All students saved!");
      setStudents([{ name: "", phone: "" }]);
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", marginTop: 20 }}>
      <h3>🧑‍🎓 Bulk Student Entry</h3>
      {students.map((s, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Name"
            value={s.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
            style={{ marginRight: 10 }}
          />
          <input
            type="text"
            placeholder="Phone"
            value={s.phone}
            onChange={(e) => handleChange(i, "phone", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addRow}>➕ Add Row</button>
      <button onClick={saveAll} style={{ marginLeft: 10 }}>💾 Save All</button>
    </div>
  );
}
