import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Home.css'
import toast, { Toaster } from 'react-hot-toast'

function Home() { 

 const [linkData, setlinkData] = useState({
    title: "",
    target: "",
    slug: ""
 })

 const shortenURL = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/link`, linkData);
      if (response.data.success) {
          toast.success("Link Shortened Successfully");
          setlinkData({
              title: "",
              target: "",
              slug: ""
          });
      } else {
          toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while shortening the link.");
    }
 }




 return (

    <div>
      <h1 className='home-page-heading'>Shorten your links in seconds...✌</h1>
      

      <form className='link-form'>
        <input 
          type="text"
          placeholder="Enter your title" 
          value={linkData.title}
          onChange={(e) => setlinkData({ ...linkData, title: e.target.value })}
          className="form-content"
        />

        <input 
          type="text" 
          placeholder="Enter your target" 
          value={linkData.target}
          onChange={(e) => setlinkData({ ...linkData, target: e.target.value })}
          className="form-content"
        />

        <input 
          type="text"
          placeholder="Enter your slug" 
          value={linkData.slug}
          onChange={(e) => setlinkData({ ...linkData, slug: e.target.value })}
          className="form-content"
        />

        <button 
          type='button' 
          className='form-btn'
          onClick={shortenURL}
        >
          Shorten
        </button>
      </form>
      <Toaster />
    </div>
  )
}

export default Home
