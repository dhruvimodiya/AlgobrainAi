import { Position } from '@xyflow/react';
import React, { useState } from 'react';
import { MdPermMedia, MdDelete, MdVideocam } from "react-icons/md"; // Import video upload icon
import { Handle } from 'reactflow';

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
            className={`w-60 h-auto p-4 rounded-lg shadow-lg bg-white transition-all flex flex-col ${isDeleted ? 'hidden' : ''}`}
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
        >
            {/* Header Section */}
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md border-l-4 border-green-600 mb-2">
                <p className="text-green-700 font-semibold text-sm flex items-center">
                    <MdPermMedia className="mr-2" /> Video
                </p>
                <MdDelete
                    className={`cursor-pointer text-green-700 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    onClick={handleDelete}
                />
            </div>

            {/* Hidden file input for selecting a video */}
            <input
                type="file"
                id={`node${data.uniqueId}_body`}
                className="hidden"
                accept="video/*"
                onChange={handleVideoUpload}
            />

            {/* Video display area */}
            {!isDeleted && video && (
                <video className="w-full h-36 rounded-md border border-gray-300 mb-2" controls>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            {/* New video upload button with video icon */}
            {!isDeleted && (
                <div className="flex items-center cursor-pointer mb-2" onClick={() => document.getElementById(`node${data.uniqueId}_body`).click()}>
                    <MdVideocam size={24} color="green" />
                    <span className="ml-2 text-sm text-green-700">Upload Video</span>
                </div>
            )}

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

export default VideoNode;
