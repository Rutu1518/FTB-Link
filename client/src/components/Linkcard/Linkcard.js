import React from 'react'
import "./Linkcard.css"
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import shortUrlimg from "./icon/short-link.png"
import targetUrlimg from "./icon/target-link.png"
import viewIcon from "./icon/eye.png"

 function Linkcard({_id, title, slug, target, views, createdAt}) {

  const deleteLink = async () => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/Link/${_id}`)

    toast.success(response.data.message)
    
  }

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
      
       {views}
        <img src={viewIcon} className='view-icon'>         
       </img>
    </div>

    <span className='link-card-created-at'>
      {new Date(createdAt).toLocaleString()}      
     </span> 
          
     <button className="transaction-card-delete" onClick={deleteLink}>
        Delete
      </button>
      <Toaster/>
  </div>
  )
}

export default Linkcard