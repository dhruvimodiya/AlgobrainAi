import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md"; // Import delete icon
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import Google Maps components

// Define styles for dynamic adjustment
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

const MapNode = ({ data }) => {
  const [mapPosition, setMapPosition] = useState({ lat: 37.7749, lng: -122.4194 }); // Default map position
  const [isDeleted, setIsDeleted] = useState(false); // Manage node's deleted state
  const [isHovered, setIsHovered] = useState(false); // Manage hover state


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
          <MdPermMedia style={iconStyle} /> Map Node
        </p>
        <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} /> {/* Delete icon */}
      </div>

      {/* Map section */}
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={{ height: '200px', width: '100%' }}
          center={mapPosition}
          zoom={10}
        >
          <Marker position={mapPosition} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapNode;
