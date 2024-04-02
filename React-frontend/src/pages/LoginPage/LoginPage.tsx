// LoginPage.ts
import { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../components/AuthContext'



export default function LoginPage() {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    const {login} = useAuth()
    


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { username, password });
            if (response.status === 200) {
                // Login successful, redirect to home page
                Navigate('/home');
                login();
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login error');
        }
    };


    return (
        <div className="login-container">
            <h2>Login Page</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text"
                        id="username"
                        // value="username"
                        onChange={(e) => setusername(e.target.value)}
                        name="username" />
                </div>
                <div className="login-form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password"
                        id="password"
                        // value="password"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password" />
                </div>
                <div className="login-button">
                    <button type="submit" >Login</button>
                </div>

            </form>
        </div>
    );
}

