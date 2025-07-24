import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
const Navbar = ({setLogin,setActive,Active}) => {
  return (
    <div className='nav'>
      <div className="logo">
        <Link  to={"/"}>
        <h1>Foo<span>ds</span></h1>        
        </Link>
        </div>
      <ul className='nav-links'>
        <Link onClick={()=>{setActive("1")
            const link = document.querySelector(".link")
            link.classList.toggle("active")
          console.log(link.classList)
        }} className={`Link${Active==="1"?"link-active":""}`} to={"/"}>Home</Link>
        <Link className='Link' to={"/menu"}> <a href="./menu">Menu</a></Link>
        <Link className='Link' to={"/about"}>About</Link>
      </ul>
      <ul className="btns">
       <Link className='links' to={"/cart"}>
       <button className='cart-btn'>
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="blueviolet"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
          Cart</button>
        </Link> 
        <li>
        <button className='signin-btn' onClick={()=>setLogin(true)}>SignIn</button>
        </li>
        <li><button  onClick={()=>{
          const Sidemenu = document.querySelector(".side-menu")
          Sidemenu.classList.toggle("inactive")
          console.log(Sidemenu.classList) 
        }} className='side-menu-btn' >
        <p></p>
        <p></p>
        <p></p>
          </button></li>
      </ul>
      <ul className="side-menu inactive">
        <li>
        <Link className='links' to={"/"}>Home</Link>
        </li>
        <li>
        <Link className='links' to={"/menu"}>menu</Link>
        </li>
        <li>
        <Link className='links' to={"/about"}>About</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
