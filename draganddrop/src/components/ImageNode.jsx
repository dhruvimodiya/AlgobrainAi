import { Position } from '@xyflow/react';
import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md"; // Import delete icon
import { Handle } from 'reactflow';

// Define styles for dynamic adjustment
const nodeStyle = (isDeleted) => ({
    width: '240px',
    height: isDeleted ? '0px' : '180px', // Set a fixed height
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

const iconStyle = {
    marginLeft: '20px', // Reduced margin for a cleaner look
};

const deleteIconStyle = (isHovered) => ({
    cursor: 'pointer',
    color: 'green',
    opacity: isHovered ? 1 : 0, // Show icon only when hovered
    transition: 'opacity 0.3s', // Smooth fade-in/out
});

const ImageNode = ({ data, nodeId }) => {
    const [images, setImages] = useState({}); // Store image data by nodeId
    const [isDeleted, setIsDeleted] = useState(false); // Manage node's deleted state
    const [isHovered, setIsHovered] = useState(false); // Manage hover state

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages((prevImages) => ({
                    ...prevImages,
                    [nodeId]: reader.result, // Save image with nodeId
                }));
                console.log(`Uploaded image: ${file.name}`); // Log image name
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger file input dialog
    const triggerFileInput = () => {
        document.getElementById(`fileInput-${nodeId}`).click();
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
                    <MdPermMedia style={iconStyle} /> Media + Buttons
                </p>
                <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} /> {/* Delete icon */}
            </div>

            {/* Image section */}
            <div style={imgStyle} onClick={triggerFileInput}>
                <img
                    src={images[nodeId] || "https://t3.ftcdn.net/jpg/05/95/78/78/360_F_595787852_efGpIfJmAJxcof7PBsQsDmirsZ3R8o50.jpg"}
                    alt="Uploaded"
                    style={{ height: '100%', width: '100%' }}
                />
            </div>

            {/* Hidden file input for selecting an image */}
            <input
                type="file"
                id={`fileInput-${nodeId}`} // Use nodeId for unique file input
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
            />

            {/* Left handle for input */}
            <Handle
                type="target"
                position={Position.Left} // Use Position.Left for proper left alignment
                id="left-handle" // Unique ID for left handle
                style={{ borderColor: 'green', backgroundColor: 'white', position: 'absolute', left: '5px' }}
            />

            {/* Right handle for output */}
            <Handle
                type="source"
                position={Position.Right} // Use Position.Right for proper right alignment
                id="right-handle" // Unique ID for right handle
                style={{ borderColor: 'green', backgroundColor: 'white', position: 'absolute', left: '226px' }}
            />
        </div>
    );
};

export default ImageNode;
