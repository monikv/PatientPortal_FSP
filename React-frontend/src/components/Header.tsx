import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Assuming you have some CSS for styling
import { useAuth } from './AuthContext';
import logo from '../assets/Ampatientportal.svg'
 


const Header = () => {
  const { isAuthenticated,logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    // Implement logout logic here
    logout();
    console.log('Logging out...');
    // Set isAuthenticated to false, clear tokens, etc.
    // This is simplified; you'll likely need context or Redux for global state management

    navigate('/login');
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <h1>Patient Portal</h1>
      {isAuthenticated && (
        <button onClick={handleLogout} className="logout-button">Logout</button>
      )}
    </header>
  );
};

export default Header;
