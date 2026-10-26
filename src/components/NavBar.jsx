import React from "react";
import "./NavBar.css";

const NavBar = () => (
  <nav className="navbar-container" aria-label="Main">
    <h1 className="navbar-brand">Dika Manne</h1>
    <div className="navbar-links">
      <a href="#home" className="nav-item">Home</a>
      <a href="#projects" className="nav-item">Projects</a>
      <a href="#about" className="nav-item">About</a>
      <a href="#field-notes" className="nav-item">Field Notes</a>
      <a href="#contact" className="nav-item">Contact</a>
    </div>
  </nav>
);

export default NavBar;