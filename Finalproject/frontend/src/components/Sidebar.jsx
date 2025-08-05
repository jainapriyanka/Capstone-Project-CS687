import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <h2>SmartSpend 💸</h2>
      <nav>
        <ul>
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === '/activity' ? 'active' : ''}>
            <Link to="/activity">Activity</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
