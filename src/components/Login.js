import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const storeEmail = localStorage.getItem('email');
    const storePassword = localStorage.getItem('password');

    if (storeEmail && storePassword) {
      setEmail(storeEmail);
      setPassword(storePassword);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/login', { email, password });

      if (res.status === 201) {
        // This is making sure they logged in correctly.

        // local storage for email and password
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        setShouldRedirect(true);
      } else {
        setErrorMessage('User Not Found!');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Error Creating User: ' + error.message);
    }
  };

  if (shouldRedirect) {
    return <Navigate to="/signup" />;
  }

  return (
    <div className="landing-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Please Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Please Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="signup-link">
          <p>Don't have an account?</p>
          <button onClick={() => setShouldRedirect(true)}>Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;