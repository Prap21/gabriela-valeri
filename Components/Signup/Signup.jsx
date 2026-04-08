import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isAgreed, setIsAgreed] = useState(false); // Track agreement checkbox state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Clear any previous error message
    setError('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Check if the user has agreed to the terms
    if (!isAgreed) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }), // Make sure this is the correct format expected by your server
      });

      const data = await response.json();
        if (!response.ok) {
          setError(data.message || 'Something went wrong');
          return;
        }

      console.log('Account created successfully');
      navigate('/'); // Redirect to the Home page after successful signup
    } catch (err) {
      setError(err.message); // Log the error message
      console.error(err); // You can log the error for debugging
    }
  };
  

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Set username
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        
        <div className="login-agree">
          <input
            type="checkbox"
            id="agree"
            checked={isAgreed}
            onChange={() => setIsAgreed(!isAgreed)} // Toggle checkbox
          />
          <p>By continuing, I agree to the <span>terms of use</span> & <span>privacy policy</span>.</p>
        </div>

        <div className="action-buttons">
          {/* Signup Button */}
          <button type="submit" className="login-btn" disabled={!isAgreed}>
            Sign Up
          </button>
        </div>

        <p className="loginsignup">
          Already have an account?{' '}
          <span onClick={() => navigate('/')} className="login-link">
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
