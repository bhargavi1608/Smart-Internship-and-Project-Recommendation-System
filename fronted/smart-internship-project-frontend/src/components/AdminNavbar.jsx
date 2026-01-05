import React from "react";
import "./Admin.css";

function AdminNavbar({ active, setActive }) {
  return (
    <div className="admin-navbar">
      <button
        className={active === "students" ? "nav-btn active" : "nav-btn"}
        onClick={() => setActive("students")}
      >
        👨‍🎓 Students
      </button>

      <button
        className={active === "internships" ? "nav-btn active" : "nav-btn"}
        onClick={() => setActive("internships")}
      >
        🎯 Internships
      </button>

      <button
        className={active === "applications" ? "nav-btn active" : "nav-btn"}
        onClick={() => setActive("applications")}
      >
        📋 Applications
      </button>
    </div>
  );
}

export default AdminNavbar;
