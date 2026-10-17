import React from 'react';
import './NavBar.css'; // Make sure the path matches your CSS file name

const NavBar = () => {
  return (
    
    
    <nav className="navbar-container">
      
      <h1 className="navbar-brand">Dika Manne</h1>
      
      {/* Navigation links centered below */}
      <div className="navbar-links">
        <a href="#home" className="nav-item">Home</a>
        <a href="#about" className="nav-item">About</a>
        <a href="#services" className="nav-item">Projects</a>
        <a href="#contact" className="nav-item">Field Notes</a>
      </div>
    </nav>
  );
};

export default NavBar;
