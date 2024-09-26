import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./components/DragItem";
import DropZone from "./components/DropZone";
import { BiRectangle } from "react-icons/bi";
import { MdPermMedia } from "react-icons/md";
import { FaLocationDot  } from "react-icons/fa6";
import { FaFilePdf,FaImage ,FaVideo } from "react-icons/fa6";
import { MdLocalOffer } from "react-icons/md";

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (item) => {
    setDroppedItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...droppedItems];
    updatedItems.splice(index, 1);
    setDroppedItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
        
        {/* Sidebar with DragItems */}
        <div
          style={{
            width: "250px", // Set sidebar width
            height: '100%',
            backgroundColor: "#f4f4f4",
            borderRight: "1px solid #ccc",
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',  // Allow vertical scrolling if items exceed height
          }}
        >
          <h2 style={{ textAlign: "center" }}>Drag Items</h2>

          {/* Container for DragItems - 2 columns per row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",  // Two equal columns
              gap: "10px",  // Space between items
            }}
          >
            {/* Each DragItem and label */}
            {[
              { type: "FlowStart", icon: <BiRectangle />, label: "Flow-Start" },
              { type: "ReqIntervention", icon: <MdPermMedia />, label: "Text" },
              { type: "ImageNode", icon: <FaImage  />, label: "Image" },
              { type: "VideoNode", icon: <FaVideo  />, label: "Video" },
              { type: "PdfNode", icon: <FaFilePdf  />, label: "PDF" },
              { type: "Interactive", icon: <MdPermMedia />, label: "Interactive" },
              { type: "MapNode", icon: <FaLocationDot />, label: "Location" },
              { type: "LinkNode", icon: <MdLocalOffer />, label: "Special Offer" },
              { type: "ShippingNode", icon: <FaImage  />, label: "Shipping" },
            ].map((item, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <DragItem type={item.type} name={item.icon} />
                <p style={{ marginRight: '30px', fontSize: '12px', color: 'black',}}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content area with DropZone */}
        <div style={{ flexGrow: 1, padding: "0px" }}>
          <DropZone />
          {droppedItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px",
                backgroundColor: "lightblue",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>{item.name}</div>
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
