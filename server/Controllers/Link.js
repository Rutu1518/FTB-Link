
import Link from "../models/link.js";
import User from "./../models/user.js"
const postLink = async(req,res)=>{
  const { target,slug,title,User}=req.body;

  const link = new Link({            
    target,
    slug,
    title, 
    User    
  });
  const savedlink = await link.save();  
  res.json({
    success:true,
    data:savedlink,
    message:`Link Created Successfully`
  });
}  
const getLinks = async (req, res) => {
  const {userId} = req.query;
  
  const user = await User.findById(userId);

  if (!user) {
      return res.json({
          success: false,
          data: null,
          message: "User not found"
      })
  }
  const allLinks = await Link.find({user :userId }).sort({ createdAt : -1 })
  res.json({
      success: true,
      data: allLinks,
      message: "All Link fetched successfully"
  })
} 
  const getRedirectlink = async (req, res)=>{
    const {slug} = req.params 
    const link = await Link.findOne({slug});

    if(!link){
       return res.json({
            success: false,
            message: "Link not found"
            });
    }   

    link.views = link.views + 1;
    await link.save();
  
     return res.redirect(link.target); 
  }

 

  export {postLink,
          getRedirectlink,
          getLinks
         }
