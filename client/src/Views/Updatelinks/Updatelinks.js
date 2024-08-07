import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import "./Updatelinks.css"
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
 

function Updatelink() {

    const {id} = useParams();

    const[title, settitle] = useState("")
    const[target, settarget] = useState("")
    const[slug, setslug] = useState("")   

    const Updatelink = async()=>{
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/link/${id}`,{
            title:title,
            target:target,
            slug:slug          
        })         
        toast.success(response.data.message)       
    }
   
    const loadlink = async () =>{
        if(!id){
            return
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/link/${id}`)       
        const{title,target,slug} = response.data.data       
       
        settitle(title)
        settarget(target)
        setslug(slug) 

      }
        useEffect(() => {        
        loadlink(id)        
    }, [id])

  return (
    <div>
      {/* <h1>Update Link:{id}</h1> */}
      <form className='update-form-main-container'>
       <input type="text"
       placeholder="title"
       value={title}
       onChange={(e)=>settitle(e.target.value)}
       className="link-input"              
       />
      <input type="text"
       placeholder="target"
       value={target}
       onChange={(e)=>settarget(e.target.value)}
       className="link-input"              
       />

      <input type="text"
       placeholder="slug"
       value={slug}
       onChange={(e)=>setslug(e.target.value)}
       className="link-input"              
       />
   <button type='button' onClick={Updatelink} className='add-link-btn'>Update link</button>
    </form>
    <br/>
    <br/>
    <br/>
    <Link  to="/">
       <button className='show-all-link-btn'>Show All Link</button>
       </Link>
    <Toaster/>
    </div>
  )
}

export default Updatelink