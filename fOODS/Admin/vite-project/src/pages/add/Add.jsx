import React, { useEffect, useState } from 'react'
import "./Add.css"
import axios from "axios"
import upload_img from "../../assets/upload_file_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
import { toast } from 'react-toastify'
const Add = () => {
    const url = "http//:localhost:4000";
    const onSubmitHandler = async(event)=>{
    event.preventDefault()
    const formData = new FormData()

    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)
const response = await axios.post(`${url}/api/food/add`,formData)
if(response.data.success){
setData({
    name:"",
    description:"",
    price:"",
    category:"salad"
})
setImage(false)
toast.success(response.data.message)
}
else{
toast.error(response.data.message)
}
}
const [image,setImage] = useState(false)
const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad",
})

const onChangeHandler = (event)=>{
const name= event.target.name
const value =  event.target.value
setData(data=>({...data,[name]:value}))
}
    return (
    <div className='add'>
        <form onSubmit={onSubmitHandler} className='add-image-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):upload_img} alt="" />
            </label>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} id="image" hidden required />
<div className="add-product-name flex-col">
<p>Podduct Name</p>
<input onChange={onChangeHandler} valau={data.name}type="text" name='name' placeholder='Type here' />
</div>
<div className="add-product-description">
    <textarea onChange={onChangeHandler} value={data.description} name="description" rows={6} placeholder='write content here' required></textarea>
</div>
<div className="add-category-price">
        <div className="add-category">
            <p>prouct category</p>
            <select onChange={onChangeHandler} name="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Sandwhich">Sandwhich</option>
                <option value="Cake">Cake</option>
                <option value="Pure veg">Pure veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Desrts">Desrts</option>
                <option value="Noodles">Noodles</option>
            </select>
        </div>
        <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />p
        </div>
</div>
<button type='submit'onSubmit={onChangeHandler} className='add-button'>Add </button>
        </form>



    </div>
  )
}

export default Add
