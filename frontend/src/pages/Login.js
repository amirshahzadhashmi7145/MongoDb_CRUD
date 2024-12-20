import React, {useContext, useState} from 'react';
import {login} from "../services/api";
import {useNavigate} from "react-router";
import {AuthContext} from "../context/AuthContext";

const Login = () => {
    const {setUser} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await login({email,password});
            setUser(res.data.user);
            setMessage(res.data.message);
            navigate("/")
        } catch (err) {
            setMessage('Login failed');
        }
    };

    const handleRegister = () => {
        navigate("/register");
    }

    return (
        <div style={{
            maxWidth: '400px',
            margin: '50px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px'
        }}>
            <h1>Login</h1>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{display: 'block', width: '100%', margin: '10px 0', height: '30px'}}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{display: 'block', width: '100%', margin: '10px 0', height: '30px'}}
                />
            </div>
            <button
                onClick={handleLogin}
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
                Login
            </button>
            <button
                onClick={handleRegister}
                style={{
                    marginTop: '10px',
                    width: '100%',
                    padding: '15px',
                    backgroundColor: 'red',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Not Registered?
            </button>
            {message && <p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{message}</p>}
        </div>
    );
};

export default Login;
