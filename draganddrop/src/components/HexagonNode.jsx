import React from 'react';
import { Handle, Position } from 'reactflow';

const HexagonNode = ({ data }) => (
  <div style={{
    width: '120px',
    height: '120px',
    backgroundColor: 'lightblue',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    border: '1px solid #333',
  }}>
    
    <Handle type="target" position={Position.Left} id="a" />
    <div>{data.label}</div>
    <Handle type="source" position={Position.Right} id="b" />
  </div>
);

export default HexagonNode;
