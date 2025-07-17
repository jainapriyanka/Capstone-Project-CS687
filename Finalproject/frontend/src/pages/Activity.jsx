import { useState } from "react";
import "./Activity.css";

function Activity() {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Added ${type}: ₹${amount}`);
  };

  return (
    <div className="activity-container">
      <h2>Add Activity</h2>
      <form className="activity-form" onSubmit={handleSubmit}>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="earning">Earning</option>
        </select>

        <label>Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit">Add {type}</button>
      </form>
    </div>
  );
}

export default Activity;
