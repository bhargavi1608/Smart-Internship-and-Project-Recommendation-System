import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Admin.css";

function AdminApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get("/applications/admin")
      .then(setApps)
      .catch(console.error);
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/applications/${id}/status?status=${status}`);
    setApps(apps.map(a =>
      a.id === id ? { ...a, status } : a
    ));
  };

  return (
    <div className="admin-card">
      <h2>📋 Internship Applications</h2>

      {apps.length === 0 && (
        <p className="empty">No applications found</p>
      )}

      <div className="admin-grid">
        {apps.map(app => (
          <div key={app.id} className="admin-app-card">
            <h3>{app.internshipTitle}</h3>

            <p><b>Student:</b> {app.studentName}</p>
            <p><b>Email:</b> {app.studentEmail}</p>
            <p><b>Company:</b> {app.company}</p>

            <span className={`status-badge ${app.status.toLowerCase()}`}>
              {app.status}
            </span>

            <div className="admin-actions">
              <button
                className="approve"
                onClick={() => updateStatus(app.id, "ACCEPTED")}
              >
                Approve
              </button>
              <button
                className="reject"
                onClick={() => updateStatus(app.id, "REJECTED")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminApplications;
