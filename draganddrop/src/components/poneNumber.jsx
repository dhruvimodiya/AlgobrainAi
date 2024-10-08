import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md";
import { Position } from '@xyflow/react';
import { Handle } from 'reactflow';

// Define styles for dynamic adjustment
const nodeStyle = (isDeleted) => ({
  width: '260px',
  height: isDeleted ? '0px' : '280px', 
  display: isDeleted ? 'none' : 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  boxShadow: '0 6px 20px rgba(0, 128, 0, 0.25)',
  position: 'relative',
  backgroundColor: isDeleted ? 'transparent' : '#FFF', 
  transition: 'all 0.3s ease',
  padding: '16px',
  overflow: 'hidden',
});

const textareaStyle = {
  marginTop: '10px',
  width: '100%', 
  height: '40px',
  padding: '8px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  backgroundColor: '#F8F8F8',
  fontSize: '12px',
  color: '#333',
  resize: 'none',
  outline: 'none',
  transition: 'border-color 0.2s ease',
};

const bodyStyle = {
  width: '100%',
  height: '40px',
  padding: '8px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  fontSize: '12px',
  backgroundColor: '#F9F9F9',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  position: 'relative',
  marginBottom: '8px',
};


const poneNumber = ({ data }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleDelete = () => {
    setIsDeleted(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRemoveInput = () => {
    setInputValue('');
  };

  return (
    <div
      id={`node${data.uniqueId}`}
      style={nodeStyle(isDeleted)}
      className={`w-60 p-4 rounded-lg shadow-lg bg-white transition-all flex flex-col ${isDeleted ? 'hidden' : 'block'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with media icon and delete button */}
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md border-l-4 border-green-600 mb-2">
        <p className="text-green-700 font-semibold text-sm flex items-center">
          <MdPermMedia className="mr-2" /> Map Node
        </p>
        <MdDelete className={`cursor-pointer text-green-600 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} onClick={handleDelete} />
      </div>

      {/* Textarea for notes */}
      <div style={{ textAlign: 'center' }}>
        <textarea 
          placeholder="Enter formatted_name here..." 
          style={textareaStyle}
          id={`node${data.uniqueId}_header`}
        />
      </div>

      {/* Input with cross icon */}
      <div style={{ position: 'relative' }}>
        <input 
          id={`node${data.uniqueId}_body`}
          type="text" 
          style={bodyStyle} 
          placeholder="Enter first_name here..."
        />
      </div>
      <div style={{ position: 'relative' }}>
        <input 
          id={`node${data.uniqueId}_subbody`}
          type="text" 
          style={bodyStyle} 
          // value={inputValue} 
          // onChange={handleInputChange}
          placeholder="Enter  last_name here..."
        />
      </div>
      <div style={{ position: 'relative' }}>
        <input 
          id={`node${data.uniqueId}_footer`}
          type="text" 
          style={bodyStyle} 
          // value={inputValue} 
          onChange={handleInputChange}
          placeholder="Enter phone here..."
        />
      </div>

      {/* Handles for connecting nodes */}
      <Handle
            type="target"
            position={Position.Left} // Use Position.Left for proper left alignment
            id="left-handle" // Unique ID for left handle
            className="w-2 h-2 bg-green-600 absolute left-2 top-1/2 transform -translate-y-1/2"
          />
       <Handle
            type="source"
            position={Position.Right} // Use Position.Right for proper right alignment
            id="right-handle" // Unique ID for right handle
            className="w-2 h-2 bg-green-600 absolute right-2 top-1/2 transform -translate-y-1/2"
          />
    </div>
  );
};

export default poneNumber;
