import React from 'react';
import './CustomButton.scss'; // Import your CSS file for styling

function CustomButton({ onClick, children }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default CustomButton;
