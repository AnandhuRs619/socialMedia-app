import User from "../models/userModel";

const protectRoute  = async(req,res,next)=>{
    try{
      const token = req.cookies.jwt;

      if(!token) return res.status(401).json({message:"Unauthoized"})
      
      const decoded =jwt.verify(token,process.env.JWT_SECRET);

      const user = await User.findbyId(decoded.userId).select("-password")
      req.user =user;
      next();

    }catch(error){
        res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
    }
}
export default protectRoute