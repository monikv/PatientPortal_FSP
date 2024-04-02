// Import necessary components from react-router-dom
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/Registration/RegistrationPage';
import Home from './components/Home';
import MakeAppointments from './components/MakeAppointments';
import ListAppointments from './components/ListAppointments'; // Corrected the spelling from 'ListAppoitments' to 'ListAppointments'


// Define your routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegistrationPage /> },
      { path: "makeappointments", element: <MakeAppointments /> },
      { path: "listappointments", element: <ListAppointments /> }
    ]
  }
]);

export default router;