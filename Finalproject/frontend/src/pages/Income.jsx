import React, { useState } from "react";
import "./ExpenseIncome.css";
import Form from "./Form.jsx";

const Income = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    reference: ""
  });

  const [incomes, setIncomes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIncomes([...incomes, formData]);
    setFormData({ title: "", amount: "", date: "", category: "", reference: "" });
  };

  const handleDelete = (index) => {
    setIncomes(incomes.filter((_, i) => i !== index));
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
        {incomes.map((inc, index) => (
          <div className="item-card" key={index}>
            <div className="item-info">
              <div className="icon-circle"></div>
              <div>
                <h3>{inc.title}</h3>
                <p>${inc.amount} • {inc.date}</p>
                <p className="reference">{inc.reference}</p>
              </div>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(index)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Income;