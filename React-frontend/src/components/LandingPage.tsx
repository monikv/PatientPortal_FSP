import React from 'react';
import { Outlet, useNavigate,useLocation } from 'react-router-dom';
import './LandingPage.css';
import Header from './Header';

const LandingPage = () => {
  const navigate = useNavigate();
  let location= useLocation();

  return (
    <>
  
    { location.pathname==='/' ?  <div>
      <h1>Welcome to the Patient Portal</h1>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button>
   
    </div> :   <Outlet/>}   
    </>
  );
};

export default LandingPage;
