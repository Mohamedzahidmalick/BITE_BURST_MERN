import React, { useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "../styles/Auth.css";


export default function Signup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }))
    const response = await fetch("https://bite-burst-mern.onrender.com/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    })
    const json = await response.json()
    console.log(json);
    if(json.success){
toast.success("Account created successfully!");
    navigate("/login");
}    else{
      toast.error("Enter a valid credentials");
    }

  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })

  }
  return (
  <div className="auth-page">

    <div className="auth-card">

      <h2>
        🍔 BiteBurst
      </h2>

      <p className="text-center text-light">
        Create your account and start ordering
      </p>


      <form onSubmit={handleSubmit}>

        <input
          type="text"
          className="form-control my-3"
          placeholder="Full Name"
          name="name"
          value={credentials.name}
          onChange={onChange}
        />


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


        <input
          type="text"
          className="form-control my-3"
          placeholder="Delivery Address"
          name="geolocation"
          value={credentials.geolocation}
          onChange={onChange}
        />


        <button
          type="submit"
          className="btn btn-success auth-btn"
        >
          Create Account
        </button>


        <div className="text-center mt-3">

          Already have an account?

          <Link
            to="/login"
            className="text-success mx-2"
          >
            Login
          </Link>

        </div>


      </form>

    </div>

  </div>
)
}
