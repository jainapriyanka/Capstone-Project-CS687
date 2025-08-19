import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Activity from "./pages/Activity";
import Signup from "./pages/Signup";
import Chatbot from "./pages/Chatbot";
import './App.css'; // Optional: for global layout styles

function AppContent() {
  const location = useLocation();
  const showLayout = location.pathname === "/dashboard" || location.pathname === "/activity" || location.pathname === "/chatbot";

  return (
    <>
      {showLayout ? (
        <div className="app-layout">
          <Sidebar />
          <div className="main-section">
            <Navbar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;