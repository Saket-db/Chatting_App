import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; // Correct the import (it’s bcryptjs, not bcrypt.js)

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Input validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        // await newUser.save();

        if(newUser){

        }

        else{
            res.status(400).json({message: "Invalid user data"});
        }

        // res.status(201).json({ message: "User registered successfully" });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = (req, res) => {
    res.send("Login Successful");
};

export const logout = (req, res) => {
    res.send("Logout Successful");
};
