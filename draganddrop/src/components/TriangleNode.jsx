import React from 'react';
import { Handle, Position } from 'reactflow';

const TriangleNode = ({ data }) => (
  <div style={{
    width: '0',
    height: '0',
    borderLeft: '50px solid transparent',
    borderRight: '50px solid transparent',
    borderBottom: '100px solid lightgreen',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }}>
  
    <Handle type="target" position={Position.Top} id="a" />
    <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
      {data.label}
    </div>
    <Handle type="source" position={Position.Bottom} id="b" />
  </div>
);

export default TriangleNode;
