import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt

        if(!token )
        {
            return res.status(401).json({message: "Unauthorized - No Token Provided"});
        }

        if(!decoded)
        {
            return res.status(401).json({message: "Unauthorized - Invalid Token"});
        }

        if(!user)
            {
                return res.status(401).json({message: "User not found"});
            }

    }
    catch(error){
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}