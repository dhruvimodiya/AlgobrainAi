import React from 'react';
import { Handle, Position } from 'reactflow';
import { HiOutlineLink } from "react-icons/hi";

// Define styles for better readability and maintainability
const nodeStyle = {
  width: '180px',
  height: '150px',
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
  height: '30px', // Increased height for better visibility
  borderRadius: '4px',
  fontSize: '10px',
  border: '1px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'lightgrey',
  marginBottom: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  position: 'relative', // Ensure handles are positioned relative to this container
};

const iconStyle = {
  marginRight: '8px', // Space between text and icon
};

const RectangleNode = ({ data }) => (
  <div style={nodeStyle}>

    {/* Flow-Start section with handles for connections */}
    <div style={flowStartStyle}>
      <HiOutlineLink style={iconStyle} />
      <p>Flow-Start</p>
      
      {/* Handle for outgoing connections from the Flow-Start section */}
      <Handle type="target" position={Position.Right} id="flowStartSource" />
    </div>

  </div>
);

export default RectangleNode;
