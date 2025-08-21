import React, { useEffect } from "react";
import "./Dashboard.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

const data = [
  { date: "11/07/2020", income: 27000, expense: 52000 },
  { date: "05/09/2023", income: 25000, expense: 15000 },
  { date: "04/03/2017", income: 40000, expense: 0 },
  { date: "09/07/2024", income: 10000, expense: 5000 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect to login page
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className="summary-cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>$102000</p>
        </div>
        <div className="card">
          <h3>Total Expense</h3>
          <p>$74870</p>
        </div>
        <div className="card">
          <h3>Total Balance</h3>
          <p>$27130</p>
        </div>
      </div>

      <div className="main-content">
        <div className="left-panel">
          <h2>All Transactions</h2>
          <div className="graph-card">
            <LineChart width={500} height={300} data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="green" />
              <Line type="monotone" dataKey="expense" stroke="red" />
            </LineChart>
          </div>
        </div>

        <div className="right-panel">
          <h2>Recent History</h2>
          <div className="history-list">
            <div className="history-item expense">Renovation -52000</div>
            <div className="history-item income">Salary +27000</div>
            <div className="history-item expense">Festival -15870</div>
            <div className="history-item expense">Fare Charges -2000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
