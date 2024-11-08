import React from 'react';
import windowImage from '../assets/WindowInterface.png';
import '../styles/WindowInterface.css';

const WindowInterface = ({ children }) => {
    return (
      <div className="window-container">
        <img src={windowImage} alt="Window Interface" className="centered-image" />
        <div className="content-overlay">
          {children}
        </div>
      </div>
    );
  };

export default WindowInterface;
