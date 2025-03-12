// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';  // For routing (if you're using React Router)
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Car Rental</h1>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/newcar" className="nav-link">Register Car</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
