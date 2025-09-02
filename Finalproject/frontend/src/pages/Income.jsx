import React, { useState, useEffect } from "react";
import axios from "axios"; // 👈 import axios
import "./ExpenseIncome.css";

const Income = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    reference: ""
  });

  const [incomes, setIncomes] = useState([]);

  // Fetch incomes from backend when page loads
  const fetchIncomes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // user not logged in

      const res = await axios.get(
        "https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/transactions?type=income",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ include token
          },
        }
      );
      setIncomes(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const res = await axios.post(
      "https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/transactions",
      {
        title: formData.title,
        amount: Number(formData.amount),
        date: formData.date,
        type: "income",
        category: formData.category,
        reference: formData.reference
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

      setIncomes([...incomes, res.data.data]); // add new income dynamically
      setFormData({ title: "", amount: "", date: "", category: "", reference: "" });
    } catch (err) {
      console.error("Error adding income:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/transactions/${id}`);
      setIncomes(incomes.filter((inc) => inc._id !== id));
    } catch (err) {
      console.error("Error deleting income:", err.message);
    }
  };

  const totalIncome = incomes.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="expense-income-container">
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Income Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Income Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select Option</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investments">Investments</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            placeholder="Add A Reference"
            value={formData.reference}
            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
          />
          <button type="submit" className="add-btn">+ Add Income</button>
        </form>
      </div>

      <div className="list-section">
        <h2>
          Total Income: <span className="total-amount income">${totalIncome}</span>
        </h2>
        {incomes.map((inc) => (
          <div className="item-card" key={inc._id}>
            <div className="item-info">
              <div className="icon-circle"></div>
              <div>
                <h3>{inc.title}</h3>
                <p>${inc.amount} • {new Date(inc.date).toLocaleDateString()}</p>
                <p className="reference">{inc.reference}</p>
              </div>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(inc._id)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Income;
