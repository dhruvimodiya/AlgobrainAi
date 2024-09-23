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
import RectangleNode from './RectangleNode';
import TriangleNode from './TriangleNode'; 
import HexagonNode from './HexagonNode';   
import SquareNode from './SquareNode';     
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
  rectangle: RectangleNode,
  triangle: TriangleNode,
  hexagon: HexagonNode,
  square: SquareNode,
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

  const handleDrop = useCallback((event) => {
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
  }, [nodes, setNodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
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
    // Remove the edge from the edges state
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, [setEdges]);

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
        onEdgeClick={onEdgeClick} // Add this line
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
