import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

 const signOut = () => {
    // clear session (optional, depending on your auth logic)
    localStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h2>SmartSpend 💸</h2>
      <nav className="sidebar-nav">
        <ul>
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === '/activity' ? 'active' : ''}>
            <Link to="/activity">Activity</Link>
          </li>
          <li className={location.pathname === '/income' ? 'active' : ''}>
            <Link to="/income">Income</Link>
          </li>
          <li className={location.pathname === '/expense' ? 'active' : ''}>
            <Link to="/expense">Expense</Link>
          </li>
        </ul>
        <ul className="sidebar-bottom">
          <li className={location.pathname === '/chatbot' ? 'active' : ''}>
            <Link to="/chatbot">Chatbot</Link>
          </li>
          <li>
            <button className="signout-btn" onClick={signOut}>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;