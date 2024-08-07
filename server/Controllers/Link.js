
import Link from "../models/Link.js";
import User from "../models/User.js";

const postLink = async(req,res)=>{
  const { target,slug,title,user}=req.body;

  const link = new Link({            
    target,
    slug,
    title, 
    user    
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
  const allLinks = await Link.find({"user" : userId }).sort({ createdAt : -1 })
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

  const deleteLink = async (req, res) => {
    const {id} = req.params;
  
    await Link.deleteOne({_id: id});
  
    res.json({
      success: true,
      message: `Link deleted successfully`,
      data: null
    })
  }

  // const updatelink = async (req, res)=>{  
  //   const{       
  //       title,
  //       target,
  //       slug,       
  //   } = req.body

  //   const{ id } = req.params

  //  await Link.updateOne({_id : id},{
  //       $set:{
  //           title:title,
  //           target:target,
  //           slug:slug,           
  //       }
  //   })
  //   const updatedlink = await Link.findById(id)
  //   res.json({
  //       success:true,
  //       data:updatedlink,
  //       message:"link updated successfully"
  //   })
  // }


  const updatelink = async (req, res) => {
    const {id} = req.params;

    const updatedresult = await Link.updateOne({_id:id},{
        $set:{
          title:title,
          target:target,
          slug:slug,  
        }
    })
    res.json({
        success:true,
        message:"Link updated successfully",
        data: updatedresult
    })


    const updatedlink= await Plant.findByIdAndUpdate(id, {
      title,
      target,
      slug       
    }, { new: true });

    if (!updatedlink) {
        return res.json({
            success: false,
            message: `Link not found for id ${id}`,
            data: null
        });
    }
    res.json({
        success: true,
        message: "Link updated successfully",
        data:updatedlink
    });
};
  export {postLink,
          getRedirectlink,
          getLinks,
          deleteLink,
          updatelink
         }
