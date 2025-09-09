import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './Activity.css';

const Activity = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    startDate: '',
    endDate: ''
  });

  // Fetch transactions with token
  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      const res = await fetch('https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setTransactions(data);
        setFilteredTransactions(data); // initially show all
      } else if (res.status === 401) {
        alert("Session expired. Please login again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle filter input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters on button click
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    let filtered = [...transactions];

    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type.toLowerCase());
    }
    if (filters.startDate) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate));
    }

    setFilteredTransactions(filtered);
  };

  // Export CSV
  const handleExport = () => {
    if (filteredTransactions.length === 0) {
      alert("No transactions to export!");
      return;
    }

    const csvContent = [
      ['Date', 'Name', 'Category', 'Amount', 'Type'],
      ...filteredTransactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.title,
        t.category || '',
        t.amount,
        t.type
      ])
    ].map(row => row.join(',')).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    <div className="activity-container">
      <Sidebar />
      <div className="activity-main">
        <Navbar />
        <div className="activity-content">
          <h1 className="page-title">Transactions</h1>

          <form className="filters" onSubmit={handleFilterSubmit}>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All Activities</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <div className="date-filter">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </div>

            <div className="date-filter">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </div>

            <button type="submit" className="filter-btn">Filter</button>
            <button type="button" onClick={handleExport} className="export-btn">Export CSV</button>
          </form>

          <div className="table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t, idx) => (
                  <tr key={idx}>
                    <td>{new Date(t.date).toLocaleDateString()}</td>
                    <td>{t.title}</td>
                    <td>{t.category}</td>
                    <td>{t.amount}</td>
                    <td>{t.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-footer">
              <span>Showing {filteredTransactions.length} of {transactions.length} transactions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
