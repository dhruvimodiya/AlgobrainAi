import React, { useState } from 'react'
import '../components/sidebar.css';
import { FaRegCircle } from "react-icons/fa";
  
function SideBar() {
  return (
    <div>
      <div className="sidebar">
        <a className="active" href="#home">Home</a>
        <a href="#news"><FaRegCircle /></a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
</div>
    </div>
  )
}

export default SideBar
