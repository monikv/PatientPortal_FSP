// RegistrationPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';


export default function RegistrationPage() {
    const [username, setusername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/register', { username, email, password });
            alert('User registered successfully!');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Failed to register user.');
        }
    };

    return (
        <div className="registration-container">
            <h2>Registration Page</h2>
            <form className="reg-form" onSubmit={handleSubmit}>

                <div className="reg-form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>
                <div className="reg-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="reg-form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="reg-button">

                    <button type="submit" className="button">Register</button>
                </div>


            </form>
        </div>
    );
}
