import React, { useEffect, useState } from 'react'
import "./List.css"
import { toast } from 'react-toastify'

const List = () => {
  const url = "http://localhost:4000"
  const [list,setList] = useState([])
  const fetchList = async() =>{
  const response = await axios.get(`${url}/api/list`)
  console.log(response.data)
  if (response.data.success){
    setList(response.data.data)
  }  
  else{
    toast.error("Error")
  }

}

  useEffect(()=>{
    fetchList
  },[])
  return (
    <div>
      
    </div>
  )
}

export default List
