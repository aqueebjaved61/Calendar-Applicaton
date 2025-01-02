import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Communication Tracker</div>
      <div className="header-user">
        <img
          src="/user-avatar.png"
          alt="User Avatar"
          className="header-avatar"
        />
        <span className="header-username">Aqueeb Javed</span>
      </div>
    </header>
  );
};

export default Header;
