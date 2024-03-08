import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js'
import dotenv from "dotenv"

passport.use( new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
},
async function (accessToken, refreshToken, profile, done){
    try {
        const existing = await User.findOne({email: profile.email[0].value})
        if(existing){
            return done(null,{user:existing},{message : "Logged in Successfully"})
        }
        const emailExisting = await User.findOne({email: profile.email[0].value})
        if(emailExisting) return done({message:"User already exists"})
        const user = await User.create({
            name:profile.displayName,
			email:profile.email[0].value,
            googleId:profile.id,
        }) 
        return done(null,user)
    } catch (error) {
        console.log(error)
        done(error)
    }
}
))


export default passport;