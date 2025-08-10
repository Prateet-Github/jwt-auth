import React from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed

const Home = () => {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    // Navigation will happen automatically since ProtectedRoute will redirect to /auth
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <h1>Welcome, {user?.name || user?.username}!</h1>
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ padding: '20px' }}>
        <h2>Protected Dashboard</h2>
        <p>This is your protected home page!</p>
        <p>User ID: {user?._id}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default Home;