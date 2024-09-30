import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import custom nodes (make sure these exist)
import FlowStartNode from './FlowStartNode';
import TriangleNode from './TriangleNode'; 
import HexagonNode from './HexagonNode';   
import InteractiveNode from './InteractiveNode';     
import TextNode from './TextNode';
import MapNode from './MapNode';
import LinkNode from './LinkNode';
import VideoNode from './VideoNode';
import PdfNode from './PdfNode';
import ImageNode from './ImageNode';
import ShippingNode from './ShippingNode';
import CustomEdge from './CustomEdge';

// Define custom node types
const nodeTypes = {
  FlowStart: FlowStartNode,
  triangle: TriangleNode,
  hexagon: HexagonNode,
  Interactive: InteractiveNode,
  Text: TextNode,
  MapNode: MapNode,
  LinkNode: LinkNode,
  VideoNode: VideoNode,
  PdfNode: PdfNode,
  ImageNode: ImageNode,
  ShippingNode: ShippingNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const initialNodes = [];
const initialEdges = [];

const DropZone = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [droppedItems, setDroppedItems] = useState([]); // State to store dropped item names
  
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = {
      x: event.clientX,
      y: event.clientY,
    };

    if (!type) {
      console.error("No type found in dataTransfer.");
      return;
    }

    // Create a new node with an index
    const newNode = {
      id: `${nodes.length + 1}`, // Unique ID for the node
      type: type,
      position,
      data: { 
        label: `${nodes.length + 1}: ${type}`, 
        content: `Content for ${type}`,
        uniqueId: `${nodes.length + 1}` // Pass the unique ID to the node
      }, // Display index first then the type
    };

    // Update the nodes and dropped items state
    setNodes((nds) => [...nds, newNode]);
    setDroppedItems((prev) => [...prev, { name: newNode.data.label, content: newNode.data.content }]); // Store dropped item name

  }, [nodes, setNodes, droppedItems]); // Add droppedItems to dependencies to access the latest value

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'; // Indicate that the drop will move the element
  }, []);

  const onConnect = useCallback((params) => {
    const newParams = { 
      ...params, 
      type: 'custom',
      animated: true,
      style: { stroke: 'green', strokeWidth: 2 },
    };
    setEdges((eds) => addEdge(newParams, eds));
  }, [setEdges]);

  const onEdgeClick = useCallback((event, edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, [setEdges]);

  // Function to print specific node by id
  const handlePrintDroppedItems = (id) => {
    console.log(`Button clicked to print dropped item with id: ${id}`);

    const selectedNode = nodes.find((node) => node.id === id);
    
    if (!selectedNode) {
      console.warn(`No item found with id: ${id}`);
      return;
    }

    let nodeEl={
      type:selectedNode.type,
    }
    if (selectedNode.type === "Text" || selectedNode.type === "FlowStart" || selectedNode.type === "ImageNode" || selectedNode.type === "VideoNode" || selectedNode.type === "PdfNode" || selectedNode.type === "MapNode") {
      const nodeBodyElement = document.getElementById(`node${selectedNode.id}_body`);
      if (nodeBodyElement) {
          nodeEl.body = nodeBodyElement.value || null;
      } else {
          console.warn(`Element with ID node${selectedNode.id}_body not found.`);
          nodeEl.body = null; // or a default value
      }
  
      if (selectedNode.type === "MapNode") {
          const nodeFooterElement = document.getElementById(`node${selectedNode.id}_footer`);
          nodeEl.footer = nodeFooterElement ? nodeFooterElement.value || null : null;
      }
  
      if (selectedNode.type === "ImageNode") {
          const nodeHeaderImg = document.getElementById(`node${selectedNode.id}_header`);
          nodeEl.header = nodeHeaderImg ? nodeHeaderImg.value || null : null;
      }
      
  } else if (selectedNode.type === "Interactive") {
      console.log("selectedNode.id", selectedNode.id);
      
      const fileInput = document.getElementById(`node${selectedNode.id}_header`);
      nodeEl.head = fileInput.files.length > 0 ? fileInput.files[0].name : null;
  
      const nodeBodyElement = document.getElementById(`node${selectedNode.id}_body`);
      nodeEl.body = nodeBodyElement ? nodeBodyElement.value || null : null;
  
      const nodeFooterElement = document.getElementById(`node${selectedNode.id}_footer`);
      nodeEl.footer = nodeFooterElement ? nodeFooterElement.value || null : null;
  
      // Initialize an array to store button objects
      const buttons = []; 
  
      // Assuming a maximum of 3 buttons
      for (let i = 0; i < 3; i++) {
          const buttonElement = document.getElementById(`node${selectedNode.id}_button${i}`);
          if (buttonElement) {
              let buttonVal = {};
  
              const subHeaderElement = document.getElementById(`node${selectedNode.id}_button${i}_subheader`);
              if (subHeaderElement) {
                  buttonVal.head = subHeaderElement.value || null;
                  console.log("sub header:", subHeaderElement.value);
              }
  
              const subBodyElement = document.getElementById(`node${selectedNode.id}_button${i}_subbody`);
              if (subBodyElement) {
                  buttonVal.body = subBodyElement.value || null;
                  console.log("subBodyElement:", subBodyElement.value);
              }
  
              const subFooterElement = document.getElementById(`node${selectedNode.id}_button${i}_subfooter`);
              if (subFooterElement) {
                  buttonVal.footer = subFooterElement.value || null;
                  console.log("subFooterElement:", subFooterElement.value);
              }
  
              // Push the button object into the buttons array
              buttons.push(buttonVal);
          }
      }
      console.log("dude done:", buttons);
      nodeEl.button = buttons; // Now each entry has value, subHeader, subFooter, and subBody
  } else if (selectedNode.type === "ShippingNode") {
      console.log("selectedNode.id", selectedNode.id);
  
      // const nodeshipping = document.getElementById(`node${selectedNode.id}_body`);
      // nodeEl.body = nodeshipping ? nodeshipping.value || null : null;
      // console.log("🚀 ~ handlePrintDroppedItems ~ nodeshipping:", nodeshipping)
  
      // Initialize an array to store button objects
      const buttons = []; 
  
      // Assuming a maximum of 3 buttons
      for (let i = 0; i < 10; i++) {
          const buttonElement = document.getElementById(`node${selectedNode.id}_button${i}`);
          if (buttonElement) {
              const subBodyElement = document.getElementById(`node${selectedNode.id}_button${i}_body`);
              let buttonVal = {};
  
              if (subBodyElement) {
                  buttonVal.body = subBodyElement.value || null;
                  console.log("subBodyElement:", subBodyElement.value);
              }
  
              // Push the button object into the buttons array
              buttons.push(buttonVal);
          }
      }
      console.log("dude done ----:", buttons);
      nodeEl.button = buttons; // Now each entry has value, subHeader, subFooter, and subBody
  }
  

    console.log("nodeEl",nodeEl)


    // If edges exist, print connections related to this node
    const relatedEdges = edges.filter(
      (edge) => edge.source === id || edge.target === id
    );

    if (relatedEdges.length > 0) {
      const connections = relatedEdges.map((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);
        return `${sourceNode?.data.label} -> ${targetNode?.data.label}`;
      });
      
      console.log("Connections:", connections.join(' | '));
    } else {
      console.log("No connections found for this node.");
    }
  };

  // Print all dropped items
  const handlePrintAllDroppedItems = () => {
    nodes.forEach((node,index) => {
      handlePrintDroppedItems(node.id); // Print each node based on its id
    });
  };

  return (
    <div  style={{ height: '95vh', width: '80vw', position: 'relative' }}>
 <button
  onClick={handlePrintAllDroppedItems}
  style={{
    padding: '1vw', // Padding based on viewport width
    backgroundColor: 'lightblue',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    position: 'fixed',
    left: '2%', // Fixed position from the left
    bottom: '2%', // Fixed position from the bottom
    fontSize: '1vw', // Font size based on viewport width
    boxSizing: 'border-box', // Include padding and border in total width
    transition: 'all 0.3s ease', // Smooth transition for hover effects
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = 'deepskyblue'; // Change color on hover
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = 'lightblue'; // Revert color
  }}
>
  Print All Dropped Items
</button>




      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default DropZone;
