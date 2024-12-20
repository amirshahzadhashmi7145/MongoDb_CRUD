import React, { useState } from 'react';
import {register} from "../services/api";
import {useNavigate} from "react-router";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const res = await register({ name, email, password });
            setMessage(res.data.message);
            navigate('/login')
        } catch (err) {
            setMessage('Registration failed');
        }
    };

    const handleLogin = () => {
        navigate("/login");
    }

    return (
        <div style={{
            maxWidth: '400px',
            margin: '50px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px'
        }}>
            <h1>Register</h1>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{display: 'block', width: '100%', margin: '10px 0',height:"30px"}}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{display: 'block', width: '100%', margin: '10px 0',height:"30px"}}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{display: 'block', width: '100%', margin: '10px 0',height:"30px"}}
                />
            </div>
            <button
                onClick={handleRegister}
                style={{
                    width: '100%',
                    padding: '15px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Register
            </button>
            <button
                onClick={handleLogin}
                style={{
                    marginTop:"10px",
                    width: '100%',
                    padding: '15px',
                    backgroundColor: 'red',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Go To Login!
            </button>
            {message && <p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{message}</p>}
        </div>
    );
};

export default Register;
