import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

/**
 * @desc   User Signup
 * @route  POST /api/auth/signup
 * @access Public
 */
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log(fullName,  email, password);
    try {
        
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        console.log("New User Object Before Save:", newUser); // Debugging

        await newUser.save();
        console.log("User successfully saved to DB");

       
        generateToken(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic || null,
        });

    } catch (error) {
        console.error("Error in signup:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc   User Login
 * @route  POST /api/auth/login
 * @access Public
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic || null,
        });

    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc   User Logout
 * @route  POST /api/auth/logout
 * @access Private
 */
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt"); // Clear JWT token from cookies
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const updateProfile = async (req, res) =>{
    try {
        const { profilePic } = req.body;
        const usser = req.user._id

        if(!profilePic)
        {
            return res.status(400).json({ message: "Please add a profile picture" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})
        res.status(200).json(updatedUser)
    }
    catch(error){
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Server error" });

    }
};

export const check = (req,res) => {
    try {
        res.status(200).json(req.user);
      } 
      catch (error)
      {
        console.log("Error in checkAuth controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
      }
};