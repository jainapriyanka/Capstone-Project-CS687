import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://friendly-couscous-7v9qpxqwx99gfp5vw-5000.app.github.dev/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Save user info and JWT in localStorage
        localStorage.setItem("token", data.token); // JWT
        localStorage.setItem("user", JSON.stringify(data.user)); // optional

        alert("Login successful!");
        navigate("/dashboard"); // redirect to dashboard
      } else {
        alert(data.message || "Invalid login credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <h1>SmartSpend</h1>
        </div>
        <h3>Welcome</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">LOGIN</button>
        </form>
        <div className="signup-link">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
