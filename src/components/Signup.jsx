import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  UserRound,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Eye,
  EyeOff,
  Send,
  Leaf
} from "lucide-react";
import "./Signup.css";

const API = "http://localhost:5000/api/auth";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    otp: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Send OTP
  const sendOTP = async () => {
    if (!/^\d{10}$/.test(form.phone)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(`${API}/send-otp`, {
        phone: form.phone
      });

      setOtpSent(true);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.username || !form.password || !form.email ||
        !form.phone || !form.otp) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API}/signup`, form);

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Signup failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        {/* Logo */}
        <div className="brand-section">
          <div className="brand-logo">
            <Leaf size={53} strokeWidth={1.5} />
            <span>G</span>
          </div>

          <h2>GREENZA</h2>

          <div className="brand-divider">
            <span></span>
            <Leaf size={18} />
            <span></span>
          </div>
        </div>

        {/* Heading */}
        <div className="signup-heading">
          <h1>Create Your Account</h1>

          <div className="heading-divider">
            <span></span>
            <Leaf size={22} />
            <span></span>
          </div>

          <p>Join our community and grow with us</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup}>

          {/* Username */}
          <div className="input-group">
            <UserRound className="input-icon" size={25} />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <LockKeyhole className="input-icon" size={25} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff size={23} />
              ) : (
                <Eye size={23} />
              )}
            </button>
          </div>

          {/* Email */}
          <div className="input-group">
            <Mail className="input-icon" size={25} />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="input-group">
            <Phone className="input-icon" size={25} />

            <input
              type="tel"
              name="phone"
              placeholder="Phone No"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />
          </div>

          {/* OTP */}
          <div className="input-group otp-group">
            <ShieldCheck className="input-icon" size={27} />

            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={form.otp}
              onChange={handleChange}
              maxLength={6}
              inputMode="numeric"
              required
            />

            <button
              type="button"
              className="send-otp"
              onClick={sendOTP}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
              <Send size={19} />
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className="signup-message" role="status">
              {message}
            </p>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            className="signup-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
            <Leaf size={25} />
          </button>

        </form>

        {/* Login Link */}
        <div className="login-section">
          <p>
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>

        {/* Bottom Decoration */}
        <div className="bottom-decoration">
          <span></span>
          <Leaf size={23} />
          <span></span>
        </div>

      </div>
    </div>
  );
}

export default Signup;