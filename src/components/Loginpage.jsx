import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {
  Sprout,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react";
import "./Loginpage.css";

function Loginpage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    // Simulate a successful login
    alert("Login form submitted!");
    navigate("/home");
  };

  return (
    <div className="greenza-login-bg">
      <div className="login-leaf leaf-one">🌿</div>
      <div className="login-leaf leaf-two">🍃</div>
      <div className="login-leaf leaf-three">🌱</div>

      <div className="greenza-login-card">

        <div className="login-logo">
          <Sprout size={43} />
          <span>G</span>
        </div>

        <h1 className="login-brand">GREENZA</h1>

        <h2 className="login-heading">
          Welcome Back
        </h2>

        <div className="login-decoration">
          <span></span>
          <Sprout size={25} />
          <span></span>
        </div>

        <p className="login-subtitle">
          Log in to your account
        </p>

        <form onSubmit={handleLogin}>

          <div className="login-input-box">
            <User size={25} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-input-box">
            <Lock size={25} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={23} />
              ) : (
                <Eye size={23} />
              )}
            </button>
          </div>

          <button type="submit" className="greenza-login-btn">
            <Sprout size={23} />
            Login
            <ArrowRight size={25} />
          </button>

        </form>

        <p className="login-signup-text">
          Don't have an account?
          <Link to="/"> Sign Up</Link>
        </p>

        <div className="login-bottom-decoration">
          <span></span>
          ♥
          <span></span>
        </div>

      </div>
    </div>
  );
}

export default Loginpage;