import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Admin.css";

function AdminStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get("/students")
      .then(setStudents)
      .catch(console.error);
  }, []);

  return (
    <div className="admin-card">
      <h2>👨‍🎓 Registered Students</h2>

      {students.length === 0 && (
        <p className="empty">No students found</p>
      )}

      <div className="admin-student-grid">
        {students.map(student => (
          <div key={student.id} className="admin-student-card">
            <h3>{student.name}</h3>

            <p className="student-email">
              📧 {student.email}
            </p>

            <div className="student-skills">
              {student.skills
                ?.split(",")
                .map(skill => (
                  <span key={skill} className="skill-chip">
                    {skill.trim()}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminStudents;
