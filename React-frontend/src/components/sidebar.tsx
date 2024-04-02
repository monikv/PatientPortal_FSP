
import "./sidebar.css"; // Make sure you create this CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="nav">
        <ul>
            <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/home/listappointments">List Appointments</a>
          </li>
          <li>
            <a href="/home/makeappointments">Make Appointment</a>
          </li>
          <li>
            <a href="/results">Results</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/health-information">Health Information</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
