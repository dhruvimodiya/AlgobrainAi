import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md";
import { Handle, Position } from 'reactflow';

const TextNode = ({ data }) => {
  const [text, setText] = useState('');
  const [isDeleted, setIsDeleted] = useState(false); // Manage node's deleted state
  const [isHovered, setIsHovered] = useState(false); // Manage hover state

  // Handle text area input
  const handleTextChange = (event) => {
    setText(event.target.value);
    // console.log(`Text area input: ${event.target.value}`); // Log text area input
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
      {/* Flow Start Section */}
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md border-l-4 border-green-600 mb-2">
        <p className="text-green-700 font-semibold text-sm flex items-center">
          <MdPermMedia className="mr-2" /> Text
        </p>
        <MdDelete
          className={`cursor-pointer text-green-600 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleDelete}
        />
      </div>

      {/* Text Input Area */}
      <div className="relative w-full">
        <textarea
          id={`node${data.uniqueId}_body`}
          placeholder="Type something..."
          className="w-full h-28 p-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-100 resize-none focus:ring-2 focus:ring-green-500 outline-none"
          value={text}
          onChange={handleTextChange}
        />

        {/* Left Handle for Input */}
        <Handle
          type="target"
          position={Position.Left}
          id="left-handle"
          className="w-2 h-2 bg-green-600 absolute -left-1 top-1/2 transform -translate-y-1/2"
        />

        {/* Right Handle for Output */}
        <Handle
          type="source"
          position={Position.Right}
          id="right-handle"
          className="w-2 h-2 bg-green-600 absolute -right-1 top-1/2 transform -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default TextNode;
