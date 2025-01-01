import React, { useState } from 'react';
import './Login.css';

function LoginPage() {
  const [activeTab, setActiveTab] = useState('user');

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('user')}
        >
          User Login
        </button>
        <button
          className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('admin')}
        >
          Admin Login
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'user' ? <UserForm /> : <AdminForm />}
      </div>
    </div>
  );
}

function UserForm() {
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register modes
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log(isRegister ? 'Registering User' : 'Logging In', formData);
  };

  return (
    <div className="form-container">
      <h2>{isRegister ? 'User Register' : 'User Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
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
        <button type="submit">{isRegister ? 'Register' : 'Log In'}</button>
      </form>
      <p>
        {isRegister
          ? 'Already have an account? '
          : 'Don’t have an account? '}
        <span
          className="toggle-mode"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Log In' : 'Register'}
        </span>
      </p>
    </div>
  );
}

function AdminForm() {
  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <div className="form-options">
          <a href="/forgot-password">Forgot your password?</a>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
