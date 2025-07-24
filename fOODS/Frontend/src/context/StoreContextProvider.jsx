import React, { createContext, useState } from 'react'
import { food_list } from '../assets/assets'
export const StoreContext = createContext()
const StoreContextProvider = (props) => {
    const [cartItem,setCartItem] = useState({})
    const addToCart = (itemId)=>{
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    const removeFromCart = (itemId)=>{
        if(cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        }

    }
  const  getCartSubTotal =()=>{

    }
    const getCartTotal = ()=>{
        let TotalAmount = 0
        for (const item in cartItem){
            if(cartItem[item]>0){
                const itemInfo = food_list.find((product)=>product._id===item)
                TotalAmount += itemInfo.price*cartItem[item]
            }
         
        }
        return TotalAmount
    }
    const contextValue = {
        addToCart,
        removeFromCart,
        getCartTotal,
        setCartItem,
        cartItem,
        food_list
    }
  return (
<StoreContext.Provider value={contextValue}>
   {props.children}
</StoreContext.Provider>
  )
}

export default StoreContextProvider
