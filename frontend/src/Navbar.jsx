import React from 'react';
import { Link } from 'react-router-dom';  
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Car Rental</h1>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
           <li><Link to="/admn" className="nav-link">Admin</Link></li> 
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
