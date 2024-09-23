import React, { useState } from 'react';
import { MdPermMedia, MdDelete, MdEdit } from "react-icons/md"; // Import edit icon
import { Handle } from 'reactflow';
import { FaExternalLinkAlt } from "react-icons/fa";
import { Position } from '@xyflow/react';

// Define styles for fixed height
const nodeStyle = (isDeleted, isEditing) => ({
  width: '240px',
  height: isDeleted ? '0px' : isEditing ? '260px' : '200px', // Dynamically set height based on edit mode
  display: isDeleted ? 'none' : 'flex', // Hide node when deleted
  flexDirection: 'column',
  borderRadius: '8px',
  boxShadow: '0px  4px 8px rgba(0, 128, 0, 0.3)',
  position: 'relative',
  backgroundColor: isDeleted ? 'transparent' : 'white',
  transition: 'box-shadow 0.3s, height 0.3s', // Add transition for height and box-shadow
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
  height: '80px',
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
};

const LinkNode = ({ data }) => {
  const [text, setText] = useState('');
  const [isDeleted, setIsDeleted] = useState(false); // Manage node's deleted state
  const [isHovered, setIsHovered] = useState(false); // Manage hover state
  const [buttonName, setButtonName] = useState('Special Offer'); // State for button name
  const [buttonLink, setButtonLink] = useState('https://example.com'); // State for button link
  const [isEditing, setIsEditing] = useState(false); // State for edit mode

  // Handle text area input
  const handleTextChange = (event) => {
    setText(event.target.value);
    console.log(`Text area input: ${event.target.value}`); // Log text area input
  };

  // Handle node delete
  const handleDelete = () => {
    setIsDeleted(true); // Set node as deleted
  };

  // Toggle between editing and view mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle button name change
  const handleButtonNameChange = (event) => {
    setButtonName(event.target.value);
  };

  // Handle button link change
  const handleButtonLinkChange = (event) => {
    setButtonLink(event.target.value);
  };

  return (
    <div
      style={nodeStyle(isDeleted, isEditing)} // Pass isEditing to nodeStyle to adjust height
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      {/* Flow-Start section with handles for connections */}
      <div style={flowStartStyle}>
        <p>
          <MdPermMedia style={iconStyle} /> Special Offer
        </p>
        <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} /> {/* Delete icon */}
      </div>

      {/* Text input area */}
      <div style={welcomeStyle}>
        <textarea
          placeholder="Type something..."
          style={textAreaStyle}
          value={text}
          onChange={handleTextChange}
        />
      </div>

      {/* Button with edit icon */}
      {!isEditing ? (
        <div style={buttonStyle}>
          <a href={buttonLink} target="_blank" rel="noopener noreferrer" style={{color: 'green', textDecoration: 'none', alignItems: 'center' }}>
          <FaExternalLinkAlt />{buttonName}
          </a>
          <MdEdit size={16} onClick={toggleEdit} style={{ marginLeft: '8px', cursor: 'pointer' }} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
          {/* Button Name Input with Handles */}
          <div style={{ position: 'relative' }}>
            <Handle
              type="target"
              position={Position.Left}
              id="left-handle-buttonName"
              style={{ borderColor:'green',backgroundColor:'white', position: 'absolute', left: '5px', top: '45%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={buttonName}
              onChange={handleButtonNameChange}
              placeholder="Edit button name"
              style={{ marginBottom: '8px', padding: '4px', fontSize: '12px',borderRadius:'15px',width: '207px', marginLeft: '10px',border:'1px solid green' ,fontSize:'9px',outline:'none'}}
            />
            <Handle
              type="source"
              position={Position.Right}
              id="right-handle-buttonName"
              style={{ borderColor:'green',backgroundColor:'white', position: 'absolute', right: '9px', top: '45%', transform: 'translateY(-50%)' }}
            />
          </div>

          {/* Button Link Input with Handles */}
          <div style={{ position: 'relative' }}>
            <Handle
              type="target"
              position={Position.Left}
              id="left-handle-buttonLink"
              style={{ borderColor:'green',backgroundColor:'white', position: 'absolute', left: '6px', top: '45%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={buttonLink}
              onChange={handleButtonLinkChange}
              placeholder="Edit button link"
              style={{ marginBottom: '8px', padding: '4px', fontSize: '12px',borderRadius:'15px',width: '207px', marginLeft: '10px',border:'1px solid green' ,fontSize:'9px',outline:'none' }}
            />
            <Handle
              type="source"
              position={Position.Right}
              id="right-handle-buttonLink"
              style={{ borderColor:'green',backgroundColor:'white', position: 'absolute', right: '9px', top: '45%', transform: 'translateY(-50%)' }}
            />
          </div>

          <button onClick={toggleEdit} style={{ padding: '8px', fontSize: '12px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '15px',width: '215px', marginLeft: '10px' }}>
            Save
          </button>
        </div>
      )}

      {/* Left handle for input */}
      <Handle
          type="target"
          position={Position.Left} // Use Position.Left for proper left alignment
          id="left-handle" // Unique ID for left handle
          style={{ backgroundColor: 'green',position:'absolute',left:'5px',top:'5rem'}}
        />

        {/* Right handle for output */}
        <Handle
          type="source"
          position={Position.Right} // Use Position.Right for proper right alignment
          id="right-handle" // Unique ID for right handle
          style={{ backgroundColor: 'green',position:'absolute',left:'226px',top:'5rem'}}
        />
    </div>
  );
};

export default LinkNode;
