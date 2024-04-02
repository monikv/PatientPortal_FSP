import {   RouterProvider,createBrowserRouter } from 'react-router-dom';
import './App.css'
import React from 'react';

import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/Registration/RegistrationPage';
import Home from './components/Home';
import MakeAppointments from './components/MakeAppointments';
import ListAppointments from './components/ListAppointments';

import LandingPage from './components/LandingPage';
import { AuthProvider } from './components/AuthContext';

const router = createBrowserRouter([
  {

    path: "/",
    element: <LandingPage/>,
    
  
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegistrationPage /> },
       { path: "home", 
        element: <Home/>, 
        children:[
           { path: "makeappointments", element: <MakeAppointments /> },
          { path: "listappointments", element: <ListAppointments /> }

        ]
      }
    ]
  }
]);


function App() {


  return (
      <React.StrictMode>
      <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
