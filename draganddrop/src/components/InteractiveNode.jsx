import { Position } from "@xyflow/react";
import React, { useState } from "react";
import { MdPermMedia, MdDelete, MdEdit } from "react-icons/md"; // Import delete icon
import { Handle } from "reactflow";

// Base values
const baseNodeHeight = 300; // Base height of the node
const buttonHeightIncrement = 50; // Height added per new button
const padding = 60; // Padding for the container

// Define styles for dynamic adjustment
const nodeStyle = (buttonCount, isDeleted) => ({
  width: "240px",
  // maxHeight: '400px', // Set a maximum height
  height: isDeleted
    ? "0px"
    : `${baseNodeHeight + buttonHeightIncrement * buttonCount + padding}px`,
  display: isDeleted ? "none" : "flex",
  flexDirection: "column",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 128, 0, 0.3)",
  position: "relative",
  backgroundColor: isDeleted ? "transparent" : "white",
  transition: "height 0.3s, box-shadow 0.3s",
});

const flowStartStyle = {
  borderRadius: "4px",
  color: "green",
  fontSize: "12px",
  display: "flex",
  justifyContent: "space-between",
  margin: "10px",
  fontWeight: "bold",
  backgroundColor: "#F8F8F8",
  borderLeft: "12px solid green",
  position: "relative",
};

const imgStyle = {
  width: "91%",
  height: "50px",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "2px",
  fontSize: "12px",
  color: "red",
};

const welcomeStyle = {
  width: "105%",
  height: "50px",
  fontSize: "12px",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  marginLeft: "1px",
};

const italicStyle = {
  width: "92%",
  height: "100%",
  borderRadius: "4px",
  padding: "8px",
  fontSize: "10px",
  resize: "none",
  color: "black",
  border: "none",
  backgroundColor: "#F8F8F8",
  outline: "none",
  marginBottom: "8px ",
  fontStyle: "italic",
};

const textAreaStyle = {
  width: "92%",
  height: "100%",
  borderRadius: "4px",
  padding: "8px",
  fontSize: "10px",
  resize: "none",
  color: "black",
  border: "none",
  backgroundColor: "#F8F8F8",
  outline: "none",
  marginBottom: "8px ",
};

const addButtonStyle = {
  width: "83%",
  height: "8%",
  color: "white",
  backgroundColor: "#DCDCDC",
  borderRadius: "15px",
  padding: "6px",
  cursor: "pointer",
  marginBottom: "10px",
  fontSize: "10px",
  marginLeft: "20px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const addedButtonStyle = {
  width: "78%",
  height: "5%",
  color: "green",
  border: "1px solid green",
  borderRadius: "15px",
  padding: "6px",
  cursor: "pointer",
  marginBottom: "8px",
  fontSize: "10px",
  marginLeft: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  position: "relative",
};

const iconStyle = {
  marginLeft: "20px",
};

const deleteIconStyle = (isHovered) => ({
  cursor: "pointer",
  color: "green",
  opacity: isHovered ? 1 : 0,
  transition: "opacity 0.3s",
});

