import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./components/DragItem";
import DropZone from "./components/DropZone";
import { BiRectangle } from "react-icons/bi";
import { GiCircle } from "react-icons/gi"; // Import circle icon
import { IoTriangleOutline } from "react-icons/io5";
import { MdHexagon } from "react-icons/md";  // Import hexagon icon
import { FaSquare } from "react-icons/fa";  // Import square icon

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
            backgroundColor: "#f4f4f4",
            borderRight: "1px solid #ccc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: '10px'
          }}
        >
          <h2>Drag Items</h2>
          <DragItem type="rectangle" name={<BiRectangle />} />
          <DragItem type="circle" name={<GiCircle />} />
          <DragItem type="triangle" name={<IoTriangleOutline />} />
          <DragItem type="hexagon" name={<MdHexagon />} />
          <DragItem type="square" name={<FaSquare />} /> {/* Add Square */}
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
