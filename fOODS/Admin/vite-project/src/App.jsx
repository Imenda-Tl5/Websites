import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/add/Add'
import Orders from './pages/orders/Orders'
import List from './pages/list/List'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path={"/add"} element={<Add/>}/>
          <Route path={"/Orders"} element={<Orders/>}/>
          <Route path={"/list"} element={<List/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