const InteractiveNode = ({ data }) => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [buttons, setButtons] = useState([]);
  const [text, setText] = useState("");
  const [italicText, setItalicText] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState({}); // Change editMode to an object
  const [buttonTypes, setButtonTypes] = useState(
    Array(buttons.length).fill("normal")
  );
  const [textContent, setTextContent] = useState(""); // New state for text content

  // Handle file upload and preview
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setShowOptions(false);
    }
  };

  // Trigger file type selection
  const triggerFileInput = () => {
    setShowOptions(true); // Show file type options
  };

  // Handle file type selection
  const handleFileTypeSelection = (type) => {
    // If "text" is selected, don't trigger file input, just set the fileType to "text"
    if (type === "text") {
      setFileType("text");
      return;
    }

    let acceptType = "";
    switch (type) {
      case "image":
        acceptType = "image/*";
        break;
      case "video":
        acceptType = "video/*";
        break;
      case "document":
        acceptType = ".pdf,.doc,.docx";
        break;
      default:
        acceptType = "image/*";
    }

    // Update fileType and trigger file input for non-text types
    setFileType(type);
    const input = document.getElementById(`node${data.uniqueId}_header`); // Correctly referencing the file input's ID
    input.setAttribute("accept", acceptType);
    input.click(); // Trigger file input for image, video, and document types
    setShowOptions(false);

    input.setAttribute("accept", acceptType);
    input.click(); // Trigger file input for image, video, and document types
    setShowOptions(false);
  };

  // Add new button
  const addNewButton = () => {
    if (buttons.length < 3) {
      setButtons([...buttons, `Button ${buttons.length + 1}`]);
    }
  };

  const handleItalicText = (event) => {
    setItalicText(event.target.value);
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
    // Check if the fileType is 'text' and show the text area directly
    if (fileType === "text") {
      return (
        <textarea
          style={{
            width: "100%",
            height: "100%",
            marginTop: "-4px",
            marginLeft: "-3px",
          }}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Type your text here..."
        />
      );
    }

    // Handle other file types (image, video, document)
    if (!file) return null;
    const fileUrl = URL.createObjectURL(file);

    switch (fileType) {
      case "image":
        return (
          <img
            src={fileUrl}
            alt="Uploaded"
            style={{ height: "100%", width: "100%", marginTop: "0px" }}
          />
        );
      case "video":
        return (
          <video
            src={fileUrl}
            controls
            style={{ height: "100%", width: "100%" }}
          />
        );
      case "document":
        return file.type === "application/pdf" ? (
          <iframe
            src={fileUrl}
            title="PDF Preview"
            style={{ height: "100%", width: "100%" }}
            frameBorder="0"
          />
        ) : (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download {file.name}
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-60 p-4 rounded-lg shadow-lg bg-white transition-all flex flex-col ${
        isDeleted ? "hidden" : ""
      }`}
      id={`node${data.uniqueId}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
       {/* Flow-Start section with handles for connections */}
       <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md border-l-4 border-green-600">
        <p className="text-green-700 font-semibold text-sm flex items-center">
          <MdPermMedia className="mr-2" />
          Interactive
        </p>
        <MdDelete
          className={`cursor-pointer text-green-600 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleDelete}
        />
      </div>

      {/* File selection area */}
      <div style={imgStyle} onClick={triggerFileInput}>
        <p>Select a file to upload (Image, Video, Document,Text)</p>
      </div>

      {/* File type options */}
      {showOptions && (
        <div
          style={{
            width: "160px",
            margin: "10px",
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 128, 0, 0.3)",
            position: "absolute",
            top: "65px",
            left: "232px",
          }}
        >
          <p
            className="hoverEffect"
            onClick={() => handleFileTypeSelection("image")}
          >
            Select Image
          </p>
          <p
            className="hoverEffect"
            onClick={() => handleFileTypeSelection("video")}
          >
            Select Video
          </p>
          <p
            className="hoverEffect"
            onClick={() => handleFileTypeSelection("document")}
          >
            Select Document
          </p>
          <p
            className="hoverEffect"
            onClick={() => handleFileTypeSelection("text")}
          >
            Select Text
          </p>{" "}
          {/* New option for text */}
        </div>
      )}

      <style>
        {`
    .hoverEffect {
      margin: 5px 0;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    
    .hoverEffect:hover {
      color: green;
    }
  `}
      </style>

      {/* Hidden file input for selecting an image/video/document */}
      <input
        type="file"
        // id="fileInput"
        id={`node${data.uniqueId}_header`}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      {/* File preview section */}
      <div
        style={{
          margin: "2px",
          border: "1px solid green",
          borderRadius: "4px",
          padding: "5px",
          width: "200px",
          height: "110px",
        }}
      >
        {renderFilePreview()}
      </div>
      {/* Left handle for input */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          backgroundColor: "green",
          fontSize: "15px",
          position: "absolute",
          left: "1px",
          top: "50%",
        }}
      />

      {/* Text input area */}
      <div style={welcomeStyle}>
        <textarea
          id={`node${data.uniqueId}_body`}
          placeholder="Type something..."
          style={textAreaStyle}
          value={text}
          onChange={handleTextChange}
        />
      </div>

      {/* Text input area  for footer*/}
      <div style={welcomeStyle}>
        <input
          id={`node${data.uniqueId}_footer`}
          type="text"
          placeholder="Type something..."
          style={italicStyle}
          value={italicText}
          onChange={handleItalicText}
        />
      </div>

{/* Dynamic buttons with handles and delete functionality */}
{buttons.map((button, index) => (
  <div
    key={index}
    className="relative flex items-center p-2 border border-green-400 bg-gray-50 rounded-lg shadow-md mb-3 w-45"
  >
    {/* Left Handle */}
    <Handle
      type="target"
      position={Position.Right}
      id={`right-handle-${index}`}
       className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 bg-green-700"
      // className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white"
    />

    {!editMode[index] && (
      <button
        className="flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition-all"
        id={`node${data.uniqueId}_button${index}`}
      >
        {/* Dynamically display button name and type */}
        <span className="text-gray-800 font-semibold text-sm">
          {buttonTypes[index] === "normal" && `Button: ${button}`}
          {buttonTypes[index] === "url" && `URL: ${button}`}
          {buttonTypes[index] === "number" && `Number: ${button}`}
          {buttonTypes[index] !== "normal" && buttonTypes[index] !== "url" && buttonTypes[index] !== "number" && `Button: ${button}`}

        </span>

        {/* Edit and Delete Icons */}
        <div className="flex items-center space-x-2">
          <MdEdit
            className="text-blue-500 hover:text-blue-600 cursor-pointer text-lg"
            onClick={() => setEditMode((prev) => ({ ...prev, [index]: true }))}
          />
          <MdDelete
            className="text-green-700 cursor-pointer text-lg"
            onClick={() => handleDeleteButton(index)}
          />
        </div>
      </button>
    )}

    <div className={` flex flex-col gap-2 bg-white -mx-1 rounded-lg shadow-md ${editMode[index] ? "block" : "hidden"}`}>
      <select
        className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
        id={`node${data.uniqueId}_button${index}_subheader`}
        value={buttonTypes[index]}
        onChange={(e) => {
          const newType = e.target.value;
          setButtonTypes((prev) => {
            const updated = [...prev];
            updated[index] = newType;
            return updated;
          });
        }}
      >
        <option value="normal">Button</option>
        <option value="url">URL</option>
        <option value="number">Only Number</option>
      </select>

      {/* Input for button name */}
      <input
        id={`node${data.uniqueId}_button${index}_subbody`}
        className="p-2 border border-gray-300 rounded-lg bg-white"
        placeholder="Enter button name"
        type="text"
        value={button}
        onChange={(e) => {
          const newButtonName = e.target.value;
          setButtons((prev) => {
            const updated = [...prev];
            updated[index] = newButtonName;
            return updated;
          });
        }}
      />

      {/* Input for button type (number or text) */}
      <input
        id={`node${data.uniqueId}_button${index}_subfooter`}
        className="p-2 border border-gray-300 rounded-lg bg-white"
        type={buttonTypes[index] === "number" ? "number" : "text"}
        placeholder={`Enter ${buttonTypes[index]}`}
      />

      {/* Done button */}
      <button
        id={`node${data.uniqueId}_subbutton`}
        className="mt-2 p-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all"
        onClick={() => setEditMode((prev) => ({ ...prev, [index]: false }))}
      >
        Done
      </button>
    </div>

    {/* Right Handle */}
    <Handle
      type="source"
      position={Position.Right}
      id={`right-handle-${index}`}
      className="absolute -right-1.5 top-1/2 transform -translate-y-1/2 bg-green-700"
    />
  </div>
))}

{/* Add button */}
{buttons.length < 3 && (
  <button
    className="mt-3 p-2 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
    onClick={addNewButton}
  >
    Add Button
  </button>
)}

    </div>
  );
};

export default InteractiveNode;
