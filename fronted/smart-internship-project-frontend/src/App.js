import { Routes, Route } from "react-router-dom";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Sign_up";
import StudentDashboard from "./components/Student/StudentDashboard";
import StudentProfile from "./components/Student/StudentProfile";
import "./index.css"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;
