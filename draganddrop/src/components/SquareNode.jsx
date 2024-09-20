import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md"; // Import delete icon

// Base values
const baseNodeHeight = 300; // Base height of the node
const buttonHeightIncrement = 20; // Height added per new button

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

const imgStyle = {
  width: '91%',
  height: '100px',
  borderRadius: '4px',
  cursor: 'pointer',
  margin: '10px',
};

const welcomeStyle = {
  width: '93%',
  height: '50px',
  fontSize: '12px',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '10px',
};

const textAreaStyle = {
  width: '92%',
  height: '100%',
  borderRadius: '4px',
  padding: '8px',
  fontSize: '10px',
  resize: 'none',
  color: 'black',
  border: 'none',
  backgroundColor: '#F8F8F8',
  outline: 'none',
  marginBottom: '8px ',
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
};

const addedButtonStyle = {
  width: '78%',
  height: '5%',
  color: 'green',
  border: '1px solid green',
  borderRadius: '15px',
  padding: '6px',
  cursor: 'pointer',
  marginBottom: '8px',
  fontSize: '10px',
  marginLeft: '20px',
  display: 'flex',
  justifyContent: 'center',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
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

const SquareNode = ({ data }) => {
  const [image, setImage] = useState("https://t3.ftcdn.net/jpg/05/95/78/78/360_F_595787852_efGpIfJmAJxcof7PBsQsDmirsZ3R8o50.jpg");
  const [buttons, setButtons] = useState([]);
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

  // Trigger file input dialog
  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  // Add new button
  const addNewButton = () => {
    if (buttons.length < 3) {
      setButtons([...buttons, `Button ${buttons.length + 1}`]);
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
      style={nodeStyle(buttons.length, isDeleted)}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    >
      {/* Flow-Start section with handles for connections */}
      <div style={flowStartStyle}>
        <p>
          <MdPermMedia style={iconStyle} /> Media + Buttons
        </p>
        <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} /> {/* Delete icon */}
      </div>

      {/* Image section */}
      <div style={imgStyle} onClick={triggerFileInput}>
        <img src={image} alt="Uploaded" style={{ height: '100%', width: '100%' }} />
      </div>

      {/* Hidden file input for selecting an image */}
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleImageUpload}
      />

      {/* Text input area */}
      <div style={welcomeStyle}>
        <textarea
          placeholder="Type something..."
          style={textAreaStyle}
          value={text}
          onChange={handleTextChange}
        ></textarea>
      </div>

      {/* Dynamic buttons */}
      {buttons.map((button, index) => (
        <div key={index} style={addedButtonStyle}>
          {button}
        </div>
      ))}

      {/* Add button */}
      {buttons.length < 3 && (
        <button style={addButtonStyle} onClick={addNewButton}>
          Add Button
        </button>
      )}
    </div>
  );
};

export default SquareNode;
