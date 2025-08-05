import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-content">
          <h2>Welcome back, Nikki 👋</h2>
          <div className="summary-cards">
            <div className="card income-card">
              <h3>Total Income</h3>
              <p>$92,350</p>
            </div>
            <div className="card expense-card">
              <h3>Total Expense</h3>
              <p>$74,870</p>
            </div>
            <div className="card balance-card">
              <h3>Balance</h3>
              <p>$17,480</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
