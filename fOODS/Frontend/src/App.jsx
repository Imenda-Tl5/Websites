import React, { useContext, useState } from 'react'
import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import Home from './pages/Home'
import LoginPopUp from './Components/LoginPopUp/loginPopUp'
import { createRoutesFromChildren, Route, Routes } from 'react-router-dom'
import Cart from './Components/cart/Cart'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { StoreContext } from './context/StoreContextProvider'
import About from './pages/About/About'
import Menu from './Components/Menu/Menu'

const App = () => {
  const [login,setLogin] = useState(false)
  const [category,setCategory] = useState("All")
  const [Active,setActive] = useState()
const stripePromise = loadStripe('pk_test_51QnxlO4cddLyakvKkjcX9wABbqcgiHfXFXeYB4eaTwHxGxc1GVNlmuAuxco5U5UsECji6bJ3sV7YSpIBcNWaspeS00oKnD3oS7');
  return (
    <div className='app'>
      
      {login?<LoginPopUp login ={login} setLogin={setLogin}/>:<></>}
         <Navbar setLogin={setLogin} setActive={setActive}/>
         <Routes>
        <Route path='/' element={<Home category={category} setCategory={setCategory}/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/menu' element={<Menu/>}/>
      <Route path='/cart' element={
        <Elements stripe={stripePromise}>
        <Cart/>
        </Elements>
        }/>
      </Routes>
         <Footer/>
    </div>      
  )
}

export default App
