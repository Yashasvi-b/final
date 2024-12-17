import React from 'react';
import '../App.css'; // Ensure the CSS is imported

function Footer() {
  return (
    <footer>
    <div className="footer-top">
      <div className="footer-logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="footer-contact">
        <p>FOR ANY HELP, YOU MAY CALL US AT</p>
        <p>1800-267-4444</p>
        <p>(Monday to Saturday, 8AM to 10PM and Sunday, 10AM to 7PM)</p>
      </div>
      <div className="app-download">
        <img src="google-play.png" alt="Google Play" />
        <img src="app-store.png" alt="App Store" />
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-column">
        <h4>Who are we?</h4>
        <ul>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Authenticity</a></li>
          
        </ul>
      </div>
      <div className="footer-column">
        <h4>Help</h4>
        <ul>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      
      <div className="footer-column">
        <h4>Top Categories</h4>
        <ul>
          <li><a href="#">Self Care</a></li>
          <li><a href="#">Journal</a></li>
          <li><a href="#">Questions</a></li>
        </ul>
      </div>
    </div>
  </footer>
  
  );
}

export default Footer;
