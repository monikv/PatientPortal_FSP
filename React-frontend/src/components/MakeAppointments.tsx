import axios from "axios";
import { useEffect, useState } from "react";
import './MakeAppoitment.css'


const MakeAppointments = () => {


    interface FormData {
        username: string;
        email: string;
        appointmentDate: string;
        reason: string

    }
    const [formData, setFormData] = useState<FormData>({ username: '', email: '', appointmentDate: '', reason: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/make-appointment', formData);
            alert('Appointment successfully scheduled!');
            setFormData({ username: '', email: '', appointmentDate: '', reason: '' }); // Reset form
        } catch (error) {
            console.error('Error scheduling appointment:', error);
            alert('Failed to schedule appointment.');
        }
    };

    return (


        <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-group">
                <label htmlFor="Username">Name:</label>

                <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required />

            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="appointmentDate">Appointment Date:</label>
                <input type="date" name="appointmentDate" id="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
            </div>
            <button type="submit">Submit</button>
        </form>

    );
}




export default MakeAppointments;
