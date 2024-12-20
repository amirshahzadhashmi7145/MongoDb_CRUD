import React, {useContext} from 'react';
import './styles.css';
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import {AuthProvider, AuthContext} from "./context/AuthContext";
import Header from "./components/Header";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <ProtectedRoute>
          <Header />
      <Home />
    </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />
  }
]);


function App() {
  return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  );
}

export default App;
