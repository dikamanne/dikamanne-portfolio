import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <footer id="contact" className="contact">
      <div className="contact-card">
        <p className="hand">send me a postcard</p>
        <h3>Let’s make something that helps people understand how their country works.</h3>
        <a className="mail" href="mailto:you@example.com">you@example.com</a>
        <div className="contact-links">
          <a href="https://www.linkedin.com/in/your-handle" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/your-handle" target="_blank" rel="noreferrer">Instagram</a>
          <a href="/resume.pdf">Resume</a>
        </div>
      </div>
      <p className="fine">© 2026 Dika Manne</p>
    </footer>
  );
}