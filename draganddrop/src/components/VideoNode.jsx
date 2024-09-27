import { Position } from '@xyflow/react';
import React, { useState } from 'react';
import { MdPermMedia, MdDelete, MdVideocam } from "react-icons/md"; // Import video upload icon
import { Handle } from 'reactflow';

// Define styles for fixed height
const nodeStyle = (isDeleted, isHovered) => ({
  width: '240px',
  height: isDeleted ? '0px' : '300px', // Set a fixed height
  display: isDeleted ? 'none' : 'flex', // Hide node when deleted
  flexDirection: 'column',
  borderRadius: '8px',
  boxShadow: '0px  4px 8px rgba(0, 128, 0, 0.3)',
  position: 'relative',
  backgroundColor: isDeleted ? 'transparent' : 'white',
  transition: 'box-shadow 0.3s, height 0.3s', // Add a smooth transition for hover effects
  cursor: isHovered ? 'pointer' : 'default',
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

const videoStyle = {
  width: '100%',
  height: '180px', // Set height for the video display
  borderRadius: '4px',
};

const iconStyle ={
  marginLeft: '20px',
};

const deleteIconStyle = (isHovered) => ({
  cursor: 'pointer',
  color: 'green',
  opacity: isHovered ? 1 : 0, // Show icon only when hovered
  transition: 'opacity 0.3s', // Smooth fade-in/out
});

const buttonStyle = {
  width: '80%',
  height: '15%',
  color: 'green',
  border: '2px solid green',
  borderRadius: '20px', // Increased border-radius
  marginLeft: '20px',
  cursor: 'pointer',
  backgroundColor: 'white',
  transition: 'border-color 0.3s', // Smooth transition for border color
  marginTop: '4px',
};

const VideoNode = ({ data }) => {
  const [video, setVideo] = useState(null); // Manage uploaded video state
  const [isDeleted, setIsDeleted] = useState(false); // Manage node's deleted state
  const [isHovered, setIsHovered] = useState(false); // Manage hover state

  // Handle video upload
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result); // Set the uploaded video
        console.log(`Uploaded video: ${file.name}`); // Log video name
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle node delete
  const handleDelete = () => {
    setIsDeleted(true); // Set node as deleted
  };

  return (
    <div
    id={`node${data.uniqueId}`}
      style={nodeStyle(isDeleted, isHovered)}
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

      {/* Hidden file input for selecting a video */}
      <input
        type="file"
        id={`node${data.uniqueId}_body`}
        // id="videoInput"
        style={{ display: 'none' }}
        accept="video/*"
        onChange={handleVideoUpload}
      />

      {/* Video display area */}
      {!isDeleted && video && (
        <video style={videoStyle} controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* New video upload button with video icon */}
      {!isDeleted && (
        <div style={{ marginLeft: '10px', marginTop: '10px', cursor: 'pointer' ,display:'flex'}}>
          <MdVideocam
            size={24}
            color="green"
            onClick={() => document.getElementById(`node${data.uniqueId}_body`).click()} // Trigger video file input on click
          />
          <span style={{ marginLeft: '8px' ,fontSize:'10px',marginTop:'4px',color:'green'}}>Click Here</span>
        </div>
      )}
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
          style={{borderColor:'green',backgroundColor:'white',position:'absolute',left:'226px'}}
        />
    </div>
  );
};

export default VideoNode;
