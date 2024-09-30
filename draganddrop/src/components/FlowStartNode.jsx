import { Position } from '@xyflow/react';
import React, { useState } from 'react';
import { MdPermMedia, MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx"; 
import { Handle } from 'reactflow';

const FlowStart = ({ data }) => {
  const [inputs, setInputs] = useState(['', '', '']); 
  const [isDeleted, setIsDeleted] = useState(false); 
  const [isHovered, setIsHovered] = useState(false); 

  const handleDelete = () => {
    setIsDeleted(true); 
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  return (
    <div
    id={`node${data.uniqueId}`}
      className={`w-60 p-4 rounded-lg shadow-lg bg-white transition-all flex flex-col ${isDeleted ? 'hidden' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: '200px' }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md border-l-4 border-green-600">
        <p className="text-green-700 font-semibold text-sm flex items-center">
          <MdPermMedia className="mr-2" /> Flow Start
        </p>
        <MdDelete
          className={`cursor-pointer text-green-600 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleDelete}
        />
      </div>

      {/* Input Fields */}
      <div className="mt-4 space-y-2">
        {inputs.map((input, index) => (
          <div key={index} className="relative">
            <input
              type="text"
              id={`node${data.uniqueId}_body`}
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full p-2 border rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <RxCross2
              onClick={() => handleRemoveInput(index)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Right Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-green-600 absolute right-2 top-8 transform -translate-y-1/2"
      />
    </div>
  );
};

export default FlowStart;
