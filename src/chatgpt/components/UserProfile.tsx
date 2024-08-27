import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { logout } = useAuth(); // Get the logout function from the authentication context

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome to your profile!</p>
      <button onClick={logout}>Logout</button> {/* Logout button */}
    </div>
  );
};

export default UserProfile;