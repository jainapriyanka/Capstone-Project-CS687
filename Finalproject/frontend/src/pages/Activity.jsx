import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './Activity.css';

const Activity = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    type: '',
    reference: ''
  });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    startDate: '',
    endDate: ''
  });

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await fetch('https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/transactions');
      const data = await res.json();
      if (res.ok) {
        setTransactions(data);
        setFilteredTransactions(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Transaction added!');
        setFormData({ title: '', amount: '', date: '', type: '', reference: '' });
        fetchTransactions();
      } else alert(data.error || 'Something went wrong');
    } catch (error) {
      console.error(error);
      alert('Failed to add transaction');
    }
  };

  // Handle filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    let filtered = [...transactions];
    if (newFilters.search) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(newFilters.search.toLowerCase())
      );
    }
    if (newFilters.category) {
      filtered = filtered.filter(t => t.category === newFilters.category);
    }
    if (newFilters.startDate) {
      filtered = filtered.filter(t => t.date >= newFilters.startDate);
    }
    if (newFilters.endDate) {
      filtered = filtered.filter(t => t.date <= newFilters.endDate);
    }
    setFilteredTransactions(filtered);
  };

  // Export CSV
  const handleExport = () => {
    const csv = [
      ['Date', 'Name', 'Category', 'Amount'],
      ...filteredTransactions.map(t => [t.date, t.title, t.category, t.amount])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csv], { type: 'text/csv' });
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

          <div className="filters">
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={filters.search}
              onChange={handleFilterChange}
              className="search-box"
            />
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Rent">Rent</option>
              <option value="Groceries">Groceries</option>
              <option value="Dining">Dining</option>
              <option value="Shopping">Shopping</option>
              <option value="Transport">Transport</option>
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

            <button onClick={handleExport} className="export-btn">EXPORT</button>
          </div>

          <div className="table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.date}</td>
                    <td>{t.title}</td>
                    <td>{t.category}</td>
                    <td>{t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-footer">
              <span>1–10 of {transactions.length}</span>
              <div className="pagination">{/* pagination arrows if needed */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;