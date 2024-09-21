import React, { useState } from 'react';
import { MdPermMedia, MdDelete, MdEdit, MdClose } from "react-icons/md"; // Import MdClose for delete icon
import { MdOutlineDeleteSweep } from "react-icons/md";

const nodeStyle = (isDeleted) => ({
  width: '240px',
  height: '130px', // Set a fixed height for the node
  display: isDeleted ? 'none' : 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 128, 0, 0.3)',
  position: 'relative',
  backgroundColor: isDeleted ? 'transparent' : 'white',
  transition: 'box-shadow 0.3s',
});

const flowStartStyle = {
  borderRadius: '4px',
  color: 'green',
  fontSize: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10px',
  fontWeight: 'bold',
  backgroundColor: '#F8F8F8',
  borderLeft: '12px solid green',
  position: 'relative',
};

const buttonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '217px',
  padding: '5px',
  fontSize: '10px',
  color: 'green',
  backgroundColor: 'white',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  // marginTop: '8px',
  marginLeft: '10px',
  border: '1px solid green',
  position: 'relative',
  outline:'none'
};

const menuStyle = (isMenuOpen) => ({
  position: 'absolute',
  top: '95%', // Position below the button
  left: '5%',
  backgroundColor: 'white',
  border: '1px solid green',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 128, 0, 0.3)',
  padding: '8px',
  width: '85%',
  display: isMenuOpen ? 'flex' : 'none', // Display menu based on isMenuOpen
  flexDirection: 'column',
  opacity: isMenuOpen ? 1 : 0,
  transition: 'opacity 0.3s',
  zIndex: 1,
});

const ShippingNode = ({ data }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(['Option 1', 'Option 2']); // Default menu items
  const [newMenuItem, setNewMenuItem] = useState(''); // State for new menu item

  const handleDelete = () => {
    setIsDeleted(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAddItem = () => {
    if (newMenuItem.trim()) {
      setMenuItems([...menuItems, newMenuItem]); // Add new item to the menu
      setNewMenuItem(''); // Clear input field after adding
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = menuItems.filter((_, i) => i !== index); // Remove item at the specified index
    setMenuItems(updatedItems);
  };

  return (
    <div
      style={nodeStyle(isDeleted)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={flowStartStyle}>
        <p>
          <MdPermMedia style={{ marginLeft: '20px' }} /> Special Offer
        </p>
        <MdDelete style={{ cursor: 'pointer', color: 'green', opacity: isHovered ? 1 : 0 }} onClick={handleDelete} />
      </div>

      {/* Display message above the button */}
      <p style={{ margin: '10px', fontSize: '10px', fontWeight: 'bold', color: 'green' }}>
        Which Shipping Option do you prefer?
      </p>

      {/* Button with menu icon */}
      <button style={buttonStyle} onClick={toggleMenu}>
        Menu <MdEdit />
      </button>

      {/* Menu that appears below the button */}
      <div style={menuStyle(isMenuOpen)}>
        {/* List of menu items with delete buttons */}
        {menuItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',backgroundColor:'#F8F8F8' ,marginBottom:'2px',borderRadius:'10px',fontSize:'10px',padding:'2px' }}>
            <p style={{ margin: 0 }}>{item}</p>
            <MdOutlineDeleteSweep 
              style={{ cursor: 'pointer', color: 'red' }}
              onClick={() => handleRemoveItem(index)} // Call remove function
            />
          </div>
        ))}

        {/* Input and button for adding new items */}
        <input
          type="text"
          value={newMenuItem}
          onChange={(e) => setNewMenuItem(e.target.value)}
          placeholder="Add new item"
          style={{ margin: '8px 0', padding: '4px', borderRadius:'15px',outline:'none',fontSize:'10px'}}
        />
        
        <button onClick={handleAddItem} style={{ padding: '4px', fontSize: '12px',borderRadius:'15px',width: '207px', border:'1px solid green' ,fontSize:'9px',outline:'none',}}>
          Add Item
        </button>
      </div>
    </div>
  );
};

export default ShippingNode;
