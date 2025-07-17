import { useState } from "react";
import "./Login.css";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isSignup ? "Registering" : "Logging in"} ${form.email}`);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isSignup ? "Register" : "Login"}</button>
        <p onClick={() => setIsSignup(!isSignup)} className="toggle">
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </p>
      </form>
    </div>
  );
}

export default Login;
