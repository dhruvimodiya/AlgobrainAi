import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md"; // Import delete icon


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

const edges = [{ id: '1-2', source: '1', target: '2' }];

const SquareNode = ({ data }) => {
  const [text, setText] = useState('');
  const [isDeleted, setIsDeleted] = useState(false); // Manage node's deleted state
  const [isHovered, setIsHovered] = useState(false); // Manage hover state

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the uploaded image
        console.log(`Uploaded image: ${file.name}`); // Log image name
      };
      reader.readAsDataURL(file);
    }
  };

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
          <MdPermMedia style={iconStyle} /> Request Intervention
        </p>
        <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} /> {/* Delete icon */}
      </div>

      {/* Text input area with handle */}
      <div style={welcomeStyle}>
        <textarea
          placeholder="Type something..."
          style={textAreaStyle}
          value={text}
          onChange={handleTextChange}
        >
          
        </textarea>
      </div>
    </div>
  );
};

export default SquareNode;
