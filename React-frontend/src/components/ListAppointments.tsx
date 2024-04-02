import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListAppointments.css';

// Define the Appointment type/interface
interface Appointment {
    username: string;
    email: string;
    appointmentDate: string;
    reason: string;
}

const ListAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/search-appointments?query=${encodeURIComponent(searchTerm)}`);
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, [searchTerm]);

    // Handle search term change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Filter appointments based on search term
    const filteredAppointments = appointments.filter(appointment => {
        return Object.values(appointment).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="form-container">
            <div className="appointments-list">
                <h2>Appointments List</h2>
                <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
                />
                {filteredAppointments.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Appointment Date</th>
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.username}</td>
                                    <td>{appointment.email}</td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No appointments found.</p>
                )}
            </div>
        </div>
    );
};

export default ListAppointments;
