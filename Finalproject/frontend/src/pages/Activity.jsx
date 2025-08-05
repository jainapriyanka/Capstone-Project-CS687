import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './Activity.css';

const Activity = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    type: '',
    reference: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        alert('Transaction added!');
        setFormData({ title: '', amount: '', date: '', type: '', reference: '' });
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add transaction');
    }
  };

  return (
    <div className="activity-container">
      <Sidebar />
      <div className="activity-main">
        <Navbar />
        <div className="activity-content">
          <h1>Add a Transaction</h1>
          <form className="expense-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Expense Title"
              required
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <textarea
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="Add a reference"
            />
            <button type="submit">+ Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Activity;
