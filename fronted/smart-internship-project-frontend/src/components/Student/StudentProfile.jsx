import { useEffect, useState } from "react";

export default function StudentProfile({ studentId }) {

  const [student, setStudent] = useState(null);
  const [skills, setSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!studentId) return;

    fetch(`http://localhost:8080/api/students/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setStudent(data);
        setSkills(data.skills ? data.skills.split(",") : []);
      })
      .catch(err => console.error("Profile fetch error", err));
  }, [studentId]);

  const addSkill = () => {
    if (inputSkill.trim()) {
      setSkills([...skills, inputSkill.trim()]);
      setInputSkill("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const saveSkills = async () => {
    await fetch(`http://localhost:8080/api/students/${studentId}/skills`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: skills.join(",") })
    });
    alert("Skills updated");
    setEditMode(false);
  };

  if (!student) return <p>Loading profile...</p>;

  return (
    <div>
      <h3>Student Profile</h3>

      <p><b>Name:</b> {student.name}</p>
      <p><b>Email:</b> {student.email}</p>

      <hr />

      {/* SKILLS */}
      <div style={styles.chips}>
        {skills.map((skill, index) => (
          <div key={index} style={styles.chip}>
            {skill}
            {editMode && (
              <span
                style={styles.remove}
                onClick={() => removeSkill(index)}
              >
                ✕
              </span>
            )}
          </div>
        ))}
      </div>

      {/* EDIT MODE */}
      {editMode ? (
        <>
          <input
            value={inputSkill}
            onChange={e => setInputSkill(e.target.value)}
            placeholder="Add skill"
            style={styles.input}
          />
          <button className="btn" onClick={addSkill}>
            + Add
          </button>

          <button
            className="btn"
            style={{ marginTop: "10px", width: "100%" }}
            onClick={saveSkills}
          >
            Save Skills
          </button>
        </>
      ) : (
        <button
          className="btn"
          style={{ width: "100%", marginTop: "10px" }}
          onClick={() => setEditMode(true)}
        >
          Edit Skills
        </button>
      )}
    </div>
  );
}

const styles = {
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "10px"
  },
  chip: {
    background: "#e3f2fd",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  remove: {
    cursor: "pointer",
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    padding: "6px",
    marginBottom: "5px"
  }
};
