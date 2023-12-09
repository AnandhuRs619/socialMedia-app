import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js'


dotenv.config();

connectDB();
const app = express();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse json data the req.body
app.use(express.urlencoded({extended:true})); // To parse from data in the req.body
app.use(cookieParser());

// Routes

app.use("/api/users",userRoutes)


app.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`))