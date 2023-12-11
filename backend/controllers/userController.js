import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helper/generateToken.js';



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
		if(!user || !isPasswordCorrect ) return res.status(400).json({message:"Invalid Username or Password"});
		generateTokenAndSetCookie(user._id,res);

		res.status(200).json({
			_id:user._id,
			name:user.name,
			email:user.email,
			username:user.username,
		})

	}catch(error){
		res.status(500).json({message:error.message});
		console.log("Error in loginUser:",error.message);
	}
 }

 const logoutUser = async (req,res)=>{
	try {
		res.cookie("jwt","",{maxAge:1});
		res.status(200).json({message:"User logged out"});

	}catch(error){
		res.status(500).json({ error: err.message });
		console.log("Error in logoutUser: ", err.message);
	}
 }

 const followUnFollowUser = async (req,res) =>{
	try{
		const {id}= req.params;
		const userToModify = await User.findbyId(id);
		const currentUser = await User.findbyId(req.user._id);

		if(id===req.user._id) return res.status(400).json({message:"You cannot follow/unfollow yourself...!"})

		const isFollowing = currentUser.following.includes(id);

		if(isFollowing){
			// unfollow user
			await User.findbyId()
		}else{

		}
	}catch(error){
		res.status(500).json({ error: err.message });
		console.log("Error in Follow / Unfollow: ", err.message);
	}
 }

export { signupUser,loginUser,logoutUser,followUnFollowUser };
