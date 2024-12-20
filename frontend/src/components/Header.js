import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {logout} from "../services/api";

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext);

    const handleLogout = async () => {
        logoutUser();
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '15px 20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const contentStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    };

    const spanStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
    };

    const buttonStyle = {
        backgroundColor: '#fff',
        color: '#007bff',
        border: 'none',
        padding: '8px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease-in-out',
    };

    const buttonHoverStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
    };

    return (
        <header style={headerStyle}>
            <div style={contentStyle}>
                <span style={spanStyle}>Welcome, {user.name}</span>
                <button
                    style={{...buttonStyle, ':hover': buttonHoverStyle}}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
