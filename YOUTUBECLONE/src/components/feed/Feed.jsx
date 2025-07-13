import React, { useEffect, useState } from 'react';
import './Feed.css';
import sarah from "../../assets/sarah.webp";
import { Link, useParams } from 'react-router-dom';
import { valueConverter } from '../../env';
import moment from 'moment';
const Feed = ({category}) => {
    const API_KEY = `AIzaSyAq5JWXFoyd20YjaW67EWpd8kRcngrqMyY`;
    const [data, setData] = useState([]);
    const [channelData, setChannelData] = useState({});
    const {categorId,videoId} = useParams()
    // Fetch video data
    const fetchVideoData = async () => {
        const vidUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=60&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        try {
            const response = await fetch(vidUrl);
            const result = await response.json();
            setData(result.items || []);
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    // Fetch channel data
    const fetchChannelData = async (channelIds) => {
        const channelIdString = channelIds.join(',');
        const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelIdString}&key=${API_KEY}`;
        try {
            const response = await fetch(channelUrl);
            const result = await response.json();
            const channelInfo = {};
            result.items.forEach(item => {
                channelInfo[item.id] = item.snippet;
            });
            setChannelData(channelInfo);
        } catch (error) {
            console.error('Error fetching channel data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchVideoData();
        };
        fetchData();
    }, [category]);

    useEffect(() => {
        if (data.length > 0) {
            const channelIds = data.map(item => item.snippet.channelId);
            fetchChannelData(channelIds);
        }
    }, [data]);
    useEffect(() => {
        const handleScroll = () => {
          const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
          if (nearBottom) {
            fetchVideoData();
            console.log("I love Tikazi")
          }
        };
      
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
      
    return (
        <div className='feed-container'>
            {data?
            data.map((item,index)=>{
                    return(
                            <div key={index} className='video'>
                        <Link  to={`/play/${item.snippet.categoryId}/${item.id}`}>
                              <img className='thumbnail' src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                              </Link>

                              <div className="vid-details">
                                
                                
                                
                                <img
                                  src={channelData[item.snippet.channelId]?.thumbnails?.default?.url || sarah}
                                  alt={channelData[item.snippet.channelId]?.title || 'Channel Logo'}
                                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                />
                                <div>
                                  <p>{channelData[item.snippet.channelId]?.title || 'Loading...'}</p>
                                  <h3>{item.snippet.title}</h3> 
                                  
                                  
                                  <span>
                                    {channelData[item.snippet.channelId]
                                      ? valueConverter(item.statistics.viewCount)
                                      : "n views"} * {moment(item.snippet.publishedAt).fromNow()}
                                  </span>
                                </div>
                              </div>
                            </div>
                    )
                
            }):<h1>No videos avalabel</h1>}            

                    </div>
    );
};

export default Feed;
