import User from "../models/user.model.js";
import Message from "../models/message.model.js";

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
        ]
      }).sort({ createdAt: 1 }); // Sort messages in chronological order
  
      res.status(200).json(messages || []); // Ensure a response is always sent
    } catch (error) {
      console.error("Error in getMessages controller:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

export  const sendMessages = async(req,res) => {
    try{
        const {text,image} = await req.body;
        const {id } = await req.params;
        const receiverId = id;

        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        }); 

        console.log('newsss',newMessage)

        await newMessage.save();

        res.status(201).json(newMessage);
    }

    catch(error){
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};