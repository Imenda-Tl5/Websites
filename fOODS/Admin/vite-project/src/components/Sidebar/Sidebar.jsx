import React from 'react'
import "./Sidebar.css"
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='side-bar'>
     <div className="side-bar-options">
        <NavLink  to={"/add"} className="side-bar-option">
        <img src="" alt="add icon" />
        <p>Add items</p>
        </NavLink>
        
        <NavLink to={"/list"} className="side-bar-option">
        <img src="" alt="add icon" />
        <p>list items</p>
        </NavLink>
        <NavLink to={"/Orders"} className="side-bar-option">
        <img src="" alt="add icon" />
        <p>Orders</p>
        </NavLink>
        </div>
<div><hr /></div>          
    </div>
  )
}

export default Sidebar
