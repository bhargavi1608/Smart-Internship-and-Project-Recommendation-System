import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Admin.css";

function AdminInternships() {
  const [internships, setInternships] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    duration: "",
    requiredSkills: ""
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const data = await API.get("/internships");

      console.log("Internships API response:", data);

      // ✅ SAFETY CHECK
      if (Array.isArray(data)) {
        setInternships(data);
      } else {
        setInternships([]);
      }
    } catch (err) {
      console.error(err);
      setInternships([]);
    }
  };

  const submitInternship = async () => {
    if (!form.title || !form.company) return;

    try {
      await API.post("/internships", form);

      setForm({
        title: "",
        company: "",
        location: "",
        duration: "",
        requiredSkills: ""
      });

      fetchInternships();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-card">
      <h2>🎯 Internship Management</h2>

      {/* ADD INTERNSHIP */}
      <div className="internship-form">
        <h3>➕ Add Internship</h3>

        <div className="form-row">
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Company"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
          />
        </div>

        <div className="form-row">
          <input
            placeholder="Location"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
          />
          <input
            placeholder="Duration"
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />
        </div>

        <input
          placeholder="Required Skills (html,css,js)"
          value={form.requiredSkills}
          onChange={e => setForm({ ...form, requiredSkills: e.target.value })}
        />

        <button onClick={submitInternship}>Add Internship</button>
      </div>

      {/* INTERNSHIP LIST */}
      {internships.length === 0 ? (
        <p className="empty">No internships found</p>
      ) : (
        <div className="admin-internship-grid">
          {internships.map(i => (
            <div key={i.id} className="admin-internship-card">
              <h3>{i.title}</h3>
              <p><b>Company:</b> {i.company}</p>
              <p><b>Location:</b> {i.location}</p>
              <p><b>Duration:</b> {i.duration}</p>

              <div className="student-skills">
                {i.requiredSkills?.split(",").map(skill => (
                  <span key={skill} className="skill-chip">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminInternships;
