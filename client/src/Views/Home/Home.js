import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Home.css'
import toast, { Toaster } from 'react-hot-toast'
import Linkcard from '../../components/Linkcard/Linkcard';

function Home() { 
  
  const [linkData, setlinkData] = useState({
    title: "",
    target: "",
    slug: ""
  })
  const [user, setUser]= useState('')
  const [links, setLinks] = useState([])

  const shortenURL = async () => { 
    if (!linkData.title || !linkData.target || !linkData.slug) {
      toast.error("Please Enter all details")
      return
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/link`, linkData);
      if (response.data.success) {
          toast.success("Link Shortened Successfully..");
          setlinkData({
              title: "",
              target: "",
              slug: ""
          })
      } else {
          toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while shortening the link.");
    }
 }
   useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser) {
    setUser(currentUser)
   }

    if (!currentUser) {
    window.location.href = '/login'
  }
}, [])

 console.log(user._id)

 const fetchAllLinks = async()=>{
  if(!user || !user._id){
    return
  } 
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/Links?userId=${user._id}`);
  toast.dismiss();
  setLinks(response.data.data)
  toast.success(`All Links fetched Successfully`)
 }
   useEffect(() => {
   fetchAllLinks();
  },[user])

 return (
  <div>  
    <h2>Hello {user.fullName}</h2> 
      <h1 className='home-page-heading'>Shorten your links in seconds...✌</h1>
      
    <div className='Links-main-container'>
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
    
    <div>
    <h2 className='Link-section-heading'>Link section</h2>
       <div className='AllLinkContainer'> 
     {links?.map((link, i) => {
    const { title, slug, target, views, createdAt } = link

    return (
      <Linkcard
        key={i}
        title={title}
        slug={slug}
        target={target}
        views={views}
        createdAt={createdAt}
        />
        );
      })}
      </div>
     </div>
    </div>

    <Toaster />
    
    </div>
  )
}

export default Home
