import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { MdPermMedia } from "react-icons/md";

// Define styles as objects for better readability and maintainability
const baseNodeHeight = 300; // Base height of the node
const buttonHeightIncrement = 40; // Height added per new button

const nodeStyle = (buttonCount) => ({
  width: '180px',
  height: `${baseNodeHeight + buttonHeightIncrement * buttonCount}px`, // Dynamically increase height
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #333',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  padding: '8px',
  justifyContent: 'space-between', // Ensures consistent spacing between sections
});

const flowStartStyle = {
  width: '100%',
  height: '30px',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: 'bold',
  border: '1px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F0F0F0',
  marginBottom: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Shadow for the Flow-Start section
};

const iconStyle = {
  marginRight: '4px', // Reduced margin for a cleaner look
};

const imgStyle = {
  width: '100%',
  height: '100px', // Adjusted height for better balance
  border: '1px solid black',
  borderRadius: '4px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  marginBottom: '8px',
  cursor: 'pointer', // Indicates the image is clickable
};

const welcomeStyle = {
  fontSize: '12px',
  padding: '8px', // Adjusted padding for better text input spacing
  borderRadius: '4px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Slightly reduced shadow for a cleaner look
  marginBottom: '8px',
  border: '1px solid #ccc', // Added border for better separation
  display: 'flex',
  flexDirection: 'column',
};

const textAreaStyle = {
  width: '100%',
  height: '100%', // Adjusted to fill the parent container
  borderRadius: '4px',
  padding: '8px', // Added padding for better text input experience
  fontSize: '12px',
  border: '1px solid #ddd',
  resize: 'none',
  boxSizing: 'border-box', // Ensures padding is included in the total width/height
  backgroundColor: '#fafafa', // Light background for better readability
  color: '#333', // Dark text for better contrast
};

const addButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '6px',
  cursor: 'pointer',
  marginBottom: '8px',
  fontSize: '12px',
};

const addedButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  border: '1px solid #333',
  borderRadius: '4px',
  padding: '6px',
  marginBottom: '4px',
  fontSize: '12px',
};

const notificationStyle = {
  backgroundColor: '#4CAF50', // Green background for success message
  color: 'white',
  padding: '5px',
  borderRadius: '4px',
  marginBottom: '8px',
  textAlign: 'center',
  fontSize: '12px',
};

const SquareNode = ({ data }) => {
  const [image, setImage] = useState("https://www.seekpng.com/png/detail/130-1300875_click-here-button-green-click-here-button-png.png");
  const [buttons, setButtons] = useState([]);
  const [notification, setNotification] = useState('');
  const [text, setText] = useState('');

  // Function to handle the image upload
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

  // Function to trigger the file input dialog
  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  // Function to add a new button
  const addNewButton = () => {
    if (buttons.length < 3) {
      setButtons([...buttons, `Button ${buttons.length + 1}`]);
      setNotification('New button added!');
      // Clear the notification after 3 seconds
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // Function to handle text area changes
  const handleTextChange = (event) => {
    setText(event.target.value);
    console.log(`Text area input: ${event.target.value}`); // Log text area input
  };

  return (
    <div style={nodeStyle(buttons.length)}>
      
      {/* Notification message */}
      {notification && (
        <div style={notificationStyle}>
          {notification}
        </div>
      )}
      
      {/* Flow-Start section with handles for connections */}
      <div style={flowStartStyle}>
        <Handle type="target" position={Position.Right} id="flowStartTarget" />
        <MdPermMedia style={iconStyle} />
        <p>Media + Buttons</p>
        {/* Handle for connection from the Flow-Start section */}
      </div>
      
      {/* Image section, clicking on it triggers the file input */}
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

      {/* Dynamic buttons, limit to 3 */}
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
