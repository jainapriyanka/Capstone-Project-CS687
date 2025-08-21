import React from "react";
import "./Form.css";

const Form = ({ formData, setFormData, handleSubmit, type }) => {
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{type} Form</h2>
      
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Amount"
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

      <button type="submit">Add {type}</button>
    </form>
  );
};

export default Form;