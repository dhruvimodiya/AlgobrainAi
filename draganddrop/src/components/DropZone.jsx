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
import ReqIntervention from './ReqIntervention';
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
  ReqIntervention: ReqIntervention,
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
      data: { label: `${nodes.length + 1}: ${type}` }, // Display index first then the type
    };

    // Update the nodes and dropped items state
    setNodes((nds) => [...nds, newNode]);
    setDroppedItems((prev) => [...prev, newNode.data.label]); // Store dropped item name

  }, [nodes, setNodes, droppedItems]); // Add droppedItems to dependencies to access latest value

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

  const handlePrintDroppedItems = () => {
    console.log("Button clicked to print dropped items."); // Log button click
    if (droppedItems.length > 0) {
      console.log("Dropped items:", droppedItems.join(', ')); // Print all dropped items
    } else {
      console.log("No items have been dropped."); // Handle case with no dropped items
    }
  };

  return (
    <div  style={{ height: '95vh', width: '80vw', position: 'relative' }}>
      <button
      onClick={handlePrintDroppedItems}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '10px',
          backgroundColor: 'lightblue',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Print Dropped Items
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
