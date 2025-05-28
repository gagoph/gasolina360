import React from 'react';

export default function MainCard({ icon, title, text, buttonText, buttonColor, onButtonClick }) {
    return (
    <div className="main-card">
      <div className='main-card-header'>
        <div className="circle-icon" style={{ backgroundColor: buttonColor }}>
          {icon}
        </div>
        <div className="main-card-title">{title}</div>
      </div>
        <div className="main-card-text">{text}</div>
        <button onClick={onButtonClick} style={{backgroundColor: buttonColor}}>{buttonText}</button>
    </div>
  );
};