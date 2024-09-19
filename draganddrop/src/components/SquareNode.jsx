import React from 'react';
import { Handle, Position } from 'reactflow';

const SquareNode = ({ data }) => (
  <div style={{
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #333',
    position: 'relative',
  }}>
    <Handle type="target" position={Position.Top} id="a" />
    <div>{data.label}</div>
    <Handle type="source" position={Position.Bottom} id="b" />
  </div>
);

export default SquareNode;
