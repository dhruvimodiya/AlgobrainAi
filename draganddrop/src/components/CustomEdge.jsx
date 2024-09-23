// CustomEdge.js
import React from 'react';
import { getBezierPath } from 'reactflow';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, style = {}, markerEnd }) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });
  return (
    <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
  );
};

export default CustomEdge;
