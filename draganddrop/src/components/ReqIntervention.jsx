import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md"; // Import delete icon
import { Handle, Position } from 'reactflow'; // Import Position for handle positioning

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

const welcomeStyle = {
  width: '93%',
  height: '135px',
  fontSize: '12px',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '10px',
};

const textAreaStyle = {
  width: '92%',
  height: '120px', // Increased height
  borderRadius: '4px',
  padding: '8px',
  fontSize: '10px',
  resize: 'none',
  color: 'black',
  border: 'none',
  backgroundColor: '#F8F8F8',
  outline: 'none',
  marginBottom: '8px',
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

const ReqIntervention = ({ data }) => {
  const [text, setText] = useState('');
  const [isDeleted, setIsDeleted] = useState(false); // Manage node's deleted state
  const [isHovered, setIsHovered] = useState(false); // Manage hover state

  // Handle text area input
  const handleTextChange = (event) => {
    setText(event.target.value);
    console.log(`Text area input: ${event.target.value}`); // Log text area input
  };

  // Handle node delete
  const handleDelete = () => {
    setIsDeleted(true); // Set node as deleted
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
          <MdPermMedia style={iconStyle} />Text
        </p>
        <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} /> {/* Delete icon */}
      </div>

      {/* Text input area with handles on both left and right sides */}
      <div style={welcomeStyle}>
        <textarea
          placeholder="Type something..."
          style={textAreaStyle}
          value={text}
          onChange={handleTextChange}
        />
        
       {/* Left handle for input */}
       <Handle
          type="target"
          position={Position.Left} // Use Position.Left for proper left alignment
          id="left-handle" // Unique ID for left handle
          style={{ borderColor:'green',backgroundColor:'white',position:'absolute',left:'5px' }}
        />

        {/* Right handle for output */}
        <Handle
          type="source"
          position={Position.Right} // Use Position.Right for proper right alignment
          id="right-handle" // Unique ID for right handle
          style={{ borderColor:'green',backgroundColor:'white',position:'absolute',left:'226px'}}
        />
      </div>
    </div>
  );
};

export default ReqIntervention;
