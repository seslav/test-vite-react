import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { login as loginService } from '../services/authService';

const LoginForm = () => {
  // State to manage form input values and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get the login function from the authentication context
  const { login } = useAuth();

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear any previous error messages

    try {
      const token = await loginService(username, password); // Call the login service
      login(token); // Set the token and redirect to profile
    } catch (err: any) {
      // Handle error and display message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display error message from the response
      } else {
        setError('An error occurred. Please try again.'); // Display a generic error message
      }
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on change
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;