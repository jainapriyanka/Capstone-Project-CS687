import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Activity from "./pages/Activity";
import './App.css'; // Optional: for global layout styles

function AppContent() {
  const location = useLocation();
  const showLayout = location.pathname === "/dashboard" || location.pathname === "/activity";

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
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
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