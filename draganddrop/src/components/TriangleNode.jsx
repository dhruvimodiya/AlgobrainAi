import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { HiOutlineLink } from "react-icons/hi";

// Define styles for better readability and maintainability
const nodeStyle = {
  width: '180px',
  height: '160px', // Increased height to accommodate textarea properly
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #333',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  padding: '8px',
};

const flowStartStyle = {
  width: '100%',
  height: '40px', // Increased height for better visibility
  borderRadius: '4px',
  fontSize: '12px', // Slightly larger font size for readability
  border: '1px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'lightgrey',
  marginBottom: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  position: 'relative', // Ensure handles are positioned relative to this container
};

const welcomeStyle = {
  flex: '1', // Allows textarea to grow and fill the available space
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '8px',
};

const textAreaStyle = {
  width: '100%',
  height: '100%', // Ensure textarea fills its container
  borderRadius: '4px',
  padding: '8px', // Padding for better text input experience
  fontSize: '12px', // Font size for readability
  border: '1px solid #ddd',
  resize: 'none', // Prevent resizing to maintain layout
  boxSizing: 'border-box', // Ensure padding is included in the total width/height
  backgroundColor: '#fafafa', // Light background for better readability
  color: '#333', // Dark text for better contrast
};

const iconStyle = {
  marginRight: '8px', // Space between text and icon
};

const TriangleNode = ({ data }) => {
  const [text, setText] = useState('');

  // Function to handle text area changes
  const handleTextChange = (event) => {
    setText(event.target.value);
    console.log(`Text area input: ${event.target.value}`); // Log text area input
  };

  return (
    <div style={nodeStyle}>
      {/* Flow-Start section with handles for connections */}
      <div style={flowStartStyle}>
        <HiOutlineLink style={iconStyle} />
        <p>Request Intervention</p>
        {/* Handle for outgoing connections from the Flow-Start section */}
        <Handle type="source" position={Position.Right} id="flowStartSource" />
      </div>

      {/* Text input area */}
      <div style={welcomeStyle}>
        <textarea
          placeholder="Type something..."
          style={textAreaStyle}
          value={text}
          onChange={handleTextChange}
        ></textarea>
      </div>
    </div>
  );
};

export default TriangleNode;
