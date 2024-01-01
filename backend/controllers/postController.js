import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import {v2 as cloudinary} from "cloudinary";


const createPost = async (req, res) => {
	try {
		const { postedBy, text } = req.body;
		let { img } = req.body;

		if (!postedBy || !text) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newPost = new Post({ postedBy, text, img });
		await newPost.save();

		res.status(201).json(newPost);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};


const getPost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({error:"Post not found"});
        }
        res.status(200).json(post)
        
    }catch(error){
        res.status(500).json({error:error.message})
        console.log(error)
        }
}

const getFeedPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const following = user.following;

		const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedPosts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deletePost = async(req,res )=>{
    try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		if (post.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" });
		}

		if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
const likeUnlikepost = async(req,res)=>{
    try{
        const {id:postId}= req.params;
        const userId = req.user._id;

       const post = await Post.findById(postId)

       if(!post){
        return res.status(404).json({error:"post not found"})
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
        res.status(500).json({error:error.message})
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
            return res.status(404).json({error:"text field is required"});

        }
        const post = await Post.findById(postId);

        if(!post){
            return res(404).json({error:" post not found"});
        }
		const createdAt = new Date();
        const reply ={ post,userId ,text , userProfilePic, username,createdAt};

        post.replies.push(reply);
        await post.save();
        res.status(200).json(reply);



        
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error)
    }
}

const getUserPosts = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });

		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export {createPost,getPost ,deletePost,likeUnlikepost,replyToPost,getFeedPosts,getUserPosts};