import {Server} from "socket.io";
import http from "http";
import express from 'express';



const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin : "http://localhost:3000",
        methods:["GET","POST"]
    }
});

export const getRecipientSocketId = (recipientId) =>{
    return userSocketMap[recipientId];
}

const userSocketMap = {}  // userId : socketId
io.on("connection",(socket)=>{
    console.log("user is Connected " , socket.id);
    const userId = socket.handshake.query.userId;

    if(userId != "undefined") userSocketMap[userId]= socket.id;
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    console.log(userSocketMap,"online user")


    socket.on("disconnect", () => {
        console.log("user Disconnected");
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
});

export{io,server,app};