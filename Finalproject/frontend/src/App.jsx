import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Activity from "./pages/Activity";
import Signup from "./pages/Signup";
import Chatbot from "./pages/Chatbot";
import Expense from "./pages/Expense";
import Income from "./pages/Income";
import PrivateRoute from "./components/PrivateRoute"; // import new component
import './App.css';

function AppContent() {
  const location = useLocation();
  const showLayout = location.pathname === "/dashboard" || location.pathname === "/activity" || location.pathname === "/chatbot" || location.pathname === "/income" || location.pathname === "/expense";

  return (
    <>
      {showLayout ? (
        <div className="app-layout">
          <Sidebar />
          <div className="main-section">
            <Navbar />
            <Routes>
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/activity" element={<PrivateRoute><Activity /></PrivateRoute>} />
              <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
              <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
              <Route path="/expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
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
