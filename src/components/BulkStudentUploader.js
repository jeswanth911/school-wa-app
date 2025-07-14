import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function BulkStudentUploader() {
  const [bulkText, setBulkText] = useState("");

  const handleBulkUpload = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated");
      return;
    }

    const lines = bulkText.split("\n");
    const students = lines.map((line) => {
      const [name, phone] = line.split(",");
      return { name: name?.trim(), phone: phone?.trim() };
    });

    try {
      for (const student of students) {
        if (student.name && student.phone) {
          await addDoc(collection(db, "students", user.uid, "list"), student);
        }
      }
      alert("✅ All students uploaded successfully!");
      setBulkText("");
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Upload failed");
    }
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", marginTop: 20 }}>
      <h3>📋 Paste Students (Name,Phone)</h3>
      <textarea
        rows="10"
        cols="40"
        placeholder="Ravi,9876543210\nSita,9876543211"
        value={bulkText}
        onChange={(e) => setBulkText(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <br />
      <button onClick={handleBulkUpload}>📤 Upload All Students</button>
    </div>
  );
          }
