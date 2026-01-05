import { useEffect, useState } from "react";
import InternshipList from "./InternshipList";
import ProjectList from "./ProjectList";
import StudentProfile from "./StudentProfile";
import { apiGet } from "../../services/api";

export default function StudentDashboard() {

  const [internships, setInternships] = useState([]);
  const [projects, setProjects] = useState([]);

  const [recommendedInternships, setRecommendedInternships] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);

  const [activeTab, setActiveTab] = useState("INTERNSHIPS");
  const [showProfile, setShowProfile] = useState(false);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    apiGet("/internships").then(setInternships);
    apiGet("/projects").then(setProjects);
  }, []);

  const recommend = () => {
    apiGet(`/recommend/internships/${studentId}`)
      .then(setRecommendedInternships);

    apiGet(`/recommend/projects/${studentId}`)
      .then(setRecommendedProjects);
  };

  return (
    <div style={styles.dashboard}>

      {/* ===== SIDEBAR ===== */}
      <div style={styles.sidebar}>
        <h3>Menu</h3>

        <button
          style={styles.menuBtn}
          onClick={() => setActiveTab("INTERNSHIPS")}
        >
          Internships
        </button>

        <button
          style={styles.menuBtn}
          onClick={() => setActiveTab("PROJECTS")}
        >
          Projects
        </button>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div
        style={{
          ...styles.mainContent,
          marginRight: showProfile ? "320px" : "0px"
        }}
      >
        {/* INTERNSHIPS */}
        {activeTab === "INTERNSHIPS" && (
          <>
            <h2>Internships</h2>

            <button className="btn" onClick={recommend}>
              Recommend for Me
            </button>

            {recommendedInternships.length > 0 && (
              <>
                <h3>Recommended Internships</h3>
                <InternshipList data={recommendedInternships} showApply />
              </>
            )}

            <h3>All Internships</h3>
            <InternshipList data={internships} showApply />
          </>
        )}

        {/* PROJECTS */}
        {activeTab === "PROJECTS" && (
          <>
            <h2>Projects</h2>

            {recommendedProjects.length > 0 && (
              <>
                <h3>Recommended Projects</h3>
                <ProjectList data={recommendedProjects} />
              </>
            )}

            <h3>All Projects</h3>
            <ProjectList data={projects} />
          </>
        )}
      </div>

      {/* ===== PROFILE PANEL (RIGHT SIDE) ===== */}
      {showProfile && (
        <div style={styles.profilePanel}>
          <StudentProfile studentId={studentId} />
        </div>
      )}

      {/* ===== USER ICON ===== */}
      <div style={styles.topRight}>
        <div
          style={styles.userCircle}
          onClick={() => setShowProfile(!showProfile)}
          title="Profile"
        >
          👤
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */
const styles = {
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    position: "relative"
  },
  sidebar: {
    width: "220px",
    background: "#ffffff",
    padding: "20px",
    borderRight: "1px solid #ddd"
  },
  menuBtn: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "6px",
    background: "#f1f3f4",
    cursor: "pointer",
    fontWeight: "600"
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    transition: "margin-right 0.3s ease"
  },
  profilePanel: {
    width: "300px",
    background: "#ffffff",
    borderLeft: "1px solid #ddd",
    padding: "20px",
    position: "fixed",
    right: 0,
    top: 0,
    height: "100vh",
    overflowY: "auto"
  },
  topRight: {
    position: "fixed",
    top: "15px",
    right: "20px",
    zIndex: 1000
  },
  userCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#1a73e8",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  }
};
