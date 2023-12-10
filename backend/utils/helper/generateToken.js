import  Jwt  from "jsonwebtoken";


const generateTokenAndSetCookie =(userId,res)=>{
// eslint-disable-next-line no-undef
const token = Jwt.sign({ userId }, process.env.JWT_SECRET,{
    expiresIn :"15d",
})
res.cookie('jwt',token,{
    httpOnly:true,
    maxAge : 15*24*60*1000,
    sameSite:"strict" ,
})

return token
}


export default generateTokenAndSetCookie;