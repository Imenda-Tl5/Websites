import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-container" id='footer'>

      <div className="row1">
        <div className="col">
        <h1 className="logo">
        <span>Foo</span>DS
      </h1>
    
        <h3>satisfying and delicious meals that leave you hungry for more</h3>
        <div className="social">
        </div>
        </div>
        <div className="col">
        <h1>Company</h1>
        <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
        </div>
        <div className="col">
            <h1>Get in touch</h1>
            <ul>
                <li>0966576473</li>
                <li>drnawajr2@gmail.com</li>
            </ul>
        </div>
      </div>
      <div className="row2">
  <h4 style={{color:"white"}}>Copyright © 2025 FoodS All Rights Reserved.</h4>
           
      </div>
    </div>
    </div>
  )
}

export default Footer
