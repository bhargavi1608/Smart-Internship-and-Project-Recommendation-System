import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiPost } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await apiPost("/auth/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      // ✅ Save login info
      localStorage.setItem("studentId", res.studentId);
      localStorage.setItem("studentName", res.name);
      localStorage.setItem("studentEmail", res.email);

      // ✅ Redirect to dashboard
      navigate("/student");

    } catch (err) {
      alert(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={login}>
        <h2 style={styles.title}>Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.footerText}>
          New user?{" "}
          <Link to="/signup" style={styles.link}>
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  card: {
    width: "350px",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  footerText: {
    marginTop: "15px",
    fontSize: "14px",
  },

  link: {
    color: "#667eea",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
  },
};
