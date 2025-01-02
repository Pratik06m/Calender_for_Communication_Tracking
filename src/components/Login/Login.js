import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Login.css";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("user");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "user" ? "active" : ""}`}
          onClick={() => handleTabSwitch("user")}
        >
          User Login
        </button>
        <button
          className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
          onClick={() => handleTabSwitch("admin")}
        >
          Admin Login
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "user" ? <UserForm /> : <AdminForm />}
      </div>
    </div>
  );
}

function UserForm() {
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login and Register modes
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // For navigation to the dashboard

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Registration Validation
    if (isRegister && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare API request based on the mode
    const apiUrl = isRegister
    ? "http://localhost:4000/api/v1/signup/user"
    : "http://localhost:4000/api/v1/login/user";

    const payload = isRegister
      ? {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(isRegister ? "Registration successful!" : "Login successful!");
        console.log("Response:", data);

        // Navigate to the User Dashboard on successful login
        if (!isRegister) {
          navigate("/user");
        }
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server!");
    }
  };

  return (
    <div className="form-container">
      <h2>{isRegister ? "User Register" : "User Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {isRegister && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        )}
        <div className="form-options">
          <a href="/forgot-password">Forgot your password?</a>
        </div>
        <button type="submit">{isRegister ? "Register" : "Log In"}</button>
      </form>
      <p>
        {isRegister ? "Already have an account? " : "Don’t have an account? "}
        <span
          className="toggle-mode"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Log In" : "Register"}
        </span>
      </p>
    </div>
  );
}


function AdminForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://example.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Admin Login successful!");
        console.log("Response:", data);

        // Redirect to admin dashboard on successful login
        navigate("/admin");
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server!");
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <div className="form-options">
          <a href="/forgot-password">Forgot your password?</a>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
