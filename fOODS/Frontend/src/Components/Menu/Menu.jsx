import React from 'react'
import "./Menu.css"
import { menu_list } from '../../assets/assets'
const Menu = ({category,setCategory}) => {  
  return (
    <div className='menu'>
         <div className="categories">
         {menu_list.map((item,index)=>{
          return(

            <div onClick={()=>setCategory(item.menu_name)} key={index} className="category-item">
                 <img src={item.menu_image} alt="" />
                  <p>{item.menu_name}</p>
            </div>
          )
         })

         }
         </div>
    </div>
  )
}

export default Menu
