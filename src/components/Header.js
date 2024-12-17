import React, { useState } from "react";


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={menuOpen ? "active" : ""}>
     
     <a href="/home" className="brand">Kintsugi</a>
      <div className="menu-btn" onClick={toggleMenu}></div>
      <div className={`navigation ${menuOpen ? "active" : ""}`}>
        <div className="navigation-items">
          <a href="/home">Home</a>
          <a href="/calendar">To-Do</a>
          <a href="/stories">Community</a>
          <a href="/selfCare">Self Care</a>
          <a href="/Chatbot">Chatbot</a>
          <a href="/moodInput">Ask Away</a>
          <a href="/journalPage">Journal</a>
          <a href="/psychologists">Connect</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
