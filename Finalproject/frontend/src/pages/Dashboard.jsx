import "./Dashboard.css";

function Dashboard() {
  const earnings = 5000;
  const expenses = 2300;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="summary">
        <div className="card earnings">
          <h3>Earnings</h3>
          <p>₹{earnings}</p>
        </div>
        <div className="card expenses">
          <h3>Expenses</h3>
          <p>₹{expenses}</p>
        </div>
        <div className="card balance">
          <h3>Balance</h3>
          <p>₹{earnings - expenses}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
