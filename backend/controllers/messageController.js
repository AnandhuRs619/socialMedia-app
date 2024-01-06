import Conversation from '../models/conversation.js';
import Message from "../models/messageModel.js"; 

const sendMessage = async(req,res)=>{
try {
    const {recipientId,message} = req.body;
    const senderId =req.user._id
    let conversation = await Conversation.findOne({
        participants:{$all:[senderId , recipientId]},
    });

    if(!conversation){
        conversation = new Conversation({
            participants:[senderId,recipientId],
            lastMessage:{
                text:message,
                sender:senderId,
            }
        })
        await conversation.save();
    }

    const newMessage = new Message({
        conversationId:conversation._id,
        sender: senderId,
        text:message
    });
    await Promise.all([
        newMessage.save(),
        conversation.updateOne({
            lastMessage:{
                text:message,
                sender:senderId,
            }
        })
    ])
 res.status(201).json(newMessage);

} catch (error) {
    res.status(500).json({error:error.message});
}
}

const getMessages = async(req,res)=>{
    const { otherUserId } = req.params;
    const userId = req.user._id;

try {
    const conversation = await Conversation.findOne({
        participants:{$all:[userId,otherUserId]},
    })
if(!conversation){
    res.status(500).json({error:"Conversation is not found"});
}   
const message = await Message.find({
    conversationId:conversation._id,
}).sort({createAt: -1});

res.status(200).json(message);
    
} catch (error) {
    res.status(500).json({error:error.message});
}
}


const getConversations = async(req,res)=>{
    const userId = req.user._id;
    
    try {
        const conversations = await Conversation.find({participants:userId}).populate({
            path:"participants",
            select:"username profilePic",
        });

        res.status(200).json(conversations)

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}



export {sendMessage,
 getMessages,
 getConversations,
};