import { Position } from '@xyflow/react';
import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md"; // Import delete icon
import { Handle } from 'reactflow';
import { RxCross2 } from "react-icons/rx"; // Import cross icon

// Define styles for fixed height
const nodeStyle = (isDeleted) => ({
  width: '240px',
  height: isDeleted ? '0px' : '200px', // Set a fixed height
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

const iconStyle = {
  marginLeft: '20px', // Reduced margin for a cleaner look
};

const deleteIconStyle = (isHovered) => ({
  cursor: 'pointer',
  color: 'green',
  opacity: isHovered ? 1 : 0, // Show icon only when hovered
  transition: 'opacity 0.3s', // Smooth fade-in/out
});

const bodyStyle = {
  backgroundColor: '#FFF5EE',
  marginLeft: '10px',
  width: '86%',
  height: '20px',
  padding: '5px',
  borderRadius: '5px',
  outline: "none",
  border: '1px solid white',
  fontSize: '12px',
  marginTop: '7px',
  position: 'relative', // Make position relative for cross icon
};

const crossIconStyle = {
  position: 'absolute',
  right: '15px',
  top: '60%',
  transform: 'translateY(-50%)', // Center the icon vertically
  cursor: 'pointer',
  color: 'gray', // Change color as desired
};

const FlowStart = ({ data }) => {
  const [inputs, setInputs] = useState(['', '', '']); // Manage state for input fields
  const [isDeleted, setIsDeleted] = useState(false); // Manage node's deleted state
  const [isHovered, setIsHovered] = useState(false); // Manage hover state

  // Handle node delete
  const handleDelete = () => {
    setIsDeleted(true); // Set node as deleted
  };

  // Handle input field change
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  // Handle input field removal
  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index); // Remove input at index
    setInputs(newInputs);
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
          <MdPermMedia style={iconStyle} /> Flow Start
        </p>
        <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} /> {/* Delete icon */}
      </div>

      <div className='body'>
        {inputs.map((input, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <input 
              type="text" 
              style={bodyStyle} 
              value={input} 
              onChange={(e) => handleInputChange(index, e.target.value)} // Handle input change
            />
            <RxCross2 
              style={crossIconStyle} 
              onClick={() => handleRemoveInput(index)} // Handle input removal
            />
          </div>
        ))}
      </div>

      {/* Right handle for output */}
      <Handle
        type="source"
        position={Position.Right} // Use Position.Right for proper right alignment
        id="right-handle" // Unique ID for right handle
        style={{ borderColor: 'green', backgroundColor: 'white', position: 'absolute', left: '226px', top: '2rem' }}
      />
    </div>
  );
};

export default FlowStart;
