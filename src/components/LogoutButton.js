import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();



  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5002/api/logout");
      localStorage.removeItem("email"); // Remove user email
      alert("Logged out successfully");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };



  return (
    <button onClick={handleLogout} style={{ padding: '10px', background: 'red', color: 'white' }}>
      Logout
    </button>
  );
};

export default LogoutButton;

