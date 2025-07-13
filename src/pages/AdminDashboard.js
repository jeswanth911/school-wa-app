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
