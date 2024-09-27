import React, { useState } from "react";
import { MdPermMedia, MdDelete, MdFileDownload } from "react-icons/md"; // Import delete and download icons
import { FaFilePdf } from "react-icons/fa6";
import { Position } from "@xyflow/react";
import { Handle } from "reactflow";

const nodeStyle = (isDeleted) => ({
  width: '240px',
  height: isDeleted ? '0px' : 'auto', // Adjust height based on content
  display: isDeleted ? 'none' : 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  boxShadow: '0px  4px 8px rgba(0, 128, 0, 0.3)',
  position: 'relative',
  backgroundColor: isDeleted ? 'transparent' : 'white',
  transition: 'box-shadow 0.3s',
  padding: '10px',
});

const flowStartStyle = {
  borderRadius: '4px',
  color: 'green',
  fontSize: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10px 0',
  fontWeight: 'bold',
  backgroundColor: '#F8F8F8',
  borderLeft: '12px solid green',
  position: 'relative',
};

const iconStyle = {
  marginLeft: '20px',
  cursor: 'pointer',
};

const deleteIconStyle = (isHovered) => ({
  cursor: 'pointer',
  color: 'green',
  opacity: isHovered ? 1 : 0,
  transition: 'opacity 0.3s',
});

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
      style={nodeStyle(isDeleted)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={flowStartStyle}>
        <p>
          <MdPermMedia style={iconStyle} /> Request Intervention
        </p>
        <MdDelete style={deleteIconStyle(isHovered)} onClick={handleDelete} />
      </div>

      {/* Hidden file input for selecting a PDF */}
      <input
        type="file"
        id={`node${data.uniqueId}_body`}
        style={{ display: 'none' }}
        accept="application/pdf"
        onChange={handlePdfUpload}
      />

      <div style={{ margin: '10px 0' }}>
        <FaFilePdf 
          size={24}
          color="green"
          onClick={() => document.getElementById(`node${data.uniqueId}_body`).click()} // Trigger PDF file input on click
          style={{ cursor: 'pointer' }}
        />
        <span style={{ marginLeft: '8px', fontSize: '12px', color: 'green', alignItems:'center'}}>
          Click to upload PDF
        </span>

        {pdf && (
          <div style={{ marginTop: '10px' }}>
            {/* Left handle for input */}
            <Handle
              type="target"
              position={Position.Left} // Use Position.Left for proper left alignment
              id="left-handle" // Unique ID for left handle
              style={{borderColor:'green',backgroundColor:'white',position:'absolute',left:'5px' }}
            />

            {/* Right handle for output */}
            <Handle
              type="source"
              position={Position.Right} // Use Position.Right for proper right alignment
              id="right-handle" // Unique ID for right handle
              style={{ borderColor:'green',backgroundColor:'white',position:'absolute',left:'248px'}}
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
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <a href={pdf} download style={{ color: 'green', textDecoration: 'none' }}>
                <MdFileDownload size={24} />
              </a>
              <span style={{ marginLeft: '8px', fontSize: '12px', color: 'green', marginBottom: '10px'}}>
                Download PDF
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfNode;
