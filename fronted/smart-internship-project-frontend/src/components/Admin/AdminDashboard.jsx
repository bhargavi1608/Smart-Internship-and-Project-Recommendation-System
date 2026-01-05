import React, { useState } from "react";
import AdminNavbar from "../AdminNavbar";
import AdminStudents from "../AdminStudents";
import AdminApplications from "../AdminApplications";
import InternshipList from "./InternshipList";
import AdminInternships from "../AdminInternships";

import "./Admin.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="admin-header">
        <h1>🛠 Admin Dashboard</h1>
        <p>Manage students, internships & applications</p>
      </div>

      {/* NAVBAR */}
      <AdminNavbar active={activeTab} setActive={setActiveTab} />

      {/* CONTENT */}
      {activeTab === "students" && <AdminStudents />}
      {activeTab === "internships" && <AdminInternships />}
      {activeTab === "applications" && <AdminApplications />}
    </div>
  );
}

export default AdminDashboard;
