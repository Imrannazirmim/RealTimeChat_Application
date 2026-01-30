import User from '../models/user.model.js'
import Message from "../models/message.model.js";
import cloudinary from '../lib/cloudinary.js';

export const getUserSidebar = async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const filterUser = await User.find({_id: {$ne: loggedUserId}}).select("-password");
        res.status(200).json(filterUser)

    } catch (error) {
        res.status(500).json({message: 'Internal Server Error.'})
    }
}

export const getMessages = async (req,res)=>{
    try{
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or: [
                {senderId: senderId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: senderId}
            ]
        });
        res.status(200).json(messages)
    }catch (error){
        res.status(500).json({message: 'Internal Server Error.'})
    }
}

export const sendMessages = async(req,res)=>{
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if(image){
            const uploadImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadImage.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();
        // todo realtime functionality goes here => socket.io

        res.status(200).json(newMessage)
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}

