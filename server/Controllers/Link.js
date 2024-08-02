
import Link from "./../models/Link.js";

const postLink = async(req,res)=>{
    const {target,slug,title}=req.body;
  
    const link = new Link({
      target,
      slug,
      title
    });
  
    const savedlink = await link.save();
  
    res.json({
      success:true,
      data:savedlink,
      message:`Link Created Successfully`
    });
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
    getRedirectlink}