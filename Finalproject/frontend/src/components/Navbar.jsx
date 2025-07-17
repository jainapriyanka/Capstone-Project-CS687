import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Expense Tracker</h1>
      <div className="nav-links">
        <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">Dashboard</Link>
        <Link className={location.pathname === "/activity" ? "active" : ""} to="/activity">Activity</Link>
      </div>
    </nav>
  );
}

export default Navbar;
