import React, { useState, useContext } from 'react';
import './Login.css';
import { AuthContext } from '../../Context/AuthContext'; // Corrected path
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Using context to access login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Login Response Data:", data);  // Log entire response for debugging
  
      if (response.ok) {
        // Check if 'user' and 'username' exist before accessing
        if (data.user && data.user.username) {
          const userData = {
            username: data.user.username,  // Check if 'data.user' exists and contains 'username'
            token: data.token,             // The token returned by your API
          };
  
          // Store token in localStorage
          localStorage.setItem('token', data.token);
          
          // Call login function from context to update the user state
          login(userData);
          
          // Navigate to home after successful login
          navigate('/');
        } else {
          console.error('User data is missing or incorrect:', data);
          alert('Login failed: User data is missing');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
      console.error('Login Error:', err);  // Log the error for debugging
    }
  };
  
  

  const handleCreateAccount = () => {
    navigate('/signup'); // Redirect to signup page
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="action-buttons">
          <button type="submit" className="login-btn">
            Log In
          </button>
        </div>
        <p className="loginsignup">
          Don't have an account?{' '}
          <span onClick={handleCreateAccount} className="create-account-link">
            Create account
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
