import React from 'react';
import { Handle, Position } from 'reactflow';

const RectangleNode = ({ data }) => (
  <div style={{
    width: '150px',
    height: '100px',
    backgroundColor:'white',
    display: 'flex',
    // alignItems: 'top',
    justifyContent: 'center',
    border: '1px solid #333',
    position: 'relative',
  }}>
    <Handle type="target" position={Position.Top} id="a" />
    <div>gygy</div>
    <Handle type="source" position={Position.Bottom} id="b" />
  </div>
);

export default RectangleNode;
