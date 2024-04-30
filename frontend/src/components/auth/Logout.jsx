import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {  
    // Call the logout function passed as prop
    onLogout(navigate);
    // Redirect the user to the login page
    //navigate('/login');
  };

  return (
    <div>
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
