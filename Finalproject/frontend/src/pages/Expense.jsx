import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExpenseIncome.css";

const Expense = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    reference: ""
  });

  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from backend when page loads
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // user not logged in

      const res = await axios.get(
        "https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/transactions?type=expense",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ include token
          },
        }
      );
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        "https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/transactions",
        {
          title: formData.title,
          amount: Number(formData.amount),
          date: formData.date,
          type: "expense",
          category: formData.category,
          reference: formData.reference
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ include token
          },
        }
      );

      setExpenses([...expenses, res.data.data]); // add new expense dynamically
      setFormData({ title: "", amount: "", date: "", category: "", reference: "" });
    } catch (err) {
      console.error("Error adding expense:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(
        `https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ include token
          },
        }
      );
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err.message);
    }
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="expense-income-container">
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Expense Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Expense Amount"
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
            <option value="Rent">Rent</option>
            <option value="House Loan">House Loan</option>
            <option value="Car Loan">Car Loan</option>
            <option value="Festival">Festival</option>
            <option value="Fare Charges">Fare Charges</option>
            <option value="Meal">Meal</option>
            <option value="Groceries">Groceries</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            placeholder="Add A Reference"
            value={formData.reference}
            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
          />
          <button type="submit" className="add-btn">+ Add Expense</button>
        </form>
      </div>

      <div className="list-section">
        <h2>
          Total Expense: <span className="total-amount">${totalExpense}</span>
        </h2>
        {expenses.map((exp) => (
          <div className="item-card" key={exp._id}>
            <div className="item-info">
              <div className="icon-circle"></div>
              <div>
                <h3>{exp.title}</h3>
                <p>${exp.amount} • {new Date(exp.date).toLocaleDateString()} • {exp.category}</p>
                <p className="reference">{exp.reference}</p>
              </div>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(exp._id)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
