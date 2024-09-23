import { Position } from '@xyflow/react';
import React, { useState } from 'react';
import { MdPermMedia, MdDelete, MdEdit } from "react-icons/md"; // MdDelete for delete functionality, MdEdit for edit functionality
import { Handle } from 'reactflow';

// Base values
const baseNodeHeight = 300; // Base height of the node
const buttonHeightIncrement = 12; // Height added per new button

// Define styles for dynamic adjustment
const nodeStyle = (buttonCount, isDeleted) => ({
  width: '240px',
  height: isDeleted ? '0px' : `${baseNodeHeight + buttonHeightIncrement * buttonCount}px`, // Dynamically increase height based on button count
  display: isDeleted ? 'none' : 'flex', // Hide node when deleted
  flexDirection: 'column',
  borderRadius: '8px',
  boxShadow: '0px  4px 8px rgba(0, 128, 0, 0.3)',
  position: 'relative',
  backgroundColor: isDeleted ? 'transparent' : 'white',
  transition: 'box-shadow 0.3s', // Add a smooth transition for hover effects
});

const flowStartStyle = {
  borderRadius: '4px',
  color: 'green',
  fontSize: '12px',
  display: 'flex',
  justifyContent: 'space-between', // Add space between title and delete icon
  margin: '10px',
  fontWeight: 'bold',
  backgroundColor: '#F8F8F8',
  borderLeft: '12px solid green',
  position: 'relative',
};

const addedButtonStyle = {
  width: '78%',
  height: '5%',
  color: 'green',
  padding: '3px',
  cursor: 'pointer',
  paddingBottom: '2px',
  fontSize: '10px',
  marginLeft: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  marginTop: '10px'
};

const addButtonStyle = {
  width: '83%',
  height: '8%',
  color: 'green',
  border: '1px solid green',
  borderRadius: '15px',
  padding: '6px',
  cursor: 'pointer',
  marginBottom: '10px',
  fontSize: '10px',
  marginLeft: '20px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  outline:'none'
};

const menuBackground = {
  backgroundColor: '#DCDCDC',
  borderRadius: '2px',
  paddingBottom: '2px'
};

const iconStyle = {
  cursor: 'pointer',
  color: 'green',
  marginLeft: '0px',
};

const deleteIconStyle = (isHovered) => ({
  cursor: 'pointer',
  color: 'green',
  opacity: isHovered ? 1 : 0, // Show icon only when hovered
  transition: 'opacity 0.3s', // Smooth fade-in/out
});

const ShippingNode = ({ data }) => {
  const [buttons, setButtons] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false); // Manage node's deleted state
  const [isHovered, setIsHovered] = useState(false); // Manage hover state
  const [editIndex, setEditIndex] = useState(-1); // Track which button is being edited

  // Add new button
  const addNewButton = () => {
    if (buttons.length < 10) {
      setButtons([...buttons, `Button ${buttons.length + 1}`]);
    }
  };

  // Handle editing button names
  const handleEditClick = (index) => {
    setEditIndex(index); // Set the index of the button to be edited
  };

  // Handle saving button name
  const handleSaveClick = (index, newName) => {
    const updatedButtons = [...buttons];
    updatedButtons[index] = newName; // Update the button name
    setButtons(updatedButtons);
    setEditIndex(-1); // Exit edit mode
  };

  // Handle deleting individual buttons
  const handleDeleteButton = (index) => {
    const updatedButtons = buttons.filter((_, i) => i !== index); // Remove the button from the array
    setButtons(updatedButtons);
  };

  // Handle node delete
  const handleDelete = () => {
    setIsDeleted(true); // Set node as deleted
  };

  return (
    <div
      style={nodeStyle(buttons.length, isDeleted)}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      {/* Flow-Start section with handles for connections */}
      <div style={flowStartStyle}>
        <p>
          <MdPermMedia /> Media + Buttons
        </p>
        <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} /> {/* Delete icon */}
      </div>

      <p style={{ margin: '10px', fontSize: '10px', fontWeight: 'bold', color: 'green' }}>
        Which Shipping Option do you prefer?
      </p>

      {/* Dynamic buttons with edit and delete functionality */}
      <div style={menuBackground}>
        {buttons.map((button, index) => (
          <div key={index} style={addedButtonStyle}>
            {/* Left handle for input */}
            <Handle
              type="target"
              position={Position.Left}
              id={`left-handle-${index}`} // Unique ID for left handle
              style={{ borderColor: 'green', backgroundColor: 'white', position: 'absolute', left: '-6px', top: '50%' }}
            />

            {/* If in edit mode, show input field */}
            {editIndex === index ? (
              <input
                type="text"
                defaultValue={button}
                onBlur={(e) => handleSaveClick(index, e.target.value)} // Save on blur
                style={{ width: '100px', fontSize: '10px', marginRight: '5px' }}
              />
            ) : (
              <span>{button}</span>
            )}

            {/* Edit and Delete Icons */}
            <MdEdit style={iconStyle} onClick={() => handleEditClick(index)} /> {/* Edit icon */}
            <MdDelete style={iconStyle} onClick={() => handleDeleteButton(index)} /> {/* Delete icon */}

            {/* Right handle for output */}
            <Handle
              type="source"
              position={Position.Right}
              id={`right-handle-${index}`} // Unique ID for right handle
              style={{ borderColor: 'green', backgroundColor: 'white', position: 'absolute', right: '-6px', top: '50%' }}
            />
          </div>
        ))}
      </div>

      {/* Add button */}
      {buttons.length < 10 && (
        <button style={addButtonStyle} onClick={addNewButton}>
          Add Button
        </button>
      )}
    </div>
  );
};

export default ShippingNode;
