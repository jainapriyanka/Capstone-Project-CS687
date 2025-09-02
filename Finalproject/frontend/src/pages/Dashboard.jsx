import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactions: []
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect to login page
      return;
    }
    console.log("token:", token);
    const fetchSummary = async () => {
        try {
          const token = localStorage.getItem("token");
                if (!token) {
                  navigate("/"); // redirect to login page
                  return;
                }
          const res = await axios.get(
            "https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/dashboard",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const rawTransactions = res.data.transactions;
          const formattedData = res.data.transactions.map(tx => ({
              date: new Date(tx.date).toLocaleDateString(), // convert to readable date
              income: tx.type === "income" ? tx.amount : 0,
              expense: tx.type === "expense" ? tx.amount : 0
            }));

          setSummary({
            totalIncome: res.data.totalIncome,
            totalExpense: res.data.totalExpense,
            balance: res.data.balance,
            transactions: formattedData,
            history: rawTransactions 
          });

        } catch (err) {
          console.error("Error fetching summary:", err);
        }
      };

    fetchSummary();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Summary cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>${summary.totalIncome}</p>
        </div>
        <div className="card">
          <h3>Total Expense</h3>
          <p>${summary.totalExpense}</p>
        </div>
        <div className="card">
          <h3>Total Balance</h3>
          <p>${summary.balance}</p>
        </div>
      </div>

      {/* Graph + History */}
      <div className="main-content">
        <div className="left-panel">
          <h2>All Transactions</h2>
          <div className="graph-card">
              <LineChart width={500} height={300} data={summary.transactions}>
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
            {summary.history?.slice(-5).reverse().map((t) => (
              <div
                key={t._id}
                className={`history-item ${t.type}`}
              >
                {t.title} ({new Date(t.date).toLocaleDateString()}) {t.type === "expense" ? "-" : "+"}${t.amount}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
