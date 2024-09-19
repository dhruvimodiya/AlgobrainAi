import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import custom nodes
import CircleNode from './CircleNode';
import RectangleNode from './RectangleNode';
import TriangleNode from './TriangleNode'; // Add TriangleNode
import HexagonNode from './HexagonNode';   // Add HexagonNode
import SquareNode from './SquareNode';     // Add SquareNode

// Define custom node types
const nodeTypes = {
  circle: CircleNode,
  rectangle: RectangleNode,
  triangle: TriangleNode, // Add TriangleNode type
  hexagon: HexagonNode,   // Add HexagonNode type
  square: SquareNode,     // Add SquareNode type
};

const initialNodes = [];
const initialEdges = [];

const DropZone = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle node drop
  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = {
        x: event.clientX,
        y: event.clientY,
      };

      const newNode = {
        id: `${nodes.length + 1}`,
        type: type || 'default',
        position,
        data: { label: `${type || 'New Node'}` },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, setNodes]
  );

  // Handle drag over the canvas
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle node connection
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  

  return (
    <div style={{ height: '95vh', width: '80vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes} // Specify custom node types
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default DropZone;
