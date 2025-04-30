import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateLoginStatus = () => {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      setIsLoggedIn(!!user);

      if (user && user.email === 'admin@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    updateLoginStatus();
    window.addEventListener('loginStatusChanged', updateLoginStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', updateLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast.success('Logout successful!');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <Link className="navbar-brand neon-text" to="/">
          <img src="/logo.png" alt="Wanderlust" className="navbar-logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/packages">Travel Packages</Link>
            </li>

            {isLoggedIn && isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-package">Add Travel Packages</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/all-users">All Users</Link>
                </li>
              </>
            )}

            {isLoggedIn && !isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/your-bookings">Your Bookings</Link>
                </li>
              </>
            )}

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
