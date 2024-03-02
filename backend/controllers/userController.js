import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helper/generateToken.js';
import{v2 as cloudinary} from "cloudinary";

import mongoose from "mongoose";
import Post from '../models/postModel.js';

const getUserProfile = async(req,res)=>{
	//  fetch user profile either with username or userId
	// query is either username or userId
	const {query}=req.params;
	let  user;
	try{
		
		if (mongoose.Types.ObjectId.isValid(query)){
			// query is userId 
			 user = await User.findOne({_id:query}).select("-password").select("-updatedAt");
		}else{
			// query is username
			 user = await User.findOne({username:query}).select("-password").select("-updatedAt");
		}
		if(!user) return res.status(400).json({error:"user not found"})

		res.status(200).json(user)
	}catch(error){
		res.status(500).json({ error: error.message });
		console.log("Error in updating User: ", error.message);
	}
}

// Signup user

const signupUser = async (req, res) => {
	try {
		const { name, email, username, password } = req.body;
        console.log(req.body)
		const user = await User.findOne({ $or: [{ email }, { username }] });
         
		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			username,
			password: hashedPassword,
		});
		const savedUser = await newUser.save();
        console.log('Saved User:', savedUser);

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				bio: newUser.bio,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

 const loginUser = async (req, res) =>{
	try{
		const {username, password } = req.body;
		const user = await User.findOne({username});
		const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
		if(!user || !isPasswordCorrect ) return res.status(400).json({error:"Invalid Username or Password"});
		generateTokenAndSetCookie(user._id,res);

		res.status(200).json({
			_id:user._id,
			name:user.name,
			email:user.email,
			username:user.username,
			bio:user.bio,
			profilePic:user.profilePic,
			
		})

	}catch(error){
		res.status(500).json({error:error.message});
		console.log("Error in loginUser:",error.message);
	}
 }

 const logoutUser = async (req,res)=>{
	try {
		res.cookie("jwt","",{maxAge:1});
		res.status(200).json({message:"User logged out"});

	}catch(error){
		res.status(500).json({ error: error.message });
		console.log("Error in logoutUser: ", error.message);
	}
 }

 const followUnFollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);
			console.log(isFollowing);
		if (isFollowing) {
			// Unfollow user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
			res.status(200).json({ message: "User unfollowed successfully" });
			console.log("UnFollowed done +++++++++---")
		} else {
			// Follow user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			res.status(200).json({ message: "User followed successfully" });
			console.log("Followed done +++++++++---++++")
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in followUnFollowUser: ", err.message);
	}
};
const updateUser = async(req,res)=>{
	const { name, email, username, password,bio } = req.body;
	let {profilePic} = req.body;
	const userId = req.user._id
	try{
		let user = await User.findById(userId);
		if(!user) return res.status(400).json({error: "User not found" });

		if(req.params.id !==  userId.toString()) return res.status(400).json({message:"you cannot update other's profiles"})
		if(password){
			const salt = await bcrypt.genSalt(10);
			const  hashedPassword = await bcrypt.hash(password,salt);
			user.password = hashedPassword;  
		}
		if(profilePic){
			if(user.profilePic){
				await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
			}
			
			const uploadedResponse = await cloudinary.uploader.upload(profilePic);
			profilePic = uploadedResponse.secure_url;
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.username = username|| user.username;
		user.profilePic = profilePic || user.profilePic;
		user.bio = bio|| user.bio;


		 user = await user.save();

		 await Post.updateMany(
			{"replies.userId":userId},
			{
				$set:{
					"replies.$[reply].username":user.username,
					"replies.$[reply].userProfilePic":user.profilePic
				}
			},
			{arrayFilters:[{"reply.userId":userId}]}
		 )
		 // password should be null in response
		 
		user.password = null;

		 res.status(200).json( user)



	}catch(error){
		res.status(500).json({ error: error.message });
		console.log("Error in updating User: ", error.message);
	}
}

const getSuggestedUsers =async(req,res)=>{
	try {
		const userId = req.user._id;
		const usersFollowedByYou = await User.findById(userId).select("following");

		const users = await User.aggregate([
			{
				$match :{
					_id:{$ne:userId},
				}
			},
			{
				$sample:{size:10}
			}
		])

		const filteredUsers = users.filter(user=> ! usersFollowedByYou.following.includes(user._id))
		const suggestedUsers = filteredUsers.slice(0,5);

		suggestedUsers.forEach(user => user.password = null)

		res.status(200).json(suggestedUsers);

	} catch (error) {
		res.status(500).json({error:error.message});
	}
}

export { signupUser,loginUser,logoutUser,followUnFollowUser,updateUser,getUserProfile,getSuggestedUsers };
