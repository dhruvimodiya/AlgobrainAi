import React, { useState } from 'react';
import { MdPermMedia, MdDelete, MdEdit } from "react-icons/md";

const nodeStyle = (isDeleted) => ({
  width: '240px',
  height: '110px', // Set a fixed height for the node
  display: isDeleted ? 'none' : 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 128, 0, 0.3)',
  position: 'relative',
  backgroundColor: isDeleted ? 'transparent' : 'white',
  transition: 'box-shadow 0.3s',
});

const flowStartStyle = {
  borderRadius: '4px',
  color: 'green',
  fontSize: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10px',
  fontWeight: 'bold',
  backgroundColor: '#F8F8F8',
  borderLeft: '12px solid green',
  position: 'relative',
};

const buttonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '204px',
  padding: '8px',
  fontSize: '10px',
  color: 'green',
  backgroundColor: 'white',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  marginTop: '8px',
  marginLeft: '10px',
  border: '1px solid green',
  position: 'relative',
};

const menuStyle = (isMenuOpen) => ({
  position: 'absolute',
  top: '95%', // Position below the button
  left: '5%',
  backgroundColor: 'white',
  border: '1px solid green',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 128, 0, 0.3)',
  padding: '8px',
  width: '86%',
  display: isMenuOpen ? 'flex' : 'none', // Display menu based on isMenuOpen
  flexDirection: 'column',
  opacity: isMenuOpen ? 1 : 0,
  transition: 'opacity 0.3s',
  zIndex: 1,
});

const ShippingNode = ({ data }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleted(true);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      style={nodeStyle(isDeleted)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={flowStartStyle}>
        <p>
          <MdPermMedia style={{ marginLeft: '20px' }} /> Special Offer
        </p>
        <MdDelete style={{ cursor: 'pointer', color: 'green', opacity: isHovered ? 1 : 0 }} onClick={handleDelete} />
      </div>

      {/* Button with menu icon */}
      <button style={buttonStyle} onClick={toggleMenu}>
        Menu <MdEdit />
      </button>

      {/* Menu that appears below the button */}
      <div style={menuStyle(isMenuOpen)}>
        <p>Option 1</p>
        <p>Option 2</p>
        <p>Option 3</p>
      </div>
    </div>
  );
};

export default ShippingNode;
