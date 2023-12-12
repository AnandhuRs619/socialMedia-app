import User from "../models/userModel.js";
import Post from "../models/postModel.js";



const createPost  = async(req,res) =>{
try {
    const {postedBy,text,img} = req.body;
    if(!postedBy || ! text){
        return  res.status(400).json({message:"PostedBy and Text are required"})

    }

    const user = await User.findById(postedBy);
    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    if(user._id.toString()!== req.user._id.toString()){
        return res.status(401).json({message:"Unauthorized to create post"})

    }

    const maxLength = 500;
    if(text.length> maxLength){
        return res.status(400).json({message:"Text must be  less than ${maxLength} Characters"});

    }
    const newPost = new Post({postedBy,text,img});
    await newPost.save();
    res.status(201).json({message:"Post created successfully",newPost})

}catch(error){
res.status(500).json({message:error.message})
console.log(error)
}
}

const getPost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        res.status(200).json({post})
        
    }catch(error){
        res.status(500).json({message:error.message})
        console.log(error)
        }
}

const getFeedPosts = async(req, res) => {
    try {
        const userId =req.user._id;
        const user = User.findById(userId);
        if(!user){
            return res.status(404).json({message:" User not found"})
        }
        const following = user.following;
        const feedPost = await Post.find({postedBy:{$in:following}}).sort({createdAt:-1}) 
        res.status(200).json({feedPost})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
    }
}

const deletePost = async(req,res )=>{
    try{
      const post = await  Post.findById(req.params.id);
      if(!post){
        return res.status(404).json({message:"Post not found"});

      }
      if(post.postedBy.toString() !== req.user._id.toString()){
        return res.status(401).json({message:"Unauthorized to delete post"})
      }

      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"Post delete successfully"});


    }catch(error){
        res.status(500).json({message:error.message})
        console.log(error)
    }
}

const likeUnlikepost = async(req,res)=>{
    try{
        const {id:postId}= req.params;
        const userId = req.user._id;

       const post = await Post.findById(postId)

       if(!post){
        return res.status(404).json({message:"post not found"})
       }
       const userLikedPost = post.likes.includes(userId);
       if(userLikedPost){
            // ulike the post
            await Post.updateOne({_id:postId},{$pull : {likes:userId}});
            res.status(200).json({message:"post Unliked successfully "})
       }else{
            // like the post 
            post.likes.push(userId);
            await post.save();
            res.status(200).json({message:"post liked successfully "})
       }


    }catch(error){
        res.status(500).json({message:error.message})
        console.log(error)
    }
}



const replyToPost = async(req,res)=>{
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;
        console.log(userProfilePic)

        if(!text){
            return res.status(404).json({message:"text field is required"});

        }
        const post = await Post.findById(postId);

        if(!post){
            return res(404).json({message:" post not found"});
        }

        const reply ={ post,userId ,text , userProfilePic, username};

        post.replies.push(reply);
        await post.save();
        res.status(200).json({message:" your reply is added successfully ",reply});



        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
    }
}


export {createPost,getPost ,deletePost,likeUnlikepost,replyToPost,getFeedPosts};