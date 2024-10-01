import { Position } from '@xyflow/react';
import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md"; // Import delete icon
import { Handle } from 'reactflow';

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
        document.getElementById(`node${data.uniqueId}_body`).click();
    };

    // Handle node delete
    const handleDelete = () => {
        setIsDeleted(true); // Set node as deleted
    };

    return (
        <div
            id={`node${data.uniqueId}`}
            className={`w-60 h-auto p-4 rounded-lg shadow-lg bg-white transition-all flex flex-col ${isDeleted ? 'hidden' : ''}`}
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
        >
            {/* Header Section */}
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md border-l-4 border-green-600 mb-2">
                <p className="text-green-700 font-semibold text-sm flex items-center">
                    <MdPermMedia className="mr-2" /> Image
                </p>
                <MdDelete
                    className={`cursor-pointer text-green-600 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    onClick={handleDelete}
                />
            </div>

            {/* Image Section */}
            <div 
                className="w-full h-24 rounded-md border border-gray-300 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                onClick={triggerFileInput}
            >
                <img
                    src={images[nodeId] || "https://t3.ftcdn.net/jpg/05/95/78/78/360_F_595787852_efGpIfJmAJxcof7PBsQsDmirsZ3R8o50.jpg"}
                    alt="Uploaded"
                    className="h-full w-full rounded-md object-cover"
                />
            </div>

            {/* Hidden file input for selecting an image */}
            <input
                type="file"
                id={`node${data.uniqueId}_body`} // Use nodeId for unique file input
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />

            {/* Left Handle for Input */}
            <Handle
                type="target"
                position={Position.Left} // Use Position.Left for proper left alignment
                id="left-handle" // Unique ID for left handle
                className="w-2 h-2 bg-green-700 absolute left-3 top-1/2 transform -translate-y-1/2"
            />

            {/* Right Handle for Output */}
            <Handle
                type="source"
                position={Position.Right} // Use Position.Right for proper right alignment
                id="right-handle" // Unique ID for right handle
                className="w-2 h-2 bg-green-700 absolute right-3 top-1/2 transform -translate-y-1/2"
            />
        </div>
    );
};

export default ImageNode;
