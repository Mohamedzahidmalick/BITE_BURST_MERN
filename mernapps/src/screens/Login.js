import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Auth.css";

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    );
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      toast.error("Invalid email or password!");
    }

    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      console.log(
        "Stored Email in localStorage:",
        localStorage.getItem("userEmail"),
      );
      navigate("/");
      toast.success("Logged in successfully!");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>🍔 BiteBurst</h2>

        <p className="text-center text-light">
          Welcome back, login to continue
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control my-3"
            placeholder="Email Address"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />

          <input
            type="password"
            className="form-control my-3"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />

          <button className="btn btn-success auth-btn" type="submit">
            Login
          </button>

          <div className="text-center mt-3">
            New User?
            <Link className="text-success mx-2" to="/createuser">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
