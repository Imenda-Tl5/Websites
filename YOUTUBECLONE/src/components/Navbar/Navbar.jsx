import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import { json, Link, useNavigate,useLocation } from 'react-router-dom';

const Navbar = ({ setSideBar, sideBar, value, setvalue }) => {
  const [videos,setVideos] =useState([])
  const [input, setInput] = useState(()=>{
const string = localStorage.getItem("item")||""
return string
  });
  const location = useLocation();

useEffect(() => {
  const storedVideos = JSON.parse(localStorage.getItem("videos"));
  if (storedVideos) {
    setVideos(storedVideos);
  }
}, [videos]);
  const navigate = useNavigate();

  const fetchData = async (video) => {
    try {
      const API_KEY = `AIzaSyAq5JWXFoyd20YjaW67EWpd8kRcngrqMyY`;
      const vidUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${video}&maxResults=50&key=${API_KEY}`;
      const response = await fetch(vidUrl);
      const result = await response.json();
  
      if (result && result.items) {
        localStorage.setItem("videos", JSON.stringify(result.items));
        navigate(`/search?q=${encodeURIComponent(video)}`);
      }
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };
  
useEffect(()=>{
localStorage.setItem("item",input)
},[input])
  return (
    <nav>
      <div className='navbar'>
        <div className="left">
          
          <div className="menu" onClick={() => {
            setSideBar(sideBar === false ? "active" : false);
            console.log(sideBar);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
         

            <svg className='back' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
          </div>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <h1 className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
              </svg>
              <p>
              VidTube
              </p>
            </h1>
          </Link>
        </div>

        <div className="nav-middle">
          <input
            type="text"
            placeholder='Search'
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchData(input);
                console.log((value))
              }
            }}
          />
          <svg
            onClick={() => fetchData(input)}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </div>

        <div className="right">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
