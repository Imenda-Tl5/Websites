import React, { useEffect, useState } from 'react'
import "./wheather.css"
import { icons } from './assets.js'
import {FaSearch} from "react-icons/fa"
const App = () => {
const [weatherData,setWeatherData] = useState({})
const [value ,setValue]= useState("")
const onChange =(event)=>{
setValue(event.target.value)
}
const fetchData = async(city)=>{
  try {
       const apiKey= "e6f8daed21e3f2859d19f5076837e555"

       const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
     const    result = await fetch(url).then((res)=>res.json())
     console.log(result)
     setWeatherData(
      {
        location:result.name,
        wind:result.wind.speed,
        temperature:result.main.temp,
        humidity:result.main.humidity,
        description:result.weather[0].description
      }
     )
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
if(!value.trim()==""){
  fetchData(value)
}
},[value])
  return (
    <div className='weather-app'>
      <div className="weather-container">
        <label className="top">
        <input type="text" placeholder='Type to Search...' value={value} onChange={onChange}/>
<FaSearch onClick={()=>{console.log(weatherData)}}/>
        </label>
        <div className="middle">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d={icons.snow}/></svg>
        <h1>{weatherData.temperature||"21"}°C</h1>
        <div className='weather-info'>
              <h1>
                {weatherData.location||"city name"}
              </h1>
              <p>{weatherData.description||"wheather descripion"} </p>
        </div>
        </div>
        <div className="bottom">
          <div className="left">
           <h2>
      {
      weatherData.humidity||67
      }%
           </h2>
            <span >
             <p>
              Humidity
             </p>
            </span>
            
          </div>
          <div className="right">
           <h2>

               {weatherData.wind||15}km/h
           </h2>
<span>
  <p>wind speed</p>
</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
