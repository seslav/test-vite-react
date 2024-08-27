import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome to your profile!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserProfile;