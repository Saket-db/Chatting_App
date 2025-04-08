import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async(req,res) =>
{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    
        res.status(200).json(filteredUsers);
      } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
};

export const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user._id; // My ID
  
      const messages = await Message.find({
        $or: [
          { senderId: senderId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: senderId }
        ],
        deletedFor: {$ne: senderId}
        
      }).sort({ createdAt: 1 }); // Sort messages in chronological order
  
      res.status(200).json(messages || []); // Ensure a response is always sent
    } catch (error) {
      console.error("Error in getMessages controller:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

export const sendMessages = async(req,res) => {
    try{
        const {text,image} =  req.body;
        const {id } = req.params;
        const receiverId = id;

        const senderId = req.user._id;

        let imageUrl;
      // In message.controller.js
if (image) {
  const uploadedImage = await cloudinary.uploader.upload(image, {
    folder: "chat_images",
  });
  imageUrl = uploadedImage.secure_url;
}


        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        }); 

        console.log('newsss',newMessage)

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    }

    catch(error){
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const softDeleteMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    await Message.updateMany(
      {
        $or: [
          { senderId: senderId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: senderId }
        ],
        deletedFor: { $ne: senderId } // Only delete if not already deleted
      },
      {
        $addToSet: { deletedFor: senderId } // Add user ID if not already in array
      }
    );

    res.status(200).json({ message: "Messages deleted for you." });
  } catch (error) {
    console.error("Error in softDeleteMessages:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
