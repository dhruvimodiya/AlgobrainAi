import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md"; // Import delete icon
import { Position } from '@xyflow/react';
import { Handle } from 'reactflow';
import { RxCross2 } from "react-icons/rx"; // Import cross icon

// Define styles for dynamic adjustment
const nodeStyle = (isDeleted) => ({
  width: '240px',
  height: isDeleted ? '0px' : '320px', // Set a fixed height
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

const mapStyle = {
  width: '218px',
  height: '130px',
  marginLeft: '10px',
};

const textareaStyle = {
  marginTop: '10px',
  width: '86%', // Make it responsive
  height: '30px', // Set a fixed height
  padding: '5px', // Add padding for better appearance
  borderRadius: '5px',
  border: 'none', // Add border styling
  resize: 'none', // Prevent resizing if desired
  outline: 'none',
  backgroundColor: '#F8F8F8',
};

const bodyStyle = {
  backgroundColor: '#FFF5EE',
  // marginLeft: '10px',
  width: '89%',
  height: '35px', // Set a fixed height for inputs
  padding: '5px',
  borderRadius: '5px',
  outline: "none",
  border: '1px solid white',
  fontSize: '12px',
  // marginTop: '7px',
  position: 'relative', // Make position relative for cross icon
};

const crossIconStyle = {
  position: 'absolute',
  right: '15px',
  top: '50%',
  transform: 'translateY(-50%)', // Center the icon vertically
  cursor: 'pointer',
  color: 'gray', // Change color as desired
};

const iconStyle = {
  marginLeft: '20px', // Reduced margin for a cleaner look
};

const deleteIconStyle = (isHovered) => ({
  cursor: 'pointer',
  color: 'green',
  opacity: isHovered ? 1 : 0, // Show icon only when hovered
  transition: 'opacity 0.3s', // Smooth fade-in/out
});

const MapNode = ({ data }) => {
  const [inputs, setInputs] = useState(['']); // Manage input fields
  const [isDeleted, setIsDeleted] = useState(false); // Manage node's deleted state
  const [isHovered, setIsHovered] = useState(false); // Manage hover state
  const [inputValue, setInputValue] = useState(''); // State for the single input box

  // Handle node delete
  const handleDelete = () => {
    setIsDeleted(true); // Set node as deleted
  };

    // Handle input change
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    // Handle input removal
    const handleRemoveInput = () => {
      setInputValue(''); // Clear the input
    };
  return (
    <div
      style={nodeStyle(isDeleted)}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      {/* Flow-Start section with handles for connections */}
      <div style={flowStartStyle}>
        <p>
          <MdPermMedia style={iconStyle} /> Map Node
        </p>
        <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} /> {/* Delete icon */}
      </div>

      {/* Map section */}
      <div className='map'>
        <img style={mapStyle} src="https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png" alt="" />
      </div>

      {/* Textarea */}
      <div className="textarea" style={{ textAlign: 'center' }}>
        <textarea 
          placeholder="Enter your notes here..." // Optional placeholder text
          style={textareaStyle}
        />
      </div>

     <div className="body" style={{ position: 'relative', marginLeft: '10px' }}>
        <input 
          type="text" 
          style={bodyStyle} 
          value={inputValue} 
          onChange={handleInputChange} // Handle input change
        />
        <RxCross2 
          style={crossIconStyle} 
          onClick={handleRemoveInput} // Handle input removal
        />
      </div>

      {/* Left handle for input */}
      <Handle
        type="target"
        position={Position.Left} // Use Position.Left for proper left alignment
        id="left-handle" // Unique ID for left handle
        style={{ borderColor: 'green', backgroundColor: 'white' }}
      />

      {/* Right handle for output */}
      <Handle
        type="source"
        position={Position.Right} // Use Position.Right for proper right alignment
        id="right-handle" // Unique ID for right handle
        style={{ borderColor: 'green', backgroundColor: 'white' }}
      />
    </div>
  );
};

export default MapNode;
