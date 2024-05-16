// SignInPage.js
import React, { useState } from 'react';

import './SignIn.scss'
import { makeApiCall } from '../../api/api';
import { userLoginAction } from '../../redux/actions/appActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    // Handle sign-in logic (e.g., send data to backend)
    console.log('Email:', email);
    console.log('Password:', password);

    // Reset form and clear errors
    setEmail('');
    setPassword('');
    setError('');

    const loginData = {email: email, password: password}
    userLoginAction(
      dispatch,
      JSON.stringify(loginData),
      navigate
    );
  };

  return (
    <div className="signin-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;
