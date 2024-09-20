import React from 'react';

const DragItem = ({ type, name }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      style={{
        cursor: 'grab',
        fontSize: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px', // Set fixed width for rectangle
        height: '80px', // Set fixed height for rectangle
      }}
    >
      {name}
    </div>
  );
};

export default DragItem;
