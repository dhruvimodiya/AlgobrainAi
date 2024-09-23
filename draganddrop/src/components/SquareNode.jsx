import { Position } from '@xyflow/react';
import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md"; // Import delete icon
import { Handle } from 'reactflow';

// Base values
const baseNodeHeight = 300; // Base height of the node
const buttonHeightIncrement = 50; // Height added per new button
const padding = 20; // Padding for the container

// Define styles for dynamic adjustment
const nodeStyle = (buttonCount, isDeleted) => ({
  width: '240px',
  maxHeight: '400px', // Set a maximum height
  height: isDeleted ? '0px' : `${baseNodeHeight + buttonHeightIncrement * buttonCount + padding}px`,
  display: isDeleted ? 'none' : 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  boxShadow: '0px 0px 2px rgba(0, 128, 0, 0.3)',
  position: 'relative',
  backgroundColor: isDeleted ? 'transparent' : 'white',
  transition: 'height 0.3s, box-shadow 0.3s',
});


const flowStartStyle = {
  borderRadius: '4px',
  color: 'green',
  fontSize: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10px',
  fontWeight: 'bold',
  backgroundColor: '#F8F8F8',
  borderLeft: '12px solid green',
  position: 'relative',
};

const imgStyle = {
  width: '91%',
  height: '50px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '12px',
  fontSize:'12px',
  color:'red',
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
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'relative',
};

const iconStyle = {
  marginLeft: '20px',
};

const deleteIconStyle = (isHovered) => ({
  cursor: 'pointer',
  color: 'green',
  opacity: isHovered ? 1 : 0,
  transition: 'opacity 0.3s',
});

const SquareNode = ({ data }) => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [buttons, setButtons] = useState([]);
  const [text, setText] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Handle file upload and preview
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Trigger file type selection
  const triggerFileInput = () => {
    setShowOptions(true); // Show file type options
  };

  // Handle file type selection
  const handleFileTypeSelection = (type) => {
    let acceptType = '';
    switch (type) {
      case 'image':
        acceptType = 'image/*';
        break;
      case 'video':
        acceptType = 'video/*';
        break;
      case 'document':
        acceptType = '.pdf,.doc,.docx';
        break;
      default:
        acceptType = 'image/*';
    }
    setShowOptions(false);
    setFileType(type);
    const input = document.getElementById('fileInput');
    input.setAttribute('accept', acceptType);
    input.click();
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
  };

  // Handle node delete
  const handleDelete = () => {
    setIsDeleted(true);
  };

  // Handle individual button delete
  const handleDeleteButton = (index) => {
    const updatedButtons = buttons.filter((_, i) => i !== index);
    setButtons(updatedButtons);
  };

  // Render file preview based on type
  const renderFilePreview = () => {
    if (!file) return null;

    const fileUrl = URL.createObjectURL(file);

    switch (fileType) {
      case 'image':
        return <img src={fileUrl} alt="Uploaded" style={{ height: '100%', width: '100%',marginTop:'0px' }} />;
      case 'video':
        return <video src={fileUrl} controls style={{ height: '100%', width: '100%' }} />;
      case 'document':
        // Render PDF preview
        if (file.type === 'application/pdf') {
          return (
            <iframe
              src={fileUrl}
              title="PDF Preview"
              style={{ height: '100%', width: '100%' }}
              frameBorder="0"
            />
          );
        } else {
          return (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              Download {file.name}
            </a>
          );
        }
      default:
        return null;
    }
  };

  return (
    <div
      style={nodeStyle(buttons.length, isDeleted)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Flow-Start section with handles for connections */}
      <div style={flowStartStyle}>
        <p>
          <MdPermMedia style={iconStyle} /> Media + Buttons
        </p>
        <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} />
      </div>

      {/* File selection area */}
      <div style={imgStyle} onClick={triggerFileInput}>
        <p>Select a file to upload (Image, Video, Document)</p>
      </div>

      {/* File type options */}
      {showOptions && (
        <div style={{ margin: '10px', backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 128, 0, 0.3)' }}>
          <p onClick={() => handleFileTypeSelection('image')}>Select Image</p>
          <p onClick={() => handleFileTypeSelection('video')}>Select Video</p>
          <p onClick={() => handleFileTypeSelection('document')}>Select Document</p>
        </div>
      )}

      {/* Hidden file input for selecting an image/video/document */}
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {/* File preview section */}
      <div style={{ margin: '10px', border: '1px solid green', borderRadius: '4px', padding: '5px' }}>
        {renderFilePreview()}
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

      {/* Dynamic buttons with handles and delete functionality */}
      {buttons.map((button, index) => (
        <div key={index} style={addedButtonStyle}>
          <Handle
            type="target"
            position={Position.Left}
            id={`left-handle-${index}`}
            style={{ borderColor: 'green', backgroundColor: 'white', position: 'absolute', left: '-6px', top: '50%' }}
          />
          <span>{button}</span>
          <MdDelete style={iconStyle} onClick={() => handleDeleteButton(index)} />
          <Handle
            type="source"
            position={Position.Right}
            id={`right-handle-${index}`}
            style={{ borderColor: 'green', backgroundColor: 'white', position: 'absolute', right: '-6px', top: '50%' }}
          />
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
