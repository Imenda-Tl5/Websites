import React, { useEffect } from 'react'
import "./SearchResults.css"
import { Link } from 'react-router-dom'
import moment from 'moment'
import sarah from "../../assets/sarah.webp"
import { valueConverter } from '../../env'

const SearchResults = ({ value ,setvalue}) => {
  useEffect(()=>{
   const savedVideoList = JSON.parse(localStorage.getItem("videos"))
   setvalue(savedVideoList)
   console.log(value)
  },[])
  return (
    <div className='search-results'>
      {value && value.length > 0 ? (
        value.map((item, index) => {
          const videoId = item.id?.videoId || item.id;
          const snippet = item.snippet || {};

          return (
            <div key={index} className='search-result'>
              <Link to={`/play/${snippet.categoryId || "unknown"}/${videoId}`}>
                <img
                  className='thumbnail'
                  src={snippet.thumbnails?.medium?.url || sarah}
                  alt={snippet.title || "Video"}
                />
              </Link>

              <div className="vid-details">
                
                <div>
                  <p>{snippet.channelTitle || 'Loading...'}</p>
                  <h3>{snippet.title || "video title"}</h3>
                  <span>
                   {moment(snippet.publishedAt).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
