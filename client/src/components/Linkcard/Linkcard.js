import React from 'react'
import "./Linkcard.css"
import shortUrlimg from "./icon/short-link.png"
import targetUrlimg from "./icon/target-link.png"
import viewIcon from "./icon/eye.png"

 function Linkcard({title, slug, target, views, createdAt}) {

  const shortUrl = `${process.env.REACT_APP_API_URL}/${slug}`
  return (
    <div className='link-card'>

     <h3 className='link-card-title'>{title || "No Title"}</h3>
  
      <div className='link-card-short-url'>
         <img src={shortUrlimg} className='short-url-icon'></img>       
          <a href={shortUrl} target='_blank'>             
         {shortUrl}</a>
      </div>
 
    <div>     
      <p className='link-card-target-url'> 
        <img src={targetUrlimg} className='target-url-icon'></img>        
        <a href={target} target="_blank" className='target-url'>                    
        {target.substring(0,50)}{target.length>50 ? "..." : null}
       </a>
      </p>
    </div>

    <div className='link-card-views'>    
      {/* {views.count<1 ? {viewIcon} : 0} */}
       {views}
        <img src={viewIcon} className='view-icon'>         
       </img>
    </div>

    <span className='link-card-created-at'>
      {new Date(createdAt).toLocaleString()}      
     </span> 
  
    </div>
  )
}

export default Linkcard