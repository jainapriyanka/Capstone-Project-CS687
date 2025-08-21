import React, { useState } from "react";
import "./ExpenseIncome.css";
import Form from "./Form.jsx";

const Expense = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    reference: ""
  });

  const [expenses, setExpenses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses([...expenses, formData]);
    setFormData({ title: "", amount: "", date: "", category: "", reference: "" });
  };

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
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
            <option value="Renovation">Renovation</option>
            <option value="Festival">Festival</option>
            <option value="Fare Charges">Fare Charges</option>
            <option value="Meal">Meal</option>
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
        {expenses.map((exp, index) => (
          <div className="item-card" key={index}>
            <div className="item-info">
              <div className="icon-circle"></div>
              <div>
                <h3>{exp.title}</h3>
                <p>${exp.amount} • {exp.date}</p>
                <p className="reference">{exp.reference}</p>
              </div>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(index)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expense;