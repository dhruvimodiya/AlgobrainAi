// CloseIcon.js
import React from 'react';

const CloseIcon = ({ onClick }) => {
  return (
    <div
      style={{
        cursor: 'pointer',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        background: 'white', // Optional: to improve visibility
        borderRadius: '50%', // Optional: make it circular
        padding: '5px', // Optional: add padding
      }}
      onClick={onClick}
    >
      &#10005; {/* Close icon (X) */}
    </div>
  );
};

export default CloseIcon;
