import { Position } from "@xyflow/react";
import React, { useState } from "react";
import { MdPermMedia, MdDelete, MdEdit } from "react-icons/md";
import { Handle } from "reactflow";

// Base values
const baseNodeHeight = 300;
const buttonHeightIncrement = 28;

const ShippingNode = ({ data }) => {
  const [buttons, setButtons] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  // Add new button
  const addNewButton = () => {
    if (buttons.length < 10) {
      setButtons([...buttons, `Button ${buttons.length + 1}`]);
    }
  };

  // Handle editing button names
  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  // Handle saving button name
  const handleSaveClick = (index, newName) => {
    const updatedButtons = [...buttons];
    updatedButtons[index] = newName;
    setButtons(updatedButtons);
    setEditIndex(-1);
  };

  // Handle deleting individual buttons
  const handleDeleteButton = (index) => {
    const updatedButtons = buttons.filter((_, i) => i !== index);
    setButtons(updatedButtons);
  };

  // Handle node delete
  const handleDelete = () => {
    setIsDeleted(true);
  };

  return (
    <div
      id={`node${data.uniqueId}`}
      className={`flex flex-col w-60 p-4 rounded-lg shadow-lg transition-all bg-white ${
        isDeleted ? "hidden" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        height: `${baseNodeHeight + buttonHeightIncrement * buttons.length}px`,
      }}
    >
      {/* Flow-Start Section */}
      <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md border-l-4 border-green-500">
        <span className="text-green-600 font-bold text-sm flex items-center">
          <MdPermMedia className="mr-2" /> Media + Buttons
        </span>
        <MdDelete
          className={`cursor-pointer text-green-600 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleDelete}
        />
      </div>

      {/* Question Section */}
      <p className="text-green-600 font-bold text-xs mt-4">
        Which Shipping Option do you prefer?
      </p>

      {/* Dynamic Buttons Section */}
      <div className="bg-gray-100 p-2 rounded-md mt-2">
        {buttons.map((button, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-2 mb-2 rounded-md shadow-sm"
            id={`node${data.uniqueId}_button${index}`}
          >
            {/* Left handle */}
            <Handle
              type="target"
              position={Position.Left}
              id={`left-handle-${index}`}
              className="absolute -left-1 top-1/2 transform -translate-y-1/2 bg-green-500"
            />

            {/* Button Name or Input for Editing */}
            {editIndex === index ? (
              <input
                id={`node${data.uniqueId}_button${index}_body`}
                type="text"
                defaultValue={button}
                onBlur={(e) => {
                  console.log("Input value:", e.target.value); // This will print the input value to the console
                  handleSaveClick(index, e.target.value);
                }}
                className="border-b border-gray-300 w-full px-2 py-1 text-sm"
              />
            ) : (
              <span className="text-sm">{button}</span>
            )}

            {/* Icons for Edit/Delete */}
            <div className="flex items-center space-x-2">
              <MdEdit
                className="text-blue-500 cursor-pointer"
                onClick={() => handleEditClick(index)}
              />
              <MdDelete
                className="text-red-500 cursor-pointer"
                onClick={() => handleDeleteButton(index)}
              />
            </div>

            {/* Right handle */}
            <Handle
              type="source"
              position={Position.Right}
              id={`right-handle-${index}`}
              className="absolute -right-1 top-1/2 transform -translate-y-1/2 bg-green-500"
            />
          </div>
        ))}
      </div>

      {/* Add Button */}
      {buttons.length < 10 && (
        <button
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all text-sm"
          onClick={addNewButton}
        >
          Add Button
        </button>
      )}
    </div>
  );
};

export default ShippingNode;
