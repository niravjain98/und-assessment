import React from "react";
import "./Footer.css"

export default function Footer() {

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img src="und-logo.png" alt="UND Logo" className="footer-logo" />
          <br />
          <br/>
          {/* prettier-ignore */}
          <p className="footer-text">
            © 2024 University of North Dakota - Grand Forks, ND - Member of ND University System
          </p>
        </div>
        <div className="footer-links">
          <a href="https://und.edu/academics/index.html">Academics</a>
          <a href="https://und.edu/admissions/index.html">Admissions</a>
          <a href="https://und.edu/research/index.html">Research</a>
          <a href="https://und.edu/programs/index.html">Programs</a>
          <a href="https://und.edu/about/index.html">About</a>
        </div>
      </div>
      
     
    </footer>
  );
}
