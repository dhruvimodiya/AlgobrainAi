import React, { useState } from "react";
import { MdPermMedia, MdDelete, MdFileDownload } from "react-icons/md"; // Import delete and download icons
import { FaFilePdf } from "react-icons/fa6";
import { Position } from "@xyflow/react";
import { Handle } from "reactflow";

const PdfNode = ({ data }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pdf, setPdf] = useState(null);

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdf(url);
      console.log(`Uploaded PDF: ${file.name}`);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleDelete = () => {
    setIsDeleted(true);
    setPdf(null); // Clear the uploaded PDF
  };

  return (
    <div
      id={`node${data.uniqueId}`}
      className={`w-60 p-4 rounded-lg shadow-lg bg-white transition-all flex flex-col ${isDeleted ? 'hidden' : 'block'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md border-l-4 border-green-600 mb-2">
        <p className="text-green-700 font-semibold text-sm flex items-center">
          <MdPermMedia className="mr-2" /> Request Intervention
        </p>
        <MdDelete
          className={`cursor-pointer text-green-600 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleDelete}
        />
      </div>

      {/* Hidden file input for selecting a PDF */}
      <input
        type="file"
        id={`node${data.uniqueId}_body`}
        className="hidden"
        accept="application/pdf"
        onChange={handlePdfUpload}
      />

      <div className="flex items-center mb-2">
        <FaFilePdf
          size={24}
          color="green"
          onClick={() => document.getElementById(`node${data.uniqueId}_body`).click()} // Trigger PDF file input on click
          className="cursor-pointer"
        />
        <span className="ml-2 text-sm text-green-700">Click to upload PDF</span>
      </div>

      {pdf && (
        <div>
          {/* Left handle for input */}
          <Handle
            type="target"
            position={Position.Left} // Use Position.Left for proper left alignment
            id="left-handle" // Unique ID for left handle
            className="w-2 h-2 bg-green-600 absolute left-3 top-1/2 transform -translate-y-1/2"
          />

          {/* Right handle for output */}
          <Handle
            type="source"
            position={Position.Right} // Use Position.Right for proper right alignment
            id="right-handle" // Unique ID for right handle
            className="w-2 h-2 bg-green-600 absolute right-3 top-1/2 transform -translate-y-1/2"
          />

          <iframe
            src={pdf}
            style={{
              width: '100%',
              height: '150px', // Set height to display the PDF
              border: 'none',
              marginTop: '10px',
              borderRadius: '4px',
            }}
            title="PDF Preview"
          />
          <div className="flex items-center mt-2">
            <a href={pdf} download className="text-green-600 hover:text-green-800 transition-colors">
              <MdFileDownload size={24} />
            </a>
            <span className="ml-2 text-sm text-green-700">Download PDF</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfNode;
