import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for type validation

const AuthForm = ({ onClose = () => {} }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setSuccessMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (isLogin) {
        // Handle login
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password,
          }
        );
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username); // Assuming username is returned
        localStorage.setItem("email", email); // Store email
        setSuccessMessage("Login successful!");
        onClose(); // Call onClose function
        navigate("/"); // Redirect to home page
      } else {
        // Handle signup
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            username,
            email,
            password,
          }
        );
        console.log("Signup successful:", response.data);
        setSuccessMessage("Signup successful! You can now log in.");
        // Clear input fields after signup
        setUsername("");
        setEmail("");
        setPassword("");
        // Optionally redirect to login page
        setIsLogin(true); // Switch to login mode after signup
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleInputChange(setUsername)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange(setEmail)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange(setPassword)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : isLogin ? "Login" : "Signup"}
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin ? " Signup" : " Login"}
        </span>
      </p>
    </div>
  );
};

// Prop type validation
AuthForm.propTypes = {
  onClose: PropTypes.func,
};

export default AuthForm;
